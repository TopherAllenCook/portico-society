'use client'

import { useEffect, useRef } from 'react'

interface Tile {
  name: string
  desc: string
}

const COLS = 3

export default function TileGrid({ tiles }: { tiles: Tile[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = Array.from(grid.querySelectorAll<HTMLElement>('[data-tile]'))

    items.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'scale(0.95)'
      el.style.willChange = 'opacity, transform'
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        items.forEach((el, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          const delay = 40 + row * 80 + col * 55
          setTimeout(() => {
            el.style.transition = [
              'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
              'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            ].join(', ')
            el.style.opacity = '1'
            el.style.transform = 'scale(1)'
            setTimeout(() => { el.style.willChange = 'auto' }, 700)
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
        const num = String(i + 1).padStart(2, '0')
        return (
          <div
            key={tile.name}
            data-tile
            className="service-tile relative overflow-hidden px-8 py-10 flex flex-col gap-3"
            style={{ backgroundColor: 'var(--color-ivory)' }}
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
            <p
              className="service-tile-name font-display italic font-normal leading-tight relative"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
              }}
            >
              {tile.name}
            </p>
            <p
              className="service-tile-desc font-body font-light leading-snug relative"
              style={{ fontSize: '0.625rem', color: 'var(--color-body-text)' }}
            >
              {tile.desc}
            </p>
          </div>
        )
      })}
    </div>
  )
}
