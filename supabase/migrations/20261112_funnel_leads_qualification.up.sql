-- Qualification answers from the demo form on /tech-retail/offer: how the shop keeps records today,
-- and what the system should handle first. Two new nullable columns only: existing rows are kept
-- unchanged (both stay empty for them), and nothing is rewritten.
-- Apply this before deploying the form that sends these answers, or new leads will fail to save.
-- The checks repeat the form's own validation (src/lib/funnel-lead.ts).
begin;

alter table public.funnel_leads
  add column if not exists current_process text
    check (current_process in ('register', 'sheets', 'software', 'whatsapp')),
  add column if not exists needs text[]
    check (cardinality(needs) between 1 and 5 and needs <@ array['trade', 'stock', 'warranty', 'orders', 'staff']::text[]);

commit;
