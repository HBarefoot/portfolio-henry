/**
 * Shared anti-spam guard for lead capture — ported from
 * HBarefoot/new-portfolio-next-app PR #69 (barefootdigital.dev), adapted for
 * this repo: rate limiting is injected (we have Upstash Redis — distributed,
 * unlike #69's per-instance Map) and the time-trap keeps this repo's stale
 * upper bound.
 *
 * Layers, in order (see `guardLead`):
 *   1. Honeypot            — hidden field non-empty → drop
 *   2. Turnstile           — server-side siteverify (when required) → drop on fail
 *   3. Email-domain policy — free/disposable providers → REAL rejection (B2B policy, not bot detection)
 *   4. Rate limit          — injected per-IP limiter → drop
 *   5. Content heuristics  — link stuffing / BBCode / non-Latin body → drop
 *   6. Time-trap           — sub-human fill time or stale form → drop (cheap extra signal only)
 *
 * "Drop" = the caller answers with a fake success (bots believe they won,
 * nothing is saved) + a greppable console.warn. The email-domain rejection is
 * the ONE case that surfaces a real error with a human message, because it's a
 * business policy a real person needs to see — not a silent bot trap.
 *
 * This module is framework-agnostic (no `next/*` imports) so it stays unit-testable.
 */

// ── Email-domain policy ──────────────────────────────────────────────────────
// Kept as simple, exported arrays so the lists are trivial to extend. A trailing
// `.*` marks a provider "family" (e.g. `yahoo.*` → yahoo.com, yahoo.co.uk) and is
// matched by first-label + shallow-depth so look-alikes like `yahoo.com.evil.co`
// do NOT match. Exact entries (no `.*`) match only on full domain equality.

export const FREE_EMAIL_DOMAINS: string[] = [
  "gmail.com", "googlemail.com",
  "yahoo.*",
  "outlook.*", "hotmail.*", "live.*", "msn.com",
  "aol.com",
  "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com",
  "gmx.*",
  "zoho.com",
  "mail.com", "mail.ru",
  "yandex.*",
  "comcast.net", "att.net", "bellsouth.net", "verizon.net", "sbcglobal.net",
];

export const DISPOSABLE_EMAIL_DOMAINS: string[] = [
  "mailinator.com", "guerrillamail.com", "10minutemail.com",
  "tempmail.*", "temp-mail.org", "yopmail.com", "sharklasers.com",
  "getnada.com", "trashmail.com", "maildrop.cc", "mohmal.com", "fakeinbox.com",
];

/**
 * Human message shown on a domain-policy rejection (a real error, not a drop).
 * Henry's direct email is displayed immediately above the form, so point there
 * instead of repeating the address.
 */
export const WORK_EMAIL_MESSAGE =
  "Please use your work email. Prefer not to? Email me directly instead — the address is right above this form.";

/** Extract the lowercased domain from an email, or '' if it isn't parseable. */
export function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  if (at === -1) return "";
  return email
    .slice(at + 1)
    .trim()
    .toLowerCase()
    .replace(/\.+$/, ""); // drop a trailing dot (foo@bar.com.)
}

function domainMatchesPattern(domain: string, pattern: string): boolean {
  if (pattern.endsWith(".*")) {
    // Family match: first label equals the family name, and the domain is a
    // shallow registrable domain (2–3 labels). This blocks yahoo.com and
    // yahoo.co.uk but NOT yahoo.com.evil.co (4 labels) or my-yahoo.com.
    const base = pattern.slice(0, -2);
    const labels = domain.split(".");
    return labels[0] === base && labels.length >= 2 && labels.length <= 3;
  }
  return domain === pattern;
}

/**
 * Classify an email's domain against the free/disposable lists.
 * Case-insensitive; returns null for business/unknown domains (allowed).
 */
export function classifyEmailDomain(email: string): "free" | "disposable" | null {
  const domain = emailDomain(email);
  if (!domain) return null;
  if (DISPOSABLE_EMAIL_DOMAINS.some((p) => domainMatchesPattern(domain, p))) return "disposable";
  if (FREE_EMAIL_DOMAINS.some((p) => domainMatchesPattern(domain, p))) return "free";
  return null;
}

// ── Turnstile ────────────────────────────────────────────────────────────────

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verify a Turnstile token server-side.
 * - No `TURNSTILE_SECRET_KEY` (local dev / previews) → `{ ok: true, skipped: true }`
 *   (never hard-fail dev/builds on missing env).
 * - Secret set + missing/empty token → `{ ok: false }`.
 * - Secret set + token → real siteverify call; network/parse errors fail closed (`ok: false`).
 */
