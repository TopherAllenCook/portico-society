'use client'

import Image from 'next/image'
import Link from 'next/link'

function GrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 14l4.5-5.5 4 3 7-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 3H18v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PatientIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function RevenueIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="12.5" width="3.5" height="5.5" rx="0.75" stroke="currentColor" strokeWidth="1.4" />
      <rect x="8.25" y="8" width="3.5" height="10" rx="0.75" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14.5" y="3" width="3.5" height="15" rx="0.75" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

const benefits = [
  { icon: <GrowIcon />, label: 'Grow your practice' },
  { icon: <PatientIcon />, label: 'Attract the right patients' },
  { icon: <RevenueIcon />, label: 'Build lasting revenue' },
]

const PHOTO =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=90&auto=format&fit=crop'

export default function Hero() {
  return (
    <section aria-label="Hero" className="pt-16 lg:pt-0">
      {/* Mobile photo strip — sits below the fixed nav */}
      <div className="relative h-64 sm:h-80 lg:hidden">
        <Image
          src={PHOTO}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: 'brightness(0.92) saturate(1.05)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'oklch(55% 0.04 50 / 0.08)' }}
          aria-hidden="true"
        />
      </div>

      {/* Desktop split grid */}
      <div
        className="grid lg:min-h-svh"
        style={{ gridTemplateColumns: '1fr 1fr' }}
      >
        {/* Left copy panel */}
        <div
          className="flex flex-col justify-between px-8 pb-12 pt-12 lg:px-16 lg:pb-16 lg:pt-44"
          style={{ backgroundColor: 'var(--color-ivory)' }}
        >
          {/* Upper content block */}
          <div>
            {/* Eyebrow */}
            <p
              className="font-mono mb-6 text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: 'var(--color-cinnabar)' }}
            >
              Strategy. Visibility. Growth.
            </p>

            {/* Thin rule */}
            <div
              className="mb-8"
              style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.12)' }}
              aria-hidden="true"
            />

            {/* Headline */}
            <h1
              className="font-display font-normal leading-[0.92] mb-8"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 5rem)',
                color: 'var(--color-ink)',
                maxWidth: '17ch',
              }}
            >
              Marketing that makes your practice the{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-cinnabar)' }}>answer.</em>
            </h1>

            {/* Subhead */}
            <p
              className="font-body mb-10 font-light leading-relaxed"
              style={{
                fontSize: 'clamp(0.9375rem, 1.25vw, 1.0625rem)',
                color: 'oklch(14% 0.006 30 / 0.6)',
                maxWidth: '46ch',
              }}
            >
              Most practices are invisible to AI search. Patients ask ChatGPT, Perplexity, and
              Gemini for a recommendation. Three competitors appear. Your practice doesn't. The
              audit tells you exactly what it would take to change that.
            </p>

            {/* Primary CTA */}
            <Link
              href="#begin"
              className="font-body inline-flex items-center gap-3 px-8 py-4 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200"
              style={{ backgroundColor: 'var(--color-cinnabar)', color: 'var(--color-ivory)' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'oklch(44% 0.18 28)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)'
              }}
            >
              Let&apos;s elevate your clinic
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Lower: benefit tags pinned to bottom on desktop */}
          <div className="mt-12 lg:mt-0">
            <div
              className="mb-8"
              style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
              aria-hidden="true"
            />
            <div className="grid grid-cols-3 gap-4">
              {benefits.map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-3">
                  <span style={{ color: 'var(--color-cinnabar)' }}>{icon}</span>
                  <span
                    className="font-mono text-xs font-medium uppercase leading-snug"
                    style={{ letterSpacing: '0.1em', color: 'oklch(14% 0.006 30 / 0.5)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right photo panel — desktop only */}
        <div className="relative hidden lg:block">
          <Image
            src={PHOTO}
            alt=""
            fill
            priority
            sizes="52vw"
            className="object-cover"
            style={{ filter: 'brightness(0.92) saturate(1.05)' }}
            aria-hidden="true"
          />
          {/* Subtle warm cast to match ivory palette */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'oklch(55% 0.04 50 / 0.08)' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
