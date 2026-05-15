import type { Metadata } from 'next'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'

export const metadata: Metadata = {
  title: 'Terms of Service: Verve MD',
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
    body: 'All content on this site (including copy, methodology descriptions, and design) is the property of Verve Clinic Marketing LLC. Audit reports delivered to practices are for that practice\'s internal use and may not be shared with third parties without written consent.',
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
    <>
      <NavVerve light />
      <main
        style={{ backgroundColor: 'var(--color-ivory)', minHeight: '100vh' }}
        aria-labelledby="terms-heading"
      >
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 lg:px-8 lg:pt-52 lg:pb-32">
          <p
            className="font-mono text-xs font-medium uppercase tracking-[0.18em] mb-6"
            style={{ color: 'var(--color-label-text)' }}
          >
            Legal
          </p>
          <h1
            id="terms-heading"
            className="font-display font-normal leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
          >
            Terms of Service
          </h1>
          <p
            className="font-mono text-xs tracking-[0.1em] mb-12"
            style={{ color: 'var(--color-label-text)' }}
          >
            Effective: January 1, 2025
          </p>

          <div className="flex flex-col">
            {sections.map(({ heading, body }) => (
              <div
                key={heading}
                className="py-8 lg:py-10"
                style={{ borderTop: '1px solid var(--color-ink-rule)' }}
              >
                <h2
                  className="font-display font-normal mb-4"
                  style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', color: 'var(--color-ink)' }}
                >
                  {heading}
                </h2>
                <p
                  className="font-body leading-relaxed"
                  style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '60ch' }}
                >
                  {body}
                </p>
              </div>
            ))}
            <div aria-hidden="true" style={{ borderTop: '1px solid var(--color-ink-rule)' }} />
          </div>
        </div>
      </main>
      <FooterVerve />
    </>
  )
}
