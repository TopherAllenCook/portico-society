import CTAButton from './CTAButton'

export default function BottomCTAVerve() {
  return (
    <section
      className="px-6 py-28 lg:px-16 lg:py-36 text-center"
      style={{ background: 'var(--color-cta-surface)' }}
      aria-labelledby="bottom-cta-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="bottom-cta-heading"
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-ivory)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Let&rsquo;s find out exactly what your business is leaving on the table.
        </h2>
        <p
          className="mx-auto mt-6 text-base leading-relaxed"
          style={{ color: 'var(--color-body-text-on-dark)', maxWidth: '44ch', fontFamily: 'var(--font-body)' }}
        >
          Free AEO + marketing audit. No call required. Delivered in 48 hours.
        </p>
        <div className="mt-10 flex justify-center">
          <CTAButton href="/audit" label="Get Your Free AEO + Marketing Audit" variant="primary" />
        </div>
      </div>
    </section>
  )
}
