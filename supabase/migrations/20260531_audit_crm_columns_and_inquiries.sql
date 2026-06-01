-- Capture schema that the app already relies on but that was never committed,
-- plus a durable home for contact-form inquiries.
--
-- Idempotent. Safe to run on a fresh project or to top-up an existing one.
-- Run in Supabase SQL Editor (Project → SQL → New Query → paste → Run).

------------------------------------------------------------------------------
-- audit_jobs : columns the admin pipeline UI writes (added live, never in a
-- migration until now — a fresh deploy would 500 on the audit detail page).
------------------------------------------------------------------------------
alter table public.audit_jobs
  add column if not exists internal_notes  text;

alter table public.audit_jobs
  add column if not exists next_action_at  timestamptz;

-- The app's pipeline vocabulary is new | reviewed | contacted | call_booked |
-- proposal | nurture | won | lost. The original migration defaulted new rows to
-- 'open', which renders as an unknown status. Align the default and migrate any
-- legacy 'open' rows to 'new'.
--
-- Note: the live VerveMD DB models pipeline_status as a Postgres enum (where
-- 'open' is not even a valid label). The ::text cast keeps the UPDATE safe on
-- both the enum schema (matches nothing, no error) and a fresh text-based one.
alter table public.audit_jobs
  alter column pipeline_status set default 'new';

update public.audit_jobs
  set pipeline_status = 'new'
  where pipeline_status::text = 'open';

create index if not exists audit_jobs_next_action_idx
  on public.audit_jobs (next_action_at)
  where next_action_at is not null;

------------------------------------------------------------------------------
-- inquiries : contact-form submissions. Previously only emailed + mirrored to
-- HubSpot, so a send/HubSpot hiccup lost the lead. Now persisted here first.
------------------------------------------------------------------------------
create table if not exists public.inquiries (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  name               text not null,
  email              text not null,
  practice           text,
  message            text not null,
  source             text not null default 'contact_form',
  hubspot_contact_id text,
  handled_at         timestamptz
);

create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx   on public.inquiries (email);

-- Lock it down. Service role bypasses RLS so the server keeps working; no
-- anon/auth user should ever read this table.
alter table public.inquiries enable row level security;
