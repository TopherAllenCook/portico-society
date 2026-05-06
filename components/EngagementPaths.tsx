'use client'

import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const paths = [
  {
    name: 'Standard Engagement',
    duration: '6 months',
    description:
      'Built for established practices ready to address AI visibility and patient inquiry quality in a structured sequence. Covers AI search authority, inquiry architecture, and the growth foundation that keeps the right patients returning.',
    includes: [
      'AI visibility audit and competitive gap analysis',
      'Search authority build across AI and traditional channels',
      'Patient inquiry capture and qualification redesign',
      'Membership and retention framework',
      'Monthly reporting in business terms, not marketing terms',
    ],
  },
  {
    name: 'Custom Engagement',
    duration: 'Scoped to practice',
    description:
      'For practices with a specific situation: a new location opening, a specialty pivot, a competitive threat, or a growth target with a deadline. Scoped and priced around the actual problem, not a service template.',
    includes: [
      'Situation assessment and strategy session',
      'Engagement scope defined before any commitment',
      'Flexible duration and deliverable structure',
      'Direct access to the team, not an account manager',
    ],
  },
]

export default function EngagementPaths() {
  return (
    <section
      id="engagement"
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-label="Engagement paths"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(14% 0.006 30 / 0.7)' }}
            >
              How to Begin
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.15)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-px lg:grid-cols-2" style={{ backgroundColor: 'oklch(14% 0.006 30 / 0.12)' }}>
          {paths.map(({ name, duration, description, includes }, i) => (
            <RevealOnScroll key={name} delay={i * 120}>
              <div
                className="flex flex-col p-10 lg:p-14"
                style={{ backgroundColor: 'var(--color-stone)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h2
                    className="font-display font-normal leading-snug"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', color: 'var(--color-ink)' }}
                  >
                    {name}
                  </h2>
                  <span
                    className="font-mono text-xs font-medium tracking-[0.1em] whitespace-nowrap mt-1"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    {duration}
                  </span>
                </div>

                <p
                  className="font-body font-light leading-relaxed mb-8"
                  style={{ fontSize: '0.9375rem', color: 'oklch(14% 0.006 30 / 0.65)' }}
                >
                  {description}
                </p>

                <ul className="space-y-3 mt-auto">
                  {includes.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 font-body font-light"
                      style={{ fontSize: '0.875rem', color: 'oklch(14% 0.006 30 / 0.55)' }}
                    >
                      <span
                        className="mt-[0.4rem] h-1 w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-cinnabar)' }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#begin"
              className="font-body inline-block bg-ink px-8 py-4 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200"
              style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-ink)' }}
            >
              Start with the audit
            </Link>
            <p
              className="font-body text-xs font-light"
              style={{ color: 'oklch(14% 0.006 30 / 0.45)' }}
            >
              No call required. We deliver the audit first.
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
