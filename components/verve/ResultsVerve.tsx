import { RESULTS } from '@/lib/verve/content'

export default function ResultsVerve() {
  return (
    <section
      id="results"
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-stone)' }}
      aria-labelledby="results-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="results-heading"
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.025em',
          }}
        >
          {RESULTS.title}
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {RESULTS.items.map((item) => (
            <div
              key={item.metric}
              className="rounded-xl p-8"
              style={{ background: 'var(--color-ivory)', border: '1px solid var(--color-ink-rule)' }}
            >
              <p
                className="font-display font-bold"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--color-cinnabar)', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {item.metric}
              </p>
              <p
                className="mt-2 text-base font-medium"
                style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
              >
                {item.detail}
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              >
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
