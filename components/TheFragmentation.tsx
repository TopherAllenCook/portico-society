import RevealOnScroll from './RevealOnScroll'

const vendors = [
  'SEO Agency',
  'Paid Ads',
  'Social Media',
  'Email Platform',
  'Booking System',
  'Analytics',
]

const offsets = [0, 4, -3, 6, -2, 3]

export default function TheFragmentation() {
  return (
    <section
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="Why disconnected marketing vendors fail"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">Why It Isn&apos;t Working</h2>

        <RevealOnScroll>
          <p
            className="font-mono mb-10 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-label-text)' }}
          >
            Why It Isn&apos;t Working
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">

          {/* Left: copy */}
          <div>
            <RevealOnScroll>
              <h2
                className="font-display font-normal leading-tight mb-8"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                The average specialty clinic works with six vendors. None of them are connected.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={80}>
              <p
                className="font-body font-light leading-relaxed mb-5"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '48ch' }}
              >
                A separate agency for SEO. Another for paid ads. A social media manager. An email platform. A booking system. An analytics tool. Each one optimized for its own metric, reporting its own numbers, working independently of the others.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={140}>
              <p
                className="font-body font-light leading-relaxed mb-10"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '48ch' }}
              >
                You get six invoices, six reports, and zero clarity on which dollars are producing patients. When results stall, everyone points at someone else.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div
                className="px-5 py-4"
                style={{ border: '1px solid oklch(14% 0.006 30 / 0.12)' }}
              >
                <p
                  className="font-display italic font-normal"
                  style={{
                    fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                    color: 'var(--color-ink)',
                    lineHeight: 1.5,
                  }}
                >
                  Adding a seventh vendor doesn&apos;t fix the architecture. It makes it worse.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: fragmented vendor grid */}
          <RevealOnScroll delay={100}>
            <div className="grid grid-cols-2 gap-3" aria-hidden="true">
              {vendors.map((vendor, i) => (
                <div
                  key={vendor}
                  className="flex items-center gap-3 px-4 py-4"
                  style={{
                    backgroundColor: 'var(--color-stone)',
                    border: '1px solid oklch(14% 0.006 30 / 0.1)',
                    transform: `translateY(${offsets[i]}px)`,
                  }}
                >
                  <span
                    className="font-mono text-xs leading-none flex-shrink-0"
                    style={{ color: 'var(--color-cinnabar)', opacity: 0.5 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-mono text-xs uppercase tracking-[0.08em]"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    {vendor}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  )
}
