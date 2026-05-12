import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const verveItems = [
  'AI Search Authority across ChatGPT, Perplexity, Claude, and Google AI',
  'AI inquiry architecture on voice, web, and SMS',
  'Growth foundation: reputation, referral, and retention',
  'Monthly performance reporting with AI citation tracking',
  'Quarterly strategy review with principal',
]

const advisoryItems = [
  'Situation assessment and competitive landscape analysis',
  'Engagement scoped around your specific problem',
  'Direct access to principal throughout the engagement',
  'Clear milestones and defined exit criteria',
  'Option to convert to a full Verve Engagement at conclusion',
]

const addons = [
  {
    label: 'A',
    title: 'Paid Patient Acquisition',
    price: 'from $3,000 / mo',
    model: 'Add-on to Verve Engagement or standalone',
  },
  {
    label: 'B',
    title: 'AI Patient Receptionist',
    price: '$1,500 setup · from $497 / mo',
    model: 'Available standalone or inside an engagement',
  },
]

function PillButton({
  href,
  variant,
  children,
}: {
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}) {
  const base =
    'font-body w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  if (variant === 'primary') {
    return (
      <Link
        href={href}
        className={`${base} bg-cinnabar text-ivory hover:bg-cinnabar-dark`}
        style={{ outlineColor: 'var(--color-cinnabar)' }}
      >
        {children}
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className={base}
      style={{
        border: '1px solid var(--color-ink-rule)',
        color: 'var(--color-ink)',
        outlineColor: 'var(--color-ink)',
      }}
    >
      {children}
    </Link>
  )
}

export default function SalesSvcPricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Pricing
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="pricing-heading"
            className="font-display italic font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Two ways to begin. Both start with the free audit.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-16"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '52ch' }}
          >
            The audit tells you exactly where your practice stands and which path makes
            sense. Most practices move to Verve Engagement. Some start with Strategic
            Advisory. Both paths start at no cost.
          </p>
        </RevealOnScroll>

        {/* Two-column pricing */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]">

            {/* Verve Engagement */}
            <div className="pb-16 lg:pb-0 lg:pr-16">
              <p
                className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
                style={{ color: 'var(--color-cinnabar)' }}
              >
                Standard
              </p>
              <h3
                className="font-display font-normal leading-snug mb-3"
                style={{
                  fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                Verve Engagement
              </h3>

              <div style={{ borderTop: '1px solid var(--color-ink-rule)', margin: '1.5rem 0', paddingTop: '1.5rem' }}>
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
                  style={{ color: 'var(--color-label-text)' }}
                >
                  Six-month retainer
                </p>
                <p
                  className="font-display font-normal mb-2"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  $4,500&ndash;$6,500
                  <span
                    className="font-body font-light"
                    style={{ fontSize: '1rem', letterSpacing: 0, color: 'var(--color-body-text)' }}
                  >
                    {' '}/ month
                  </span>
                </p>
              </div>

              <p
                className="font-body font-light leading-relaxed mb-8"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '44ch' }}
              >
                A structured six-month build covering AI search authority, inquiry
                architecture, and growth foundation. For practices with consistent
                volume and a clear growth trajectory.
              </p>

              <ul className="space-y-3 mb-10">
                {verveItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-body font-light"
                    style={{ fontSize: '0.9rem', color: 'var(--color-body-text)' }}
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

              <PillButton href="#begin" variant="primary">
                Request the free audit
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </PillButton>
            </div>

            {/* Divider */}
            <div
              className="hidden lg:block"
              style={{ backgroundColor: 'var(--color-ink-faint)' }}
              aria-hidden="true"
            />

            {/* Strategic Advisory */}
            <div
              className="pt-16 lg:pt-0 lg:pl-16 border-t lg:border-t-0"
              style={{ borderColor: 'var(--color-ink-rule)' }}
            >
              <p
                className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
                style={{ color: 'var(--color-label-text)' }}
              >
                Custom
              </p>
              <h3
                className="font-display font-normal leading-snug mb-3"
                style={{
                  fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                Strategic Advisory
              </h3>

              <div style={{ borderTop: '1px solid var(--color-ink-rule)', margin: '1.5rem 0', paddingTop: '1.5rem' }}>
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
                  style={{ color: 'var(--color-label-text)' }}
                >
                  Custom scope
                </p>
                <p
                  className="font-display font-normal mb-2"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Priced to the situation
                </p>
              </div>

              <p
                className="font-body font-light leading-relaxed mb-8"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '44ch' }}
              >
                For a new launch, a competitive crisis, a revenue decline, or a
                positioning pivot. Scoped to the problem — not a template.
              </p>

              <ul className="space-y-3 mb-10">
                {advisoryItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-body font-light"
                    style={{ fontSize: '0.9rem', color: 'var(--color-body-text)' }}
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

              <PillButton href="mailto:hello@vervemd.com?subject=Strategy%20Call%20Request" variant="secondary">
                Book a strategy call
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </PillButton>
            </div>

          </div>
        </RevealOnScroll>

        {/* Reassurance below grid */}
        <RevealOnScroll>
          <p
            className="font-body font-light text-center mt-14"
            style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
          >
            Not sure which path fits?{' '}
            <Link
              href="#begin"
              className="font-medium underline underline-offset-4 transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: 'var(--color-cinnabar)', outlineColor: 'var(--color-cinnabar)' }}
            >
              Start with the free audit.
            </Link>{' '}
            The findings make the choice obvious.
          </p>
        </RevealOnScroll>

        {/* Add-ons */}
        <RevealOnScroll>
          <div className="mt-16 pt-10" style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-8"
              style={{ color: 'var(--color-label-text)' }}
            >
              Add-On Services
            </p>
            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ backgroundColor: 'var(--color-ink-rule)' }}
            >
              {addons.map((addon) => (
                <div
                  key={addon.label}
                  className="py-6 pr-8"
                  style={{ backgroundColor: 'var(--color-stone)' }}
                >
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    {addon.label}
                  </p>
                  <p
                    className="font-display font-normal mb-1"
                    style={{
                      fontSize: '1.0625rem',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {addon.title}
                  </p>
                  <p
                    className="font-body font-light text-sm"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    {addon.price}
                  </p>
                  <p
                    className="font-body font-light text-xs mt-1"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    {addon.model}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
