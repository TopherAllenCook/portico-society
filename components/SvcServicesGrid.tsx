import RevealOnScroll from './RevealOnScroll'

const services = [
  {
    id: 'aeo-seo',
    index: '01',
    name: 'AI Search Visibility',
    outcome: 'Your practice named by ChatGPT, Perplexity, and Google AI when patients search your specialty.',
    anchor: '#service-aeo',
  },
  {
    id: 'inquiry',
    index: '02',
    name: 'Patient Inquiry Architecture',
    outcome: 'Every inbound inquiry captured, qualified, and converted. Without adding headcount.',
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

        <h2 id="services-grid-heading" className="sr-only">Our services</h2>

        <div>
          {services.map((svc, i) => (
            <RevealOnScroll key={svc.id} delay={i * 55}>
              <a
                href={svc.anchor}
                className="group grid grid-cols-1 lg:grid-cols-[4.5rem_1fr_1.5rem] lg:gap-12 lg:items-start py-10"
                style={{ borderTop: '1px solid var(--color-ink-rule)' }}
              >
                <span
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-3 lg:mb-0 pt-0.5"
                  style={{ color: 'var(--color-label-text)' }}
                  aria-hidden="true"
                >
                  {svc.index}
                </span>
                <div>
                  <h3
                    className="font-display font-normal leading-snug mb-2"
                    style={{
                      fontSize: 'clamp(1.0625rem, 1.75vw, 1.375rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {svc.name}
                  </h3>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '54ch' }}
                  >
                    {svc.outcome}
                  </p>
                </div>
                <span
                  className="hidden lg:block transition-transform duration-300 group-hover:translate-x-1 pt-0.5"
                  style={{ color: 'var(--color-ink-icon)' }}
                  aria-hidden="true"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2.5 7.5h10M8 3.5l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </RevealOnScroll>
          ))}
          <div style={{ borderTop: '1px solid var(--color-ink-rule)' }} aria-hidden="true" />
        </div>

      </div>
    </section>
  )
}
