'use client'

import { useEffect, useRef, ReactNode, CSSProperties } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  /** Use for wrappers containing headings. Omits visibility:hidden so AT heading
      navigation finds the heading before the user scrolls to it. */
  soft?: boolean
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = '',
  style,
  soft = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const attr = soft ? 'data-reveal-soft' : 'data-reveal'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.setAttribute(attr, 'pending')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (delay) el.style.transitionDelay = `${delay}ms`
            el.setAttribute(attr, 'done')
          }, 50)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, attr])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
