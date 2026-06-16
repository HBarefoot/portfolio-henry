"use server";

export type LeadResult =
  | { ok: true; id: string; source: string }
  | { ok: false; error: string };

export async function submitLead(_prev: LeadResult | null, formData: FormData): Promise<LeadResult> {
  if (formData.get("website")) {
    return { ok: false, error: "Invalid submission." };
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const company = (formData.get("company") as string | null)?.trim() ?? "";
  const role = (formData.get("role") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { ok: false, error: "Service temporarily unavailable. Please email directly." };
  }

  const payload: Record<string, string> = { name, email, source: "portfolio_contact" };
  if (company) payload.company = company;
  if (role) payload.role = role;
  if (message) payload.message = message;

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Profile": "canvas",
        "Accept-Profile": "canvas",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[submitLead] Supabase error:", res.status, text);
      return { ok: false, error: "Failed to save your message. Please try again." };
    }

    const rows = (await res.json()) as Array<{ id: string }>;
    const id = rows[0]?.id ?? "";
    return { ok: true, id, source: "portfolio_contact" };
  } catch (err) {
    console.error("[submitLead] Network error:", err);
    return { ok: false, error: "Network error. Please try again." };
  }
}
