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
    a: 'A real-time check of how ChatGPT, Claude, and Gemini answer customer questions for your trade and city. You get an AI Visibility Score, a Competitor Edge Map, SEO + schema health notes, and an Inquiry Path audit with specific fixes ranked by impact. Delivered to your inbox in about three minutes. No sales call. Free.',
  },
  {
    q: 'Who do you work with?',
    a: 'Established home service businesses doing roughly $1M+ in revenue, or already spending $1,000+/month on ads. Plumbing, HVAC, electrical, roofing, and adjacent trades. Owner-operators, multi-crew shops, and multi-location companies. We do not work with brand-new businesses before their first year of revenue.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. Every retainer is month to month with notice in writing. No annual minimums, no setup fees inside the monthly retainers, no surprise add-ons. The number you see is the number you pay until the scope changes, and any scope change is approved by you first.',
  },
  {
    q: 'Do the leads belong to me?',
    a: 'Yes. Everything we build is yours and stays yours: your website, your Google Business Profile, your ad accounts, your reviews, your call records. We do not resell your leads or hand the same inquiry to four competitors the way Angi, Thumbtack, and HomeAdvisor do. If we ever part ways, you keep the assets and the pipeline.',
  },
  {
    q: 'How fast will I see results?',
    a: 'Paid media usually moves first: trackable booked jobs within the first 30 to 45 days once campaigns are validated. SEO and AEO compound more slowly: the first AI citations land in 30 to 90 days, with stronger placement around month four. Web design, lead nurture, and review systems pay back in weeks because they improve every existing lead, not just new traffic.',
  },
  {
    q: 'What is the AI Call Agent, and is it really 24/7?',
    a: 'A voice, chat, and text agent trained on your services, service area, and qualification rules. It answers calls and web chat around the clock, qualifies inquiries by job type and urgency, books jobs directly to your calendar, and hands off to your team when a question genuinely needs a human. It is part of the Full Service tier, or available as a $600/month add-on to any plan.',
  },
  {
    q: 'How is this different from a general marketing agency?',
    a: 'We only work with home service businesses. We do not need a glossary for emergency dispatch, seasonal demand swings, financing offers, or service-area SEO. The strategy is built around how homeowners actually search and decide, not a generic playbook adapted to the trades.',
  },
  {
    q: 'Do you guarantee specific results?',
    a: 'No agency that knows what it is doing will guarantee specific job counts or rankings. We do commit to clear cost-per-booked-job tracking, transparent dashboards, and a written 30-day plan you can hold us to. If the work is not paying back inside the first 90 days, we say so directly and adjust.',
  },
  {
    q: 'Who is actually doing the work?',
    a: 'Strategy and closing are done by the founder personally. Outbound is run by a dedicated specialist. AI systems handle the workload between (review collection, lead nurture, drafting, scheduling, reporting) so the human time goes to the work that actually compounds: strategy, creative, and your relationships.',
  },
  {
    q: 'Can I just buy one thing, like SEO or PPC alone?',
    a: 'Yes. The à la carte menu on the pricing page covers single engagements: a $1,500 SEO + AEO audit and strategy, $1,200/month PPC and Local Service Ads management on its own, single landing pages from $800, and AI system setup from $1,500. Most businesses eventually consolidate onto a retainer because the systems compound when they work together, but it is not required.',
  },
  {
    q: 'What happens after I submit the audit?',
    a: 'The audit runs in real time, scoring AI visibility, mapping competitors, and ranking the highest-impact moves for your trade and market. You get a link to your report in about three minutes and a copy in your inbox. No phone call required. If you want to talk through the findings, the report includes a direct link to book a 25-minute call with the founder.',
  },
  {
    q: 'Is the audit really free? What is the catch?',
    a: 'It is free, and the catch is that we run it knowing most businesses will not buy. The audit is the cheapest, most honest way to find businesses worth working with. If yours is one, the report shows it. If it is not the right fit, the report still tells you exactly what to fix.',
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
