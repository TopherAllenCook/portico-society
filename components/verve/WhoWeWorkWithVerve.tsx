import Image from 'next/image'
import { WHO_WE_WORK_WITH } from '@/lib/verve/content'

const PERSONA_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1633759593085-1eaeb724fc88?auto=format&fit=crop&w=900&q=80',
    alt: 'A roofer replacing worn shingles on a residential roof',
  },
  {
    src: 'https://images.unsplash.com/photo-1561480337-03eb1b6795a2?auto=format&fit=crop&w=480&q=80',
    alt: 'A technician checking a home heating and cooling system',
  },
  {
    src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=480&q=80',
    alt: 'A wall of well-used hand tools in a home service workshop',
  },
]

const LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 500,
  fontSize: '1.15rem',
  color: 'var(--color-ink)',
  letterSpacing: '-0.01em',
}
const DESC: React.CSSProperties = {
  color: 'var(--color-body-text)',
  fontFamily: 'var(--font-body)',
}

export default function WhoWeWorkWithVerve() {
  const cards = WHO_WE_WORK_WITH.personas.map((persona, i) => ({ ...persona, img: PERSONA_IMAGES[i] }))
  const [featured, ...rest] = cards

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

        {/* Asymmetric: one large featured image + two supporting media rows */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          {/* Featured */}
          <article className="flex flex-col">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: '3 / 2' }}
            >
              <Image
                src={featured.img.src}
                alt={featured.img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
            <p className="mt-6" style={{ ...LABEL, fontSize: '1.4rem' }}>{featured.type}</p>
            <p className="mt-2 text-base leading-relaxed" style={{ ...DESC, maxWidth: '40ch' }}>
              {featured.description}
            </p>
          </article>

          {/* Supporting */}
          <div className="flex flex-col justify-center gap-8">
            {rest.map((card) => (
              <article key={card.type} className="flex items-center gap-5">
                <div
                  className="relative shrink-0 overflow-hidden rounded-xl"
                  style={{ width: 'clamp(96px, 22vw, 132px)', aspectRatio: '1 / 1' }}
                >
                  <Image
                    src={card.img.src}
                    alt={card.img.alt}
                    fill
                    className="object-cover"
                    sizes="132px"
                  />
                </div>
                <div>
                  <p style={LABEL}>{card.type}</p>
                  <p className="mt-1.5 text-sm leading-relaxed" style={DESC}>
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
