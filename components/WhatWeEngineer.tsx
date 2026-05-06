import RevealOnScroll from './RevealOnScroll'

const outcomes = [
  {
    number: '01',
    title: 'AI Search Authority',
    body: 'Your practice becomes one of the three that AI recommends when a high net worth patient asks for the best longevity clinic, concierge practice, or aesthetic specialist in your area. This requires a specific methodology. It is not SEO as typically practiced.',
  },
  {
    number: '02',
    title: 'Patient Inquiry Architecture',
    body: 'The patient who finds you through AI arrives with intent. How that inquiry is captured, responded to, and qualified determines whether it converts. We design the full inquiry path: from first contact to booked consultation.',
  },
  {
    number: '03',
    title: 'Recurring Revenue Growth',
    body: 'The right patient stays. We build the retention and membership frameworks that convert a successful first visit into a multi-year relationship, increasing lifetime value without increasing acquisition cost.',
  },
]

export default function WhatWeEngineer() {
  return (
    <section
      id="what-we-engineer"
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="What we engineer"
    >
      <div className="mx-auto max-w-5xl">

        {/* Section header */}
        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(14% 0.006 30 / 0.7)' }}
            >
              What We Engineer
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        {/* Outcomes */}
        <div className="space-y-0">
          {outcomes.map(({ number, title, body }, i) => (
            <RevealOnScroll key={number} delay={i * 100}>
              <div
                className="grid grid-cols-1 gap-6 py-12 lg:grid-cols-[6rem_1fr_1fr] lg:gap-16"
                style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              >
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em]"
                  style={{ color: 'var(--color-cinnabar)' }}
                >
                  {number}
                </p>
                <h2
                  className="font-display font-normal leading-snug"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {title}
                </h2>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{
                    fontSize: '1rem',
                    color: 'oklch(14% 0.006 30 / 0.6)',
                    maxWidth: '48ch',
                  }}
                >
                  {body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}
