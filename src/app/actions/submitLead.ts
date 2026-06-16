"use server";

export type LeadState =
  | { ok: true; id: string; source: string }
  | { ok: false; error: string }
  | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot — bots fill this, humans don't see it
  if (formData.get("website")) {
    return { ok: false, error: "Submission rejected." };
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const company = (formData.get("company") as string | null)?.trim() ?? "";
  const role = (formData.get("role") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { ok: false, error: "Service temporarily unavailable. Please email directly." };
  }

  const payload: Record<string, string> = { name, email, source: "portfolio_contact" };
  if (company) payload.company = company;
  if (role) payload.role = role;
  if (message) payload.message = message;

  const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Profile": "canvas",
      Accept: "application/json",
      Prefer: "return=representation",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      detail = body.message ?? body.details ?? detail;
    } catch {
      // ignore parse failure
    }
    return { ok: false, error: `Could not save your message (${detail}). Please try emailing directly.` };
  }

  const [row] = await res.json();
  return { ok: true, id: row.id as string, source: "portfolio_contact" };
}
