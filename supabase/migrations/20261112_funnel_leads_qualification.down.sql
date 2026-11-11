-- Rollback: removes the two qualification columns and the answers stored in them.
-- Every other lead field is kept. Export the leads first if you need those answers.
begin;
alter table public.funnel_leads drop column if exists needs, drop column if exists current_process;
commit;
