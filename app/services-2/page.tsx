import type { Metadata } from 'next'
import Link from 'next/link'
import NavV2 from '@/components/v2/NavV2'
import BeginCTA from '@/components/BeginCTA'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Services — Verve',
  description:
    'AI search authority, patient inquiry architecture, and revenue growth for longevity, concierge, and aesthetic medicine practices.',
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'service-aeo',
    index: '01',
    name: 'AI Search Visibility',
    tier: 'Verve Engagement',
    outcome:
      'Your practice named by ChatGPT, Perplexity, and Google AI when patients search your specialty.',
    summary:
      'We build the signals that cause AI systems to recommend your practice: citation networks, entity authority, structured data, and content depth across every major AI search platform.',
    included: [
      'AEO and SEO authority build in parallel',
      'Citation and entity profile development',
      'Structured data and schema implementation',
      'Monthly AI platform tracking dashboard',
    ],
    change:
      'Your practice named first, or named at all, when patients use AI to find care.',
  },
  {
    id: 'service-inquiry',
    index: '02',
    name: 'Patient Inquiry Architecture',
    tier: 'Verve Engagement + Inquiry Architecture',
    outcome:
      'Every inbound inquiry captured, qualified, and converted. Without adding headcount.',
    summary:
      'Most practices lose patients between first contact and booked appointment. We build the intake layer that captures, qualifies, and converts every inquiry. No added front-desk load.',
    included: [
      'Booking and intake AI agent',
      'Inquiry qualification and routing',
      'CRO on the full inquiry flow',
      'Attribution tracking from source to appointment',
    ],
    change:
      'More patients from the same lead volume. Fewer dropped inquiries.',
  },
  {
    id: 'service-reputation',
    index: '03',
    name: 'Reputation and Growth',
    tier: 'Verve Engagement',
    outcome:
      'Review volume, citation authority, and referral infrastructure compounding in parallel.',
    summary:
      'Review volume and referral patterns are direct inputs into AI recommendation systems. We build and protect the authority signals that feed both patient trust and AI citations.',
    included: [
      'Review generation and response management',
      'Referral infrastructure development',
      'AI follow-up agent for patient re-engagement',
      'Reputation monitoring and alert system',
    ],
    change:
      'Review volume that compounds authority. A referral engine that runs without prompting.',
  },
  {
    id: 'service-advisory',
    index: '04',
    name: 'Strategic Advisory',
    tier: 'Strategic Advisory',
    outcome:
      'CMO-level strategy for a new launch, competitive crisis, or multi-location expansion.',
    summary:
      'For situations that require more than execution. A new market launch, a competitive threat, a revenue decline, or a multi-location expansion, each scoped to the specific problem with clear milestones.',
    included: [
      'Everything in Verve Engagement',
      'PPC management',
      'Competitive intelligence',
      'Multi-location playbook',
      'CMO-level strategy and principal access',
    ],
    change:
      'A clear path through the situation. No ongoing commitment unless you choose one.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Free audit',
    body: 'Within 48 hours you receive a specific report on your AI visibility: which platforms name you, which name your competitors, and three to five ranked actions.',
  },
  {
    number: '02',
    title: 'Engagement design',
    body: 'We scope an engagement specific to your practice, specialty, and market. Built around your competitive gap, not a template.',
  },
  {
    number: '03',
    title: 'Systems built in sequence',
    body: 'Authority first, then inquiry architecture, then growth foundation. Each system compounds the next. First AI citations typically appear within 60 days.',
  },
  {
    number: '04',
    title: 'Quarterly review',
    body: 'Direct access to principal throughout. Every metric tied to practice revenue: appointments booked, inquiry quality, patient acquisition cost.',
  },
]

