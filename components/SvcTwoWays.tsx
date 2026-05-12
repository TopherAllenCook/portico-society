import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const verveItems = [
  'AI Search Authority across ChatGPT, Perplexity, Claude, Google SGE',
  'AI inquiry architecture on voice, web, and SMS',
  'Growth foundation: reputation, referral, retention',
  'Monthly performance reporting with citation tracking',
  'Quarterly strategy review with principal',
]

const advisoryItems = [
  'Situation assessment and competitive analysis',
  'Engagement scoped around the specific problem',
  'Direct access to principal throughout',
  'Clear milestones and defined exit criteria',
  'Option to convert to Verve Engagement at conclusion',
]

export default function SvcTwoWays() {
  return (
    <section
      id="engagement-paths"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-labelledby="two-ways-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text-on-dark)' }}
            >
              Engagement Paths
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
            id="two-ways-heading"
            className="font-display font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
            }}
          >
            Two ways to work with Verve.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]">

            {/* Verve Engagement */}
            <div className="pb-16 lg:pb-0 lg:pr-16">
              <p
                className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-6"
                style={{ color: 'var(--color-cinnabar-on-dark)' }}
              >
                Standard
              </p>
              <h3
                className="font-display font-normal leading-snug mb-5"
                style={{
                  fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
                  color: 'var(--color-ivory)',
                  letterSpacing: '-0.02em',
                }}
              >
                Verve Engagement
              </h3>
              <p
                className="font-body font-light leading-relaxed mb-8"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '44ch' }}
              >
                A structured six-month engagement covering AI search authority,
                inquiry architecture, and growth foundation, built in sequence,
                in full. For practices with consistent patient volume and a clear
                growth trajectory. Month one begins with the audit findings.
              </p>
              <div style={{ borderTop: '1px solid var(--color-ivory-dim)', paddingTop: '1.5rem' }}>
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1.5"
                  style={{ color: 'var(--color-label-text-on-dark)' }}
                >
                  Six-month retainer
                </p>
                <p
                  className="font-display font-normal"
                  style={{
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  $4,500&ndash;$6,500 / month
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {verveItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-body font-light"
                    style={{ fontSize: '0.9rem', color: 'var(--color-body-text-on-dark)' }}
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

            {/* Column divider */}
            <div
              className="hidden lg:block"
              style={{ backgroundColor: 'var(--color-ivory-subtle)' }}
              aria-hidden="true"
            />

            {/* Strategic Advisory */}
            <div
              className="pt-16 lg:pt-0 lg:pl-16 border-t lg:border-t-0"
              style={{ borderColor: 'var(--color-ivory-dim)' }}
            >
              <p
                className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-6"
                style={{ color: 'var(--color-label-text-on-dark)' }}
              >
                Custom
              </p>
              <h3
                className="font-display font-normal leading-snug mb-5"
                style={{
                  fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
                  color: 'var(--color-ivory)',
                  letterSpacing: '-0.02em',
                }}
              >
                Strategic Advisory
              </h3>
              <p
                className="font-body font-light leading-relaxed mb-8"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '44ch' }}
              >
                For practices in a specific situation: a new launch, a competitive
                crisis, a revenue decline, or a positioning pivot. We assess, advise,
                and build what the situation requires. The engagement structure is
                designed for the problem, not a template.
              </p>
              <div style={{ borderTop: '1px solid var(--color-ivory-dim)', paddingTop: '1.5rem' }}>
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1.5"
                  style={{ color: 'var(--color-label-text-on-dark)' }}
                >
                  Custom scope
                </p>
                <p
                  className="font-display font-normal"
                  style={{
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Priced to the situation
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {advisoryItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-body font-light"
                    style={{ fontSize: '0.9rem', color: 'var(--color-body-text-on-dark)' }}
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
        </RevealOnScroll>

        {/*
          PLACEHOLDER — half-bleed editorial photo anchoring the dark section.
          Swap the div below to:

          <div className="relative w-full mt-20 overflow-hidden" style={{ height: 'clamp(200px, 30vh, 360px)' }}>
            <Image src="/svc-practice-interior.jpg" alt="" fill sizes="100vw"
              className="object-cover"
              style={{ filter: 'brightness(0.6) saturate(0.5)' }} />
          </div>

          Recommended shot: physician consultation room or private practice interior,
          very dark treatment to sit on the ink background.
        */}
        <div
          className="relative w-full mt-20 overflow-hidden"
          style={{ height: 'clamp(200px, 30vh, 360px)', backgroundColor: 'oklch(97% 0.008 75 / 0.06)' }}
          aria-hidden="true"
          data-placeholder="svc-twoways-photo"
        />

        {/* Bridge to audit */}
        <RevealOnScroll>
          <div
            className="mt-20 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: '1px solid var(--color-ivory-dim)', paddingTop: '2.5rem' }}
          >
            <p
              className="font-body font-light"
              style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '52ch' }}
            >
              Not sure which fits your practice? Start with the audit.
              The findings make the path obvious.
            </p>
            <Link
              href="#begin"
              className="font-body inline-flex items-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-ivory text-cinnabar hover:bg-cinnabar hover:text-ivory flex-shrink-0"
              style={{ outlineColor: 'var(--color-ivory)' }}
            >
              Request the free audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
