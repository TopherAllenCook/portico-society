import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

const categories = [
  {
    name: 'Longevity Medicine',
    description:
      'Hormone optimization, cellular health, metabolic reset, and biological age reversal. This patient has done extensive research and arrives with sophisticated questions. They want a practice that speaks their language without overselling.',
    signals: ['Biological age testing', 'IV therapy', 'Peptide protocols', 'Metabolic optimization'],
    photo: '/longevity-medicine.png',
    photoAlt: 'Longevity medicine consultation and lab environment',
  },
  {
    name: 'Concierge Medicine',
    description:
      'Direct primary care, membership medicine, and executive health programs. The patient is converting from traditional insurance-based care and is evaluating whether the relationship is worth the annual investment. Trust and access are the offer.',
    signals: ['Direct primary care', 'Membership medicine', 'Executive physicals', 'Chronic condition management'],
    photo: '/concierge-medicine.png',
    photoAlt: 'Premium concierge medicine practice environment',
  },
  {
    name: 'Aesthetic Medicine',
    description:
      'Non-surgical facial rejuvenation, body contouring, and skin health. The patient is discerning about provider credentials and outcome quality. They are not shopping for the lowest price; they are shopping for the most trustworthy result.',
    signals: ['Injectables', 'Body sculpting', 'Skin rejuvenation', 'Non-surgical facial'],
    photo: '/aesthetic-medicine.png',
    photoAlt: 'Aesthetic medicine clinic with clean modern interior',
  },
]

export default function Categories() {
  return (
    <section
      id="categories"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-label="Specialties we serve"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <p
            className="font-mono mb-4 text-xs font-medium tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-label-text)' }}
          >
            Specialties
          </p>
          <p
            className="font-display italic font-normal mb-16"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: 'var(--color-label-text)' }}
          >
            Three categories. No exceptions.
          </p>
        </RevealOnScroll>

        <div>
          {categories.map(({ name, description, signals, photo, photoAlt }, i) => {
            const photoLeft = i % 2 === 1
            return (
              <RevealOnScroll key={name} delay={i * 100}>
                <div
                  className={`flex flex-col gap-8 py-12 lg:items-start lg:gap-12 ${photoLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                  style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
                >
                  {/* Content — always the wide block */}
                  <div className="flex-1 min-w-0">
                    <h2
                      className="font-display font-normal leading-snug mb-5"
                      style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', color: 'var(--color-ink)' }}
                    >
                      {name}
                    </h2>
                    <p
                      className="font-body font-light leading-relaxed mb-6"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
                    >
                      {description}
                    </p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-1">
                      {signals.map(signal => (
                        <li
                          key={signal}
                          className="font-mono text-xs uppercase tracking-[0.1em]"
                          style={{ color: 'var(--color-label-text)' }}
                        >
                          {signal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Editorial photo — portrait, full row height, md+ */}
                  <div
                    className="relative hidden overflow-hidden md:block flex-shrink-0 self-stretch"
                    style={{ width: '360px', minHeight: '320px' }}
                  >
                    <Image
                      src={photo}
                      alt={photoAlt}
                      fill
                      sizes="360px"
                      className="object-cover"
                      style={{ filter: 'brightness(0.88) saturate(0.78)' }}
                    />
                  </div>
                </div>
              </RevealOnScroll>
            )
          })}

          <RevealOnScroll delay={categories.length * 100}>
            <div
              style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              aria-hidden="true"
            />
          </RevealOnScroll>
        </div>

      </div>
    </section>
  )
}
