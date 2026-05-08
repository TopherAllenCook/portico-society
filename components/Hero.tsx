'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [entered, setEntered] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setMounted(true)
    setReduced(mq.matches)
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const ease = 'cubic-bezier(0.16,1,0.3,1)'

  function rise(delayMs: number): React.CSSProperties {
    if (!mounted || reduced) return {}
    if (!entered) return { opacity: 0, transform: 'translateY(1.25rem)', willChange: 'opacity, transform' }
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `opacity 640ms ${ease} ${delayMs}ms, transform 640ms ${ease} ${delayMs}ms`,
      willChange: 'auto',
    }
  }

  function fade(delayMs: number, durationMs = 800): React.CSSProperties {
    if (!mounted || reduced) return {}
    if (!entered) return { opacity: 0, willChange: 'opacity' }
    return {
      opacity: 1,
      transition: `opacity ${durationMs}ms ${ease} ${delayMs}ms`,
      willChange: 'auto',
    }
  }

  const photoSrc = '/hero-physician.png'
  const photoAlt =
    'Longevity medicine physician reviewing biomarker data in a private consultation suite'

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden px-6 pt-24 pb-0 lg:px-16 lg:pt-0"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="AI visibility for medical practices"
    >
      {/* Desktop photo — fills right 64% of viewport at every breakpoint, no width ceiling */}
      <div
        className="absolute top-0 bottom-0 hidden lg:block"
        style={{
          left: 'clamp(620px, 38%, 920px)',
          right: 0,
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
            sizes="(max-width: 1024px) 0px, 62vw"
            className="object-cover"
            style={{ objectPosition: '45% center', filter: 'brightness(0.92) saturate(0.88)' }}
          />
          {/* Gradient: ivory at left edge, dissolves into photo — text stays in ivory zone */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to right, var(--color-ivory) 0%, var(--color-ivory-mid) 28%, transparent 52%)',
            }}
          />
        </div>
      </div>

      {/* Main content — pb shifts the flex:center anchor upward in the viewport */}
      <div
        className="relative flex flex-1 flex-col justify-start pt-6 pb-16 lg:justify-center lg:pt-24 lg:pb-[clamp(2rem,8vh,10rem)]"
        style={{ zIndex: 1 }}
      >
        {/* Eyebrow — mobile only */}
        <p
          className="font-mono mb-6 text-xs font-medium uppercase tracking-[0.15em] lg:hidden"
          style={{ color: 'var(--color-cinnabar)', ...rise(0) }}
        >
          For the practice patients find when they ask AI.
        </p>

        {/* Mobile photo strip */}
        <div
          className="relative mb-10 -mx-6 overflow-hidden lg:hidden"
          style={{ height: 'clamp(160px, 26vh, 224px)', ...fade(60, 700) }}
        >
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 0px"
            className="object-cover"
            style={{ objectPosition: '55% center', filter: 'brightness(0.92) saturate(0.88)' }}
          />
        </div>

        {/* Headline — setup lines build to a cinnabar punchline */}
        <h1 className="font-display font-normal" style={{ letterSpacing: '-0.025em' }}>
          <span
            className="block"
            style={{
              fontSize: 'clamp(2.25rem, 7.5vw, 5.5rem)',
              lineHeight: '1.0',
              color: 'var(--color-ink)',
              ...rise(80),
            }}
          >
            Your patients
          </span>
          <span
            className="block"
            style={{
              fontSize: 'clamp(2.25rem, 7.5vw, 5.5rem)',
              lineHeight: '1.0',
              color: 'var(--color-ink)',
              ...rise(190),
            }}
          >
            ask ChatGPT
          </span>
          <span
            className="block"
            style={{
              fontSize: 'clamp(2.25rem, 7.5vw, 5.5rem)',
              lineHeight: '1.05',
              color: 'var(--color-ink-muted)',
              ...rise(300),
            }}
          >
            who to see.
          </span>
          <span
            className="block"
            style={{
              fontSize: 'clamp(4.5rem, 16vw, 11rem)',
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
              color: 'var(--color-cinnabar)',
              marginTop: '0.1em',
              ...rise(450),
            }}
          >
            Be the answer.
          </span>
        </h1>

        {/* Editorial statement */}
        <p
          className="font-display italic font-normal mt-10 lg:mt-12"
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            color: 'var(--color-body-text)',
            maxWidth: '42ch',
            lineHeight: '1.5',
            ...rise(580),
          }}
        >
          The first name AI speaks wins the patient. Right now, that name is your competitor&rsquo;s.
        </p>

        {/* CTA cluster */}
        <div className="mt-12 lg:mt-14" style={rise(680)}>
          <Link
            href="#begin"
            className="font-body inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium bg-cinnabar text-ivory hover:bg-cinnabar-dark transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ outlineColor: 'var(--color-cinnabar)' }}
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
            style={{ color: 'var(--color-label-text)' }}
          >
            Free. No call required. Delivered within 48 hours.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-12" style={fade(900, 500)}>
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          aria-hidden="true"
          style={{ color: 'var(--color-ink-icon)' }}
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
