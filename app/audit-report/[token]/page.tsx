import { notFound } from 'next/navigation'
import { adminSupabase } from '@/lib/audit/supabase'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import AuditProgressPoller from '@/components/verve/AuditProgressPoller'
import CalButton from '@/components/verve/CalButton'
import type { Metadata } from 'next'
import type { Scorecard, PrioritizedMove, CompetitorEdge, ModuleName, ModuleStatus } from '@/lib/audit/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Your Verve Audit',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function AuditReportPage({ params }: PageProps) {
  const { token } = await params
  const sb = adminSupabase()

  const { data: job } = await sb
    .from('audit_jobs')
    .select('id, clinic_name, website_url, city, state, specialty, status, started_at, completed_at, competitors')
    .eq('share_token', token)
    .single()

  if (!job) return notFound()

  const { data: synth } = await sb
    .from('audit_synthesis')
    .select('scorecard, competitors, prioritized_moves, executive_summary, narrative_markdown')
    .eq('job_id', job.id)
    .maybeSingle()

  const { data: moduleRows } = await sb
    .from('audit_module_results')
    .select('module, status')
    .eq('job_id', job.id)

  const modules = ((moduleRows ?? []) as { module: ModuleName; status: ModuleStatus }[])

  const isReady = job.status === 'complete' || job.status === 'partial'

  return (
    <>
      <NavVerve />
      <main className="px-6 py-16 lg:px-16" style={{ background: 'var(--color-ivory)' }}>
        <div className="mx-auto max-w-4xl">
          <p
            className="text-xs uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}
          >
            AEO + Marketing Audit
          </p>
          <h1
            className="mt-3 font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', color: 'var(--color-ink)' }}
          >
            {job.clinic_name}
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
            {job.city}{job.state ? `, ${job.state}` : ''} · {job.specialty} · <a href={job.website_url} className="underline">{job.website_url}</a>
          </p>

          {!isReady || !synth ? (
            <AuditProgressPoller
              jobStatus={job.status}
              modules={modules}
              synthesisReady={Boolean(synth)}
            />
          ) : (
            <>
              <Report synth={synth as ReportData} competitors={(job.competitors ?? []) as { domain: string; mentions?: number }[]} />
              <aside
                className="mt-16 rounded-2xl px-8 py-10 lg:px-12 lg:py-12"
                style={{ background: 'var(--color-ink)' }}
                aria-labelledby="audit-thank-you-cta"
              >
                <p
                  className="text-xs font-medium uppercase tracking-[0.22em]"
                  style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
                >
                  Want to walk through it?
                </p>
                <h2
                  id="audit-thank-you-cta"
                  className="mt-3 font-display font-semibold"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.15,
                    maxWidth: '24ch',
                  }}
                >
                  Book a 25-minute call with the founder to talk through the findings.
                </h2>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
                >
                  No pitch deck. We open the report, walk through the three highest-impact
                  moves, and you decide whether to keep going on your own or have us run it.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <CalButton
                    label="Book the walkthrough"
                    variant="primary"
                    style={{
                      padding: '0.875rem 1.75rem',
                      background: 'var(--color-cinnabar)',
                      color: 'var(--color-ivory)',
                    }}
                  />
                  <a
                    href="mailto:hello@vervemd.com?subject=Question%20about%20my%20Verve%20audit"
                    className="text-sm underline-offset-4 hover:underline"
                    style={{ color: 'var(--color-ivory)', opacity: 0.85, fontFamily: 'var(--font-body)' }}
                  >
                    Or email a single question
                  </a>
                </div>
              </aside>
            </>
          )}
        </div>
      </main>
      <FooterVerve />
    </>
  )
}

interface ReportData {
  scorecard: Scorecard
  competitors: CompetitorEdge[]
  prioritized_moves: PrioritizedMove[]
  executive_summary: string
  narrative_markdown: string
}

