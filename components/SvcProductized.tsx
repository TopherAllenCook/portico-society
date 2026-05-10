import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const engagementIncludes = [
  'All three outcome areas — AI visibility, inquiry architecture, and practice authority',
  'Free AI Visibility Audit before engagement begins',
  'Sequenced 6-month build: visibility in months 1–2, inquiry architecture in months 2–4, content layer in months 3–6',
  'Monthly performance report with AI citation tracking, inquiry volume, and conversion metrics',
  'Dedicated point of contact — not a rotating account team',
  'Access to AI Patient Receptionist, paid media, and review velocity as add-on layers',
]

const advisoryIncludes = [
  'Defined scope and deliverable before work begins',
  'Built for a specific situation: practice launch, market entry, competitive crisis, or service pivot',
  'Custom timeline — weeks to months depending on scope',
  'Senior-level involvement throughout, not handed off to junior staff',
  'No retainer structure — engagement closes when the deliverable is complete',
]

const situations = [
  'You are launching a new longevity or concierge practice and need authority before you open doors',
  'A competitor has claimed AI search dominance in your geography and you need to recover ground',
  'You are adding a new service line — semaglutide, peptides, regenerative — and need positioning before marketing begins',
  'Your practice has been acquired or rebranded and needs a full authority reset',
]

export default function SvcProductized() {
  return (
    <section
      id="svc-tiers"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-labelledby="tiers-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text-on-dark)' }}
            >
              How We Engage
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ivory-dim)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2
            id="tiers-heading"
            className="font-display font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
            }}
          >
            Two paths. One methodology.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text-on-dark)', maxWidth: '56ch' }}
          >
            Most practices take the structured engagement. Strategic Advisory is for those
            with a specific situation that requires a defined scope before a retainer makes sense.
          </p>
        </RevealOnScroll>

        {/* Verve Engagement */}
        <RevealOnScroll>
          <div
            className="py-14"
            style={{ borderTop: '1px solid var(--color-ivory-dim)' }}
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">

              <div className="lg:pr-16">
                <p
                  className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-5"
                  style={{ color: 'var(--color-cinnabar-on-dark)' }}
                >
                  Verve Engagement
                </p>
                <h3
                  className="font-display font-normal leading-snug mb-5"
                  style={{
                    fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  The structured 6-month build.
                </h3>
                <p
                  className="font-body font-light leading-relaxed mb-8"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '42ch' }}
                >
                  For established practices with $1M+ in annual revenue that are doing
                  some marketing but not getting the right patients from it. We cover all
                  three outcome areas in sequence over six months. The audit is first.
                  Nothing begins until we know exactly where your practice stands.
                </p>
                <div style={{ borderTop: '1px solid var(--color-ivory-dim)', paddingTop: '1.25rem' }}>
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
                    style={{ color: 'var(--color-label-text-on-dark)' }}
                  >
                    6-month retainer
                  </p>
                  <p
                    className="font-body font-light"
                    style={{ fontSize: '0.875rem', color: 'var(--color-cinnabar-on-dark)' }}
                  >
                    $4,500 – $6,500 / mo
                  </p>
                </div>
              </div>

              <div
                className="hidden lg:block"
                style={{ backgroundColor: 'var(--color-ivory-dim)' }}
                aria-hidden="true"
              />

              <div className="lg:pl-16">
                <p
                  className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                  style={{ color: 'var(--color-label-text-on-dark)' }}
                >
                  What&rsquo;s Included
                </p>
                <ul className="space-y-4">
                  {engagementIncludes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 font-body font-light"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}
                    >
                      <span
                        className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-cinnabar)' }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link
                    href="#begin"
                    className="font-body inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-ivory text-ink hover:bg-stone"
                    style={{ outlineColor: 'var(--color-ivory)' }}
                  >
                    Request the free audit
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>

        {/* Strategic Advisory */}
        <RevealOnScroll>
          <div
            className="py-14"
            style={{ borderTop: '1px solid var(--color-ivory-dim)' }}
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">

              <div className="lg:pr-16">
                <p
                  className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-5"
                  style={{ color: 'var(--color-cinnabar-on-dark)' }}
                >
                  Strategic Advisory
                </p>
                <h3
                  className="font-display font-normal leading-snug mb-5"
                  style={{
                    fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Built around a specific situation.
                </h3>
                <p
                  className="font-body font-light leading-relaxed mb-8"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '42ch' }}
                >
                  Some practices have a defined problem that requires a defined deliverable —
                  not a six-month retainer. Strategic Advisory is custom-scoped, senior-led,
                  and closes when the work is complete.
                </p>
                <div style={{ borderTop: '1px solid var(--color-ivory-dim)', paddingTop: '1.25rem' }}>
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
                    style={{ color: 'var(--color-label-text-on-dark)' }}
                  >
                    Custom scope
                  </p>
                  <p
                    className="font-body font-light"
                    style={{ fontSize: '0.875rem', color: 'var(--color-cinnabar-on-dark)' }}
                  >
                    Priced by engagement
                  </p>
                </div>
              </div>

              <div
                className="hidden lg:block"
                style={{ backgroundColor: 'var(--color-ivory-dim)' }}
                aria-hidden="true"
              />

              <div className="lg:pl-16">
                <p
                  className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                  style={{ color: 'var(--color-label-text-on-dark)' }}
                >
                  Common Situations
                </p>
                <ul className="space-y-4 mb-10">
                  {situations.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 font-body font-light"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}
                    >
                      <span
                        className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-cinnabar)' }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p
                  className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                  style={{ color: 'var(--color-label-text-on-dark)' }}
                >
                  What&rsquo;s Included
                </p>
                <ul className="space-y-4">
                  {advisoryIncludes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 font-body font-light"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}
                    >
                      <span
                        className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-cinnabar)' }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{ borderTop: '1px solid var(--color-ivory-dim)' }} aria-hidden="true" />
        </RevealOnScroll>

      </div>
    </section>
  )
}
