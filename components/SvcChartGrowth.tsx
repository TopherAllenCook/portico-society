'use client'
import { useChartReveal } from './useChartReveal'

const LINE = 'M 0 64 C 50 62 100 52 150 36 S 190 14 200 10'
const AREA = 'M 0 64 C 50 62 100 52 150 36 S 190 14 200 10 L 200 68 L 0 68 Z'
const DASH = 230

export default function SvcChartGrowth() {
  const { ref, triggered } = useChartReveal()

  return (
    <figure ref={ref} className="mb-8" aria-label="Referral volume: steady compounding growth over six months">
      <p
        className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
        style={{ color: 'var(--color-label-text)' }}
      >
        Referral Volume
      </p>
      <svg
        viewBox="0 0 200 76"
        width="100%"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        <line
          x1="0" y1="68" x2="200" y2="68"
          stroke="var(--color-ink-rule)" strokeWidth="0.75"
        />
        <text
          x="0" y="76"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fill: 'var(--color-label-text)' }}
        >
          Month 1
        </text>
        <text
          x="158" y="76"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fill: 'var(--color-label-text)' }}
        >
          Month 6
        </text>

        {/* Area fill fades in behind the line */}
        <path
          d={AREA}
          fill="var(--color-cinnabar)"
          style={{
            opacity: triggered ? 0.08 : 0,
            transition: triggered
              ? 'opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s'
              : 'none',
          }}
        />

        {/* Line draws in */}
        <path
          d={LINE}
          fill="none"
          stroke="var(--color-cinnabar)"
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{
            strokeDasharray: DASH,
            strokeDashoffset: triggered ? 0 : DASH,
            transition: triggered
              ? 'stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)'
              : 'none',
          }}
        />

        <circle
          cx="200" cy="10" r="3"
          fill="var(--color-cinnabar)"
          style={{
            opacity: triggered ? 1 : 0,
            transition: triggered ? 'opacity 0.3s ease 1s' : 'none',
          }}
        />
      </svg>
    </figure>
  )
}
