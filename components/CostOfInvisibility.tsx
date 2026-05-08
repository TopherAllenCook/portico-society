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

export default function CostOfInvisibility() {
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
            Google AI. Gemini. Siri.
          </p>
        </RevealOnScroll>

        {/* Three stats — horizontal grid, hairline dividers via gap-px */}
        <div
          className="mt-20 grid grid-cols-1 gap-px lg:grid-cols-3"
          style={{ backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
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

        {/* Confrontation — closing editorial punch */}
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

      </div>
    </section>
  )
}
