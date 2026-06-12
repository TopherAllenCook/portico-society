import type { Metadata } from 'next'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'

const SECURITY_TITLE = 'Security & HIPAA'
const SECURITY_DESC =
  'How Verve MD handles patient data, HIPAA, BAAs, and vendor risk. Verve does not store PHI; marketing-only signals stay on our systems.'
const SECURITY_URL = 'https://www.vervemd.com/security'

export const metadata: Metadata = {
  title: SECURITY_TITLE,
  description: SECURITY_DESC,
  alternates: { canonical: SECURITY_URL },
  openGraph: {
    title: `${SECURITY_TITLE} · Verve MD`,
    description: SECURITY_DESC,
    url: SECURITY_URL,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SECURITY_TITLE} · Verve MD`,
    description: SECURITY_DESC,
    images: ['/twitter-image'],
  },
}

export default function SecurityPage() {
  const sectionStyle: React.CSSProperties = { borderBottom: '1px solid var(--color-ink-rule)' }
  const eyebrowStyle: React.CSSProperties = {
    color: 'var(--color-label-text)',
    fontFamily: 'var(--font-body)',
  }
  const bodyStyle: React.CSSProperties = {
    color: 'var(--color-body-text)',
    fontFamily: 'var(--font-body)',
  }

  return (
    <>
      <NavVerve light />
      <main>
        <section
          className="px-6 pt-32 pb-16 lg:px-16 lg:pt-40 lg:pb-20"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-4xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={eyebrowStyle}
            >
              Security & HIPAA posture
            </p>
            <h1
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '22ch',
              }}
            >
              Verve does not store{' '}
              <span style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic' }}>
                patient data.
              </span>
            </h1>
            <p
              className="mt-6 text-base leading-relaxed"
              style={{ ...bodyStyle, maxWidth: '60ch' }}
            >
              Marketing systems should not be a HIPAA risk surface. The way we are
              architected, they aren&rsquo;t. Here is exactly what that means in practice.
            </p>
          </div>
        </section>

        <section
          className="px-6 py-16 lg:px-16 lg:py-24"
          style={{ background: 'var(--color-stone)' }}
        >
          <div className="mx-auto max-w-4xl" style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
            <article className="grid items-baseline gap-6 py-10 lg:grid-cols-[6rem_1fr] lg:gap-12" style={sectionStyle}>
              <p
                className="font-display font-bold tabular-nums leading-none"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-ink-faint)', letterSpacing: '-0.03em' }}
                aria-hidden="true"
              >
                01
              </p>
              <div>
                <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}>
                  Patient data stays in your stack.
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ ...bodyStyle, maxWidth: '60ch' }}>
                  Protected Health Information lives in your EHR, CRM, and scheduling
                  systems, where it already belongs. Verve does not pull patient records, chart
                  notes, treatment data, or any other PHI into our systems. We do not need it
                  to do marketing well.
                </p>
              </div>
            </article>

            <article className="grid items-baseline gap-6 py-10 lg:grid-cols-[6rem_1fr] lg:gap-12" style={sectionStyle}>
              <p
                className="font-display font-bold tabular-nums leading-none"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-ink-faint)', letterSpacing: '-0.03em' }}
                aria-hidden="true"
              >
                02
              </p>
              <div>
                <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}>
                  What Verve does handle.
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ ...bodyStyle, maxWidth: '60ch' }}>
                  Marketing-only signals: form submissions from prospects who have not yet
                  become patients, ad spend and attribution data, search rankings, AI
                  visibility scores, web analytics, and reputation signals. None of it is
                  PHI under HIPAA&rsquo;s definition.
                </p>
              </div>
            </article>

            <article className="grid items-baseline gap-6 py-10 lg:grid-cols-[6rem_1fr] lg:gap-12" style={sectionStyle}>
              <p
                className="font-display font-bold tabular-nums leading-none"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-ink-faint)', letterSpacing: '-0.03em' }}
                aria-hidden="true"
              >
                03
              </p>
              <div>
                <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}>
                  Vendors that could touch PHI: BAA in place.
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ ...bodyStyle, maxWidth: '60ch' }}>
                  For the AI Patient Agent and similar systems that interact with patients
                  directly on your behalf, the upstream vendors operate under a Business
                  Associate Agreement. Verve coordinates the BAA chain so you are not
                  collecting signatures across half a dozen platforms.
                </p>
              </div>
            </article>

            <article className="grid items-baseline gap-6 py-10 lg:grid-cols-[6rem_1fr] lg:gap-12" style={sectionStyle}>
              <p
                className="font-display font-bold tabular-nums leading-none"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-ink-faint)', letterSpacing: '-0.03em' }}
                aria-hidden="true"
              >
                04
              </p>
              <div>
                <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}>
                  Access, encryption, and least privilege.
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ ...bodyStyle, maxWidth: '60ch' }}>
                  Data in transit uses TLS. Data at rest is encrypted at the storage layer.
                  Production access is limited to the founder and named operators. Vendor
                  credentials are stored in a secrets manager, not in source code or shared
                  documents.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section
          className="px-6 py-20 lg:px-16 lg:py-28"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="font-display font-semibold"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}
            >
              Need our vendor list or BAA on file?
            </h2>
            <p
              className="mx-auto mt-4 text-base leading-relaxed"
              style={{ ...bodyStyle, maxWidth: '52ch' }}
            >
              Email{' '}
              <a
                href="mailto:hello@vervemd.com?subject=Security%20and%20HIPAA%20questions"
                className="underline underline-offset-4"
                style={{ color: 'var(--color-cinnabar)' }}
              >
                hello@vervemd.com
              </a>
              {' '}with your clinic name and we will send the current vendor list and BAA
              template within one business day.
            </p>
          </div>
        </section>
      </main>
      <FooterVerve />
    </>
  )
}
