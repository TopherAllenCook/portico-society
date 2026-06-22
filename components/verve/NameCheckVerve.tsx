'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { HONEYPOT_FIELD } from '@/lib/security/honeypot'

/**
 * AI Name Check — the top-of-funnel bait tool.
 *
 * The owner types business name, city, and trade. We ask the live answer engines
 * the same question a homeowner asks ("who is the best {trade} near me?") and
 * show, honestly, whether they are named and which businesses come up instead.
 * It shows the symptom and hands off to the full free audit, which explains the
 * why and the fix. No email is required to run it (capture happens at /audit).
 */

type TradeKey = 'plumbing' | 'hvac' | 'electrical' | 'roofing' | 'other'
type Status = 'idle' | 'running' | 'error' | 'done'

interface EngineResult {
  provider: string
  label: string
  grounded: boolean
  reachable: boolean
  named: boolean
  rank: number | null
  companies: string[]
  latency_ms: number
}
interface NameCheckData {
  business: string
  city: string
  trade: TradeKey
  query: string
  engines: EngineResult[]
  named_anywhere: boolean
  engines_returned: number
}

const TRADES: Array<{ key: TradeKey; label: string }> = [
  { key: 'plumbing', label: 'Plumbing' },
  { key: 'hvac', label: 'HVAC' },
  { key: 'electrical', label: 'Electrical' },
  { key: 'roofing', label: 'Roofing' },
  { key: 'other', label: 'Other' },
]

const RULE = '1px solid var(--color-ink-rule)'

const LABEL: CSSProperties = {
  display: 'block',
  fontSize: '0.62rem',
  fontFamily: 'var(--font-mono)',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: 'var(--color-label-text)',
  marginBottom: '0.5rem',
}
const INPUT: CSSProperties = {
  background: 'transparent',
  width: '100%',
  fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  color: 'var(--color-ink)',
  padding: '0.4rem 0 0.5rem',
  letterSpacing: '-0.02em',
}
const HINT: CSSProperties = {
  display: 'block',
  marginTop: '0.4rem',
  fontSize: '0.68rem',
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-ink-muted)',
  letterSpacing: '0.06em',
}

const BULLETS = [
  'See the businesses each AI assistant names for the best in your trade and city, with competitors attached',
  'See, by name, which competitors come up when you do not',
  'AI answers usually surface a short shortlist (often around three names, our estimate). The question is whether you are one of them',
  'Built for plumbing, HVAC, electrical, and roofing owners who are great at the work and invisible online',
  'Free to run, and it points you to the full free audit if you want the why and the fix',
]

