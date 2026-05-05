import RevealOnScroll from './RevealOnScroll'

const BORDER_COLOR = 'oklch(74% 0.006 50)'

const results = [
  {
    sector: 'Luxury Hospitality',
    metric: '312%',
    unit: 'organic traffic growth',
    context:
      'Regional resort group, 8 months. Captured intent from travelers who had never heard of the property.',
  },
  {
    sector: 'Concierge Medicine',
    metric: '4.2×',
    unit: 'increase in qualified inquiries',
    context:
      'Private practice, 6 months. Inquiry quality improved alongside volume; conversion rate held.',
  },
  {
    sector: 'Longevity & Wellness',
    metric: '67%',
    unit: 'reduction in cost per acquisition',
    context:
      'Premium wellness brand across paid channels. Same budget, better placement, sharper targeting.',
  },
]

export default function Results() {
  return (
    <section
      id="results"
      className="bg-stone px-6 py-24 lg:px-16 lg:py-32"
      aria-labelledby="results-heading"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <header className="mb-16 lg:mb-20">
            <p className="font-body mb-4 text-xs font-medium tracking-[0.2em] uppercase text-stone-mid">
              Client Results
            </p>
            <h2
              id="results-heading"
              className="font-display font-normal text-inkwell"
              style={{ fontSize: 'var(--text-headline)' }}
            >
              What precision looks like
              <br />
              in practice.
            </h2>
          </header>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
          {results.map((result, i) => (
            <RevealOnScroll
              key={result.sector}
              delay={i * 110}
              className={[
                'flex flex-col gap-4 border-t py-10 lg:border-t-0 lg:px-10 lg:py-0',
                i > 0 ? 'lg:border-l' : '',
              ].join(' ')}
              style={{ borderColor: BORDER_COLOR }}
            >
              <p className="font-body text-xs font-medium tracking-[0.15em] uppercase text-stone-mid">
                {result.sector}
              </p>

              <span
                className="font-display font-normal leading-none text-terracotta"
                style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
              >
                {result.metric}
              </span>

              <p className="font-body text-sm font-medium uppercase tracking-wide text-inkwell">
                {result.unit}
              </p>

              <p
                className="font-body border-t pt-6 text-sm font-light leading-relaxed"
                style={{
                  color: 'oklch(16% 0.006 35 / 0.6)',
                  borderColor: BORDER_COLOR,
                }}
              >
                {result.context}
              </p>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <p
            className="font-body mt-12 text-xs font-light"
            style={{ color: 'oklch(16% 0.006 35 / 0.4)' }}
          >
            Results are representative of client outcomes. Individual results vary by brand,
            competitive landscape, and engagement scope.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
