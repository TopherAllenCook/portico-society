'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const NAV_LINK =
  'text-sm transition-opacity hover:opacity-100 opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm'

const FOCUS_LIGHT = 'focus-visible:outline-[var(--color-cinnabar)]'
const FOCUS_DARK = 'focus-visible:outline-[var(--color-ivory-glow)]'

const CAL_LINK = 'christopher-cook-jfcxhu/verve-discovery'
const CAL_NAMESPACE = 'verve-discovery'

const LINKS = [
  { label: 'Services', href: '/#matrix' },
  { label: 'AI', href: '/ai' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// clipped-corner pill (matches the cinematic CTA)
const PILL_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))'

interface NavVerveProps {
  /** Charcoal text for pages whose hero is cream. Default false (dark hero → cream text). */
  light?: boolean
}

export default function NavVerve({ light = false }: NavVerveProps) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setStuck(window.scrollY > 24)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const textColor = light ? 'var(--color-ink)' : 'var(--color-ivory)'
  const focusClass = light ? FOCUS_LIGHT : FOCUS_DARK
  const stuckBg = light ? 'rgba(243,236,218,0.85)' : 'rgba(31,38,36,0.80)'
  const stuckBorder = light ? 'var(--color-ink-rule)' : 'var(--color-ivory-muted)'
  const pillBorder = light ? 'var(--color-ink-ring)' : 'var(--color-ivory-muted)'

  const linkStyle = { color: textColor, fontFamily: 'var(--font-body)' }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-16"
      style={{
        background: stuck ? stuckBg : 'transparent',
        backdropFilter: stuck ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: stuck ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${stuck ? stuckBorder : 'transparent'}`,
        transition: 'background 0.4s cubic-bezier(0.215,0.61,0.355,1), border-color 0.4s, backdrop-filter 0.4s',
      }}
    >
      <Link
        href="/"
        className={`font-display text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm ${focusClass}`}
        style={{ color: textColor, letterSpacing: '0.28em', paddingLeft: '0.28em' }}
        aria-label="Verve MD home"
      >
        VERVE<span style={{ color: 'var(--color-orange)' }}>·</span>MD
      </Link>

      <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
        {LINKS.map(({ label, href }) => (
          <Link key={href} href={href} className={`${NAV_LINK} ${focusClass}`} style={linkStyle}>
            {label}
          </Link>
        ))}
        <button
          type="button"
          data-cal-link={CAL_LINK}
          data-cal-namespace={CAL_NAMESPACE}
          data-cal-config='{"layout":"month_view"}'
          className={`${NAV_LINK} ${focusClass}`}
          style={{ ...linkStyle, background: 'transparent', cursor: 'pointer' }}
        >
          Book a call
        </button>
        <Link
          href="/audit"
          className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 transition-colors duration-300 hover:bg-[var(--color-cinnabar)] hover:text-[var(--color-ivory)] hover:border-[var(--color-cinnabar)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${focusClass}`}
          style={{ color: textColor, border: `1px solid ${pillBorder}`, clipPath: PILL_CLIP, fontFamily: 'var(--font-body)' }}
        >
          <span aria-hidden="true" style={{ width: 6, height: 6, background: 'var(--color-orange)', display: 'inline-block', flex: 'none' }} />
          Book a free audit
        </Link>
      </nav>

      <button
        className={`md:hidden p-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${focusClass}`}
        style={{ color: textColor }}
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
        {LINKS.map(({ label, href }) => (
          <Link key={href} href={href} className={`${NAV_LINK} ${focusClass}`} style={{ color: textColor }} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <button
          type="button"
          data-cal-link={CAL_LINK}
          data-cal-namespace={CAL_NAMESPACE}
          data-cal-config='{"layout":"month_view"}'
          className={`${NAV_LINK} ${focusClass} text-left`}
          style={{ color: textColor, fontFamily: 'var(--font-body)', background: 'transparent', cursor: 'pointer' }}
          onClick={() => setOpen(false)}
        >
          Book a call
        </button>
        <Link
          href="/audit"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium px-4 py-2.5 transition-colors duration-300 hover:bg-[var(--color-cinnabar)] hover:text-[var(--color-ivory)]"
          style={{ color: textColor, border: `1px solid ${pillBorder}`, clipPath: PILL_CLIP, fontFamily: 'var(--font-body)' }}
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true" style={{ width: 6, height: 6, background: 'var(--color-orange)', display: 'inline-block', flex: 'none' }} />
          Book a free audit
        </Link>
      </div>
    </header>
  )
}
