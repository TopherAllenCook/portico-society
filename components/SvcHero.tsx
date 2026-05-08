import RevealOnScroll from './RevealOnScroll'

export default function SvcHero() {
  return (
    <section
      className="relative px-6 pt-40 pb-28 lg:px-16 lg:pt-52 lg:pb-40"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="Services overview"
    >
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <p
            className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-10"
            style={{ color: 'var(--color-label-text)' }}
          >
            Services
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <h1
            className="font-display italic font-normal leading-none mb-14"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Two motions,<br />one engine.
          </h1>
        </RevealOnScroll>

        <RevealOnScroll>
          <div
            className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1px_1fr]"
            style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '2.5rem' }}
          >
            <div className="pb-10 lg:pb-0 lg:pr-14">
              <p
                className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-5"
                style={{ color: 'var(--color-cinnabar)' }}
              >
                Motion A — Arbitrage
              </p>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '44ch' }}
              >
                We carry the media risk and own the customer outcome. Revenue per lead,
                per booked appointment, or as a share. Higher margin, harder to land,
                stickier once proven.
              </p>
            </div>

            <div
              className="hidden lg:block"
              style={{ backgroundColor: 'var(--color-ink-faint)' }}
              aria-hidden="true"
            />

            <div
              className="pt-10 lg:pt-0 lg:pl-14 border-t lg:border-t-0 [border-top-color:var(--color-ink-faint)]"
            >
              <p
                className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-5"
                style={{ color: 'var(--color-label-text)' }}
              >
                Motion B — Productized AI
              </p>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '44ch' }}
              >
                You carry the retainer. We deliver software plus light services.
                Faster to sell, predictable monthly revenue. The same AI stack we use
                internally, packaged for operators who cannot or will not build it.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
