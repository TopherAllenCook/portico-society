/**
 * Mission Control dashboard queries.
 *
 * Shared data layer for `/admin/mission-control`. Mirrors the queries used by
 * the read-only snapshot agents under `business/agents/`. Pure read-only.
 *
 * Service-role only. Never import from a client component.
 */

import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { adminSupabase } from '@/lib/audit/supabase'

export type MissionStatus = 'planning' | 'active' | 'shipped' | 'dropped'
export type MissionOwner = 'chris' | 'sam'
export type MiniGoalStatus = 'pending' | 'active' | 'waiting_on_human' | 'done' | 'blocked'
export type MiniGoalAssignee = 'ai' | 'chris' | 'sam'
export type HandshakeStatus = 'pending' | 'done' | 'skipped'

export interface MissionRow {
  id: string
  created_at: string
  title: string
  binary_outcome: string
  target_date: string | null
  status: MissionStatus
  owner: MissionOwner
  started_at: string | null
  shipped_at: string | null
  dropped_reason: string | null
  active_indicator: boolean
}

export interface MiniGoalRow {
  id: string
  mission_id: string
  order_index: number
  title: string
  ai_brief: string
  assignee: MiniGoalAssignee
  status: MiniGoalStatus
  assets_path: string | null
  started_at: string | null
  completed_at: string | null
  output_notes: string | null
}

export interface HandshakeRow {
  id: string
  mini_goal_id: string
  description: string
  assignee: MissionOwner
  status: HandshakeStatus
  due_at: string | null
  completed_at: string | null
  notes: string | null
  created_at: string
}

export interface MissionWithChildren extends MissionRow {
  mini_goals: MiniGoalRow[]
  handshakes: HandshakeRow[]
  progress: { done: number; total: number }
}

export interface AuditStatusSummary {
  ok: true
  today: number
  week: number
  total: number
  funnel: { open: number; call_booked: number; proposal: number; won: number; lost: number }
  stuck: number
  hotLeads: number
}

export interface OutboundStatusSummary {
  ok: true
  total: number
  last24h: number
  last7d: number
  hot: number
  replies: number
  staleFollowups: number
}

export interface FinanceStatusSummary {
  ok: true
  floorMonthly: number
  winsThisMonth: number
  projectedMrr: number
  floorCovered: number
  pipelineValue: number
}

export interface ContentStatusSummary {
  ok: true
  ideas: number
  drafts: number
  scheduled: number
  published: number
}

export type Degraded<T> = T | { ok: false; reason: string }

export async function getActiveMissions(): Promise<MissionWithChildren[]> {
  const sb = adminSupabase()
  const { data: missions, error } = await sb
    .from('missions')
    .select('*')
    .eq('status', 'active')
    .order('target_date', { ascending: true, nullsFirst: false })

  if (error || !missions || missions.length === 0) return []

  const missionIds = missions.map(m => m.id)

  const { data: miniGoals } = await sb
    .from('mini_goals')
    .select('*')
    .in('mission_id', missionIds)
    .order('order_index', { ascending: true })

  const goals = (miniGoals ?? []) as MiniGoalRow[]
  const goalIds = goals.map(g => g.id)

  const { data: handshakes } =
    goalIds.length === 0
      ? { data: [] as HandshakeRow[] }
      : await sb
          .from('handshakes')
          .select('*')
          .in('mini_goal_id', goalIds)
          .order('due_at', { ascending: true, nullsFirst: false })

  const goalsByMission: Record<string, MiniGoalRow[]> = {}
  for (const g of goals) {
    if (!goalsByMission[g.mission_id]) goalsByMission[g.mission_id] = []
    goalsByMission[g.mission_id].push(g)
  }

  const handshakesByGoal: Record<string, HandshakeRow[]> = {}
  for (const h of (handshakes ?? []) as HandshakeRow[]) {
    if (!handshakesByGoal[h.mini_goal_id]) handshakesByGoal[h.mini_goal_id] = []
    handshakesByGoal[h.mini_goal_id].push(h)
  }

  return (missions as MissionRow[]).map(m => {
    const goalsForMission = goalsByMission[m.id] ?? []
    const hs: HandshakeRow[] = []
    for (const g of goalsForMission) hs.push(...(handshakesByGoal[g.id] ?? []))
    const done = goalsForMission.filter(g => g.status === 'done').length
    return { ...m, mini_goals: goalsForMission, handshakes: hs, progress: { done, total: goalsForMission.length } }
  })
}

export async function getShippedThisWeek(): Promise<MissionRow[]> {
  const sb = adminSupabase()
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
  const { data } = await sb
    .from('missions')
    .select('*')
    .eq('status', 'shipped')
    .gte('shipped_at', since)
    .order('shipped_at', { ascending: false })
  return (data ?? []) as MissionRow[]
}

export async function getAuditStatus(): Promise<Degraded<AuditStatusSummary>> {
  try {
    const sb = adminSupabase()
    const { data, error } = await sb
      .from('audit_jobs')
      .select('id, created_at, status, pipeline_status, started_at, delivered_at')
      .order('created_at', { ascending: false })
      .limit(1000)
    if (error) return { ok: false, reason: error.message }
    const jobs = data ?? []
    const now = Date.now()
    const today = jobs.filter(j => hoursAgo(j.created_at) < 24).length
    const week = jobs.filter(j => hoursAgo(j.created_at) < 24 * 7).length

    const funnel = { open: 0, call_booked: 0, proposal: 0, won: 0, lost: 0 }
    for (const j of jobs) {
      const s = j.pipeline_status as keyof typeof funnel
      if (s in funnel) funnel[s]++
    }

    const stuck = jobs.filter(j => {
      if (j.status !== 'running' && j.status !== 'queued') return false
      const ref = j.started_at ?? j.created_at
      return (now - new Date(ref).getTime()) / 60000 >= 30
    }).length

    const hotLeads = jobs.filter(
      j => j.pipeline_status === 'open' && j.delivered_at && hoursAgo(j.delivered_at) < 24 * 14
    ).length

    return { ok: true, today, week, total: jobs.length, funnel, stuck, hotLeads }
  } catch (e: unknown) {
    return { ok: false, reason: e instanceof Error ? e.message : 'unknown' }
  }
}

