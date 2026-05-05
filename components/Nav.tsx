'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#results', label: 'Results' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? 'oklch(97% 0.006 62 / 0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(88% 0.005 55)' : 'none',
      }}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10"
        aria-label="Primary navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-sm font-medium tracking-[0.18em] uppercase"
          style={{ color: scrolled ? 'oklch(16% 0.006 35)' : 'oklch(97% 0.006 62)' }}
          aria-label="Portico Society — Home"
        >
          Portico Society
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-body text-xs font-medium tracking-[0.12em] uppercase transition-opacity duration-200 hover:opacity-60"
              style={{ color: scrolled ? 'oklch(16% 0.006 35)' : 'oklch(97% 0.006 62)' }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#audit"
            className="font-body ml-4 border px-5 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-all duration-200"
            style={{
              borderColor: scrolled ? 'oklch(47% 0.135 33)' : 'oklch(97% 0.006 62)',
              color: scrolled ? 'oklch(47% 0.135 33)' : 'oklch(97% 0.006 62)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.backgroundColor = 'oklch(47% 0.135 33)'
              el.style.color = 'oklch(97% 0.006 62)'
              el.style.borderColor = 'oklch(47% 0.135 33)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.backgroundColor = 'transparent'
              el.style.color = scrolled ? 'oklch(47% 0.135 33)' : 'oklch(97% 0.006 62)'
              el.style.borderColor = scrolled ? 'oklch(47% 0.135 33)' : 'oklch(97% 0.006 62)'
            }}
          >
            Request Audit
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block h-px w-5 transition-all duration-300"
              style={{
                backgroundColor: scrolled || menuOpen ? 'oklch(16% 0.006 35)' : 'oklch(97% 0.006 62)',
                transform:
                  menuOpen && i === 0 ? 'translateY(6px) rotate(45deg)'
                  : menuOpen && i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : menuOpen && i === 1 ? 'scaleX(0)' : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="overflow-hidden transition-all duration-500 lg:hidden"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          backgroundColor: 'oklch(97% 0.006 62)',
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-1 px-6 pb-8 pt-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-body border-b py-4 text-sm font-medium tracking-[0.12em] uppercase text-inkwell"
              style={{ borderColor: 'oklch(88% 0.005 55)' }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#audit"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-terracotta py-4 text-center font-body text-xs font-medium tracking-[0.1em] uppercase text-parchment"
          >
            Request Free Audit
          </Link>
        </div>
      </div>
    </header>
  )
}
