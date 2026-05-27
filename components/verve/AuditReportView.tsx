import type {
  Scorecard,
  PrioritizedMove,
  CompetitorEdge,
  CompetitorCrawlPayload,
  CompetitorSiteAudit,
  CrawlPayload,
  DataForSeoPayload,
  GeoPayload,
  LeadgenPayload,
  LlmAnswer,
  PagespeedPayload,
  RecommendedPackage,
  SchemaPayload,
  Specialty,
} from '@/lib/audit/types'
import AuditReportPrintButton from './AuditReportPrintButton'
import AuditReportToc, { type AuditReportTocItem } from './AuditReportToc'

export interface AuditReportModules {
  crawl: CrawlPayload | null
  pagespeed: PagespeedPayload | null
  dataforseo: DataForSeoPayload | null
  leadgen: LeadgenPayload | null
  schema: SchemaPayload[] | SchemaPayload | null
  competitor_crawl: CompetitorCrawlPayload | null
}

export interface AuditReportJob {
  clinic_name: string
  website_url: string
  city: string
  state: string | null
  specialty: Specialty
  completed_at: string | null
}

export interface AuditReportSynth {
  scorecard: Scorecard
  competitors: CompetitorEdge[]
  prioritized_moves: PrioritizedMove[]
  executive_summary: string
  narrative_markdown: string
  overall_narrative?: string | null
  recommended_package?: RecommendedPackage | null
  closing_cta?: string | null
}

const PILLAR_LABEL: Record<keyof Scorecard, string> = {
  seo: 'SEO',
  aeo: 'AEO',
  geo: 'GEO',
  leadgen: 'Lead generation',
  local: 'Local presence',
}

const PILLAR_KEYS: (keyof Scorecard)[] = ['seo', 'aeo', 'geo', 'leadgen', 'local']

export default function AuditReportView({
  job,
  synth,
  geo,
  modules,
}: {
  job: AuditReportJob
  synth: AuditReportSynth
  geo?: GeoPayload | null
  modules?: AuditReportModules
}) {
  const overall = Math.round(
    PILLAR_KEYS.reduce((sum, k) => sum + synth.scorecard[k].score, 0) / PILLAR_KEYS.length,
  )
  const deliveredLabel = job.completed_at
    ? new Date(job.completed_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null
  const location = job.state ? `${job.city}, ${job.state}` : job.city
  const sortedMoves = [...synth.prioritized_moves].sort((a, b) => a.rank - b.rank)
  const hasGeoEvidence = Boolean(geo && geo.answers.length > 0)
  const hasSchemaSection = Boolean(modules?.crawl && (modules.crawl.pages?.length ?? 0) > 0)

  // Section numbering shifts when optional sections are present.
  let n = 1
  const sec = {
    summary: pad(n++),
    evidence: hasGeoEvidence ? pad(n++) : null,
    scorecard: pad(n++),
    schema: hasSchemaSection ? pad(n++) : null,
    moves: pad(n++),
    competitors: pad(n++),
    narrative: pad(n++),
  }

  return (
    <article className="audit-report" style={{ background: 'var(--color-ivory)' }}>
      <ReportHeader />

      {/* ─── Title page ────────────────────────────────────────────────── */}
      <section
        className="px-6 pb-12 pt-16 lg:px-16 lg:pb-16 lg:pt-24"
        style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
      >
        <div className="mx-auto max-w-4xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          >
            AEO + Marketing Audit
          </p>
          <h1
            className="mt-6 font-display font-semibold"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
            }}
          >
            {job.clinic_name}
          </h1>
          <dl
            className="mt-10 grid grid-cols-[6rem_1fr] gap-x-5 gap-y-3 sm:grid-cols-[8rem_1fr] sm:gap-x-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <MetaRow label="Location" value={location} />
            <MetaRow label="Specialty" value={job.specialty} />
            <MetaRow
              label="Website"
              value={
                <a
                  href={job.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 hover:underline"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {stripProto(job.website_url)}
                </a>
              }
            />
            {deliveredLabel && <MetaRow label="Delivered" value={deliveredLabel} />}
          </dl>
        </div>
      </section>

      {/* ─── In-page navigation (sticky on lg+, hidden on mobile) ─────── */}
      <AuditReportToc items={buildTocItems(sec)} />

      {/* ─── Executive summary ──────────────────────────────────────────── */}
      <ReportSection number={sec.summary} label="Executive summary">
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.015em',
            lineHeight: 1.35,
            maxWidth: '56ch',
          }}
        >
          {scrubDashes(synth.executive_summary)}
        </p>
      </ReportSection>

      {/* ─── Evidence (what the AI engines actually said) ───────────────── */}
      {hasGeoEvidence && sec.evidence && (
        <EvidenceSection
          number={sec.evidence}
          geo={geo!}
          clinicName={job.clinic_name}
        />
      )}

      {/* ─── The scorecard ──────────────────────────────────────────────── */}
      <ReportSection number={sec.scorecard} label="The scorecard">
        <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
          <div>
            <p
              className="text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              Overall readiness
            </p>
            <p
              className="mt-2 font-display font-semibold italic leading-none"
              style={{
                fontSize: 'clamp(5rem, 10vw, 8rem)',
                color: 'var(--color-cinnabar)',
                letterSpacing: '-0.05em',
              }}
            >
              {overall}
              <span
                className="not-italic"
                style={{
                  fontSize: '0.4em',
                  color: 'var(--color-label-text)',
                  letterSpacing: '-0.02em',
                  marginLeft: '0.15em',
                }}
              >
                /100
              </span>
            </p>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{
                color: 'var(--color-body-text)',
                fontFamily: 'var(--font-body)',
                maxWidth: '28ch',
              }}
            >
              {synth.overall_narrative
                ? scrubDashes(synth.overall_narrative)
                : overallNarrative(overall)}
            </p>
          </div>

          <ul style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
            {PILLAR_KEYS.map((k) => (
              <ScoreRow
                key={k}
                label={PILLAR_LABEL[k]}
                score={synth.scorecard[k].score}
                rationale={scrubDashes(synth.scorecard[k].rationale)}
                callouts={pillarCallouts(k, modules)}
              />
            ))}
          </ul>
        </div>

        {/* Scoring legend */}
        <ScoringLegend />
      </ReportSection>

      {/* ─── The schema gap (its own section, surfaces per-page + competitor coverage) ─── */}
      {hasSchemaSection && sec.schema && modules?.crawl && (
        <ReportSection number={sec.schema} label="The schema gap" background="sand">
          <SchemaMatrix
            crawl={modules.crawl}
            competitorCrawl={modules.competitor_crawl ?? null}
          />
        </ReportSection>
      )}

      {/* ─── Three moves to make this quarter ───────────────────────────── */}
      <ReportSection
        number={sec.moves}
        label="Three moves to make this quarter"
        background="stone"
      >
        <ol className="space-y-10 lg:space-y-14">
          {sortedMoves.slice(0, 3).map((m) => (
            <MoveCard key={m.rank} move={m} />
          ))}
        </ol>
        {sortedMoves.length > 3 && (
          <>
            <p
              className="mt-16 text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              And after that
            </p>
            <ol className="mt-6 space-y-8">
              {sortedMoves.slice(3).map((m) => (
                <MoveCard key={m.rank} move={m} compact />
              ))}
            </ol>
          </>
        )}
      </ReportSection>

      {/* ─── Who AI is naming instead ───────────────────────────────────── */}
      {synth.competitors.length > 0 && (
        <ReportSection number={sec.competitors} label="Who AI is naming instead">
          <p
            className="mb-12 font-display"
            style={{
              fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.015em',
              lineHeight: 1.4,
              maxWidth: '60ch',
            }}
          >
            For your specialty in {location}, these are the practices that come up when
            patients ask ChatGPT, Claude, and Perplexity. Each one carries an edge worth
            studying.
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {synth.competitors.map((c) => (
              <CompetitorCard
                key={c.domain}
                competitor={c}
                stats={competitorStats(
                  c.domain,
                  geo ?? null,
                  modules?.dataforseo ?? null,
                  modules?.competitor_crawl ?? null,
                )}
                schemaCoverage={competitorSchemaCoverage(
                  c.domain,
                  modules?.competitor_crawl ?? null,
                )}
                keywordGap={competitorGap(c.domain, modules?.dataforseo ?? null)}
              />
            ))}
          </div>
        </ReportSection>
      )}

      {/* ─── The full picture (narrative) ───────────────────────────────── */}
      <ReportSection number={sec.narrative} label="The full picture">
        <div
          className="audit-narrative"
          style={{
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-body)',
            maxWidth: '64ch',
            fontSize: '1.0625rem',
            lineHeight: 1.7,
          }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(synth.narrative_markdown) }}
        />
      </ReportSection>

      {/* ─── Closing ────────────────────────────────────────────────────── */}
      <ClosingSection
        closingCta={synth.closing_cta ?? null}
        recommendedPackage={synth.recommended_package ?? null}
      />

      <MethodologyFooter
        deliveredAt={job.completed_at}
        geo={geo ?? null}
        modules={modules ?? null}
      />
    </article>
  )
}

