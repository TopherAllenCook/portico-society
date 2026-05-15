import { CORE_PACKAGES } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function PricingPackagesVerve() {
  return (
    <section
      className="px-6 py-20 lg:px-16 lg:py-28"
      style={{ background: 'var(--color-ink)' }}
      aria-labelledby="pricing-packages-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-3">
          <p
            className="text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
          >
            Core Packages
          </p>
          <h2
            id="pricing-packages-heading"
            className="font-display font-semibold leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-ivory)', letterSpacing: '-0.025em', maxWidth: '28ch' }}
          >
            Three monthly retainers. One starting point.
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
          >
            Every package is built around your practice. Start with the audit. The findings make the right tier obvious.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--color-ivory-subtle)' }}>
          {CORE_PACKAGES.map((pkg, i) => (
            <article
              key={pkg.name}
              className="grid gap-8 py-12 lg:grid-cols-[64px_1.1fr_1.4fr] lg:gap-12"
              style={{ borderBottom: '1px solid var(--color-ivory-subtle)' }}
            >
              <p
                className="hidden font-display font-bold leading-none lg:block"
                style={{
                  fontSize: '3.5rem',
                  color: pkg.popular ? 'var(--color-cinnabar-on-dark)' : 'var(--color-ivory-muted)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  opacity: pkg.popular ? 0.7 : 0.45,
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </p>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className="font-display font-semibold"
                    style={{ fontSize: '1.5rem', color: 'var(--color-ivory)', letterSpacing: '-0.02em' }}
                  >
                    {pkg.name}
                  </h3>
                  {pkg.popular && (
                    <span
                      className="text-[0.65rem] font-medium uppercase tracking-[0.14em]"
                      style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
                    >
                      Most chosen
                    </span>
                  )}
                </div>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)', maxWidth: '40ch' }}
                >
                  {pkg.tagline}
                </p>
                <p
                  className="mt-6 font-display font-bold leading-none"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.035em',
                  }}
                >
                  {pkg.price}
                  <span
                    className="text-base font-normal"
                    style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)', letterSpacing: 0 }}
                  >
                    {' / mo'}
                  </span>
                </p>
                {pkg.valueNote && (
                  <p
                    className="mt-3 text-xs"
                    style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)', maxWidth: '34ch' }}
                  >
                    {pkg.valueNote}
                  </p>
                )}
                <div className="mt-7">
                  <CTAButton
                    href="/audit"
                    label={pkg.popular ? 'Start with this plan' : 'Get started'}
                    variant={pkg.popular ? 'primary' : 'secondary'}
                  />
                </div>
              </div>

              <div>
                <p
                  className="mb-4 text-xs font-medium uppercase tracking-[0.16em]"
                  style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
                >
                  What&rsquo;s included
                </p>
                <ul className="flex flex-col gap-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-px w-3 shrink-0"
                        style={{ background: pkg.popular ? 'var(--color-cinnabar-on-dark)' : 'var(--color-ivory-muted)' }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
