import RevealOnScroll from './RevealOnScroll'

const sections = [
  {
    number: '01',
    title: 'AI Search Visibility',
    description:
      'We query ChatGPT, Perplexity, Claude, and Google SGE with the specific questions your prospective patients ask: which longevity clinic to visit, which concierge physician accepts new patients, which aesthetic practice offers a given procedure near them. We record every result. Your practice either appears or it does not.',
  },
  {
    number: '02',
    title: 'Competitive Gap Analysis',
    description:
      'We identify which practices are appearing instead of yours, and why. Authority signals, citation sources, structured data, content architecture. The gap between you and the top three named practices is documented specifically, not summarized in generalities.',
  },
  {
    number: '03',
    title: 'Citation and Authority Audit',
    description:
      'AI systems cite what authoritative sources say about a practice. We audit your presence across the sources that matter: health directories, medical association pages, earned media, review platforms, and structured web data. Gaps here are the most recoverable.',
  },
  {
    number: '04',
    title: 'Prioritized Findings',
    description:
      'The report ends with three to five specific actions, ranked by expected impact, with time estimates for each. Not a general strategy. Not a capabilities deck. If the audit is the first useful thing a marketing vendor has ever sent you, the methodology behind it is what we do for clients.',
  },
]

export default function SvcAuditDetail() {
  return (
    <section
      id="the-audit"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-labelledby="audit-detail-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              The Free AI Visibility Audit
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
            id="audit-detail-heading"
            className="font-display italic font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            What you receive within 48 hours.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '56ch' }}
          >
            The audit requires no discovery call. Submit your email and practice website.
            Within 48 hours, a specific report arrives. Four sections. Every finding
            tied to your practice, not a template.
          </p>
        </RevealOnScroll>

        {sections.map((s, i) => (
          <RevealOnScroll key={s.number} delay={i * 80}>
            <div
              className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[auto_1fr] lg:gap-20 lg:items-start"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <span
                className="font-display italic font-normal select-none"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: 'var(--color-ink-ghost)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  minWidth: '3rem',
                }}
                aria-hidden="true"
              >
                {s.number}
              </span>

              <div>
                <h3
                  className="font-display font-normal leading-snug mb-4"
                  style={{
                    fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '60ch' }}
                >
                  {s.description}
                </p>
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
