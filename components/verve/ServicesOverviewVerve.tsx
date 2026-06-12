import Link from 'next/link'
import CTAButton from './CTAButton'

const SERVICES = [
  {
    label: 'Found',
    sub: 'AI + search visibility',
    description:
      'When a homeowner with a burst pipe asks ChatGPT or Perplexity who the best plumber near them is, the AI names two or three companies. If you are not one of them, you were never in the running. We build the authority signals, reviews, schema, and content that get your business named.',
  },
  {
    label: 'Captured',
    sub: 'Site + lead conversion',
    description:
      'Your website should work like your best salesperson, not your brochure. A brochure describes you. A salesperson asks for the job. We build sites that load fast, answer the obvious questions, and make booking an estimate take ten seconds. Every page is designed to convert, not just look good.',
  },
  {
    label: 'Answered',
    sub: '24/7 lead response',
    description:
      'A missed call is not a missed call. It is a job that called your competitor next. We set up AI call agents, SMS follow-up, and automated booking so every lead gets a response in under a minute, around the clock. Your crews stay focused on the work. Nothing slips.',
  },
]

export default function ServicesOverviewVerve() {
  return (
    <section
      id="services"
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 max-w-2xl">
          <p
            className="mb-3 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          >
            What we do
          </p>
          <h2
            id="services-heading"
            className="font-display font-semibold"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Three things decide whether your business grows online. We install all three.
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
          {SERVICES.map((svc, i) => (
            <article
              key={svc.label}
              className="grid gap-6 py-12 lg:grid-cols-[64px_1fr] lg:gap-10"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <p
                className="hidden font-display font-bold leading-none lg:block"
                style={{
                  fontSize: '3.5rem',
                  color: 'var(--color-ink-faint)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </p>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className="font-display font-semibold"
                    style={{ fontSize: '1.3rem', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}
                  >
                    {svc.label}
                  </h3>
                  <span
                    className="text-[0.65rem] font-medium uppercase tracking-[0.14em]"
                    style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
                  >
                    {svc.sub}
                  </span>
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
                >
                  {svc.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CTAButton href="/audit" label="Get your free audit" variant="primary" />
          <Link
            href="/pricing"
            className="text-sm font-medium underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cinnabar)] rounded-sm"
            style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
          >
            See pricing →
          </Link>
        </div>
      </div>
    </section>
  )
}
