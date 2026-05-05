'use client'

import { useEffect, useRef, ReactNode, CSSProperties } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = '',
  style,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.setAttribute('data-reveal', 'pending')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (delay) el.style.transitionDelay = `${delay}ms`
            el.setAttribute('data-reveal', 'done')
          }, 50)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
