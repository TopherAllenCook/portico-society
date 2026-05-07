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
      className="relative px-6 py-28 lg:px-16 lg:py-44"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="What we engineer"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
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

        <div>
          {outcomes.map(({ number, title, body }, i) => (
            <RevealOnScroll key={number} delay={i * 100}>
              <div
                className="relative overflow-hidden grid grid-cols-1 gap-8 py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
                style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              >
                {/* Watermark number — texture, not navigation */}
                <span
                  className="absolute right-0 bottom-0 font-display font-normal leading-none pointer-events-none select-none"
                  style={{
                    fontSize: 'clamp(8rem, 18vw, 16rem)',
                    color: 'var(--color-ink)',
                    opacity: 0.055,
                    letterSpacing: '-0.05em',
                    lineHeight: 0.82,
                  }}
                  aria-hidden="true"
                >
                  {number}
                </span>

                <h2
                  className="font-display font-normal leading-snug"
                  style={{ fontSize: 'clamp(1.625rem, 3vw, 2.5rem)', color: 'var(--color-ink)' }}
                >
                  {title}
                </h2>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '48ch' }}
                >
                  {body}
                </p>
              </div>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={outcomes.length * 100}>
            <div
              style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              aria-hidden="true"
            />
          </RevealOnScroll>
        </div>

      </div>
    </section>
  )
}
