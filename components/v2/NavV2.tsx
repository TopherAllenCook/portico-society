'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NavV2() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '#services', label: 'Specialties' },
    { href: '#process', label: 'How It Works' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'oklch(14% 0.006 30 / 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(97% 0.008 75 / 0.07)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-16">

        <Link
          href="/v2"
          className="font-display italic text-xl font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ color: 'var(--color-ivory)', outlineColor: 'oklch(97% 0.008 75 / 0.4)' }}
        >
          Verve
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs font-medium uppercase tracking-[0.13em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ color: 'oklch(97% 0.008 75 / 0.45)', outlineColor: 'oklch(97% 0.008 75 / 0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-ivory)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'oklch(97% 0.008 75 / 0.45)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#audit"
            className="font-body rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ backgroundColor: 'var(--color-cinnabar)', color: 'var(--color-ivory)', outlineColor: 'var(--color-cinnabar)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-cinnabar-dark)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-cinnabar)' }}
          >
            Request Audit
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: 'oklch(97% 0.008 75 / 0.4)' }}
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-controls="v2-mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <line
              x1="0" y1="1" x2="22" y2="1"
              stroke="white" strokeWidth="1.5" strokeLinecap="round"
              style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none', transformOrigin: '2px 50%', transition: 'transform 250ms ease' }}
            />
            <line
              x1="0" y1="8" x2="22" y2="8"
              stroke="white" strokeWidth="1.5" strokeLinecap="round"
              style={{ opacity: menuOpen ? 0 : 1, transition: 'opacity 150ms ease' }}
            />
            <line
              x1="0" y1="15" x2="22" y2="15"
              stroke="white" strokeWidth="1.5" strokeLinecap="round"
              style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none', transformOrigin: '2px 50%', transition: 'transform 250ms ease' }}
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="v2-mobile-menu"
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '20rem' : '0',
          backgroundColor: 'oklch(14% 0.006 30 / 0.97)',
          backdropFilter: 'blur(20px)',
        }}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-6 px-6 pb-10 pt-4" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm font-medium uppercase tracking-[0.13em]"
              style={{ color: 'oklch(97% 0.008 75 / 0.6)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#audit"
            onClick={() => setMenuOpen(false)}
            className="font-body inline-block rounded-full px-6 py-3 text-sm font-medium text-center"
            style={{ backgroundColor: 'var(--color-cinnabar)', color: 'var(--color-ivory)' }}
          >
            Request Audit
          </Link>
        </nav>
      </div>
    </header>
  )
}
