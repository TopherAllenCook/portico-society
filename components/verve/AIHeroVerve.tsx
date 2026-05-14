import { AI_PAGE } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function AIHeroVerve() {
  const { eyebrow, headline, sub, stats } = AI_PAGE

  return (
    <section
      className="relative px-6 pt-40 pb-24 lg:px-16 lg:pt-48 lg:pb-32"
      style={{ background: 'var(--color-ink)' }}
      aria-labelledby="ai-hero-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
        >
          {eyebrow}
        </p>

        <h1
          id="ai-hero-heading"
          className="mt-5 font-display font-semibold leading-[1.05] tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            color: 'var(--color-ivory)',
            maxWidth: '18ch',
          }}
        >
          {headline}
        </h1>

        <p
          className="mt-6 text-base leading-relaxed"
          style={{
            color: 'var(--color-body-text-on-dark)',
            fontFamily: 'var(--font-body)',
            maxWidth: '52ch',
          }}
        >
          {sub}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="/audit" label="Get your free AI audit" variant="primary" />
          <CTAButton href="#ai-services" label="See all AI systems" variant="secondary" />
        </div>

        <div
          className="mt-16 grid gap-px md:grid-cols-3"
          style={{ background: 'var(--color-ivory-subtle)' }}
        >
          {stats.map((s) => (
            <div
              key={s.value}
              className="px-8 py-7"
              style={{ background: 'var(--color-ink)' }}
            >
              <p
                className="font-display font-bold leading-none"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-ivory)', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </p>
              <p
                className="mt-2 text-xs leading-snug"
                style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
