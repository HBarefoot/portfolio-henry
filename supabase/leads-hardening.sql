-- Contact-form lead table hardening (defense-in-depth).
-- Run once in the Supabase SQL editor against the `canvas` schema.
--
-- Goal: the public `anon` key (used server-side by submitLead) can ONLY insert
-- leads — it cannot read, update, or delete them — and oversized rows are
-- rejected at the database, matching the app-side caps in submitLead.ts.

-- 1. Length CHECK constraints (mirror MAX in src/app/actions/submitLead.ts).
alter table canvas.leads
  add constraint leads_name_len    check (char_length(name)    <= 100),
  add constraint leads_email_len   check (char_length(email)   <= 200),
  add constraint leads_company_len check (company is null or char_length(company) <= 120),
  add constraint leads_role_len    check (role    is null or char_length(role)    <= 120),
  add constraint leads_message_len check (message is null or char_length(message) <= 4000);

-- 2. Row Level Security: insert-only for anon.
alter table canvas.leads enable row level security;

-- Allow anonymous inserts (the contact form). No USING clause = no read/update/delete.
drop policy if exists "anon can insert leads" on canvas.leads;
create policy "anon can insert leads"
  on canvas.leads
  for insert
  to anon
  with check (true);

-- Note: with RLS enabled and only an INSERT policy, anon SELECT/UPDATE/DELETE
-- return zero rows / are denied. Read leads with the service_role key or the
-- Supabase dashboard, which bypass RLS.
