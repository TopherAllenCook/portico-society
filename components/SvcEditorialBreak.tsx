import RevealOnScroll from './RevealOnScroll'

export default function SvcEditorialBreak() {
  return (
    <section
      aria-label="Editorial statement"
      className="relative px-6 py-20 lg:px-16 lg:py-28"
      style={{ backgroundColor: 'var(--color-cinnabar)' }}
    >
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <p
            className="font-display italic font-normal leading-tight"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
              maxWidth: '26ch',
            }}
          >
            Three practices are named when a patient asks AI for a recommendation.
            Building one of them is the entire job.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
