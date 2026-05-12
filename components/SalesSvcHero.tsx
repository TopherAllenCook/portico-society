'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'

const trust = [
  'Audit delivered in 48 hours',
  'No sales call required',
  'Works with your existing website',
]

export default function SalesSvcHero() {
  const [entered, setEntered] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const v = reduced || entered

  function rise(delay: number, dur = 750) {
    return {
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(1.5rem)',
      transition: reduced
        ? 'none'
        : `opacity ${dur}ms ${EXPO} ${delay}ms, transform ${dur}ms ${EXPO} ${delay}ms`,
    }
  }

  function rule(delay: number) {
    return {
      height: '1px',
      backgroundColor: 'var(--color-ink-rule)',
      transform: v ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: 'left' as const,
      transition: reduced ? 'none' : `transform 650ms ${EXPO} ${delay}ms`,
    }
  }

  return (
    <section
      className="relative px-6 pt-40 pb-24 lg:px-16 lg:pt-52 lg:pb-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="sales-hero-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_360px] lg:gap-20 lg:items-start">

          {/* Left: copy */}
          <div>
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-10"
              style={{ color: 'var(--color-label-text)', ...rise(0, 600) }}
            >
              Services
            </p>

            <h1
              id="sales-hero-heading"
              className="font-display italic font-normal leading-none mb-10"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.025em',
              }}
            >
              <span className="block" style={rise(100)}>Be the practice</span>
              <span className="block" style={{ color: 'var(--color-cinnabar)', ...rise(220) }}>AI sends patients to.</span>
            </h1>

            <div aria-hidden="true" style={{ ...rule(380), marginBottom: '2rem' }} />

            <p
              className="font-body font-light leading-relaxed mb-10"
              style={{
                fontSize: '1.0625rem',
                color: 'var(--color-body-text)',
                maxWidth: '46ch',
                ...rise(450),
              }}
            >
              Verve builds AI visibility, paid patient acquisition, and inquiry systems
              that make your practice the one AI recommends — and converts every patient
              who finds you.
            </p>

            {/* Primary + secondary CTA */}
            <div
              className="flex flex-col gap-4 sm:flex-row sm:items-center mb-12"
              style={rise(560)}
            >
              <Link
                href="#begin"
                className="font-body inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cinnabar text-ivory hover:bg-cinnabar-dark"
                style={{ outlineColor: 'var(--color-cinnabar)' }}
              >
                Request the free audit
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="mailto:hello@vervemd.com?subject=Strategy%20Call%20Request"
                className="font-body inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  border: '1px solid var(--color-ink-rule)',
                  color: 'var(--color-ink)',
                  outlineColor: 'var(--color-ink)',
                }}
              >
                Book a strategy call
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2" style={rise(640)}>
              {trust.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.1em] uppercase"
                  style={{ color: 'var(--color-label-text)' }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-cinnabar)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div style={rise(280, 1000)}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/hero-physician.png"
                alt="Physician in private practice"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
                style={{ filter: 'brightness(0.88) saturate(0.6)' }}
              />
            </div>
            <p
              className="font-mono text-xs tracking-[0.1em] mt-3"
              style={{ color: 'var(--color-label-text)' }}
            >
              Longevity medicine · Private practice
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
