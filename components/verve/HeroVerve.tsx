'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HERO } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function HeroVerve() {
  const [entered, setEntered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const ease = 'cubic-bezier(0.16,1,0.3,1)'

  function rise(delay: number): React.CSSProperties {
    if (!mounted) return {}
    if (!entered) return { opacity: 0, transform: 'translateY(1.5rem)', willChange: 'opacity, transform' }
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `opacity 900ms ${ease} ${delay}ms, transform 900ms ${ease} ${delay}ms`,
      willChange: 'auto',
    }
  }

  return (
    <section
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-24 pt-36 lg:px-16 lg:pt-44"
      style={{ background: 'var(--color-ink)' }}
      aria-label="Verve MD — marketing for longevity and aesthetics clinics"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p
          className="mb-6 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)', ...rise(0) }}
        >
          {HERO.eyebrow}
        </p>

        <h1
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(2.75rem, 7vw, 6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--color-ivory)',
            maxWidth: '18ch',
            ...rise(100),
          }}
        >
          {HERO.headline}
        </h1>

        <p
          className="mt-7 text-lg leading-relaxed"
          style={{
            color: 'var(--color-body-text-on-dark)',
            maxWidth: '48ch',
            fontFamily: 'var(--font-body)',
            ...rise(220),
          }}
        >
          {HERO.sub}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4" style={rise(340)}>
          <CTAButton href={HERO.primaryCTA.href} label={HERO.primaryCTA.label} variant="primary" />
          <Link
            href={HERO.secondaryCTA.href}
            className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
          >
            {HERO.secondaryCTA.label} ↓
          </Link>
        </div>

        <div
          className="mt-16 flex flex-col gap-6 border-t pt-10 sm:flex-row sm:gap-12"
          style={{ borderColor: 'var(--color-ivory-subtle)', ...rise(460) }}
        >
          {HERO.stats.map((stat) => (
            <div key={stat.value}>
              <p
                className="font-display text-4xl font-semibold"
                style={{ color: 'var(--color-ivory)', letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </p>
              <p
                className="mt-1 text-xs leading-snug"
                style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)', maxWidth: '18ch' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
