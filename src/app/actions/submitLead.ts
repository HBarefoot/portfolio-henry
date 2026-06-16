'use server'

export type LeadFormState =
  | { ok: true; id: string }
  | { ok: false; error: string }
  | null

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (formData.get('website')) {
    return { ok: false, error: 'Invalid submission.' }
  }

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const company = (formData.get('company') as string | null)?.trim() || null
  const role = (formData.get('role') as string | null)?.trim() || null
  const message = (formData.get('message') as string | null)?.trim() || null

  if (!name) return { ok: false, error: 'Name is required.' }
  if (!email) return { ok: false, error: 'Email is required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[submitLead] Missing SUPABASE_URL or SUPABASE_ANON_KEY')
    return { ok: false, error: 'Service unavailable — please email me directly.' }
  }

  let res: Response
  try {
    res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Content-Profile': 'canvas',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ name, email, company, role, message, source: 'portfolio_contact' }),
    })
  } catch (err) {
    console.error('[submitLead] fetch failed', err)
    return { ok: false, error: 'Network error — please try again or email me directly.' }
  }

  if (!res.ok) {
    const body = await res.text()
    console.error('[submitLead] Supabase error', res.status, body)
    return { ok: false, error: 'Something went wrong — please try again or email me directly.' }
  }

  const rows: { id: string }[] = await res.json()
  return { ok: true, id: rows[0]?.id ?? '' }
}
