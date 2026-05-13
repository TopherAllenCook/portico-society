import type { Metadata } from 'next'
import Link from 'next/link'
import NavV2 from '@/components/v2/NavV2'
import BeginCTA from '@/components/BeginCTA'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/RevealOnScroll'
import TileGrid from '@/components/TileGrid'

export const metadata: Metadata = {
  title: 'Services — Verve',
  description:
    'AI search, lead capture, reviews, and advisory services for longevity, concierge, and aesthetic medicine practices.',
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    index: '01',
    name: 'AI Search',
    tier: 'Monthly Retainer',
    outcome:
      'Your practice named by ChatGPT, Perplexity, and Google AI when patients search your specialty.',
    bullets: [
      'SEO and AI search optimization, built in parallel',
      'Citation building across the web',
      'Structured data markup',
      'Monthly AI platform report',
    ],
  },
  {
    index: '02',
    name: 'AI Lead Agent',
    tier: 'Add-On',
    outcome:
      'An AI agent handles every inbound inquiry — books, qualifies, and follows up. No extra staff.',
    bullets: [
      'AI agent for booking and intake',
      'Lead qualification and routing',
      'Conversion optimization on the inquiry flow',
      'Source-to-appointment tracking',
    ],
  },
  {
    index: '03',
    name: 'Reviews & Referrals',
    tier: 'Monthly Retainer',
    outcome:
      'More reviews. A referral system that runs on its own. Better visibility in AI recommendations.',
    bullets: [
      'Review collection and response management',
      'Referral system setup',
      'AI follow-up agent for patient re-engagement',
      'Reputation monitoring',
    ],
  },
  {
    index: '04',
    name: 'Advisory',
    tier: 'Custom Project',
    outcome:
      'Direct strategy for a launch, a competitor threat, a revenue problem, or multi-location growth.',
    bullets: [
      'Everything in the monthly retainer',
      'Paid search (PPC) management',
      'Competitive research',
      'Multi-location strategy',
      'Direct access to principal',
    ],
  },
]

const faqs = [
  {
    q: 'How is this different from regular SEO?',
    a: 'Regular SEO targets Google rankings. Verve also targets the AI systems inside ChatGPT, Perplexity, and Google AI — which use different signals than Google search. Most SEO agencies are not building for these yet. We do both.',
  },
  {
    q: 'How fast do results show up?',
    a: 'AI citations typically start appearing within 60 days. The free audit tells you exactly where you stand today and what is in the way.',
  },
  {
    q: 'Can I keep my current marketing agency?',
    a: 'Usually yes. We focus on AI search and lead capture. If your current agency handles ads or social, that work continues without conflict.',
  },
  {
    q: 'What size practice is this for?',
    a: 'Practices doing $1M or more per year. The work only pays off when there is existing patient volume to build on.',
  },
]

const tiles = [
  { name: 'SEO', desc: 'Google rankings for your specialty and market.' },
  { name: 'AEO', desc: 'Citations in ChatGPT, Perplexity, and Google AI.' },
  { name: 'PPC', desc: 'Google and Meta paid search, managed end to end.' },
  { name: 'Web Design', desc: 'Practice websites built to convert, not just look good.' },
  { name: 'AI Lead Agent', desc: 'AI handles booking, intake, and follow-up automatically.' },
  { name: 'Reviews', desc: 'Collect, respond, and protect your reputation at scale.' },
  { name: 'Referral Systems', desc: 'Automated infrastructure so referrals actually happen.' },
  { name: 'Citation Building', desc: 'Authority signals across the web that AI systems read.' },
  { name: 'CRO', desc: 'Conversion optimization from first click to booked appointment.' },
  { name: 'Competitive Research', desc: 'Know exactly what your competitors are doing and where.' },
  { name: 'Attribution Tracking', desc: 'See which channels drive appointments, not just clicks.' },
  { name: 'Multi-location Strategy', desc: 'Expand without losing authority in your existing markets.' },
]

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      aria-labelledby="s2-hero-heading"
      className="px-6 pt-40 pb-24 lg:px-16 lg:pt-52 lg:pb-32"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">
        <h1
          id="s2-hero-heading"
          className="font-display italic font-normal leading-none mb-8"
          style={{
            fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
            color: 'var(--color-ivory)',
            letterSpacing: '-0.025em',
          }}
        >
          <span className="block">AI search.</span>
          <span className="block" style={{ color: 'var(--color-cinnabar-on-dark)' }}>
            Lead capture.
          </span>
          <span className="block">Practice growth.</span>
        </h1>

        <p
          className="font-body font-light leading-relaxed mb-10"
          style={{
            fontSize: '1.0625rem',
            color: 'var(--color-body-text-on-dark)',
            maxWidth: '48ch',
          }}
        >
          Verve builds AI search authority and patient inquiry systems for
          longevity, concierge, and aesthetic medicine. Starting with a free
          audit that shows exactly where you stand.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
          <Link
            href="#begin"
            className="font-body inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cinnabar text-ivory hover:bg-cinnabar-dark"
            style={{ outlineColor: 'var(--color-cinnabar)' }}
          >
            Request the free audit
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p
            className="font-mono text-xs font-medium tracking-[0.1em] uppercase pt-0 sm:pt-[1.05rem]"
            style={{ color: 'var(--color-label-text-on-dark)' }}
          >
            Delivered in 48 hours. No call required.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--color-ivory-dim)', paddingTop: '1.5rem' }}>
          <p
            className="font-display italic font-normal leading-snug mb-3"
            style={{
              fontSize: 'clamp(0.9375rem, 1.4vw, 1.125rem)',
              color: 'var(--color-ivory)',
              maxWidth: '44ch',
              opacity: 0.82,
            }}
          >
            &ldquo;Within four months, we were the first name ChatGPT mentioned
            for longevity medicine in our market.&rdquo;
          </p>
          <p
            className="font-mono text-xs font-medium tracking-[0.1em] uppercase"
            style={{ color: 'var(--color-label-text-on-dark)' }}
          >
            Medical Director / Longevity Practice, Austin TX
          </p>
        </div>
      </div>
    </section>
  )
}

