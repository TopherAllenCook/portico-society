import Image from 'next/image'

const panels = [
  {
    sector: 'Hospitality',
    src: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=85&auto=format&fit=crop',
    alt: '',
  },
  {
    sector: 'Wellness',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=85&auto=format&fit=crop',
    alt: '',
  },
  {
    sector: 'Beauty',
    src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=85&auto=format&fit=crop',
    alt: '',
  },
  {
    sector: 'Medicine',
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=85&auto=format&fit=crop',
    alt: '',
  },
  {
    sector: 'Events',
    src: 'https://images.unsplash.com/photo-1519167758481-83f29c8a4bde?w=900&q=85&auto=format&fit=crop',
    alt: '',
  },
]

export default function PhotoStrip() {
  return (
    <div
      className="flex h-[58vw] overflow-x-auto lg:h-[62vh] lg:overflow-hidden"
      aria-hidden="true"
    >
      {panels.map((panel) => (
        <div
          key={panel.sector}
          className="group relative h-full w-[80vw] flex-shrink-0 overflow-hidden lg:w-auto lg:flex-1"
        >
          <Image
            src={panel.src}
            alt={panel.alt}
            fill
            sizes="(max-width: 1024px) 80vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ filter: 'brightness(0.42) saturate(0.6)' }}
          />
          {/* Bottom gradient for label legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, oklch(16% 0.006 35 / 0.65) 0%, transparent 45%)',
            }}
          />
          {/* Sector label */}
          <p
            className="absolute bottom-6 left-0 right-0 text-center font-body text-xs font-medium tracking-[0.22em] uppercase"
            style={{ color: 'oklch(97% 0.006 62 / 0.65)' }}
          >
            {panel.sector}
          </p>
          {/* Vertical divider between panels */}
          <div
            className="absolute inset-y-0 right-0 w-px"
            style={{ backgroundColor: 'oklch(97% 0.006 62 / 0.08)' }}
          />
        </div>
      ))}
    </div>
  )
}
