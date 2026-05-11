'use client'
import { useChartReveal } from './useChartReveal'

const DASH = 220

export default function SvcChartCitation() {
  const { ref, triggered } = useChartReveal()

  return (
    <figure ref={ref} className="mb-8" aria-label="AI citation frequency: flat trend rising sharply after month three">
      <p
        className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
        style={{ color: 'var(--color-label-text)' }}
      >
        AI Citation Frequency
      </p>
      <svg
        viewBox="0 0 190 76"
        width="100%"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        <line
          x1="0" y1="68" x2="190" y2="68"
          stroke="var(--color-ink-rule)" strokeWidth="0.75"
        />
        <text
          x="0" y="76"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fill: 'var(--color-label-text)' }}
        >
          Month 1
        </text>
        <text
          x="148" y="76"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fill: 'var(--color-label-text)' }}
        >
          Month 6
        </text>

        {/* Hockey-stick line: flat then sharp upward curve */}
        <path
          d="M 0 64 C 35 63 65 62 90 57 C 115 52 138 32 185 10"
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
          cx="185" cy="10" r="3"
          fill="var(--color-cinnabar)"
          style={{
            opacity: triggered ? 1 : 0,
            transition: triggered ? 'opacity 0.3s ease 1s' : 'none',
          }}
        />
        <text
          x="148" y="8"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '7px',
            fill: 'var(--color-cinnabar)',
            opacity: triggered ? 1 : 0,
            transition: triggered ? 'opacity 0.3s ease 1.1s' : 'none',
          }}
        >
          +340%
        </text>
      </svg>
    </figure>
  )
}
