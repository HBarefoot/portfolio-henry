-- Contact-form lead table hardening (defense-in-depth).
-- Run in the Supabase SQL editor against the `canvas` schema.
--
-- Goal: the public `anon` key (used server-side by submitLead) can ONLY insert
-- leads — it cannot read, update, or delete them — and oversized rows are
-- rejected at the database, matching the app-side caps in submitLead.ts.
--
-- ⚠️ The `canvas` schema may be SHARED with other projects. Before running
-- section 2 (RLS), confirm nothing else reads canvas.leads with the anon key,
-- or those reads will start returning zero rows. Run section 0 first.

-- =====================================================================
-- 0. VERIFY FIRST (read-only) — run these and eyeball the results.
-- =====================================================================

-- 0a. Actual columns + nullability + types (confirm names match section 1).
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'canvas' and table_name = 'leads'
order by ordinal_position;

-- 0b. Is RLS already enabled, and what policies already exist?
select relrowsecurity as rls_enabled
from pg_class where oid = 'canvas.leads'::regclass;

select policyname, cmd, roles
from pg_policies where schemaname = 'canvas' and tablename = 'leads';

-- 0c. Would any EXISTING row violate the new length caps? Must return 0 rows.
select count(*) as rows_too_long
from canvas.leads
where char_length(name) > 100
   or char_length(email) > 200
   or char_length(coalesce(company, '')) > 120
   or char_length(coalesce(role, '')) > 120
   or char_length(coalesce(message, '')) > 4000;

-- =====================================================================
-- 1. Length CHECK constraints (mirror MAX in src/app/actions/submitLead.ts).
--    Re-runnable: drops the constraint first if it already exists.
-- =====================================================================
alter table canvas.leads drop constraint if exists leads_name_len;
alter table canvas.leads drop constraint if exists leads_email_len;
alter table canvas.leads drop constraint if exists leads_company_len;
alter table canvas.leads drop constraint if exists leads_role_len;
alter table canvas.leads drop constraint if exists leads_message_len;

alter table canvas.leads
  add constraint leads_name_len    check (char_length(name)    <= 100),
  add constraint leads_email_len   check (char_length(email)   <= 200),
  add constraint leads_company_len check (company is null or char_length(company) <= 120),
  add constraint leads_role_len    check (role    is null or char_length(role)    <= 120),
  add constraint leads_message_len check (message is null or char_length(message) <= 4000);

-- =====================================================================
-- 2. Row Level Security: insert-only for anon.
--    Only run after section 0b/0c confirm it's safe (see warning above).
--
--    ⚠️ Run BOTH statements below together. Enabling RLS WITHOUT also creating
--    the insert policy blocks every contact-form submission with:
--      401 {"code":"42501","message":"new row violates row-level security
--      policy for table \"leads\""}
--    The same applies if you toggle "Enable RLS" in the Supabase dashboard —
--    it enables RLS with zero policies. Always pair it with the policy below.
-- =====================================================================
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
