'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HeroV2() {
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

  function rise(delay: number, distance = '2rem'): React.CSSProperties {
    if (!mounted || reduced) return {}
    if (!entered) return { opacity: 0, transform: `translateY(${distance})`, willChange: 'opacity, transform' }
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `opacity 1000ms ${ease} ${delay}ms, transform 1000ms ${ease} ${delay}ms`,
      willChange: 'auto',
    }
  }

  function fade(delay: number, duration = 1200): React.CSSProperties {
    if (!mounted || reduced) return {}
    if (!entered) return { opacity: 0, willChange: 'opacity' }
    return {
      opacity: 1,
      transition: `opacity ${duration}ms ${ease} ${delay}ms`,
      willChange: 'auto',
    }
  }

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="AI visibility for medical practices"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/hero-physician.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '65% center', opacity: 0.28, filter: 'saturate(0.55) brightness(0.85)' }}
        />
        {/* Directional vignette — ink bleeds in from left to keep text readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, var(--color-ink) 0%, oklch(14% 0.006 30 / 0.85) 35%, oklch(14% 0.006 30 / 0.3) 65%, oklch(14% 0.006 30 / 0.55) 100%)',
          }}
        />
        {/* Bottom fade to next section */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '12rem', background: 'linear-gradient(to bottom, transparent, var(--color-ink))' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-28 pt-40 lg:px-16 lg:pb-32 lg:pt-44">
        <div className="mx-auto w-full max-w-5xl">

          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3" style={rise(60)}>
            <span
              className="inline-block h-1 w-1 rounded-full"
              style={{ backgroundColor: 'var(--color-cinnabar)' }}
              aria-hidden="true"
            />
            <p
              className="font-mono text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-cinnabar-on-dark)' }}
            >
              AI Visibility for Elite Medical Practices
            </p>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-normal"
            style={{ letterSpacing: '-0.03em', lineHeight: '0.9' }}
            aria-label="The first name AI speaks wins the patient."
          >
            <span
              className="block"
              style={{
                fontSize: 'clamp(3.25rem, 9.5vw, 8.5rem)',
                color: 'var(--color-ivory)',
                ...rise(160),
              }}
            >
              The first name
            </span>
            <span
              className="block"
              style={{
                fontSize: 'clamp(3.25rem, 9.5vw, 8.5rem)',
                color: 'var(--color-ivory)',
                ...rise(260),
              }}
            >
              AI speaks
            </span>
            <span
              className="block font-display italic"
              style={{
                fontSize: 'clamp(3.25rem, 9.5vw, 8.5rem)',
                color: 'var(--color-cinnabar-on-dark)',
                marginTop: '0.05em',
                ...rise(380),
              }}
            >
              wins the patient.
            </span>
          </h1>

          {/* Supporting italic line */}
          <p
            className="font-display italic font-normal mt-10 lg:mt-12"
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.3rem)',
              color: 'var(--color-body-text-on-dark)',
              maxWidth: '44ch',
              lineHeight: '1.6',
              ...rise(500),
            }}
          >
            Right now, that name is your competitor&rsquo;s. We change that.
          </p>

          {/* CTA cluster */}
          <div className="mt-12 flex flex-wrap items-center gap-5 lg:mt-14" style={rise(620)}>
            <Link
              href="#audit"
              className="font-body inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium bg-cinnabar text-ivory hover:bg-cinnabar-dark transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ outlineColor: 'var(--color-cinnabar)' }}
            >
              Request Free Audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="#services"
              className="font-mono text-xs font-medium uppercase tracking-[0.13em] transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 text-[oklch(97%_0.008_75/0.55)] hover:text-[oklch(97%_0.008_75/0.85)]"
              style={{ outlineColor: 'oklch(97% 0.008 75 / 0.4)' }}
            >
              See Specialties
            </Link>
          </div>

          {/* Trust line */}
          <p
            className="font-mono mt-5 text-xs tracking-[0.1em]"
            style={{ color: 'var(--color-label-text-on-dark)', ...rise(720) }}
          >
            Free. No call required. Delivered within 48 hours.
          </p>
        </div>
      </div>

      {/* Scroll chevron */}
      <div
        className="relative z-10 flex justify-center pb-10"
        aria-hidden="true"
        style={fade(1100, 600)}
      >
        <svg
          width="18" height="10" viewBox="0 0 18 10" fill="none"
          style={{ color: 'var(--color-ink-icon)' }}
        >
          <path d="M1 1l8 8 8-8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
