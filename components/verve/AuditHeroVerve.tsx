import { AUDIT_PAGE } from '@/lib/verve/content'

export default function AuditHeroVerve() {
  return (
    <section
      className="px-6 pb-12 pt-36 lg:px-16 lg:pt-44"
      style={{ background: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="mb-3 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
        >
          Free — No Call Required
        </p>
        <h1
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 4rem)',
            color: 'var(--color-ivory)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          {AUDIT_PAGE.headline}
        </h1>
        <p
          className="mx-auto mt-6 text-lg leading-relaxed"
          style={{ color: 'var(--color-body-text-on-dark)', maxWidth: '48ch', fontFamily: 'var(--font-body)' }}
        >
          {AUDIT_PAGE.sub}
        </p>
      </div>
    </section>
  )
}
