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
              The marketing department for home service businesses.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigation">
            {[
              { label: 'Services', href: '/#services' },
              { label: 'AI Systems', href: '/ai' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Blog', href: '/blog' },
              { label: 'Free Audit', href: '/audit' },
              { label: 'About', href: '/about' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Contact', href: '/contact' },
              { label: 'Security', href: '/security' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-opacity hover:opacity-100 opacity-60 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ivory-glow)] focus-visible:opacity-100"
                style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-3 text-xs"
          style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
        >
          <p suppressHydrationWarning>© {new Date().getFullYear()} Verve MD. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href="mailto:hello@vervemd.com?subject=Hello%20from%20vervemd.com"
              className="opacity-70 hover:opacity-100 underline-offset-4 hover:underline focus-visible:opacity-100"
              style={{ color: 'var(--color-ivory)' }}
            >
              hello@vervemd.com
            </a>
            <span aria-hidden="true" className="opacity-40">·</span>
            <a
              href="tel:+13852756931"
              className="opacity-70 hover:opacity-100 underline-offset-4 hover:underline focus-visible:opacity-100"
              style={{ color: 'var(--color-ivory)' }}
              aria-label="Call (385) 275-6931 for questions. Book a discovery call online."
            >
              (385) 275-6931
            </a>
            <span aria-hidden="true" className="opacity-40">·</span>
            <a
              href="https://www.linkedin.com/company/118464101/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 underline-offset-4 hover:underline focus-visible:opacity-100"
              style={{ color: 'var(--color-ivory)' }}
            >
              LinkedIn
            </a>
            <span aria-hidden="true" className="opacity-40">·</span>
            <a
              href="https://www.facebook.com/vervemd"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 underline-offset-4 hover:underline focus-visible:opacity-100"
              style={{ color: 'var(--color-ivory)' }}
            >
              Facebook
            </a>
            <span aria-hidden="true" className="opacity-40">·</span>
            <a
              href="https://www.instagram.com/verve.md/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 underline-offset-4 hover:underline focus-visible:opacity-100"
              style={{ color: 'var(--color-ivory)' }}
            >
              Instagram
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
