import RevealOnScroll from './RevealOnScroll'

const outcomes = [
  {
    number: '01',
    title: 'AI Search Authority',
    context: 'Practices invisible to AI recommendation systems',
    description:
      'When a patient asks ChatGPT which longevity clinic to visit in their city, three practices are named. We make yours one of them. This requires more than content — it requires the citation architecture, structured data, and answer-page depth that AI models pull from when forming a response.',
    includes: [
      'Baseline visibility audit across ChatGPT, Perplexity, Claude, and Google AI Mode',
      'Question and topic map for your specialty and geography',
      'Answer pages built for AI extraction and citation',
      'MedicalBusiness, Physician, and FAQPage schema',
      'Citation building on authoritative health and longevity publications',
      'Monthly report with cited mentions tracked across AI search engines',
    ],
  },
  {
    number: '02',
    title: 'Patient Inquiry Architecture',
    context: 'Practices losing patients between first contact and booked appointment',
    description:
      'Most practices have both a discovery problem and a conversion problem. The right patient finds you and still does not book. We audit and rebuild the full inquiry path — from first click to confirmed appointment — and deploy the automation that closes the gap a human staff cannot cover.',
    includes: [
      'Full inquiry flow audit and redesign',
      'Speed-to-lead automation — first response under two minutes',
      'AI Patient Receptionist — voice agent trained on your practice, qualifies callers, books appointments, routes to humans',
      'CRM setup and lead scoring configured for physician practice inquiries',
      'Post-inquiry nurture sequences until appointment confirms',
    ],
  },
  {
    number: '03',
    title: 'Practice Authority + Content',
    context: 'Practices whose online presence does not reflect the quality of care they deliver',
    description:
      'High net worth patients research before they call. The practice with a physician-attributed body of work on relevant clinical topics earns the inquiry. The one without does not. We build the editorial layer that positions your physician as the authority before a patient ever picks up the phone.',
    includes: [
      'Physician-attributed articles, guides, and clinical FAQs',
      'Answer pages written for AI extraction and topical authority',
      'Specialty landing pages for service and geography combinations',
      'Local SEO and Google Business Profile optimization',
      'Review velocity program — Google, Healthgrades, RealSelf, and Vitals',
      'Digital PR — physician featured in health publications and earned media',
    ],
  },
]

export default function SvcArbitrage() {
  return (
    <section
      id="svc-outcomes"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-labelledby="outcomes-heading"
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
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2
            id="outcomes-heading"
            className="font-display font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Three outcomes. Every engagement covers all of them.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '56ch' }}
          >
            Visibility without conversion is wasted. Conversion without authority does not scale.
            We sequence these three areas deliberately — AI search authority first, then inquiry
            architecture, then the content layer that compounds both.
          </p>
        </RevealOnScroll>

        {outcomes.map((outcome, i) => (
          <RevealOnScroll key={outcome.number} delay={i * 80}>
            <div
              className="grid grid-cols-1 gap-8 py-14 lg:grid-cols-[auto_1fr] lg:gap-20 lg:items-start"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <span
                className="font-display font-normal leading-none select-none"
                style={{
                  fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                  color: 'var(--color-ink-ghost)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  minWidth: '3.5rem',
                }}
                aria-hidden="true"
              >
                {outcome.number}
              </span>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
                <div className="lg:pr-12">
                  <h3
                    className="font-display font-normal leading-snug mb-3"
                    style={{
                      fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {outcome.title}
                  </h3>
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-5"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    {outcome.context}
                  </p>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '42ch' }}
                  >
                    {outcome.description}
                  </p>
                </div>

                <div
                  className="hidden lg:block"
                  style={{ backgroundColor: 'var(--color-ink-faint)' }}
                  aria-hidden="true"
                />

                <div className="lg:pl-12">
                  <p
                    className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    Deliverables
                  </p>
                  <ul className="space-y-3">
                    {outcome.includes.map((item, j) => (
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
