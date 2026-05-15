import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const steps = [
  {
    number: '01',
    title: 'Free audit',
    body: 'Within 48 hours you receive a specific report on your AI visibility: which platforms name you, which name your competitors, and three to five actions ranked by expected impact.',
  },
  {
    number: '02',
    title: 'Engagement design',
    body: 'If the audit shows opportunity, we scope an engagement specific to your practice, specialty, and market. The engagement is not a template. It is built around your competitive gap.',
  },
  {
    number: '03',
    title: 'Systems built in sequence',
    body: 'Authority first, then inquiry architecture, then growth foundation. Each system compounds the next. First AI citations typically appear within 60 days of engagement start.',
  },
  {
    number: '04',
    title: 'Quarterly review with principal',
    body: 'Direct access to principal throughout the engagement. Every metric is tied to practice revenue: appointments booked, inquiry quality, patient acquisition cost. Not marketing activity.',
  },
]

export default function SvcProcess() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              How We Work
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="process-heading"
            className="font-display italic font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
              maxWidth: '30ch',
            }}
          >
            What working with Verve looks like.
          </h2>
        </RevealOnScroll>

        <div>
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 60}>
              <div
                className="grid grid-cols-1 lg:grid-cols-[9rem_1fr] lg:gap-16 py-10"
                style={{ borderTop: '1px solid var(--color-ink-rule)' }}
              >
                <p
                  className="font-display font-normal leading-none mb-4 lg:mb-0"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--color-ink-icon)',
                    letterSpacing: '-0.04em',
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </p>
                <div>
                  <p
                    className="font-display font-normal leading-snug mb-3"
                    style={{
                      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '54ch' }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="pt-10" style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
            <Link
              href="#begin"
              className="font-body inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cinnabar text-ivory hover:bg-cinnabar-dark"
              style={{ outlineColor: 'var(--color-cinnabar)' }}
            >
              Start with the free audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
