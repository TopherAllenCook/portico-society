import { AI_PACKAGES } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function PricingAIPackagesVerve() {
  return (
    <section
      className="px-6 py-20 lg:px-16"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="ai-packages-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          id="ai-packages-heading"
        >
          AI Packages — Add to any plan, or standalone
        </p>
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
        >
          Each AI package works on its own or stacks on top of any core plan.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {AI_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-xl p-7"
              style={{ background: 'var(--color-stone)', border: '1px solid var(--color-ink-ghost)' }}
            >
              <p
                className="font-display font-medium"
                style={{ fontSize: '1.15rem', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
              >
                {pkg.name}
              </p>
              <p
                className="mt-1 font-display font-bold"
                style={{ fontSize: '1.6rem', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}
              >
                {pkg.price}
                <span className="text-sm font-normal opacity-50">/mo</span>
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
                  >
                    <span style={{ color: 'var(--color-cinnabar)' }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <CTAButton href="/audit" label="Add to plan" variant="ghost" className="text-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
