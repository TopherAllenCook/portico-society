import Image from 'next/image'
import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const services = [
  {
    number: '01',
    title: 'AI Search Authority',
    claim: 'Be the practice AI names when a patient asks.',
    results: [
      'Your practice appears in AI answers before a patient ever visits your website',
      'Own the top-three named practices for your specialty and market',
      'Receive patients who already trust you before they call',
    ],
    cta: 'Start building AI authority',
    image: '/longevity-medicine.png',
    imageAlt: 'Longevity medicine practice — the patient population AI authority captures first',
    imageRight: true,
  },
  {
    number: '02',
    title: 'Paid Patient Acquisition',
    claim: 'Fill your calendar while authority builds.',
    results: [
      'Google Search and Meta ads live within two weeks of engagement start',
      'Every audience targeted by procedure, geography, and income tier',
      'Every dollar measured in appointments booked, not impressions or clicks',
    ],
    cta: 'Start filling your calendar',
    image: '/concierge-medicine.png',
    imageAlt: 'Concierge medicine practice — the patients targeted paid acquisition reaches',
    imageRight: false,
  },
  {
    number: '03',
    title: 'Inquiry Architecture',
    claim: 'Capture every lead. Convert more of them.',
    results: [
      'Branded AI receptionist live on phone and web within 30 days',
      'Appointments booked directly into your scheduling system',
      'Every conversation logged, summarized, and sent to your inbox',
    ],
    cta: 'Capture every inquiry',
    image: '/hero-physician.png',
    imageAlt: 'Physician practice — every patient inquiry captured and converted',
    imageRight: true,
  },
  {
    number: '04',
    title: 'Growth Foundation',
    claim: 'Turn every patient into a compounding referral.',
    results: [
      'Automated review capture triggered after every appointment',
      'Post-visit engagement that keeps patients active and referring',
      'Referral program that tracks, rewards, and measures results',
    ],
    cta: 'Build your referral engine',
    image: '/aesthetic-medicine.png',
    imageAlt: 'Aesthetic medicine practice — growth built on reputation and referral',
    imageRight: false,
  },
]

function InlineCTA({ label }: { label: string }) {
  return (
    <Link
      href="#begin"
      className="font-mono inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase transition-opacity duration-200 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ color: 'var(--color-cinnabar-on-dark)', outlineColor: 'var(--color-cinnabar-on-dark)' }}
    >
      {label}
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7h10M7.5 3l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}

export default function SalesSvcServices() {
  return (
    <section
      id="services-detail"
      aria-labelledby="services-detail-heading"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      {/* Section header */}
      <div className="px-6 pt-24 pb-0 lg:px-16 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <RevealOnScroll>
            <div className="flex items-baseline gap-8 mb-14">
              <p
                className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-label-text-on-dark)' }}
              >
                What We Build
              </p>
              <div
                className="flex-1"
                style={{ height: '1px', backgroundColor: 'var(--color-ivory-dim)' }}
                aria-hidden="true"
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll soft>
            <h2
              id="services-detail-heading"
              className="font-display italic font-normal leading-snug mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: 'var(--color-ivory)',
                letterSpacing: '-0.025em',
              }}
            >
              Four systems. Every one of them earning.
            </h2>
            <p
              className="font-body font-light leading-relaxed"
              style={{
                fontSize: '1rem',
                color: 'var(--color-body-text-on-dark)',
                maxWidth: '52ch',
              }}
            >
              Every Verve Engagement builds all four in sequence. Each one compounds
              the next. Visibility drives inquiry. Inquiry handled well drives retention.
              Retention drives reputation and referral.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Service panels */}
      {services.map((svc, i) => (
        <RevealOnScroll key={svc.number}>
          <article
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ borderTop: '1px solid var(--color-ivory-subtle)', marginTop: i === 0 ? '4rem' : 0 }}
            aria-labelledby={`svc-${svc.number}-heading`}
          >
            {/* Image panel */}
            <div
              className={`relative overflow-hidden ${svc.imageRight ? 'lg:order-2' : 'lg:order-1'}`}
              style={{ minHeight: 'clamp(18rem, 42vw, 36rem)' }}
            >
              <Image
                src={svc.image}
                alt={svc.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ filter: 'brightness(0.72) saturate(0.72)' }}
              />
              {/* Edge fade toward text column */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                  background: svc.imageRight
                    ? 'linear-gradient(to right, transparent 55%, var(--color-ink) 100%)'
                    : 'linear-gradient(to left, transparent 55%, var(--color-ink) 100%)',
                }}
              />
            </div>

            {/* Copy panel */}
            <div
              className={`flex flex-col justify-center px-6 py-16 lg:py-24 ${
                svc.imageRight
                  ? 'lg:order-1 lg:pl-8 lg:pr-16'
                  : 'lg:order-2 lg:pl-16 lg:pr-8'
              }`}
            >
              <p
                className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-5"
                style={{ color: 'var(--color-cinnabar-on-dark)' }}
              >
                {svc.number} &mdash; {svc.title}
              </p>

              <h3
                id={`svc-${svc.number}-heading`}
                className="font-display italic font-normal leading-snug mb-8"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  color: 'var(--color-ivory)',
                  letterSpacing: '-0.025em',
                  maxWidth: '20ch',
                }}
              >
                {svc.claim}
              </h3>

              <ul className="space-y-3 mb-10">
                {svc.results.map((r, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 font-body font-light"
                    style={{ fontSize: '0.875rem', color: 'var(--color-body-text-on-dark)' }}
                  >
                    <span
                      className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-cinnabar)' }}
                      aria-hidden="true"
                    />
                    {r}
                  </li>
                ))}
              </ul>

              <InlineCTA label={svc.cta} />
            </div>
          </article>
        </RevealOnScroll>
      ))}
    </section>
  )
}
