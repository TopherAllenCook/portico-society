-- Track when the ready-report email fails to send so the recovery cron
-- (and the admin UI) can surface stuck jobs that completed but never
-- reached the lead's inbox.
--
-- Idempotent. Run in Supabase SQL Editor.

alter table public.audit_jobs
  add column if not exists email_delivery_failed_at timestamptz;

create index if not exists audit_jobs_email_delivery_failed_idx
  on public.audit_jobs (email_delivery_failed_at)
  where email_delivery_failed_at is not null;
