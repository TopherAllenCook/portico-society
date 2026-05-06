'use client'

import { useState } from 'react'
import RevealOnScroll from './RevealOnScroll'

export default function BeginCTA() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setError('A valid email address is required.')
      return
    }

    // Production: wire to API route / CRM
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
                style={{ color: 'oklch(97% 0.008 75 / 0.55)' }}
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
                  color: 'oklch(97% 0.008 75 / 0.65)',
                  maxWidth: '46ch',
                }}
              >
                Within 48 hours, we analyze your practice across AI recommendation systems,
                identify the gaps your competitors have already claimed, and deliver a specific
                report with prioritized findings.
              </p>

              {/* Sample finding — full border, not side stripe */}
              <blockquote
                className="p-6"
                style={{ border: '1px solid oklch(97% 0.008 75 / 0.2)' }}
              >
                <p
                  className="font-display italic font-normal leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'oklch(97% 0.008 75 / 0.7)' }}
                >
                  &ldquo;Your practice does not appear in any AI-generated recommendations for
                  longevity clinics in your region. Two competitors do. This gap is recoverable
                  within 60 days.&rdquo;
                </p>
                <cite
                  className="font-mono mt-4 block not-italic text-xs tracking-[0.1em] uppercase"
                  style={{ color: 'oklch(97% 0.008 75 / 0.35)' }}
                >
                  Sample finding, Longevity practice, Q1 2025
                </cite>
              </blockquote>

              <p
                className="font-body mt-6 text-sm font-light"
                style={{ color: 'oklch(97% 0.008 75 / 0.45)' }}
              >
                The audit is proof of methodology. No sales call required first.
              </p>
            </div>
          </RevealOnScroll>

          {/* Right: form */}
          <RevealOnScroll delay={100}>
            <div className="lg:flex lg:flex-col lg:justify-center">
              {submitted ? (
                <div
                  className="p-10"
                  style={{ border: '1px solid oklch(97% 0.008 75 / 0.2)' }}
                >
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
                    className="font-body text-sm font-light leading-relaxed"
                    style={{ color: 'oklch(97% 0.008 75 / 0.6)' }}
                  >
                    Expect a report within 48 hours. If your practice is a strong fit, we will
                    follow up with an invitation to review the findings together.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div>
                    <label
                      htmlFor="begin-email"
                      className="font-mono mb-2 block text-xs font-medium tracking-[0.14em] uppercase"
                      style={{ color: 'oklch(97% 0.008 75 / 0.55)' }}
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
                      className="font-body w-full bg-transparent px-5 py-4 text-sm outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                      style={{
                        border: '1px solid oklch(97% 0.008 75 / 0.25)',
                        color: 'var(--color-ivory)',
                      }}
                      aria-describedby={error ? 'begin-error' : undefined}
                    />
                    {error && (
                      <p
                        id="begin-error"
                        role="alert"
                        className="font-body mt-2 text-xs"
                        style={{ color: 'oklch(97% 0.008 75 / 0.8)' }}
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="begin-website"
                      className="font-mono mb-2 block text-xs font-medium tracking-[0.14em] uppercase"
                      style={{ color: 'oklch(97% 0.008 75 / 0.55)' }}
                    >
                      Practice Website
                    </label>
                    <input
                      id="begin-website"
                      type="url"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      placeholder="https://yourpractice.com"
                      className="font-body w-full bg-transparent px-5 py-4 text-sm outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                      style={{
                        border: '1px solid oklch(97% 0.008 75 / 0.25)',
                        color: 'var(--color-ivory)',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="font-body mt-2 w-full cursor-pointer px-8 py-4 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                    style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-cinnabar)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'oklch(97% 0.008 75 / 0.88)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'var(--color-ivory)'
                    }}
                  >
                    Request My Audit
                  </button>

                  <p
                    className="font-body text-center text-xs font-light"
                    style={{ color: 'oklch(97% 0.008 75 / 0.4)' }}
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
