'use client'

import { useState, useMemo } from 'react'

function fmtMoney(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return `$${m.toFixed(2).replace(/\.?0+$/, '')}M`
  }
  if (n >= 10_000) return `$${Math.round(n / 1_000)}k`
  return `$${Math.round(n).toLocaleString('en-US')}`
}

const RULE = '1px solid var(--color-ink-rule)'

const LABEL: React.CSSProperties = {
  fontSize: '0.62rem',
  fontFamily: 'var(--font-mono)',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: 'var(--color-label-text)',
}

const VALUE: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: '1.15rem',
  color: 'var(--color-ink)',
  letterSpacing: '-0.02em',
}

const HINT: React.CSSProperties = {
  display: 'block',
  marginTop: '0.55rem',
  fontSize: '0.68rem',
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-ink-muted)',
  letterSpacing: '0.04em',
}

interface SliderConfig {
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
  set: (n: number) => void
  fmt: (n: number) => string
  hint: string
}

function Slider({ c }: { c: SliderConfig }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`oe-${c.id}`} style={LABEL}>{c.label}</label>
        <span style={VALUE} className="tabular-nums">{c.fmt(c.value)}</span>
      </div>
      <input
        id={`oe-${c.id}`}
        type="range"
        className="verve-range mt-3"
        min={c.min}
        max={c.max}
        step={c.step}
        value={c.value}
        onChange={(e) => c.set(Number(e.target.value))}
        aria-valuetext={c.fmt(c.value)}
      />
      <span style={HINT}>{c.hint}</span>
    </div>
  )
}

