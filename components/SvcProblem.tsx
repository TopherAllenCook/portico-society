import Link from 'next/link'
import AnimatedStat from './AnimatedStat'
import RevealOnScroll from './RevealOnScroll'

const stats = [
  {
    value: 40,
    prefix: '~',
    suffix: '%',
    label: 'of high-value patients use AI assistants as their first step when choosing a specialist.',
  },
  {
    value: 70,
    prefix: '~',
    suffix: '%',
    label: 'of AI recommendations go to the same three practices per specialty and city.',
  },
  {
    value: 3,
    prefix: '',
    suffix: '',
    label: 'competitors are already in those results. Your practice is not among them.',
  },
]

export default function SvcProblem() {
  return (
    <section
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-label="The cost of AI invisibility"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">The cost of AI invisibility</h2>

        <RevealOnScroll>
          <p
            className="font-mono mb-10 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-label-text)' }}
          >
            The New Referral Engine
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <p
            className="font-display italic font-normal"
            style={{
              fontSize: 'clamp(1.5rem, 6.5vw, 6rem)',
              lineHeight: 1.02,
              color: 'var(--color-cinnabar)',
              letterSpacing: '-0.025em',
            }}
          >
            ChatGPT. Perplexity.<br />
            Google AI. Gemini.
          </p>
        </RevealOnScroll>

        <div
          className="mt-20 grid grid-cols-1 gap-px lg:grid-cols-3"
          style={{ backgroundColor: 'var(--color-ink-rule)' }}
        >
          {stats.map(({ value, prefix, suffix, label }, i) => (
            <RevealOnScroll key={i} delay={i * 80}>
              <div
                className={`py-10 lg:py-12 lg:pr-10${i > 0 ? ' lg:pl-10' : ''}`}
                style={{ backgroundColor: 'var(--color-stone)' }}
              >
                <p
                  className="font-display font-normal leading-none"
                  style={{
                    fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                    color: 'var(--color-cinnabar)',
                    letterSpacing: '-0.03em',
                  }}
                  aria-hidden="true"
                >
                  <AnimatedStat value={value} prefix={prefix} suffix={suffix} duration={1400} />
                </p>
                <span className="sr-only">{prefix}{value}{suffix}</span>
                <p
                  className="font-body font-light leading-relaxed mt-5"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
                >
                  {label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <p
            className="font-display italic font-normal mt-14"
            style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)',
              lineHeight: 1.4,
              color: 'var(--color-ink)',
              maxWidth: '52ch',
            }}
          >
            This is not a future risk. It is the current state. The window to establish
            authority in AI search is narrowing.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div
            className="mt-14 pt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: '1px solid var(--color-ink-rule)' }}
          >
            <p
              className="font-body font-light"
              style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
            >
              Verve Engagement from{' '}
              <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>$4,500 / mo.</span>
              {' '}Both paths begin with a free audit.
            </p>
            <Link
              href="#begin"
              className="font-mono inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase transition-opacity duration-200 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex-shrink-0"
              style={{ color: 'var(--color-cinnabar)', outlineColor: 'var(--color-cinnabar)' }}
            >
              Request the free audit
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
