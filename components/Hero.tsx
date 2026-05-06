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
      className="relative flex min-h-svh flex-col overflow-hidden px-6 pt-32 pb-0 lg:px-16 lg:pt-0"
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
          width: 'clamp(340px, 48vw, 680px)',
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
            sizes="(max-width: 1024px) 0px, 48vw"
            className="object-cover object-center"
            style={{ filter: 'brightness(0.9) saturate(0.9)' }}
          />
          {/* Left edge fade — dissolves photo into ivory so headline stays readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to right, var(--color-ivory) 0%, oklch(97% 0.008 75 / 0.5) 20%, transparent 40%)',
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
          className="relative mb-10 -mx-6 h-56 overflow-hidden lg:hidden"
          style={fade(60, 700)}
        >
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 0px"
            className="object-cover object-center"
            style={{ filter: 'brightness(0.9) saturate(0.9)' }}
          />
        </div>

        {/* Headline — mixed scale: setup lines build to a massive punchline */}
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
              color: 'oklch(14% 0.006 30 / 0.5)',
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

        {/* Single editorial statement */}
        <p
          className="font-display italic font-normal mt-10 lg:mt-12"
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            color: 'oklch(14% 0.006 30 / 0.45)',
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
      <div className="flex justify-center pb-12" style={fade(900, 500)}>
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
