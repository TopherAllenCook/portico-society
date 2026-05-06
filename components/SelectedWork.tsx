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
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(97% 0.008 75 / 0.45)' }}
            >
              Selected Work
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(97% 0.008 75 / 0.12)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-px lg:grid-cols-2" style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.08)' }}>
          {cases.map(({ category, location, statValue, statPrefix, statSuffix, statLabel, detail }, i) => (
            <RevealOnScroll key={category} delay={i * 120}>
              <div
                className="p-10 lg:p-14 flex flex-col"
                style={{ backgroundColor: 'oklch(18% 0.008 30)' }}
              >
                {/* Category + location */}
                <div className="flex items-center gap-3 mb-10">
                  <p
                    className="font-mono text-xs font-medium tracking-[0.12em] uppercase"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    {category}
                  </p>
                  <span
                    className="h-1 w-1 rounded-full"
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

                {/* Big result number */}
                <p
                  className="font-display font-normal leading-none mb-2"
                  style={{ fontSize: 'clamp(4rem, 8vw, 6.5rem)', color: 'var(--color-cinnabar)', letterSpacing: '-0.03em' }}
                >
                  <AnimatedStat value={statValue} prefix={statPrefix} suffix={statSuffix} duration={1200} />
                </p>
                <p
                  className="font-mono text-xs uppercase tracking-[0.14em] mb-8"
                  style={{ color: 'oklch(97% 0.008 75 / 0.45)' }}
                >
                  {statLabel}
                </p>

                {/* Detail */}
                <p
                  className="font-body font-light leading-relaxed mt-auto"
                  style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.55)' }}
                >
                  {detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
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
