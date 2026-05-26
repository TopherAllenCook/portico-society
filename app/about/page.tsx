import type { Metadata } from 'next'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import CalButton from '@/components/verve/CalButton'

const ABOUT_TITLE = 'About'
const ABOUT_DESC =
  'Chris Cook on why Verve MD exists, who it is built for, and what a "marketing systems builder" actually does for longevity and aesthetic medicine practices.'
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
// Replace headshot placeholder once /public/brand/founder-headshot.* lands.

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chris Cook',
  jobTitle: 'Founder, Verve MD',
  worksFor: { '@type': 'Organization', name: 'Verve MD', url: 'https://www.vervemd.com' },
  url: 'https://www.vervemd.com/about',
  description:
    'Brand strategist and marketing-systems builder for longevity, concierge, and aesthetic medicine practices.',
  // sameAs: [], // TODO: add LinkedIn URL once provided.
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
          <div className="mx-auto max-w-5xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              About the founder
            </p>
            <h1
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '20ch',
              }}
            >
              I build marketing{' '}
              <span style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic' }}>systems,</span>{' '}
              not campaigns.
            </h1>
          </div>
        </section>

        <section
          className="px-6 py-16 lg:px-16 lg:py-24"
          style={{ background: 'var(--color-stone)' }}
        >
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div
                className="aspect-[4/5] w-full rounded-2xl flex items-center justify-center"
                style={{
                  background: 'var(--color-ink)',
                  boxShadow: 'var(--shadow-card-soft)',
                }}
                aria-label="Founder headshot placeholder"
              >
                <span
                  className="font-display font-semibold"
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 7rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  CC
                </span>
              </div>
              <div className="mt-6">
                <p
                  className="font-display font-semibold"
                  style={{ fontSize: '1.1rem', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}
                >
                  Chris Cook
                </p>
                <p
                  className="mt-1 text-sm"
                  style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
                >
                  Founder, Verve MD
                </p>
                {/* TODO: wire LinkedIn URL once provided */}
              </div>
            </aside>

            <div className="flex flex-col gap-7">
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
              >
                I&rsquo;ve been doing this work since 2012. Thirteen-plus years of brand
                strategy, paid media, AI systems, and the unglamorous infrastructure that turns
                a campaign into a business. Verve is the version of that work built around one
                vertical I actually know: longevity, concierge, and aesthetic medicine.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                The reason Verve exists is simple. Patients have started asking ChatGPT,
                Claude, and Gemini for the best clinic in their city. Most clinics aren&rsquo;t
                in those answers. The clinics that are win the consult. The rest don&rsquo;t
                get the call. SEO and paid still matter; they just don&rsquo;t matter alone
                anymore. The thing that closes the gap is a system that names you, runs the
                paid media that fills the rest, and converts inquiries before they cool.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                I run Verve as a systems operator, not a traditional agency. Strategy and
                the close happen with me directly. Outbound is run by a named specialist. AI
                handles the workload in between (review collection, lead nurture, drafting,
                scheduling, reporting) so the human time goes to the parts that compound:
                positioning, creative, and the relationship.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
              >
                A few things I won&rsquo;t do. I won&rsquo;t promise specific patient counts;
                no one honest can. I won&rsquo;t spin up a generic playbook and call it
                medicine-specific. I won&rsquo;t bundle in services the clinic doesn&rsquo;t
                need so the retainer looks bigger. The reason &ldquo;the founder reads every
                one&rdquo; is in the copy is because it&rsquo;s true; if you write in, the
                first reply is mine.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <CalButton
                  label="Book a 25-min call"
                  variant="primary"
                  style={{ padding: '0.875rem 1.75rem', background: 'var(--color-ink)', color: 'var(--color-ivory)' }}
                />
                <a
                  href="/audit"
                  className="text-sm underline-offset-4 hover:underline"
                  style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}
                >
                  Or start with the free audit →
                </a>
              </div>
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
