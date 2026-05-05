import RevealOnScroll from './RevealOnScroll'

export default function Manifesto() {
  return (
    <section
      className="flex min-h-[80vh] flex-col items-start justify-center bg-terracotta px-6 py-24 lg:px-16"
      aria-label="Brand manifesto"
    >
      <div className="mx-auto w-full max-w-7xl">
        <RevealOnScroll>
          <p
            className="font-body mb-10 text-xs font-medium tracking-[0.22em] uppercase"
            style={{ color: 'oklch(92% 0.03 40 / 0.55)' }}
          >
            The Portico Principle
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <blockquote>
            <p className="font-display font-normal leading-[0.88] text-parchment">
              <span
                className="block"
                style={{ fontSize: 'clamp(3.75rem, 14vw, 13rem)' }}
              >
                Precision
              </span>
              <span
                className="block font-light"
                style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.875rem)',
                  color: 'oklch(97% 0.006 62 / 0.45)',
                  marginLeft: '0.2em',
                  marginTop: '0.6rem',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.08em',
                }}
              >
                is the new
              </span>
              <span
                className="block"
                style={{ fontSize: 'clamp(3.75rem, 14vw, 13rem)' }}
              >
                luxury.
              </span>
            </p>
          </blockquote>
        </RevealOnScroll>

        <RevealOnScroll delay={240}>
          <p
            className="font-body mt-12 max-w-[56ch] text-base font-light leading-relaxed lg:text-lg"
            style={{ color: 'oklch(97% 0.006 62 / 0.6)' }}
          >
            Luxury brands that grow in the current market understand one thing: attention
            is earned through specificity, not bought through volume. Mass marketing
            is not a luxury strategy. It is a luxury liability.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
