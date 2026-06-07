import CTAButton from './CTAButton'

export default function AIBottomCTAVerve() {
  return (
    <section
      className="px-6 py-20 lg:px-16 lg:py-28"
      style={{ background: 'var(--color-ink)' }}
      aria-labelledby="ai-cta-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              className="text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
            >
              Ready to automate
            </p>
            <h2
              id="ai-cta-heading"
              className="mt-4 font-display font-semibold leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-ivory)', maxWidth: '26ch' }}
            >
              Put your marketing on autopilot.
            </h2>
            <p
              className="mt-3 text-sm"
              style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)', maxWidth: '46ch' }}
            >
              We audit your current systems, identify which AI tools will move the needle fastest for your business, and have them running in under two weeks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton href="/audit" label="Get your free AI audit" variant="primary" />
            <CTAButton href="/pricing" label="See pricing" variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  )
}
