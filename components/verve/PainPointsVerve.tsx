import { PAIN_POINTS } from '@/lib/verve/content'

export default function PainPointsVerve() {
  return (
    <section
      id="services"
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

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {PAIN_POINTS.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-8"
              style={{ background: 'var(--color-stone)', border: '1px solid var(--color-ink-ghost)' }}
            >
              <p
                className="font-display font-medium italic"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', color: 'var(--color-ink)', lineHeight: 1.3 }}
              >
                {item.headline}
              </p>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
