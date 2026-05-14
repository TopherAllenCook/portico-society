import { TESTIMONIALS } from '@/lib/verve/content'

export default function TestimonialsVerve() {
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-stone)' }}
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="testimonials-heading"
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.025em',
          }}
        >
          What clinic owners say.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-xl p-7"
              style={{ background: 'var(--color-ivory)', border: '1px solid var(--color-ink-ghost)' }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-5">
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
                >
                  {t.name}
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
                >
                  {t.title} — {t.clinicType}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
