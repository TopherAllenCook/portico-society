import { AI_PAGE } from '@/lib/verve/content'

export default function AIWorkflowVerve() {
  const { workflow } = AI_PAGE

  return (
    <section
      className="px-6 py-20 lg:px-16 lg:py-28"
      style={{ background: 'var(--color-sand)' }}
      aria-labelledby="ai-workflow-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
        >
          {workflow.eyebrow}
        </p>
        <h2
          id="ai-workflow-heading"
          className="mt-4 font-display font-semibold leading-tight tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-ink)', maxWidth: '28ch' }}
        >
          {workflow.title}
        </h2>
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
        >
          {workflow.sub}
        </p>

        <ol
          className="mt-12"
          style={{ borderTop: '1px solid var(--color-ink-rule)' }}
        >
          {workflow.steps.map((step, i) => (
            <li
              key={step.label}
              className="grid gap-4 py-7 sm:grid-cols-[64px_1fr] sm:gap-8"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <p
                className="font-display font-bold leading-none"
                style={{
                  fontSize: '2.25rem',
                  color: 'var(--color-cinnabar)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  opacity: 0.6,
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <p
                  className="font-display font-semibold"
                  style={{ fontSize: '1.15rem', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}
                >
                  {step.label}
                </p>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '60ch' }}
                >
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
