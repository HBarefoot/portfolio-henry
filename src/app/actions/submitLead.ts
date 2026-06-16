'use server';

export type LeadResult =
  | { ok: true; source: string }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(_prev: LeadResult | null, formData: FormData): Promise<LeadResult> {
  // Honeypot: only bots fill this hidden field
  const website = formData.get('website') as string;
  if (website) return { ok: false, error: 'Submission rejected.' };

  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const company = (formData.get('company') as string | null)?.trim() ?? '';
  const role = (formData.get('role') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  if (!name) return { ok: false, error: 'Name is required.' };
  if (!email) return { ok: false, error: 'Email is required.' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Please enter a valid email address.' };

  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    console.error('[submitLead] Missing SUPABASE_URL or SUPABASE_ANON_KEY');
    return { ok: false, error: 'Server configuration error. Please email directly.' };
  }

  const source = 'portfolio_contact';
  const payload: Record<string, string> = { name, email, source };
  if (company) payload.company = company;
  if (role) payload.role = role;
  if (message) payload.message = message;

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        // Target the canvas schema via PostgREST Content-Profile header
        'Content-Profile': 'canvas',
        // return=minimal: anon has INSERT only, not SELECT — representation would 401
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[submitLead] Supabase error', res.status, text);
      return { ok: false, error: 'Could not save your message. Please try emailing directly.' };
    }

    // 2xx with empty body is success — no row is returned with return=minimal
    return { ok: true, source };
  } catch (err) {
    console.error('[submitLead] Network error', err);
    return { ok: false, error: 'Network error. Please try again or email directly.' };
  }
}
