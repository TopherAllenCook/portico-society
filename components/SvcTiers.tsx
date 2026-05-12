import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

type TierVariant = 'neutral' | 'featured' | 'dark'

interface Tier {
  variant: TierVariant
  tag: string
  name: string
  priceLabel: string
  price: string
  unit: string
  description: string
  items: string[]
  cta: string
  ctaHref: string
}

const tiers: Tier[] = [
  {
    variant: 'neutral',
    tag: 'Foundation',
    name: 'Verve Engagement',
    priceLabel: 'Six-month retainer',
    price: '$4,500–$6,500',
    unit: '/ mo',
    description: 'The full authority and inquiry build for established practices ready to own AI search in their market.',
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
    variant: 'featured',
    tag: 'Complete System',
    name: '+ Inquiry Architecture',
    priceLabel: 'Added to Verve Engagement',
    price: '+$2,500–$3,500',
    unit: '/ mo',
    description: 'For practices that want every patient inquiry captured, qualified, and converted — without adding staff.',
    items: [
      'Everything in Verve Engagement',
      'Booking and intake AI agent',
      'CRO on inquiry flow',
      'Attribution tracking',
    ],
    cta: 'Request the free audit',
    ctaHref: '#begin',
  },
  {
    variant: 'dark',
    tag: 'Advisory',
    name: 'Strategic Advisory',
    priceLabel: 'Custom scope',
    price: 'Priced to the situation',
    unit: '',
    description: 'For a new launch, competitive crisis, revenue decline, or multi-location expansion. Scoped to the problem.',
    items: [
      'Everything above',
      'PPC management',
      'Competitive intelligence',
      'Multi-location playbook',
      'CMO-level strategy',
    ],
    cta: 'Book a strategy call',
    ctaHref: 'mailto:hello@vervemd.com?subject=Strategy%20Call%20Request',
  },
]

function TierCard({ tier }: { tier: Tier }) {
  const isNeutral = tier.variant === 'neutral'
  const isFeatured = tier.variant === 'featured'
  const isDark = tier.variant === 'dark'

  const bg = isNeutral
    ? 'var(--color-stone)'
    : isFeatured
    ? 'var(--color-ivory)'
    : 'var(--color-cta-surface)'

  const tagColor = isNeutral
    ? 'var(--color-label-text)'
    : isFeatured
    ? 'var(--color-cinnabar)'
    : 'oklch(97% 0.008 75 / 0.5)'

  const headingColor = isDark ? 'var(--color-ivory)' : 'var(--color-ink)'

  const priceLabelColor = isNeutral
    ? 'var(--color-label-text)'
    : isFeatured
    ? 'var(--color-label-text)'
    : 'oklch(97% 0.008 75 / 0.5)'

  const priceColor = isDark ? 'var(--color-ivory)' : 'var(--color-ink)'

  const descColor = isNeutral
    ? 'var(--color-body-text)'
    : isFeatured
    ? 'var(--color-body-text)'
    : 'oklch(97% 0.008 75 / 0.7)'

  const bulletColor = isDark ? 'var(--color-cinnabar-on-dark)' : 'var(--color-cinnabar)'

  const itemColor = isNeutral
    ? 'var(--color-body-text)'
    : isFeatured
    ? 'var(--color-body-text)'
    : 'oklch(97% 0.008 75 / 0.7)'

  const dividerColor = isDark
    ? 'oklch(97% 0.008 75 / 0.15)'
    : 'var(--color-ink-rule)'

  return (
    <div
      className="flex flex-col p-8 lg:p-10 relative"
      style={{ backgroundColor: bg }}
    >
      {isFeatured && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: '3px', backgroundColor: 'var(--color-cinnabar)' }}
          aria-hidden="true"
        />
      )}

      <p
        className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
        style={{ color: tagColor }}
      >
        {tier.tag}
      </p>

      <h3
        className="font-display font-normal leading-snug mb-4"
        style={{
          fontSize: 'clamp(1.125rem, 1.8vw, 1.625rem)',
          color: headingColor,
          letterSpacing: '-0.02em',
        }}
      >
        {tier.name}
      </h3>

      <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
        <p
          className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
          style={{ color: priceLabelColor }}
        >
          {tier.priceLabel}
        </p>
        <p
          className="font-display font-normal"
          style={{
            fontSize: tier.unit ? 'clamp(1.375rem, 2.5vw, 2rem)' : 'clamp(1.125rem, 1.8vw, 1.5rem)',
            color: priceColor,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
          }}
        >
          {tier.price}
          {tier.unit && (
            <span
              className="font-body font-light"
              style={{ fontSize: '0.875rem', letterSpacing: 0, color: descColor }}
            >
              {' '}{tier.unit}
            </span>
          )}
        </p>
      </div>

      <p
        className="font-body font-light leading-relaxed mb-6"
        style={{ fontSize: '0.875rem', color: descColor, flexGrow: 1 }}
      >
        {tier.description}
      </p>

      <ul className="space-y-2.5 mb-8">
        {tier.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 font-body font-light"
            style={{ fontSize: '0.875rem', color: itemColor }}
          >
            <span
              className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: bulletColor }}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      {isFeatured ? (
        <Link
          href={tier.ctaHref}
          className="font-body w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-auto bg-cinnabar text-ivory hover:bg-cinnabar-dark"
          style={{ outlineColor: 'var(--color-cinnabar)' }}
        >
          {tier.cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ) : isDark ? (
        <Link
          href={tier.ctaHref}
          className="font-body w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-auto"
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
        </Link>
      ) : (
        <Link
          href={tier.ctaHref}
          className="font-body w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-auto"
          style={{
            border: '1px solid var(--color-ink-rule)',
            color: 'var(--color-ink)',
            outlineColor: 'var(--color-ink)',
          }}
        >
          {tier.cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  )
}

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
            className="font-body font-light leading-relaxed mb-14"
            style={{ fontSize: '1rem', color: 'var(--color-body-text-on-dark)', maxWidth: '52ch' }}
          >
            Every path begins with the free audit. The audit tells you which tier fits your practice.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-px lg:grid-cols-3" style={{ backgroundColor: 'var(--color-ivory-subtle)' }}>
            {tiers.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>
        </RevealOnScroll>

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
