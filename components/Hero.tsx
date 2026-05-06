'use client'

import Image from 'next/image'
import Link from 'next/link'

const PHOTO =
  'https://images.unsplash.com/photo-1584226761916-3fd67ab3c5ae?w=1600&q=90&auto=format&fit=crop'

const LOGOS = [
  'Meridian Longevity',
  'Apex Concierge',
  'Nova Aesthetic',
  'Cedar Wellness',
  'Summit Health',
]

export default function Hero() {
  return (
    <section
      className="relative min-h-svh overflow-hidden flex flex-col"
      style={{ backgroundColor: 'oklch(8% 0.008 25)' }}
      aria-label="Hero"
    >
      {/* Background photo */}
      <Image
        src={PHOTO}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ filter: 'brightness(0.35) saturate(0.55)' }}
        aria-hidden="true"
      />

      {/* Left-weighted gradient for headline legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, oklch(8% 0.008 25 / 0.94) 0%, oklch(8% 0.008 25 / 0.72) 42%, oklch(8% 0.008 25 / 0.22) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom gradient for logo bar legibility */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '200px',
          background: 'linear-gradient(to top, oklch(8% 0.008 25 / 0.92) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative flex min-h-svh flex-col px-8 pt-32 pb-0 lg:px-16 lg:pt-40">

        {/* Main content — centered vertically in remaining space */}
        <div className="flex flex-1 flex-col justify-center">

          {/* Eyebrow */}
          <p
            className="font-mono mb-8 text-xs font-medium uppercase"
            style={{ letterSpacing: '0.22em', color: 'var(--color-cinnabar)' }}
          >
            For the practice patients find when they ask AI.
          </p>

          {/* Headline + right tagline grid */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[3fr_1fr]">

            {/* Massive all-caps headline */}
            <h1
              className="font-display font-normal"
              style={{
                fontSize: 'clamp(3rem, 9.5vw, 9rem)',
                lineHeight: '0.92',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'oklch(97% 0.008 75)',
              }}
            >
              Be first<br />
              when they<br />
              ask ChatGPT<br />
              <span style={{ color: 'var(--color-cinnabar)' }}>or Claude.</span>
            </h1>

            {/* Right three-part tagline — desktop only */}
            <div
              className="hidden lg:flex flex-col items-end gap-2 text-right"
              aria-label="What we do"
            >
              {[
                { text: 'AI Driven.', accent: false },
                { text: 'Practice Focused.', accent: false },
                { text: 'Results First.', accent: true },
              ].map(({ text, accent }) => (
                <p
                  key={text}
                  className="font-mono font-medium uppercase"
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    color: accent
                      ? 'var(--color-cinnabar)'
                      : 'oklch(97% 0.008 75 / 0.6)',
                  }}
                >
                  {text}
                </p>
              ))}
              <span
                className="mt-5 font-mono select-none"
                style={{ fontSize: '1.25rem', color: 'oklch(97% 0.008 75 / 0.18)', lineHeight: 1 }}
                aria-hidden="true"
              >
                +
              </span>
            </div>
          </div>

          {/* CTA button */}
          <div className="mt-12">
            <Link
              href="#begin"
              className="font-mono inline-flex items-center gap-3 border px-8 py-4 text-xs font-medium uppercase transition-colors duration-200"
              style={{
                letterSpacing: '0.16em',
                borderColor: 'var(--color-cinnabar)',
                color: 'var(--color-cinnabar)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)'
                e.currentTarget.style.color = 'oklch(97% 0.008 75)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--color-cinnabar)'
              }}
            >
              Run My AI Visibility Audit
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
          </div>
        </div>

        {/* Logo bar — anchored to bottom */}
        <div className="mt-16 pb-10">
          <div
            className="pt-6"
            style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.1)' }}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
              <p
                className="font-mono text-xs uppercase leading-snug flex-shrink-0"
                style={{ letterSpacing: '0.14em', color: 'oklch(97% 0.008 75 / 0.35)' }}
              >
                Trusted by leading<br className="hidden lg:block" />
                {' '}longevity practices
              </p>

              {/* Vertical divider */}
              <div
                className="hidden lg:block h-6 w-px"
                style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.12)' }}
                aria-hidden="true"
              />

              <ul className="flex flex-wrap gap-x-8 gap-y-2" role="list">
                {LOGOS.map(name => (
                  <li
                    key={name}
                    className="font-mono text-xs uppercase"
                    style={{ letterSpacing: '0.18em', color: 'oklch(97% 0.008 75 / 0.3)' }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 flex justify-center">
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              aria-hidden="true"
              style={{ color: 'oklch(97% 0.008 75 / 0.28)' }}
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
        </div>

      </div>
    </section>
  )
}
