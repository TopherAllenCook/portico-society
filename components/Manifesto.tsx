import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

export default function Manifesto() {
  return (
    <section
      className="relative overflow-hidden bg-terracotta"
      aria-label="Brand manifesto"
    >
      <div className="grid min-h-[80vh] lg:grid-cols-[3fr_2fr]">

        {/* Left: quote + body copy */}
        <div className="flex flex-col items-start justify-center px-6 py-24 lg:px-16">
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
                  style={{ fontSize: 'clamp(3.75rem, 11vw, 10rem)' }}
                >
                  Precision
                </span>
                <span
                  className="block font-light"
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.75rem)',
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
                  style={{ fontSize: 'clamp(3.75rem, 11vw, 10rem)' }}
                >
                  luxury.
                </span>
              </p>
            </blockquote>
          </RevealOnScroll>

          <RevealOnScroll delay={240}>
            <p
              className="font-body mt-12 max-w-[48ch] text-base font-light leading-relaxed lg:text-lg"
              style={{ color: 'oklch(97% 0.006 62 / 0.6)' }}
            >
              Luxury brands that grow in the current market understand one thing: attention
              is earned through specificity, not bought through volume. Mass marketing
              is not a luxury strategy. It is a luxury liability.
            </p>
          </RevealOnScroll>
        </div>

        {/* Right: editorial photo (desktop only) */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe2fa?w=900&q=90&auto=format&fit=crop"
            alt=""
            fill
            sizes="33vw"
            className="object-cover"
            style={{ filter: 'brightness(0.45) saturate(0.6)' }}
          />
          {/* Blend left edge into terracotta */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, oklch(47% 0.135 33) 0%, transparent 40%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