/* ─── Subcomponents ────────────────────────────────────────────────────── */

const PACKAGE_LABEL: Record<RecommendedPackage['tier'], string> = {
  essential: 'Essential',
  growth: 'Growth',
  full_service: 'Full Service',
}

const PACKAGE_PRICE: Record<RecommendedPackage['tier'], string> = {
  essential: '$1,500',
  growth: '$3,500',
  full_service: '$6,500',
}

const PACKAGE_TAGLINE: Record<RecommendedPackage['tier'], string> = {
  essential: 'Foundation for visibility',
  growth: 'Active patient acquisition',
  full_service: 'Complete marketing department',
}

function ClosingSection({
  closingCta,
  recommendedPackage,
}: {
  closingCta: string | null
  recommendedPackage: RecommendedPackage | null
}) {
  // Safety: even with prompt instructions, strip any trailing "Book a 15-minute discovery call"
  // phrase the model might still emit, since the UI provides the standalone button.
  const cleanedCta = closingCta
    ? scrubDashes(closingCta)
        .replace(/\s*Book a 15[-\s]?minute discovery call\.?\s*$/i, '')
        .trim()
    : null

  return (
    <section
      className="px-6 py-20 lg:px-16 lg:py-24"
      style={{
        background: 'var(--color-ink)',
        borderTop: '1px solid var(--color-ink-rule)',
      }}
      aria-labelledby="audit-close-heading"
    >
      <div className="mx-auto max-w-4xl">
        <p
          className="text-xs font-medium uppercase tracking-[0.22em]"
          style={{
            color: 'var(--color-cinnabar-on-dark)',
            fontFamily: 'var(--font-body)',
          }}
        >
          What now
        </p>
        <h2
          id="audit-close-heading"
          className="mt-5 font-display font-semibold"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            color: 'var(--color-ivory)',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            maxWidth: '24ch',
          }}
        >
          Read it twice. Pick one move. Ship it this week.
        </h2>

        <p
          className="mt-6 text-base leading-relaxed"
          style={{
            color: 'var(--color-body-text-on-dark)',
            fontFamily: 'var(--font-body)',
            maxWidth: '56ch',
          }}
        >
          {cleanedCta
            ? cleanedCta
            : 'The moves are sorted by impact, not effort. The cheap wins come first. If you want help executing, reply to the audit email or book a 15-minute call. No pitch, no proposal sent without your say-so.'}
        </p>

        {recommendedPackage && (
          <div
            className="mt-10 rounded-lg p-7 lg:p-9"
            style={{
              border: '1px solid var(--color-ivory-subtle)',
            }}
          >
            <p
              className="text-xs font-medium uppercase tracking-[0.18em]"
              style={{
                color: 'var(--color-cinnabar-on-dark)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Recommended fit
            </p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p
                className="font-display font-semibold"
                style={{
                  fontSize: '1.5rem',
                  color: 'var(--color-ivory)',
                  letterSpacing: '-0.02em',
                }}
              >
                {PACKAGE_LABEL[recommendedPackage.tier]}
              </p>
              <p
                className="font-display font-semibold"
                style={{
                  fontSize: '1.5rem',
                  color: 'var(--color-cinnabar-on-dark)',
                  letterSpacing: '-0.02em',
                }}
              >
                {PACKAGE_PRICE[recommendedPackage.tier]}
                <span
                  className="text-sm font-normal"
                  style={{
                    color: 'var(--color-body-text-on-dark)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {' / mo'}
                </span>
              </p>
              <p
                className="text-sm italic"
                style={{
                  color: 'var(--color-body-text-on-dark)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {PACKAGE_TAGLINE[recommendedPackage.tier]}
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-10">
              <div>
                <dt
                  className="text-xs font-medium uppercase tracking-[0.14em]"
                  style={{
                    color: 'var(--color-label-text-on-dark)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Why this fits
                </dt>
                <dd
                  className="mt-2 text-sm leading-relaxed"
                  style={{
                    color: 'var(--color-body-text-on-dark)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {scrubDashes(recommendedPackage.why)}
                </dd>
              </div>
              <div>
                <dt
                  className="text-xs font-medium uppercase tracking-[0.14em]"
                  style={{
                    color: 'var(--color-label-text-on-dark)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Likely outcome
                </dt>
                <dd
                  className="mt-2 text-sm leading-relaxed"
                  style={{
                    color: 'var(--color-body-text-on-dark)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {scrubDashes(recommendedPackage.estimated_lift)}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-10">
          <a
            href="https://vervemd.com/contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-opacity hover:opacity-95"
            style={{
              background: 'var(--color-cinnabar)',
              color: 'var(--color-ivory)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Book a 15-minute discovery call
          </a>
        </div>
        <p
          className="mt-4 text-sm"
          style={{
            color: 'var(--color-body-text-on-dark)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Or{' '}
          <a
            href="mailto:hello@vervemd.com?subject=Re%3A%20Verve%20audit"
            className="underline underline-offset-4 transition-opacity hover:opacity-90"
            style={{ color: 'var(--color-ivory)' }}
          >
            reply to this audit
          </a>{' '}
          if you would rather start in writing.
        </p>

        <p
          className="mt-12 text-xs"
          style={{
            color: 'var(--color-label-text-on-dark)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Verve MD · This audit is private to your inbox. Do not share the link.
        </p>
      </div>
    </section>
  )
}

function ReportHeader() {
  return (
    <header
      className="report-header sticky top-0 z-40 flex items-center justify-between px-6 py-4 lg:px-16"
      style={{
        background: 'var(--color-ivory)',
        borderBottom: '1px solid var(--color-ink-rule)',
      }}
    >
      <a
        href="https://vervemd.com"
        className="font-display text-base font-semibold tracking-tight"
        style={{ color: 'var(--color-ink)' }}
      >
        Verve <span style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic' }}>MD</span>
      </a>
      <div className="flex items-center gap-3">
        <span
          className="hidden text-xs font-medium uppercase tracking-[0.18em] sm:inline"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
        >
          Private audit · do not share
        </span>
        <AuditReportPrintButton />
      </div>
    </header>
  )
}

function ReportSection({
  number,
  label,
  children,
  background = 'ivory',
}: {
  number: string
  label: string
  children: React.ReactNode
  background?: 'ivory' | 'stone' | 'sand'
}) {
  const bg =
    background === 'stone'
      ? 'var(--color-stone)'
      : background === 'sand'
        ? 'var(--color-sand)'
        : 'var(--color-ivory)'
  const headingId = `audit-section-${number}`
  return (
    <section
      className="audit-section px-6 py-20 lg:px-16 lg:py-28"
      style={{ background: bg, borderBottom: '1px solid var(--color-ink-rule)' }}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id={headingId}
          className="flex items-baseline gap-3 font-display font-semibold"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(1.875rem, 3vw, 2.75rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          <span
            className="font-body text-xs font-medium uppercase tracking-[0.16em] tabular-nums"
            style={{ color: 'var(--color-label-text)' }}
            aria-hidden="true"
          >
            {number}
          </span>
          <span>{label}</span>
        </h2>
        <div className="mt-10 lg:mt-14">{children}</div>
      </div>
    </section>
  )
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <>
      <dt
        className="text-xs font-medium uppercase tracking-[0.16em]"
        style={{ color: 'var(--color-label-text)' }}
      >
        {label}
      </dt>
      <dd className="text-sm" style={{ color: 'var(--color-ink)' }}>
        {value}
      </dd>
    </>
  )
}

function ScoreRow({
  label,
  score,
  rationale,
  callouts,
}: {
  label: string
  score: number
  rationale: string
  callouts?: string[]
}) {
  return (
    <li
      className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-[10rem_4rem_1fr] sm:items-start sm:gap-8"
      style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
    >
      <p
        className="font-display font-medium"
        style={{
          fontSize: '1.0625rem',
          color: 'var(--color-ink)',
          letterSpacing: '-0.015em',
        }}
      >
        {label}
      </p>
      <p
        className="font-display tabular-nums leading-none"
        style={{
          fontSize: '1.5rem',
          color: 'var(--color-ink)',
          letterSpacing: '-0.03em',
        }}
      >
        {score}
      </p>
      <div>
        <ScoreBar value={score} label={label} />
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{
            color: 'var(--color-body-text)',
            fontFamily: 'var(--font-body)',
            maxWidth: '52ch',
          }}
        >
          {rationale}
        </p>
        {callouts && callouts.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          >
            {callouts.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" style={{ color: 'var(--color-ink-rule)' }}>·</span>}
                <span>{c}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

function ScoreBar({ value, label }: { value: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className="relative h-1.5 w-full overflow-hidden rounded-full"
      style={{ background: 'var(--color-ink-rule)' }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${pct} of 100` : `${pct} of 100`}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: 'var(--color-ink)' }}
      />
    </div>
  )
}

function MoveCard({ move, compact = false }: { move: PrioritizedMove; compact?: boolean }) {
  return (
    <li
      className={`audit-move grid gap-6 lg:grid-cols-[5rem_1fr] lg:gap-10 ${
        compact ? '' : 'border-t pt-10 lg:pt-14'
      }`}
      style={compact ? {} : { borderColor: 'var(--color-ink-rule)' }}
    >
      <span
        className="font-body font-medium uppercase tracking-[0.16em] tabular-nums leading-none"
        style={{
          fontSize: compact ? '0.75rem' : '0.875rem',
          color: 'var(--color-label-text)',
        }}
        aria-hidden="true"
      >
        {String(move.rank).padStart(2, '0')}
      </span>
      <div>
        <h3
          className="font-display font-semibold"
          style={{
            fontSize: compact ? 'clamp(1.125rem, 1.8vw, 1.375rem)' : 'clamp(1.375rem, 2.2vw, 1.75rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            maxWidth: '36ch',
          }}
        >
          {scrubDashes(move.title)}
        </h3>
        <p
          className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.14em]"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
        >
          <span>{pillarLabel(move.pillar)}</span>
          <span aria-hidden="true">·</span>
          <span>{move.impact} impact</span>
          <span aria-hidden="true">·</span>
          <span>{move.effort} effort</span>
        </p>
        <div className={compact ? 'mt-4 space-y-4' : 'mt-6 space-y-5'}>
          <div>
            <p
              className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              Why
            </p>
            <p
              className="leading-relaxed"
              style={{
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-body)',
                fontSize: compact ? '0.95rem' : '1rem',
                maxWidth: '64ch',
              }}
            >
              {scrubDashes(move.why)}
            </p>
          </div>
          <div>
            <p
              className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              How
            </p>
            <p
              className="leading-relaxed"
              style={{
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-body)',
                fontSize: compact ? '0.95rem' : '1rem',
                maxWidth: '64ch',
              }}
            >
              {scrubDashes(move.how)}
            </p>
          </div>

          {move.steps && move.steps.length > 0 && !compact && (
            <div className="mt-2">
              <p
                className="text-xs font-medium uppercase tracking-[0.16em]"
                style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              >
                Checklist
              </p>
              <ol className="mt-3 space-y-2.5">
                {move.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{
                      color: 'var(--color-ink)',
                      fontFamily: 'var(--font-body)',
                      maxWidth: '60ch',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border"
                      style={{
                        borderColor: 'var(--color-ink-rule)',
                        background: 'var(--color-card)',
                      }}
                    />
                    <span>{scrubDashes(step)}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

function CompetitorCard({
  competitor,
  stats,
  schemaCoverage,
  keywordGap,
}: {
  competitor: CompetitorEdge
  stats?: { label: string; value: string }[]
  schemaCoverage?: string[]
  keywordGap?: Array<{ keyword: string; competitor_rank: number; our_rank: number | null }>
}) {
  return (
    <article
      className="flex flex-col"
      style={{ borderTop: '2px solid var(--color-ink)', paddingTop: '1rem' }}
    >
      <h3
        className="font-display font-semibold"
        style={{
          fontSize: '1.125rem',
          color: 'var(--color-ink)',
          letterSpacing: '-0.015em',
        }}
      >
        {competitor.name}
      </h3>
      <p
        className="mt-1 text-xs font-medium tracking-[0.04em]"
        style={{
          color: 'var(--color-label-text)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {competitor.domain}
      </p>

      {stats && stats.length > 0 && (
        <dl
          className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3"
          style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '0.75rem' }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt
                className="text-[10px] font-medium uppercase tracking-[0.16em]"
                style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              >
                {s.label}
              </dt>
              <dd
                className="mt-1 font-display"
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                }}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {schemaCoverage && schemaCoverage.length > 0 && (
        <div className="mt-5">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.16em]"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          >
            Schema they expose
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {schemaCoverage.map((t) => (
              <li
                key={t}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium"
                style={{
                  borderColor: 'var(--color-ink-rule)',
                  background: 'var(--color-card)',
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p
        className="mt-6 text-xs font-medium uppercase tracking-[0.16em]"
        style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
      >
        Edges over you
      </p>
      <ul className="mt-3 space-y-2.5">
        {competitor.edges.map((e, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
          >
            <span
              aria-hidden="true"
              className="mt-[0.7rem] h-px w-3 shrink-0"
              style={{ background: 'var(--color-ink-rule)' }}
            />
            <span>{scrubDashes(e)}</span>
          </li>
        ))}
      </ul>

      {keywordGap && keywordGap.length > 0 && (
        <div
          className="mt-6 pt-5"
          style={{ borderTop: '1px solid var(--color-ink-rule)' }}
        >
          <p
            className="text-xs font-medium uppercase tracking-[0.16em]"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          >
            Keywords they rank for, you don't
          </p>
          <table
            className="mt-3 w-full text-xs"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
          >
            <thead>
              <tr style={{ color: 'var(--color-label-text)' }}>
                <th scope="col" className="pb-1 text-left font-medium uppercase tracking-[0.12em]">
                  Keyword
                </th>
                <th scope="col" className="pb-1 text-right font-medium uppercase tracking-[0.12em]">
                  Them
                </th>
                <th scope="col" className="pb-1 text-right font-medium uppercase tracking-[0.12em]">
                  You
                </th>
              </tr>
            </thead>
            <tbody>
              {keywordGap.slice(0, 5).map((row, i) => (
                <tr
                  key={i}
                  style={{ borderTop: '1px solid var(--color-ink-rule)' }}
                >
                  <td className="py-1.5 pr-2">{row.keyword}</td>
                  <td className="py-1.5 pr-2 text-right tabular-nums">
                    #{row.competitor_rank}
                  </td>
                  <td
                    className="py-1.5 text-right tabular-nums"
                    style={{ color: row.our_rank ? 'var(--color-ink)' : 'var(--color-cinnabar)' }}
                  >
                    {row.our_rank ? `#${row.our_rank}` : 'not ranked'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  )
}

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

interface SectionMap {
  summary: string
  evidence: string | null
  scorecard: string
  schema: string | null
  moves: string
  competitors: string
  narrative: string
}

function buildTocItems(sec: SectionMap): AuditReportTocItem[] {
  const items: AuditReportTocItem[] = []
  items.push({ num: sec.summary, label: 'Executive summary' })
  if (sec.evidence) items.push({ num: sec.evidence, label: 'What the engines said' })
  items.push({ num: sec.scorecard, label: 'Scorecard' })
  if (sec.schema) items.push({ num: sec.schema, label: 'The schema gap' })
  items.push({ num: sec.moves, label: 'Three moves' })
  items.push({ num: sec.competitors, label: 'Who AI names' })
  items.push({ num: sec.narrative, label: 'The full picture' })
  return items
}

function pillarCallouts(
  pillar: keyof Scorecard,
  modules?: AuditReportModules,
): string[] {
  if (!modules) return []
  const out: string[] = []
  switch (pillar) {
    case 'seo': {
      if (modules.crawl) {
        const pageCount = modules.crawl.pages?.length ?? 0
        const missingMeta = modules.crawl.pages?.filter((p) => !p.meta_description).length ?? 0
        if (pageCount > 0) out.push(`${pageCount} pages crawled`)
        if (missingMeta > 0) out.push(`${missingMeta} missing meta description`)
        if (modules.crawl.sitemap_url_count != null)
          out.push(`${modules.crawl.sitemap_url_count} URLs in sitemap`)
      }
      break
    }
    case 'aeo': {
      // Count pages with JSON-LD and which types appear
      if (modules.crawl) {
        const pages = modules.crawl.pages ?? []
        const withJsonld = pages.filter((p) => p.has_jsonld).length
        const types = new Set<string>()
        for (const p of pages) for (const t of p.jsonld_types) types.add(t)
        if (pages.length > 0) out.push(`${withJsonld} of ${pages.length} pages have JSON-LD`)
        if (types.size > 0) out.push(`Types found: ${[...types].slice(0, 4).join(', ')}`)
      }
      break
    }
    case 'geo': {
      // GEO score derivation already handled by synth rationale; show engine count + queries
      // (callouts wired via MethodologyStrip; left blank here to avoid duplication)
      break
    }
    case 'leadgen': {
      if (modules.leadgen) {
        const fields = modules.leadgen.form_field_counts?.[0]
        if (fields != null) out.push(`Form fields: ${fields}`)
        if (modules.leadgen.primary_cta_text)
          out.push(`Primary CTA: "${modules.leadgen.primary_cta_text}"`)
        if (modules.leadgen.booking_widget) out.push(`Booking: ${modules.leadgen.booking_widget}`)
        else out.push('No booking widget detected')
      }
      break
    }
    case 'local': {
      if (modules.pagespeed) {
        if (modules.pagespeed.performance != null)
          out.push(`PageSpeed: ${modules.pagespeed.performance}/100`)
        if (modules.pagespeed.lcp_ms != null)
          out.push(`LCP: ${(modules.pagespeed.lcp_ms / 1000).toFixed(1)}s`)
      }
      break
    }
  }
  return out
}

function competitorStats(
  domain: string,
  geo: GeoPayload | null,
  dataforseo: DataForSeoPayload | null,
  competitorCrawl: CompetitorCrawlPayload | null,
): { label: string; value: string }[] {
  const norm = (d: string) => d.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase()
  const target = norm(domain)
  const out: { label: string; value: string }[] = []

  if (geo) {
    const totalQueries = geo.answers.length || 1
    const mentions = Object.entries(geo.competitor_mention_counts ?? {})
      .filter(([d]) => norm(d) === target)
      .reduce((sum, [, c]) => sum + c, 0)
    if (mentions > 0) {
      out.push({
        label: 'AI mentions',
        value: `${mentions} / ${totalQueries}`,
      })
    }
  }

  if (dataforseo?.competitor_gap) {
    const match = dataforseo.competitor_gap.find((g) => norm(g.competitor) === target)
    if (match) {
      out.push({
        label: 'Keyword gap',
        value: String(match.gap_keywords.length),
      })
    }
  }

  if (dataforseo?.serps) {
    const top3 = dataforseo.serps.filter((s) =>
      s.organic
        .slice(0, 3)
        .some((r) => norm(r.domain) === target),
    ).length
    if (top3 > 0) {
      out.push({
        label: 'Top-3 SERPs',
        value: `${top3} / ${dataforseo.serps.length}`,
      })
    }
  }

  if (competitorCrawl) {
    const site = competitorCrawl.competitors.find((c) => norm(c.domain) === target)
    if (site) {
      out.push({ label: 'Pages crawled', value: String(site.pages_crawled) })
      if (site.avg_word_count > 0) {
        out.push({
          label: 'Avg word count',
          value: site.avg_word_count.toLocaleString(),
        })
      }
    }
  }

  return out
}

function competitorSchemaCoverage(
  domain: string,
  competitorCrawl: CompetitorCrawlPayload | null,
): string[] {
  if (!competitorCrawl) return []
  const norm = (d: string) => d.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase()
  const target = norm(domain)
  const site = competitorCrawl.competitors.find((c) => norm(c.domain) === target)
  return site?.schema_coverage ?? []
}

function competitorGap(
  domain: string,
  dataforseo: DataForSeoPayload | null,
): Array<{ keyword: string; competitor_rank: number; our_rank: number | null }> {
  if (!dataforseo) return []
  const norm = (d: string) => d.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase()
  const target = norm(domain)
  const match = dataforseo.competitor_gap?.find((g) => norm(g.competitor) === target)
  if (!match) return []
  return match.gap_keywords
    .filter((k) => k.our_rank === null || k.our_rank > 10)
    .sort((a, b) => a.competitor_rank - b.competitor_rank)
    .map(({ keyword, competitor_rank, our_rank }) => ({
      keyword,
      competitor_rank,
      our_rank,
    }))
}

const ENGINE_LABEL: Record<LlmAnswer['provider'], string> = {
  openai: 'ChatGPT',
  anthropic: 'Claude',
  perplexity: 'Perplexity',
  gemini: 'Gemini',
}

function EvidenceSection({
  number,
  geo,
  clinicName,
}: {
  number: string
  geo: GeoPayload
  clinicName: string
}) {
  // Per-engine summary: count mentions of the clinic in each engine.
  const engines = (
    ['anthropic', 'openai', 'perplexity', 'gemini'] as LlmAnswer['provider'][]
  )
    .map((provider) => {
      const answers = geo.answers.filter((a) => a.provider === provider)
      const total = answers.length
      const hits = answers.filter((a) => a.our_clinic_mentioned).length
      return { provider, label: ENGINE_LABEL[provider], total, hits }
    })
    .filter((e) => e.total > 0)

  // Pick up to 3 representative excerpts: prefer answers that name competitors
  // but not the clinic. Fallback to any answer with named clinics.
  const excerpts = pickExcerpts(geo.answers, 3)

  const headingId = `audit-section-${number}`
  return (
    <section
      className="audit-section px-6 py-20 lg:px-16 lg:py-28"
      style={{
        background: 'var(--color-sand)',
        borderBottom: '1px solid var(--color-ink-rule)',
      }}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id={headingId}
          className="flex items-baseline gap-3 font-display font-semibold"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(1.875rem, 3vw, 2.75rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          <span
            className="font-body text-xs font-medium uppercase tracking-[0.16em] tabular-nums"
            style={{ color: 'var(--color-label-text)' }}
            aria-hidden="true"
          >
            {number}
          </span>
          <span>What the AI engines actually said</span>
        </h2>

        <p
          className="mt-10 font-display"
          style={{
            fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.015em',
            lineHeight: 1.4,
            maxWidth: '60ch',
          }}
        >
          We asked each engine {geo.queries.length} high-intent patient question
          {geo.queries.length === 1 ? '' : 's'} about your specialty in your city. Here is what
          they returned, verbatim.
        </p>

        {/* Per-engine summary, rule-separated editorial row (no card grid) */}
        <ul
          className="mt-12"
          style={{ borderTop: '1px solid var(--color-ink-rule)' }}
        >
          {engines.map((e) => {
            const pct = e.total > 0 ? Math.round((e.hits / e.total) * 100) : 0
            const named = e.hits > 0
            return (
              <li
                key={e.provider}
                className="grid grid-cols-[8rem_auto_1fr] items-baseline gap-x-6 gap-y-1 py-5 sm:gap-x-10"
                style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
              >
                <p
                  className="text-xs font-medium uppercase tracking-[0.16em]"
                  style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
                >
                  {e.label}
                </p>
                <p
                  className="font-display font-semibold italic leading-none tabular-nums"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                    color: named ? 'var(--color-ink)' : 'var(--color-cinnabar)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {e.hits}
                  <span
                    className="not-italic"
                    style={{
                      fontSize: '0.55em',
                      color: 'var(--color-label-text)',
                      marginLeft: '0.15em',
                    }}
                  >
                    /{e.total}
                  </span>
                </p>
                <p
                  className="text-sm leading-snug"
                  style={{
                    color: named ? 'var(--color-body-text)' : 'var(--color-ink)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {named
                    ? `Named ${clinicName} in ${pct}% of queries`
                    : `Did not name ${clinicName}`}
                </p>
              </li>
            )
          })}
        </ul>

        {/* Quoted excerpts */}
        {excerpts.length > 0 && (
          <div className="mt-16 space-y-12">
            <p
              className="text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              Representative responses
            </p>
            {excerpts.map((a, i) => (
              <EvidenceQuote key={`${a.provider}-${i}`} answer={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function EvidenceQuote({ answer }: { answer: LlmAnswer }) {
  const excerpt = scrubDashes(
    truncate(answer.raw_text.replace(/```json|```/g, '').trim(), 380),
  )
  const query = scrubDashes(answer.query)
  // Guard against quotes that collapse to nothing after cleanup.
  if (!excerpt || !query) return null
  return (
    <figure>
      <p
        className="text-xs font-medium uppercase tracking-[0.18em]"
        style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
      >
        {ENGINE_LABEL[answer.provider]} · {answer.model}
      </p>
      <p
        className="mt-3 font-display"
        style={{
          fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
          color: 'var(--color-ink)',
          letterSpacing: '-0.005em',
          lineHeight: 1.4,
        }}
      >
        Asked: &ldquo;{query}&rdquo;
      </p>
      <blockquote
        className="mt-5"
        style={{ borderLeft: '1px solid var(--color-ink-rule)', paddingLeft: '1.25rem' }}
      >
        <p
          style={{
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            lineHeight: 1.65,
            maxWidth: '60ch',
          }}
        >
          {excerpt}
        </p>
      </blockquote>
      <figcaption
        className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs"
        style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
      >
        <span>
          {answer.our_clinic_mentioned ? '✓ Your practice was named' : '✗ Your practice was not named'}
        </span>
        {answer.mentioned_clinics.length > 0 && (
          <>
            <span aria-hidden="true">·</span>
            <span>Named: {answer.mentioned_clinics.slice(0, 4).map(scrubDashes).join(', ')}</span>
          </>
        )}
      </figcaption>
    </figure>
  )
}

function pickExcerpts(answers: LlmAnswer[], n: number): LlmAnswer[] {
  // Filter to answers that actually returned non-empty, non-error content.
  // Strip code fences before measuring length: a 200-char response that's
  // 95% ```json``` wrappers is effectively empty.
  const valid = answers.filter((a) => {
    if (!a.raw_text || a.raw_text.startsWith('ERROR:')) return false
    const cleaned = a.raw_text.replace(/```json|```/g, '').trim()
    return cleaned.length > 80
  })
  // Prefer competitor-naming, you-missing answers (most damning)
  const damning = valid.filter(
    (a) => !a.our_clinic_mentioned && a.mentioned_clinics.length > 0,
  )
  const out = damning.slice(0, n)
  if (out.length < n) {
    const rest = valid.filter((a) => !out.includes(a))
    out.push(...rest.slice(0, n - out.length))
  }
  return out
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s
  return s.slice(0, max).replace(/\s+\S*$/, '') + '…'
}

const SCORE_BANDS = [
  { range: '75 to 100', label: 'Inevitable', note: 'You are the answer. Widen the moat.' },
  { range: '55 to 74', label: 'Contender', note: 'You appear, but inconsistently. Close the gap.' },
  { range: '35 to 54', label: 'Climbing', note: 'You are partly visible. A quarter of focused work closes most of it.' },
  { range: '0 to 34', label: 'Invisible', note: 'You are not named yet. The cheap wins below come first.' },
] as const

const RECOMMENDED_SCHEMA = [
  'Organization',
  'MedicalClinic',
  'Physician',
  'Service',
  'FAQPage',
  'BreadcrumbList',
] as const

function SchemaMatrix({
  crawl,
  competitorCrawl,
}: {
  crawl: CrawlPayload
  competitorCrawl: CompetitorCrawlPayload | null
}) {
  const pages = (crawl.pages ?? []).slice(0, 8)
  if (pages.length === 0) return null

  // Competitor coverage: for each schema type, count how many competitors expose it.
  const competitorCount = competitorCrawl?.competitors.length ?? 0
  const coverage = (type: string): number => {
    if (!competitorCrawl) return 0
    return competitorCrawl.competitors.filter((c) => c.schema_coverage.includes(type)).length
  }

  return (
    <div>
      <p
        className="font-display"
        style={{
          fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
          color: 'var(--color-ink)',
          letterSpacing: '-0.015em',
          lineHeight: 1.4,
          maxWidth: '64ch',
        }}
      >
        AI engines build their entity graph from structured data first. Below is what each
        of your key pages currently exposes versus what we recommend for a clinic of your
        type.
      </p>

      <div className="audit-schema-scroll relative mt-10 overflow-x-auto">
        <table
          className="w-full text-xs"
          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
        >
          <thead>
            <tr style={{ color: 'var(--color-label-text)' }}>
              <th
                scope="col"
                className="border-b py-2 pr-3 text-left font-medium uppercase tracking-[0.12em]"
                style={{ borderColor: 'var(--color-ink-rule)' }}
              >
                Page
              </th>
              {RECOMMENDED_SCHEMA.map((t) => (
                <th
                  key={t}
                  scope="col"
                  className="border-b py-2 pr-2 text-center font-medium uppercase tracking-[0.08em]"
                  style={{ borderColor: 'var(--color-ink-rule)' }}
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.url} style={{ borderBottom: '1px solid var(--color-ink-rule)' }}>
                <th
                  scope="row"
                  className="py-2.5 pr-3 text-left font-normal"
                  style={{ maxWidth: '20ch', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
                >
                  <span className="block truncate" title={p.url}>
                    {shortUrl(p.url)}
                  </span>
                </th>
                {RECOMMENDED_SCHEMA.map((t) => {
                  const has = p.jsonld_types?.includes(t) ?? false
                  return (
                    <td key={t} className="py-2.5 pr-2 text-center">
                      <span
                        aria-label={has ? `${t} present` : `${t} missing`}
                        className="inline-flex h-4 w-4 items-center justify-center rounded-full"
                        style={{
                          background: has ? 'var(--color-cinnabar)' : 'transparent',
                          border: has ? 'none' : '1px solid var(--color-ink-rule)',
                        }}
                      >
                        {has && (
                          <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
                            <path
                              d="M2.5 6.2l2.3 2.3 4.7-4.7"
                              stroke="var(--color-ivory)"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        )}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}

            {competitorCount > 0 && (
              <tr
                style={{
                  borderTop: '2px solid var(--color-ink)',
                  background: 'var(--color-card)',
                }}
              >
                <th scope="row" className="py-2.5 pr-3 text-left font-normal">
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    Competitor coverage
                  </span>
                </th>
                {RECOMMENDED_SCHEMA.map((t) => {
                  const count = coverage(t)
                  return (
                    <td
                      key={t}
                      className="py-2.5 pr-2 text-center"
                      style={{
                        color:
                          count === 0
                            ? 'var(--color-label-text)'
                            : 'var(--color-ink)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                      }}
                    >
                      <span className="font-display tabular-nums" style={{ fontSize: '0.9rem' }}>
                        {count}
                      </span>
                      <span style={{ color: 'var(--color-label-text)' }}>/{competitorCount}</span>
                    </td>
                  )
                })}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p
        className="audit-schema-swipe-hint mt-3 text-xs sm:hidden"
        style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
      >
        Swipe the table to see all schema types →
      </p>

      <p
        className="mt-4 text-xs"
        style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
      >
        Cinnabar dot: type detected on page. Empty circle: not detected. Showing first{' '}
        {pages.length} of {crawl.pages?.length ?? 0} crawled pages.
        {competitorCount > 0 && (
          <>
            {' '}The bottom row shows how many of the {competitorCount} competitors we crawled
            expose each type.
          </>
        )}
      </p>
    </div>
  )
}


function shortUrl(url: string): string {
  try {
    const u = new URL(url)
    const path = u.pathname === '/' ? '' : u.pathname.replace(/\/$/, '')
    return path ? path : '/'
  } catch {
    return url
  }
}

function ScoringLegend() {
  return (
    <div
      className="mt-14 pt-10"
      style={{ borderTop: '1px solid var(--color-ink-rule)' }}
    >
      <p
        className="text-xs font-medium uppercase tracking-[0.18em]"
        style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
      >
        How to read the scores
      </p>
      <p
        className="mt-4 text-sm leading-relaxed"
        style={{
          color: 'var(--color-body-text)',
          fontFamily: 'var(--font-body)',
          maxWidth: '68ch',
        }}
      >
        Five pillars. <strong style={{ color: 'var(--color-ink)' }}>SEO</strong>: classic search
        ranking. <strong style={{ color: 'var(--color-ink)' }}>AEO</strong>: answer-engine
        optimization, the signals that get a practice quoted by ChatGPT, Claude, and Gemini.{' '}
        <strong style={{ color: 'var(--color-ink)' }}>GEO</strong>: generative-engine search,
        whether your practice gets named in those generated answers.{' '}
        <strong style={{ color: 'var(--color-ink)' }}>Lead generation</strong>: the inquiry path
        on your site. <strong style={{ color: 'var(--color-ink)' }}>Local presence</strong>:
        Google Business Profile, local pack, reviews.
      </p>
      <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {SCORE_BANDS.map((b) => (
          <div key={b.range}>
            <dt
              className="font-display font-semibold italic"
              style={{
                fontSize: '1rem',
                color: 'var(--color-ink)',
                letterSpacing: '-0.02em',
              }}
            >
              {b.range}
            </dt>
            <dd
              className="mt-1 font-display"
              style={{
                fontSize: '0.95rem',
                color: 'var(--color-ink)',
                letterSpacing: '-0.01em',
              }}
            >
              {b.label}
            </dd>
            <dd
              className="mt-1 text-xs leading-relaxed"
              style={{
                color: 'var(--color-body-text)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {b.note}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function MethodologyFooter({
  deliveredAt,
  geo,
  modules,
}: {
  deliveredAt: string | null
  geo: GeoPayload | null
  modules: AuditReportModules | null
}) {
  const dateLabel = deliveredAt
    ? new Date(deliveredAt).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : null

  const enginesUsed: { provider: LlmAnswer['provider']; model: string }[] = []
  if (geo) {
    const seen = new Set<string>()
    for (const a of geo.answers) {
      const key = `${a.provider}:${a.model}`
      if (seen.has(key)) continue
      seen.add(key)
      enginesUsed.push({ provider: a.provider, model: a.model })
    }
  }

  const sources: { label: string; detail: string }[] = []
  for (const e of enginesUsed) {
    sources.push({
      label: ENGINE_LABEL[e.provider],
      detail: `${PROVIDER_VENDOR[e.provider]} · ${e.model}`,
    })
  }
  if (modules?.crawl) {
    sources.push({
      label: 'Site crawl',
      detail: `Firecrawl · ${modules.crawl.pages?.length ?? 0} pages`,
    })
  }
  if (modules?.pagespeed) {
    sources.push({ label: 'Page performance', detail: 'Google PageSpeed Insights API' })
  }
  if (modules?.dataforseo) {
    sources.push({
      label: 'SERPs & keywords',
      detail: `DataForSEO · ${modules.dataforseo.serps?.length ?? 0} SERPs analyzed`,
    })
  }

  return (
    <section
      className="px-6 py-12 lg:px-16 lg:py-16"
      style={{ background: 'var(--color-card)', borderTop: '1px solid var(--color-ink-rule)' }}
      aria-label="Methodology"
    >
      <div className="mx-auto max-w-4xl">
        <p
          className="text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
        >
          Methodology &amp; data sources
        </p>

        {dateLabel && deliveredAt && (
          <p
            className="mt-4 text-sm"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
          >
            <span style={{ color: 'var(--color-label-text)' }}>Generated </span>
            <time dateTime={deliveredAt}>{dateLabel}</time>.
          </p>
        )}

        {sources.length > 0 && (
          <dl
            className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
            style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.5rem' }}
          >
            {sources.map((s, i) => (
              <div key={`${s.label}-${i}`}>
                <dt
                  className="text-xs font-medium uppercase tracking-[0.14em]"
                  style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
                >
                  {s.label}
                </dt>
                <dd
                  className="mt-1 text-sm"
                  style={{
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {s.detail}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <p
          className="mt-10 text-xs leading-relaxed"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
        >
          Scores synthesized by Claude (Anthropic <code>claude-sonnet-4-6</code>) from the raw
          module data above. The narrative section is generated; the numeric callouts and
          tables are direct from source APIs. Re-run the audit anytime to refresh the data;
          findings can shift week to week as the AI engines update their indices.
        </p>
      </div>
    </section>
  )
}

const PROVIDER_VENDOR: Record<LlmAnswer['provider'], string> = {
  openai: 'OpenAI API',
  anthropic: 'Anthropic API',
  perplexity: 'Perplexity API',
  gemini: 'Google AI Studio',
}

function pillarLabel(pillar: keyof Scorecard | string): string {
  if (pillar in PILLAR_LABEL) return PILLAR_LABEL[pillar as keyof Scorecard]
  return pillar
}

function overallNarrative(score: number): string {
  if (score >= 75) return 'You are already in the answer. The work now is widening the moat.'
  if (score >= 55) return 'You are in the conversation. The moves below decide whether you stay there.'
  if (score >= 35) return 'You are partially visible. A focused quarter closes most of the gap.'
  return 'You are not in the answer. The cheap wins below buy back your name first.'
}

function stripProto(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/**
 * Brand voice safety net: strip em and en dashes at render time.
 *
 * The synthesis prompt now forbids them, but pre-existing audit rows produced
 * before that prompt update still contain dashes. Replace at render so we
 * never ship a brand-voice violation, even from old data.
 */
function scrubDashes(s: string): string {
  return s.replace(/\s*—\s*/g, ', ').replace(/\s*–\s*/g, ', ')
}

function renderMarkdown(md: string): string {
  const esc = (s: string) =>
    s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!))
  const lines = scrubDashes(md).split('\n')
  const out: string[] = []
  let inList = false
  for (const raw of lines) {
    const line = esc(raw)
    if (/^##\s+/.test(raw)) {
      if (inList) {
        out.push('</ul>')
        inList = false
      }
      out.push(
        `<h3 style="font-family:var(--font-display);font-weight:600;font-size:1.375rem;letter-spacing:-0.015em;margin-top:2.5rem;margin-bottom:0.75rem;color:var(--color-ink)">${line.replace(/^##\s+/, '')}</h3>`,
      )
      continue
    }
    if (/^#\s+/.test(raw)) {
      if (inList) {
        out.push('</ul>')
        inList = false
      }
      out.push(
        `<h2 style="font-family:var(--font-display);font-weight:600;font-size:1.75rem;letter-spacing:-0.02em;margin-top:3rem;margin-bottom:1rem;color:var(--color-ink)">${line.replace(/^#\s+/, '')}</h2>`,
      )
      continue
    }
    if (/^\s*[-*]\s+/.test(raw)) {
      if (!inList) {
        out.push('<ul style="list-style:none;padding-left:0;margin:1rem 0">')
        inList = true
      }
      out.push(
        `<li style="position:relative;padding-left:1.5rem;margin-bottom:0.65rem;line-height:1.65">` +
          `<span aria-hidden="true" style="position:absolute;left:0;top:0.7em;display:block;height:1px;width:0.85rem;background:var(--color-cinnabar)"></span>` +
          line.replace(/^\s*[-*]\s+/, '').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') +
          `</li>`,
      )
      continue
    }
    if (inList) {
      out.push('</ul>')
      inList = false
    }
    if (!raw.trim()) {
      out.push('')
      continue
    }
    out.push(
      `<p style="margin:1.1em 0;line-height:1.7">${line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`,
    )
  }
  if (inList) out.push('</ul>')
  return out.join('\n')
}
