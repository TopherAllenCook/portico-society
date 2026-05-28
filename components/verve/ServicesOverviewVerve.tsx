import Link from 'next/link'

const services = [
  {
    number: '01',
    name: 'AI Search Visibility',
    description:
      'When a patient asks ChatGPT or Perplexity for the best longevity clinic in their city, three practices show up. We make sure one of them is yours. AEO, SEO, schema, citations, and content structured for AI extraction.',
  },
  {
    number: '02',
    name: 'Patient Inquiry Capture',
    description:
      'An AI agent on voice, web chat, and messaging that answers, qualifies, and books after hours. Every inquiry that comes in actually converts. No additional staff required.',
  },
]

export default function ServicesOverviewVerve() {
  return (
    <section
      id="services"
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <p
            className="text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          >
            What we do
          </p>
        </div>

        <h2
          id="services-heading"
          className="font-display font-normal leading-snug mb-16"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.025em',
            maxWidth: '28ch',
          }}
        >
          Two things that belong together as a system.
        </h2>

        <div style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
          {services.map((service) => (
            <div
              key={service.name}
              className="grid grid-cols-1 lg:grid-cols-[64px_1fr] lg:gap-16 py-12"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <p
                className="hidden font-display font-bold leading-none lg:block mb-0"
                style={{
                  fontSize: '3.5rem',
                  color: 'var(--color-ink-faint)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {service.number}
              </p>
              <div>
                <h3
                  className="font-display font-normal mb-4"
                  style={{
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-body-text)',
                    maxWidth: '56ch',
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/audit"
            className="font-body inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--color-cinnabar)',
              color: 'var(--color-ivory)',
              outlineColor: 'var(--color-cinnabar)',
            }}
          >
            Find out where your practice stands
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
