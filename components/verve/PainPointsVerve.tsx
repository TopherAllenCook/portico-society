import { PAIN_POINTS } from '@/lib/verve/content'

export default function PainPointsVerve() {
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="pain-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="pain-heading"
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.025em',
            maxWidth: '28ch',
          }}
        >
          {PAIN_POINTS.title}
        </h2>

        <div
          className="mt-14"
          style={{ borderTop: '1px solid var(--color-ink-rule)' }}
        >
          {PAIN_POINTS.items.map((item, i) => (
            <div
              key={i}
              className="grid gap-6 py-10 sm:grid-cols-[5rem_1fr]"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <p
                className="font-display font-bold tabular-nums leading-none"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  color: 'var(--color-ink-icon)',
                  letterSpacing: '-0.02em',
                  paddingTop: '0.15rem',
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <p
                  className="font-display font-medium italic"
                  style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', color: 'var(--color-ink)', lineHeight: 1.3 }}
                >
                  {item.headline}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
