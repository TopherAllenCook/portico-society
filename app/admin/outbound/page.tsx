import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'
import type { LeadWorkflowStatus, ScrapeJobStatus, Specialty } from '@/lib/outbound/types'

export const dynamic = 'force-dynamic'

const STATUS_LABELS: Record<LeadWorkflowStatus, string> = {
  new: 'New',
  reviewing: 'Reviewing',
  queued: 'Queued',
  sent: 'Sent',
  replied: 'Replied',
  booked: 'Booked',
  rejected: 'Rejected',
}

const STATUS_ORDER: LeadWorkflowStatus[] = [
  'new', 'reviewing', 'queued', 'sent', 'replied', 'booked', 'rejected',
]

interface LeadRow {
  id: string
  clinic_name: string
  specialty: string | null
  city: string | null
  state: string | null
  website: string | null
  primary_email: string | null
  phone: string | null
  google_rating: number | null
  google_review_count: number | null
  mx_verified: boolean | null
  icp_score: number | null
  icp_reasoning: string | null
  status: LeadWorkflowStatus
  created_at: string
  notes: string | null
}

interface JobRow {
  id: string
  created_at: string
  city: string
  state: string
  specialty: Specialty | null
  status: ScrapeJobStatus
  raw_count: number | null
  scored_count: number | null
  max_results: number
  error_message: string | null
}

const VALID_STATUSES = new Set(Object.keys(STATUS_LABELS))

async function updateLeadStatus(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const status = formData.get('status') as string
  const notes = (formData.get('notes') as string) ?? null
  if (!id || !VALID_STATUSES.has(status)) return
  const sb = adminSupabase()
  await sb
    .from('outbound_leads')
    .update({
      status,
      notes: notes || null,
      last_touched_at: new Date().toISOString(),
    })
    .eq('id', id)
  revalidatePath('/admin/outbound')
}

