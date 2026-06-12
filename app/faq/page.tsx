import type { Metadata } from 'next'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import CalButton from '@/components/verve/CalButton'

const FAQ_TITLE = 'FAQ'
const FAQ_DESC =
  'Answers to the most common questions about Verve MD: AI visibility audits, retainers, lead ownership, contracts, how the AI call agent works, and what we will not do.'
const FAQ_URL = 'https://www.vervemd.com/faq'

export const metadata: Metadata = {
  title: FAQ_TITLE,
  description: FAQ_DESC,
  alternates: { canonical: FAQ_URL },
  openGraph: {
    title: `${FAQ_TITLE} · Verve MD`,
    description: FAQ_DESC,
    url: FAQ_URL,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${FAQ_TITLE} · Verve MD`,
    description: FAQ_DESC,
    images: ['/twitter-image'],
  },
}

interface QA {
  q: string
  a: string
}

const FAQS: QA[] = [
  {
    q: 'What is the free audit, and what do I actually get?',
    a: 'A real-time check of how ChatGPT, Claude, and Gemini answer customer questions for your trade and city, plus your SEO, schema, and inquiry-path gaps ranked by impact. In your inbox in about three minutes. No call, free.',
  },
  {
    q: 'Who do you work with?',
    a: 'Established home service businesses, roughly $1M+ in revenue or already $1,000+/month on ads. Plumbing, HVAC, electrical, roofing, and adjacent trades. Not brand-new businesses in year one.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. Month to month, notice in writing. No annual minimums, no setup fees, no surprise add-ons.',
  },
  {
    q: 'Do the leads belong to me?',
    a: 'Yes. Your website, Google Business Profile, ad accounts, reviews, and call records all stay yours. We never resell your leads or sell the same one to four competitors the way Angi and Thumbtack do.',
  },
  {
    q: 'How fast will I see results?',
    a: 'Paid media first: trackable booked jobs in 30 to 45 days. SEO and AEO compound over 30 to 90 days. Capture systems (call answering, nurture, reviews) pay back in weeks.',
  },
  {
    q: 'What is the AI Call Agent, and is it really 24/7?',
    a: 'A voice, chat, and text agent trained on your services and service area. It answers around the clock, qualifies by job type, books to your calendar, and hands off when a human is needed. Part of Full Service, or $600/month standalone.',
  },
  {
    q: 'How is this different from a general marketing agency?',
    a: 'We only work with home service businesses, so the strategy is built around how homeowners actually search and decide, not a generic playbook adapted to the trades.',
  },
  {
    q: 'Do you guarantee specific results?',
    a: 'No honest agency guarantees specific job counts or rankings. We commit to clear cost-per-booked-job tracking, transparent dashboards, and a written 30-day plan. If it is not paying back in 90 days, we say so and adjust.',
  },
  {
    q: 'Who is actually doing the work?',
    a: 'Strategy and closing are the founder\'s. Outbound is a dedicated specialist. AI handles the work in between, so human time goes to strategy, creative, and your relationships.',
  },
  {
    q: 'Can I just buy one thing, like SEO or PPC alone?',
    a: 'Yes. À la carte covers single engagements: audit, PPC + Local Service Ads management, landing pages, AI setup. Most businesses consolidate onto a retainer because the systems compound, but it is not required.',
  },
  {
    q: 'What happens after I submit the audit?',
    a: 'It runs in real time and lands in your inbox in about three minutes, no call required. If you want to talk it through, the report has a link to book 25 minutes with the founder.',
  },
  {
    q: 'Is the audit really free? What is the catch?',
    a: 'It is free, and we run it knowing most businesses will not buy. It is the most honest way to find the ones worth working with. Either way, the report tells you exactly what to fix.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FaqPage() {
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
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              {FAQS.length} questions, answered
            </p>
            <h1
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '22ch',
              }}
            >
              The questions we{' '}
              <span style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic' }}>actually</span>{' '}
              get.
            </h1>
            <p
              className="mt-6 text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
            >
              If you do not see your question here, the fastest path is the free audit. The
              report tends to answer most of the follow-ups before you ever email us.
            </p>
          </div>
        </section>

        <section
          className="px-6 py-16 lg:px-16 lg:py-24"
          style={{ background: 'var(--color-stone)' }}
        >
          <div className="mx-auto max-w-4xl" style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
            {FAQS.map(({ q, a }, i) => (
              <details
                key={q}
                className="group"
                style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
              >
                <summary
                  className="flex cursor-pointer items-baseline gap-6 py-7 list-none"
                  style={{ color: 'var(--color-ink)' }}
                >
                  <span
                    className="font-display font-bold tabular-nums shrink-0"
                    style={{
                      fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                      color: 'var(--color-ink-faint)',
                      letterSpacing: '-0.02em',
                      width: '2.5rem',
                    }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-display font-medium flex-1"
                    style={{
                      fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.35,
                    }}
                  >
                    {q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-xl transition-transform group-open:rotate-45"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    +
                  </span>
                </summary>
                <div
                  className="pb-8 pl-10 lg:pl-12"
                  style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
                >
                  <p className="text-base leading-relaxed" style={{ maxWidth: '64ch' }}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className="px-6 py-20 lg:px-16 lg:py-28 text-center"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-2xl">
            <h2
              className="font-display font-semibold"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}
            >
              Still have a question?
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
            >
              Book a 25-minute discovery call. The founder answers directly, on screen, no slide deck.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CalButton label="Book a discovery call" variant="primary" style={{ padding: '0.875rem 1.75rem', background: 'var(--color-ink)', color: 'var(--color-ivory)' }} />
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border bg-[var(--color-paper)] px-7 py-3.5 text-sm font-medium"
                style={{ borderColor: 'var(--color-ink-rule)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
              >
                Send a message instead
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterVerve />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  )
}