export default function NameCheckVerve() {
  const [business, setBusiness] = useState('')
  const [city, setCity] = useState('')
  const [trade, setTrade] = useState<TradeKey>('plumbing')

  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [data, setData] = useState<NameCheckData | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const biz = business.trim()
    const cty = city.trim()
    if (!biz) {
      setStatus('error')
      setErrorMsg('Add your business name so we can look for it.')
      return
    }
    if (cty.length < 2) {
      setStatus('error')
      setErrorMsg('Add your city so we can ask the right local question.')
      return
    }
    setStatus('running')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/name-check/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: biz,
          city: cty,
          trade,
          [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? ''),
        }),
      })
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(
          res.status === 429
            ? 'Too many checks in a short window. Wait a minute and try again.'
            : res.status === 503
              ? 'The AI engines did not respond just now. Try again in a moment.'
              : 'Could not run that. Check your business name and city, then try again.',
        )
        return
      }
      const json = (await res.json()) as { result?: NameCheckData }
      if (!json.result || json.result.engines_returned === 0) {
        setStatus('error')
        setErrorMsg('None of the AI engines returned a usable answer this run. Try again in a moment.')
        return
      }
      setData(json.result)
      setStatus('done')
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Try again.')
    }
  }

  return (
    <section
      id="name-check"
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-sand)' }}
      aria-labelledby="name-check-heading"
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
              Free AI Name Check
            </span>
            <h2
              id="name-check-heading"
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '24ch',
              }}
            >
              Does AI name your business when a homeowner asks?
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
            Three things you already know. We ask the live AI assistants the same question your next customer is asking. No email to run it.
          </p>
        </div>

        {/* Form */}
        {status !== 'done' && (
          <form onSubmit={handleSubmit} noValidate style={{ borderTop: RULE }}>
            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor={HONEYPOT_FIELD}>Company size</label>
              <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-9 py-10 lg:grid-cols-3" style={{ borderBottom: RULE }}>
              {/* Business */}
              <div>
                <label htmlFor="nc-business" style={LABEL}>Business Name</label>
                <input
                  id="nc-business"
                  type="text"
                  placeholder="Acme Plumbing"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  className="verve-calc-input"
                  style={INPUT}
                  aria-label="Your business name"
                />
                <span style={HINT}>Exactly as a customer would say it</span>
              </div>

              {/* City */}
              <div>
                <label htmlFor="nc-city" style={LABEL}>City</label>
                <input
                  id="nc-city"
                  type="text"
                  placeholder="Denver"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="verve-calc-input"
                  style={INPUT}
                  aria-label="Your city"
                />
                <span style={HINT}>Where your customers are</span>
              </div>

              {/* Trade */}
              <div>
                <label htmlFor="nc-trade" style={LABEL}>Trade</label>
                <select
                  id="nc-trade"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value as TradeKey)}
                  className="verve-calc-input"
                  style={{ ...INPUT, appearance: 'none', cursor: 'pointer' }}
                  aria-label="Your trade"
                >
                  {TRADES.map((t) => (
                    <option key={t.key} value={t.key}>{t.label}</option>
                  ))}
                </select>
                <span style={HINT}>What you do</span>
              </div>
            </div>

            <div className="grid gap-10 py-10 lg:grid-cols-2">
              {/* Bullets */}
              <ul className="flex flex-col gap-3">
                {BULLETS.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-relaxed"
                    style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
                  >
                    <span aria-hidden="true" style={{ color: 'var(--color-cinnabar)', fontWeight: 700 }}>·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Run */}
              <div className="flex flex-col items-start justify-center">
                {status === 'error' && errorMsg && (
                  <p className="mb-3 text-sm" role="alert" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}>
                    {errorMsg}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'running'}
                  className="rounded-full px-7 py-3 text-sm font-semibold transition-opacity disabled:opacity-50"
                  style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
                >
                  {status === 'running' ? 'Asking the AI assistants…' : 'Run my Name Check'}
                </button>
                <span className="mt-3 text-xs" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                  {status === 'running'
                    ? 'This takes a few seconds. We are asking each engine live.'
                    : 'Free. Nothing to install. Results in about a minute.'}
                </span>
              </div>
            </div>
          </form>
        )}

        {/* Results */}
        {status === 'done' && data && (() => {
          const reachable = data.engines.filter((e) => e.reachable)
          const allNamed = reachable.length > 0 && reachable.every((e) => e.named)
          const verdict = allNamed
            ? `${data.business} is showing up. Here is exactly where, and how to hold that lead.`
            : data.named_anywhere
              ? `${data.business} shows up in some AI answers, but not all of them.`
              : `${data.business} is not coming up. Competitors are.`
          return (
          <div style={{ borderTop: RULE }}>
            {/* Verdict */}
            <div className="py-10" style={{ borderBottom: RULE }}>
              <p style={{ ...LABEL, color: 'var(--color-cinnabar-dark)' }}>
                When a homeowner asks for the best {TRADES.find((t) => t.key === data.trade)?.label.toLowerCase()} in {data.city}
              </p>
              <p
                className="mt-3 font-display font-semibold"
                style={{
                  fontSize: 'clamp(1.5rem, 3.4vw, 2.4rem)',
                  color: data.named_anywhere ? 'var(--color-ink)' : 'var(--color-cinnabar)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  maxWidth: '26ch',
                }}
              >
                {verdict}
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '60ch' }}>
                AI answers usually surface a short shortlist, often around three names (our estimate). The only question that matters is whether you are on it. Here is what each engine returned just now.
              </p>
            </div>

            {/* Per-engine */}
            <div>
              {data.engines.map((eng, i) => (
                <div key={eng.provider} className="py-7" style={{ borderBottom: RULE, borderTop: i === 0 ? 'none' : undefined }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-display font-semibold" style={{ fontSize: '1.2rem', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>
                      {eng.label}
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-ink-muted)',
                      }}
                    >
                      {eng.grounded ? 'Live web search' : `Based on what ${eng.label} knows`}
                    </span>
                  </div>

                  {!eng.reachable ? (
                    <p className="mt-3 text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
                      {eng.label} did not return a result this run.
                    </p>
                  ) : (
                    <>
                      <p
                        className="mt-2 text-sm font-medium"
                        style={{ color: eng.named ? 'var(--color-ink)' : 'var(--color-cinnabar-dark)', fontFamily: 'var(--font-body)' }}
                      >
                        {eng.named
                          ? `You were named${eng.rank ? ` (position ${eng.rank})` : ''}.`
                          : 'Your business was not named.'}
                      </p>
                      {eng.companies.length > 0 && (
                        <ol className="mt-3 flex flex-col gap-1.5">
                          {eng.companies.map((c, idx) => {
                            const isYou = eng.rank === idx + 1
                            return (
                              <li
                                key={`${eng.provider}-${idx}`}
                                className="text-sm"
                                style={{
                                  color: isYou ? 'var(--color-cinnabar)' : 'var(--color-body-text)',
                                  fontFamily: 'var(--font-body)',
                                  fontWeight: isYou ? 700 : 400,
                                }}
                              >
                                {idx + 1}. {c}{isYou ? ' (you)' : ''}
                              </li>
                            )
                          })}
                        </ol>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Handoff to the audit (the primary next step) */}
            <div
              className="mt-0 px-6 py-8 sm:px-8"
              style={{ borderLeft: RULE, borderRight: RULE, borderBottom: RULE, background: 'var(--color-cta-surface)' }}
            >
              <p className="font-display font-semibold" style={{ fontSize: '1.2rem', color: 'var(--color-ivory)', letterSpacing: '-0.01em' }}>
                That is the symptom. The full audit shows you why, and the fix.
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)', maxWidth: '60ch' }}>
                The Name Check tells you where you stand. The free audit explains how AI tools decide who to name, maps the competitors getting named ahead of you, and lists the specific fixes ranked by impact. You see a live report in about three minutes, and a copy lands in your inbox within 48 hours. No call, no pitch.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link
                  href={`/audit?trade=${data.trade}&city=${encodeURIComponent(data.city)}`}
                  className="rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
                >
                  Get the full free audit
                </Link>
                <button
                  type="button"
                  onClick={() => { setStatus('idle'); setData(null) }}
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)', background: 'transparent' }}
                >
                  Check another business
                </button>
              </div>
            </div>
          </div>
          )
        })()}

        {/* Footnote */}
        <p
          className="mt-8 text-xs leading-relaxed"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)', maxWidth: '70ch' }}
        >
          How this works: we ask each AI assistant the question a homeowner asks and report only the engines that answer this run, labelled by whether they used a live web search or their training knowledge. Results reflect a single live query and can vary between runs. This is a quick check, not the full audit.
        </p>
      </div>
    </section>
  )
}
