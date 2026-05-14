import Link from 'next/link'
import { CORE_PACKAGES } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function PackagesOverviewVerve() {
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="packages-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
          <Link
            href="/pricing"
            className="shrink-0 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cinnabar)] rounded-sm"
            style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
          >
            See full pricing →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {CORE_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-xl p-7"
              style={{
                background: pkg.popular ? 'var(--color-ink)' : 'var(--color-stone)',
                border: pkg.popular ? '1px solid var(--color-cinnabar)' : '1px solid var(--color-ink-ghost)',
                position: 'relative',
              }}
            >
              {pkg.popular && (
                <span
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-medium"
                  style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)' }}
                >
                  Most Popular
                </span>
              )}
              <h3
                className="text-xs font-medium uppercase tracking-[0.15em]"
                style={{ color: pkg.popular ? 'var(--color-cinnabar-on-dark)' : 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              >
                {pkg.name}
              </h3>
              <p
                className="mt-1 font-display font-bold"
                style={{
                  fontSize: '2rem',
                  color: pkg.popular ? 'var(--color-ivory)' : 'var(--color-ink)',
                  letterSpacing: '-0.03em',
                }}
              >
                {pkg.price}<span className="text-sm font-normal opacity-50">/mo</span>
              </p>
              <p
                className="mt-1 text-sm"
                style={{ color: pkg.popular ? 'var(--color-body-text-on-dark)' : 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                {pkg.tagline}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <CTAButton href="/pricing" label="Compare all packages →" variant="ghost" />
        </div>
      </div>
    </section>
  )
}
