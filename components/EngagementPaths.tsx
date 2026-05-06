'use client'

import { useState } from 'react'
import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const paths = [
  {
    id: 'standard',
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
    id: 'custom',
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
  const [active, setActive] = useState(0)
  const path = paths[active]

  return (
    <section
      id="engagement"
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="Engagement paths"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-14">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(97% 0.008 75 / 0.45)' }}
            >
              How to Begin
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(97% 0.008 75 / 0.12)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          {/* Tab row */}
          <div
            className="flex gap-0 mb-14"
            style={{ borderBottom: '1px solid oklch(97% 0.008 75 / 0.1)' }}
            role="tablist"
            aria-label="Engagement types"
          >
            {paths.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={active === i}
                aria-controls={`panel-${p.id}`}
                onClick={() => setActive(i)}
                className="relative cursor-pointer pb-5 pr-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              >
                <span
                  className="font-mono text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200"
                  style={{ color: active === i ? 'var(--color-ivory)' : 'oklch(97% 0.008 75 / 0.35)' }}
                >
                  {p.name}
                </span>
                <span
                  className="absolute bottom-0 left-0 block transition-all duration-300"
                  style={{
                    right: '2.5rem',
                    height: '2px',
                    backgroundColor: 'var(--color-cinnabar)',
                    transform: active === i ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            id={`panel-${path.id}`}
            role="tabpanel"
            key={path.id}
            className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24"
            style={{ animation: 'fadein 0.3s ease forwards' }}
          >
            {/* Left: headline + description */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-8">
                <h2
                  className="font-display font-normal leading-snug"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--color-ivory)' }}
                >
                  {path.name}
                </h2>
                <span
                  className="font-mono text-xs font-medium tracking-[0.1em] whitespace-nowrap mt-2 flex-shrink-0"
                  style={{ color: 'var(--color-cinnabar)' }}
                >
                  {path.duration}
                </span>
              </div>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.6)', maxWidth: '52ch' }}
              >
                {path.description}
              </p>
            </div>

            {/* Right: includes list */}
            <div>
              <p
                className="font-mono mb-6 text-xs font-medium tracking-[0.16em] uppercase"
                style={{ color: 'oklch(97% 0.008 75 / 0.3)' }}
              >
                What&rsquo;s Included
              </p>
              <ul className="space-y-4">
                {path.includes.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-4 font-body font-light"
                    style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.6)' }}
                  >
                    <span
                      className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-cinnabar)' }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#begin"
              className="font-body inline-block px-8 py-4 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              style={{ backgroundColor: 'var(--color-cinnabar)', color: 'var(--color-ivory)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(34% 0.08 54)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)' }}
            >
              Start with the audit
            </Link>
            <p
              className="font-body text-xs font-light"
              style={{ color: 'oklch(97% 0.008 75 / 0.4)' }}
            >
              No call required. We deliver the audit first.
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
