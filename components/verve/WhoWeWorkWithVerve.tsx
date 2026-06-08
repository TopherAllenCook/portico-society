import Image from 'next/image'
import { WHO_WE_WORK_WITH } from '@/lib/verve/content'

const PERSONA_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1633759593085-1eaeb724fc88?auto=format&fit=crop&w=720&q=80',
    alt: 'A roofer replacing worn shingles on a residential roof',
  },
  {
    src: 'https://images.unsplash.com/photo-1561480337-03eb1b6795a2?auto=format&fit=crop&w=720&q=80',
    alt: 'A technician checking a home heating and cooling system',
  },
  {
    src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=720&q=80',
    alt: 'A wall of well-used hand tools in a home service workshop',
  },
]

export default function WhoWeWorkWithVerve() {
  const cards = WHO_WE_WORK_WITH.personas.map((persona, i) => ({
    ...persona,
    img: PERSONA_IMAGES[i],
  }))

  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="who-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="who-heading"
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.025em',
            maxWidth: '16ch',
          }}
        >
          {WHO_WE_WORK_WITH.title}
        </h2>

        {/* Image-led card grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.type} className="flex flex-col">
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src={card.img.src}
                  alt={card.img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
              </div>
              <p
                className="mt-5 font-display font-medium"
                style={{ fontSize: '1.15rem', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
              >
                {card.type}
              </p>
              <p
                className="mt-1.5 text-sm leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
