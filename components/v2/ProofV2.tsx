import RevealOnScroll from '@/components/RevealOnScroll'
import VisibilityBars from '@/components/v2/VisibilityBars'

const stats = [
  {
    value: '3×',
    label: 'Average increase in qualified patient inquiries within six months',
  },
  {
    value: '48h',
    label: 'Audit delivered with findings — before any engagement, no call required',
  },
  {
    value: '$1M+',
    label: 'Minimum annual practice revenue to qualify for a Verve engagement',
  },
]

const quote =
  'Before Verve, patients finding us through AI were rare. Within four months, we were the first name ChatGPT mentioned for longevity medicine in our market. Inquiry quality improved more than volume.'

export default function ProofV2() {
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="Results and testimonial"
    >
      <div className="mx-auto max-w-5xl">

        {/* Testimonial */}
        <RevealOnScroll>
          <figure className="mb-20">
            <blockquote>
              <p
                className="font-display italic font-normal"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 2.25rem)',
                  color: 'var(--color-ink)',
                  lineHeight: '1.45',
                  letterSpacing: '-0.02em',
                  maxWidth: '30ch',
                }}
              >
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span
                style={{ display: 'block', width: '2rem', height: '1px', backgroundColor: 'var(--color-cinnabar)', flexShrink: 0 }}
                aria-hidden="true"
              />
              <div>
                <p
                  className="font-body font-light"
                  style={{ fontSize: '0.875rem', color: 'var(--color-body-text)' }}
                >
                  Medical Director
                </p>
                <p
                  className="font-mono text-xs font-medium uppercase tracking-[0.1em]"
                  style={{ color: 'var(--color-label-text)' }}
                >
                  Longevity Practice, Austin TX
                </p>
              </div>
            </figcaption>
          </figure>
        </RevealOnScroll>

        {/* Stats row */}
        <RevealOnScroll>
          <div
            className="grid grid-cols-1 gap-0 sm:grid-cols-3"
            style={{ borderTop: '1px solid var(--color-ink-rule)' }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="py-10"
                style={{
                  paddingRight: i < 2 ? '2rem' : undefined,
                  paddingLeft: i > 0 ? '2rem' : undefined,
                  borderLeft: i > 0 ? '1px solid var(--color-ink-rule)' : undefined,
                }}
              >
                <p
                  className="font-display font-normal leading-none mb-3"
                  style={{
                    fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                    color: 'var(--color-cinnabar)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="font-body font-light leading-snug"
                  style={{ fontSize: '0.875rem', color: 'var(--color-body-text)', maxWidth: '22ch' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <VisibilityBars />
        </RevealOnScroll>

      </div>
    </section>
  )
}
