import RevealOnScroll from './RevealOnScroll'

const testimonials = [
  {
    quote:
      'We went from invisible to being the first name ChatGPT recommended for longevity clinics in our market. New patient volume tripled within a single quarter.',
    role: 'Medical Director',
    practice: 'Longevity Medicine',
    location: 'New England',
    featured: true,
  },
  {
    quote:
      'The audit alone changed how we understood our competitive position. Two practices were already capturing every AI-generated referral in our city. That gap is closed now.',
    role: 'Practice Founder',
    practice: 'Concierge Medicine',
    location: 'Pacific Northwest',
    featured: false,
  },
  {
    quote:
      'Our membership waitlist did not exist before this engagement. It has 40 names on it now. The right patients find us, and they arrive ready to commit.',
    role: 'Clinical Director',
    practice: 'Aesthetic Medicine',
    location: 'Southeast',
    featured: false,
  },
]

export default function Testimonials() {
  const featured = testimonials.find(t => t.featured)!
  const secondary = testimonials.filter(t => !t.featured)

  return (
    <section
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">From the Practices</h2>

        <RevealOnScroll>
          <p
            className="font-mono mb-12 text-xs font-medium tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-label-text)' }}
          >
            From the Practices
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.35fr_1px_1fr] lg:gap-0 lg:items-start">

          {/* Featured quote */}
          <RevealOnScroll>
            <div
              className="pb-12 lg:pb-0 lg:pr-14"
              style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)', paddingTop: 'clamp(2rem, 4vw, 3rem)' }}
            >
              <blockquote>
                <p
                  className="font-display italic font-normal leading-snug mb-8"
                  style={{
                    fontSize: 'clamp(1.375rem, 2.8vw, 2.125rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.02em',
                    maxWidth: '30ch',
                  }}
                >
                  &ldquo;{featured.quote}&rdquo;
                </p>
                <footer>
                  <p
                    className="font-mono text-xs font-medium uppercase tracking-[0.12em]"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    {featured.role}
                  </p>
                  <p
                    className="font-mono text-xs uppercase tracking-[0.1em] mt-1"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    {featured.practice} · {featured.location}
                  </p>
                </footer>
              </blockquote>
            </div>
          </RevealOnScroll>

          {/* Vertical divider — desktop only */}
          <div
            className="hidden lg:block"
            style={{ backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
            aria-hidden="true"
          />

          {/* Secondary quotes */}
          <div className="flex flex-col lg:pl-14">
            {secondary.map((t, i) => (
              <RevealOnScroll key={i} delay={80 + i * 100}>
                <div
                  className="py-8 lg:py-10"
                  style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
                >
                  <blockquote>
                    <p
                      className="font-body font-light leading-relaxed mb-5"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer>
                      <p
                        className="font-mono text-xs font-medium uppercase tracking-[0.12em]"
                        style={{ color: 'var(--color-cinnabar)' }}
                      >
                        {t.role}
                      </p>
                      <p
                        className="font-mono text-xs uppercase tracking-[0.1em] mt-0.5"
                        style={{ color: 'var(--color-label-text)' }}
                      >
                        {t.practice} · {t.location}
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </RevealOnScroll>
            ))}
            <div
              style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              aria-hidden="true"
            />
          </div>

        </div>

        <RevealOnScroll>
          <p
            className="font-body font-light text-xs mt-10"
            style={{ color: 'oklch(14% 0.006 30 / 0.3)' }}
          >
            Client names withheld by agreement. Full context available during the audit review.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
