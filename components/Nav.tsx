'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: 'var(--color-ivory)',
        borderBottom: '1px solid oklch(14% 0.006 30 / 0.1)',
      }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16"
        aria-label="Primary navigation"
      >
        {/* Stacked wordmark */}
        <Link href="/" aria-label="Verve Longevity Marketing — home" className="flex flex-col leading-none">
          <span
            className="font-display font-normal"
            style={{
              fontSize: '1.125rem',
              letterSpacing: '0.2em',
              color: 'var(--color-ink)',
              lineHeight: 1,
            }}
          >
            VERVE
          </span>
          <span
            className="font-mono font-medium"
            style={{
              fontSize: '0.475rem',
              letterSpacing: '0.26em',
              color: 'oklch(14% 0.006 30 / 0.45)',
              marginTop: '0.25rem',
            }}
          >
            LONGEVITY MARKETING
          </span>
        </Link>

        {/* Desktop center links */}
        <ul className="hidden items-center gap-10 lg:flex" role="list">
          {[
            { label: 'Services', href: '#what-we-engineer' },
            { label: 'Who We Help', href: '#categories' },
            { label: 'How We Work', href: '#how-we-work' },
            { label: 'Selected Work', href: '#selected-work' },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-body text-xs font-medium tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-50"
                style={{ color: 'var(--color-ink)' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="#begin"
            className="font-body inline-flex items-center gap-2 border px-6 py-3 text-xs font-medium tracking-[0.1em] uppercase transition-all duration-200"
            style={{ borderColor: 'oklch(14% 0.006 30 / 0.3)', color: 'var(--color-ink)' }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)'
              e.currentTarget.style.borderColor = 'var(--color-cinnabar)'
              e.currentTarget.style.color = 'var(--color-ivory)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'oklch(14% 0.006 30 / 0.3)'
              e.currentTarget.style.color = 'var(--color-ink)'
            }}
          >
            Elevate Your Clinic
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="border-t px-6 pb-8 pt-6 lg:hidden"
          style={{
            backgroundColor: 'var(--color-ivory)',
            borderColor: 'oklch(14% 0.006 30 / 0.1)',
          }}
        >
          <ul className="flex flex-col gap-0" role="list">
            {[
              { label: 'Services', href: '#what-we-engineer' },
              { label: 'Who We Help', href: '#categories' },
              { label: 'How We Work', href: '#how-we-work' },
              { label: 'Selected Work', href: '#selected-work' },
            ].map(({ label, href }) => (
              <li
                key={href}
                style={{ borderBottom: '1px solid oklch(14% 0.006 30 / 0.08)' }}
              >
                <Link
                  href={href}
                  className="font-body block py-4 text-sm font-medium tracking-[0.08em] uppercase"
                  style={{ color: 'var(--color-ink)' }}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#begin"
            className="font-body mt-6 inline-block w-full py-4 text-center text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200"
            style={{ backgroundColor: 'var(--color-cinnabar)', color: 'var(--color-ivory)' }}
            onClick={() => setOpen(false)}
          >
            Elevate Your Clinic
          </Link>
        </div>
      )}
    </header>
  )
}
