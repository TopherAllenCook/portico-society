import type { Metadata } from 'next'
import NewAuditForm from './NewAuditForm'

export const metadata: Metadata = {
  title: 'Create an audit',
  robots: { index: false, follow: false },
}

export default function NewAuditToolPage() {
  return (
    <div style={{ background: 'var(--color-ivory)', minHeight: '100vh' }}>
      <header className="border-b px-6 py-4 lg:px-10" style={{ borderColor: 'var(--color-ink-subtle)' }}>
        <div className="mx-auto flex max-w-2xl items-baseline gap-3">
          <span className="font-display font-semibold" style={{ fontSize: '1.25rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
            Verve
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-ink-muted)' }}>
            Audit intake
          </span>
        </div>
      </header>

      <main className="px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
            Create an audit
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
            Enter the clinic’s details to add them to the pipeline and (with “Run now” on) run the full audit and email the prospect.
            No sign-in needed.
          </p>
          <div className="mt-8">
            <NewAuditForm />
          </div>
        </div>
      </main>
    </div>
  )
}
