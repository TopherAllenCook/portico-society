import RevealOnScroll from './RevealOnScroll'

const addons = [
  {
    number: '01',
    title: 'Paid Patient Acquisition',
    tag: 'Google, Meta, YouTube',
    description:
      'For practices ready to accelerate inquiry volume alongside the authority build. We design, launch, and manage paid campaigns targeting high-intent procedure searches — semaglutide near me, longevity clinic in [city], hormone optimization physician. Paid media compounds the organic work; it does not replace it.',
    includes: [
      'Campaign strategy built around your specific procedures and geography',
      'Google Search campaigns for high-intent terms',
      'Meta campaigns for awareness and retargeting to site visitors',
      'YouTube pre-roll for physician authority and procedure education',
      'Monthly performance report with cost-per-inquiry and conversion tracking',
      'Creative direction and copy — no stock photo doctors',
    ],
    model: 'Add-on to Verve Engagement',
    price: 'Managed media from $3,000 / mo',
  },
  {
    number: '02',
    title: 'AI Patient Receptionist',
    tag: 'Voice + calendar integration',
    description:
      'A voice agent trained on your practice answers every inbound call, qualifies the caller, books appointments, and routes urgent calls to your human staff. Available as a standalone product for practices not yet in a full Verve Engagement. Every missed call becomes a captured lead.',
    includes: [
      'Voice agent with branded persona and custom knowledge base for your practice',
      'Call qualification — procedures offered, insurance, geography, urgency',
      'Calendar booking integration — books directly into your scheduling system',
      'Warm transfer to human staff for complex or urgent calls',
      'Call summaries and CRM logging via email or SMS',
      'Ongoing knowledge base updates as your practice changes',
    ],
    model: 'Setup + monthly',
    price: '$1,500 setup, from $497/mo',
  },
]

export default function SvcTraining() {
  return (
    <section
      id="svc-addons"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="addons-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Add-On Services
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="addons-heading"
            className="font-display font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Optional layers. Significant compounding.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-20"
            style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '56ch' }}
          >
            Both services are available inside a Verve Engagement or as standalone products
            for practices not yet ready for a full engagement. The AI Patient Receptionist
            in particular pays for itself on the first recovered missed call in most practices.
          </p>
        </RevealOnScroll>

        {addons.map((addon, i) => (
          <RevealOnScroll key={addon.number} delay={i * 80}>
            <div
              className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[auto_1fr] lg:gap-20"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <span
                className="font-display font-normal leading-none select-none"
                style={{
                  fontSize: 'clamp(3rem, 5.5vw, 4.5rem)',
                  color: 'var(--color-ink-ghost)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  minWidth: '3rem',
                }}
                aria-hidden="true"
              >
                {addon.number}
              </span>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
                <div className="lg:pr-12">
                  <h3
                    className="font-display font-normal leading-snug mb-2"
                    style={{
                      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {addon.title}
                  </h3>
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-5"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    {addon.tag}
                  </p>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '42ch' }}
                  >
                    {addon.description}
                  </p>
                </div>

                <div
                  className="hidden lg:block"
                  style={{ backgroundColor: 'var(--color-ink-faint)' }}
                  aria-hidden="true"
                />

                <div className="lg:pl-12">
                  <p
                    className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                    style={{ color: 'var(--color-label-text)' }}
                  >
                    What&rsquo;s Included
                  </p>
                  <ul className="space-y-3 mb-8">
                    {addon.includes.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 font-body font-light"
                        style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
                      >
                        <span
                          className="mt-[0.5rem] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--color-cinnabar)' }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.25rem' }}>
                    <p
                      className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
                      style={{ color: 'var(--color-label-text)' }}
                    >
                      {addon.model}
                    </p>
                    <p
                      className="font-body font-light"
                      style={{ fontSize: '0.875rem', color: 'var(--color-cinnabar)' }}
                    >
                      {addon.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}

        <RevealOnScroll>
          <div style={{ borderTop: '1px solid var(--color-ink-rule)' }} aria-hidden="true" />
        </RevealOnScroll>

      </div>
    </section>
  )
}
