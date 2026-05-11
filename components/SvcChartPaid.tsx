'use client'
import { useChartReveal } from './useChartReveal'

const rows = [
  { label: 'Reach',  width: 136, color: 'var(--color-stone-mid)', delay: 0   },
  { label: 'Clicks', width: 54,  color: 'var(--color-stone-mid)', delay: 100 },
  { label: 'Booked', width: 26,  color: 'var(--color-cinnabar)',  delay: 200 },
]
const BAR_H = 14
const BAR_X = 58

export default function SvcChartPaid() {
  const { ref, triggered } = useChartReveal()

  return (
    <figure ref={ref} className="mb-8" aria-label="Paid campaign funnel: reach, clicks, and appointments booked">
      <p
        className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
        style={{ color: 'var(--color-label-text)' }}
      >
        Campaign Funnel
      </p>
      <svg
        viewBox="0 0 208 74"
        width="100%"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        {rows.map((row, i) => {
          const y = i * (BAR_H + 12)
          return (
            <g key={row.label}>
              {/* Row label */}
              <text
                x={BAR_X - 6}
                y={y + BAR_H - 3}
                textAnchor="end"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7px',
                  fill: 'var(--color-label-text)',
                }}
              >
                {row.label}
              </text>

              {/* Bar */}
              <g
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: '0% 50%',
                  transform: triggered ? 'scaleX(1)' : 'scaleX(0)',
                  transition: triggered
                    ? `transform 0.8s cubic-bezier(0.25,1,0.5,1) ${row.delay}ms`
                    : 'none',
                }}
              >
                <rect
                  x={BAR_X}
                  y={y}
                  width={row.width}
                  height={BAR_H}
                  fill={row.color}
                />
              </g>
            </g>
          )
        })}

        {/* Appointment count label — appears after last bar animates in */}
        <text
          x={BAR_X + 29}
          y={2 * (BAR_H + 12) + BAR_H - 3}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '7px',
            fill: 'var(--color-cinnabar)',
            opacity: triggered ? 1 : 0,
            transition: triggered ? 'opacity 0.3s ease 0.92s' : 'none',
          }}
        >
          180 appts
        </text>
      </svg>
    </figure>
  )
}
