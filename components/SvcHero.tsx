import Image from 'next/image'
import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const pillars = [
  { label: 'AI Search Authority', desc: 'Be the practice AI cites.' },
  { label: 'Paid Patient Acquisition', desc: 'Google Ads and social while authority builds.' },
  { label: 'Inquiry Architecture', desc: 'Every lead captured and converted.' },
  { label: 'Growth Foundation', desc: 'Retention, reputation, referral.' },
]

export default function SvcHero() {
  return (
    <section
      className="relative px-6 pt-40 pb-28 lg:px-16 lg:pt-52 lg:pb-40"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="services-hero-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <p
            className="font-mono text-xs font-medium tracking-[0.18em] uppercase mb-10"
            style={{ color: 'var(--color-label-text)' }}
          >
            Services
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <h1
            id="services-hero-heading"
            className="font-display italic font-normal leading-none mb-14"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.025em',
            }}
          >
            Three practices appear.<br />Most clinics aren&rsquo;t one of them.
          </h1>
        </RevealOnScroll>

        <RevealOnScroll>
          <div
            className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 lg:items-start"
            style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '2.5rem' }}
          >
            {/* Left: intro + pillars */}
            <div>
              <p
                className="font-body font-light leading-relaxed mb-10"
                style={{ fontSize: '1rem', color: 'var(--color-body-text)', maxWidth: '46ch' }}
              >
                When a high net worth patient asks an AI which longevity clinic to visit,
                three practices are named. If yours is not among them, you are losing patients
                you will never know you lost. We fix that, and we build the systems that
                convert the ones who do find you.
              </p>

              <ul className="space-y-6" aria-label="Four areas of work">
                {pillars.map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span
                      className="mt-[0.6rem] h-1 w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-cinnabar)' }}
                      aria-hidden="true"
                    />
                    <div>
                      <span
                        className="font-display font-normal block"
                        style={{ fontSize: '1.0625rem', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="font-body font-light block text-sm mt-0.5"
                        style={{ color: 'var(--color-body-text)' }}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: editorial photo — swap src to /consultation-editorial.jpg when ready */}
            <div>
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/hero-physician.png"
                  alt="Physician in private practice consultation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: 'brightness(0.88) saturate(0.6)' }}
                />
              </div>
              <p
                className="font-mono text-xs tracking-[0.1em] mt-3"
                style={{ color: 'var(--color-label-text)' }}
              >
                Longevity medicine · Private practice
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div
            className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: '1px solid var(--color-ink-rule)', paddingTop: '1.75rem', marginTop: '2.5rem' }}
          >
            <p
              className="font-body font-light"
              style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)' }}
            >
              Start with the free AI visibility audit. No discovery call required.
            </p>
            <Link
              href="#begin"
              className="font-body inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cinnabar text-ivory hover:bg-cinnabar-dark flex-shrink-0"
              style={{ outlineColor: 'var(--color-cinnabar)' }}
            >
              Request the free audit
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
