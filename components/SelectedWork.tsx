'use client'

import Image from 'next/image'
import AnimatedStat from './AnimatedStat'
import RevealOnScroll from './RevealOnScroll'

const cases = [
  {
    category: 'Longevity Medicine',
    location: 'New England',
    statValue: 31,
    statPrefix: '',
    statSuffix: '×',
    statLabel: 'inquiry volume increase',
    detail:
      'Appeared in ChatGPT recommendations for "longevity clinic" + city within 68 days. Patients arrived having already researched protocols — shorter sales cycle, higher intent.',
    photo: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=85&auto=format&fit=crop',
    photoAlt: 'Longevity medicine consultation environment',
    objectPosition: '60% center',
  },
  {
    category: 'Concierge Medicine',
    location: 'Pacific Northwest',
    statValue: 54,
    statPrefix: '',
    statSuffix: '%',
    statLabel: 'reduction in patient acquisition cost',
    detail:
      'Membership retention increased from 71% to 89% at the 12-month mark. Practice now operates with a waitlist.',
    photo: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=85&auto=format&fit=crop',
    photoAlt: 'Premium concierge medicine practice environment',
    objectPosition: '50% 30%',
  },
]

export default function SelectedWork() {
  return (
    <section
      id="selected-work"
      className="relative px-6 py-16 lg:px-16 lg:py-24"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <h2 className="sr-only">Selected Work</h2>
          <div className="flex items-baseline gap-8 mb-16" aria-hidden="true">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(97% 0.008 75 / 0.45)' }}
            >
              Selected Work
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(97% 0.008 75 / 0.12)' }}
            />
          </div>
        </RevealOnScroll>

        <div>
          {cases.map(({ category, location, statValue, statPrefix, statSuffix, statLabel, detail, photo, photoAlt, objectPosition }, i) => (
            <RevealOnScroll key={category} delay={i * 120}>
              <div
                role="group"
                className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[1fr_300px] lg:items-stretch lg:gap-14"
                style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.12)' }}
                aria-label={`${category}, ${location}`}
              >
                {/* Left: stat + detail */}
                <div className="flex flex-col justify-center">
                  <p
                    className="font-display font-normal leading-none"
                    style={{ fontSize: 'clamp(4.5rem, 10vw, 7rem)', color: 'var(--color-cinnabar)', letterSpacing: '-0.03em' }}
                    aria-hidden="true"
                  >
                    <AnimatedStat value={statValue} prefix={statPrefix} suffix={statSuffix} duration={1200} />
                  </p>
                  <p
                    className="font-mono text-xs uppercase tracking-[0.14em] mt-2 mb-10"
                    style={{ color: 'oklch(97% 0.008 75 / 0.45)' }}
                    aria-hidden="true"
                  >
                    {statLabel}
                  </p>
                  <span className="sr-only">{statPrefix}{statValue}{statSuffix} {statLabel}</span>

                  <div className="flex items-center gap-3 mb-4">
                    <h3
                      className="font-mono text-xs font-medium tracking-[0.12em] uppercase"
                      style={{ color: 'var(--color-cinnabar-on-dark)' }}
                    >
                      {category}
                    </h3>
                    <span
                      className="h-1 w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.2)' }}
                      aria-hidden="true"
                    />
                    <p
                      className="font-mono text-xs tracking-[0.1em]"
                      style={{ color: 'oklch(97% 0.008 75 / 0.3)' }}
                    >
                      {location}
                    </p>
                  </div>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.55)', maxWidth: '48ch' }}
                  >
                    {detail}
                  </p>
                </div>

                {/* Right: editorial portrait photo */}
                <div
                  className="relative hidden overflow-hidden lg:block"
                  style={{ minHeight: '340px' }}
                >
                  <Image
                    src={photo}
                    alt={photoAlt}
                    fill
                    sizes="300px"
                    className="object-cover"
                    style={{
                      objectPosition,
                      filter: 'brightness(0.68) saturate(0.65)',
                    }}
                  />
                </div>
              </div>
            </RevealOnScroll>
          ))}

          <RevealOnScroll>
            <div
              style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.12)' }}
              aria-hidden="true"
            />
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <p
            className="font-body font-light text-xs mt-8"
            style={{ color: 'oklch(97% 0.008 75 / 0.3)' }}
          >
            Client names withheld by agreement. Results available for discussion during the audit review.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
