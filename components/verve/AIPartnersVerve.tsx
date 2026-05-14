const PARTNERS = [
  {
    category: 'SEO & AEO Fulfillment',
    name: 'Agency Platform',
    url: 'https://www.agencyplatform.com',
    role: 'Powers SEO, AEO, and AI visibility in Essential & Growth plans',
    description:
      'Handles keyword research, on-site fixes, local citations, and content built to appear in Google AI Overviews, ChatGPT, Gemini, and Perplexity. Your live performance dashboard shows rankings and AI search visibility — updated automatically.',
  },
  {
    category: 'Automation & AI Platform',
    name: 'GoHighLevel',
    url: 'https://www.gohighlevel.com',
    role: 'Powers Lead Nurture, No-Show Recovery, Reputation, Retention',
    description:
      'The automation platform behind your clinic\'s AI systems. Manages SMS, email, booking, and reviews — all configured specifically for your practice.',
  },
  {
    category: 'AI Voice & Chat Agent',
    name: 'Lety.ai',
    url: 'https://lety.ai',
    role: 'Powers AI Patient Agent across all channels',
    description:
      'Handles patient conversations across voice, web chat, WhatsApp, Instagram DMs, and SMS. Every interaction is branded to your clinic — patients never know it\'s automated unless you tell them.',
  },
  {
    category: 'Reputation Management',
    name: 'Birdeye',
    url: 'https://birdeye.com',
    role: 'Powers AI Reputation Manager across Google, Yelp, and Healthgrades',
    description:
      'Monitors your reviews across Google, Yelp, and Healthgrades. Sends review requests after every visit, alerts you when a negative review comes in, and drafts responses for your approval.',
  },
  {
    category: 'PPC Management',
    name: 'Clicks Geek',
    url: 'https://clicksgeek.com/industries/med-spas',
    role: 'Powers paid ads in Growth & Full Service plans',
    description:
      'Med spa specialists. Google Premier Partner + Meta Business Partner. They know HIPAA compliance, seasonal demand cycles, and how to build campaigns that close — not just get clicks.',
  },
]

export default function AIPartnersVerve() {
  return (
    <section
      className="px-6 py-20 lg:px-16 lg:py-28"
      style={{ background: 'var(--color-stone)' }}
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
        >
          Partner Stack
        </p>
        <h2
          id="partners-heading"
          className="mt-4 font-display font-semibold leading-tight tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-ink)', maxWidth: '28ch' }}
        >
          Specialist tools. Verve MD runs them.
        </h2>
        <p
          className="mt-3 text-sm"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
        >
          We don't build from scratch. We partner with the best tools in each category, configure them for your clinic, and manage everything under one roof.
        </p>

        <div className="mt-12" style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="grid gap-6 py-10 lg:grid-cols-[220px_1fr]"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <div>
                <span
                  className="inline-block text-xs font-medium uppercase tracking-[0.14em] px-2.5 py-1 rounded-full mb-3"
                  style={{
                    background: 'var(--color-cinnabar-pale)',
                    color: 'var(--color-cinnabar-dark)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {partner.category}
                </span>
                <p
                  className="font-display font-semibold"
                  style={{ fontSize: '1.15rem', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
                >
                  {partner.name}
                </p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {partner.role}
                </p>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '56ch' }}
              >
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-xs"
          style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)', maxWidth: '56ch' }}
        >
          Partner tools are not billed separately to clients. All costs are bundled into the Verve MD service fee. Clients own their data — no lock-in.
        </p>
      </div>
    </section>
  )
}
