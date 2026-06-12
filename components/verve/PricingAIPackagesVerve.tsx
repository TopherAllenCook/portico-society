import { AI_SERVICES } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function PricingAIPackagesVerve() {
  return (
    <section
      className="px-6 py-20 lg:px-16"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="ai-automation-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          className="text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          id="ai-automation-heading"
        >
          AI Automation Systems
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
        >
          Add to any marketing plan or use standalone. Each system runs independently. Add what your business needs now, expand as you grow.
        </p>

        <div style={{ borderTop: '1px solid var(--color-ink-rule)', marginTop: '2rem' }}>
          {AI_SERVICES.map((service) => (
            <div
              key={service.id}
              className="grid gap-4 py-7 sm:grid-cols-[1fr_auto]"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p
                    className="font-display font-semibold"
                    style={{ fontSize: '1.05rem', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
                  >
                    {service.name}
                  </p>
                  <span
                    className="text-xs italic"
                    style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
                  >
                    {service.tagline}
                  </span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {service.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
                    >
                      <span aria-hidden="true" style={{ color: 'var(--color-cinnabar)', flexShrink: 0 }}>·</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end sm:pt-1">
                <p
                  className="font-display font-bold leading-none"
                  style={{ fontSize: '1.4rem', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}
                >
                  {service.price}
                </p>
                <CTAButton href="/audit" label="Add to plan" variant="ghost" className="text-xs" />
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 flex flex-col gap-5 rounded-xl p-8 sm:flex-row sm:items-center sm:justify-between"
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
              style={{ fontSize: '1.15rem', color: 'var(--color-ink)' }}
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
          <CTAButton href="/audit" label="Get bundle pricing" variant="primary" className="shrink-0" />
        </div>
      </div>
    </section>
  )
}
