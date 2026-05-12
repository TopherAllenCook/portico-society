import RevealOnScroll from './RevealOnScroll'

const rows = [
  {
    label: 'Visibility',
    generic: 'SEO blog posts and keywords. Ranks for terms patients do not search.',
    verve: 'AI citation authority across ChatGPT, Perplexity, Google AI, and Gemini: by name, in your specialty, in your city.',
  },
  {
    label: 'Inquiry',
    generic: 'A contact form. An answering service. Leads that fall through on weekends.',
    verve: 'AI intake across voice, web, and SMS. Every inquiry captured, qualified, and followed up — without adding staff.',
  },
  {
    label: 'Performance',
    generic: 'Monthly reports on impressions and clicks. Activity metrics, not outcomes.',
    verve: 'Attribution tied to appointments booked and revenue. You see exactly what is working and what is not.',
  },
  {
    label: 'Strategy',
    generic: 'A template engagement built for every industry. Healthcare is a checkbox.',
    verve: 'One practice. One market. One engagement built around your specialty, your competitive gap, and your growth trajectory.',
  },
]

export default function SvcContrast() {
  return (
    <section
      aria-labelledby="contrast-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text-on-dark)' }}
            >
              The Difference
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ivory-dim)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="contrast-heading"
            className="font-display italic font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
              maxWidth: '28ch',
            }}
          >
            What most agencies do. What Verve builds.
          </h2>
        </RevealOnScroll>

        {/* Column headers */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] mb-2">
            <p
              className="font-mono text-xs font-medium tracking-[0.14em] uppercase pb-4"
              style={{ color: 'oklch(97% 0.008 75 / 0.35)' }}
            >
              The Generic Agency
            </p>
            <div aria-hidden="true" />
            <p
              className="font-mono text-xs font-medium tracking-[0.14em] uppercase pb-4 lg:pl-10"
              style={{ color: 'var(--color-cinnabar-on-dark)' }}
            >
              Verve
            </p>
          </div>
        </RevealOnScroll>

        {rows.map((row, i) => (
          <RevealOnScroll key={row.label} delay={i * 60}>
            <div
              className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]"
              style={{ borderTop: '1px solid var(--color-ivory-subtle)' }}
            >
              {/* Generic */}
              <div className="py-8 lg:pr-10">
                <p
                  className="font-mono text-xs font-medium tracking-[0.12em] uppercase mb-3"
                  style={{ color: 'oklch(97% 0.008 75 / 0.35)' }}
                >
                  {row.label}
                </p>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.4)' }}
                >
                  {row.generic}
                </p>
              </div>

              {/* Hairline */}
              <div
                className="hidden lg:block"
                style={{ backgroundColor: 'var(--color-ivory-subtle)' }}
                aria-hidden="true"
              />

              {/* Verve */}
              <div
                className="py-8 lg:pl-10 border-t lg:border-t-0"
                style={{ borderColor: 'var(--color-ivory-subtle)' }}
              >
                <p
                  className="font-mono text-xs font-medium tracking-[0.12em] uppercase mb-3"
                  style={{ color: 'var(--color-cinnabar-on-dark)' }}
                >
                  {row.label}
                </p>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}
                >
                  {row.verve}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}

      </div>
    </section>
  )
}
