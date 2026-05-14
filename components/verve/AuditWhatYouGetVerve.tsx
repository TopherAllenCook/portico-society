import { AUDIT_PAGE } from '@/lib/verve/content'

export default function AuditWhatYouGetVerve() {
  return (
    <section
      className="px-6 py-16 lg:px-16"
      style={{ background: 'var(--color-ink)' }}
      aria-labelledby="audit-deliverables-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="audit-deliverables-heading"
          className="font-display font-semibold text-center"
          style={{ fontSize: '1.4rem', color: 'var(--color-ivory)', letterSpacing: '-0.02em' }}
        >
          What you&rsquo;ll receive
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {AUDIT_PAGE.deliverables.map((d) => (
            <div
              key={d.title}
              className="rounded-xl p-6"
              style={{ background: 'var(--color-cta-surface)', border: '1px solid var(--color-ivory-subtle)' }}
            >
              <p
                className="font-display font-medium"
                style={{ fontSize: '1rem', color: 'var(--color-ivory)', letterSpacing: '-0.01em' }}
              >
                {d.title}
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
              >
                {d.description}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-6 text-center text-sm"
          style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
        >
          {AUDIT_PAGE.deliveryNote}
        </p>
      </div>
    </section>
  )
}
