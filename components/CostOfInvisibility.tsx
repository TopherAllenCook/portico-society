import AnimatedStat from './AnimatedStat'
import RevealOnScroll from './RevealOnScroll'

const Divider = () => (
  <div style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }} aria-hidden="true" />
)

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

        {/* Evidence block */}
        <div className="mt-20">
          <Divider />

          {/* Row 1 — ~40% */}
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-20">
              <p
                className="font-display font-normal leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', color: 'var(--color-cinnabar)', letterSpacing: '-0.03em' }}
                aria-hidden="true"
              >
                <AnimatedStat value={40} prefix="~" suffix="%" duration={1400} />
              </p>
              <span className="sr-only">~40%</span>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '48ch' }}
              >
                of high-value patients now use AI assistants as their first step when choosing
                a specialist. These are the new front desks — and they surface three practices
                per specialty, per city, per search.
              </p>
            </div>
          </RevealOnScroll>

          <Divider />

          {/* Row 2 — ~70% */}
          <RevealOnScroll delay={60}>
            <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-20">
              <p
                className="font-display font-normal leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', color: 'var(--color-cinnabar)', letterSpacing: '-0.03em' }}
                aria-hidden="true"
              >
                <AnimatedStat value={70} prefix="~" suffix="%" duration={1400} />
              </p>
              <span className="sr-only">~70%</span>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '48ch' }}
              >
                of AI-generated recommendations go to the same three practices per specialty
                and city. The concentration rewards authority signals that most practices
                have not yet built.
              </p>
            </div>
          </RevealOnScroll>

          <Divider />

          {/* Row 3 — Confrontation, no number */}
          <RevealOnScroll delay={120}>
            <div className="py-10">
              <p
                className="font-display italic font-normal"
                style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)',
                  lineHeight: 1.4,
                  color: 'var(--color-ink)',
                  maxWidth: '52ch',
                }}
              >
                Three of your competitors already appear in those results.
                Your practice does not.
              </p>
            </div>
          </RevealOnScroll>

          <Divider />
        </div>

        {/* Closing verdict */}
        <RevealOnScroll>
          <p
            className="font-display italic font-normal mt-14"
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              color: 'var(--color-body-text)',
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
