import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'

export const dynamic = 'force-dynamic'

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  reviewed: 'Reviewed',
  contacted: 'Contacted',
  call_booked: 'Call booked',
  proposal: 'Proposal',
  won: 'Won',
  lost: 'Lost',
  nurture: 'Nurture',
}

const STATUS_ORDER = ['new', 'reviewed', 'contacted', 'call_booked', 'proposal', 'nurture', 'won', 'lost']

interface AuditRow {
  id: string
  clinic_name: string
  city: string
  state: string | null
  specialty: string
  contact_name: string
  contact_email: string
  website_url: string
  status: string
  pipeline_status: string
  delivered_at: string | null
  created_at: string
  share_token: string
}

export default async function AdminAuditsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  if (!(await isAdmin())) redirect('/admin/login?next=/admin')
  const { status, q } = await searchParams

  const sb = adminSupabase()
  let query = sb
    .from('audit_jobs')
    .select('id, clinic_name, city, state, specialty, contact_name, contact_email, website_url, status, pipeline_status, delivered_at, created_at, share_token')
    .order('created_at', { ascending: false })
    .limit(200)

  if (status && STATUS_LABELS[status]) query = query.eq('pipeline_status', status)
  if (q) query = query.or(`clinic_name.ilike.%${q}%,contact_email.ilike.%${q}%,city.ilike.%${q}%`)

  const { data, error } = await query
  if (error) {
    return <p style={{ color: 'var(--color-cinnabar)' }}>Failed to load: {error.message}</p>
  }
  const audits = (data ?? []) as AuditRow[]

  const counts: Record<string, number> = {}
  const { data: countRows } = await sb.from('audit_jobs').select('pipeline_status')
  for (const r of countRows ?? []) counts[r.pipeline_status as string] = (counts[r.pipeline_status as string] ?? 0) + 1

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className="text-xs uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}
          >
            Audits
          </p>
          <h1 className="mt-1 font-display" style={{ fontSize: '2rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
            Pipeline
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <form className="flex items-center gap-2" action="/admin">
            {status && <input type="hidden" name="status" value={status} />}
            <input
              name="q"
              defaultValue={q ?? ''}
              placeholder="Search clinic, email, city"
              className="rounded-md border px-3 py-2 text-sm"
              style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
            />
          </form>
          <a
            href="/new-audit"
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
          >
            + New audit
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip label="All" href="/admin" active={!status} count={countRows?.length ?? 0} />
        {STATUS_ORDER.map((s) => (
          <FilterChip key={s} label={STATUS_LABELS[s]} href={`/admin?status=${s}`} active={status === s} count={counts[s] ?? 0} />
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border" style={{ borderColor: 'var(--color-ink-subtle)' }}>
        <table className="w-full text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          <thead>
            <tr style={{ background: 'var(--color-stone)' }}>
              <Th>Clinic</Th>
              <Th>Specialty</Th>
              <Th>Location</Th>
              <Th>Contact</Th>
              <Th>Status</Th>
              <Th>Pipeline</Th>
              <Th>Submitted</Th>
              <Th>Delivered</Th>
            </tr>
          </thead>
          <tbody>
            {audits.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center" style={{ color: 'var(--color-ink-muted)' }}>No audits.</td></tr>
            )}
            {audits.map((a) => (
              <tr key={a.id} className="border-t" style={{ borderColor: 'var(--color-ink-subtle)' }}>
                <Td>
                  <a href={`/admin/audits/${a.id}`} style={{ color: 'var(--color-ink)' }} className="font-medium hover:underline">
                    {a.clinic_name}
                  </a>
                  <div className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{new URL(a.website_url).hostname.replace(/^www\./, '')}</div>
                </Td>
                <Td><Capitalize value={a.specialty} /></Td>
                <Td>{a.city}{a.state ? `, ${a.state}` : ''}</Td>
                <Td>
                  <div>{a.contact_name}</div>
                  <div className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{a.contact_email}</div>
                </Td>
                <Td><StatusPill value={a.status} kind="audit" /></Td>
                <Td><StatusPill value={a.pipeline_status} kind="pipeline" /></Td>
                <Td>{fmt(a.created_at)}</Td>
                <Td>{a.delivered_at ? fmt(a.delivered_at) : '—'}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

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
    <th
      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em]"
      style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
    >
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3" style={{ color: 'var(--color-ink)' }}>{children}</td>
}

function Capitalize({ value }: { value: string }) {
  return <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
}

const AUDIT_STATUS_COLOR: Record<string, string> = {
  queued: '#9CA3AF',
  running: '#D97706',
  partial: '#D97706',
  complete: '#16A34A',
  failed: '#DC2626',
}

const PIPELINE_STATUS_COLOR: Record<string, string> = {
  new: 'var(--color-cinnabar)',
  reviewed: '#6B7280',
  contacted: '#0284C7',
  call_booked: '#16A34A',
  proposal: '#7C3AED',
  nurture: '#A16207',
  won: '#16A34A',
  lost: '#9CA3AF',
}

function StatusPill({ value, kind }: { value: string; kind: 'audit' | 'pipeline' }) {
  const color = kind === 'audit' ? AUDIT_STATUS_COLOR[value] ?? '#6B7280' : PIPELINE_STATUS_COLOR[value] ?? '#6B7280'
  const label = kind === 'pipeline' ? STATUS_LABELS[value] ?? value : value
  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 text-xs"
      style={{ background: color, color: '#FFF8EA', fontFamily: 'var(--font-mono)' }}
    >
      {label}
    </span>
  )
}

function fmt(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
