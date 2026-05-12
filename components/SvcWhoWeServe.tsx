import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

const specialties = [
  {
    number: '01',
    name: 'Longevity Medicine',
    image: '/longevity-medicine.png',
    imageAlt: 'Longevity medicine consultation — hormone optimization, cellular health, metabolic reset',
    pull: 'The patient seeking this practice is AI-literate and specific about outcomes. They ask an assistant before they call a clinic.',
  },
  {
    number: '02',
    name: 'Concierge Medicine',
    image: '/concierge-medicine.png',
    imageAlt: 'Concierge medicine practice — direct primary care and executive health membership',
    pull: 'Your future members do not search a directory. They ask an AI which physician to trust with their health.',
  },
  {
    number: '03',
    name: 'Aesthetic Medicine',
    image: '/aesthetic-medicine.png',
    imageAlt: 'Aesthetic medicine — skin rejuvenation, body sculpting, non-surgical procedures',
    pull: 'Aesthetic patients research extensively before they book. Increasingly that research begins and ends with AI.',
  },
]

export default function SvcWhoWeServe() {
  return (
    <section
      id="who-we-serve"
      aria-labelledby="who-we-serve-heading"
      className="relative px-6 py-20 lg:px-16 lg:py-32"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-14">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text-on-dark)' }}
            >
              Three Specialties
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ivory-dim)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="who-we-serve-heading"
            className="font-display font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
            }}
          >
            One agency. Three disciplines.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-14 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {specialties.map((s, i) => (
            <RevealOnScroll key={s.name} delay={i * 100}>
              <div>
                <div
                  className="relative overflow-hidden mb-7"
                  style={{ aspectRatio: '3/4' }}
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 320px"
                    className="object-cover"
                    style={{ filter: 'brightness(0.72) saturate(0.75)' }}
                  />
                </div>
                <p
                  className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-3"
                  style={{ color: 'var(--color-cinnabar-on-dark)' }}
                >
                  {s.number}
                </p>
                <h3
                  className="font-display font-normal mb-4"
                  style={{
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.875rem', color: 'var(--color-body-text-on-dark)' }}
                >
                  {s.pull}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}
