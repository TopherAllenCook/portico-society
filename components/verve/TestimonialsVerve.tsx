import { TESTIMONIALS } from '@/lib/verve/content'

export default function TestimonialsVerve() {
  const [featured, ...rest] = TESTIMONIALS

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

        {/* Featured testimonial: full width, ink surface */}
        <blockquote
          className="mt-10 rounded-2xl p-10 lg:p-14"
          style={{ background: 'var(--color-ink)' }}
        >
          <p
            className="font-display font-semibold leading-snug"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.02em',
              maxWidth: '52ch',
            }}
          >
            &ldquo;{featured.quote}&rdquo;
          </p>
          <footer className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0"
              style={{ background: 'var(--color-cinnabar-on-dark)' }}
            />
            <p
              className="text-sm font-semibold"
              style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
            >
              {featured.name}
            </p>
            <p
              className="text-xs"
              style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
            >
              {featured.title ? `${featured.title}, ${featured.clinicType}` : featured.clinicType}
            </p>
          </footer>
        </blockquote>

        {/* Supporting testimonials: ruled rows, sand bg */}
        <div
          className="mt-4 grid gap-px md:grid-cols-2"
          style={{ background: 'var(--color-ink-rule)' }}
        >
          {rest.map((t, i) => (
            <blockquote
              key={t.name}
              className="px-8 py-10"
              style={{ background: 'var(--color-sand)' }}
            >
              <p
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                  color: 'var(--color-ink)',
                  opacity: 0.08,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                {String(i + 2).padStart(2, '0')}
              </p>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '44ch' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0"
                  style={{ background: 'var(--color-cinnabar)' }}
                />
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
                >
                  {t.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
                >
                  {t.title}, {t.clinicType}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
