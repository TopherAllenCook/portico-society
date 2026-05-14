'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

function parseNum(val: string): number {
  const n = parseFloat(val.replace(/[^0-9.]/g, ''))
  return isNaN(n) || n <= 0 ? 0 : n
}

function fmtCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 10000) return `$${Math.round(n / 1000)}k`
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n)
}

const RULE = '1px solid oklch(14% 0.012 50 / 0.15)'

const LABEL: React.CSSProperties = {
  display: 'block',
  fontSize: '0.62rem',
  fontFamily: 'var(--font-mono)',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: 'var(--color-label-text)',
  marginBottom: '0.5rem',
}

const INPUT: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: RULE,
  borderRadius: 0,
  outline: 'none',
  width: '100%',
  fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  color: 'var(--color-ink)',
  padding: '0.4rem 0 0.5rem',
  letterSpacing: '-0.02em',
}

export default function CalculatorVerve() {
  const [revenue, setRevenue] = useState('')
  const [patients, setPatients] = useState('')
  const [avgValue, setAvgValue] = useState('')

  const result = useMemo(() => {
    const r = parseNum(revenue)
    const p = parseNum(patients)
    const v = parseNum(avgValue)
    if (p === 0 || v === 0) return null
    const added = Math.max(1, Math.round(p * 0.4))
    const monthly = added * v
    const annual = monthly * 12
    const pct = r > 0 ? Math.round((annual / (r * 12)) * 100) : null
    return { added, monthly, annual, pct }
  }, [revenue, patients, avgValue])

  const rows = [
    {
      id: 'added-patients',
      display: result ? `+${result.added}` : '—',
      label: 'additional patients per month',
      sub: null,
    },
    {
      id: 'added-monthly',
      display: result ? `+${fmtCurrency(result.monthly)}` : '—',
      label: 'additional monthly revenue',
      sub: null,
    },
    {
      id: 'annual-uplift',
      display: result ? fmtCurrency(result.annual) : '—',
      label: 'projected annual uplift',
      sub: result?.pct != null ? `↑ ${result.pct}% of current annual revenue` : null,
    },
  ]

  return (
    <section
      id="calculator"
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-sand)' }}
      aria-labelledby="calculator-heading"
    >
      <div className="mx-auto max-w-5xl">

        {/* Header row */}
        <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span
              className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--color-cinnabar)',
                color: 'var(--color-ivory)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Revenue Calculator
            </span>
            <h2
              id="calculator-heading"
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '22ch',
              }}
            >
              See what your clinic could add in 12 months.
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{
              color: 'var(--color-body-text)',
              fontFamily: 'var(--font-body)',
              maxWidth: '32ch',
              paddingTop: '0.25rem',
            }}
          >
            Enter your current numbers. Results update as you type.
          </p>
        </div>

        {/* Two-column body */}
        <div
          className="grid gap-0 lg:grid-cols-2"
          style={{ borderTop: RULE }}
        >
          {/* Inputs */}
          <div className="py-10 lg:pr-16" style={{ borderBottom: RULE }}>
            <p style={{ ...LABEL, color: 'var(--color-label-text)', marginBottom: '2rem' }}>
              Your clinic today
            </p>

            <div className="flex flex-col gap-9">
              <div>
                <label htmlFor="calc-revenue" style={LABEL}>Current Monthly Revenue</label>
                <div className="relative">
                  <span
                    className="pointer-events-none absolute left-0"
                    style={{
                      bottom: '0.55rem',
                      fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-ink-muted)',
                    }}
                  >
                    $
                  </span>
                  <input
                    id="calc-revenue"
                    type="text"
                    inputMode="numeric"
                    placeholder="80,000"
                    value={revenue}
                    onChange={e => setRevenue(e.target.value.replace(/[^0-9,]/g, ''))}
                    style={{ ...INPUT, paddingLeft: '1.1rem' }}
                    aria-label="Current monthly revenue in dollars"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="calc-patients" style={LABEL}>New Patients per Month</label>
                <input
                  id="calc-patients"
                  type="text"
                  inputMode="numeric"
                  placeholder="30"
                  value={patients}
                  onChange={e => setPatients(e.target.value.replace(/[^0-9]/g, ''))}
                  style={INPUT}
                  aria-label="New patients acquired per month"
                />
              </div>

              <div>
                <label htmlFor="calc-value" style={LABEL}>Avg. Patient Value per Visit</label>
                <div className="relative">
                  <span
                    className="pointer-events-none absolute left-0"
                    style={{
                      bottom: '0.55rem',
                      fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-ink-muted)',
                    }}
                  >
                    $
                  </span>
                  <input
                    id="calc-value"
                    type="text"
                    inputMode="numeric"
                    placeholder="504"
                    value={avgValue}
                    onChange={e => setAvgValue(e.target.value.replace(/[^0-9,]/g, ''))}
                    style={{ ...INPUT, paddingLeft: '1.1rem' }}
                    aria-label="Average patient value per visit in dollars"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div
            className="py-10 lg:pl-16"
            style={{
              borderBottom: RULE,
              borderLeft: 'none',
            }}
          >
            <p style={{ ...LABEL, color: 'var(--color-cinnabar)', marginBottom: '2rem' }}>
              With Verve MD
            </p>

            <div>
              {rows.map((row, i) => (
                <div
                  key={row.id}
                  className="py-6"
                  style={{ borderTop: i === 0 ? 'none' : RULE }}
                >
                  <p
                    className="font-display font-semibold tabular-nums"
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      color: result ? 'var(--color-cinnabar)' : 'var(--color-ink-muted)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      transition: 'color 0.15s ease',
                    }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {row.display}
                  </p>
                  <p
                    className="mt-1.5 text-sm"
                    style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
                  >
                    {row.label}
                  </p>
                  {row.sub && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}
                    >
                      {row.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-xs leading-relaxed"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
          >
            Based on a 40% new-patient acquisition improvement and $504 avg. visit value — median benchmarks across longevity and aesthetics clinics. Results vary by market, budget, and practice type.
          </p>
          <Link
            href="/audit"
            className="shrink-0 text-sm font-medium underline-offset-4 hover:underline whitespace-nowrap"
            style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
          >
            Validate for your clinic →
          </Link>
        </div>

      </div>
    </section>
  )
}