export default function OwnerEconomicsCalculator() {
  const [takeHome, setTakeHome] = useState(800_000)
  const [taxRate, setTaxRate] = useState(46)
  const [teamCost, setTeamCost] = useState(300_000)
  const [overhead, setOverhead] = useState(100_000)
  const [pricePerClient, setPricePerClient] = useState(25_000)

  const r = useMemo(() => {
    const ownerComp = takeHome / (1 - taxRate / 100)
    const taxBill = ownerComp - takeHome
    const revenue = ownerComp + teamCost + overhead
    const monthlyRevenue = revenue / 12
    const clients = Math.ceil(monthlyRevenue / pricePerClient)
    const pocketShare = revenue > 0 ? takeHome / revenue : 0
    const parts = [
      { id: 'pocket', label: 'Your take-home', value: takeHome, color: 'var(--color-cinnabar)' },
      { id: 'tax', label: 'Personal taxes', value: taxBill, color: 'var(--color-ink)' },
      { id: 'team', label: 'Team', value: teamCost, color: 'var(--color-stone-mid)' },
      { id: 'overhead', label: 'Tools + G&A', value: overhead, color: 'var(--color-sand)' },
    ]
    return { ownerComp, taxBill, revenue, monthlyRevenue, clients, pocketShare, parts }
  }, [takeHome, taxRate, teamCost, overhead, pricePerClient])

  const sliders: SliderConfig[] = [
    { id: 'takehome', label: 'Take-home target (after tax)', min: 50_000, max: 2_000_000, step: 10_000, value: takeHome, set: setTakeHome, fmt: fmtMoney, hint: 'Cash in your pocket, after all personal tax' },
    { id: 'taxrate', label: 'Effective personal tax rate', min: 25, max: 55, step: 1, value: taxRate, set: setTaxRate, fmt: (n) => `${n}%`, hint: 'NYC single high earner runs ~44 to 48% all-in' },
    { id: 'team', label: 'Annual team cost', min: 0, max: 1_500_000, step: 25_000, value: teamCost, set: setTeamCost, fmt: fmtMoney, hint: 'Salaries + contractors. $0 = solo' },
    { id: 'overhead', label: 'Annual overhead', min: 0, max: 500_000, step: 10_000, value: overhead, set: setOverhead, fmt: fmtMoney, hint: 'Software, tools, accounting, legal, insurance' },
    { id: 'price', label: 'Price per client / month', min: 2_000, max: 50_000, step: 1_000, value: pricePerClient, set: setPricePerClient, fmt: (n) => `${fmtMoney(n)}/mo`, hint: 'Retainer $10k · Custom engagement $25k to $40k' },
  ]

  const statCards = [
    { id: 'clients', display: `${r.clients}`, label: 'right-fit clients needed', sub: `at ${fmtMoney(pricePerClient)}/mo` },
    { id: 'comp', display: fmtMoney(r.ownerComp), label: 'owner comp (pre-tax)', sub: `${fmtMoney(r.taxBill)} to taxes` },
    { id: 'monthly', display: fmtMoney(r.monthlyRevenue), label: 'revenue per month', sub: `${(r.pocketShare * 100).toFixed(0)}¢ of each $ reaches you` },
  ]

  return (
    <div>
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}>
          Owner economics
        </p>
        <h1 className="mt-1 font-display" style={{ fontSize: '2rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
          What the agency needs to bill
        </h1>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}>
          Set your target take-home and cost structure. The required agency revenue, client count, and where each
          revenue dollar goes update as you slide.
        </p>
      </div>

      {/* Body */}
      <div className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-2" style={{ borderTop: RULE, paddingTop: '2.5rem' }}>
        {/* Inputs */}
        <div className="flex flex-col gap-9">
          <p style={LABEL}>Your assumptions</p>
          {sliders.map((c) => <Slider key={c.id} c={c} />)}
        </div>

        {/* Outputs */}
        <div className="flex flex-col">
          <p style={{ ...LABEL, color: 'var(--color-cinnabar)' }}>Required agency revenue</p>
          <p
            className="mt-3 font-display font-semibold tabular-nums"
            style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', color: 'var(--color-cinnabar)', letterSpacing: '-0.04em', lineHeight: 1 }}
            aria-live="polite"
            aria-atomic="true"
          >
            {fmtMoney(r.revenue)}
            <span className="font-body" style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--color-ink-muted)', letterSpacing: '0', marginLeft: '0.5rem' }}>
              / year
            </span>
          </p>

          <div className="mt-8 grid grid-cols-3 gap-px" style={{ background: 'var(--color-ink-rule)', border: RULE }}>
            {statCards.map((s) => (
              <div key={s.id} className="px-4 py-5" style={{ background: 'var(--color-ivory)' }}>
                <p className="font-display font-semibold tabular-nums" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', color: 'var(--color-ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {s.display}
                </p>
                <p className="mt-2 text-xs leading-snug" style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}>{s.label}</p>
                <p className="mt-1" style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink-muted)', letterSpacing: '0.04em' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Composition bar */}
      <div className="mt-14" style={{ borderTop: RULE, paddingTop: '2.5rem' }}>
        <p style={LABEL}>Where every revenue dollar goes</p>
        <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full" style={{ background: 'var(--color-stone)' }}>
          {r.parts.map((p) => {
            const pct = r.revenue > 0 ? (p.value / r.revenue) * 100 : 0
            if (pct <= 0) return null
            return (
              <div
                key={p.id}
                style={{ width: `${pct}%`, background: p.color, transition: 'width 0.25s var(--ease-quart)' }}
                title={`${p.label}: ${fmtMoney(p.value)} (${pct.toFixed(0)}%)`}
              />
            )
          })}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
          {r.parts.map((p) => {
            const pct = r.revenue > 0 ? (p.value / r.revenue) * 100 : 0
            return (
              <div key={p.id} className="flex items-start gap-2.5">
                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: p.color, border: p.id === 'overhead' ? RULE : 'none' }} />
                <div>
                  <p className="font-display font-semibold tabular-nums" style={{ fontSize: '1.05rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                    {fmtMoney(p.value)}
                  </p>
                  <p style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--color-label-text)', letterSpacing: '0.04em' }}>
                    {p.label} · {pct.toFixed(0)}%
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-10 text-xs leading-relaxed" style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)', maxWidth: '70ch' }}>
        Take-home is grossed up by the effective tax rate to find owner comp, then team cost and overhead are added to
        reach required revenue. Client count rounds up at your chosen monthly price. Tax rate is an effective all-in
        estimate, not a filing; confirm with your accountant before planning around it.
      </p>
    </div>
  )
}
