import RevealOnScroll from './RevealOnScroll'

const rows = [
  {
    theirs: 'Generic "luxury" positioning applied to any vertical',
    ours: 'Vertical-specific precision: hospitality, medicine, longevity, beauty, events',
  },
  {
    theirs: 'Brand awareness metrics with unclear revenue attribution',
    ours: 'Revenue-correlated KPIs with weekly reporting and plain-language interpretation',
  },
  {
    theirs: 'Manual content creation at slow, human scale',
    ours: 'AI-enhanced content engine deployed inside your marketing stack',
  },
  {
    theirs: 'Same creative direction adapted loosely to each client',
    ours: 'Strategy calibrated to your brand\'s restraint, voice, and competitive landscape',
  },
  {
    theirs: 'Quarterly reviews and monthly check-ins',
    ours: 'Ongoing strategy with weekly execution cadence and daily performance monitoring',
  },
  {
    theirs: 'Long retainer commitments before results are demonstrated',
    ours: 'Society Membership or House Engagement: the audit comes first, commitment follows proof',
  },
]

export default function Comparison() {
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ backgroundColor: 'oklch(16% 0.006 35)' }}
      aria-labelledby="comparison-heading"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <header className="mb-16 lg:mb-20">
            <p
              className="font-body mb-4 text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: 'oklch(92% 0.03 40 / 0.45)' }}
            >
              The Difference
            </p>
            <h2
              id="comparison-heading"
              className="font-display font-normal text-parchment"
              style={{ fontSize: 'var(--text-headline)' }}
            >
              Not all luxury
              <br />
              agencies are equal.
            </h2>
          </header>
        </RevealOnScroll>

        {/* Column labels */}
        <div className="mb-3 grid grid-cols-2 gap-6 lg:gap-24">
          <p
            className="font-body text-xs font-medium tracking-[0.15em] uppercase"
            style={{ color: 'oklch(97% 0.006 62 / 0.22)' }}
          >
            Most agencies
          </p>
          <p
            className="font-body text-xs font-medium tracking-[0.15em] uppercase text-terracotta"
          >
            Portico Society
          </p>
        </div>

        {/* Rows */}
        <div
          className="border-t"
          style={{ borderColor: 'oklch(97% 0.006 62 / 0.08)' }}
        >
          {rows.map((row, i) => (
            <RevealOnScroll key={i} delay={i * 55}>
              <div
                className="grid grid-cols-2 gap-6 border-b py-8 lg:gap-24 lg:py-10"
                style={{ borderColor: 'oklch(97% 0.006 62 / 0.08)' }}
              >
                <p
                  className="font-body text-sm font-light leading-relaxed lg:text-base"
                  style={{ color: 'oklch(97% 0.006 62 / 0.3)' }}
                >
                  {row.theirs}
                </p>
                <p
                  className="font-body text-sm font-light leading-relaxed lg:text-base"
                  style={{ color: 'oklch(97% 0.006 62 / 0.82)' }}
                >
                  {row.ours}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
