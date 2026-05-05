import Link from 'next/link'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#results', label: 'Results' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

export default function Footer() {
  return (
    <footer
      className="bg-parchment px-6 py-16 lg:px-16"
      style={{ borderTop: '1px solid oklch(88% 0.005 55)' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto_auto]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-sm font-normal tracking-[0.18em] uppercase text-inkwell"
              aria-label="Portico Society — Home"
            >
              Portico Society
            </Link>
            <p
              className="font-body mt-4 max-w-[38ch] text-sm font-light leading-relaxed"
              style={{ color: 'oklch(16% 0.006 35 / 0.5)' }}
            >
              Precision marketing for luxury service brands. AI implementation, search,
              and paid media — calibrated for the brands your clients already trust.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body mb-4 text-xs font-medium tracking-[0.15em] uppercase text-stone-mid">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm font-light text-inkwell transition-opacity duration-200 hover:opacity-50"
                    style={{ color: 'oklch(16% 0.006 35 / 0.7)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Audit CTA */}
          <div>
            <p className="font-body mb-4 text-xs font-medium tracking-[0.15em] uppercase text-stone-mid">
              Get Started
            </p>
            <Link
              href="#audit"
              className="font-body inline-block border border-terracotta px-5 py-3 text-xs font-medium tracking-[0.1em] uppercase text-terracotta transition-all duration-200 hover:bg-terracotta hover:text-parchment"
            >
              Request Free Audit
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col gap-4 border-t pt-8 lg:flex-row lg:items-center lg:justify-between"
          style={{ borderColor: 'oklch(88% 0.005 55)' }}
        >
          <p
            className="font-body text-xs font-light"
            style={{ color: 'oklch(16% 0.006 35 / 0.4)' }}
          >
            &copy; {new Date().getFullYear()} Portico Society. All rights reserved.
          </p>

          <div className="flex gap-6">
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-xs font-light transition-opacity duration-200 hover:opacity-60"
                style={{ color: 'oklch(16% 0.006 35 / 0.4)' }}
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
