import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Verve',
  description: 'Terms governing use of Verve Clinic Marketing services and this website.',
}

const sections = [
  {
    heading: 'Acceptance of Terms',
    body: 'By accessing this website or submitting an audit request, you agree to these terms. If you do not agree, do not use this site or its services.',
  },
  {
    heading: 'Services',
    body: 'Verve Clinic Marketing provides AI visibility audits, marketing strategy, and related services to qualified medical practices. Engagement scope, deliverables, and terms are defined in individual service agreements. The free audit described on this site is provided as a demonstration of methodology and does not constitute a binding engagement.',
  },
  {
    heading: 'Audit Requests',
    body: 'Submitting an audit request does not guarantee delivery of an audit or the commencement of a paid engagement. Verve reserves the right to decline audit requests at its discretion, including where a practice does not meet our engagement criteria.',
  },
  {
    heading: 'Intellectual Property',
    body: 'All content on this site — including copy, methodology descriptions, and design — is the property of Verve Clinic Marketing LLC. Audit reports delivered to practices are for that practice\'s internal use and may not be shared with third parties without written consent.',
  },
  {
    heading: 'Disclaimer of Warranties',
    body: 'This site and its content are provided "as is." Verve makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of any content, including audit findings. Results described on this site reflect individual client outcomes and are not guaranteed.',
  },
  {
    heading: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, Verve Clinic Marketing LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of this site or our services.',
  },
  {
    heading: 'Governing Law',
    body: 'These terms are governed by the laws of the state in which Verve Clinic Marketing LLC is registered, without regard to conflict of law principles.',
  },
  {
    heading: 'Changes to Terms',
    body: 'We may update these terms from time to time. Continued use of this site after changes are posted constitutes acceptance of the revised terms.',
  },
]

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '100vh' }}>
      {/* Nav-height spacer */}
      <div style={{ height: '5rem' }} aria-hidden="true" />

      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
        <Link
          href="/"
          className="font-mono text-xs font-medium uppercase tracking-[0.14em] transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: 'var(--color-label-text)' }}
        >
          ← Back to Verve
        </Link>

        <div
          style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)', margin: '2.5rem 0' }}
          aria-hidden="true"
        />

        <h1
          className="font-display font-normal leading-tight mb-3"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
        >
          Terms of Service
        </h1>
        <p
          className="font-mono text-xs tracking-[0.1em] mb-14"
          style={{ color: 'var(--color-label-text)' }}
        >
          Effective: January 1, 2025
        </p>

        <div className="space-y-12">
          {sections.map(({ heading, body }) => (
            <div key={heading}>
              <div
                style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.08)', marginBottom: '1.5rem' }}
                aria-hidden="true"
              />
              <h2
                className="font-display font-normal mb-4"
                style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', color: 'var(--color-ink)' }}
              >
                {heading}
              </h2>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '60ch' }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)', margin: '4rem 0 2rem' }}
          aria-hidden="true"
        />
        <p
          className="font-body text-xs font-light"
          style={{ color: 'var(--color-label-text)' }}
        >
          &copy; {new Date().getFullYear()} Verve Clinic Marketing LLC. All rights reserved.
        </p>
      </main>
    </div>
  )
}
