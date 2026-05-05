import Image from 'next/image'
import Link from 'next/link'
import RevealOnScroll from './RevealOnScroll'

const tiers = [
  {
    label: 'Society Membership',
    tagline: 'For brands building over time.',
    description:
      'A retainer engagement covering AI implementation, SEO, and reporting. We become your marketing department. Monthly strategy, weekly execution, quarterly roadmap review.',
    cta: 'Apply for Membership',
    href: '/contact?tier=membership',
    accent: true,
  },
  {
    label: 'House Engagement',
    tagline: 'For a specific campaign or launch.',
    description:
      'A defined-scope project engagement. Launch campaigns, site migrations, ad account audits, or AI buildouts. One objective, completed properly, with a clear deliverable.',
    cta: 'Begin a Conversation',
    href: '/contact?tier=house',
    accent: false,
  },
]

export default function Memberships() {
  return (
    <section
      className="bg-parchment px-6 py-24 lg:px-16 lg:py-32"
      aria-labelledby="memberships-heading"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <header className="mb-16 lg:mb-20">
            <p className="font-body mb-4 text-xs font-medium tracking-[0.2em] uppercase text-stone-mid">
              Engagements
            </p>
            <h2
              id="memberships-heading"
              className="font-display font-normal text-inkwell"
              style={{ fontSize: 'var(--text-headline)' }}
            >
              Two ways to work
              <br />
              with us.
            </h2>
          </header>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {tiers.map((tier, i) => (
            <RevealOnScroll key={tier.label} delay={i * 120}>
              <article
                className={
                  tier.accent
                    ? 'flex flex-col overflow-hidden'
                    : 'flex flex-col gap-6 p-10 lg:p-12'
                }
                style={{
                  backgroundColor: tier.accent
                    ? 'oklch(47% 0.135 33)'
                    : 'oklch(90% 0.005 55)',
                }}
              >
                {tier.accent && (
                  <div className="relative h-48 flex-shrink-0 lg:h-56" aria-hidden="true">
                    <Image
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85&auto=format&fit=crop"
                      alt=""
                      fill
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className="object-cover"
                      style={{ filter: 'brightness(0.38) saturate(0.55)' }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to bottom, transparent 30%, oklch(47% 0.135 33) 100%)',
                      }}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-6 p-10 lg:p-12">
                  <p
                    className="font-body text-xs font-medium tracking-[0.18em] uppercase"
                    style={{
                      color: tier.accent
                        ? 'oklch(92% 0.03 40 / 0.55)'
                        : 'oklch(16% 0.006 35 / 0.45)',
                    }}
                  >
                    {tier.label}
                  </p>

                  <h3
                    className="font-display font-normal leading-tight"
                    style={{
                      fontSize: 'var(--text-title)',
                      color: tier.accent ? 'oklch(97% 0.006 62)' : 'oklch(16% 0.006 35)',
                    }}
                  >
                    {tier.tagline}
                  </h3>

                  <p
                    className="font-body text-base font-light leading-relaxed"
                    style={{
                      color: tier.accent
                        ? 'oklch(97% 0.006 62 / 0.62)'
                        : 'oklch(16% 0.006 35 / 0.62)',
                      maxWidth: '46ch',
                    }}
                  >
                    {tier.description}
                  </p>

                  <Link
                    href={tier.href}
                    className={[
                      'font-body mt-4 inline-block self-start border px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-200',
                      tier.accent
                        ? 'border-parchment text-parchment hover:bg-parchment hover:text-terracotta'
                        : 'border-terracotta text-terracotta hover:bg-terracotta hover:text-parchment',
                    ].join(' ')}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
