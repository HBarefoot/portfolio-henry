"use server";

import { headers } from "next/headers";
import { checkRateLimit } from "../../lib/ratelimit";

export type LeadResult =
  | { ok: true; id: string; source: string }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /https?:\/\//gi;

// Field length caps — keep in sync with the Supabase CHECK constraints.
const MAX = { name: 100, email: 200, company: 120, role: 120, message: 4000 } as const;

// Minimum time a human plausibly takes to fill the form, and a sane upper bound.
const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 60 * 60 * 1000; // 1 hour

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Degrade gracefully when Turnstile isn't configured (local dev / previews).
  if (!secret) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[submitLead] TURNSTILE_SECRET_KEY not set — skipping CAPTCHA check.");
    }
    return true;
  }
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[submitLead] Turnstile verify error:", err);
    return false;
  }
}

export async function submitLead(_prev: LeadResult | null, form: FormData): Promise<LeadResult> {
  // Layer: honeypot — bots fill this hidden field; humans never see it.
  if (form.get("website")) {
    return { ok: false, error: "Submission rejected." };
  }

  // Layer: timing — reject instant (bot) and absurdly stale submissions.
  const ts = Number(form.get("ts"));
  if (Number.isFinite(ts) && ts > 0) {
    const elapsed = Date.now() - ts;
    if (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
      return { ok: false, error: "Submission rejected." };
    }
  }

  // Resolve the client IP once (used for rate limiting + Turnstile remoteip).
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    null;

  // Layer: per-IP rate limit.
  const { success } = await checkRateLimit(ip ?? "anonymous");
  if (!success) {
    return { ok: false, error: "Too many messages — please try again later or email me directly." };
  }

  // Layer: Cloudflare Turnstile.
  const turnstileToken = (form.get("cf-turnstile-response") as string | null) ?? "";
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return { ok: false, error: "Verification failed — please reload and try again." };
  }

  const name = (form.get("name") as string | null)?.trim() ?? "";
  const email = (form.get("email") as string | null)?.trim() ?? "";
  const company = (form.get("company") as string | null)?.trim() ?? "";
  const role = (form.get("role") as string | null)?.trim() ?? "";
  const message = (form.get("message") as string | null)?.trim() ?? "";

  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };

  // Layer: field caps.
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    company.length > MAX.company ||
    role.length > MAX.role ||
    message.length > MAX.message
  ) {
    return { ok: false, error: "One of your fields is too long. Please shorten it." };
  }

  // Layer: spam heuristic — link-stuffed messages.
  const urlCount = (message.match(URL_RE) ?? []).length;
  if (urlCount > 4) {
    return { ok: false, error: "Submission rejected." };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[submitLead] Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return { ok: false, error: "Service temporarily unavailable. Please email me directly." };
  }

  // TEMP DEBUG — remove after diagnosing the canvas.leads RLS 42501.
  // Logs ONLY the project URL + the ref/role decoded from the key's JWT payload
  // (or a short prefix if it's a non-JWT sb_* key). Never logs the secret.
  try {
    const parts = supabaseKey.split(".");
    if (parts.length === 3) {
      const claims = JSON.parse(
        Buffer.from(parts[1], "base64url").toString("utf8")
      ) as { ref?: string; role?: string };
      console.log(
        `[submitLead debug] url=${supabaseUrl} keyRef=${claims.ref} keyRole=${claims.role}`
      );
    } else {
      console.log(
        `[submitLead debug] key is NOT a JWT; prefix=${supabaseKey.slice(0, 12)} url=${supabaseUrl}`
      );
    }
  } catch {
    console.log(
      `[submitLead debug] key is NOT a JWT; prefix=${supabaseKey.slice(0, 12)} url=${supabaseUrl}`
    );
  }
  // END TEMP DEBUG

  const payload: Record<string, string> = { name, email, source: "portfolio_contact" };
  if (company) payload.company = company;
  if (role) payload.role = role;
  if (message) payload.message = message;

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        // Target the canvas schema
        "Content-Profile": "canvas",
        "Accept-Profile": "canvas",
        // Return the inserted row so we get the id
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      console.error("[submitLead] Supabase error:", res.status, text);
      return { ok: false, error: "Failed to send — please email me directly." };
    }

    const rows = await res.json() as { id: string }[];
    const id = rows[0]?.id ?? "unknown";
    return { ok: true, id, source: "portfolio_contact" };
  } catch (err) {
    console.error("[submitLead] Network error:", err);
    return { ok: false, error: "Network error — please email me directly." };
  }
}