function ServiceTiles() {
  return (
    <section
      aria-label="Everything we do"
      className="px-6 py-20 lg:px-16 lg:py-28"
      style={{ backgroundColor: 'var(--color-ivory)' }}
    >
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll soft>
          <p
            className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-12"
            style={{ color: 'var(--color-label-text)' }}
          >
            Everything We Do
          </p>
        </RevealOnScroll>
        <TileGrid tiles={tiles} />
      </div>
    </section>
  )
}

function Services() {
  return (
    <section
      aria-labelledby="s2-services-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll soft>
          <p
            className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-5"
            style={{ color: 'var(--color-label-text)' }}
          >
            Services
          </p>
          <h2
            id="s2-services-heading"
            className="font-display italic font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
              maxWidth: '28ch',
            }}
          >
            Four services. One starting point.
          </h2>
        </RevealOnScroll>

        {services.map((svc, i) => (
          <RevealOnScroll key={svc.index} delay={i * 55}>
            <div
              className="py-12 lg:py-14"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <div className="flex items-baseline gap-4 mb-5">
                <span
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase"
                  style={{ color: 'var(--color-label-text)' }}
                  aria-hidden="true"
                >
                  {svc.index}
                </span>
                <span
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase"
                  style={{ color: 'var(--color-cinnabar)' }}
                >
                  {svc.tier}
                </span>
              </div>

              <h3
                className="font-display italic font-normal leading-tight mb-8"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.03em',
                }}
              >
                {svc.name}
              </h3>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '44ch' }}
                >
                  {svc.outcome}
                </p>
                <ul className="space-y-2.5">
                  {svc.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body font-light"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
                    >
                      <span
                        className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-cinnabar)' }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        ))}
        <div style={{ borderTop: '1px solid var(--color-ink-rule)' }} aria-hidden="true" />

      </div>
    </section>
  )
}

