'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden px-8 pt-32 pb-0 lg:px-16 lg:pt-0"
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
        }}
        aria-hidden="true"
      >
        For the practice patients find when they ask AI.
      </p>

      {/* Main content */}
      <div className="relative flex flex-1 flex-col justify-center">

        {/* Eyebrow — mobile only */}
        <p
          className="font-mono mb-10 text-xs font-medium uppercase tracking-[0.15em] lg:hidden"
          style={{ color: 'var(--color-cinnabar)' }}
        >
          For the practice patients find when they ask AI.
        </p>

        {/* Headline */}
        <h1
          className="font-display font-normal"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 9.5rem)',
            lineHeight: '0.97',
            letterSpacing: '-0.025em',
            color: 'var(--color-ink)',
          }}
        >
          Your patients<br />
          ask ChatGPT<br />
          who to see.<br />
          <span style={{ color: 'var(--color-cinnabar)' }}>Be the answer.</span>
        </h1>

        {/* CTA cluster */}
        <div className="mt-14 lg:mt-16">
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
            Get My Free Audit
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
      <div className="flex justify-center pb-12">
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
