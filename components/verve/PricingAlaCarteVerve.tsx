import { ALACARTE } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function PricingAlaCarteVerve() {
  return (
    <section
      className="px-6 py-20 lg:px-16"
      style={{ background: 'var(--color-stone)' }}
      aria-labelledby="alacarte-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="alacarte-heading"
          className="font-display font-semibold"
          style={{ fontSize: '1.5rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
        >
          Need just one thing?
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
        >
          À la carte services — one-time or ongoing, no retainer required.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {ALACARTE.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg px-5 py-4"
              style={{ background: 'var(--color-ivory)', border: '1px solid var(--color-ink-ghost)' }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
              >
                {item.name}
              </span>
              <span
                className="text-sm"
                style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              >
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl p-8 text-center" style={{ background: 'var(--color-ink)' }}>
          <p
            className="text-base font-medium"
            style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
          >
            Not sure which plan fits? Get a free audit and we&rsquo;ll tell you exactly what your clinic needs.
          </p>
          <div className="mt-5 flex justify-center">
            <CTAButton href="/audit" label="Get Free AEO + Marketing Audit" variant="primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
