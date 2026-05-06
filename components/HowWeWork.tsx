import RevealOnScroll from './RevealOnScroll'

const phases = [
  {
    step: 'The Audit',
    body: 'Before any engagement, we run your AI visibility audit. We map where your practice appears in AI-generated recommendations, where competitors outrank you, and what is preventing you from appearing at the top. You receive a specific report with prioritized findings, not a slide deck of generic recommendations.',
  },
  {
    step: 'The Strategy',
    body: 'If the audit reveals a fit, we define an engagement scope specific to your practice. Not a package. Not a template. The strategy is built around your situation: your competitive landscape, your patient profile, your growth timeline.',
  },
  {
    step: 'The Build',
    body: 'We execute against a defined plan with defined milestones. AI search authority takes 60 to 90 days to establish. Patient inquiry architecture can be redesigned in the first 30. Reporting is delivered monthly in business terms: inquiries, conversion rate, patient acquisition cost, revenue impact.',
  },
  {
    step: 'The Compound',
    body: 'AI authority compounds. A practice that appears consistently in AI recommendations over 6 months becomes the default answer. The patients who find you this way are the highest-intent, highest-value patients in your market.',
  },
]

export default function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-label="How we work"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(14% 0.006 30 / 0.7)' }}
            >
              How We Work
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.15)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <div className="space-y-0">
          {phases.map(({ step, body }, i) => (
            <RevealOnScroll key={step} delay={i * 100}>
              <div
                className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[14rem_1fr] lg:gap-16"
                style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.12)' }}
              >
                <h3
                  className="font-display font-normal leading-snug"
                  style={{ fontSize: 'clamp(1.125rem, 1.75vw, 1.375rem)', color: 'var(--color-ink)' }}
                >
                  {step}
                </h3>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'oklch(14% 0.006 30 / 0.6)', maxWidth: '54ch' }}
                >
                  {body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}