export async function verifyTurnstile(
  token: unknown,
  ip: string
): Promise<{ ok: boolean; skipped: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[lead-guard] TURNSTILE_SECRET_KEY unset — skipping Turnstile verification");
    return { ok: true, skipped: true };
  }
  if (typeof token !== "string" || token.trim() === "") {
    return { ok: false, skipped: false };
  }
  try {
    const params = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") params.set("remoteip", ip);
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const data = (await res.json().catch(() => ({ success: false }))) as { success?: boolean };
    return { ok: data.success === true, skipped: false };
  } catch (err) {
    console.error("[lead-guard] Turnstile verification error", err);
    return { ok: false, skipped: false };
  }
}

// ── Content heuristics ───────────────────────────────────────────────────────

/** Cheap message-body spam signals. Returns a reason string, or null if clean. */
export function spamContentReason(message: string): string | null {
  if ((message.match(/https?:\/\//gi) || []).length >= 3) return "link-stuffing";
  if (/\[(?:url|link)\b/i.test(message)) return "bbcode-links";
  // Entirely non-Latin body: has real letters but not a single Latin a–z.
  const letters = message.match(/\p{L}/gu) || [];
  if (letters.length >= 5 && !/[a-z]/i.test(message)) return "non-latin-script";
  return null;
}

// ── Time-trap ────────────────────────────────────────────────────────────────

// Minimum time a human plausibly takes to fill the form, and a sane upper bound.
const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 60 * 60 * 1000; // 1 hour

// ── The guard ────────────────────────────────────────────────────────────────

export interface GuardOptions {
  /** Route/action name for logging + rate-limit bucketing (e.g. 'contact'). */
  route: string;
  /** Client IP (best-effort, from proxy headers). */
  ip: string;
  /** Require a valid Turnstile token. Only true for entry points with a real widget. */
  requireTurnstile?: boolean;
  /** Apply the free/disposable email-domain policy to body.email. Default true. */
  checkEmail?: boolean;
  /** Apply body.message content heuristics. Default true. */
  checkContent?: boolean;
  /**
   * Per-IP rate limiter: returns true if the request is ALLOWED. Injected so the
   * guard stays framework-agnostic — this repo passes the Upstash-backed limiter
   * from src/lib/ratelimit.ts. Omit/false to disable.
   */
  rateLimit?: ((key: string) => Promise<boolean>) | false;
}

export type GuardResult =
  | { ok: true }
  /** Silently drop as a fake success — nothing should be persisted. */
  | { ok: false; kind: "drop"; reason: string }
  /** Surface a real error to a human (currently only the email policy). */
  | { ok: false; kind: "reject"; error: string };

/**
 * Run the shared guard against the submitted fields. The caller maps the result
 * to a response: `drop` → the entry point's usual success shape (fake success),
 * `reject` → a real error with the given message.
 */
export async function guardLead(
  body: Record<string, unknown>,
  opts: GuardOptions
): Promise<GuardResult> {
  const {
    route,
    ip,
    requireTurnstile = false,
    checkEmail = true,
    checkContent = true,
    rateLimit = false,
  } = opts;

  const drop = (reason: string): GuardResult => {
    console.warn(`[lead-guard] ${route} drop (${reason})`, { ip });
    return { ok: false, kind: "drop", reason };
  };

  // 1. Honeypot — hidden "website" field must stay empty.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return drop("honeypot");
  }

  // 2. Turnstile (only when the entry point has a real widget).
  if (requireTurnstile) {
    const { ok } = await verifyTurnstile(body.turnstileToken, ip);
    if (!ok) return drop("turnstile");
  }

  // 3. Email-domain policy — a real error with a human message (B2B: work email only).
  if (checkEmail) {
    const email = typeof body.email === "string" ? body.email : "";
    if (email.includes("@")) {
      const cls = classifyEmailDomain(email);
      if (cls) {
        console.warn(`[lead-guard] ${route} email-policy reject (${cls})`, { ip });
        return { ok: false, kind: "reject", error: WORK_EMAIL_MESSAGE };
      }
    }
  }

  // 4. Rate limit.
  if (rateLimit) {
    if (!(await rateLimit(`${route}:${ip}`))) return drop("rate-limit");
  }

  // 5. Content heuristics.
  if (checkContent && typeof body.message === "string" && body.message.trim() !== "") {
    const reason = spamContentReason(body.message);
    if (reason) return drop(reason);
  }

  // 6. Time-trap — cheap extra only; trivially forgeable, so absence is NOT
  // penalized (a "0"/missing stamp means JS was off — skip the check).
  const startedAt = Number(body.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return drop("time-trap");
  }

  return { ok: true };
}
