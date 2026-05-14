'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
      className="relative min-h-svh overflow-hidden"
      style={{ background: 'var(--color-ink)' }}
      aria-label="Verve MD — marketing for longevity and aesthetics clinics"
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 lg:grid-cols-[1fr_380px] lg:gap-0">

        {/* Text column */}
        <div className="flex flex-col justify-center px-6 pb-24 pt-36 lg:px-16 lg:py-44">
          <p
            className="mb-6 text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)', ...rise(0) }}
          >
            {HERO.eyebrow}
          </p>

          <h1
            className="font-display font-semibold"
            style={{
              fontSize: 'clamp(2.75rem, 5.5vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--color-ivory)',
              maxWidth: '16ch',
              ...rise(100),
            }}
          >
            {HERO.headline}
          </h1>

          <p
            className="mt-7 text-lg leading-relaxed"
            style={{
              color: 'var(--color-body-text-on-dark)',
              maxWidth: '44ch',
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
              className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ivory-glow)] focus-visible:opacity-100"
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

        {/* Image column — hidden on mobile */}
        <div className="relative hidden lg:block">
          <Image
            src="https://picsum.photos/seed/verve-clinic/760/1200"
            alt="Modern longevity clinic treatment room"
            fill
            className="object-cover"
            style={{ opacity: 0.6 }}
            priority
          />
          {/* Fade edge toward text column */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, var(--color-ink) 0%, transparent 40%)',
            }}
            aria-hidden="true"
          />
          {/* Subtle bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, var(--color-ink) 0%, transparent 30%)',
            }}
            aria-hidden="true"
          />
        </div>

      </div>
    </section>
  )
}
