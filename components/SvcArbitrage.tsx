import RevealOnScroll from './RevealOnScroll'

const services = [
  {
    number: '01',
    title: 'Local Lead Generation',
    who: 'Local service businesses in high-ticket verticals',
    verticals: 'Dental, legal, home services, medical aesthetics, funeral, solar, real estate',
    includes: [
      'Vertical offer design and funnel build',
      'Paid media on Meta, Google, and YouTube',
      'AI-assisted lead qualification',
      'CRM delivery in real time via SMS, email, or API',
      'Weekly performance report',
    ],
    model: 'Per lead or per booked appointment',
    price: 'From $50 to $400 per lead',
  },
  {
    number: '02',
    title: 'SEO + Content Engines',
    who: 'SMBs and B2B brands that want compounding inbound',
    verticals: 'Any vertical where content authority wins acquisition cost over time',
    includes: [
      'Topical map and keyword model',
      'Programmatic page templates',
      'AI-assisted content production at scale',
      'Internal linking and technical SEO',
      'Light digital PR and link building',
    ],
    model: 'Build fee then monthly retainer',
    price: 'From $2,500 build + $1,500/mo',
  },
  {
    number: '03',
    title: 'Local Service Reseller',
    who: 'End consumers and businesses in the chosen vertical',
    verticals: 'Home services, specialty cleaning, photography, field services',
    includes: [
      'Branded booking funnel and local SEO',
      'Paid traffic and review engine',
      'AI-assisted customer service and scheduling',
      'Subcontractor sourcing, vetting, and dispatch',
      'Repeat customer retention flywheel',
    ],
    model: 'Retail to consumer, wholesale to subcontractor',
    price: 'Average ticket $150 to $1,500 depending on vertical',
  },
]

export default function SvcArbitrage() {
  return (
    <section
      id="svc-arbitrage"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-labelledby="arbitrage-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Motion A — Arbitrage
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2
            id="arbitrage-heading"
            className="font-display font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            We carry the risk. You keep the patients.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '56ch' }}
          >
            Arbitrage services are outcome-priced. We invest in the offer, the funnel,
            and the media. You pay when qualified leads arrive or appointments book. No
            long retainers until the unit economics are proven.
          </p>
        </RevealOnScroll>

        {services.map((svc, i) => (
          <RevealOnScroll key={svc.number} delay={i * 80}>
            <div
              className="grid grid-cols-1 gap-8 py-14 lg:grid-cols-[auto_1fr] lg:gap-20 lg:items-start"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <span
                className="font-display font-normal leading-none select-none"
                style={{
                  fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                  color: 'var(--color-ink-ghost)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  minWidth: '3.5rem',
                }}
                aria-hidden="true"
              >
                {svc.number}
              </span>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
                <div className="lg:pr-12">
                  <h3
                    className="font-display font-normal leading-snug mb-3"
                    style={{
                      fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="font-body font-light leading-relaxed mb-6"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '42ch' }}
                  >
                    {svc.who}
                  </p>
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    {svc.verticals}
                  </p>
                </div>

                <div
                  className="hidden lg:block"
                  style={{ backgroundColor: 'var(--color-ink-faint)' }}
                  aria-hidden="true"
                />

                <div className="lg:pl-12">
                  <p
                    className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    What&rsquo;s Included
                  </p>
                  <ul className="space-y-3 mb-8">
                    {svc.includes.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 font-body font-light"
                        style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
                      >
                        <span
                          className="mt-[0.5rem] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--color-cinnabar)' }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.25rem' }}>
                    <p
                      className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
                      style={{ color: 'var(--color-label-text)' }}
                    >
                      {svc.model}
                    </p>
                    <p
                      className="font-body font-light"
                      style={{ fontSize: '0.875rem', color: 'var(--color-cinnabar)' }}
                    >
                      {svc.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}

        <RevealOnScroll>
          <div style={{ borderTop: '1px solid var(--color-ink-rule)' }} aria-hidden="true" />
        </RevealOnScroll>

      </div>
    </section>
  )
}
