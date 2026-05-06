import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

const categories = [
  {
    index: '01',
    name: 'Longevity Medicine',
    description:
      'Hormone optimization, cellular health, metabolic reset, and biological age reversal. This patient has done extensive research and arrives with sophisticated questions. They want a practice that speaks their language without overselling.',
    signals: ['Biological age testing', 'IV therapy', 'Peptide protocols', 'Metabolic optimization'],
    photo: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=85&auto=format&fit=crop',
    photoAlt: 'Longevity medicine consultation and lab environment',
  },
  {
    index: '02',
    name: 'Concierge Medicine',
    description:
      'Direct primary care, membership medicine, and executive health programs. The patient is converting from traditional insurance-based care and is evaluating whether the relationship is worth the annual investment. Trust and access are the offer.',
    signals: ['Direct primary care', 'Membership medicine', 'Executive physicals', 'Chronic condition management'],
    photo: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=85&auto=format&fit=crop',
    photoAlt: 'Premium concierge medicine practice environment',
  },
  {
    index: '03',
    name: 'Aesthetic Medicine',
    description:
      'Non-surgical facial rejuvenation, body contouring, and skin health. The patient is discerning about provider credentials and outcome quality. They are not shopping for the lowest price; they are shopping for the most trustworthy result.',
    signals: ['Injectables', 'Body sculpting', 'Skin rejuvenation', 'Non-surgical facial'],
    photo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=85&auto=format&fit=crop',
    photoAlt: 'Aesthetic medicine clinic with clean modern interior',
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
              style={{ color: 'oklch(14% 0.006 30 / 0.7)' }}
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
          {categories.map(({ index, name, description, signals, photo, photoAlt }, i) => (
            <RevealOnScroll key={index} delay={i * 100}>
              <div
                className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[5rem_1fr_220px] lg:gap-12"
                style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
              >
                {/* Index — display scale */}
                <p
                  className="font-display font-normal leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--color-cinnabar)',
                    letterSpacing: '-0.03em',
                  }}
                  aria-hidden="true"
                >
                  {index}
                </p>

                {/* Name + description + signals */}
                <div>
                  <h2
                    className="font-display font-normal leading-snug mb-5"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', color: 'var(--color-ink)' }}
                  >
                    {name}
                  </h2>
                  <p
                    className="font-body font-light leading-relaxed mb-6"
                    style={{ fontSize: '0.9375rem', color: 'oklch(14% 0.006 30 / 0.6)' }}
                  >
                    {description}
                  </p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-1">
                    {signals.map(signal => (
                      <li
                        key={signal}
                        className="font-mono text-xs uppercase tracking-[0.1em]"
                        style={{ color: 'oklch(14% 0.006 30 / 0.35)' }}
                      >
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Editorial photo — desktop only */}
                <div
                  className="relative hidden overflow-hidden lg:block"
                  style={{ height: '240px' }}
                >
                  <Image
                    src={photo}
                    alt={photoAlt}
                    fill
                    sizes="220px"
                    className="object-cover"
                    style={{ filter: 'brightness(0.9) saturate(0.8)' }}
                  />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}
