import RevealOnScroll from '@/components/RevealOnScroll'

const results = [
  {
    rank: '01',
    name: 'Meridian Longevity Institute',
    descriptor: 'Hormone optimization · Cellular health · Metabolic reset',
    pct: 84,
    found: true,
  },
  {
    rank: '02',
    name: 'Apex Preventive Medicine',
    descriptor: 'Biological age medicine · Executive health · Peptide therapy',
    pct: 61,
    found: true,
  },
  {
    rank: '03',
    name: 'Your practice',
    descriptor: 'Not found in AI recommendations for this market',
    pct: 0,
    found: false,
  },
]

export default function SearchMockupV2() {
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-label="How AI search surfaces practices"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              What AI search returns today
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          {/* Query row */}
          <div
            className="grid grid-cols-1 gap-3 pb-8 lg:grid-cols-[9rem_1fr]"
            style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
          >
            <p
              className="font-mono text-xs font-medium tracking-[0.14em] uppercase"
              style={{ color: 'var(--color-label-text)', paddingTop: '0.15rem' }}
            >
              Patient query
            </p>
            <p
              className="font-display italic font-normal"
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                color: 'var(--color-ink)',
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
              }}
            >
              &ldquo;What are the best longevity medicine practices in Denver, Colorado?&rdquo;
            </p>
          </div>

          {/* AI response label */}
          <div
            className="grid grid-cols-1 gap-3 py-6 lg:grid-cols-[9rem_1fr]"
            style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
          >
            <p
              className="font-mono text-xs font-medium tracking-[0.14em] uppercase"
              style={{ color: 'var(--color-label-text)', paddingTop: '0.15rem' }}
            >
              AI response
            </p>
            <p
              className="font-body font-light leading-relaxed"
              style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '58ch' }}
            >
              Based on clinical authority and patient recognition, here are the top longevity
              medicine practices serving the Denver area:
            </p>
          </div>

          {/* Result rows */}
          {results.map((r) => (
            <div
              key={r.rank}
              className="grid grid-cols-1 gap-5 py-8 lg:grid-cols-[9rem_1fr] lg:gap-8"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              {/* Rank */}
              <div className="flex items-start gap-4 lg:block">
                <span
                  className="font-display font-normal select-none"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.9,
                    color: r.found ? 'var(--color-ink-ghost)' : 'oklch(14% 0.006 30 / 0.05)',
                  }}
                  aria-hidden="true"
                >
                  {r.rank}
                </span>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p
                      className="font-display font-normal mb-1"
                      style={{
                        fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                        color: r.found ? 'var(--color-ink)' : 'var(--color-label-text)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        opacity: r.found ? 1 : 0.45,
                      }}
                    >
                      {r.name}
                    </p>
                    <p
                      className="font-mono text-xs font-medium tracking-[0.1em]"
                      style={{
                        color: 'var(--color-label-text)',
                        opacity: r.found ? 1 : 0.4,
                      }}
                    >
                      {r.descriptor}
                    </p>
                  </div>
                  <span
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase flex-shrink-0"
                    style={{
                      color: r.found ? 'var(--color-cinnabar)' : 'var(--color-label-text)',
                      opacity: r.found ? 1 : 0.35,
                      marginTop: '0.15rem',
                    }}
                  >
                    {r.found ? 'Cited' : 'Not cited'}
                  </span>
                </div>

                {/* Visibility bar */}
                <div
                  className="h-px overflow-hidden rounded-full"
                  style={{ backgroundColor: 'var(--color-ink-faint)', maxWidth: '28rem' }}
                  role="presentation"
                  aria-hidden="true"
                >
                  {r.found && (
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${r.pct}%`,
                        backgroundColor: 'var(--color-cinnabar)',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </RevealOnScroll>

        <RevealOnScroll>
          <p
            className="font-mono text-xs tracking-[0.1em] mt-6"
            style={{ color: 'var(--color-label-text)', opacity: 0.55 }}
          >
            Illustrative example. Practice names are fictional.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
