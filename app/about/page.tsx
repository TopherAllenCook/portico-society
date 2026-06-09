import type { Metadata } from 'next'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import CalButton from '@/components/verve/CalButton'

const ABOUT_TITLE = 'About'
const ABOUT_DESC =
  'Chris Cook on why Verve MD exists, who it is built for, and what a "marketing systems builder" actually does for home service businesses.'
const ABOUT_URL = 'https://www.vervemd.com/about'

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESC,
  alternates: { canonical: ABOUT_URL },
  openGraph: {
    title: `${ABOUT_TITLE} · Verve MD`,
    description: ABOUT_DESC,
    url: ABOUT_URL,
    type: 'profile',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${ABOUT_TITLE} · Verve MD`,
    description: ABOUT_DESC,
    images: ['/twitter-image'],
  },
}

// DRAFT bio composed from saved positioning memory. Chris to review and edit.
// No personal LinkedIn link by founder direction; company LinkedIn lives on
// the Organization node in components/verve/JsonLd.tsx instead.

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chris Cook',
  jobTitle: 'Founder, Verve MD',
  worksFor: { '@type': 'Organization', name: 'Verve MD', url: 'https://www.vervemd.com' },
  url: 'https://www.vervemd.com/about',
  description:
    'Brand strategist and marketing-systems builder for home service businesses.',
}

export default function AboutPage() {
  return (
    <>
      <NavVerve light />
      <main>
        <section
          className="px-6 pt-32 pb-16 lg:px-16 lg:pt-40 lg:pb-20"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-3xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              About the founder
            </p>
            <h1
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.04,
                maxWidth: '20ch',
              }}
            >
              I build marketing{' '}
              <span style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic' }}>systems,</span>{' '}
              not campaigns.
            </h1>
            <p
              className="mt-7 text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
            >
              Chris Cook · Founder of Verve MD · Thirteen-plus years in brand strategy, paid
              media, and the unglamorous infrastructure that turns a campaign into a business.
            </p>
          </div>
        </section>

        <section
          className="px-6 py-16 lg:px-16 lg:py-24"
          style={{ background: 'var(--color-stone)' }}
        >
          <div className="mx-auto max-w-3xl flex flex-col gap-8">
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
            >
              I&rsquo;ve been doing this since 2012. Thirteen-plus years of brand strategy,
              paid media, AI systems, and the operations work that turns a campaign into a
              business. Verve is that work built for one kind of company: home service
              businesses that are great at the work and invisible online.
            </p>

            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
            >
              Homeowners now ask ChatGPT, Claude, and Gemini for the best contractor in their
              city. Most home service businesses aren&rsquo;t in the answer; the ones that are
              win the job. Verve names you in AI search, runs the paid media that fills the
              rest, answers every call, and converts inquiries before they cool.
            </p>

            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
            >
              I run Verve as a systems operator, not a traditional agency. Strategy and the
              close are mine directly; a named specialist runs outbound; AI handles the work in
              between. Human time goes to what compounds: positioning, creative, and the
              relationship.
            </p>

            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
            >
              A few things I won&rsquo;t do: promise specific job counts, pass off a generic
              playbook as trade-specific, or pad the retainer with services you don&rsquo;t
              need. And the founder really does read every audit request. Write in, and the
              first reply is mine.
            </p>
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
              Want to talk it through?
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Book a 25-minute call with me. No deck, no pitch theater. We walk through your
              market, what AI says about you today, and whether Verve is the right fit.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CalButton
                label="Book a 25-min call"
                variant="primary"
                style={{ padding: '0.875rem 1.75rem', background: 'var(--color-ink)', color: 'var(--color-ivory)' }}
              />
              <a
                href="/audit"
                className="inline-flex items-center gap-2 rounded-full border bg-white px-7 py-3.5 text-sm font-medium"
                style={{ borderColor: 'var(--color-ink-rule)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
              >
                Or start with the free audit
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterVerve />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
    </>
  )
}
