'use client'

import { useEffect, useRef, useState } from 'react'

const bars = [
  {
    label: 'Competitor A',
    pct: 74,
    variant: 'competitor' as const,
  },
  {
    label: 'Competitor B',
    pct: 61,
    variant: 'competitor' as const,
  },
  {
    label: 'Verve client',
    pct: 89,
    note: 'from 7% at engagement start',
    variant: 'client' as const,
  },
]

export default function VisibilityBars() {
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
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '2.5rem', marginTop: '2.5rem' }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 mb-10">
        <p
          className="font-mono text-xs font-medium tracking-[0.16em] uppercase"
          style={{ color: 'var(--color-label-text)' }}
        >
          AI Citation Presence
        </p>
        <p
          className="font-mono text-xs tracking-[0.1em]"
          style={{ color: 'var(--color-label-text)', opacity: 0.7 }}
        >
          Longevity medicine · Six-month engagement
        </p>
      </div>

      {/* Bar rows */}
      <div className="space-y-7">
        {bars.map((bar, i) => (
          <div key={bar.label}>
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <p
                className="font-mono text-xs font-medium tracking-[0.12em]"
                style={{
                  color: bar.variant === 'client' ? 'var(--color-ink)' : 'var(--color-label-text)',
                }}
              >
                {bar.label}
              </p>
              <div className="flex items-baseline gap-3 flex-shrink-0">
                <span
                  className="font-mono text-xs font-medium tabular-nums"
                  style={{
                    color: bar.variant === 'client' ? 'var(--color-cinnabar)' : 'var(--color-label-text)',
                    minWidth: '2.5rem',
                    textAlign: 'right',
                  }}
                >
                  {active ? `${bar.pct}%` : ''}
                </span>
                {bar.note && (
                  <span
                    className="font-mono text-xs tracking-[0.08em]"
                    style={{ color: 'var(--color-label-text)', opacity: 0.55 }}
                  >
                    {bar.note}
                  </span>
                )}
              </div>
            </div>
            <div
              className="h-px rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--color-ink-faint)' }}
              role="presentation"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: active ? `${bar.pct}%` : '0%',
                  backgroundColor:
                    bar.variant === 'client'
                      ? 'var(--color-cinnabar)'
                      : 'var(--color-stone-mid)',
                  transition: active
                    ? `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`
                    : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p
        className="font-mono text-xs tracking-[0.1em] mt-8"
        style={{ color: 'var(--color-label-text)', opacity: 0.5 }}
      >
        Illustrative data from a representative engagement. Results vary by market and specialty.
      </p>
    </div>
  )
}
