'use client'

import Link from 'next/link'

const footerLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '#audit', label: 'Request Audit' },
]

export default function FooterV2() {
  return (
    <footer
      className="px-6 py-16 lg:px-16"
      style={{
        backgroundColor: 'var(--color-ink)',
        borderTop: '1px solid oklch(97% 0.008 75 / 0.07)',
      }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          {/* Brand */}
          <div>
            <p
              className="font-display italic font-normal mb-3"
              style={{ fontSize: '1.5rem', color: 'var(--color-ivory)' }}
            >
              Verve
            </p>
            <p
              className="font-body font-light leading-relaxed"
              style={{ fontSize: '0.875rem', color: 'oklch(97% 0.008 75 / 0.38)', maxWidth: '36ch' }}
            >
              AI visibility and patient acquisition marketing for longevity, concierge, and aesthetic medicine practices.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-8" aria-label="Footer navigation">
            {footerLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs font-medium uppercase tracking-[0.13em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ color: 'oklch(97% 0.008 75 / 0.28)', outlineColor: 'oklch(97% 0.008 75 / 0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'oklch(97% 0.008 75 / 0.65)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'oklch(97% 0.008 75 / 0.28)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-8"
          style={{ borderTop: '1px solid oklch(97% 0.008 75 / 0.06)' }}
        >
          <p
            className="font-mono text-xs tracking-[0.1em]"
            style={{ color: 'oklch(97% 0.008 75 / 0.18)' }}
          >
            &copy; 2026 Verve. All rights reserved.
          </p>
          <p
            className="font-mono text-xs tracking-[0.1em]"
            style={{ color: 'oklch(97% 0.008 75 / 0.18)' }}
          >
            vervemd.com
          </p>
        </div>
      </div>
    </footer>
  )
}