function Report({ synth }: { synth: ReportData; competitors: { domain: string; mentions?: number }[] }) {
  return (
    <div className="mt-10 space-y-12">
      <section>
        <SectionLabel>Executive summary</SectionLabel>
        <p
          className="mt-3 font-display leading-snug"
          style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}
        >
          {synth.executive_summary}
        </p>
      </section>

      <section>
        <SectionLabel>Scorecard</SectionLabel>
        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          {(['seo', 'aeo', 'geo', 'leadgen', 'local'] as const).map((k) => (
            <ScoreTile key={k} label={labelFor(k)} score={synth.scorecard[k].score} rationale={synth.scorecard[k].rationale} />
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Prioritized moves</SectionLabel>
        <ol className="mt-4 space-y-4">
          {synth.prioritized_moves.sort((a, b) => a.rank - b.rank).map((m) => (
            <li
              key={m.rank}
              className="rounded-xl p-6"
              style={{ background: 'var(--color-stone)', border: '1px solid var(--color-ink-subtle)' }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-cinnabar)' }}
                >
                  {String(m.rank).padStart(2, '0')}
                </span>
                <h3 className="font-display font-medium" style={{ fontSize: '1.1rem', color: 'var(--color-ink)' }}>
                  {m.title}
                </h3>
                <span className="ml-auto text-xs uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
                  {m.pillar} · {m.impact} impact · {m.effort} effort
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
                <strong>Why.</strong> {m.why}
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
                <strong>How.</strong> {m.how}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionLabel>Competitors AI recommends</SectionLabel>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {synth.competitors.map((c) => (
            <div
              key={c.domain}
              className="rounded-xl p-5"
              style={{ background: 'var(--color-stone)', border: '1px solid var(--color-ink-subtle)' }}
            >
              <p className="font-display font-medium" style={{ color: 'var(--color-ink)' }}>{c.name}</p>
              <p className="text-xs" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>{c.domain}</p>
              <ul className="mt-3 space-y-1 text-sm" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
                {c.edges.map((e, i) => <li key={i}>· {e}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Full narrative</SectionLabel>
        <div
          className="mt-4 prose max-w-none"
          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(synth.narrative_markdown) }}
        />
      </section>

      <KitUpsell />
    </div>
  )
}

function KitUpsell() {
  return (
    <section
      className="rounded-xl p-7 lg:p-9"
      style={{ background: 'var(--color-ink)', border: '1px solid var(--color-ink-rule)' }}
      aria-labelledby="kit-upsell-heading"
    >
      <p
        className="text-xs font-medium uppercase tracking-[0.18em]"
        style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
      >
        Want to install the moves yourself?
      </p>
      <h2
        id="kit-upsell-heading"
        className="mt-3 font-display font-semibold leading-tight"
        style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', color: 'var(--color-ivory)', letterSpacing: '-0.02em', maxWidth: '28ch' }}
      >
        The Home Service Brand Self-Audit Kit walks you through the same framework. $149.
      </h2>
      <p
        className="mt-4 max-w-2xl text-sm leading-relaxed"
        style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
      >
        Four documents: the scored audit, a Notion working doc, ten customer-touchpoint email templates, and our two-touch review system.
        Self-serve, 90 minutes, no call required. If you decide you want us to install the repairs for you later, your $149 credits toward a paid audit.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href="/kit"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
        >
          See what&rsquo;s inside the Kit
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}

function ScoreTile({ label, score, rationale }: { label: string; score: number; rationale: string }) {
  const tone = score >= 70 ? 'var(--color-cinnabar)' : score >= 40 ? 'var(--color-ink)' : 'var(--color-ink-muted)'
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--color-stone)', border: '1px solid var(--color-ink-subtle)' }}>
      <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>{label}</p>
      <p className="mt-1 font-display" style={{ fontSize: '2rem', color: tone, letterSpacing: '-0.02em' }}>{score}</p>
      <p className="mt-1 text-xs leading-snug" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>{rationale}</p>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-[0.18em]"
      style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}
    >
      {children}
    </p>
  )
}

function labelFor(k: 'seo' | 'aeo' | 'geo' | 'leadgen' | 'local'): string {
  return ({ seo: 'SEO', aeo: 'AEO', geo: 'GEO', leadgen: 'Lead Gen', local: 'Local' } as const)[k]
}

function renderMarkdown(md: string): string {
  // Minimal renderer. Headings, paragraphs, lists, bold, code. Full Markdown
  // would pull in a dep; this is enough for the synthesized output until we add MDX.
  const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!))
  const lines = md.split('\n')
  const out: string[] = []
  let inList = false
  for (const raw of lines) {
    const line = esc(raw)
    if (/^##\s+/.test(raw)) { if (inList) { out.push('</ul>'); inList = false } out.push(`<h2 class="font-display text-xl mt-8 mb-2">${line.replace(/^##\s+/, '')}</h2>`); continue }
    if (/^#\s+/.test(raw))  { if (inList) { out.push('</ul>'); inList = false } out.push(`<h1 class="font-display text-2xl mt-10 mb-3">${line.replace(/^#\s+/, '')}</h1>`); continue }
    if (/^\s*[-*]\s+/.test(raw)) {
      if (!inList) { out.push('<ul class="list-disc pl-5 my-2">'); inList = true }
      out.push(`<li>${line.replace(/^\s*[-*]\s+/, '')}</li>`)
      continue
    }
    if (inList) { out.push('</ul>'); inList = false }
    if (!raw.trim()) { out.push(''); continue }
    out.push(`<p class="my-3 leading-relaxed">${line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`)
  }
  if (inList) out.push('</ul>')
  return out.join('\n')
}
