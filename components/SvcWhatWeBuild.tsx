import RevealOnScroll from './RevealOnScroll'

const pillars = [
  {
    number: '01',
    claim: 'Be the practice AI cites when patients search.',
    title: 'AI Search Authority',
    description:
      'We build the content architecture and authority signals that make your practice the answer AI systems return when a prospective patient searches for a longevity doctor, concierge physician, or aesthetic specialist in your city. This is not traditional SEO.',
    deliverables: [
      'Baseline visibility audit across ChatGPT, Perplexity, Claude, and Google SGE',
      'Question and topic map specific to your specialty and market',
      'Answer pages and FAQ content built for AI extraction',
      'Schema, structured data, and llms.txt configuration',
      'Citation building across authoritative health sources',
      'Monthly visibility report with AI citation tracking',
    ],
  },
  {
    number: '02',
    claim: 'Every patient inquiry captured, qualified, and converted.',
    title: 'Inquiry Architecture',
    description:
      'AI-assisted intake from your website, phone, and SMS. Every inquiry that enters the practice is handled, documented, and followed up. No qualified leads fall through the gap between 5pm Friday and 8am Monday.',
    deliverables: [
      'Branded AI receptionist on voice and web',
      'Calendar integration and appointment booking',
      'Lead qualification logic and call routing rules',
      'CRM logging and call summaries via email or SMS',
      'Monthly inquiry analytics and conversation review',
      'Prompt and knowledge base updates as the practice evolves',
    ],
  },
  {
    number: '03',
    claim: 'Retention, reputation, and referral built into the practice.',
    title: 'Growth Foundation',
    description:
      'We build the systems that turn a strong clinical outcome into a visible and compounding asset: automated reputation capture, post-visit engagement, and the referral mechanics most practices leave to chance.',
    deliverables: [
      'Automated review request and response system',
      'Post-visit patient engagement sequence',
      'Referral program design and tracking setup',
      'Practice-wide reputation monitoring',
    ],
  },
]

export default function SvcWhatWeBuild() {
  return (
    <section
      id="what-we-build"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-labelledby="what-we-build-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              What We Build
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
            id="what-we-build-heading"
            className="font-display font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Three systems. Each one compounding.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '56ch' }}
          >
            Visibility drives inquiry. Inquiry handled well drives retention.
            Retention drives reputation and referral. Every engagement builds
            all three, in sequence, in full.
          </p>
        </RevealOnScroll>

        {pillars.map((p, i) => (
          <RevealOnScroll key={p.number} delay={i * 80}>
            <div
              className="grid grid-cols-1 gap-8 py-14 lg:grid-cols-[auto_1fr] lg:gap-20 lg:items-start"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <span
                className="font-display italic font-normal select-none"
                style={{
                  fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                  color: 'var(--color-ink-ghost)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  minWidth: '3.5rem',
                }}
                aria-hidden="true"
              >
                {p.number}
              </span>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
                <div className="lg:pr-12">
                  <p
                    className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    {p.claim}
                  </p>
                  <h3
                    className="font-display font-normal leading-snug mb-5"
                    style={{
                      fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '42ch' }}
                  >
                    {p.description}
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
                    What&rsquo;s Deployed
                  </p>
                  <ul className="space-y-3">
                    {p.deliverables.map((item, j) => (
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
