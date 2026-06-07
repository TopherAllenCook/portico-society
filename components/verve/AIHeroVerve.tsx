import Link from 'next/link'
import { AI_PAGE } from '@/lib/verve/content'

export default function AIHeroVerve() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-40 lg:px-16 lg:pb-28 lg:pt-48"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="ai-hero-heading"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        {/* Trust pill */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border bg-[var(--color-paper)] px-4 py-1.5 text-xs font-medium"
            style={{
              borderColor: 'var(--color-ink-rule)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
              boxShadow: 'var(--shadow-pill)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 1.2l1.4 3.1 3.4.3-2.6 2.2.8 3.3L6 8.4 3 10.1l.8-3.3L1.2 4.6l3.4-.3z"
                fill="var(--color-cinnabar)"
              />
            </svg>
            {AI_PAGE.eyebrow} · Five AI systems built for home service businesses
          </span>
        </div>

        {/* Headline */}
        <h1
          id="ai-hero-heading"
          className="mt-10 font-display font-semibold"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.75rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: 'var(--color-ink)',
          }}
        >
          Your business should be{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--color-cinnabar)' }}>
            running while you sleep.
          </span>
        </h1>

        {/* Sub */}
        <p
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
        >
          {AI_PAGE.sub}
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
            Get your free AI audit
            <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href="#ai-services"
            className="inline-flex items-center gap-2 rounded-full border bg-[var(--color-paper)] px-7 py-3.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              borderColor: 'var(--color-ink-rule)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
              outlineColor: 'var(--color-cinnabar)',
            }}
          >
            See all AI systems
          </Link>
        </div>

        {/* Tiny stat row in editorial style — not a hero metric block */}
        <dl
          className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-y-3 border-t pt-6 sm:grid-cols-3 sm:gap-y-0"
          style={{ borderColor: 'var(--color-ink-rule)' }}
        >
          {AI_PAGE.stats.map((s) => (
            <div key={s.value} className="sm:px-3">
              <dt
                className="text-xs"
                style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              >
                {s.label}
              </dt>
              <dd
                className="mt-1 font-display font-semibold"
                style={{ fontSize: '1.25rem', color: 'var(--color-cinnabar)', letterSpacing: '-0.02em' }}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
