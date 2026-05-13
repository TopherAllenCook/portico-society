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
      {tiles.map((tile) => (
        <div
          key={tile.name}
          data-tile
          className="service-tile px-6 py-7 flex flex-col gap-2"
          style={{ backgroundColor: 'var(--color-ivory)' }}
        >
          <p
            className="service-tile-name font-display font-normal leading-tight"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            {tile.name}
          </p>
          <p
            className="font-body font-light leading-snug"
            style={{ fontSize: '0.8125rem', color: 'var(--color-body-text)' }}
          >
            {tile.desc}
          </p>
        </div>
      ))}
    </div>
  )
}
