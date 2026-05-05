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
      className="overflow-hidden py-5"
      style={{ backgroundColor: 'oklch(16% 0.006 35)' }}
      aria-label="Sectors we serve"
    >
      <div
        ref={trackRef}
        className="flex gap-14 whitespace-nowrap"
        style={{
          animation: paused ? 'none' : 'marquee 32s linear infinite',
          width: 'max-content',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {track.map((sector, i) => (
          <span
            key={i}
            className="font-body inline-flex items-center gap-8 text-xs font-medium tracking-[0.22em] uppercase"
            style={{ color: 'oklch(92% 0.03 40 / 0.65)' }}
          >
            {sector}
            <span
              className="inline-block h-px w-4 opacity-30"
              style={{ backgroundColor: 'oklch(92% 0.03 40)' }}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  )
}
