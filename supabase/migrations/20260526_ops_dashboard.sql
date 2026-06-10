-- VerveMD Ops Dashboard schema.
--
-- One brain that answers "is everything I run still working?"
--
-- health_checks   : auto-checked system health. Upsert by key. The dashboard
--                   reads cached results; a cron writes them every N minutes.
-- checklist_items : manual recurring tasks the script can't verify (eyeball
--                   homepage, submit a real audit form). Reset based on
--                   frequency (daily/weekly/monthly).
--
-- Idempotent. Safe to re-run.

create extension if not exists "pgcrypto";

create table if not exists public.health_checks (
  key              text primary key,
  category         text not null,                -- website | email | cron | data
  label            text not null,                -- human-readable display name
  status           text not null default 'stale',-- ok | warn | fail | stale
  value            jsonb not null default '{}'::jsonb,
  last_error       text,
  checked_at       timestamptz,
  next_check_due   timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists health_checks_category_idx on public.health_checks (category);
create index if not exists health_checks_status_idx   on public.health_checks (status);

create table if not exists public.checklist_items (
  id                 uuid primary key default gen_random_uuid(),
  title              text not null,
  category           text not null default 'weekly',  -- daily | weekly | monthly
  frequency          text not null default 'weekly',  -- same domain as category for v1
  order_index        int  not null default 0,
  last_completed_at  timestamptz,
  next_due_at        timestamptz,
  notes              text,
  created_at         timestamptz not null default now()
);

create index if not exists checklist_items_category_idx on public.checklist_items (category);
create index if not exists checklist_items_due_idx      on public.checklist_items (next_due_at);

alter table public.health_checks    enable row level security;
alter table public.checklist_items  enable row level security;
