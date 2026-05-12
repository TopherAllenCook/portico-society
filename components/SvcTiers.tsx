import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

interface TierRow {
  tag: string
  tagAccent?: boolean
  name: string
  priceMeta: string
  price: string
  priceUnit?: string
  description: string
  items: string[]
  cta: string
  ctaHref: string
  ctaExternal?: boolean
}

const tiers: TierRow[] = [
  {
    tag: 'Foundation',
    name: 'Verve Engagement',
    priceMeta: 'Six-month retainer',
    price: '$4,500–$6,500',
    priceUnit: '/ month',
    description:
      'The full authority and inquiry build for established practices ready to own AI search in their market.',
    items: [
      'AEO + SEO authority build',
      'Reputation management',
      'AI follow-up agent',
      'Monthly performance dashboard',
    ],
    cta: 'Request the free audit',
    ctaHref: '#begin',
  },
  {
    tag: 'Optional Add-On',
    tagAccent: true,
    name: '+ Inquiry Architecture',
    priceMeta: 'Added to Verve Engagement',
    price: '+$2,500–$3,500',
    priceUnit: '/ month',
    description:
      'For practices that want every patient inquiry captured, qualified, and converted. No additional staff required.',
    items: [
      'Booking and intake AI agent',
      'CRO on the full inquiry flow',
      'Attribution tracking from source to appointment',
      'Everything in Verve Engagement',
    ],
    cta: 'Request the free audit',
    ctaHref: '#begin',
  },
  {
    tag: 'Advisory',
    name: 'Strategic Advisory',
    priceMeta: 'Custom scope',
    price: 'Priced to the situation',
    description:
      'For a new launch, competitive threat, revenue decline, or multi-location expansion. Scoped to the problem with clear milestones and no ongoing commitment unless you choose one.',
    items: [
      'Everything in Verve Engagement',
      'PPC management',
      'Competitive intelligence',
      'Multi-location playbook',
      'CMO-level strategy and principal access',
    ],
    cta: 'Book a strategy call',
    ctaHref: 'mailto:hello@vervemd.com?subject=Strategy%20Call%20Request',
    ctaExternal: true,
  },
]

export default function SvcTiers() {
  return (
    <section
      id="tiers"
      aria-labelledby="tiers-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text-on-dark)' }}
            >
              Engagement Model
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ivory-dim)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="tiers-heading"
            className="font-display italic font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
            }}
          >
            Three ways to engage. One starting point.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-16"
            style={{ fontSize: '1rem', color: 'var(--color-body-text-on-dark)', maxWidth: '52ch' }}
          >
            Every path begins with the free audit. The audit tells you which tier fits your practice.
          </p>
        </RevealOnScroll>

        {tiers.map((tier, i) => (
          <RevealOnScroll key={tier.name} delay={i * 60}>
            <div
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] lg:gap-16 py-12"
              style={{ borderTop: '1px solid var(--color-ivory-dim)' }}
            >
              {/* Left: identity + price */}
              <div className="mb-8 lg:mb-0">
                <p
                  className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-3"
                  style={{
                    color: tier.tagAccent
                      ? 'var(--color-cinnabar-on-dark)'
                      : 'var(--color-label-text-on-dark)',
                  }}
                >
                  {tier.tag}
                </p>
                <h3
                  className="font-display font-normal leading-snug mb-6"
                  style={{
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.625rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1.5"
                  style={{ color: 'var(--color-label-text-on-dark)' }}
                >
                  {tier.priceMeta}
                </p>
                <p
                  className="font-display font-normal leading-tight"
                  style={{
                    fontSize: tier.priceUnit
                      ? 'clamp(1.25rem, 2.25vw, 1.875rem)'
                      : 'clamp(1.0625rem, 1.6vw, 1.375rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.025em',
                  }}
                >
                  {tier.price}
                  {tier.priceUnit && (
                    <span
                      className="font-body font-light"
                      style={{
                        fontSize: '0.875rem',
                        letterSpacing: 0,
                        color: 'var(--color-body-text-on-dark)',
                      }}
                    >
                      {' '}{tier.priceUnit}
                    </span>
                  )}
                </p>
              </div>

              {/* Right: description + items + CTA */}
              <div>
                <p
                  className="font-body font-light leading-relaxed mb-6"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}
                >
                  {tier.description}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body font-light"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}
                    >
                      <span
                        className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-cinnabar-on-dark)' }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {tier.ctaExternal ? (
                  <a
                    href={tier.ctaHref}
                    className="font-body inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      border: '1px solid oklch(97% 0.008 75 / 0.25)',
                      color: 'var(--color-ivory)',
                      outlineColor: 'oklch(97% 0.008 75 / 0.6)',
                    }}
                  >
                    {tier.cta}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    href={tier.ctaHref}
                    className="font-body inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cinnabar text-ivory hover:bg-cinnabar-dark"
                    style={{ outlineColor: 'var(--color-cinnabar)' }}
                  >
                    {tier.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}

        <div style={{ borderTop: '1px solid var(--color-ivory-dim)' }} aria-hidden="true" />

        <RevealOnScroll>
          <p
            className="font-body font-light text-center mt-10"
            style={{ fontSize: '0.875rem', color: 'oklch(97% 0.008 75 / 0.4)' }}
          >
            Not sure which path fits?{' '}
            <Link
              href="#begin"
              className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: 'oklch(97% 0.008 75 / 0.65)', outlineColor: 'oklch(97% 0.008 75 / 0.5)' }}
            >
              Start with the audit.
            </Link>{' '}
            The findings make the choice obvious.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
