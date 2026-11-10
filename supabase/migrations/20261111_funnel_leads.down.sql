-- Rollback: removes the funnel leads table and every lead stored in it.
-- Export the leads first (Supabase → Table editor → funnel_leads → Export to CSV).
begin;
drop table if exists public.funnel_leads;
commit;