const faqs = [
  {
    q: 'What is the difference between this and traditional SEO?',
    a: 'Traditional SEO targets Google\'s search algorithm. AI search authority targets the recommendation engines inside ChatGPT, Perplexity, Google AI, and Gemini, which use different signals: citation quality, content depth, entity authority. Most SEO work does not build these signals. Verve builds both in parallel.',
  },
  {
    q: 'How long before my practice appears in AI recommendations?',
    a: 'First citations typically appear within 60 days of engagement start. Full authority builds over three to four months. The audit you receive first shows exactly where you stand today.',
  },
  {
    q: 'Do I need to stop working with my current marketing vendor?',
    a: 'Not necessarily. Verve focuses on AI search authority and inquiry architecture, areas most generalist agencies do not touch. If your current vendor handles paid social or website maintenance, that work typically continues alongside a Verve engagement without conflict.',
  },
  {
    q: 'What size practice does Verve work with?',
    a: 'Established practices generating $1M or more in annual revenue with at least three years of operation. The authority build only makes sense when there is existing patient volume to compound.',
  },
  {
    q: 'What if I am not ready for a full engagement?',
    a: 'Start with the Strategic Advisory tier. Scoped to your specific situation with clear milestones and no ongoing commitment unless you choose one.',
  },
]

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      aria-labelledby="s2-hero-heading"
      className="px-6 pt-40 pb-20 lg:px-16 lg:pt-52 lg:pb-28"
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
          <span className="block">AI visibility and patient</span>
          <span className="block">acquisition for the practice</span>
          <span className="block" style={{ color: 'var(--color-cinnabar-on-dark)' }}>
            that earns the right patient.
          </span>
        </h1>

        <p
          className="font-body font-light leading-relaxed mb-10"
          style={{
            fontSize: '1.0625rem',
            color: 'var(--color-body-text-on-dark)',
            maxWidth: '50ch',
          }}
        >
          Three systems for longevity, concierge, and aesthetic medicine: AI
          search authority, patient inquiry architecture, and revenue growth.
          Starting with a free audit.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 items-start">
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
            48 hours. No call required.
          </p>
        </div>
      </div>
    </section>
  )
}

function ServicesIndex() {
  return (
    <section
      id="services-grid"
      aria-labelledby="s2-services-heading"
      className="px-6 pb-24 lg:px-16 lg:pb-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">
        <h2 id="s2-services-heading" className="sr-only">What we build</h2>

        {services.map((svc, i) => (
          <RevealOnScroll key={svc.id} delay={i * 55}>
            <a
              href={`#${svc.id}`}
              className="group block py-8 lg:py-10"
              style={{ borderTop: '1px solid var(--color-ivory-dim)' }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-3"
                    style={{ color: 'var(--color-label-text-on-dark)' }}
                    aria-hidden="true"
                  >
                    {svc.index}
                  </p>
                  <p
                    className="font-display italic font-normal leading-tight mb-3 transition-opacity duration-300 group-hover:opacity-70"
                    style={{
                      fontSize: 'clamp(1.625rem, 3.5vw, 2.75rem)',
                      color: 'var(--color-ivory)',
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {svc.name}
                  </p>
                  <p
                    className="font-body font-light"
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--color-body-text-on-dark)',
                      maxWidth: '54ch',
                    }}
                  >
                    {svc.outcome}
                  </p>
                </div>
                <span
                  className="flex-shrink-0 pt-8 lg:pt-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'var(--color-ivory-dim)' }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 14L14 2M14 2H5M14 2v9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          </RevealOnScroll>
        ))}
        <div style={{ borderTop: '1px solid var(--color-ivory-dim)' }} aria-hidden="true" />
      </div>
    </section>
  )
}

