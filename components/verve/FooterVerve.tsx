import Link from 'next/link'

export default function FooterVerve() {
  return (
    <footer
      className="px-6 py-16 lg:px-16"
      style={{ background: 'var(--color-ink)', borderTop: '1px solid var(--color-ivory-subtle)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p
              className="font-display text-xl font-semibold tracking-tight"
              style={{ color: 'var(--color-ivory)' }}
            >
              Verve MD
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
            >
              Exclusively serving longevity & aesthetics practices.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigation">
            {[
              { label: 'Services', href: '/#services' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Free Audit', href: '/audit' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-opacity hover:opacity-100 opacity-60"
                style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <p
          className="mt-12 text-xs"
          style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
        >
          © {new Date().getFullYear()} Verve MD. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
