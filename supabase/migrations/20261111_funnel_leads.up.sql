-- Leads from the short form on /tech-retail/offer (Pakistan Meta ad campaigns).
-- New table only: no existing table or row is changed.
-- Visitors may insert; only the portfolio admin may read or delete.
-- The checks repeat the form's own validation (src/lib/funnel-lead.ts), so a
-- request sent straight to the API cannot store anything the form would refuse.
begin;

create table if not exists public.funnel_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  shop_type text not null check (shop_type in ('pc', 'laptop', 'mobile', 'camera', 'console')),
  city text not null check (char_length(city) between 2 and 60),
  branches text not null check (branches in ('1', '2-3', '4+')),
  whatsapp text not null check (whatsapp ~ '^\+923[0-9]{9}$'),
  language text not null check (language in ('en', 'ur-en')),
  page_path text check (char_length(page_path) <= 200),
  utm_source text check (char_length(utm_source) <= 200),
  utm_medium text check (char_length(utm_medium) <= 200),
  utm_campaign text check (char_length(utm_campaign) <= 200),
  utm_content text check (char_length(utm_content) <= 200),
  utm_term text check (char_length(utm_term) <= 200),
  fbclid text check (char_length(fbclid) <= 500)
);

create index if not exists funnel_leads_created_at_idx on public.funnel_leads (created_at desc);

alter table public.funnel_leads enable row level security;

create policy "Visitors submit funnel leads"
  on public.funnel_leads for insert to anon, authenticated
  with check (true);

create policy "Portfolio admin reads funnel leads"
  on public.funnel_leads for select to authenticated
  using (auth.jwt() -> 'app_metadata' ->> 'portfolio_admin' = 'true');

create policy "Portfolio admin deletes funnel leads"
  on public.funnel_leads for delete to authenticated
  using (auth.jwt() -> 'app_metadata' ->> 'portfolio_admin' = 'true');

commit;
