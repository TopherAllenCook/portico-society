import type { Metadata } from 'next'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import InquiryFormVerve from '@/components/verve/InquiryFormVerve'
import CalButton from '@/components/verve/CalButton'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to the founder. Reply within one business day. Or book a 25-minute discovery call.',
  alternates: { canonical: 'https://www.vervemd.com/contact' },
}

export default function ContactPage() {
  return (
    <>
      <NavVerve light />
      <main>
        <section
          className="px-6 pt-32 pb-16 lg:px-16 lg:pt-40 lg:pb-20"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-5xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              Replies in one business day
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
              Tell us about your{' '}
              <span style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic' }}>practice.</span>
            </h1>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
            >
              Four short fields. The founder reads every one and writes back personally. Or
              skip the back-and-forth and book a 25-minute discovery call directly.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CalButton label="Book a 25-min discovery call" variant="primary" />
              <a
                href="mailto:hello@vervemd.com?subject=Hello%20from%20vervemd.com"
                className="text-sm underline-offset-4 hover:underline"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                Or email hello@vervemd.com
              </a>
            </div>
          </div>
        </section>

        <section
          className="px-6 py-20 lg:px-16 lg:py-28"
          style={{ background: 'var(--color-stone)' }}
        >
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              >
                Send a message
              </p>
              <h2
                className="mt-3 font-display font-semibold"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}
              >
                Four fields, founder reads.
              </h2>
              <div className="mt-8">
                <InquiryFormVerve />
              </div>
            </div>

            <aside className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}>
                  Reply time
                </p>
                <p className="mt-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
                  One business day, from the founder.
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}>
                  Quick question? Call or text
                </p>
                <p className="mt-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
                  <a
                    href="tel:+13852756931"
                    className="underline underline-offset-4"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    (385) 275-6931
                  </a>
                </p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', opacity: 0.8 }}
                >
                  For discovery calls, please book above so the time is held on both calendars.
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}>
                  Who fits
                </p>
                <p className="mt-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
                  Established longevity, concierge, and aesthetic practices. $1M+ revenue.
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}>
                  Already curious?
                </p>
                <p className="mt-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
                  Run the free <a href="/audit" className="underline underline-offset-4" style={{ color: 'var(--color-cinnabar)' }}>AI visibility audit</a> first. About 3 minutes.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <FooterVerve />
    </>
  )
}
