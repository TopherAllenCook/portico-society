-- Auto-generated homepage mockups for the outbound mockup track.
-- One row per prospect; /preview/[slug] renders from this config and the
-- Mockup Autopilot n8n workflow writes the resulting URL back to Airtable.
create table if not exists mockup_previews (
  slug text primary key,
  company_name text not null,
  city text,
  state text,
  phone text,
  rating numeric,
  reviews integer,
  specialty text not null default 'hvac',
  website text,
  accent text not null default '#0D6E7A',
  airtable_record_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Service-role access only (the app renders previews server-side with the
-- admin client). No anon policies on purpose.
alter table mockup_previews enable row level security;
