import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verve Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--color-ivory)', minHeight: '100vh' }}>
      <header
        className="border-b px-6 py-4 lg:px-10"
        style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/admin" className="flex items-baseline gap-3">
            <span
              className="font-display font-semibold"
              style={{ fontSize: '1.25rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
            >
              Verve
            </span>
            <span
              className="font-mono text-xs uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              Admin
            </span>
          </a>
          <nav className="flex items-center gap-5 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            <a href="/admin" style={{ color: 'var(--color-ink)' }}>Audits</a>
            <a href="/admin/content" style={{ color: 'var(--color-ink)' }}>Content</a>
            <a href="/admin/owner-economics" style={{ color: 'var(--color-ink)' }}>Economics</a>
            <form action="/api/admin/signout" method="post">
              <button type="submit" className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>Sign out</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
