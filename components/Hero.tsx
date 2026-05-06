'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [entered, setEntered] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const ease = 'cubic-bezier(0.16,1,0.3,1)'

  function rise(delayMs: number): React.CSSProperties {
    if (reduced) return {}
    return {
      opacity: entered ? 1 : 0,
      transform: entered ? 'translateY(0)' : 'translateY(1.25rem)',
      transition: `opacity 640ms ${ease} ${delayMs}ms, transform 640ms ${ease} ${delayMs}ms`,
    }
  }

  function fade(delayMs: number, durationMs = 800): React.CSSProperties {
    if (reduced) return {}
    return {
      opacity: entered ? 1 : 0,
      transition: `opacity ${durationMs}ms ${ease} ${delayMs}ms`,
    }
  }

  const photoSrc =
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
  const photoAlt =
    'Healthcare practitioner at a consultation table, warm afternoon light'

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden px-8 pt-32 pb-0 lg:px-16 lg:pt-0"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="Hero"
    >
      {/* Rotated eyebrow — desktop spine, left edge */}
      <p
        className="absolute left-3 top-1/2 hidden lg:block font-mono text-xs font-medium uppercase"
        style={{
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
          letterSpacing: '0.2em',
          color: 'var(--color-cinnabar)',
          ...fade(0, 500),
        }}
        aria-hidden="true"
      >
        For the practice patients find when they ask AI.
      </p>

      {/* Desktop photo — bleeds from right edge, sits behind text layer */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden lg:block"
        style={{
          width: 'clamp(280px, 40vw, 580px)',
          zIndex: 0,
          ...fade(180, 1100),
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            priority
            sizes="(max-width: 1024px) 0px, 40vw"
            className="object-cover object-center"
            style={{ filter: 'brightness(0.88) saturate(0.82)' }}
          />
          {/* Left edge fade — dissolves photo into ivory so headline stays readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to right, var(--color-ivory) 0%, oklch(97% 0.008 75 / 0.55) 28%, transparent 54%)',
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-1 flex-col justify-center" style={{ zIndex: 1 }}>

        {/* Eyebrow — mobile only */}
        <p
          className="font-mono mb-6 text-xs font-medium uppercase tracking-[0.15em] lg:hidden"
          style={{ color: 'var(--color-cinnabar)', ...rise(0) }}
        >
          For the practice patients find when they ask AI.
        </p>

        {/* Mobile photo strip — between eyebrow and headline */}
        <div
          className="relative mb-10 -mx-8 h-44 overflow-hidden lg:hidden"
          style={fade(60, 700)}
        >
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 0px"
            className="object-cover object-center"
            style={{ filter: 'brightness(0.88) saturate(0.82)' }}
          />
        </div>

        {/* Headline — type-led stagger, one line at a time */}
        <h1
          className="font-display font-normal"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 9.5rem)',
            lineHeight: '0.97',
            letterSpacing: '-0.025em',
            color: 'var(--color-ink)',
          }}
        >
          <span className="block" style={rise(80)}>Your patients</span>
          <span className="block" style={rise(210)}>ask ChatGPT</span>
          <span className="block" style={rise(340)}>who to see.</span>
          <span
            className="block"
            style={{ color: 'var(--color-cinnabar)', ...rise(500) }}
          >
            Be the answer.
          </span>
        </h1>

        {/* Benefit bullets */}
        <div className="mt-10 flex flex-col gap-3" style={rise(480)}>
          {[
            { lead: 'Know where you stand.', detail: 'Free AI audit delivered in 48 hours.' },
            { lead: 'Patients who already chose.', detail: 'Appear when they ask AI who to see.' },
            { lead: 'Authority that compounds.', detail: 'Organic visibility — not ad spend that stops.' },
          ].map(({ lead, detail }) => (
            <p
              key={lead}
              className="font-body text-sm font-light"
              style={{ color: 'oklch(14% 0.006 30 / 0.6)' }}
            >
              <strong
                className="font-medium"
                style={{ color: 'var(--color-ink)' }}
              >
                {lead}
              </strong>{' '}
              {detail}
            </p>
          ))}
        </div>

        {/* CTA cluster */}
        <div className="mt-12 lg:mt-14" style={rise(660)}>
          <Link
            href="#begin"
            className="font-mono inline-flex items-center gap-3 px-8 py-4 text-xs font-medium uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              letterSpacing: '0.16em',
              backgroundColor: 'var(--color-cinnabar)',
              color: 'var(--color-ivory)',
              outlineColor: 'var(--color-cinnabar)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'oklch(34% 0.08 54)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)'
            }}
          >
            Request Your Free Audit
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 7h10M7.5 3l4.5 4-4.5 4"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <p
            className="font-mono mt-4 text-xs tracking-[0.1em]"
            style={{ color: 'oklch(14% 0.006 30 / 0.7)' }}
          >
            Free. No call required. Delivered within 48 hours.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-12" style={fade(800, 500)}>
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          aria-hidden="true"
          style={{ color: 'oklch(14% 0.006 30 / 0.25)' }}
        >
          <path
            d="M1 1l9 9 9-9"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
