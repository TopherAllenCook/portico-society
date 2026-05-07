import AnimatedStat from './AnimatedStat'
import RevealOnScroll from './RevealOnScroll'

const stats = [
  {
    value: 40,
    prefix: '~',
    suffix: '%',
    label: 'of high-value patients now use AI assistants as their first step when choosing a specialist.',
  },
  {
    value: 70,
    prefix: '~',
    suffix: '%',
    label: 'of AI-generated recommendations go to the same three practices in any given specialty and city.',
  },
  {
    value: 3,
    prefix: '',
    suffix: '',
    label: 'competitors are already appearing in AI results where your practice is not.',
  },
]

export default function CostOfInvisibility() {
  return (
    <section
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="The cost of AI invisibility"
    >
      {/* Eyebrow — contained */}
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">The cost of AI invisibility</h2>
        <RevealOnScroll>
          <p
            className="font-mono mb-10 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'oklch(100% 0 0 / 0.4)' }}
          >
            The New Referral Engine
          </p>
        </RevealOnScroll>
      </div>

      {/* Cinnabar headline — escapes container, runs at full section width */}
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

      {/* Sub-statement, stats, closing — contained */}
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll delay={80}>
          <p
            className="font-body font-light leading-relaxed mt-10"
            style={{
              fontSize: 'clamp(1rem, 1.75vw, 1.25rem)',
              color: 'oklch(100% 0 0 / 0.6)',
              maxWidth: '52ch',
            }}
          >
            These are the new front desks. Each one surfaces three practices per specialty,
            per city, per search. Right now, your competitors are in those three. You are not.
          </p>
        </RevealOnScroll>

        <div
          className="mt-20 grid grid-cols-1 gap-px lg:grid-cols-3"
          style={{ backgroundColor: 'oklch(100% 0 0 / 0.08)' }}
        >
          {stats.map(({ value, prefix, suffix, label }, i) => (
            <RevealOnScroll key={i} delay={i * 80}>
              <div
                className="py-10 pr-0 lg:pr-12"
                style={{ backgroundColor: 'var(--color-ink)' }}
              >
                <p
                  className="font-display font-normal leading-none"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--color-cinnabar)' }}
                >
                  <AnimatedStat value={value} prefix={prefix} suffix={suffix} duration={1400} />
                </p>
                <p
                  className="font-body mt-5 font-light leading-relaxed"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'oklch(100% 0 0 / 0.55)',
                    maxWidth: '34ch',
                  }}
                >
                  {label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <p
            className="font-display italic font-normal mt-20"
            style={{
              fontSize: 'clamp(1rem, 1.75vw, 1.375rem)',
              color: 'oklch(100% 0 0 / 0.4)',
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
