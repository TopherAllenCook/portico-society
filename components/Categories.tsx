import RevealOnScroll from './RevealOnScroll'

const categories = [
  {
    index: '01',
    name: 'Longevity Medicine',
    description:
      'Hormone optimization, cellular health, metabolic reset, and biological age reversal. This patient has done extensive research and arrives with sophisticated questions. They want a practice that speaks their language without overselling.',
    signals: ['Biological age testing', 'IV therapy', 'Peptide protocols', 'Metabolic optimization'],
  },
  {
    index: '02',
    name: 'Concierge Medicine',
    description:
      'Direct primary care, membership medicine, and executive health programs. The patient is converting from traditional insurance-based care and is evaluating whether the relationship is worth the annual investment. Trust and access are the offer.',
    signals: ['Direct primary care', 'Membership medicine', 'Executive physicals', 'Chronic condition management'],
  },
  {
    index: '03',
    name: 'Aesthetic Medicine',
    description:
      'Non-surgical facial rejuvenation, body contouring, and skin health. The patient is discerning about provider credentials and outcome quality. They are not shopping for the lowest price; they are shopping for the most trustworthy result.',
    signals: ['Injectables', 'Body sculpting', 'Skin rejuvenation', 'Non-surgical facial'],
  },
]

export default function Categories() {
  return (
    <section
      id="categories"
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="Specialties we serve"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-4">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(14% 0.006 30 / 0.4)' }}
            >
              Specialties
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
              aria-hidden="true"
            />
          </div>
          <p
            className="font-display italic font-normal mb-16"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              color: 'oklch(14% 0.006 30 / 0.5)',
            }}
          >
            Three categories. No exceptions.
          </p>
        </RevealOnScroll>

        <div className="space-y-0">
          {categories.map(({ index, name, description, signals }, i) => (
            <RevealOnScroll key={index} delay={i * 100}>
              <div
                className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[5rem_1fr_1fr] lg:gap-16"
                style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              >
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em]"
                  style={{ color: 'var(--color-cinnabar)' }}
                >
                  {index}
                </p>
                <div>
                  <h2
                    className="font-display font-normal leading-snug mb-5"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', color: 'var(--color-ink)' }}
                  >
                    {name}
                  </h2>
                  <p
                    className="font-body font-light leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: 'oklch(14% 0.006 30 / 0.6)' }}
                  >
                    {description}
                  </p>
                </div>
                <div>
                  <p
                    className="font-mono text-xs font-medium tracking-[0.12em] uppercase mb-4"
                    style={{ color: 'oklch(14% 0.006 30 / 0.35)' }}
                  >
                    Common signals
                  </p>
                  <ul className="space-y-2">
                    {signals.map(signal => (
                      <li
                        key={signal}
                        className="font-body text-sm font-light"
                        style={{ color: 'oklch(14% 0.006 30 / 0.55)' }}
                      >
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}
