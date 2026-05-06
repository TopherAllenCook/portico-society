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
      <div className="mx-auto max-w-5xl">

        <h2 className="sr-only">The cost of AI invisibility</h2>

        {/* Eyebrow */}
        <RevealOnScroll>
          <p
            className="font-mono mb-10 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'oklch(97% 0.008 75 / 0.4)' }}
          >
            The New Referral Engine
          </p>
        </RevealOnScroll>

        {/* AI tool names — cinnabar display */}
        <RevealOnScroll>
          <p
            className="font-display italic font-normal leading-tight"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.25rem)',
              color: 'var(--color-cinnabar)',
              letterSpacing: '-0.02em',
            }}
          >
            ChatGPT. Perplexity.<br />
            Google AI. Gemini. Siri.
          </p>
        </RevealOnScroll>

        {/* Sub-statement */}
        <RevealOnScroll delay={80}>
          <p
            className="font-body font-light leading-relaxed mt-8"
            style={{
              fontSize: 'clamp(1rem, 1.75vw, 1.25rem)',
              color: 'oklch(97% 0.008 75 / 0.6)',
              maxWidth: '52ch',
            }}
          >
            These are the new front desks. Each one surfaces three practices per specialty,
            per city, per search. Right now, your competitors are in those three. You are not.
          </p>
        </RevealOnScroll>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-1 gap-px lg:grid-cols-3"
          style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.08)' }}
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
                    color: 'oklch(97% 0.008 75 / 0.55)',
                    maxWidth: '34ch',
                  }}
                >
                  {label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Closing */}
        <RevealOnScroll>
          <p
            className="font-display italic font-normal mt-20"
            style={{
              fontSize: 'clamp(1rem, 1.75vw, 1.375rem)',
              color: 'oklch(97% 0.008 75 / 0.4)',
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
