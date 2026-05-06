'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{ borderBottom: '1px solid oklch(14% 0.006 30 / 0.08)' }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.92)', backdropFilter: 'blur(12px)' }}
        aria-hidden="true"
      />
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-16"
        aria-label="Primary navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display font-normal tracking-tight"
          style={{ fontSize: '1.125rem', color: 'var(--color-ink)' }}
          aria-label="Verve Clinic Marketing — home"
        >
          Verve
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 lg:flex" role="list">
          {[
            { label: 'What We Do', href: '#what-we-engineer' },
            { label: 'How We Work', href: '#how-we-work' },
            { label: 'Specialties', href: '#categories' },
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

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="#begin"
            className="font-body inline-block border px-6 py-3 text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-200"
            style={{
              borderColor: 'oklch(14% 0.006 30 / 0.25)',
              color: 'var(--color-ink)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-ink)'
              e.currentTarget.style.color = 'var(--color-ivory)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--color-ink)'
            }}
          >
            Request Audit
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
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

      {/* Mobile menu */}
      {open && (
        <div
          className="relative border-t px-6 pb-8 pt-6 lg:hidden"
          style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'oklch(14% 0.006 30 / 0.08)' }}
        >
          <ul className="flex flex-col gap-5" role="list">
            {[
              { label: 'What We Do', href: '#what-we-engineer' },
              { label: 'How We Work', href: '#how-we-work' },
              { label: 'Specialties', href: '#categories' },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-sm font-medium tracking-[0.08em] uppercase"
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
            className="font-body mt-8 inline-block w-full border py-4 text-center text-xs font-medium tracking-[0.1em] uppercase"
            style={{ borderColor: 'oklch(14% 0.006 30 / 0.25)', color: 'var(--color-ink)' }}
            onClick={() => setOpen(false)}
          >
            Request Audit
          </Link>
        </div>
      )}
    </header>
  )
}
