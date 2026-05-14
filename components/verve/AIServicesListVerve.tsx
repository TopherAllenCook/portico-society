import { AI_SERVICES } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function AIServicesListVerve() {
  return (
    <section
      id="ai-services"
      className="px-6 py-20 lg:px-16 lg:py-28"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="ai-services-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-2 mb-12">
          <p
            className="text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          >
            AI Systems
          </p>
          <h2
            id="ai-services-heading"
            className="font-display font-semibold leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-ink)', maxWidth: '28ch' }}
          >
            Five systems. One integrated stack.
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
          >
            Each system runs independently or stacked. Add what your clinic needs now, expand as you grow. PPC management is included in Growth and Full Service plans.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
          {AI_SERVICES.map((service, i) => (
            <article
              key={service.id}
              className="grid gap-6 py-10 lg:grid-cols-[64px_1fr_220px]"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <p
                className="hidden font-display font-bold leading-none lg:block"
                style={{
                  fontSize: '3.5rem',
                  color: 'var(--color-ink)',
                  opacity: 0.08,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  paddingTop: '0.1em',
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </p>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className="font-display font-semibold"
                    style={{ fontSize: '1.2rem', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
                  >
                    {service.name}
                  </h3>
                  <span
                    className="text-xs font-medium italic"
                    style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
                  >
                    {service.tagline}
                  </span>
                </div>

                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '56ch' }}
                >
                  {service.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Included features">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: 'var(--color-stone)',
                        color: 'var(--color-body-text)',
                        border: '1px solid var(--color-ink-ghost)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 lg:items-end lg:pt-1">
                <div>
                  <p
                    className="font-display font-bold leading-none"
                    style={{ fontSize: '1.6rem', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}
                  >
                    {service.price}
                  </p>
                  {service.requiresNote ? (
                    <p
                      className="mt-1.5 text-xs leading-snug"
                      style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)', maxWidth: '22ch' }}
                    >
                      {service.requiresNote}
                    </p>
                  ) : (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      billed monthly, cancel anytime
                    </p>
                  )}
                </div>
                <CTAButton href="/audit" label="Get started" variant="ghost" className="w-fit text-sm" />
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-12 flex flex-col gap-6 rounded-xl p-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ background: 'var(--color-stone)', border: '1px solid var(--color-ink-rule)' }}
        >
          <div>
            <p
              className="text-xs font-medium uppercase tracking-[0.16em] mb-2"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              Full AI Stack
            </p>
            <p
              className="font-display font-semibold"
              style={{ fontSize: '1.2rem', color: 'var(--color-ink)' }}
            >
              All five AI systems for{' '}
              <span style={{ color: 'var(--color-cinnabar)' }}>$2,000/mo</span>
            </p>
            <p
              className="mt-1 text-sm"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
            >
              Save $350/mo vs. individual pricing. Setup and onboarding included.
            </p>
          </div>
          <CTAButton href="/audit" label="Get full stack pricing" variant="primary" className="shrink-0" />
        </div>
      </div>
    </section>
  )
}
