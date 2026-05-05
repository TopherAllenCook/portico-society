'use client'

import { useState } from 'react'

export default function AuditCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    // In production, wire to an API route / CRM
    setSubmitted(true)
  }

  return (
    <section
      id="audit"
      className="bg-terracotta px-6 py-24 lg:px-16 lg:py-32"
      aria-labelledby="audit-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20">
          {/* Left: copy */}
          <div>
            <p
              className="font-body mb-6 text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: 'oklch(92% 0.03 40 / 0.55)' }}
            >
              No Obligation
            </p>
            <h2
              id="audit-heading"
              className="font-display font-normal leading-tight text-parchment"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
            >
              Request a Free
              <br />
              AI Visibility Audit.
            </h2>
            <p
              className="font-body mt-6 max-w-[48ch] text-base font-light leading-relaxed"
              style={{ color: 'oklch(97% 0.006 62 / 0.6)' }}
            >
              Within 24 hours, our system analyzes your brand&apos;s digital footprint — search
              visibility, competitive gaps, AI indexing status, and paid performance — and
              delivers a specific report with prioritized findings.
            </p>
            <p
              className="font-body mt-4 text-sm font-light"
              style={{ color: 'oklch(97% 0.006 62 / 0.4)' }}
            >
              The audit is the first conversation. It is also proof of the methodology.
            </p>
          </div>

          {/* Right: form */}
          <div className="mt-12 lg:mt-0 lg:flex lg:flex-col lg:justify-center">
            {submitted ? (
              <div
                className="border p-8"
                style={{ borderColor: 'oklch(92% 0.03 40 / 0.4)' }}
              >
                <p
                  className="font-display font-normal leading-snug text-parchment"
                  style={{ fontSize: 'var(--text-title)' }}
                >
                  Your audit request is received.
                </p>
                <p
                  className="font-body mt-4 text-sm font-light"
                  style={{ color: 'oklch(97% 0.006 62 / 0.6)' }}
                >
                  Expect a report within 24 hours. If your brand is a strong fit, our team
                  will follow up with an invitation to review the findings together.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                noValidate
              >
                <div>
                  <label
                    htmlFor="audit-email"
                    className="font-body mb-2 block text-xs font-medium tracking-[0.12em] uppercase"
                    style={{ color: 'oklch(97% 0.006 62 / 0.55)' }}
                  >
                    Your Work Email
                  </label>
                  <input
                    id="audit-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@yourbrand.com"
                    required
                    className="font-body w-full border bg-transparent px-5 py-4 text-sm text-parchment placeholder-parchment/30 outline-none transition-all duration-200"
                    style={{
                      borderColor: 'oklch(97% 0.006 62 / 0.25)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'oklch(97% 0.006 62 / 0.6)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'oklch(97% 0.006 62 / 0.25)' }}
                    aria-describedby={error ? 'audit-error' : undefined}
                  />
                  {error && (
                    <p
                      id="audit-error"
                      role="alert"
                      className="font-body mt-2 text-xs"
                      style={{ color: 'oklch(92% 0.03 40)' }}
                    >
                      {error}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="audit-brand"
                    className="font-body mb-2 block text-xs font-medium tracking-[0.12em] uppercase"
                    style={{ color: 'oklch(97% 0.006 62 / 0.55)' }}
                  >
                    Your Brand Website
                  </label>
                  <input
                    id="audit-brand"
                    type="url"
                    placeholder="https://yourbrand.com"
                    className="font-body w-full border bg-transparent px-5 py-4 text-sm text-parchment placeholder-parchment/30 outline-none transition-all duration-200"
                    style={{ borderColor: 'oklch(97% 0.006 62 / 0.25)' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'oklch(97% 0.006 62 / 0.6)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'oklch(97% 0.006 62 / 0.25)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="font-body mt-2 w-full bg-parchment px-8 py-4 text-xs font-semibold tracking-[0.12em] uppercase text-terracotta transition-all duration-200"
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(92% 0.03 40)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'oklch(97% 0.006 62)' }}
                >
                  Request My Free Audit
                </button>

                <p
                  className="font-body text-center text-xs font-light"
                  style={{ color: 'oklch(97% 0.006 62 / 0.35)' }}
                >
                  No sales call required. We send the audit first.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