export async function getOutboundStatus(): Promise<Degraded<OutboundStatusSummary>> {
  try {
    const sb = adminSupabase()
    const { data, error } = await sb
      .from('outbound_leads')
      .select('id, created_at, status, icp_score, last_touched_at')
      .order('created_at', { ascending: false })
      .limit(2000)
    if (error) return { ok: false, reason: error.message }
    const leads = data ?? []
    const last24h = leads.filter(l => hoursAgo(l.created_at) < 24).length
    const last7d = leads.filter(l => hoursAgo(l.created_at) < 24 * 7).length
    const hot = leads.filter(l => l.status === 'new' && (l.icp_score ?? 0) >= 65).length
    const replies = leads.filter(l => l.status === 'replied').length
    const staleFollowups = leads.filter(
      l => l.status === 'sent' && l.last_touched_at && hoursAgo(l.last_touched_at) / 24 >= 5
    ).length
    return { ok: true, total: leads.length, last24h, last7d, hot, replies, staleFollowups }
  } catch (e: unknown) {
    return { ok: false, reason: e instanceof Error ? e.message : 'unknown' }
  }
}

export async function getFinanceStatus(): Promise<Degraded<FinanceStatusSummary>> {
  try {
    const sb = adminSupabase()
    const { data, error } = await sb
      .from('audit_jobs')
      .select('pipeline_status, last_contact_at')
      .order('created_at', { ascending: false })
      .limit(1000)
    if (error) return { ok: false, reason: error.message }
    const jobs = data ?? []

    const FLOOR = 6200
    const ASSUMED_MRR = 3500

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const winsThisMonth = jobs.filter(
      j => j.pipeline_status === 'won' && j.last_contact_at && new Date(j.last_contact_at) >= startOfMonth
    ).length

    const projected = winsThisMonth * ASSUMED_MRR
    const pipelineValue =
      jobs.filter(j => j.pipeline_status === 'call_booked').length * ASSUMED_MRR * 0.3 +
      jobs.filter(j => j.pipeline_status === 'proposal').length * ASSUMED_MRR * 0.6

    return {
      ok: true,
      floorMonthly: FLOOR,
      winsThisMonth,
      projectedMrr: projected,
      floorCovered: Math.min(1, projected / FLOOR),
      pipelineValue,
    }
  } catch (e: unknown) {
    return { ok: false, reason: e instanceof Error ? e.message : 'unknown' }
  }
}

export function getContentStatus(): Degraded<ContentStatusSummary> {
  try {
    const root = join(process.cwd(), 'business', 'content')
    if (!existsSync(root)) return { ok: true, ideas: 0, drafts: 0, scheduled: 0, published: 0 }
    const count = (stage: string) => {
      const dir = join(root, stage)
      if (!existsSync(dir)) return 0
      return readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'README.md').length
    }
    return {
      ok: true,
      ideas: count('ideas'),
      drafts: count('drafts'),
      scheduled: count('scheduled'),
      published: count('published'),
    }
  } catch (e: unknown) {
    return { ok: false, reason: e instanceof Error ? e.message : 'unknown' }
  }
}

function hoursAgo(iso: string): number {
  return (Date.now() - new Date(iso).getTime()) / 1000 / 3600
}

// ---------------------------------------------------------------------------
// Ops dashboard queries — read-only views of health_checks + checklist_items.
// ---------------------------------------------------------------------------

export type HealthCheckStatus = 'ok' | 'warn' | 'fail' | 'stale'
export type HealthCheckCategory = 'website' | 'email' | 'cron'

export interface HealthCheckRow {
  key: string
  category: HealthCheckCategory
  label: string
  status: HealthCheckStatus
  value: Record<string, unknown>
  last_error: string | null
  checked_at: string | null
  next_check_due: string | null
  updated_at: string
}

export interface ChecklistItemRow {
  id: string
  title: string
  category: string
  frequency: 'daily' | 'weekly' | 'monthly' | string
  order_index: number
  last_completed_at: string | null
  next_due_at: string | null
  notes: string | null
  created_at: string
}

export async function getHealthChecks(): Promise<HealthCheckRow[]> {
  const sb = adminSupabase()
  const { data } = await sb
    .from('health_checks')
    .select('*')
    .order('category', { ascending: true })
    .order('label', { ascending: true })
  const rows = (data ?? []) as HealthCheckRow[]
  // Mark stale anything whose next_check_due has passed by more than 5 minutes.
  const now = Date.now()
  return rows.map(r => {
    if (r.next_check_due && new Date(r.next_check_due).getTime() < now - 5 * 60000) {
      return { ...r, status: 'stale' as HealthCheckStatus }
    }
    return r
  })
}

export async function getChecklist(): Promise<ChecklistItemRow[]> {
  const sb = adminSupabase()
  const { data } = await sb
    .from('checklist_items')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: true })
  return (data ?? []) as ChecklistItemRow[]
}

export function isChecklistDue(item: ChecklistItemRow): boolean {
  if (!item.last_completed_at) return true
  if (!item.next_due_at) return true
  return new Date(item.next_due_at).getTime() <= Date.now()
}

