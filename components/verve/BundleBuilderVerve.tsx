'use client'

import { useState, useMemo } from 'react'
import { CORE_PACKAGES, AI_SERVICES } from '@/lib/verve/content'
import CTAButton from './CTAButton'

// Conservative monthly revenue impact estimates, based on clinic averages
const PKG_ROI: Record<string, [number, number]> = {
  Essential:      [2500,  7000],
  Growth:         [9000,  24000],
  'Full Service': [20000, 47000],
}

const SYSTEM_ROI: Record<string, [number, number]> = {
  'patient-agent': [2800, 7500],
  'lead-nurture':  [1400, 3800],
  reputation:      [1200, 3500],
  'no-show':       [1100, 3200],
  retention:       [2200, 5500],
}

// Systems already included (and priced into) each package
const PKG_INCLUDES: Record<string, string[]> = {
  Growth:         ['lead-nurture'],
  'Full Service': ['patient-agent', 'no-show', 'retention'],
}

function parsePrice(s: string): number {
  return parseInt(s.replace(/\D/g, ''), 10)
}

function fmtK(n: number): string {
  return n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`
}

export default function BundleBuilderVerve() {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null)
  const [addedAI, setAddedAI] = useState<Set<string>>(new Set())

  const includedAI = useMemo(
    () => new Set<string>(selectedPkg ? (PKG_INCLUDES[selectedPkg] ?? []) : []),
    [selectedPkg],
  )

  const toggleAI = (id: string) => {
    if (includedAI.has(id)) return
    setAddedAI(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const selectPackage = (name: string) => {
    setSelectedPkg(prev => (prev === name ? null : name))
    setAddedAI(new Set()) // reset add-ons when switching plans
  }

  const pkg = CORE_PACKAGES.find(p => p.name === selectedPkg)
  const pkgPrice = pkg ? parsePrice(pkg.price) : 0

  const addOnServices = AI_SERVICES.filter(s => addedAI.has(s.id) && !includedAI.has(s.id))
  const addOnPrice = addOnServices.reduce((sum, s) => sum + parsePrice(s.price), 0)
  const total = pkgPrice + addOnPrice

  // ROI: package baseline already accounts for included AI, so only add extra add-ons
  const [pkgRoiLow, pkgRoiHigh] = selectedPkg ? PKG_ROI[selectedPkg] : [0, 0]
  const addOnRoiLow  = addOnServices.reduce((s, svc) => s + (SYSTEM_ROI[svc.id]?.[0] ?? 0), 0)
  const addOnRoiHigh = addOnServices.reduce((s, svc) => s + (SYSTEM_ROI[svc.id]?.[1] ?? 0), 0)
  const roiLow  = pkgRoiLow  + addOnRoiLow
  const roiHigh = pkgRoiHigh + addOnRoiHigh

  const multipleLow  = total > 0 ? (roiLow  / total).toFixed(1) : null
  const multipleHigh = total > 0 ? (roiHigh / total).toFixed(1) : null

  const hasSelection = selectedPkg !== null || addedAI.size > 0

  return (
    <section
      className="px-6 py-20 lg:px-16 lg:py-28"
      style={{ background: 'var(--color-ink)' }}
      aria-labelledby="builder-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p
            className="text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
          >
            Plan Builder
          </p>
          <h2
            id="builder-heading"
            className="mt-3 font-display font-semibold leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-ivory)', maxWidth: '24ch' }}
          >
            Build your plan. See what it returns.
          </h2>
          <p
            className="mt-3 text-sm"
            style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)', maxWidth: '48ch' }}
          >
            Select a marketing plan, add AI automation systems, and see your estimated monthly revenue impact before you talk to us.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
          {/* LEFT: selection */}
          <div>
            {/* Step 1 */}
            <p
              className="mb-4 text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
            >
              Step 1 — Choose a marketing plan
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {CORE_PACKAGES.map(p => {
                const active = selectedPkg === p.name
                return (
                  <button
                    key={p.name}
                    onClick={() => selectPackage(p.name)}
                    className="rounded-xl p-5 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ivory)]"
                    style={{
                      background: active ? 'var(--color-cinnabar)' : 'var(--color-cta-surface)',
                      border: active ? '1px solid var(--color-cinnabar)' : '1px solid var(--color-ivory-subtle)',
                    }}
                    aria-pressed={active}
                  >
                    <p
                      className="text-xs font-medium uppercase tracking-[0.12em]"
                      style={{ color: active ? 'rgba(255,255,255,0.7)' : 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
                    >
                      {p.tagline}
                    </p>
                    <p
                      className="mt-1.5 font-display font-semibold"
                      style={{ fontSize: '1.1rem', color: 'var(--color-ivory)', letterSpacing: '-0.01em' }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="mt-2 font-display font-bold"
                      style={{ fontSize: '1.5rem', color: 'var(--color-ivory)', letterSpacing: '-0.03em', lineHeight: 1 }}
                    >
                      {p.price}
                      <span className="text-sm font-normal opacity-50">/mo</span>
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Step 2 */}
            <p
              className="mb-4 mt-10 text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
            >
              Step 2 — Add AI automation systems
            </p>
            <div
              style={{ borderTop: '1px solid var(--color-ivory-subtle)' }}
            >
              {AI_SERVICES.map(svc => {
                const included = includedAI.has(svc.id)
                const added = addedAI.has(svc.id)
                const active = included || added

                return (
                  <div
                    key={svc.id}
                    className="flex items-center justify-between gap-4 py-4"
                    style={{ borderBottom: '1px solid var(--color-ivory-subtle)' }}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        onClick={() => toggleAI(svc.id)}
                        disabled={included}
                        aria-pressed={active}
                        aria-label={`${active ? 'Remove' : 'Add'} ${svc.name}`}
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ivory)]"
                        style={{
                          background: active ? 'var(--color-cinnabar)' : 'transparent',
                          border: active ? '1px solid var(--color-cinnabar)' : '1px solid var(--color-ivory-subtle)',
                          cursor: included ? 'default' : 'pointer',
                        }}
                      >
                        {active && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
                        >
                          {svc.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
                        >
                          {svc.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      {included ? (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
                        >
                          Included
                        </span>
                      ) : (
                        <p
                          className="text-sm font-medium"
                          style={{ color: added ? 'var(--color-ivory)' : 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
                        >
                          {svc.price}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT: summary panel */}
          <div className="mt-10 lg:mt-0">
            <div
              className="rounded-2xl p-6 lg:sticky lg:top-28"
              style={{ background: 'var(--color-cta-surface)', border: '1px solid var(--color-ivory-subtle)' }}
            >
              {!hasSelection ? (
                <div className="py-6 text-center">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
                  >
                    Select a plan above to see your estimated investment and return.
                  </p>
                </div>
              ) : (
                <>
                  <p
                    className="mb-4 text-xs font-medium uppercase tracking-[0.16em]"
                    style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
                  >
                    Your plan
                  </p>

                  <div className="flex flex-col gap-2">
                    {pkg && (
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm" style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}>
                          {pkg.name}
                        </span>
                        <span className="text-sm font-medium shrink-0" style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}>
                          {pkg.price}/mo
                        </span>
                      </div>
                    )}
                    {[...includedAI].map(id => {
                      const svc = AI_SERVICES.find(s => s.id === id)
                      return svc ? (
                        <div key={id} className="flex items-baseline justify-between gap-2">
                          <span className="text-xs" style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}>
                            {svc.name}
                          </span>
                          <span className="text-xs shrink-0" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>
                            Included
                          </span>
                        </div>
                      ) : null
                    })}
                    {addOnServices.map(svc => (
                      <div key={svc.id} className="flex items-baseline justify-between gap-2">
                        <span className="text-xs" style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}>
                          {svc.name}
                        </span>
                        <span className="text-xs font-medium shrink-0" style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}>
                          {svc.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="my-5"
                    style={{ borderTop: '1px solid var(--color-ivory-subtle)' }}
                  />

                  <div className="flex items-baseline justify-between">
                    <span
                      className="text-xs font-medium uppercase tracking-[0.12em]"
                      style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
                    >
                      Monthly investment
                    </span>
                    <span
                      className="font-display font-bold"
                      style={{ fontSize: '1.5rem', color: 'var(--color-ivory)', letterSpacing: '-0.03em' }}
                    >
                      ${total.toLocaleString()}
                    </span>
                  </div>

                  {roiLow > 0 && (
                    <div
                      className="mt-5 rounded-xl p-4"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-ivory-subtle)' }}
                    >
                      <p
                        className="text-xs font-medium uppercase tracking-[0.12em] mb-3"
                        style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
                      >
                        Estimated revenue impact
                      </p>
                      <p
                        className="font-display font-bold"
                        style={{ fontSize: '1.6rem', color: 'var(--color-cinnabar-on-dark)', letterSpacing: '-0.03em', lineHeight: 1 }}
                      >
                        {fmtK(roiLow)}–{fmtK(roiHigh)}
                        <span
                          className="text-sm font-normal ml-1"
                          style={{ color: 'var(--color-body-text-on-dark)' }}
                        >
                          /mo
                        </span>
                      </p>
                      {multipleLow && (
                        <p
                          className="mt-1.5 text-xs"
                          style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
                        >
                          {multipleLow}×–{multipleHigh}× return on your monthly investment
                        </p>
                      )}
                      <p
                        className="mt-3 text-xs leading-relaxed"
                        style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)', opacity: 0.6 }}
                      >
                        Estimates based on averages across longevity and aesthetics practices. Results vary.
                      </p>
                    </div>
                  )}

                  <div className="mt-5">
                    <CTAButton
                      href="/audit"
                      label="Start with this plan"
                      variant="primary"
                      className="w-full justify-center"
                    />
                    <p
                      className="mt-3 text-xs text-center leading-relaxed"
                      style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)', opacity: 0.6 }}
                    >
                      We review every clinic before onboarding. No payment until we're both confident it's the right fit.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
