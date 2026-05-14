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
          className="mt-3 text-sm"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '48ch' }}
        >
          {workflow.sub}
        </p>

        <div
          className="mt-12 grid gap-px md:grid-cols-3"
          style={{ background: 'var(--color-ink-rule)' }}
        >
          {workflow.steps.map((step, i) => (
            <div
              key={step.label}
              className="px-8 py-8"
              style={{ background: 'var(--color-sand)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold shrink-0"
                  style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
                >
                  {i + 1}
                </span>
                <p
                  className="font-display font-semibold leading-tight"
                  style={{ fontSize: '1.05rem', color: 'var(--color-ink)' }}
                >
                  {step.label}
                </p>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
