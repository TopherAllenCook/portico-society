-- VerveMD Mission Control schema.
--
-- Implements Jack Roberts' "Chief Wigum 2.0" pattern (lesson 85, May 18 2026):
-- long-term goals broken into mini-goals, each split between AI tasks and
-- real-world handshakes that require Chris or Sam in person.
--
-- Idempotent. Safe to re-run.

create extension if not exists "pgcrypto";

------------------------------------------------------------------------------
-- missions : one long-term goal (3-4 week sprint, binary outcome)
------------------------------------------------------------------------------
create table if not exists public.missions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  -- the goal itself
  title             text not null,                   -- "Launch Hermes course to 500 signups"
  binary_outcome    text not null,                   -- "500 opted into free 5-day Hermes email course"
  target_date       date,                            -- 3-4 weeks out
  status            text not null default 'planning',-- planning | active | shipped | dropped
  owner             text not null default 'chris',   -- chris | sam

  -- the 8 intake answers (topic, audience, accounts, assets, constraints, etc.)
  context           jsonb not null default '{}'::jsonb,

  -- the prompt that was fed to Claude/Hermes to expand the mission
  generation_prompt text,
  generation_model  text,                            -- claude-opus-4-7 | hermes | ...

  started_at        timestamptz,
  shipped_at        timestamptz,
  dropped_reason    text,

  -- ui hints
  active_indicator  boolean not null default false   -- the "green buzzing button" — true while a mini-goal is running
);

create index if not exists missions_status_idx on public.missions (status);
create index if not exists missions_owner_idx  on public.missions (owner);

------------------------------------------------------------------------------
-- mini_goals : sub-goal inside a mission (typically 4-6 per mission)
------------------------------------------------------------------------------
create table if not exists public.mini_goals (
  id            uuid primary key default gen_random_uuid(),
  mission_id    uuid not null references public.missions(id) on delete cascade,
  created_at    timestamptz not null default now(),

  order_index   int  not null,                       -- 1..N ordering inside the mission
  title         text not null,                       -- "Build opt-in engine"
  ai_brief      text not null,                       -- copy-paste-ready /goal prompt for Claude or Hermes
  assignee      text not null default 'ai',          -- ai | chris | sam
  status        text not null default 'pending',     -- pending | active | waiting_on_human | done | blocked

  -- where the mini-goal's files live (loom recordings, drafts, assets)
  assets_path   text,                                -- e.g. "business/missions/<mission-id>/mini-2/"

  started_at    timestamptz,
  completed_at  timestamptz,
  output_notes  text,

  unique (mission_id, order_index)
);

create index if not exists mini_goals_mission_idx  on public.mini_goals (mission_id);
create index if not exists mini_goals_status_idx   on public.mini_goals (status);
create index if not exists mini_goals_assignee_idx on public.mini_goals (assignee);

------------------------------------------------------------------------------
-- handshakes : discrete human-required actions inside a mini-goal
--
-- "Record 4 promo videos, 90 min, save to <path>" — these are the moments
-- where AI tags Chris or Sam and waits.
------------------------------------------------------------------------------
create table if not exists public.handshakes (
  id            uuid primary key default gen_random_uuid(),
  mini_goal_id  uuid not null references public.mini_goals(id) on delete cascade,
  created_at    timestamptz not null default now(),

  description   text not null,                       -- "Record 4 promo videos, time-boxed 90 min"
  assignee      text not null,                       -- chris | sam
  status        text not null default 'pending',     -- pending | done | skipped
  due_at        timestamptz,
  completed_at  timestamptz,
  notes         text                                 -- short note on outcome (e.g. "take 3 is best")
);

create index if not exists handshakes_mini_goal_idx on public.handshakes (mini_goal_id);
create index if not exists handshakes_assignee_idx  on public.handshakes (assignee, status);

------------------------------------------------------------------------------
-- RLS : closed. Service-role only. Mission Control is admin-surface only.
------------------------------------------------------------------------------
alter table public.missions    enable row level security;
alter table public.mini_goals  enable row level security;
alter table public.handshakes  enable row level security;
