import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

const platforms = ['ChatGPT', 'Perplexity', 'Google AI Overviews', 'Siri', 'Gemini']

const outcomes = [
  {
    number: '01',
    title: 'AI Search Authority',
    body: 'When a patient asks ChatGPT or Perplexity for the best longevity clinic in your city, three practices get named. One of them should be yours. We build the signals, content authority, and AI-readable structure that gets you into that conversation. It is not SEO as typically practiced.',
  },
  {
    number: '02',
    title: 'AI Receptionist Readiness',
    body: 'The patient who finds you through AI arrives expecting an answer, not a callback form. We design the complete conversion architecture: from the first AI-generated click to a booked consultation.',
  },
  {
    number: '03',
    title: 'Recurring Revenue Growth',
    body: 'The right patient stays. We build the retention and membership frameworks that convert a successful first visit into a multi-year relationship, increasing lifetime value without increasing acquisition cost.',
  },
]

export default function WhatWeEngineer() {
  const [featured, ...rest] = outcomes

  return (
    <section
      id="what-we-engineer"
      className="relative px-6 py-28 lg:px-16 lg:py-44"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="What we engineer"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(97% 0.008 75 / 0.45)' }}
            >
              What We Engineer
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(97% 0.008 75 / 0.12)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        {/* Outcome 01 — featured, full-width with photo */}
        <RevealOnScroll>
          <div
            className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[1fr_260px] lg:gap-16 lg:items-center"
            style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.12)' }}
          >
            <div>
              <span
                className="font-display font-normal leading-none block mb-5 select-none"
                style={{
                  fontSize: 'clamp(5rem, 12vw, 9rem)',
                  color: 'oklch(97% 0.008 75 / 0.055)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                }}
                aria-hidden="true"
              >
                01
              </span>
              <h2
                className="font-display font-normal leading-snug mb-5"
                style={{
                  fontSize: 'clamp(1.875rem, 3.8vw, 3rem)',
                  color: 'var(--color-ivory)',
                  letterSpacing: '-0.025em',
                }}
              >
                {featured.title}
              </h2>
              <p
                className="font-body font-light leading-relaxed mb-10"
                style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.55)', maxWidth: '52ch' }}
              >
                {featured.body}
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label="AI platforms we optimize for"
              >
                {platforms.map(p => (
                  <span
                    key={p}
                    role="listitem"
                    className="font-mono text-xs uppercase tracking-[0.1em] px-3 py-1.5"
                    style={{
                      border: '1px solid oklch(97% 0.008 75 / 0.2)',
                      color: 'oklch(97% 0.008 75 / 0.45)',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="relative hidden overflow-hidden lg:block"
              style={{ height: '380px' }}
              aria-hidden="true"
            >
              <Image
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=85&auto=format&fit=crop"
                alt=""
                fill
                sizes="260px"
                className="object-cover"
                style={{
                  objectPosition: '50% 30%',
                  filter: 'brightness(0.5) saturate(0.45)',
                }}
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Outcomes 02 + 03 — side by side with vertical divider on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]">
          <RevealOnScroll>
            <div
              className="py-12 lg:py-14 lg:pr-12"
              style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.12)' }}
            >
              <span
                className="font-display font-normal leading-none block mb-4 select-none"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: 'oklch(97% 0.008 75 / 0.07)',
                  letterSpacing: '-0.05em',
                }}
                aria-hidden="true"
              >
                {rest[0].number}
              </span>
              <h2
                className="font-display font-normal leading-snug mb-4"
                style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)', color: 'var(--color-ivory)' }}
              >
                {rest[0].title}
              </h2>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.55)', maxWidth: '42ch' }}
              >
                {rest[0].body}
              </p>
            </div>
          </RevealOnScroll>

          <div
            className="hidden lg:block"
            style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.12)' }}
            aria-hidden="true"
          />

          <RevealOnScroll delay={120}>
            <div
              className="py-12 lg:py-14 lg:pl-12"
              style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.12)' }}
            >
              <span
                className="font-display font-normal leading-none block mb-4 select-none"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: 'oklch(97% 0.008 75 / 0.07)',
                  letterSpacing: '-0.05em',
                }}
                aria-hidden="true"
              >
                {rest[1].number}
              </span>
              <h2
                className="font-display font-normal leading-snug mb-4"
                style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)', color: 'var(--color-ivory)' }}
              >
                {rest[1].title}
              </h2>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.55)', maxWidth: '42ch' }}
              >
                {rest[1].body}
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div
            style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.12)' }}
            aria-hidden="true"
          />
        </RevealOnScroll>

      </div>
    </section>
  )
}
