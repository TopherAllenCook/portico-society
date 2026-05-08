'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Who We Help', href: '#categories' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Selected Work', href: '#selected-work' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Focus trap + Escape key for mobile drawer
  useEffect(() => {
    if (!open) return

    const drawer = drawerRef.current
    if (!drawer) return

    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      if (focusable.length === 0) { e.preventDefault(); return }
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const textColor = 'var(--color-ink)'
  const subColor = scrolled ? 'oklch(14% 0.006 30 / 0.45)' : 'oklch(14% 0.006 30 / 0.5)'
  const ctaBorder = scrolled ? 'oklch(14% 0.006 30 / 0.28)' : 'oklch(14% 0.006 30 / 0.18)'

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--color-ivory)' : 'transparent',
        borderBottom: scrolled
          ? '1px solid oklch(14% 0.006 30 / 0.1)'
          : '1px solid transparent',
      }}
    >
      <nav
        className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center px-6 py-4 lg:px-16"
        aria-label="Primary navigation"
      >
        {/* Stacked wordmark */}
        <Link href="/" aria-label="Verve Longevity Marketing, home" className="flex shrink-0 flex-col leading-none">
          <span
            className="font-display font-normal transition-colors duration-300"
            style={{ fontSize: '1.125rem', letterSpacing: '0.2em', color: textColor, lineHeight: 1 }}
          >
            VERVE
          </span>
          <span
            className="font-mono font-medium transition-colors duration-300"
            style={{ fontSize: '0.475rem', letterSpacing: '0.26em', color: subColor, marginTop: '0.25rem' }}
          >
            LONGEVITY MARKETING
          </span>
        </Link>

        {/* Desktop links — centered in the 1fr middle column */}
        <ul className="hidden items-center justify-center gap-6 md:flex lg:gap-10" role="list">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-body text-xs font-medium uppercase transition-opacity duration-200 hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ letterSpacing: '0.1em', color: textColor }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right column — CTA on desktop, hamburger on mobile */}
        <div className="flex items-center justify-end">
          <div className="hidden md:block">
            <Link
              href="#begin"
              className="font-body inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)', outlineColor: 'var(--color-cinnabar)' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-ink)'
              }}
            >
              Request Your Free Audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle — 44×44px touch target */}
          <button
            ref={toggleRef}
            className="flex h-11 w-11 cursor-pointer items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            onClick={() => setOpen(o => !o)}
            style={{ color: textColor }}
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
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="border-t px-6 pb-8 pt-6 md:hidden"
          style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'oklch(14% 0.006 30 / 0.1)' }}
        >
          <ul className="flex flex-col" role="list">
            {navItems.map(({ label, href }) => (
              <li key={href} style={{ borderBottom: '1px solid oklch(14% 0.006 30 / 0.08)' }}>
                <Link
                  href={href}
                  className="font-body block py-4 text-sm font-medium uppercase"
                  style={{ letterSpacing: '0.08em', color: 'var(--color-ink)' }}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#begin"
            className="font-body mt-6 inline-block w-full rounded-full py-4 text-center text-sm font-medium transition-colors duration-200"
            style={{ letterSpacing: '0.12em', backgroundColor: 'var(--color-cinnabar)', color: 'var(--color-ivory)' }}
            onClick={() => setOpen(false)}
          >
            Request Your Free Audit
          </Link>
        </div>
      )}
    </header>
  )
}
