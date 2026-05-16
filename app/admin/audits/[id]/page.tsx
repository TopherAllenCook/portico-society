import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'
import type { Scorecard, PrioritizedMove, CompetitorEdge } from '@/lib/audit/types'

export const dynamic = 'force-dynamic'

const PIPELINE_STATUSES = ['new', 'reviewed', 'contacted', 'call_booked', 'proposal', 'won', 'lost', 'nurture'] as const
const STATUS_LABELS: Record<string, string> = {
  new: 'New', reviewed: 'Reviewed', contacted: 'Contacted', call_booked: 'Call booked',
  proposal: 'Proposal', won: 'Won', lost: 'Lost', nurture: 'Nurture',
}

export default async function AdminAuditDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect('/admin/login')
  const { id } = await params
  const sb = adminSupabase()

  const { data: job } = await sb.from('audit_jobs').select('*').eq('id', id).single()
  if (!job) notFound()

  const [{ data: modules }, { data: synth }, { data: followups }] = await Promise.all([
    sb.from('audit_module_results').select('module, status, error_message, payload, started_at, completed_at').eq('job_id', id).order('started_at'),
    sb.from('audit_synthesis').select('*').eq('job_id', id).maybeSingle(),
    sb.from('audit_followups').select('*').eq('job_id', id).order('scheduled_for'),
  ])

  async function updatePipeline(formData: FormData) {
    'use server'
    const sb = adminSupabase()
    const status = String(formData.get('pipeline_status') ?? 'new')
    const notes = String(formData.get('internal_notes') ?? '')
    const nextAction = String(formData.get('next_action_at') ?? '')
    await sb.from('audit_jobs').update({
      pipeline_status: status,
      internal_notes: notes || null,
      next_action_at: nextAction ? new Date(nextAction).toISOString() : null,
    }).eq('id', id)
    revalidatePath(`/admin/audits/${id}`)
  }

  async function toggleNurture() {
    'use server'
    const sb = adminSupabase()
    const { data } = await sb.from('audit_jobs').select('nurture_paused_at').eq('id', id).single()
    const paused = !!data?.nurture_paused_at
    await sb.from('audit_jobs').update({ nurture_paused_at: paused ? null : new Date().toISOString() }).eq('id', id)
    // Sync scheduled followups
    if (paused) {
      await sb.from('audit_followups').update({ status: 'scheduled' }).eq('job_id', id).eq('status', 'paused')
    } else {
      await sb.from('audit_followups').update({ status: 'paused' }).eq('job_id', id).eq('status', 'scheduled')
    }
    revalidatePath(`/admin/audits/${id}`)
  }

  const reportUrl = `${process.env.PUBLIC_BASE_URL ?? ''}/audit-report/${job.share_token}`
  const nurturePaused = !!job.nurture_paused_at

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <a href="/admin" className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}>
          ← All audits
        </a>
        <h1 className="mt-2 font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
          {job.clinic_name}
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
          {job.city}{job.state ? `, ${job.state}` : ''} · {job.specialty} ·{' '}
          <a href={job.website_url} target="_blank" rel="noreferrer" className="underline">{job.website_url}</a>
        </p>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
          Audit status: <span className="font-mono">{job.status}</span> · Submitted {new Date(job.created_at).toLocaleString()}
          {job.delivered_at && <> · Delivered {new Date(job.delivered_at).toLocaleString()}</>}
        </p>
        {reportUrl && (
          <p className="mt-2 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
            <a href={reportUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-cinnabar)' }}>Client report ↗</a>
          </p>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {/* Intake */}
          <Section title="Intake">
            <DefList items={[
              ['Contact', `${job.contact_name} <${job.contact_email}>`],
              ['Phone', job.contact_phone ?? '—'],
              ['Challenge', job.challenge ?? '—'],
            ]} />
          </Section>

          {/* Synthesis */}
          {synth ? (
            <Section title="Synthesized report">
              <p className="font-display" style={{ fontSize: '1.15rem', color: 'var(--color-ink)' }}>
                {synth.executive_summary}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-5">
                {(['seo', 'aeo', 'geo', 'leadgen', 'local'] as const).map((k) => {
                  const sc = (synth.scorecard as Scorecard)[k]
                  return (
                    <div key={k} className="rounded-lg border p-3" style={{ borderColor: 'var(--color-ink-subtle)' }}>
                      <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>{k}</p>
                      <p className="font-display" style={{ fontSize: '1.4rem', color: 'var(--color-ink)' }}>{sc.score}</p>
                      <p className="text-xs leading-snug" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>{sc.rationale}</p>
                    </div>
                  )
                })}
              </div>
              <h3 className="mt-6 font-display" style={{ fontSize: '1rem', color: 'var(--color-ink)' }}>Prioritized moves</h3>
              <ol className="mt-2 space-y-2 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink)' }}>
                {(synth.prioritized_moves as PrioritizedMove[]).sort((a, b) => a.rank - b.rank).map((m) => (
                  <li key={m.rank}>
                    <strong>{m.rank}. {m.title}</strong> <span style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{m.pillar} · {m.impact} impact · {m.effort} effort</span><br/>
                    <span style={{ color: 'var(--color-ink-muted)' }}>{m.why} {m.how}</span>
                  </li>
                ))}
              </ol>
              <h3 className="mt-6 font-display" style={{ fontSize: '1rem', color: 'var(--color-ink)' }}>Competitors</h3>
              <ul className="mt-2 space-y-2 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink)' }}>
                {(synth.competitors as CompetitorEdge[]).map((c) => (
                  <li key={c.domain}>
                    <strong>{c.name}</strong> <span style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{c.domain}</span>
                    <ul className="mt-1 pl-4">
                      {c.edges.map((e, i) => <li key={i}>· {e}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </Section>
          ) : (
            <Section title="Synthesized report">
              <p className="text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>Synthesis not yet complete.</p>
            </Section>
          )}

          {/* Raw modules */}
          <Section title="Module data (raw)">
            <div className="space-y-3">
              {(modules ?? []).map((m) => (
                <details key={m.module} className="rounded-lg border" style={{ borderColor: 'var(--color-ink-subtle)' }}>
                  <summary className="cursor-pointer px-4 py-3 text-sm" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
                    <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)' }}>{m.module}</span>{' '}
                    <span style={{ color: m.status === 'failed' ? '#DC2626' : m.status === 'complete' ? '#16A34A' : 'var(--color-ink-muted)' }}>
                      · {m.status}
                    </span>
                    {m.error_message && <span style={{ color: '#DC2626' }}> — {m.error_message}</span>}
                  </summary>
                  <pre className="overflow-auto px-4 pb-4 pt-2 text-xs leading-snug" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-mono)', maxHeight: '420px' }}>
{JSON.stringify(m.payload, null, 2)}
                  </pre>
                </details>
              ))}
            </div>
          </Section>

          {/* Followups */}
          <Section title="Nurture queue">
            <form action={toggleNurture}>
              <button
                type="submit"
                className="rounded-full px-4 py-2 text-xs font-semibold"
                style={{
                  background: nurturePaused ? 'var(--color-cinnabar)' : 'var(--color-ink)',
                  color: 'var(--color-ivory)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {nurturePaused ? 'Resume nurture' : 'Pause nurture'}
              </button>
            </form>
            <table className="mt-4 w-full text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr style={{ background: 'var(--color-stone)' }}>
                  <Th>Step</Th><Th>Scheduled</Th><Th>Status</Th><Th>Sent</Th>
                </tr>
              </thead>
              <tbody>
                {(followups ?? []).length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-6 text-center" style={{ color: 'var(--color-ink-muted)' }}>Not seeded yet.</td></tr>
                )}
                {(followups ?? []).map((f) => (
                  <tr key={f.id} className="border-t" style={{ borderColor: 'var(--color-ink-subtle)' }}>
                    <Td>{f.step_index}. {f.step_key}</Td>
                    <Td>{new Date(f.scheduled_for).toLocaleString()}</Td>
                    <Td><span className="font-mono text-xs" style={{ color: 'var(--color-ink-muted)' }}>{f.status}</span></Td>
                    <Td>{f.sent_at ? new Date(f.sent_at).toLocaleString() : '—'}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>

        {/* Pipeline sidebar */}
        <aside className="space-y-6">
          <Section title="Pipeline">
            <form action={updatePipeline} className="space-y-4">
              <div>
                <Label>Status</Label>
                <select
                  name="pipeline_status"
                  defaultValue={job.pipeline_status}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)', color: 'var(--color-ink)' }}
                >
                  {PIPELINE_STATUSES.map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Next action (date/time)</Label>
                <input
                  type="datetime-local"
                  name="next_action_at"
                  defaultValue={job.next_action_at ? new Date(job.next_action_at).toISOString().slice(0, 16) : ''}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)', color: 'var(--color-ink)' }}
                />
              </div>
              <div>
                <Label>Internal notes</Label>
                <textarea
                  name="internal_notes"
                  rows={10}
                  defaultValue={job.internal_notes ?? ''}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
                  placeholder="Talking points, objections, things to verify before the call..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full py-2 text-sm font-semibold"
                style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
              >
                Save
              </button>
            </form>
          </Section>
        </aside>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}>
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function DefList({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid grid-cols-[140px_1fr] gap-y-2 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
      {items.map(([k, v]) => (
        <div key={k} className="contents">
          <dt style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{k}</dt>
          <dd style={{ color: 'var(--color-ink)' }}>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-3 py-2 text-left text-xs font-medium uppercase tracking-[0.1em]"
      style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
    >
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2" style={{ color: 'var(--color-ink)' }}>{children}</td>
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs uppercase tracking-[0.1em]" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
      {children}
    </span>
  )
}
