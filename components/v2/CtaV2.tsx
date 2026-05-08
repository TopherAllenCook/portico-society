'use client'

import { useState } from 'react'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function CtaV2() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="audit"
      className="relative px-6 py-24 lg:px-16 lg:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--color-cta-surface)' }}
      aria-label="Request your free audit"
    >
      {/* Ambient cinnabar glow — upper right */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: '-15%',
          right: '-8%',
          width: '45%',
          aspectRatio: '1',
          background: 'radial-gradient(circle, oklch(44% 0.16 27 / 0.14) 0%, transparent 68%)',
        }}
      />
      {/* Lower left counter-glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: '-20%',
          left: '-5%',
          width: '35%',
          aspectRatio: '1',
          background: 'radial-gradient(circle, oklch(44% 0.16 27 / 0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">

        <RevealOnScroll>
          <p
            className="font-mono mb-8 text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: 'var(--color-cinnabar-on-dark)' }}
          >
            Begin
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2
            className="font-display font-normal"
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 6.5rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.035em',
              lineHeight: '0.95',
            }}
          >
            Your audit.
          </h2>
          <h2
            className="font-display italic font-normal mb-12"
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 6.5rem)',
              color: 'oklch(97% 0.008 75 / 0.35)',
              letterSpacing: '-0.035em',
              lineHeight: '0.95',
            }}
          >
            48 hours.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll>
          <p
            className="font-body font-light leading-relaxed mb-12"
            style={{ fontSize: '1rem', color: 'oklch(97% 0.008 75 / 0.5)', maxWidth: '52ch' }}
          >
            Enter your practice email. We will audit your AI search visibility, map the competitive gap,
            and deliver the findings within 48 hours. No sales call. No obligation.
            The audit is the proof.
          </p>
        </RevealOnScroll>

        {submitted ? (
          <RevealOnScroll>
            <div
              className="inline-flex flex-col gap-2 rounded-xl px-8 py-6"
              style={{ border: '1px solid oklch(97% 0.008 75 / 0.12)' }}
            >
              <p
                className="font-display italic font-normal"
                style={{ fontSize: '1.25rem', color: 'var(--color-ivory)' }}
              >
                Audit requested.
              </p>
              <p
                className="font-mono text-xs font-medium uppercase tracking-[0.12em]"
                style={{ color: 'oklch(97% 0.008 75 / 0.35)' }}
              >
                Expect delivery within 48 hours.
              </p>
            </div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll>
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <label htmlFor="v2-email" className="sr-only">
                  Practice email address
                </label>
                <input
                  id="v2-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@practice.com"
                  className="flex-1 rounded-full px-6 py-4 text-sm font-light outline-none transition-all duration-200"
                  style={{
                    backgroundColor: 'oklch(97% 0.008 75 / 0.06)',
                    border: '1px solid oklch(97% 0.008 75 / 0.15)',
                    color: 'var(--color-ivory)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'oklch(97% 0.008 75 / 0.35)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'oklch(97% 0.008 75 / 0.15)' }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full px-8 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--color-cinnabar)',
                    color: 'var(--color-ivory)',
                    outlineColor: 'var(--color-cinnabar)',
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.backgroundColor = 'var(--color-cinnabar-dark)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)' }}
                >
                  {submitting ? 'Sending…' : 'Request Free Audit'}
                </button>
              </div>
              {error && (
                <p
                  role="alert"
                  className="mt-3 font-body text-sm"
                  style={{ color: 'var(--color-cinnabar-on-dark)' }}
                >
                  {error}
                </p>
              )}
            </form>
          </RevealOnScroll>
        )}

        <RevealOnScroll>
          <p
            className="font-mono mt-6 text-xs tracking-[0.1em]"
            style={{ color: 'oklch(97% 0.008 75 / 0.25)' }}
          >
            Free. No call required. Findings first, then we talk if it makes sense.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
