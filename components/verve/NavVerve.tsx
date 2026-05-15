'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import CTAButton from './CTAButton'

const NAV_LINK = 'text-sm font-medium transition-opacity hover:opacity-100 opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm'

interface NavVerveProps {
  /** Use ink text + ivory fade when the hero below is on a light surface. Default false (dark hero). */
  light?: boolean
}

export default function NavVerve({ light = false }: NavVerveProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const textColor = light ? 'var(--color-ink)' : 'var(--color-ivory)'
  const fadeFrom = light ? 'var(--color-ivory)' : 'var(--color-ink)'
  const focusOutline = light ? 'var(--color-cinnabar)' : 'var(--color-ivory-glow)'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 lg:px-16"
      style={{ background: `linear-gradient(to bottom, ${fadeFrom}, transparent)` }}
    >
      <Link
        href="/"
        className="font-display text-xl font-semibold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
        style={{ color: textColor, outlineColor: focusOutline }}
      >
        Verve MD
      </Link>

      <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
        <Link href="/#services" className={NAV_LINK} style={{ color: textColor, outlineColor: focusOutline, fontFamily: 'var(--font-body)' }}>
          Services
        </Link>
        <Link href="/ai" className={NAV_LINK} style={{ color: textColor, outlineColor: focusOutline, fontFamily: 'var(--font-body)' }}>
          AI
        </Link>
        <Link href="/pricing" className={NAV_LINK} style={{ color: textColor, outlineColor: focusOutline, fontFamily: 'var(--font-body)' }}>
          Pricing
        </Link>
        <Link href="/audit" className={NAV_LINK} style={{ color: textColor, outlineColor: focusOutline, fontFamily: 'var(--font-body)' }}>
          Free Audit
        </Link>
        <CTAButton href="/audit" label="Get Free Audit" variant="primary" />
      </nav>

      <button
        className="md:hidden p-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ color: textColor, outlineColor: focusOutline }}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute top-full left-0 right-0 flex flex-col gap-4 p-6 md:hidden"
        style={{
          background: light ? 'var(--color-ivory)' : 'var(--color-ink)',
          borderTop: `1px solid ${light ? 'var(--color-ink-rule)' : 'var(--color-ivory-muted)'}`,
        }}
      >
        <Link href="/#services" className={NAV_LINK} style={{ color: textColor }} onClick={() => setOpen(false)}>Services</Link>
        <Link href="/ai" className={NAV_LINK} style={{ color: textColor }} onClick={() => setOpen(false)}>AI</Link>
        <Link href="/pricing" className={NAV_LINK} style={{ color: textColor }} onClick={() => setOpen(false)}>Pricing</Link>
        <Link href="/audit" className={NAV_LINK} style={{ color: textColor }} onClick={() => setOpen(false)}>Free Audit</Link>
        <CTAButton href="/audit" label="Get Free Audit" variant="primary" className="w-fit" />
      </div>
    </header>
  )
}
