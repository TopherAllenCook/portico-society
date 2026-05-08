import RevealOnScroll from './RevealOnScroll'

const offerings = [
  {
    number: '01',
    title: 'Workshops and Team Trainings',
    description:
      'Half-day or full-day live training for your team on practical AI use, custom GPTs, prompt patterns, and the specific workflows you should automate first. Virtual or onsite. Customized to your tools and roles.',
    includes: [
      'Pre-workshop diagnostic call',
      'Custom curriculum for your team and tools',
      'Live training with take-home prompt library',
      '30-day follow-up coaching call',
    ],
    price: '$2,500 half-day — $4,500 full day',
  },
  {
    number: '02',
    title: 'Custom AI Playbooks',
    description:
      'We audit your business, identify the top AI leverage points, and deliver a playbook your team can execute without a long retainer. Comes with prompt templates, recommended tools, and a 90-day rollout plan.',
    includes: [
      'Two-hour discovery interview and ops audit',
      'Custom 30 to 50-page playbook',
      'Prompt and SOP library specific to your vertical',
      'Two implementation calls over 60 days',
    ],
    price: '$3,500 to $5,000 flat project fee',
  },
  {
    number: '03',
    title: 'Membership + Cohort',
    description:
      'Monthly playbook drops, prompt and tool library access, a live monthly Q&A, and twice-yearly cohort programs that walk members through building their own AI agents. For operators who want the playbook before the retainer.',
    includes: [
      'Monthly playbook and prompt library drop',
      'Live monthly Q&A with the team',
      'Community access with other operators',
      'Twice-yearly six-week build-along cohort',
    ],
    price: '$97/mo membership — $1,497 cohort',
  },
]

export default function SvcTraining() {
  return (
    <section
      id="svc-training"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="training-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Training + Playbooks
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
            id="training-heading"
            className="font-display font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Learn the playbook before you buy the retainer.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '56ch' }}
          >
            For operators and teams that want to understand AI before outsourcing it.
            Everything here uses the same methodology we deploy for clients. Lower
            price point, faster to value.
          </p>
        </RevealOnScroll>

        {offerings.map((o, i) => (
          <RevealOnScroll key={o.number} delay={i * 80}>
            <div
              className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[auto_1fr] lg:gap-20"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <span
                className="font-display font-normal leading-none select-none"
                style={{
                  fontSize: 'clamp(3rem, 5.5vw, 4.5rem)',
                  color: 'var(--color-ink-ghost)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  minWidth: '3rem',
                }}
                aria-hidden="true"
              >
                {o.number}
              </span>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
                <div>
                  <h3
                    className="font-display font-normal leading-snug mb-4"
                    style={{
                      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {o.title}
                  </h3>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '42ch' }}
                  >
                    {o.description}
                  </p>
                </div>

                <div>
                  <p
                    className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    What&rsquo;s Included
                  </p>
                  <ul className="space-y-3 mb-8">
                    {o.includes.map((item, j) => (
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
                  <p
                    className="font-body font-light"
                    style={{ fontSize: '0.875rem', color: 'var(--color-cinnabar)' }}
                  >
                    {o.price}
                  </p>
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
