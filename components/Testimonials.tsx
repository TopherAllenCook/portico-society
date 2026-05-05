'use client'

import { useEffect, useState, useCallback } from 'react'

const testimonials = [
  {
    quote:
      'Portico Society understood our brand constraints immediately. They did not try to make us louder. They made us sharper. Inquiry volume increased by 40% in the first quarter, and the average inquiry quality was measurably better.',
    attribution: 'Director of Marketing',
    sector: 'Luxury Resort Group',
  },
  {
    quote:
      'Our patient acquisition cost dropped by more than half. More importantly, the patients we attract now are the right patients. The targeting precision is something we had tried to achieve with three previous agencies.',
    attribution: 'Director of Patient Experience',
    sector: 'Private Concierge Medicine Practice',
  },
  {
    quote:
      'They operate like a premium partner. The strategy is specific, the reporting is honest, and they do not recommend things we do not need. That combination is genuinely rare.',
    attribution: 'Brand Director',
    sector: 'Wellness & Longevity Company',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const advance = useCallback((next: number) => {
    setCurrent(next)
    setAnimKey(k => k + 1)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      advance((current + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [current, advance])

  const t = testimonials[current]

  return (
    <section
      className="bg-parchment px-6 py-24 lg:px-16 lg:py-32"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p
          className="font-body mb-12 text-xs font-medium tracking-[0.2em] uppercase text-stone-mid"
        >
          In Their Words
        </p>

        {/* Quote */}
        <figure
          key={animKey}
          style={{ animation: 'fadein 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          {/* Decorative quotation mark */}
          <span
            className="font-display mb-4 block font-normal leading-none text-terracotta opacity-30"
            style={{ fontSize: '5rem' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote>
            <p
              className="font-display font-normal italic leading-relaxed text-inkwell"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
            >
              {t.quote}
            </p>
          </blockquote>

          <figcaption className="mt-10">
            <p
              className="font-body text-xs font-medium tracking-[0.14em] uppercase text-inkwell"
            >
              {t.attribution}
            </p>
            <p
              className="font-body mt-1 text-xs font-light tracking-[0.08em]"
              style={{ color: 'oklch(16% 0.006 35 / 0.5)' }}
            >
              {t.sector}
            </p>
          </figcaption>
        </figure>

        {/* Dots */}
        <div
          className="mt-12 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => advance(i)}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === current ? '2rem' : '0.375rem',
                backgroundColor: i === current
                  ? 'oklch(47% 0.135 33)'
                  : 'oklch(88% 0.005 55)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
