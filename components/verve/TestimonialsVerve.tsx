import Image from 'next/image'
import { TESTIMONIALS } from '@/lib/verve/content'

const AVATARS = [
  'https://picsum.photos/seed/verve-dr1/96/96',
  'https://picsum.photos/seed/verve-dr2/96/96',
  'https://picsum.photos/seed/verve-dr3/96/96',
]

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

        {/* Featured testimonial — full width, ink surface */}
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
          <footer className="mt-8 flex items-center gap-4">
            <Image
              src={AVATARS[0]}
              alt={featured.name}
              width={48}
              height={48}
              className="rounded-full object-cover shrink-0"
              style={{ opacity: 0.9 }}
            />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
              >
                {featured.name}
              </p>
              <p
                className="mt-0.5 text-xs"
                style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
              >
                {featured.title} — {featured.clinicType}
              </p>
            </div>
            <div
              className="ml-auto hidden h-px flex-1 sm:block"
              style={{ background: 'var(--color-ivory-muted)' }}
            />
          </footer>
        </blockquote>

        {/* Supporting testimonials — ruled rows, sand bg */}
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
              <footer className="mt-5 flex items-center gap-3">
                <Image
                  src={AVATARS[i + 1]}
                  alt={t.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover shrink-0"
                />
                <div>
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
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
