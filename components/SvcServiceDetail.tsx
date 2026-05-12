import RevealOnScroll from './RevealOnScroll'

interface Service {
  id: string
  index: string
  name: string
  tier: string
  summary: string
  included: string[]
  forWhom: string
  outcome: string
}

const services: Service[] = [
  {
    id: 'service-aeo',
    index: '01',
    name: 'AI Search Authority',
    tier: 'Verve Engagement',
    summary: 'We build the signals that cause AI systems to recommend your practice — citation networks, entity authority, structured data, and content depth — across ChatGPT, Perplexity, Google AI, and Gemini.',
    included: [
      'AEO and SEO authority build in parallel',
      'Citation and entity profile development',
      'Structured data and schema implementation',
      'Monthly performance dashboard with AI platform tracking',
    ],
    forWhom: 'Established practices ready to own AI search in their specialty and market.',
    outcome: 'Your practice named first — or named at all — when patients use AI to find care.',
  },
  {
    id: 'service-inquiry',
    index: '02',
    name: 'Patient Inquiry Architecture',
    tier: 'Verve Engagement + Inquiry Architecture',
    summary: 'Most practices leak patients between first contact and booked appointment. We build the intake layer that captures, qualifies, and converts every inquiry — without adding front-desk load.',
    included: [
      'Booking and intake AI agent',
      'Inquiry qualification and routing',
      'CRO on the full inquiry flow',
      'Attribution tracking from source to appointment',
    ],
    forWhom: 'Practices with strong visibility but inconsistent inquiry-to-booking conversion.',
    outcome: 'More patients from the same lead volume. Fewer dropped inquiries.',
  },
  {
    id: 'service-reputation',
    index: '03',
    name: 'Reputation and Growth',
    tier: 'Verve Engagement',
    summary: 'Review volume and referral patterns are direct inputs into AI recommendation systems. We build and protect the authority signals that feed both patient trust and AI citations.',
    included: [
      'Review generation and response management',
      'Referral infrastructure development',
      'AI follow-up agent for patient re-engagement',
      'Reputation monitoring and alert system',
    ],
    forWhom: 'Practices with a strong clinical record but inconsistent online presence.',
    outcome: 'Review volume that compounds authority. A referral engine that runs without prompting.',
  },
  {
    id: 'service-advisory',
    index: '04',
    name: 'Strategic Advisory',
    tier: 'Strategic Advisory',
    summary: 'For situations that require more than execution. A new market launch, a competitive threat, a revenue decline, or a multi-location expansion — each scoped to the specific problem with clear milestones.',
    included: [
      'Everything in Verve Engagement',
      'PPC management',
      'Competitive intelligence',
      'Multi-location playbook',
      'CMO-level strategy and principal access',
    ],
    forWhom: 'Practices navigating a specific, high-stakes decision or transition.',
    outcome: 'A clear path through the situation. No ongoing commitment unless you choose one.',
  },
]

function DetailBlock({ svc, flip }: { svc: Service; flip: boolean }) {
  return (
    <div
      id={svc.id}
      className={`grid grid-cols-1 gap-16 lg:gap-20 lg:items-start ${
        flip ? 'lg:grid-cols-[1.1fr_1fr]' : 'lg:grid-cols-[1fr_1.1fr]'
      }`}
    >
      {/* Index + header — switches side on flip */}
      <div className={flip ? 'lg:order-2' : ''}>
        <p
          className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-3"
          style={{ color: 'var(--color-label-text)' }}
        >
          {svc.index}
        </p>
        <h3
          className="font-display italic font-normal leading-snug mb-2"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.025em',
          }}
        >
          {svc.name}
        </h3>
        <p
          className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-8"
          style={{ color: 'var(--color-cinnabar)' }}
        >
          {svc.tier}
        </p>
        <p
          className="font-body font-light leading-relaxed"
          style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '46ch' }}
        >
          {svc.summary}
        </p>
      </div>

      {/* Details panel */}
      <div className={flip ? 'lg:order-1' : ''}>
        <div
          className="p-8 lg:p-10"
          style={{ backgroundColor: 'var(--color-stone)' }}
        >
          <p
            className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-4"
            style={{ color: 'var(--color-label-text)' }}
          >
            Included
          </p>
          <ul className="space-y-2.5 mb-8">
            {svc.included.map((item) => (
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
          <div
            style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)', marginBottom: '1.25rem' }}
            aria-hidden="true"
          />
          <p
            className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-2"
            style={{ color: 'var(--color-label-text)' }}
          >
            Best fit
          </p>
          <p
            className="font-body font-light leading-relaxed mb-5"
            style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
          >
            {svc.forWhom}
          </p>
          <p
            className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-2"
            style={{ color: 'var(--color-label-text)' }}
          >
            What changes
          </p>
          <p
            className="font-body font-light leading-relaxed"
            style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
          >
            {svc.outcome}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SvcServiceDetail() {
  return (
    <section
      aria-labelledby="service-detail-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              The Work
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll soft>
          <h2
            id="service-detail-heading"
            className="font-display italic font-normal leading-snug mb-16 lg:mb-24"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
              maxWidth: '22ch',
            }}
          >
            What each system includes.
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col gap-24 lg:gap-32">
          {services.map((svc, i) => (
            <RevealOnScroll key={svc.id}>
              <DetailBlock svc={svc} flip={i % 2 === 1} />
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}