async function kickoffScrape(formData: FormData) {
  'use server'
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const specialtyRaw = formData.get('specialty') as string
  const maxResultsRaw = formData.get('max_results') as string
  const sourceRaw = formData.get('source') as string
  const specialty = ['plumbing', 'hvac', 'electrical', 'roofing', 'mixed'].includes(specialtyRaw)
    ? specialtyRaw
    : undefined
  const source = ['places', 'apify', 'both'].includes(sourceRaw) ? sourceRaw : 'places'
  const max_results = Number(maxResultsRaw) || 100
  if (!city || !state) return

  // Insert the job + fire the runner inline. Mirrors the audit submit flow.
  const sb = adminSupabase()
  const { data, error } = await sb
    .from('outbound_scrape_jobs')
    .insert({ city, state, specialty: specialty ?? null, max_results, source })
    .select('id')
    .single()
  if (error || !data) return

  const runToken = process.env.OUTBOUND_RUN_TOKEN
  const base = process.env.PUBLIC_BASE_URL ?? 'http://localhost:3000'
  if (runToken) {
    fetch(`${base}/api/outbound/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-outbound-run-token': runToken },
      body: JSON.stringify({ job_id: data.id }),
    }).catch((err) => console.error('[admin/outbound] kick failed', err))
  }
  revalidatePath('/admin/outbound')
}

interface SearchParams { status?: string; city?: string; min_score?: string; q?: string }

export default async function AdminOutboundPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  if (!(await isAdmin())) redirect('/admin/login?next=/admin/outbound')
  const { status, city, min_score, q } = await searchParams

  const sb = adminSupabase()

  // Leads list
  let leadsQuery = sb
    .from('outbound_leads')
    .select('id, clinic_name, specialty, city, state, website, primary_email, phone, google_rating, google_review_count, mx_verified, icp_score, icp_reasoning, status, created_at, notes')
    .order('icp_score', { ascending: false, nullsFirst: false })
    .limit(300)

  if (status && VALID_STATUSES.has(status)) leadsQuery = leadsQuery.eq('status', status)
  if (city) leadsQuery = leadsQuery.ilike('city', `%${city}%`)
  if (min_score) leadsQuery = leadsQuery.gte('icp_score', Number(min_score))
  if (q) leadsQuery = leadsQuery.or(`clinic_name.ilike.%${q}%,website.ilike.%${q}%,primary_email.ilike.%${q}%`)

  const { data: leadsData } = await leadsQuery
  const leads = (leadsData ?? []) as LeadRow[]

  // Recent jobs
  const { data: jobsData } = await sb
    .from('outbound_scrape_jobs')
    .select('id, created_at, city, state, specialty, status, raw_count, scored_count, max_results, error_message')
    .order('created_at', { ascending: false })
    .limit(10)
  const jobs = (jobsData ?? []) as JobRow[]

  // Status counts
  const { data: countRows } = await sb.from('outbound_leads').select('status')
  const counts: Record<string, number> = {}
  for (const r of countRows ?? []) counts[r.status as string] = (counts[r.status as string] ?? 0) + 1

  // Today's lead count for the cap meter
  const { data: capRow } = await sb.from('outbound_leads_today').select('count').single()
  const usedToday = (capRow as { count?: number } | null)?.count ?? 0
  const dailyCap = Number(process.env.OUTBOUND_DAILY_CAP ?? 100)

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}>
            Outbound
          </p>
          <h1 className="mt-1 font-display" style={{ fontSize: '2rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
            Lead pipeline
          </h1>
        </div>

        <div className="flex items-center gap-3 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--color-ink-muted)' }}>
            today: <strong style={{ color: 'var(--color-ink)' }}>{usedToday}</strong> / {dailyCap}
          </span>
        </div>
      </div>

      {/* Kickoff form */}
      <form action={kickoffScrape} className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-6 md:items-end">
        <div>
          <label className="block text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>City</label>
          <input name="city" required defaultValue="Salt Lake City" className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>State</label>
          <input name="state" required defaultValue="UT" maxLength={2} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>Trade</label>
          <select name="specialty" defaultValue="mixed" className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }}>
            <option value="mixed">All trades</option>
            <option value="plumbing">Plumbing</option>
            <option value="hvac">HVAC</option>
            <option value="electrical">Electrical</option>
            <option value="roofing">Roofing</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>Source</label>
          <select name="source" defaultValue="places" className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }}>
            <option value="places">Places (cheap)</option>
            <option value="apify">Apify</option>
            <option value="both">Both (max coverage)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>Max</label>
          <input name="max_results" type="number" min={1} max={200} defaultValue={100} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }} />
        </div>
        <button type="submit" className="rounded-md px-4 py-2 text-sm font-medium" style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}>
          Scrape now
        </button>
      </form>

      {/* Recent jobs */}
      {jobs.length > 0 && (
        <div className="mt-6">
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>Recent scrape jobs</div>
          <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
            {jobs.map((j) => (
              <div key={j.id} className="rounded-md border px-3 py-2 text-sm" style={{ borderColor: 'var(--color-ink-subtle)' }}>
                <div className="flex items-center justify-between">
                  <div style={{ color: 'var(--color-ink)' }}>{j.city}, {j.state}{j.specialty ? ` — ${j.specialty}` : ''}</div>
                  <JobStatusPill value={j.status} />
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
                  raw {j.raw_count ?? '—'} · scored {j.scored_count ?? '—'} · cap {j.max_results}
                </div>
                {j.error_message && <div className="mt-1 text-xs" style={{ color: '#DC2626' }}>{j.error_message.slice(0, 200)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <FilterChip label="All" href="/admin/outbound" active={!status} count={leads.length} />
        {STATUS_ORDER.map((s) => (
          <FilterChip key={s} label={STATUS_LABELS[s]} href={`/admin/outbound?status=${s}`} active={status === s} count={counts[s] ?? 0} />
        ))}
        <form action="/admin/outbound" className="ml-auto flex items-center gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          <input
            name="q"
            defaultValue={q ?? ''}
            placeholder="Search clinic, email, website"
            className="rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }}
          />
          <input
            name="min_score"
            type="number"
            defaultValue={min_score ?? ''}
            placeholder="min ICP"
            min={0}
            max={100}
            className="w-24 rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }}
          />
        </form>
      </div>

      {/* Leads table */}
      <div className="mt-6 overflow-hidden rounded-xl border" style={{ borderColor: 'var(--color-ink-subtle)' }}>
        <table className="w-full text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          <thead>
            <tr style={{ background: 'var(--color-stone)' }}>
              <Th>ICP</Th>
              <Th>Clinic</Th>
              <Th>Location</Th>
              <Th>Contact</Th>
              <Th>Google</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center" style={{ color: 'var(--color-ink-muted)' }}>No leads. Run a scrape to populate.</td></tr>
            )}
            {leads.map((l) => (
              <tr key={l.id} className="border-t align-top" style={{ borderColor: 'var(--color-ink-subtle)' }}>
                <Td><IcpScoreBadge score={l.icp_score} /></Td>
                <Td>
                  <div style={{ color: 'var(--color-ink)' }} className="font-medium">{l.clinic_name}</div>
                  {l.website && (
                    <a href={l.website} target="_blank" rel="noreferrer" className="text-xs hover:underline" style={{ color: 'var(--color-ink-muted)' }}>
                      {hostnameOf(l.website)}
                    </a>
                  )}
                  {l.icp_reasoning && <div className="mt-1 max-w-[28rem] text-xs leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>{l.icp_reasoning}</div>}
                </Td>
                <Td>{l.city}{l.state ? `, ${l.state}` : ''}</Td>
                <Td>
                  <div className="text-xs" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-mono)' }}>{l.primary_email ?? '—'}</div>
                  <div className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                    {l.phone ?? '—'} {l.mx_verified ? '· MX ✓' : l.primary_email ? '· no MX' : ''}
                  </div>
                </Td>
                <Td>
                  <div className="text-xs" style={{ color: 'var(--color-ink)' }}>{l.google_rating ?? '—'} ★ · {l.google_review_count ?? 0}</div>
                </Td>
                <Td><LeadStatusPill value={l.status} /></Td>
                <Td>
                  <form action={updateLeadStatus} className="flex flex-col gap-1">
                    <input type="hidden" name="id" value={l.id} />
                    <select name="status" defaultValue={l.status} className="rounded border px-2 py-1 text-xs" style={{ borderColor: 'var(--color-ink-subtle)' }}>
                      {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                    <input name="notes" defaultValue={l.notes ?? ''} placeholder="notes" className="rounded border px-2 py-1 text-xs" style={{ borderColor: 'var(--color-ink-subtle)' }} />
                    <button type="submit" className="rounded px-2 py-1 text-xs" style={{ background: 'var(--color-ink)', color: 'var(--color-ivory)' }}>Save</button>
                  </form>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function FilterChip({ label, href, active, count }: { label: string; href: string; active: boolean; count: number }) {
  return (
    <a
      href={href}
      className="rounded-full border px-3 py-1 text-xs"
      style={{
        borderColor: active ? 'var(--color-cinnabar)' : 'var(--color-ink-subtle)',
        background: active ? 'var(--color-cinnabar)' : 'transparent',
        color: active ? 'var(--color-ivory)' : 'var(--color-ink)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {label} <span style={{ opacity: 0.7 }}>· {count}</span>
    </a>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3" style={{ color: 'var(--color-ink)' }}>{children}</td>
}

function IcpScoreBadge({ score }: { score: number | null }) {
  if (score == null) return <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>—</span>
  const color = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : score >= 40 ? '#6B7280' : '#9CA3AF'
  return (
    <span className="inline-block rounded px-2 py-1 text-sm font-medium" style={{ background: color, color: '#FFF8EA', fontFamily: 'var(--font-mono)', minWidth: '2.5rem', textAlign: 'center' }}>
      {score}
    </span>
  )
}

const LEAD_STATUS_COLOR: Record<LeadWorkflowStatus, string> = {
  new: 'var(--color-cinnabar)',
  reviewing: '#D97706',
  queued: '#0284C7',
  sent: '#7C3AED',
  replied: '#16A34A',
  booked: '#16A34A',
  rejected: '#9CA3AF',
}

function LeadStatusPill({ value }: { value: LeadWorkflowStatus }) {
  return (
    <span className="inline-block rounded-full px-2 py-0.5 text-xs" style={{ background: LEAD_STATUS_COLOR[value], color: '#FFF8EA', fontFamily: 'var(--font-mono)' }}>
      {STATUS_LABELS[value]}
    </span>
  )
}

const JOB_STATUS_COLOR: Record<ScrapeJobStatus, string> = {
  queued: '#9CA3AF',
  running: '#D97706',
  partial: '#D97706',
  complete: '#16A34A',
  failed: '#DC2626',
}

function JobStatusPill({ value }: { value: ScrapeJobStatus }) {
  return (
    <span className="inline-block rounded-full px-2 py-0.5 text-xs" style={{ background: JOB_STATUS_COLOR[value], color: '#FFF8EA', fontFamily: 'var(--font-mono)' }}>
      {value}
    </span>
  )
}

function hostnameOf(url: string): string {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
