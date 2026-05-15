import type { Metadata } from 'next'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'

export const metadata: Metadata = {
  title: 'Privacy Policy: Verve MD',
  description: 'How Verve Clinic Marketing collects, uses, and protects your information.',
}

const sections = [
  {
    heading: 'Information We Collect',
    body: 'When you submit an audit request, we collect your work email address and, optionally, your practice website URL. We do not collect payment information, sensitive health data, or personal identifiers beyond what you voluntarily provide.',
  },
  {
    heading: 'How We Use Your Information',
    body: 'We use the information you provide solely to conduct your AI visibility audit and to communicate findings with you. We do not sell, rent, or share your contact information with third parties for marketing purposes.',
  },
  {
    heading: 'Communications',
    body: 'By submitting an audit request, you consent to receive your audit report and, if your practice is a strong fit, a follow-up invitation to review findings. You may opt out of further communications at any time by replying to any email we send.',
  },
  {
    heading: 'Data Retention',
    body: 'We retain audit request data for a period sufficient to conduct and deliver the audit. If you do not proceed to an engagement, your information is removed from active records within 90 days of the initial request.',
  },
  {
    heading: 'Cookies and Analytics',
    body: 'This site may use privacy-respecting analytics to understand aggregate traffic patterns. We do not use advertising cookies or cross-site tracking technologies.',
  },
  {
    heading: 'Security',
    body: 'We take reasonable technical and organizational measures to protect your information. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
  },
  {
    heading: 'Contact',
    body: 'Questions about this policy or your data may be directed to the contact information provided in your audit correspondence.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <NavVerve />
      <main
        style={{ backgroundColor: 'var(--color-ivory)', minHeight: '100vh' }}
        aria-labelledby="privacy-heading"
      >
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 lg:px-8 lg:pt-52 lg:pb-32">
          <p
            className="font-mono text-xs font-medium uppercase tracking-[0.18em] mb-6"
            style={{ color: 'var(--color-label-text)' }}
          >
            Legal
          </p>
          <h1
            id="privacy-heading"
            className="font-display font-normal leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
          >
            Privacy Policy
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
