'use client'
import { useChartReveal } from './useChartReveal'

const bars = [
  { x: 5,   h: 12, y: 60 },
  { x: 38,  h: 22, y: 50 },
  { x: 71,  h: 32, y: 40 },
  { x: 104, h: 44, y: 28 },
  { x: 137, h: 55, y: 17 },
  { x: 170, h: 64, y: 8  },
]

export default function SvcChartInquiry() {
  const { ref, triggered } = useChartReveal()

  return (
    <figure ref={ref} className="mb-8" aria-label="Monthly inquiries captured: growing trend over six months">
      <p
        className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
        style={{ color: 'var(--color-label-text)' }}
      >
        Inquiries Captured
      </p>
      <svg
        viewBox="0 0 200 80"
        width="100%"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        <line
          x1="0" y1="72" x2="200" y2="72"
          stroke="var(--color-ink-rule)" strokeWidth="0.75"
        />
        <text
          x="0" y="80"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fill: 'var(--color-label-text)' }}
        >
          Mo 1
        </text>
        <text
          x="162" y="80"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fill: 'var(--color-label-text)' }}
        >
          Mo 6
        </text>

        {bars.map((bar, i) => (
          <g
            key={i}
            style={{
              transformBox: 'fill-box',
              transformOrigin: '50% 100%',
              transform: triggered ? 'scaleY(1)' : 'scaleY(0)',
              transition: triggered
                ? `transform 0.75s cubic-bezier(0.25,1,0.5,1) ${i * 80}ms`
                : 'none',
            }}
          >
            <rect
              x={bar.x}
              y={bar.y}
              width={20}
              height={bar.h}
              fill="var(--color-cinnabar)"
            />
          </g>
        ))}

        <text
          x="168" y="5"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '7px',
            fill: 'var(--color-cinnabar)',
            opacity: triggered ? 1 : 0,
            transition: triggered ? 'opacity 0.3s ease 0.72s' : 'none',
          }}
        >
          +5×
        </text>
      </svg>
    </figure>
  )
}
