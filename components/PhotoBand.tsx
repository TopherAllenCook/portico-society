import Image from 'next/image'

const panels = [
  {
    src: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=900&q=88&auto=format&fit=crop',
    alt: 'Physician reviewing patient data in a modern clinic',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=88&auto=format&fit=crop',
    alt: 'Premium clinic consultation space with warm natural light',
  },
  {
    src: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=88&auto=format&fit=crop',
    alt: 'Patient consultation in a concierge medicine practice',
  },
]

export default function PhotoBand() {
  return (
    <section aria-label="Practice imagery" className="overflow-hidden">
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ height: 'clamp(200px, 28vw, 420px)' }}
      >
        {panels.map(({ src, alt }, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
              style={{ filter: 'brightness(0.88) saturate(0.85)' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
