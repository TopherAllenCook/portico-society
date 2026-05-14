import { CORE_PACKAGES } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function PricingPackagesVerve() {
  return (
    <section
      className="px-6 py-20 lg:px-16"
      style={{ background: 'var(--color-ink)' }}
      aria-labelledby="pricing-packages-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="mb-10 text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
          id="pricing-packages-heading"
        >
          Core Packages — Monthly Retainer
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {CORE_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="flex flex-col rounded-xl p-8"
              style={{
                background: pkg.popular ? 'var(--color-cta-surface)' : 'oklch(17% 0.008 30)',
                border: pkg.popular ? '1px solid var(--color-cinnabar)' : '1px solid var(--color-ivory-subtle)',
                position: 'relative',
              }}
            >
              {pkg.popular && (
                <span
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)' }}
                >
                  Most Popular
                </span>
              )}
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-[0.15em]"
                  style={{ color: pkg.popular ? 'var(--color-cinnabar-on-dark)' : 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
                >
                  {pkg.name}
                </p>
                <p
                  className="mt-2 font-display font-bold"
                  style={{ fontSize: '2.25rem', color: 'var(--color-ivory)', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {pkg.price}
                  <span className="text-base font-normal opacity-50">/mo</span>
                </p>
                <p
                  className="mt-1 text-sm"
                  style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
                >
                  {pkg.tagline}
                </p>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                      <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CTAButton
                  href="/audit"
                  label="Get Started"
                  variant={pkg.popular ? 'primary' : 'secondary'}
                  className="w-full justify-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
