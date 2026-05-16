-- Verve MD audit pipeline schema.
--
-- Idempotent. Safe to run on a fresh project or to top-up a partially-set-up
-- project. Run in Supabase SQL Editor (Project → SQL → New Query → paste → Run).

create extension if not exists "pgcrypto";

------------------------------------------------------------------------------
-- audit_jobs : one row per submitted audit
------------------------------------------------------------------------------
create table if not exists public.audit_jobs (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),

  -- intake
  clinic_name         text   not null,
  website_url         text   not null,
  contact_name        text   not null,
  contact_email       text   not null,
  contact_phone       text,
  specialty           text   not null,                       -- longevity | concierge | aesthetic | mixed
  city                text   not null,
  state               text,
  challenge           text,

  -- run state
  status              text   not null default 'queued',      -- queued | running | partial | complete | failed
  share_token         text   not null default encode(gen_random_bytes(18), 'base64'),
  started_at          timestamptz,
  completed_at        timestamptz,
  competitors         jsonb,
  error_message       text,
  delivered_at        timestamptz,

  -- crm / nurture
  pipeline_status     text   not null default 'open',        -- open | call_booked | proposal | won | lost
  nurture_paused_at   timestamptz,
  last_contact_at     timestamptz
);

create unique index if not exists audit_jobs_share_token_idx on public.audit_jobs (share_token);
create index        if not exists audit_jobs_status_idx      on public.audit_jobs (status);
create index        if not exists audit_jobs_email_idx       on public.audit_jobs (contact_email);

------------------------------------------------------------------------------
-- audit_module_results : per-module run record (crawl, pagespeed, geo, …)
------------------------------------------------------------------------------
create table if not exists public.audit_module_results (
  id            uuid primary key default gen_random_uuid(),
  job_id        uuid not null references public.audit_jobs(id) on delete cascade,
  module        text not null,            -- crawl | pagespeed | schema | dataforseo | geo | places | leadgen | competitor_crawl
  target        text not null,
  status        text not null default 'running',  -- pending | running | complete | failed | skipped
  payload       jsonb,
  error_message text,
  started_at    timestamptz not null default now(),
  completed_at  timestamptz
);

create index if not exists audit_module_results_job_idx on public.audit_module_results (job_id);

------------------------------------------------------------------------------
-- audit_synthesis : final Claude-generated report for one job
------------------------------------------------------------------------------
create table if not exists public.audit_synthesis (
  job_id              uuid primary key references public.audit_jobs(id) on delete cascade,
  scorecard           jsonb not null,
  competitors         jsonb not null,
  prioritized_moves   jsonb not null,
  executive_summary   text  not null,
  narrative_markdown  text  not null,
  model               text,
  input_tokens        int,
  output_tokens       int,
  cache_read_tokens   int,
  created_at          timestamptz not null default now()
);

------------------------------------------------------------------------------
-- audit_followups : scheduled nurture queue rows
------------------------------------------------------------------------------
create table if not exists public.audit_followups (
  id              uuid primary key default gen_random_uuid(),
  job_id          uuid not null references public.audit_jobs(id) on delete cascade,
  step_key        text not null,
  step_index      int  not null,
  scheduled_for   timestamptz not null,
  status          text not null default 'scheduled',  -- scheduled | sent | skipped | paused | failed
  sent_at         timestamptz,
  resend_id       text,
  error_message   text,
  created_at      timestamptz not null default now(),
  unique (job_id, step_key)
);

create index if not exists audit_followups_due_idx on public.audit_followups (status, scheduled_for);

------------------------------------------------------------------------------
-- audit_email_events : send/open/click log for emails sent on a job
------------------------------------------------------------------------------
create table if not exists public.audit_email_events (
  id            uuid primary key default gen_random_uuid(),
  job_id        uuid not null references public.audit_jobs(id) on delete cascade,
  followup_id   uuid references public.audit_followups(id) on delete set null,
  event_type    text not null,            -- sent | delivered | opened | clicked | bounced | complained
  payload       jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists audit_email_events_job_idx on public.audit_email_events (job_id);

------------------------------------------------------------------------------
-- RLS: lock everything down. Service role bypasses RLS so the server keeps
-- working. No anon/auth user should ever read these tables.
------------------------------------------------------------------------------
alter table public.audit_jobs            enable row level security;
alter table public.audit_module_results  enable row level security;
alter table public.audit_synthesis       enable row level security;
alter table public.audit_followups       enable row level security;
alter table public.audit_email_events    enable row level security;
