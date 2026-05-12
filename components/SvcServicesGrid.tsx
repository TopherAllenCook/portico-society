import RevealOnScroll from './RevealOnScroll'

const services = [
  {
    id: 'aeo-seo',
    index: '01',
    name: 'AI Search Authority',
    outcome: 'Your practice named by ChatGPT, Perplexity, and Google AI when patients search your specialty.',
    anchor: '#service-aeo',
  },
  {
    id: 'inquiry',
    index: '02',
    name: 'Patient Inquiry Architecture',
    outcome: 'Every inbound inquiry captured, qualified, and converted — without adding headcount.',
    anchor: '#service-inquiry',
  },
  {
    id: 'reputation',
    index: '03',
    name: 'Reputation and Growth',
    outcome: 'Review volume, citation authority, and referral infrastructure built in parallel with AI visibility.',
    anchor: '#service-reputation',
  },
  {
    id: 'advisory',
    index: '04',
    name: 'Strategic Advisory',
    outcome: 'CMO-level strategy for a new launch, competitive crisis, or multi-location expansion.',
    anchor: '#service-advisory',
  },
]

export default function SvcServicesGrid() {
  return (
    <section
      id="services-grid"
      aria-labelledby="services-grid-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              What We Build
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="services-grid-heading"
            className="font-display italic font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
              maxWidth: '24ch',
            }}
          >
            Four systems. One integrated practice.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--color-ink-rule)' }}>
          {services.map((svc) => (
            <RevealOnScroll key={svc.id}>
              <a
                href={svc.anchor}
                className="group flex flex-col gap-5 p-8 lg:p-10 transition-colors duration-200 bg-stone hover:bg-ivory"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    {svc.index}
                  </span>
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: 'var(--color-ink-icon)' }}
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M8.5 4l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div>
                  <h3
                    className="font-display font-normal leading-snug mb-3"
                    style={{
                      fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {svc.name}
                  </h3>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
                  >
                    {svc.outcome}
                  </p>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}
