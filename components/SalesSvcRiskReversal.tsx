import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const auditItems = [
  {
    label: 'AI Search Visibility',
    desc: 'Which platforms name you and which name your competitors instead.',
  },
  {
    label: 'Competitive Gap Analysis',
    desc: 'Exactly who is appearing instead of you, and why.',
  },
  {
    label: 'Citation & Authority Audit',
    desc: 'Where your authority signals are missing and how recoverable they are.',
  },
  {
    label: 'Prioritized Findings',
    desc: 'Three to five specific actions, ranked by expected impact, with time estimates.',
  },
]

export default function SalesSvcRiskReversal() {
  return (
    <section
      id="free-audit"
      aria-labelledby="risk-reversal-heading"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-cinnabar)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <p
            className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-10"
            style={{ color: 'oklch(97% 0.008 75 / 0.65)' }}
          >
            Start Here
          </p>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="risk-reversal-heading"
            className="font-display italic font-normal leading-tight mb-8"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
              maxWidth: '22ch',
            }}
          >
            Start with the audit. It costs nothing and takes two minutes.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll>
          <p
            className="font-body font-light leading-relaxed mb-16"
            style={{
              fontSize: '1rem',
              color: 'oklch(97% 0.008 75 / 0.8)',
              maxWidth: '52ch',
            }}
          >
            Submit your email and practice website. Within 48 hours, a specific report
            arrives — tied to your practice, not a template. If the audit is the first
            useful thing a marketing vendor has sent you, that&rsquo;s the methodology
            we apply to every engagement.
          </p>
        </RevealOnScroll>

        {/* 2×2 audit items */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 mb-16">
          {auditItems.map((item, i) => (
            <RevealOnScroll key={item.label} delay={i * 60}>
              <div
                className="py-8 pr-8"
                style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.2)' }}
              >
                <p
                  className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-2"
                  style={{ color: 'oklch(97% 0.008 75 / 0.65)' }}
                >
                  0{i + 1}
                </p>
                <p
                  className="font-display font-normal mb-2"
                  style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {item.label}
                </p>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.875rem', color: 'oklch(97% 0.008 75 / 0.75)' }}
                >
                  {item.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Link
              href="#begin"
              className="font-body inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-ivory text-cinnabar hover:bg-stone"
              style={{ outlineColor: 'var(--color-ivory)' }}
            >
              Request my free audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <p
              className="font-mono text-xs font-medium tracking-[0.1em] uppercase"
              style={{ color: 'oklch(97% 0.008 75 / 0.6)' }}
            >
              Delivered in 48 hours &middot; No call required
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
