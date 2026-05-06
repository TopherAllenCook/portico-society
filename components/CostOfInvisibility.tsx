import RevealOnScroll from './RevealOnScroll'

const stats = [
  {
    figure: '~40%',
    label: 'of high net worth patients now use AI assistants as their first step when choosing a specialist.',
  },
  {
    figure: '~70%',
    label: 'of AI-generated recommendations go to the same three practices in any given specialty and city.',
  },
  {
    figure: '3',
    label: 'is the typical number of competitors already appearing where your practice is not.',
  },
]

export default function CostOfInvisibility() {
  return (
    <section
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="The cost of AI invisibility"
    >
      <div className="mx-auto max-w-5xl">

        {/* Opening statement */}
        <RevealOnScroll>
          <p
            className="font-display italic font-normal leading-snug"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
              color: 'oklch(14% 0.006 30 / 0.75)',
              maxWidth: '28ch',
            }}
          >
            Patients ask ChatGPT. Members ask Perplexity. Referrers ask Gemini.
          </p>
        </RevealOnScroll>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-px lg:grid-cols-3">
          {stats.map(({ figure, label }, i) => (
            <RevealOnScroll key={i} delay={i * 80}>
              <div
                className="pt-10 pr-0 lg:pr-12"
                style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              >
                <p
                  className="font-display font-normal leading-none"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    color: 'var(--color-cinnabar)',
                  }}
                  aria-label={figure}
                >
                  {figure}
                </p>
                <p
                  className="font-body mt-5 font-light leading-relaxed"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'oklch(14% 0.006 30 / 0.6)',
                    maxWidth: '34ch',
                  }}
                >
                  {label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Closing statement */}
        <RevealOnScroll>
          <p
            className="font-display italic font-normal mt-20"
            style={{
              fontSize: 'clamp(1rem, 1.75vw, 1.375rem)',
              color: 'oklch(14% 0.006 30 / 0.45)',
              maxWidth: '52ch',
            }}
          >
            This is not a future risk. It is the current state. The window to establish authority in
            AI search is narrowing.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
