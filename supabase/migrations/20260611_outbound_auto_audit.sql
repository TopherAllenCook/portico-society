-- Bridge outbound scraper → audit engine.
--
-- Adds auto-audit tracking to outbound_leads (which leads became audits) and
-- per-job auto-audit configuration to outbound_scrape_jobs.
-- Idempotent. Safe to re-run.

-- per-job flag: should this scrape job auto-submit?
alter table public.outbound_scrape_jobs
  add column if not exists auto_audit boolean not null default false;
alter table public.outbound_scrape_jobs
  add column if not exists auto_audit_threshold int not null default 60;

-- per-lead audit bridge
alter table public.outbound_leads
  add column if not exists audit_id uuid references public.audit_jobs(id) on delete set null;
alter table public.outbound_leads
  add column if not exists auto_audit_status text; -- null | created | failed | skipped

create index if not exists outbound_leads_audit_id_idx on public.outbound_leads (audit_id);
