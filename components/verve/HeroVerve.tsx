'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HERO } from '@/lib/verve/content'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80'
const TRADES = ['Plumbing', 'HVAC', 'Electrical', 'Roofing']

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

  return (
    <section
      className="relative flex min-h-svh items-center overflow-hidden"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-16 lg:pb-28 lg:pt-36">

        {/* Left: text */}
        <div>
          {/* Trust pill */}
          <div style={rise(0)}>
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
            className="mt-8 font-display font-bold"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              color: 'var(--color-ink)',
            }}
          >
            <span className="block" style={rise(140)}>
              {HERO.headlineLead}
            </span>
            <span
              className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0 italic"
              style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic', ...rise(280) }}
            >
              <span>{HERO.emphasisLeft}</span>
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
                  <path d="M12 2.5l2.2 5.6 5.8.4-4.5 3.9 1.4 5.8L12 14.9l-4.9 3.3 1.4-5.8L4 8.5l5.8-.4z" fill="currentColor" />
                </svg>
              </span>
              <span>{HERO.emphasisRight}</span>
            </span>
          </h1>

          {/* Sub */}
          <p
            className="mt-6 max-w-md text-base leading-relaxed"
            style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', ...rise(420) }}
          >
            {HERO.sub}
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3" style={rise(540)}>
            <Link
              href={HERO.primaryCTA.href}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-medium shadow-[0_3px_0_0_var(--color-cinnabar-dark)] transition-all duration-150 hover:opacity-90 active:translate-y-[2px] active:shadow-[0_1px_0_0_var(--color-cinnabar-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)', outlineColor: 'var(--color-cinnabar)' }}
            >
              {HERO.primaryCTA.label}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href={HERO.secondaryCTA.href}
              className="inline-flex items-center gap-2 rounded-xl border bg-[var(--color-paper)] px-7 py-3.5 text-sm font-medium transition-colors hover:bg-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ borderColor: 'var(--color-ink-rule)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)', outlineColor: 'var(--color-cinnabar)' }}
            >
              {HERO.secondaryCTA.label}
            </Link>
          </div>

          {/* Trade signal */}
          <p
            className="mt-8 text-xs font-medium uppercase tracking-[0.16em]"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-mono)', ...rise(640) }}
          >
            {TRADES.join('  ·  ')}
          </p>
        </div>

        {/* Right: photo */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: '4 / 3', boxShadow: 'var(--shadow-card)', ...rise(220, 1000) }}
        >
          <Image
            src={HERO_IMAGE}
            alt="A roofer working on a residential roof against a warm sky"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  )
}
