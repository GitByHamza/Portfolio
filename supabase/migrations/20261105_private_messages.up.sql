-- Apply before deploying the authenticated dashboard. This migration changes
-- authorization only; it does not alter or delete existing contact messages.
begin;
alter table public.messages enable row level security;
drop policy if exists "Enable public select" on public.messages;
drop policy if exists "Enable public delete" on public.messages;

create policy "Portfolio admin reads messages"
  on public.messages for select to authenticated
  using (auth.jwt() -> 'app_metadata' ->> 'portfolio_admin' = 'true');

create policy "Portfolio admin deletes messages"
  on public.messages for delete to authenticated
  using (auth.jwt() -> 'app_metadata' ->> 'portfolio_admin' = 'true');
commit;
