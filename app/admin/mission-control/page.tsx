import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/admin/auth'
import {
  getActiveMissions,
  getShippedThisWeek,
  getAuditStatus,
  getOutboundStatus,
  getFinanceStatus,
  getContentStatus,
  type HandshakeRow,
} from '@/lib/dashboard/queries'
import { MissionCard } from './MissionCard'
import { HandshakeRow as HandshakeRowComponent } from './HandshakeRow'
import { RefreshOnInterval } from './RefreshOnInterval'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MissionControlPage() {
  if (!(await isAdmin())) redirect('/admin/login?next=/admin/mission-control')

  const [missions, shipped, audit, outbound, finance, content] = await Promise.all([
    getActiveMissions(),
    getShippedThisWeek(),
    getAuditStatus(),
    getOutboundStatus(),
    getFinanceStatus(),
    Promise.resolve(getContentStatus()),
  ])

  const chrisHandshakes: HandshakeRow[] = []
  const samHandshakes: HandshakeRow[] = []
  for (const m of missions) {
    for (const h of m.handshakes) {
      if (h.status !== 'pending') continue
      if (h.assignee === 'chris') chrisHandshakes.push(h)
      else samHandshakes.push(h)
    }
  }
  chrisHandshakes.sort(byDue)
  samHandshakes.sort(byDue)

  return (
    <div>
      <RefreshOnInterval ms={30000} />
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className="text-xs uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}
          >
            Mission Control
          </p>
          <h1
            className="mt-1 font-display"
            style={{ fontSize: '2rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
          >
            What&apos;s in flight
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
            Auto refresh every 30s. Source: missions, mini_goals, handshakes + pipeline tables.
          </p>
        </div>
        <p className="text-xs font-mono" style={{ color: 'var(--color-ink-muted)' }}>
          {new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      </header>

      <FinanceHero finance={finance} />

      <section className="mt-10">
        <SectionTitle>Active missions ({missions.length})</SectionTitle>
        {missions.length === 0 ? (
          <EmptyCard>
            No active missions. Spin one up via the long-goal skill, then mark it active.
          </EmptyCard>
        ) : (
          <div className="mt-4 grid gap-4">
            {missions.map(m => (
              <MissionCard key={m.id} mission={m} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div>
          <SectionTitle>Handshakes for Chris ({chrisHandshakes.length})</SectionTitle>
          <div className="mt-4 rounded-xl border" style={{ borderColor: 'var(--color-ink-subtle)' }}>
            {chrisHandshakes.length === 0 ? (
              <EmptyInline>No open handshakes. Clear.</EmptyInline>
            ) : (
              chrisHandshakes.map(h => <HandshakeRowComponent key={h.id} handshake={h} />)
            )}
          </div>
        </div>
        <div>
          <SectionTitle>Handshakes for Sam ({samHandshakes.length})</SectionTitle>
          <div className="mt-4 rounded-xl border" style={{ borderColor: 'var(--color-ink-subtle)' }}>
            {samHandshakes.length === 0 ? (
              <EmptyInline>No open handshakes.</EmptyInline>
            ) : (
              samHandshakes.map(h => <HandshakeRowComponent key={h.id} handshake={h} />)
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle>System status</SectionTitle>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <StatusCard
            label="Acquisition"
            sub="Outbound queue"
            ok={outbound.ok}
            rows={
              outbound.ok
                ? [
                    [`${outbound.last24h}`, 'new last 24h'],
                    [`${outbound.hot}`, 'hot (ICP ≥65)'],
                    [`${outbound.replies}`, 'replies waiting'],
                    [`${outbound.staleFollowups}`, 'stale >5d'],
                  ]
                : []
            }
            error={outbound.ok ? null : outbound.reason}
          />
          <StatusCard
            label="Sales"
            sub="Audit pipeline"
            ok={audit.ok}
            rows={
              audit.ok
                ? [
                    [`${audit.today}`, 'submitted today'],
                    [`${audit.funnel.call_booked}`, 'calls booked'],
                    [`${audit.funnel.proposal}`, 'proposals out'],
                    [`${audit.stuck}`, 'stuck >30m'],
                  ]
                : []
            }
            error={audit.ok ? null : audit.reason}
          />
          <StatusCard
            label="Content"
            sub="Filesystem kanban"
            ok={content.ok}
            rows={
              content.ok
                ? [
                    [`${content.ideas}`, 'ideas'],
                    [`${content.drafts}`, 'drafts'],
                    [`${content.scheduled}`, 'scheduled'],
                    [`${content.published}`, 'published'],
                  ]
                : []
            }
            error={content.ok ? null : content.reason}
          />
        </div>
      </section>

      {shipped.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Shipped this week ({shipped.length})</SectionTitle>
          <ul className="mt-4 space-y-2">
            {shipped.map(s => (
              <li
                key={s.id}
                className="rounded-lg border px-4 py-3"
                style={{
                  borderColor: 'var(--color-ink-subtle)',
                  background: 'var(--color-ivory)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-ink)',
                }}
              >
                <span className="font-medium">{s.title}</span>
                <span className="ml-2 text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                  shipped {s.shipped_at ? fmtDate(s.shipped_at) : '?'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function FinanceHero({
  finance,
}: {
  finance: Awaited<ReturnType<typeof getFinanceStatus>>
}) {
  if (!finance.ok) {
    return (
      <div
        className="rounded-xl border p-4 text-sm"
        style={{
          borderColor: 'var(--color-ink-subtle)',
          background: 'var(--color-stone)',
          color: 'var(--color-ink-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Finance unavailable: {finance.reason}
      </div>
    )
  }
  const pct = Math.round(finance.floorCovered * 100)
  const barWidth = `${Math.min(100, pct)}%`
  const onTrack = pct >= 100

  return (
    <div
      className="rounded-xl border p-6"
      style={{
        borderColor: 'var(--color-ink-subtle)',
        background: 'var(--color-ivory)',
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className="text-xs uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Survival floor
          </p>
          <p
            className="mt-1 font-display"
            style={{ fontSize: '2.5rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
          >
            ${finance.projectedMrr.toLocaleString()}{' '}
            <span style={{ color: 'var(--color-ink-muted)', fontSize: '1.25rem' }}>
              / ${finance.floorMonthly.toLocaleString()}
            </span>
          </p>
        </div>
        <div className="text-right" style={{ fontFamily: 'var(--font-body)' }}>
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
            Wins this month: <span style={{ color: 'var(--color-ink)' }}>{finance.winsThisMonth}</span>
          </p>
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
            Pipeline value (weighted): ${Math.round(finance.pipelineValue).toLocaleString()}
          </p>
        </div>
      </div>
      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full"
        style={{ background: 'var(--color-stone)' }}
      >
        <div
          className="h-full"
          style={{
            width: barWidth,
            background: onTrack ? '#16A34A' : 'var(--color-cinnabar)',
            transition: 'width 300ms ease',
          }}
        />
      </div>
      <p className="mt-2 text-xs" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
        {pct}% of floor covered by projected MRR ({finance.winsThisMonth} wins x $3,500 working estimate).
      </p>
    </div>
  )
}

function StatusCard({
  label,
  sub,
  ok,
  rows,
  error,
}: {
  label: string
  sub: string
  ok: boolean
  rows: [string, string][]
  error: string | null
}) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        borderColor: 'var(--color-ink-subtle)',
        background: 'var(--color-ivory)',
      }}
    >
      <p
        className="text-xs uppercase tracking-[0.18em]"
        style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </p>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
        {sub}
      </p>
      {!ok ? (
        <p
          className="mt-3 text-xs"
          style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}
        >
          unavailable: {error}
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {rows.map(([n, l]) => (
            <div key={l}>
              <p className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-ink)' }}>
                {n}
              </p>
              <p
                className="text-xs"
                style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {l}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display"
      style={{
        fontSize: '1.25rem',
        color: 'var(--color-ink)',
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </h2>
  )
}

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-4 rounded-xl border p-6 text-sm"
      style={{
        borderColor: 'var(--color-ink-subtle)',
        background: 'var(--color-stone)',
        color: 'var(--color-ink-muted)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {children}
    </div>
  )
}

function EmptyInline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="px-4 py-6 text-center text-sm"
      style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
    >
      {children}
    </p>
  )
}

function byDue(a: HandshakeRow, b: HandshakeRow): number {
  if (!a.due_at && !b.due_at) return 0
  if (!a.due_at) return 1
  if (!b.due_at) return -1
  return a.due_at.localeCompare(b.due_at)
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
