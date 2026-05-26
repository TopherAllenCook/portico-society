import Link from 'next/link'
import CalButton from './CalButton'

export default function PricingHeroVerve() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-40 lg:px-16 lg:pb-28 lg:pt-48"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="pricing-hero-heading"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        {/* Trust pill */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-medium"
            style={{
              borderColor: 'var(--color-ink-rule)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 16px oklch(14% 0.012 50 / 0.04)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 1.2l1.4 3.1 3.4.3-2.6 2.2.8 3.3L6 8.4 3 10.1l.8-3.3L1.2 4.6l3.4-.3z"
                fill="var(--color-cinnabar)"
              />
            </svg>
            Two clear tracks. Built around your practice.
          </span>
        </div>

        {/* Headline */}
        <h1
          id="pricing-hero-heading"
          className="mt-10 font-display font-semibold"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.75rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: 'var(--color-ink)',
          }}
        >
          Straightforward pricing.{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--color-cinnabar)' }}>
            No surprises.
          </span>
        </h1>

        {/* Sub */}
        <p
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
        >
          Every package includes clinic-specific strategy. No generic marketing playbooks.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              background: 'var(--color-ink)',
              color: 'var(--color-ivory)',
              fontFamily: 'var(--font-body)',
              outlineColor: 'var(--color-cinnabar)',
            }}
          >
            Book your free audit
            <span aria-hidden="true">↗</span>
          </Link>
          <CalButton
            label="Talk to founder"
            variant="secondary"
            style={{ padding: '0.875rem 1.75rem', background: '#fff', borderColor: 'var(--color-ink-rule)' }}
          />
          <Link
            href="#pricing-packages-heading"
            className="text-sm underline-offset-4 hover:underline"
            style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
          >
            Compare packages
          </Link>
        </div>
      </div>
    </section>
  )
}
