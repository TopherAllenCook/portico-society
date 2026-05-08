import Image from 'next/image'
import RevealOnScroll from '@/components/RevealOnScroll'

const specialties = [
  {
    num: '01',
    name: 'Longevity Medicine',
    body: 'Hormone optimization, cellular health, metabolic reset, and biological age medicine. The patient seeking this practice is AI-literate and specific about outcomes.',
    pull: 'Your practice needs to be cited by name, by specialty, in the AI responses patients already trust before they pick up the phone.',
    image: '/longevity-medicine.png',
    imageAlt: 'Longevity medicine consultation — biomarker analysis and cellular health protocols',
  },
  {
    num: '02',
    name: 'Concierge Medicine',
    body: 'Direct primary care, membership medicine, and executive health. Your future members do not search a directory. They ask an assistant.',
    pull: 'We position your practice as the definitive answer for the high-earner who expects a recommendation, not a list.',
    image: '/concierge-medicine.png',
    imageAlt: 'Concierge medicine practice — private executive health membership and direct care',
  },
  {
    num: '03',
    name: 'Aesthetic Medicine',
    body: 'Body sculpting, skin rejuvenation, non-surgical facial, and injectables. Aesthetic patients research extensively, and increasingly that research begins with AI.',
    pull: 'Verve builds the content authority that makes your practice the reference point for aesthetic outcomes in your market.',
    image: '/aesthetic-medicine.png',
    imageAlt: 'Aesthetic medicine practice — skin rejuvenation and non-surgical procedures',
  },
]

export default function ServicesV2() {
  return (
    <section
      id="services"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="Specialties we serve"
    >
      {/* Header */}
      <div className="px-6 pt-24 pb-16 lg:px-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          <RevealOnScroll>
            <div className="flex items-center gap-6">
              <p
                className="font-mono text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-label-text-on-dark)' }}
              >
                Three Specialties
              </p>
              <div
                style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-ivory-subtle)' }}
                aria-hidden="true"
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2
              className="font-display font-normal mt-8"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: 'var(--color-ivory)',
                letterSpacing: '-0.03em',
                lineHeight: '1.05',
                maxWidth: '20ch',
              }}
            >
              One agency. Three disciplines. No templates.
            </h2>
          </RevealOnScroll>
        </div>
      </div>

      {/* Specialty spreads — alternating image / text */}
      {specialties.map((spec, i) => {
        const imageRight = i % 2 === 0
        return (
          <RevealOnScroll key={spec.num}>
            <article
              className="grid grid-cols-1 lg:grid-cols-2"
              style={{ borderTop: '1px solid var(--color-ivory-subtle)' }}
            >
              {/* Image panel */}
              <div
                className={`relative overflow-hidden ${imageRight ? '' : 'lg:order-2'}`}
                style={{ minHeight: 'clamp(16rem, 40vw, 32rem)' }}
              >
                <Image
                  src={spec.image}
                  alt={spec.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: 'brightness(0.72) saturate(0.75)' }}
                />
                {/* Edge fade toward text column */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background: imageRight
                      ? 'linear-gradient(to right, transparent 55%, var(--color-ink) 100%)'
                      : 'linear-gradient(to left, transparent 55%, var(--color-ink) 100%)',
                  }}
                />
              </div>

              {/* Text panel */}
              <div
                className={`flex flex-col justify-center px-6 py-16 lg:py-20 ${imageRight ? 'lg:pl-16 lg:pr-8' : 'lg:pl-8 lg:pr-16 lg:order-1'}`}
              >
                <p
                  className="font-mono mb-5 text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ color: 'var(--color-cinnabar-on-dark)' }}
                >
                  {spec.num}
                </p>
                <h3
                  className="font-display font-normal mb-7"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.025em',
                    lineHeight: '1.1',
                  }}
                >
                  {spec.name}
                </h3>
                <p
                  className="font-body font-light leading-relaxed mb-6"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '46ch' }}
                >
                  {spec.body}
                </p>
                <p
                  className="font-display italic font-normal"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-label-text-on-dark)', maxWidth: '42ch', lineHeight: '1.65' }}
                >
                  {spec.pull}
                </p>
              </div>
            </article>
          </RevealOnScroll>
        )
      })}

      <div style={{ height: '3rem' }} />
    </section>
  )
}
