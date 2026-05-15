'use client'

import { useState } from 'react'
import RevealOnScroll from './RevealOnScroll'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_RE = /^https?:\/\/.+/

export default function BeginCTA() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedEmail = email.trim()
    const trimmedWebsite = website.trim()

    if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
      setError('A valid work email address is required.')
      return
    }

    if (trimmedWebsite && !URL_RE.test(trimmedWebsite)) {
      setError('Practice website must begin with https:// or http://.')
      return
    }

    // TODO: wire to API route / CRM before launch
    setSubmitted(true)
  }

  return (
    <section
      id="begin"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-cta-surface)' }}
      aria-labelledby="begin-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left: copy */}
          <RevealOnScroll>
            <div>
              <p
                className="font-mono mb-6 text-xs font-medium tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-label-text-on-dark)' }}
              >
                Start Here
              </p>
              <h2
                id="begin-heading"
                className="font-display font-normal leading-snug mb-6"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                  color: 'var(--color-ivory)',
                }}
              >
                Request a free AI visibility audit.
              </h2>
              <p
                className="font-body mb-8 font-light leading-relaxed"
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-body-text-on-dark)',
                  maxWidth: '46ch',
                }}
              >
                Within 48 hours, we analyze your practice across AI recommendation
                systems, identify the gaps your competitors have already claimed, and
                deliver a specific report with prioritized findings.
              </p>
              <p
                className="font-body text-sm font-light"
                style={{ color: 'var(--color-label-text-on-dark)' }}
              >
                The audit is proof of methodology.
              </p>
            </div>
          </RevealOnScroll>

          {/* Right: form */}
          <RevealOnScroll delay={100}>
            <div className="lg:flex lg:flex-col lg:justify-center">
              {submitted ? (
                <div
                  role="status"
                  className="p-8 lg:p-10"
                  style={{ border: '1px solid var(--color-ivory-muted)' }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <p
                      className="font-mono text-xs font-medium tracking-[0.14em] uppercase"
                      style={{ color: 'var(--color-cinnabar-on-dark)' }}
                    >
                      Received
                    </p>
                    <div
                      style={{ height: '1px', flex: 1, backgroundColor: 'var(--color-ivory-dim)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <p
                    className="font-display font-normal leading-snug mb-4"
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                      color: 'var(--color-ivory)',
                    }}
                  >
                    Audit request received.
                  </p>
                  <p
                    className="font-body text-sm font-light leading-relaxed mb-6"
                    style={{ color: 'var(--color-body-text-on-dark)', maxWidth: '44ch' }}
                  >
                    Your report will be sent to{' '}
                    <span style={{ color: 'var(--color-ivory)' }}>{email.trim()}</span>{' '}
                    within 48 hours. It covers:
                  </p>
                  <ul className="space-y-2.5 mb-7">
                    {[
                      'AI Search Visibility: which platforms name you',
                      'Competitive Gap Analysis: who appears instead',
                      'Citation and Authority Audit: where the gaps are',
                      'Prioritized Findings: three to five specific actions',
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-body font-light text-sm"
                        style={{ color: 'var(--color-body-text-on-dark)' }}
                      >
                        <span
                          className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--color-cinnabar)' }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p
                    className="font-body text-xs font-light"
                    style={{ color: 'var(--color-label-text-on-dark)' }}
                  >
                    No call will be scheduled without your request.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div>
                    <label
                      htmlFor="begin-email"
                      className="font-mono mb-2 block text-xs font-medium tracking-[0.14em] uppercase"
                      style={{ color: 'var(--color-label-text-on-dark)' }}
                    >
                      Work Email
                    </label>
                    <input
                      id="begin-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@yourpractice.com"
                      required
                      className="font-body w-full bg-transparent px-5 py-4 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        border: '1px solid var(--color-ivory-muted)',
                        color: 'var(--color-ivory)',
                        outline: 'none',
                        outlineColor: 'var(--color-ivory-glow)',
                      }}
                      aria-describedby={error ? 'begin-error' : undefined}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="begin-website"
                      className="font-mono mb-2 block text-xs font-medium tracking-[0.14em] uppercase"
                      style={{ color: 'var(--color-label-text-on-dark)' }}
                    >
                      Practice Website{' '}
                      <span className="normal-case font-normal tracking-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="begin-website"
                      type="url"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      placeholder="https://yourpractice.com"
                      className="font-body w-full bg-transparent px-5 py-4 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        border: '1px solid var(--color-ivory-muted)',
                        color: 'var(--color-ivory)',
                        outline: 'none',
                        outlineColor: 'var(--color-ivory-glow)',
                      }}
                      aria-describedby={error ? 'begin-error' : undefined}
                    />
                  </div>

                  {error && (
                    <p
                      id="begin-error"
                      role="alert"
                      className="font-body text-xs"
                      style={{ color: 'var(--color-body-text-on-dark)' }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="font-body mt-2 w-full cursor-pointer rounded-full px-8 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-ivory text-cinnabar hover:bg-stone"
                    style={{ outlineColor: 'var(--color-ivory-glow)' }}
                  >
                    Request My Audit
                  </button>

                  <p
                    className="font-body text-center text-xs font-light"
                    style={{ color: 'var(--color-label-text-on-dark)' }}
                  >
                    No sales call required. The audit comes first.
                  </p>
                </form>
              )}
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  )
}
