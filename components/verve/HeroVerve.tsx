'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HERO } from '@/lib/verve/content'

// Floating chips placed at anchor points on the ring perimeter.
// Each anchor: angle in degrees, measured clockwise from 12 o'clock.
// 0 = top, 90 = right, 180 = bottom, 270 = left.
// Angles pulled to the sides so chips sit clear of the trust pill (top center)
// and the CTAs (bottom center).
const CHIPS = [
  { label: 'Plumbing',   accent: 'cinnabar', angle: 290 }, // upper-left
  { label: 'HVAC',       accent: 'ink',      angle: 70  }, // upper-right
  { label: 'Electrical', accent: 'cinnabar', angle: 245 }, // lower-left
  { label: 'Roofing',    accent: 'ink',      angle: 115 }, // lower-right
] as const

const RING_DIAMETER = 'min(720px, 82vmin)'

export default function HeroVerve() {
  const [entered, setEntered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const ease = 'cubic-bezier(0.16,1,0.3,1)'

  function rise(delay: number, duration = 900): React.CSSProperties {
    if (!mounted) return {}
    if (!entered) return { opacity: 0, transform: 'translateY(1.5rem)', willChange: 'opacity, transform' }
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `opacity ${duration}ms ${ease} ${delay}ms, transform ${duration}ms ${ease} ${delay}ms`,
      willChange: 'auto',
    }
  }

  function chipRise(delay: number, x: string, y: string): React.CSSProperties {
    const settled = `translate(-50%, -50%) translate(${x}, ${y}) scale(1)`
    const pending = `translate(-50%, -50%) translate(${x}, ${y}) scale(0.5)`
    if (!mounted) return { transform: settled }
    if (!entered) return { opacity: 0, transform: pending, willChange: 'opacity, transform' }
    return {
      opacity: 1,
      transform: settled,
      transition: `opacity 1100ms ${ease} ${delay}ms, transform 1100ms ${ease} ${delay}ms`,
      willChange: 'auto',
    }
  }

  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="hero-heading"
    >
      {/* Decorative ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 hidden md:block"
        style={{
          width: RING_DIAMETER,
          height: RING_DIAMETER,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1.5px dashed var(--color-ink-ring)',
        }}
      />

      {/* Floating specialty chips on the ring */}
      {CHIPS.map((chip, i) => {
        // Convert clockwise-from-12 angle to (x, y) offset on the ring.
        const rad = (chip.angle * Math.PI) / 180
        const dx = `calc(${RING_DIAMETER} / 2 * ${Math.sin(rad).toFixed(4)})`
        const dy = `calc(${RING_DIAMETER} / 2 * ${(-Math.cos(rad)).toFixed(4)})`
        const dotColor = chip.accent === 'cinnabar' ? 'var(--color-cinnabar)' : 'var(--color-ink)'
        return (
          <span
            key={chip.label}
            className="absolute hidden items-center gap-2 rounded-full border bg-[var(--color-paper)] px-3.5 py-1.5 text-xs font-medium md:flex"
            style={{
              top: '50%',
              left: '50%',
              borderColor: 'var(--color-ink-rule)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
              boxShadow: 'var(--shadow-chip)',
              ...chipRise(620 + i * 90, dx, dy),
            }}
            aria-hidden="true"
          >
            <span aria-hidden="true" style={{ background: dotColor, width: 8, height: 8, borderRadius: '50%' }} />
            {chip.label}
          </span>
        )
      })}

      {/* Center content */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-36 text-center lg:px-16 lg:pb-32 lg:pt-44">
        {/* Trust pill */}
        <div className="flex justify-center" style={rise(0)}>
          <span
            className="inline-flex items-center gap-2 rounded-full border bg-[var(--color-paper)] px-4 py-1.5 text-xs font-medium"
            style={{
              borderColor: 'var(--color-ink-rule)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
              boxShadow: 'var(--shadow-pill)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 1.2l1.4 3.1 3.4.3-2.6 2.2.8 3.3L6 8.4 3 10.1l.8-3.3L1.2 4.6l3.4-.3z"
                fill="var(--color-cinnabar)"
              />
            </svg>
            {HERO.pill}
          </span>
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="mt-10 font-display font-bold"
          style={{
            fontSize: 'clamp(2.75rem, 7.5vw, 5.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: 'var(--color-ink)',
          }}
        >
          <span className="block" style={rise(140)}>
            {HERO.headlineLead}
          </span>
          <span
            className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-0 italic"
            style={{
              color: 'var(--color-cinnabar)',
              fontStyle: 'italic',
              ...rise(280),
            }}
          >
            <span>{HERO.emphasisLeft}</span>

            {/* Inline cinnabar mark (clipzy-style) */}
            <span
              aria-hidden="true"
              className="inline-flex shrink-0 items-center justify-center"
              style={{
                width: '0.95em',
                height: '0.95em',
                borderRadius: '0.22em',
                background: 'var(--color-cinnabar)',
                color: 'var(--color-ivory)',
                transform: 'translateY(-0.05em)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" width="62%" height="62%" aria-hidden="true">
                <path
                  d="M12 2.5l2.2 5.6 5.8.4-4.5 3.9 1.4 5.8L12 14.9l-4.9 3.3 1.4-5.8L4 8.5l5.8-.4z"
                  fill="currentColor"
                />
              </svg>
            </span>

            <span>{HERO.emphasisRight}</span>
          </span>
        </h1>

        {/* Sub */}
        <p
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed"
          style={{
            color: 'var(--color-body-text)',
            fontFamily: 'var(--font-body)',
            ...rise(420),
          }}
        >
          {HERO.sub}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3" style={rise(540)}>
          <Link
            href={HERO.primaryCTA.href}
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              background: 'var(--color-ink)',
              color: 'var(--color-ivory)',
              fontFamily: 'var(--font-body)',
              outlineColor: 'var(--color-cinnabar)',
            }}
          >
            {HERO.primaryCTA.label}
            <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href={HERO.secondaryCTA.href}
            className="inline-flex items-center gap-2 rounded-full border bg-[var(--color-paper)] px-7 py-3.5 text-sm font-medium transition-colors hover:bg-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              borderColor: 'var(--color-ink-rule)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
              outlineColor: 'var(--color-cinnabar)',
            }}
          >
            {HERO.secondaryCTA.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
