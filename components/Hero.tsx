'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative min-h-svh flex flex-col justify-center px-6 pt-32 pb-24 lg:px-16 lg:pt-40 lg:pb-32"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="Hero"
    >
      {/* Vertical rule — left edge texture on large screens */}
      <div
        className="absolute left-0 top-0 hidden h-full w-px lg:block"
        style={{ backgroundColor: 'oklch(14% 0.006 30 / 0.07)' }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-5xl">

        {/* Eyebrow — pulsing availability signal */}
        <div className="mb-8 flex items-center gap-3">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{
              backgroundColor: 'var(--color-cinnabar)',
              animation: 'pulse-dot 2.4s ease-in-out infinite',
            }}
            aria-hidden="true"
          />
          <p
            className="font-mono text-xs font-medium tracking-[0.16em] uppercase"
            style={{ color: 'oklch(14% 0.006 30 / 0.55)' }}
          >
            Now working with longevity practices in 4 states. 3 spots open this quarter.
          </p>
        </div>

        {/* Thin rule */}
        <div
          className="mb-10"
          style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
          aria-hidden="true"
        />

        {/* Headline */}
        <h1
          className="font-display font-normal leading-[0.92]"
          style={{
            fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)',
            color: 'var(--color-ink)',
            maxWidth: '18ch',
          }}
        >
          Be the answer{' '}
          <em
            className="not-italic"
            style={{ color: 'oklch(14% 0.006 30 / 0.45)', fontStyle: 'normal' }}
          >
            high net worth patients
          </em>{' '}
          are already asking AI for.
        </h1>

        {/* Thin rule */}
        <div
          className="mt-10 mb-8"
          style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
          aria-hidden="true"
        />

        {/* Subhead + CTAs row */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p
            className="font-body font-light leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'oklch(14% 0.006 30 / 0.65)',
              maxWidth: '58ch',
            }}
          >
            Most practices are invisible to AI search. Patients ask ChatGPT, Perplexity, and Gemini
            for a recommendation. Three competitors appear. Your practice doesn't. The audit tells you
            exactly what it would take to change that.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start xl:flex-row xl:items-center">
            <Link
              href="#begin"
              className="font-body inline-block bg-ink px-8 py-4 text-xs font-medium tracking-[0.12em] uppercase text-ivory transition-colors duration-200"
              style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = 'var(--color-cinnabar)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = 'var(--color-ink)'
              }}
            >
              Run my AI visibility audit
            </Link>
            <Link
              href="#what-we-engineer"
              className="font-body inline-flex items-center gap-2 px-2 py-4 text-xs font-medium tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-50"
              style={{ color: 'oklch(14% 0.006 30 / 0.55)' }}
            >
              Begin a conversation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
