'use client'

import { useRef, useState } from 'react'

const sectors = [
  'Hospitality',
  'Concierge Medicine',
  'Longevity',
  'Beauty',
  'Events & Weddings',
  'Private Aviation',
  'Luxury Real Estate',
  'Wellness Retreats',
]

const track = [...sectors, ...sectors]

export default function SectorMarquee() {
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="overflow-hidden border-y py-5"
      style={{ borderColor: 'oklch(88% 0.005 55)' }}
      aria-label="Sectors we serve"
    >
      <div
        ref={trackRef}
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: paused ? 'none' : 'marquee 28s linear infinite',
          width: 'max-content',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {track.map((sector, i) => (
          <span
            key={i}
            className="font-body inline-flex items-center gap-6 text-xs font-medium tracking-[0.18em] uppercase text-terracotta"
          >
            {sector}
            <span
              className="inline-block h-1 w-1 rounded-full bg-terracotta opacity-40"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  )
}
