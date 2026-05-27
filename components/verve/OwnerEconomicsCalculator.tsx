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

const RESIDENCY = [
  { id: 'nyc', label: 'NYC resident', rate: 46, sub: '~46% · NY + NYC + fed' },
  { id: 'fl', label: 'FL-domiciled · ≤180 NY days', rate: 32, sub: '~32% · no state/city tax' },
] as const

function requiredFor(rate: number, takeHome: number, teamCost: number, overhead: number, pricePerClient: number) {
  const ownerComp = takeHome / (1 - rate / 100)
  const revenue = ownerComp + teamCost + overhead
  const clients = Math.ceil(revenue / 12 / pricePerClient)
  return { ownerComp, revenue, clients }
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

  const scenarios = useMemo(() => {
    const nyc = requiredFor(46, takeHome, teamCost, overhead, pricePerClient)
    const fl = requiredFor(32, takeHome, teamCost, overhead, pricePerClient)
    return { nyc, fl, revSaved: nyc.revenue - fl.revenue, clientsSaved: nyc.clients - fl.clients }
  }, [takeHome, teamCost, overhead, pricePerClient])

  const sliders: SliderConfig[] = [
    { id: 'takehome', label: 'Take-home target (after tax)', min: 50_000, max: 2_000_000, step: 10_000, value: takeHome, set: setTakeHome, fmt: fmtMoney, hint: 'Cash in your pocket, after all personal tax' },
    { id: 'taxrate', label: 'Effective personal tax rate', min: 25, max: 55, step: 1, value: taxRate, set: setTaxRate, fmt: (n) => `${n}%`, hint: 'Set by residency above · drag to fine-tune' },
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
          revenue dollar goes update as you slide. Toggle tax residency to see the gap between living in NYC full-time
          and keeping it part-time.
        </p>
      </div>

      {/* Body */}
      <div className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-2" style={{ borderTop: RULE, paddingTop: '2.5rem' }}>
        {/* Inputs */}
        <div className="flex flex-col gap-9">
          <p style={LABEL}>Your assumptions</p>

          {/* Residency toggle */}
          <div>
            <label style={LABEL}>Tax residency</label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {RESIDENCY.map((opt) => {
                const active = taxRate === opt.rate
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTaxRate(opt.rate)}
                    aria-pressed={active}
                    className="rounded-md px-3 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cinnabar)]"
                    style={{ border: active ? '1px solid var(--color-cinnabar)' : RULE, background: active ? 'var(--color-cinnabar)' : 'transparent' }}
                  >
                    <span className="block" style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500, color: active ? 'var(--color-ivory)' : 'var(--color-ink)' }}>
                      {opt.label}
                    </span>
                    <span className="mt-0.5 block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.04em', color: active ? 'var(--color-ivory-body-on-accent)' : 'var(--color-ink-muted)' }}>
                      {opt.sub}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

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

      {/* Residency comparison */}
      <div className="mt-14" style={{ borderTop: RULE, paddingTop: '2.5rem' }}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p style={LABEL}>Residency comparison</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-ink-muted)', letterSpacing: '0.04em' }}>
            same take-home, team, overhead &amp; price
          </p>
        </div>
        <div className="mt-5 grid gap-px sm:grid-cols-2" style={{ background: 'var(--color-ink-rule)', border: RULE }}>
          {[
            { id: 'nyc', tag: 'NYC resident', rate: '~46%', s: scenarios.nyc, accent: false },
            { id: 'fl', tag: 'FL-domiciled · ≤180 NY days', rate: '~32%', s: scenarios.fl, accent: true },
          ].map((col) => (
            <div key={col.id} className="px-6 py-7" style={{ background: 'var(--color-ivory)' }}>
              <p style={{ ...LABEL, marginBottom: '0.75rem' }}>
                {col.tag} <span style={{ color: 'var(--color-ink-muted)' }}>· {col.rate}</span>
              </p>
              <p className="font-display font-semibold tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: col.accent ? 'var(--color-cinnabar)' : 'var(--color-ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {fmtMoney(col.s.revenue)}
                <span className="font-body" style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--color-ink-muted)', marginLeft: '0.4rem' }}>/ yr</span>
              </p>
              <p className="mt-2.5 text-sm" style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}>
                {col.s.clients} clients at {fmtMoney(pricePerClient)}/mo · {fmtMoney(col.s.ownerComp)} owner comp
              </p>
            </div>
          ))}
        </div>
        {scenarios.revSaved > 0 && (
          <p className="mt-5 text-sm leading-relaxed" style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '72ch' }}>
            Living mostly outside New York cuts the required revenue by{' '}
            <span style={{ color: 'var(--color-cinnabar)', fontWeight: 600 }}>{fmtMoney(scenarios.revSaved)}/yr</span>
            {scenarios.clientsSaved > 0 && (
              <> and <span style={{ color: 'var(--color-cinnabar)', fontWeight: 600 }}>{scenarios.clientsSaved} fewer client{scenarios.clientsSaved === 1 ? '' : 's'}</span></>
            )}
            {' '}for the same {fmtMoney(takeHome)} take-home.
          </p>
        )}
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
        reach required revenue. Client count rounds up at your chosen monthly price. Rates are effective all-in
        estimates, not filings: the FL scenario assumes you genuinely change domicile and stay under New York&apos;s
        183-day statutory-residency line, which is fact-based and aggressively audited. Confirm with a NY-residency
        CPA or tax attorney before planning around any of this.
      </p>
    </div>
  )
}
