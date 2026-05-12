import RevealOnScroll from './RevealOnScroll'

const faqs = [
  {
    q: 'How is this different from traditional SEO?',
    a: 'Traditional SEO optimizes for keyword rankings in Google\'s blue-link results. AI search authority builds the signals that cause AI systems to name your practice when a patient asks a recommendation question in conversational language. The methodology overlaps in places — structured data, local signals, content architecture — but the target is different. You are not trying to rank. You are trying to become the named answer.',
  },
  {
    q: 'We already work with a marketing agency. How is Verve different?',
    a: 'Most agencies serve restaurants, real estate firms, and software companies with the same general playbook. Verve works exclusively with longevity, concierge, and aesthetic medicine practices. The content architecture, citation sources, competitive landscape, and inquiry patterns that matter for your patient population are specific to this category — and that specificity is what determines whether the work actually compounds.',
  },
  {
    q: 'How long before we appear in AI search results?',
    a: 'Most practices see meaningful movement in AI citations within 90 to 120 days. The Foundation and Build phases establish the infrastructure; the Optimize phase closes the gaps that emerge in practice. The free audit will tell you how large your current visibility gap is, which determines how much distance there is to close. Practices with no existing authority signals take longer than those with some foundation already in place.',
  },
  {
    q: 'Our practice is new. Are we a fit?',
    a: 'A new practice is a different engagement than an established one. If you have no existing patients, reviews, or local presence, we would typically recommend starting with the AI Patient Receptionist and Paid Acquisition add-on while the authority foundation builds in parallel. The Strategic Advisory path is often the right entry point for new practices — it is scoped to your specific situation rather than a full six-month build.',
  },
  {
    q: 'What happens after the six-month engagement?',
    a: 'At week 24, you receive a compound growth review: citation growth trajectory, inquiry volume trends, and a specific continuation recommendation based on the actual data. Most practices continue. If you choose not to, all infrastructure, content, and systems remain yours — nothing is hosted or locked on our side.',
  },
  {
    q: 'Do we need to replace our existing website?',
    a: 'No. We build what your practice is missing, not what it already has. If your website is functional and indexed, we work with it. Where there are specific gaps — no schema markup, no answer pages, no FAQ content — we address those directly. We do not propose a full rebuild as a prerequisite to doing the actual work.',
  },
]

export default function SvcFAQ() {
  return (
    <section
      id="faq"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Common Questions
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
            id="faq-heading"
            className="font-display italic font-normal leading-snug mb-20"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            What practices ask before they begin.
          </h2>
        </RevealOnScroll>

        {faqs.map((item, i) => (
          <RevealOnScroll key={i} delay={i * 60}>
            <div
              className="py-12 lg:py-14"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <h3
                className="font-display font-normal leading-snug mb-5"
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {item.q}
              </h3>
              <p
                className="font-body font-light leading-relaxed"
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-body-text)',
                  maxWidth: '64ch',
                }}
              >
                {item.a}
              </p>
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
