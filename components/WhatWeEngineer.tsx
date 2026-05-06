import RevealOnScroll from './RevealOnScroll'

const outcomes = [
  {
    number: '01',
    title: 'AI Search Authority',
    body: 'When a patient asks ChatGPT or Perplexity for the best longevity clinic in your city, three practices get named. One of them should be yours. We build the signals, content authority, and AI-readable structure that gets you into that conversation. It is not SEO as typically practiced.',
  },
  {
    number: '02',
    title: 'AI Receptionist Readiness',
    body: 'The patient who finds you through AI arrives expecting an answer, not a callback form. An AI-optimized inquiry path captures the appointment before a competitor does. We design the complete conversion architecture: from the first AI-generated click to a booked consultation.',
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
                className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[8rem_1fr_1fr] lg:gap-12"
                style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              >
                {/* Large display number */}
                <p
                  className="font-display font-normal leading-none"
                  style={{
                    fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                    color: 'var(--color-cinnabar)',
                    letterSpacing: '-0.03em',
                  }}
                  aria-hidden="true"
                >
                  {number}
                </p>

                <h2
                  className="font-display font-normal leading-snug"
                  style={{
                    fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
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
