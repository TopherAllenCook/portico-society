import { AEO_BLOCK } from '@/lib/verve/content'
import CTAButton from './CTAButton'

export default function AEOBlockVerve() {
  return (
    <section
      className="px-6 py-20 lg:px-16"
      style={{ background: 'var(--color-stone)' }}
      aria-labelledby="aeo-heading"
    >
      <div
        className="mx-auto max-w-5xl rounded-2xl px-10 py-14 text-center"
        style={{ background: 'var(--color-cinnabar)' }}
      >
        <p
          className="mb-3 text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-ivory)', opacity: 0.7, fontFamily: 'var(--font-body)' }}
        >
          Answer Engine Optimization
        </p>
        <h2
          id="aeo-heading"
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            color: 'var(--color-ivory)',
            letterSpacing: '-0.025em',
            maxWidth: '24ch',
            margin: '0 auto',
          }}
        >
          {AEO_BLOCK.title}
        </h2>
        <p
          className="mx-auto mt-5 text-base leading-relaxed"
          style={{ color: 'var(--color-ivory)', opacity: 0.82, maxWidth: '52ch', fontFamily: 'var(--font-body)' }}
        >
          {AEO_BLOCK.sub}
        </p>
        <div className="mt-8 flex justify-center">
          <CTAButton href={AEO_BLOCK.cta.href} label={AEO_BLOCK.cta.label} variant="secondary" />
        </div>
      </div>
    </section>
  )
}
