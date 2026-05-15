import Link from 'next/link'
import { CORE_PACKAGES } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function PackagesOverviewVerve() {
  return (
    <section
      id="services"
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="packages-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              Packages
            </p>
            <h2
              id="packages-heading"
              className="font-display font-semibold"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.025em',
              }}
            >
              One agency. Everything your clinic needs to grow.
            </h2>
          </div>
          <Link
            href="/pricing"
            className="shrink-0 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cinnabar)] rounded-sm"
            style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
          >
            See full pricing →
          </Link>
        </div>

        <div className="mt-12" style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
          {CORE_PACKAGES.map((pkg, i) => (
            <article
              key={pkg.name}
              className="grid items-baseline gap-6 py-10 lg:grid-cols-[64px_1fr_auto_auto] lg:gap-10"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <p
                className="hidden font-display font-bold leading-none lg:block"
                style={{
                  fontSize: '3.5rem',
                  color: 'var(--color-ink-faint)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </p>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className="font-display font-semibold"
                    style={{ fontSize: '1.3rem', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}
                  >
                    {pkg.name}
                  </h3>
                  {pkg.popular && (
                    <span
                      className="text-[0.65rem] font-medium uppercase tracking-[0.14em]"
                      style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
                    >
                      Most chosen
                    </span>
                  )}
                </div>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '44ch' }}
                >
                  {pkg.tagline}
                </p>
              </div>

              <p
                className="font-display font-bold leading-none lg:text-right"
                style={{ fontSize: '1.75rem', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}
              >
                {pkg.price}
                <span
                  className="text-sm font-normal"
                  style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {' / mo'}
                </span>
              </p>

              <Link
                href="/pricing"
                aria-label={`See what's included in ${pkg.name}`}
                className="text-sm font-medium underline-offset-4 hover:underline whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cinnabar)] rounded-sm"
                style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
              >
                What&rsquo;s included →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButton href="/pricing" label="Compare all packages →" variant="ghost" />
        </div>
      </div>
    </section>
  )
}
