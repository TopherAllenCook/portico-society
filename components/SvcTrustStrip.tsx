import RevealOnScroll from './RevealOnScroll'

const stats = [
  { value: '48h', label: 'Audit delivered' },
  { value: '60d', label: 'First AI citations' },
  { value: '3×', label: 'Avg. inquiry lift' },
]

export default function SvcTrustStrip() {
  return (
    <section
      aria-label="Client results"
      className="px-6 py-16 lg:px-16 lg:py-20"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-0 lg:items-center">

            <div className="lg:pr-16">
              <p
                className="font-display italic font-normal leading-snug mb-4"
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  color: 'var(--color-ivory)',
                  letterSpacing: '-0.02em',
                  maxWidth: '34ch',
                }}
              >
                "Within three months, ChatGPT was recommending our longevity practice unprompted. That hadn't happened with any other agency."
              </p>
              <p
                className="font-mono text-xs font-medium tracking-[0.1em] uppercase"
                style={{ color: 'var(--color-label-text-on-dark)' }}
              >
                Longevity physician, California
              </p>
            </div>

            <div
              className="hidden lg:block self-stretch"
              style={{ backgroundColor: 'var(--color-ivory-dim)' }}
              aria-hidden="true"
            />

            <div className="lg:pl-16 flex flex-col gap-8 sm:flex-row sm:gap-0 sm:justify-between lg:flex-col lg:gap-8 lg:justify-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display font-normal leading-none mb-1"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      color: 'var(--color-ivory)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase"
                    style={{ color: 'var(--color-label-text-on-dark)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
