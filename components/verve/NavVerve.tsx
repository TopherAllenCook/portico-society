'use client'

import Link from 'next/link'
import { useState } from 'react'
import CTAButton from './CTAButton'

export default function NavVerve() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 lg:px-16"
      style={{ background: 'linear-gradient(to bottom, var(--color-ink), transparent)' }}
    >
      <Link
        href="/"
        className="font-display text-xl font-semibold tracking-tight"
        style={{ color: 'var(--color-ivory)' }}
      >
        Verve MD
      </Link>

      <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
        <Link
          href="/#services"
          className="text-sm font-medium transition-opacity hover:opacity-100 opacity-70"
          style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
        >
          Services
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-medium transition-opacity hover:opacity-100 opacity-70"
          style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
        >
          Pricing
        </Link>
        <Link
          href="/audit"
          className="text-sm font-medium transition-opacity hover:opacity-100 opacity-70"
          style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
        >
          Free Audit
        </Link>
        <CTAButton href="/audit" label="Get Free Audit" variant="primary" />
      </nav>

      <button
        className="md:hidden p-2"
        style={{ color: 'var(--color-ivory)' }}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-4 p-6 md:hidden"
          style={{ background: 'var(--color-ink)', borderTop: '1px solid var(--color-ivory-muted)' }}
        >
          <Link href="/#services" className="text-sm font-medium" style={{ color: 'var(--color-ivory)' }} onClick={() => setOpen(false)}>Services</Link>
          <Link href="/pricing" className="text-sm font-medium" style={{ color: 'var(--color-ivory)' }} onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/audit" className="text-sm font-medium" style={{ color: 'var(--color-ivory)' }} onClick={() => setOpen(false)}>Free Audit</Link>
          <CTAButton href="/audit" label="Get Free Audit" variant="primary" className="w-fit" />
        </div>
      )}
    </header>
  )
}
