'use client'

import { useEffect, useRef, useState } from 'react'

const segments = [
  { name: 'Foundation', weeks: 'Weeks 1–4', pct: 16.67, opacity: 1 },
  { name: 'Build', weeks: 'Weeks 5–12', pct: 33.33, opacity: 0.55 },
  { name: 'Optimize', weeks: 'Weeks 13–20', pct: 33.33, opacity: 0.7 },
  { name: 'Compound', weeks: 'Weeks 21–24', pct: 16.67, opacity: 0.85 },
]

const positions = segments.map((_, i) =>
  segments.slice(0, i).reduce((sum, s) => sum + s.pct, 0)
)

export default function EngagementTimeline() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="my-16">
      {/* Phase name labels above bar */}
      <div className="relative mb-3" style={{ height: '1.25rem' }}>
        {segments.map((seg, i) => (
          <p
            key={seg.name}
            className="absolute font-mono text-xs font-medium tracking-[0.12em] uppercase leading-none"
            style={{ left: `${positions[i]}%`, color: 'var(--color-label-text)' }}
          >
            {seg.name}
          </p>
        ))}
      </div>

      {/* Bar + dots */}
      <div className="relative" style={{ height: '8px' }}>
        {/* Animated fill inside overflow clip */}
        <div
          className="absolute overflow-hidden"
          style={{ left: 0, right: 0, top: '1px', height: '6px' }}
        >
          <div
            className="flex h-full"
            style={{
              width: active ? '100%' : '0%',
              transition: active ? 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }}
          >
            {segments.map((seg) => (
              <div
                key={seg.name}
                style={{
                  flex: `0 0 ${seg.pct}%`,
                  backgroundColor: 'var(--color-cinnabar)',
                  opacity: seg.opacity,
                }}
              />
            ))}
          </div>
        </div>

        {/* Position dots */}
        {positions.map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${pos}%`,
              top: 0,
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--color-cinnabar)',
              transform: i === 0 ? 'none' : 'translateX(-50%)',
              zIndex: 1,
            }}
          />
        ))}
      </div>

      {/* Week range labels below bar */}
      <div className="relative mt-3" style={{ height: '1.25rem' }}>
        {segments.map((seg, i) => (
          <p
            key={seg.name}
            className="absolute font-mono text-xs tracking-[0.08em] leading-none"
            style={{
              left: `${positions[i]}%`,
              color: 'var(--color-label-text)',
              opacity: 0.55,
            }}
          >
            {seg.weeks}
          </p>
        ))}
      </div>
    </div>
  )
}
