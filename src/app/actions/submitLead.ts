"use server";

import { headers } from "next/headers";
import { checkRateLimit } from "../../lib/ratelimit";
import { guardLead } from "../../lib/lead-guard";

export type LeadResult =
  | { ok: true; id: string; source: string }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field length caps — keep in sync with the Supabase CHECK constraints.
const MAX = { name: 100, email: 200, company: 120, role: 120, message: 4000 } as const;

const SOURCE = "portfolio_contact";

/**
 * Fake success for bot detections: the bot believes it won and doesn't
 * retry/adapt; nothing is saved. The guard already logged the reason + IP.
 * (The client fires a PostHog lead_form_submit on success — the sentinel id
 * makes those filterable, and bots posting the action directly never run
 * client JS anyway.)
 */
function fakeSuccess(): LeadResult {
  return { ok: true, id: "received", source: SOURCE };
}

export async function submitLead(_prev: LeadResult | null, form: FormData): Promise<LeadResult> {
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";

  const name = (form.get("name") as string | null)?.trim() ?? "";
  const email = (form.get("email") as string | null)?.trim() ?? "";
  const company = (form.get("company") as string | null)?.trim() ?? "";
  const role = (form.get("role") as string | null)?.trim() ?? "";
  const message = (form.get("message") as string | null)?.trim() ?? "";

  // Shared anti-spam guard: honeypot → Turnstile → work-email policy →
  // per-IP rate limit (Upstash) → content heuristics → time-trap.
  const guard = await guardLead(
    {
      website: form.get("website"),
      turnstileToken: form.get("cf-turnstile-response"),
      email,
      message,
      startedAt: form.get("ts"),
    },
    {
      route: "contact",
      ip,
      requireTurnstile: true,
      rateLimit: (key) => checkRateLimit(key).then((r) => r.success),
    }
  );
  if (!guard.ok) {
    // Domain policy → a real error the visitor sees; everything else → fake success.
    if (guard.kind === "reject") return { ok: false, error: guard.error };
    return fakeSuccess();
  }

  // Real human-input problems get real errors.
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

  const supabaseUrl = process.env.SUPABASE_URL;
  // Service role bypasses RLS. Safe here because this is a "use server" action —
  // the key stays on the server and is never exposed to the browser. Do NOT add a
  // NEXT_PUBLIC_ prefix and never reference this key from client code.
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[submitLead] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return { ok: false, error: "Service temporarily unavailable. Please email me directly." };
  }

  const payload: Record<string, string> = { name, email, source: SOURCE };
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
    return { ok: true, id, source: SOURCE };
  } catch (err) {
    console.error("[submitLead] Network error:", err);
    return { ok: false, error: "Network error — please email me directly." };
  }
}
