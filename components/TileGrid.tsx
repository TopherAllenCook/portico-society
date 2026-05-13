'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Tile {
  name: string
  desc: string
  body: string
  href: string
}

const COLS = 3

export default function TileGrid({ tiles }: { tiles: Tile[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = Array.from(grid.querySelectorAll<HTMLElement>('[data-tile-pending]'))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        items.forEach((el, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          const delay = 40 + row * 80 + col * 55
          setTimeout(() => {
            el.style.willChange = 'opacity, transform'
            el.style.transition = [
              'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
              'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            ].join(', ')
            el.removeAttribute('data-tile-pending')
            setTimeout(() => {
              el.style.willChange = 'auto'
              el.style.transition = ''
            }, 700)
          }, delay)
        })
        observer.disconnect()
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 lg:grid-cols-3 gap-px"
      style={{ backgroundColor: 'var(--color-ink-rule)' }}
    >
      {tiles.map((tile, i) => {
        const isOpen = openIndex === i
        const num = String(i + 1).padStart(2, '0')
        return (
          <button
            key={tile.name}
            data-tile
            data-tile-pending=""
            data-open={isOpen ? '' : undefined}
            onClick={() => setOpenIndex(prev => prev === i ? null : i)}
            aria-expanded={isOpen}
            className="service-tile relative overflow-hidden px-8 pt-10 pb-10 flex flex-col text-left w-full cursor-pointer"
            style={{ border: 'none' }}
          >
            <span
              className="service-tile-index absolute -top-2 right-3 font-mono font-medium select-none pointer-events-none"
              style={{
                fontSize: 'clamp(3.75rem, 5.5vw, 5.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
              aria-hidden="true"
            >
              {num}
            </span>

            <div className="flex flex-col gap-3 relative">
              <p
                className="service-tile-name font-display italic font-normal leading-tight"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.03em',
                }}
              >
                {tile.name}
              </p>
              <p
                className="service-tile-desc font-body font-light leading-snug"
                style={{ fontSize: '0.75rem', color: 'var(--color-body-text)' }}
              >
                {tile.desc}
              </p>
            </div>

            {/* Height-animating reveal — CSS grid trick, no max-height estimate needed */}
            <div
              className="grid"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{ minHeight: 0, overflow: 'hidden' }}>
                <p
                  className="service-tile-body font-body font-light leading-relaxed"
                  style={{
                    fontSize: '0.875rem',
                    paddingTop: '1rem',
                    opacity: isOpen ? 1 : 0,
                    transition: isOpen ? 'opacity 0.28s ease 0.18s' : 'opacity 0.08s ease',
                  }}
                >
                  {tile.body}
                </p>
                <Link
                  href={tile.href}
                  className="service-tile-cta inline-flex items-center gap-1.5 font-mono font-medium"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '1.25rem',
                    marginBottom: '0.25rem',
                    opacity: isOpen ? 1 : 0,
                    transition: isOpen ? 'opacity 0.28s ease 0.22s' : 'opacity 0.08s ease',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  See details
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                    <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3M7.5 1.5V6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
