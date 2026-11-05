-- Rollback restores the previous public-read/public-delete behavior from the
-- original schema. Use only when deliberately rolling back that authorization.
begin;
drop policy if exists "Portfolio admin reads messages" on public.messages;
drop policy if exists "Portfolio admin deletes messages" on public.messages;
create policy "Enable public select" on public.messages for select to public using (true);
create policy "Enable public delete" on public.messages for delete to public using (true);
commit;
