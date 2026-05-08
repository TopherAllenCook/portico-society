'use client'

import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const bundles = [
  {
    name: 'Local Growth Stack',
    tag: 'Local SMB owners',
    description:
      'The fastest path from invisible to operational for a local service business. Covers AI-powered phone coverage, web and SMS lead capture, and the content foundation that gets you found in AI search.',
    includes: [
      'AI Receptionist (full build and monthly)',
      'AI Chatbot on site and SMS',
      'AEO Starter retainer',
    ],
    pricing: '$3,500 setup',
    recurring: '$1,997/mo',
  },
  {
    name: 'Vertical Lead Machine',
    tag: 'SMBs ready to scale leads',
    description:
      'For businesses ready to buy qualified leads at scale. We build the vertical funnel, run the media, and deliver booked appointments. Add the AI Receptionist and you close more of what we send.',
    includes: [
      'Lead gen build for one vertical',
      'AI Receptionist for inbound handoff',
      'Weekly lead and conversion report',
    ],
    pricing: '$497/mo platform fee',
    recurring: '+ $50 to $400 per lead',
  },
  {
    name: 'AI Operations Sprint',
    tag: 'B2B and ops-heavy teams',
    description:
      'For businesses with real ops complexity. We map your highest-cost manual workflows, build the automations, train your team, and stay on for 90 days of support. Three workflows, one workshop, one quarter.',
    includes: [
      'Three custom automation builds',
      'Full-day AI workshop for your team',
      '90-day stabilization and maintenance',
    ],
    pricing: '$15,000 project fee',
    recurring: '$1,500/mo after 90 days',
  },
]

export default function SvcBundles() {
  return (
    <section
      id="svc-bundles"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-labelledby="bundles-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Anchor Packages
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
            id="bundles-heading"
            className="font-display font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Three packages. Easier to start.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '56ch' }}
          >
            Pre-packaged combinations of the services above. Setup fees are non-negotiable
            and cover real onboarding cost. Monthly tiers are fixed. Annual prepay
            gets two months free.
          </p>
        </RevealOnScroll>

        {bundles.map((b, i) => (
          <RevealOnScroll key={b.name} delay={i * 80}>
            <div
              className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[1fr_1px_1fr] lg:gap-0"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <div className="pb-10 lg:pb-0 lg:pr-14">
                <p
                  className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-5"
                  style={{ color: 'var(--color-cinnabar)' }}
                >
                  {b.tag}
                </p>
                <h3
                  className="font-display font-normal leading-snug mb-5"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {b.name}
                </h3>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '42ch' }}
                >
                  {b.description}
                </p>
              </div>

              <div
                className="hidden lg:block"
                style={{ backgroundColor: 'var(--color-ink-faint)' }}
                aria-hidden="true"
              />

              <div
                className="pt-10 lg:pt-0 lg:pl-14 border-t lg:border-t-0 [border-top-color:var(--color-ink-faint)]"
              >
                <p
                  className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                  style={{ color: 'var(--color-label-text)' }}
                >
                  What&rsquo;s Included
                </p>
                <ul className="space-y-3 mb-10">
                  {b.includes.map((item, j) => (
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
                <div
                  className="flex items-start justify-between gap-4 mb-8"
                  style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.25rem' }}
                >
                  <div>
                    <p
                      className="font-display font-normal"
                      style={{
                        fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                        color: 'var(--color-ink)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {b.pricing}
                    </p>
                    <p
                      className="font-mono text-xs font-medium tracking-[0.1em] mt-1"
                      style={{ color: 'var(--color-cinnabar)' }}
                    >
                      {b.recurring}
                    </p>
                  </div>
                  <Link
                    href="#begin"
                    className="font-body inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium bg-ink text-ivory hover:bg-cinnabar transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex-shrink-0"
                    style={{ outlineColor: 'var(--color-cinnabar)' }}
                  >
                    Get started
                  </Link>
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
