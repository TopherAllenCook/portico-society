import Link from 'next/link'

const navLinks = [
  { href: '#what-we-engineer', label: 'What We Do' },
  { href: '#how-we-work', label: 'How We Work' },
  { href: '#categories', label: 'Specialties' },
  { href: '#begin', label: 'Request Audit' },
]

export default function Footer() {
  return (
    <footer
      className="px-6 py-16 lg:px-16"
      style={{ backgroundColor: 'var(--color-ivory)', borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex flex-col leading-none"
              aria-label="Verve Longevity Marketing, home"
            >
              <span
                className="font-display font-normal"
                style={{ fontSize: '1.125rem', letterSpacing: '0.2em', color: 'var(--color-ink)', lineHeight: 1 }}
              >
                VERVE
              </span>
              <span
                className="font-mono font-medium"
                style={{ fontSize: '0.475rem', letterSpacing: '0.26em', color: 'var(--color-label-text)', marginTop: '0.25rem' }}
              >
                LONGEVITY MARKETING
              </span>
            </Link>
            <p
              className="font-body mt-4 text-sm font-light leading-relaxed"
              style={{ color: 'var(--color-body-text)', maxWidth: '42ch' }}
            >
              The first practice AI names wins the patient. We build that authority for
              longevity, concierge, and aesthetic medicine.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p
              className="font-mono mb-4 text-xs font-medium tracking-[0.15em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Navigate
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm font-light transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ color: 'var(--color-body-text)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col gap-4 pt-8 lg:flex-row lg:items-center lg:justify-between"
          style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
        >
          <p
            className="font-body text-xs font-light"
            style={{ color: 'var(--color-label-text)' }}
          >
            &copy; {new Date().getFullYear()} Verve Clinic Marketing LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-xs font-light transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: 'var(--color-label-text)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
