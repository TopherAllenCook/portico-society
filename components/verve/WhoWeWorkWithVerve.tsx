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
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="who-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_280px] lg:gap-24">

          {/* Left: text list */}
          <div>
            <h2
              id="who-heading"
              className="font-display font-semibold"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.025em',
              }}
            >
              {WHO_WE_WORK_WITH.title}
            </h2>

            <div
              className="mt-12"
              style={{ borderTop: '1px solid var(--color-ink-rule)', borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              {WHO_WE_WORK_WITH.personas.map((persona, i) => (
                <div
                  key={persona.type}
                  className="flex flex-col gap-2 py-8 md:flex-row md:items-start md:gap-16"
                  style={{ borderBottom: i < WHO_WE_WORK_WITH.personas.length - 1 ? '1px solid var(--color-ink-rule)' : 'none' }}
                >
                  <p
                    className="shrink-0 text-xs font-medium uppercase tracking-[0.15em] md:w-8"
                    style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)', paddingTop: '0.15rem' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <p
                      className="font-display font-medium"
                      style={{ fontSize: '1.1rem', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
                    >
                      {persona.type}
                    </p>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
                    >
                      {persona.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stacked persona images */}
          <div className="hidden lg:flex lg:flex-col lg:gap-3">
            {PERSONA_IMAGES.map((img) => (
              <div
                key={img.src}
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