function Proof() {
  const stats = [
    { value: '3×', label: 'Average increase in qualified patient inquiries within six months' },
    { value: '48h', label: 'Audit delivered with findings, before any engagement begins' },
    { value: '60d', label: 'First AI citations typically appear within 60 days of engagement start' },
  ]

  return (
    <section
      aria-label="Results and proof"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <figure className="mb-20">
            <blockquote>
              <p
                className="font-display italic font-normal leading-snug"
                style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.025em',
                  maxWidth: '30ch',
                }}
              >
                &ldquo;Before Verve, patients finding us through AI were rare.
                Within four months, we were the first name ChatGPT mentioned for
                longevity medicine in our market. Inquiry quality improved more
                than volume.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span
                style={{ display: 'block', width: '2rem', height: '1px', backgroundColor: 'var(--color-cinnabar)', flexShrink: 0 }}
                aria-hidden="true"
              />
              <div>
                <p className="font-body font-light" style={{ fontSize: '0.875rem', color: 'var(--color-body-text)' }}>
                  Medical Director
                </p>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--color-label-text)' }}>
                  Longevity Practice, Austin TX
                </p>
              </div>
            </figcaption>
          </figure>
        </RevealOnScroll>

        <RevealOnScroll>
          <div
            className="grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr_1px_1fr]"
            style={{ borderTop: '1px solid var(--color-ink-rule)' }}
          >
            {stats.map((stat, i) => (
              i % 2 === 0 ? (
                <div
                  key={i}
                  className="py-10"
                  style={{
                    paddingRight: i < 2 ? '2rem' : undefined,
                    paddingLeft: i > 0 ? '2rem' : undefined,
                  }}
                >
                  <p
                    className="font-display font-normal leading-none mb-3"
                    style={{
                      fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                      color: 'var(--color-cinnabar)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-body font-light leading-snug"
                    style={{ fontSize: '0.875rem', color: 'var(--color-body-text)', maxWidth: '22ch' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ) : (
                <div
                  key={i}
                  className="hidden sm:block"
                  style={{ backgroundColor: 'var(--color-ink-rule)' }}
                  aria-hidden="true"
                />
              )
            ))}
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section
      id="s2-tiers"
      aria-labelledby="s2-tiers-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll soft>
          <p
            className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-5"
            style={{ color: 'var(--color-label-text-on-dark)' }}
          >
            Pricing
          </p>
          <h2
            id="s2-tiers-heading"
            className="font-display italic font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
            }}
          >
            Two packages. One starting point.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-16"
            style={{ fontSize: '1rem', color: 'var(--color-body-text-on-dark)', maxWidth: '48ch' }}
          >
            Every engagement begins with a free audit. The findings tell you which package fits.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">

          <RevealOnScroll>
            <div className="pb-16 lg:pb-0 lg:pr-16">
              <p className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--color-label-text-on-dark)' }}>
                Monthly Retainer
              </p>
              <h3
                className="font-display font-normal leading-snug mb-2"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'var(--color-ivory)', letterSpacing: '-0.02em' }}
              >
                Monthly Retainer
              </h3>
              <p
                className="font-display font-normal mb-8"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', color: 'var(--color-ivory)', letterSpacing: '-0.03em' }}
              >
                $4,500&ndash;$6,500
                <span className="font-body font-light" style={{ fontSize: '0.875rem', letterSpacing: 0, color: 'var(--color-body-text-on-dark)' }}> / month</span>
              </p>

              <ul className="space-y-2.5 mb-10">
                {['AI search + SEO, built in parallel', 'Reviews and reputation management', 'AI follow-up agent', 'Monthly performance dashboard'].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body font-light" style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}>
                    <span className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-cinnabar-on-dark)' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: '1px solid var(--color-ivory-dim)', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                <p className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-2" style={{ color: 'var(--color-cinnabar-on-dark)' }}>
                  Optional Add-On
                </p>
                <p className="font-display font-normal mb-1" style={{ fontSize: '1.125rem', color: 'var(--color-ivory)', letterSpacing: '-0.02em' }}>
                  + AI Lead Agent
                </p>
                <p className="font-display font-normal mb-3" style={{ fontSize: '1.25rem', color: 'var(--color-ivory)', letterSpacing: '-0.025em' }}>
                  +$2,500&ndash;$3,500
                  <span className="font-body font-light" style={{ fontSize: '0.875rem', letterSpacing: 0, color: 'var(--color-body-text-on-dark)' }}> / month</span>
                </p>
                <p className="font-body font-light leading-relaxed" style={{ fontSize: '0.875rem', color: 'var(--color-body-text-on-dark)', maxWidth: '38ch' }}>
                  Booking agent, CRO on the full inquiry flow, and attribution tracking.
                </p>
              </div>

              <Link
                href="#begin"
                className="font-body inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cinnabar text-ivory hover:bg-cinnabar-dark"
                style={{ outlineColor: 'var(--color-cinnabar)' }}
              >
                Request the free audit
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>

          <div className="hidden lg:block" style={{ backgroundColor: 'var(--color-ivory-dim)' }} aria-hidden="true" />

          <RevealOnScroll>
            <div
              className="pt-16 lg:pt-0 lg:pl-16"
              style={{ borderTop: '1px solid var(--color-ivory-dim)' }}
            >
              <p className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--color-label-text-on-dark)' }}>
                Custom Project
              </p>
              <h3
                className="font-display font-normal leading-snug mb-2"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'var(--color-ivory)', letterSpacing: '-0.02em' }}
              >
                Custom Project
              </h3>
              <p
                className="font-display font-normal leading-snug mb-8"
                style={{ fontSize: 'clamp(1.0625rem, 1.6vw, 1.375rem)', color: 'var(--color-ivory)', letterSpacing: '-0.02em' }}
              >
                Priced to the situation
              </p>

              <p className="font-body font-light leading-relaxed mb-8" style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '38ch' }}>
                For a new market launch, competitive threat, or multi-location expansion. Scoped to your specific situation with clear milestones. No ongoing commitment unless you choose one.
              </p>

              <ul className="space-y-2.5 mb-10">
                {['Everything in the monthly retainer', 'Paid search (PPC) management', 'Competitive research', 'Multi-location strategy', 'Direct access to principal'].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body font-light" style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}>
                    <span className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-cinnabar-on-dark)' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:hello@vervemd.com?subject=Strategy%20Call%20Request"
                className="font-body inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ border: '1px solid oklch(97% 0.008 75 / 0.25)', color: 'var(--color-ivory)', outlineColor: 'oklch(97% 0.008 75 / 0.6)' }}
              >
                Book a strategy call
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section
      aria-labelledby="s2-faq-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll soft>
          <h2
            id="s2-faq-heading"
            className="font-display italic font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
              maxWidth: '20ch',
            }}
          >
            Questions from practice owners.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-20">
          {faqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 40}>
              <div
                className="py-8"
                style={{ borderTop: '1px solid var(--color-ink-rule)' }}
              >
                <p
                  className="font-display font-normal leading-snug mb-4"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {faq.q}
                </p>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
                >
                  {faq.a}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPageV2() {
  return (
    <>
      <NavV2 dark={true} />
      <main>
        <Hero />
        <ServiceTiles />
        <Services />
        <Proof />
        <Pricing />
        <FAQ />
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
