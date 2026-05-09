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
    const trimmed = email.trim()
    if (!trimmed) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email address.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
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
      id="begin"
      className="relative px-6 py-24 lg:px-16 lg:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--color-cta-surface)' }}
      aria-label="Request your free audit"
    >
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
              color: 'var(--color-label-text-on-dark)',
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
            style={{ fontSize: '1rem', color: 'var(--color-body-text-on-dark)', maxWidth: '52ch' }}
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
              style={{ border: '1px solid var(--color-ivory-dim)' }}
            >
              <p
                className="font-display italic font-normal"
                style={{ fontSize: '1.25rem', color: 'var(--color-ivory)' }}
              >
                Audit requested.
              </p>
              <p
                className="font-mono text-xs font-medium uppercase tracking-[0.12em]"
                style={{ color: 'var(--color-label-text-on-dark)' }}
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
                  className="flex-1 rounded-full px-6 py-4 text-sm font-light transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: 'oklch(97% 0.008 75 / 0.06)',
                    border: '1px solid var(--color-ivory-dim)',
                    color: 'var(--color-ivory)',
                    outlineColor: 'var(--color-cinnabar)',
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full px-8 py-4 text-sm font-medium bg-cinnabar text-ivory hover:bg-cinnabar-dark transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50"
                  style={{ outlineColor: 'var(--color-cinnabar)' }}
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
            style={{ color: 'var(--color-label-text-on-dark)' }}
          >
            Free. No call required. Findings first, then we talk if it makes sense.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
