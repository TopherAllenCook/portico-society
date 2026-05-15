export default function PricingHeroVerve() {
  return (
    <section
      className="px-6 pb-16 pt-36 lg:px-16 lg:pt-44"
      style={{ background: 'var(--color-ink)' }}
      aria-labelledby="pricing-hero-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h1
          id="pricing-hero-heading"
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-ivory)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
          }}
        >
          Straightforward pricing.
          <br />
          <span style={{ color: 'var(--color-cinnabar-on-dark)' }}>No surprises.</span>
        </h1>
        <p
          className="mt-6 text-lg"
          style={{ color: 'var(--color-body-text-on-dark)', maxWidth: '48ch', fontFamily: 'var(--font-body)' }}
        >
          Every package includes clinic-specific strategy: no generic marketing playbooks.
        </p>
      </div>
    </section>
  )
}
