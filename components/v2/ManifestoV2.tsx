'use client'

import { useEffect, useRef, useState } from 'react'
import RevealOnScroll from '@/components/RevealOnScroll'

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (reduced) { setCount(target); return }
          const duration = 2000
          const startTime = performance.now()
          function tick(now: number) {
            const elapsed = now - startTime
            const t = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - t, 4)
            setCount(Math.round(eased * target))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <em ref={ref} className="not-italic" aria-label={`${target}`}>
      {count}
    </em>
  )
}

export default function ManifestoV2() {
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="The AI visibility gap"
    >
      <div className="mx-auto max-w-5xl">

        {/* Giant stat */}
        <RevealOnScroll>
          <div className="text-center mb-6">
            <p
              className="font-display font-normal leading-none"
              style={{
                fontSize: 'clamp(6rem, 20vw, 16rem)',
                letterSpacing: '-0.05em',
                color: 'var(--color-cinnabar)',
              }}
            >
              <CountUp target={72} />
              <span
                style={{ fontSize: '0.55em', verticalAlign: 'super', lineHeight: '1' }}
                aria-hidden="true"
              >
                %
              </span>
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <p
            className="font-display italic font-normal text-center"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: 'var(--color-ink)',
              lineHeight: '1.5',
              letterSpacing: '-0.01em',
            }}
          >
            of high net worth patients start their healthcare search with AI.
          </p>
        </RevealOnScroll>

        {/* Divider */}
        <RevealOnScroll>
          <div
            className="my-16 lg:my-20"
            style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
            aria-hidden="true"
          />
        </RevealOnScroll>

        {/* Two-column confrontation */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">

            <div className="lg:pr-16">
              <h2
                className="font-display font-normal"
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.025em',
                  lineHeight: '1.2',
                }}
              >
                Three AI recommendations per specialty. Per city. Per search.
              </h2>
            </div>

            {/* Hairline divider column */}
            <div
              className="hidden lg:block"
              style={{ backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-5 lg:pl-16">
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '52ch' }}
              >
                When a patient asks ChatGPT or Perplexity for the best longevity clinic in their city, three names appear. Those three practices capture the inquiry. Every other practice is invisible — not because they provide worse care, but because they never built AI search authority.
              </p>
              <p
                className="font-display italic font-normal"
                style={{ fontSize: '1rem', color: 'var(--color-ink)', lineHeight: '1.6' }}
              >
                Verve engineers the signal that puts your practice in those three.
              </p>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
