'use client'

import { useRef, useState, useEffect } from 'react'

const phases = [
  {
    step: 'The Audit',
    body: 'Before any engagement, we run your AI visibility audit. We map where your practice appears in AI-generated recommendations, where competitors outrank you, and what is preventing you from appearing at the top. You receive a specific report with prioritized findings, not a slide deck of generic recommendations.',
  },
  {
    step: 'The Strategy',
    body: 'If the audit reveals a fit, we define an engagement scope specific to your practice. Not a package. Not a template. The strategy is built around your situation: your competitive landscape, your patient profile, your growth timeline.',
  },
  {
    step: 'The Build',
    body: 'We execute against a defined plan with defined milestones. AI search authority takes 60 to 90 days to establish. Patient inquiry architecture can be redesigned in the first 30. Reporting is delivered monthly in business terms: inquiries, conversion rate, patient acquisition cost, revenue impact.',
  },
  {
    step: 'The Compound',
    body: 'AI authority compounds. A practice that appears consistently in AI recommendations over 6 months becomes the default answer. The patients who find you this way are the highest-intent, highest-value patients in your market.',
  },
]

const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'

function useReveal(threshold = 0.1, bottomMargin = 40) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: `0px 0px -${bottomMargin}px 0px` }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, bottomMargin])

  return { ref, visible }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function DrawRule({
  reduced,
  delay = 0,
  color = 'oklch(14% 0.006 30 / 0.12)',
  position = 'absolute',
}: {
  reduced: boolean
  delay?: number
  color?: string
  position?: 'absolute' | 'static'
}) {
  const { ref, visible } = useReveal(0.3, 20)
  const v = reduced || visible

  const style =
    position === 'absolute'
      ? ({
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
        } as React.CSSProperties)
      : ({ height: '1px', flex: 1 } as React.CSSProperties)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        ...style,
        backgroundColor: color,
        transform: v ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: reduced ? 'none' : `transform 360ms ${EXPO} ${delay}ms`,
        willChange: v ? 'auto' : 'transform',
      }}
    />
  )
}

function PhaseRow({
  step,
  body,
  index,
  reduced,
}: {
  step: string
  body: string
  index: number
  reduced: boolean
}) {
  const { ref, visible } = useReveal(0.1, 36)
  const v = reduced || visible

  const fade = (
    delay: number,
    duration: number,
    tx = '0',
    ty = '0'
  ): React.CSSProperties => ({
    opacity: v ? 1 : 0,
    transform: v ? 'translateX(0) translateY(0)' : `translateX(${tx}) translateY(${ty})`,
    transition: reduced
      ? 'none'
      : `opacity ${duration}ms ${EXPO} ${delay}ms, transform ${duration}ms ${EXPO} ${delay}ms`,
    willChange: v ? 'auto' : 'opacity, transform',
  })

  return (
    <div ref={ref} className="relative py-14 lg:py-16">
      <DrawRule reduced={reduced} delay={0} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[13rem_1fr] lg:gap-16">
        {/* Left: display-scale number — architectural anchor */}
        <div>
          <span
            className="font-display font-normal leading-none block"
            style={{
              fontSize: 'clamp(5rem, 9vw, 7rem)',
              color: 'var(--color-cinnabar)',
              letterSpacing: '-0.03em',
              ...fade(140, 420, '-18px', '0'),
            }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Right: title above body, stacked */}
        <div className="flex flex-col gap-5">
          <h3
            className="font-display font-normal leading-tight"
            style={{
              fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)',
              color: 'var(--color-ink)',
              ...fade(240, 460, '0', '8px'),
            }}
          >
            <span className="sr-only">Step {index + 1}: </span>
            {step}
          </h3>
          <p
            className="font-body font-light leading-relaxed"
            style={{
              fontSize: '0.9375rem',
              color: 'oklch(14% 0.006 30 / 0.6)',
              maxWidth: '56ch',
              ...fade(370, 530, '0', '12px'),
            }}
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function HowWeWork() {
  const reduced = useReducedMotion()
  const { ref: eyebrowRef, visible: eyebrowVisible } = useReveal(0.3, 20)
  const ey = reduced || eyebrowVisible

  return (
    <section
      id="how-we-work"
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-label="How we work"
    >
      <div className="mx-auto max-w-5xl">

        <div
          ref={eyebrowRef}
          className="flex items-baseline gap-8 mb-16"
          style={{
            opacity: ey ? 1 : 0,
            transform: ey ? 'translateY(0)' : 'translateY(5px)',
            transition: reduced ? 'none' : `opacity 480ms ${EXPO}, transform 480ms ${EXPO}`,
            willChange: ey ? 'auto' : 'opacity, transform',
          }}
        >
          <p
            className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
            style={{ color: 'oklch(14% 0.006 30 / 0.7)' }}
          >
            How We Work
          </p>
          <div
            aria-hidden="true"
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'oklch(14% 0.006 30 / 0.12)',
              transform: ey ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: reduced ? 'none' : `transform 540ms ${EXPO} 240ms`,
            }}
          />
        </div>

        <div>
          {phases.map((phase, i) => (
            <PhaseRow
              key={phase.step}
              step={phase.step}
              body={phase.body}
              index={i}
              reduced={reduced}
            />
          ))}

          <DrawRule reduced={reduced} position="static" />
        </div>

      </div>
    </section>
  )
}
