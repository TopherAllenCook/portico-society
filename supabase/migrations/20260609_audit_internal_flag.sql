-- Internal (silent) audits: run the full audit engine for Sam's pre-call prep
-- without any prospect-facing side effects. The flag lives on the row (not the
-- request) so the recovery cron can re-kick a stuck job without leaking the
-- ready email to the placeholder address.
alter table audit_jobs add column if not exists internal boolean not null default false;
comment on column audit_jobs.internal is 'Internal pre-call audit: never email the prospect, no nurture, no HubSpot. Used by the Sam pre-call triage pipeline.';
