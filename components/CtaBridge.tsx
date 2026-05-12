import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

export default function CtaBridge() {
  return (
    <section
      aria-label="Begin with a free audit"
      className="px-6 py-14 lg:px-16 lg:py-16"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="font-display italic font-normal"
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                color: 'var(--color-ivory)',
                letterSpacing: '-0.02em',
                maxWidth: '44ch',
                lineHeight: 1.4,
              }}
            >
              The audit tells you exactly where you stand. Most practices know which path they need within the first read.
            </p>
            <Link
              href="#begin"
              className="font-body inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cinnabar text-ivory hover:bg-cinnabar-dark flex-shrink-0"
              style={{ outlineColor: 'var(--color-cinnabar)' }}
            >
              Request the free audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
