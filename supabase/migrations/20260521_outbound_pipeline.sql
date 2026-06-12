-- Outbound lead-scraping pipeline schema.
--
-- Mirrors the audit pipeline patterns: idempotent, partial-failure recoverable,
-- one row per scrape job + one row per discovered lead. Safe to re-run.
--
-- Run in Supabase SQL Editor (Project → SQL → New Query → paste → Run).

create extension if not exists "pgcrypto";

------------------------------------------------------------------------------
-- outbound_scrape_jobs : one row per scrape run
------------------------------------------------------------------------------
create table if not exists public.outbound_scrape_jobs (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),

  -- input
  city                text not null,
  state               text not null,
  specialty           text,                                      -- longevity | concierge | aesthetic | null (all)
  max_results         int  not null default 100,
  source              text not null default 'places',            -- places | apify | both

  -- run state
  status              text not null default 'queued',            -- queued | running | partial | complete | failed
  started_at          timestamptz,
  completed_at        timestamptz,
  apify_actor         text,                                      -- e.g. apify/google-maps-scraper
  raw_count           int,                                       -- rows pulled from Apify
  scored_count        int,                                       -- rows successfully scored
  error_message       text
);

create index if not exists outbound_scrape_jobs_status_idx on public.outbound_scrape_jobs (status);
create index if not exists outbound_scrape_jobs_city_idx   on public.outbound_scrape_jobs (city);

------------------------------------------------------------------------------
-- outbound_leads : one row per discovered clinic
------------------------------------------------------------------------------
create table if not exists public.outbound_leads (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),

  -- source
  scrape_job_id       uuid references public.outbound_scrape_jobs(id) on delete set null,
  apify_place_id      text,                                      -- de-dupe key from Google Maps

  -- identity
  clinic_name         text not null,
  specialty           text,                                      -- inferred from search query
  website             text,
  phone               text,
  address             text,
  city                text,
  state               text,
  postal_code         text,

  -- Google Maps signals
  google_place_url    text,
  google_rating       numeric(3,2),
  google_review_count int,
  categories          text[],

  -- website enrichment (from Firecrawl)
  tech_stack          jsonb,                                     -- { booking_widget, chat_widget, analytics, cms }
  marketing_signals   jsonb,                                     -- { has_form, cta_above_fold, blog, schema, ... }
  owner_names         text[],                                    -- pulled from About / Team pages

  -- contact discovery
  primary_email       text,
  email_patterns      jsonb,                                     -- ranked list of candidate emails
  mx_verified         boolean,                                   -- domain has MX records (cheap check, not address-level)

  -- scoring
  icp_score           int,                                       -- 0-100
  icp_reasoning       text,                                      -- 1-2 sentence why
  scored_at           timestamptz,

  -- workflow (Sam's column)
  status              text not null default 'new',               -- new | reviewing | queued | sent | replied | booked | rejected
  reviewed_by         text,                                      -- email/handle
  notes               text,                                      -- Sam's notes
  instantly_campaign_id text,                                    -- when pushed to Instantly
  last_touched_at     timestamptz,

  -- enrichment run state
  enriched_at         timestamptz,
  enrichment_error    text,

  unique (scrape_job_id, apify_place_id)
);

create index if not exists outbound_leads_status_idx       on public.outbound_leads (status);
create index if not exists outbound_leads_icp_score_idx    on public.outbound_leads (icp_score desc);
create index if not exists outbound_leads_scraped_at_idx   on public.outbound_leads (scrape_job_id, created_at);
create index if not exists outbound_leads_email_idx        on public.outbound_leads (primary_email);
create index if not exists outbound_leads_city_idx         on public.outbound_leads (city);

------------------------------------------------------------------------------
-- daily-cap helper view (used to enforce 100 leads/day across all jobs)
------------------------------------------------------------------------------
create or replace view public.outbound_leads_today as
  select count(*)::int as count
  from public.outbound_leads
  where created_at >= date_trunc('day', now() at time zone 'utc');

------------------------------------------------------------------------------
-- RLS: lock everything down. Service role bypasses RLS so the server keeps
-- working. No anon/auth user should ever read these tables.
------------------------------------------------------------------------------
alter table public.outbound_scrape_jobs enable row level security;
alter table public.outbound_leads       enable row level security;