function TrustBand() {
  const stats = [
    { value: '3×', label: 'Average inquiry lift within six months' },
    { value: '48h', label: 'Audit delivered before any engagement' },
    { value: '60d', label: 'First AI citations after engagement start' },
  ]

  return (
    <section
      aria-label="Client results"
      className="px-6 py-16 lg:px-16 lg:py-20"
      style={{ backgroundColor: 'var(--color-cinnabar)' }}
    >
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr_1px_1fr] gap-0 sm:items-start">
            {stats.map((stat, i) => (
              i % 2 === 0 ? (
                <div
                  key={i}
                  className="py-8 sm:py-0"
                  style={{
                    paddingLeft: i > 0 ? '2.5rem' : undefined,
                    paddingRight: i < 2 ? '2.5rem' : undefined,
                  }}
                >
                  <p
                    className="font-display font-normal leading-none mb-2"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                      color: 'var(--color-ivory)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-body font-light leading-snug"
                    style={{
                      fontSize: '0.875rem',
                      color: 'oklch(97% 0.008 75 / 0.72)',
                      maxWidth: '18ch',
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ) : (
                <div
                  key={i}
                  className="hidden sm:block"
                  style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.18)' }}
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

function ServiceDetails() {
  return (
    <section
      aria-label="Service detail"
      style={{ backgroundColor: 'var(--color-stone)' }}
    >
      {services.map((svc) => (
        <RevealOnScroll key={svc.id}>
          <div
            id={svc.id}
            className="px-6 py-16 lg:px-16 lg:py-20"
            style={{ borderTop: '1px solid var(--color-ink-rule)' }}
          >
            <div className="mx-auto max-w-5xl">

              {/* Full-width service headline */}
              <div className="mb-10 lg:mb-14">
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-4"
                  style={{ color: 'var(--color-cinnabar)' }}
                >
                  {svc.index} / {svc.tier}
                </p>
                <h3
                  className="font-display italic font-normal leading-tight"
                  style={{
                    fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {svc.name}
                </h3>
              </div>

              {/* Two-column body */}
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">

                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '48ch' }}
                >
                  {svc.summary}
                </p>

                <div>
                  <div style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.5rem', marginBottom: '1.75rem' }}>
                    <p
                      className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
                      style={{ color: 'var(--color-label-text)' }}
                    >
                      Included
                    </p>
                    <ul className="space-y-2.5">
                      {svc.included.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-body font-light"
                          style={{ fontSize: '0.875rem', color: 'var(--color-body-text)' }}
                        >
                          <span
                            className="mt-[0.4rem] h-1 w-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: 'var(--color-cinnabar)' }}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.5rem' }}>
                    <p
                      className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-2"
                      style={{ color: 'var(--color-label-text)' }}
                    >
                      What changes
                    </p>
                    <p
                      className="font-body font-light leading-relaxed"
                      style={{ fontSize: '0.875rem', color: 'var(--color-body-text)' }}
                    >
                      {svc.change}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </RevealOnScroll>
      ))}
      <div style={{ borderTop: '1px solid var(--color-ink-rule)' }} aria-hidden="true" />
    </section>
  )
}

function Process() {
  return (
    <section
      id="s2-process"
      aria-labelledby="s2-process-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll soft>
          <h2
            id="s2-process-heading"
            className="font-display italic font-normal leading-tight mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
              maxWidth: '26ch',
            }}
          >
            What working with Verve looks like.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 55}>
              <div
                className="py-10 sm:pr-16"
                style={{
                  borderTop: '1px solid var(--color-ivory-dim)',
                  paddingLeft: i % 2 === 1 ? '2.5rem' : undefined,
                  borderLeft: i % 2 === 1 ? '1px solid var(--color-ivory-dim)' : undefined,
                }}
              >
                <p
                  className="font-display font-normal leading-none mb-6"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--color-cinnabar-on-dark)',
                    letterSpacing: '-0.04em',
                    opacity: 0.3,
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </p>
                <p
                  className="font-display font-normal leading-snug mb-3"
                  style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.title}
                </p>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '36ch' }}
                >
                  {step.body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--color-ivory-dim)' }} aria-hidden="true" />

        <RevealOnScroll>
          <div className="pt-12">
            <Link
              href="#begin"
              className="font-body inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cinnabar text-ivory hover:bg-cinnabar-dark"
              style={{ outlineColor: 'var(--color-cinnabar)' }}
            >
              Start with the free audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>

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
      aria-label="Results and testimonial"
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
                  maxWidth: '28ch',
                }}
              >
                &ldquo;Within four months, we were the first name ChatGPT
                mentioned for longevity medicine in our market. Inquiry quality
                improved more than volume.&rdquo;
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
      style={{ backgroundColor: 'var(--color-stone)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll soft>
          <h2
            id="s2-tiers-heading"
            className="font-display italic font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            What an engagement costs.
          </h2>
        </RevealOnScroll>

        {/* Two-column: Standard / Advisory */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">

          <RevealOnScroll>
            <div className="pb-16 lg:pb-0 lg:pr-16">

              <p className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4" style={{ color: 'var(--color-label-text)' }}>
                Foundation
              </p>
              <h3
                className="font-display font-normal leading-snug mb-6"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
              >
                Verve Engagement
              </h3>

              <div style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                <p className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: 'var(--color-label-text)' }}>
                  Six-month retainer
                </p>
                <p className="font-display font-normal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}>
                  $4,500&ndash;$6,500
                  <span className="font-body font-light" style={{ fontSize: '0.875rem', letterSpacing: 0, color: 'var(--color-body-text)' }}> / month</span>
                </p>
              </div>

              <ul className="space-y-2.5 mb-10">
                {['AEO + SEO authority build', 'Reputation management', 'AI follow-up agent', 'Monthly performance dashboard'].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body font-light" style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}>
                    <span className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-cinnabar)' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Add-on */}
              <div style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                <p className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--color-cinnabar)' }}>
                  Optional Add-On
                </p>
                <p className="font-display font-normal mb-1.5" style={{ fontSize: '1.125rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                  + Inquiry Architecture
                </p>
                <p className="font-display font-normal mb-3" style={{ fontSize: '1.375rem', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}>
                  +$2,500&ndash;$3,500
                  <span className="font-body font-light" style={{ fontSize: '0.875rem', letterSpacing: 0, color: 'var(--color-body-text)' }}> / month</span>
                </p>
                <p className="font-body font-light leading-relaxed" style={{ fontSize: '0.875rem', color: 'var(--color-body-text)', maxWidth: '38ch' }}>
                  Booking agent, CRO on the full inquiry flow, and attribution tracking. Every inquiry captured and converted.
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

          <div className="hidden lg:block" style={{ backgroundColor: 'var(--color-ink-rule)' }} aria-hidden="true" />

          <RevealOnScroll>
            <div
              className="pt-16 lg:pt-0 lg:pl-16"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              <p className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4" style={{ color: 'var(--color-label-text)' }}>
                Advisory
              </p>
              <h3
                className="font-display font-normal leading-snug mb-6"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
              >
                Strategic Advisory
              </h3>

              <div style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                <p className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: 'var(--color-label-text)' }}>
                  Custom scope
                </p>
                <p
                  className="font-display font-normal leading-snug"
                  style={{ fontSize: 'clamp(1.0625rem, 1.6vw, 1.375rem)', color: 'var(--color-ink)', letterSpacing: '-0.02em', lineHeight: 1.35 }}
                >
                  Priced to the situation
                </p>
              </div>

              <p className="font-body font-light leading-relaxed mb-6" style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '38ch' }}>
                For a new launch, competitive threat, revenue decline, or multi-location expansion. Scoped to the problem with clear milestones. No ongoing commitment unless you choose one.
              </p>

              <ul className="space-y-2.5 mb-10">
                {['Everything in Verve Engagement', 'PPC management', 'Competitive intelligence', 'Multi-location playbook', 'CMO-level strategy and principal access'].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body font-light" style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}>
                    <span className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-cinnabar)' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:hello@vervemd.com?subject=Strategy%20Call%20Request"
                className="font-body inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ border: '1px solid var(--color-ink-rule)', color: 'var(--color-ink)', outlineColor: 'var(--color-ink)' }}
              >
                Book a strategy call
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

            </div>
          </RevealOnScroll>

        </div>

        <RevealOnScroll>
          <p className="font-body font-light mt-12" style={{ fontSize: '0.875rem', color: 'var(--color-label-text)' }}>
            Not sure which path fits?{' '}
            <Link href="#begin" className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-70" style={{ color: 'var(--color-label-text)' }}>
              Start with the audit.
            </Link>{' '}
            The findings make the choice obvious.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section
      aria-labelledby="s2-faq-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll soft>
          <h2
            id="s2-faq-heading"
            className="font-display italic font-normal leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
              maxWidth: '20ch',
            }}
          >
            Common questions from practice owners.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-20">
          {faqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 40}>
              <div
                className="py-8"
                style={{ borderTop: '1px solid var(--color-ivory-dim)' }}
              >
                <p
                  className="font-display font-normal leading-snug mb-4"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {faq.q}
                </p>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}
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
        <ServicesIndex />
        <TrustBand />
        <ServiceDetails />
        <Process />
        <Proof />
        <Pricing />
        <FAQ />
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
