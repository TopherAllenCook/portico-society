'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

function parseNum(val: string): number {
  const n = parseFloat(val.replace(/[^0-9.]/g, ''))
  return isNaN(n) || n <= 0 ? 0 : n
}

function fmtCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `$${Math.round(n / 1_000)}k`
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n)
}

const RULE = '1px solid var(--color-ink-rule)'

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
  width: '100%',
  fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  color: 'var(--color-ink)',
  padding: '0.4rem 0 0.5rem',
  letterSpacing: '-0.02em',
}

const HINT: React.CSSProperties = {
  display: 'block',
  marginTop: '0.4rem',
  fontSize: '0.68rem',
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-ink-muted)',
  letterSpacing: '0.06em',
}

const DOLLAR = {
  bottom: '0.55rem',
  fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
  fontFamily: 'var(--font-display)',
  color: 'var(--color-ink-muted)',
} as React.CSSProperties

export default function CalculatorVerve() {
  const [budget, setBudget] = useState('')
  const [cpl, setCpl] = useState('')
  const [closeRate, setCloseRate] = useState('')
  const [avgValue, setAvgValue] = useState('')

  const result = useMemo(() => {
    const b = parseNum(budget)
    const c = parseNum(cpl)
    const r = parseNum(closeRate)
    const v = parseNum(avgValue)
    if (b === 0 || c === 0 || r === 0 || v === 0) return null

    const leads = b / c
    const patients = leads * (r / 100)
    const monthlyRevenue = patients * v
    const monthlyProfit = monthlyRevenue - b
    const roi = (monthlyProfit / b) * 100
    const breakEvenCPL = v * (r / 100)
    const annualProfit = monthlyProfit * 12
    const headroom = breakEvenCPL - c
    const profitable = c <= breakEvenCPL

    return { leads, patients, monthlyRevenue, monthlyProfit, roi, breakEvenCPL, annualProfit, headroom, profitable }
  }, [budget, cpl, closeRate, avgValue])

  const outputRows = [
    {
      id: 'leads',
      display: result ? `+${Math.round(result.leads)}` : '—',
      label: 'projected leads per month',
      sub: null,
    },
    {
      id: 'patients',
      display: result ? `+${Math.round(result.patients)}` : '—',
      label: 'new patients per month',
      sub: null,
    },
    {
      id: 'revenue',
      display: result ? fmtCurrency(result.monthlyRevenue) : '—',
      label: 'monthly revenue from ads',
      sub: result ? `${fmtCurrency(result.annualProfit)} projected annual profit` : null,
    },
    {
      id: 'roi',
      display: result ? `${result.roi >= 0 ? '+' : ''}${Math.round(result.roi)}%` : '—',
      label: 'return on ad spend',
      sub: null,
      roiColor: result
        ? result.roi >= 0 ? 'var(--color-cinnabar)' : 'var(--color-ink-muted)'
        : 'var(--color-ink-muted)',
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

        {/* Header */}
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
              Ad Budget Planner
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
              Model your spend before you commit a dollar.
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
            Enter your budget and targets. Break-even CPL and ROI update as you type.
          </p>
        </div>

        {/* Two-column body */}
        <div className="grid gap-0 lg:grid-cols-2" style={{ borderTop: RULE }}>

          {/* Inputs */}
          <div className="py-10 lg:pr-16" style={{ borderBottom: RULE }}>
            <p style={{ ...LABEL, marginBottom: '2rem' }}>Your campaign inputs</p>

            <div className="flex flex-col gap-9">

              {/* Monthly budget */}
              <div>
                <label htmlFor="calc-budget" style={LABEL}>Monthly Ad Budget</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-0" style={DOLLAR}>$</span>
                  <input
                    id="calc-budget"
                    type="text"
                    inputMode="numeric"
                    placeholder="2,500"
                    value={budget}
                    onChange={e => setBudget(e.target.value.replace(/[^0-9,]/g, ''))}
                    className="verve-calc-input"
                    style={{ ...INPUT, paddingLeft: '1.1rem' }}
                    aria-label="Monthly ad budget in dollars"
                  />
                </div>
              </div>

              {/* Cost per lead */}
              <div>
                <label htmlFor="calc-cpl" style={LABEL}>Target Cost Per Lead</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-0" style={DOLLAR}>$</span>
                  <input
                    id="calc-cpl"
                    type="text"
                    inputMode="numeric"
                    placeholder="55"
                    value={cpl}
                    onChange={e => setCpl(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="verve-calc-input"
                    style={{ ...INPUT, paddingLeft: '1.1rem' }}
                    aria-label="Target cost per lead in dollars"
                  />
                </div>
                <span style={HINT}>Med spa avg $45–80 · Longevity avg $65–150</span>
              </div>

              {/* Close rate */}
              <div>
                <label htmlFor="calc-close" style={LABEL}>Lead Close Rate</label>
                <div className="relative">
                  <input
                    id="calc-close"
                    type="text"
                    inputMode="numeric"
                    placeholder="25"
                    value={closeRate}
                    onChange={e => setCloseRate(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="verve-calc-input"
                    style={{ ...INPUT, paddingRight: '1.4rem' }}
                    aria-label="Lead close rate as a percentage"
                  />
                  <span
                    className="pointer-events-none absolute right-0"
                    style={{ ...DOLLAR, bottom: '0.55rem' }}
                  >
                    %
                  </span>
                </div>
                <span style={HINT}>Aesthetics avg 20–35%</span>
              </div>

              {/* Avg patient value */}
              <div>
                <label htmlFor="calc-value" style={LABEL}>Avg. Patient Value per Visit</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-0" style={DOLLAR}>$</span>
                  <input
                    id="calc-value"
                    type="text"
                    inputMode="numeric"
                    placeholder="504"
                    value={avgValue}
                    onChange={e => setAvgValue(e.target.value.replace(/[^0-9,]/g, ''))}
                    className="verve-calc-input"
                    style={{ ...INPUT, paddingLeft: '1.1rem' }}
                    aria-label="Average patient value per visit in dollars"
                  />
                </div>
                <span style={HINT}>Longevity/aesthetics median $504</span>
              </div>

            </div>
          </div>

          {/* Outputs */}
          <div className="py-10 lg:pl-16" style={{ borderBottom: RULE }}>
            <p style={{ ...LABEL, color: 'var(--color-cinnabar)', marginBottom: '2rem' }}>
              Projected performance
            </p>

            {!result && (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-ink-muted)',
                  letterSpacing: '0.06em',
                  marginBottom: '1.5rem',
                }}
              >
                Fill in all four values to see your projections.
              </p>
            )}

            <div>
              {outputRows.map((row, i) => (
                <div
                  key={row.id}
                  className="py-6"
                  style={{ borderTop: i === 0 ? 'none' : RULE }}
                >
                  <p
                    className="font-display font-semibold tabular-nums"
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      color: row.id === 'roi'
                        ? (row.roiColor ?? 'var(--color-ink-muted)')
                        : result ? 'var(--color-cinnabar)' : 'var(--color-ink-muted)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      transition: 'color 0.2s ease',
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
                      style={{
                        color: result && result.monthlyProfit >= 0
                          ? 'var(--color-cinnabar)'
                          : 'var(--color-ink-muted)',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {row.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Break-even analysis strip */}
        {result && (
          <div
            className="mt-0 grid grid-cols-1 gap-px sm:grid-cols-3"
            style={{ background: 'var(--color-ink-rule)', borderLeft: RULE, borderRight: RULE, borderBottom: RULE }}
          >
            <div className="px-6 py-5" style={{ background: 'var(--color-sand)' }}>
              <p style={{ ...LABEL, marginBottom: '0.35rem' }}>Break-even CPL</p>
              <p
                className="font-display font-semibold tabular-nums"
                style={{ fontSize: '1.4rem', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}
              >
                {fmtCurrency(result.breakEvenCPL)}
              </p>
            </div>
            <div className="px-6 py-5" style={{ background: 'var(--color-sand)' }}>
              <p style={{ ...LABEL, marginBottom: '0.35rem' }}>Your target CPL</p>
              <p
                className="font-display font-semibold tabular-nums"
                style={{ fontSize: '1.4rem', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}
              >
                {fmtCurrency(parseNum(cpl))}
              </p>
            </div>
            <div className="px-6 py-5" style={{ background: 'var(--color-sand)' }}>
              <p style={{ ...LABEL, marginBottom: '0.35rem' }}>Status</p>
              <p
                className="font-display font-semibold"
                style={{
                  fontSize: '1.4rem',
                  letterSpacing: '-0.025em',
                  color: result.profitable ? 'var(--color-cinnabar)' : 'var(--color-ink-muted)',
                }}
                aria-live="polite"
                aria-atomic="true"
              >
                {result.profitable
                  ? `Profitable (+${fmtCurrency(result.headroom)}/lead)`
                  : `Over break-even (${fmtCurrency(Math.abs(result.headroom))}/lead)`}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-xs leading-relaxed"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
          >
            CPL benchmarks: med spa $45–80, longevity $65–150. Close rate: aesthetics avg 20–35%. Patient value: $504 median. Results vary by market and practice type.
          </p>
          <Link
            href="/audit"
            className="shrink-0 text-sm font-medium underline-offset-4 hover:underline whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cinnabar)] rounded-sm"
            style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
          >
            Validate for your clinic →
          </Link>
        </div>

      </div>
    </section>
  )
}
