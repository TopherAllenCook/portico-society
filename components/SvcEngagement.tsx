import RevealOnScroll from './RevealOnScroll'

const phases = [
  {
    number: '01',
    name: 'Foundation',
    weeks: 'Weeks 1–4',
    description:
      'The engagement begins with the full audit your free visibility report previewed. We map the competitive landscape, establish the content architecture, and configure the technical infrastructure. You know exactly where you stand before we build anything.',
    delivered: [
      'Comprehensive AI visibility audit',
      'Competitive positioning map',
      'Content and topic architecture',
      'Technical setup: schema, structured data, llms.txt',
    ],
  },
  {
    number: '02',
    name: 'Build',
    weeks: 'Weeks 5–12',
    description:
      'Systems go live. Answer pages are deployed. AI reception is trained and active on voice and web. Citation building begins. The work is not planned and presented — it is running in your practice.',
    delivered: [
      'Answer pages and FAQ content published',
      'AI receptionist live on phone and web',
      'CRM and calendar integration complete',
      'Citation building underway',
    ],
  },
  {
    number: '03',
    name: 'Optimize',
    weeks: 'Weeks 13–20',
    description:
      'We close visibility gaps that emerged in build. Inquiry quality data informs workflow refinements. Conversion data tells us what to build next. The practice gets sharper each month with real evidence behind every decision.',
    delivered: [
      'Visibility gap analysis and remediation',
      'Inquiry workflow iteration',
      'Content expansion based on search data',
      'Monthly performance report',
    ],
  },
  {
    number: '04',
    name: 'Compound',
    weeks: 'Weeks 21–24',
    description:
      'The foundation compounds. Organic citations grow without additional spend. Inquiry volume becomes measurable and predictable. At week 24, a full data review and renewal recommendation based on the actual trajectory.',
    delivered: [
      'Compound growth review',
      'Organic citation growth report',
      'Inquiry volume and conversion summary',
      'Renewal or continuation recommendation',
    ],
  },
]

export default function SvcEngagement() {
  return (
    <section
      id="inside-engagement"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="engagement-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Inside a Verve Engagement
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
            id="engagement-heading"
            className="font-display italic font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Six months. A practice that&rsquo;s findable,<br className="hidden lg:block" />
            responsive, and growing.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '56ch' }}
          >
            A Verve Engagement is a structured six-month build. Each phase has a defined
            scope and measurable output. There are no open-ended retainers and no months
            spent on deliverables that precede the actual work.
          </p>
        </RevealOnScroll>

        {phases.map((phase, i) => (
          <RevealOnScroll key={phase.number} delay={i * 80}>
            <div
              className="grid grid-cols-1 py-14 gap-10 lg:grid-cols-[12rem_1fr] lg:gap-20"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <div className="flex-shrink-0">
                <span
                  className="font-display italic font-normal select-none block mb-3"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--color-ink-ghost)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.85,
                  }}
                  aria-hidden="true"
                >
                  {phase.number}
                </span>
                <p
                  className="font-display font-normal"
                  style={{ fontSize: '1.125rem', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}
                >
                  {phase.name}
                </p>
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mt-1"
                  style={{ color: 'var(--color-label-text)' }}
                >
                  {phase.weeks}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
                <div className="lg:pr-10">
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '44ch' }}
                  >
                    {phase.description}
                  </p>
                </div>

                <div
                  className="hidden lg:block"
                  style={{ backgroundColor: 'var(--color-ink-faint)' }}
                  aria-hidden="true"
                />

                <div className="lg:pl-10">
                  <p
                    className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-4"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    Delivered
                  </p>
                  <ul className="space-y-2.5">
                    {phase.delivered.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 font-body font-light"
                        style={{ fontSize: '0.9rem', color: 'var(--color-body-text)' }}
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
