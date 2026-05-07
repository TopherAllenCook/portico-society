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
              style={{ color: 'oklch(100% 0 0 / 0.45)' }}
            >
              Selected Work
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(100% 0 0 / 0.12)' }}
            />
          </div>
        </RevealOnScroll>

        <div>
          {cases.map(({ category, location, statValue, statPrefix, statSuffix, statLabel, detail }, i) => (
            <RevealOnScroll key={category} delay={i * 120}>
              <div
                role="group"
                className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-20"
                style={{ borderTop: '1px solid oklch(100% 0 0 / 0.12)' }}
                aria-label={`${category}, ${location}`}
              >
                {/* Stat — left anchor at document level, no card container */}
                <div>
                  <p
                    className="font-display font-normal leading-none"
                    style={{ fontSize: 'clamp(4.5rem, 10vw, 7rem)', color: 'var(--color-cinnabar)', letterSpacing: '-0.03em' }}
                    aria-hidden="true"
                  >
                    <AnimatedStat value={statValue} prefix={statPrefix} suffix={statSuffix} duration={1200} />
                  </p>
                  <p
                    className="font-mono text-xs uppercase tracking-[0.14em] mt-2"
                    style={{ color: 'oklch(100% 0 0 / 0.45)' }}
                    aria-hidden="true"
                  >
                    {statLabel}
                  </p>
                  <span className="sr-only">{statPrefix}{statValue}{statSuffix} {statLabel}</span>
                </div>

                {/* Right: category + location + detail */}
                <div className="lg:pt-3">
                  <div className="flex items-center gap-3 mb-6">
                    <h3
                      className="font-mono text-xs font-medium tracking-[0.12em] uppercase"
                      style={{ color: 'var(--color-cinnabar-on-dark)' }}
                    >
                      {category}
                    </h3>
                    <span
                      className="h-1 w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'oklch(100% 0 0 / 0.2)' }}
                      aria-hidden="true"
                    />
                    <p
                      className="font-mono text-xs tracking-[0.1em]"
                      style={{ color: 'oklch(100% 0 0 / 0.3)' }}
                    >
                      {location}
                    </p>
                  </div>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'oklch(100% 0 0 / 0.55)', maxWidth: '48ch' }}
                  >
                    {detail}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}

          <RevealOnScroll>
            <div
              style={{ borderTop: '1px solid oklch(100% 0 0 / 0.12)' }}
              aria-hidden="true"
            />
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <p
            className="font-body font-light text-xs mt-8"
            style={{ color: 'oklch(100% 0 0 / 0.3)' }}
          >
            Client names withheld by agreement. Results available for discussion during the audit review.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
