"use server";

export type LeadResult =
  | { ok: true; id: string; source: string }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(_prev: LeadResult | null, form: FormData): Promise<LeadResult> {
  // Honeypot — bots fill this hidden field; humans never see it
  if (form.get("website")) {
    return { ok: false, error: "Submission rejected." };
  }

  const name = (form.get("name") as string | null)?.trim() ?? "";
  const email = (form.get("email") as string | null)?.trim() ?? "";
  const company = (form.get("company") as string | null)?.trim() ?? "";
  const role = (form.get("role") as string | null)?.trim() ?? "";
  const message = (form.get("message") as string | null)?.trim() ?? "";

  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[submitLead] Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return { ok: false, error: "Service temporarily unavailable. Please email me directly." };
  }

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
