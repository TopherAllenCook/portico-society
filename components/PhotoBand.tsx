import Image from 'next/image'

type BandItem = string | { text: string; display: true }

const items: BandItem[] = [
  'ChatGPT',
  'Perplexity',
  'Google AI Overviews',
  'Siri',
  'Gemini',
  { text: 'Be the answer.', display: true },
  'AI is the new front desk',
  'Who does AI recommend?',
  'Your patients are already asking',
  'The first name wins',
]

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=85&auto=format&fit=crop',
    alt: 'Longevity medicine practice environment',
    objectPosition: '55% center',
  },
  {
    src: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=85&auto=format&fit=crop',
    alt: 'Concierge medicine consultation suite',
    objectPosition: '50% 30%',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&auto=format&fit=crop',
    alt: 'Aesthetic medicine clinic interior',
    objectPosition: 'center',
  },
]

export default function PhotoBand() {
  const doubled = [...items, ...items]

  return (
    <div
      style={{ backgroundColor: 'var(--color-cinnabar)' }}
      aria-hidden="true"
    >
      {/* Photo strip */}
      <div className="grid grid-cols-3">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{ height: 'clamp(160px, 22vw, 300px)' }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="33vw"
              className="object-cover"
              style={{
                objectPosition: photo.objectPosition,
                filter: 'brightness(0.70) saturate(0.55) sepia(0.12)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-5 lg:py-6">
        <div className="marquee-track flex items-center gap-0 whitespace-nowrap">
          {doubled.map((item, i) => {
            const isDisplay = typeof item === 'object'
            const text = typeof item === 'string' ? item : item.text
            return (
              <span key={i} className="flex items-center flex-shrink-0">
                <span
                  className={
                    isDisplay
                      ? 'font-display italic'
                      : 'font-mono text-xs font-medium uppercase tracking-[0.18em]'
                  }
                  style={{
                    color: 'var(--color-ivory)',
                    ...(isDisplay ? { fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' } : {}),
                  }}
                >
                  {text}
                </span>
                <span
                  className="mx-6 inline-block h-1 w-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.4)' }}
                  aria-hidden="true"
                />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
