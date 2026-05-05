import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-terracotta px-6 pb-24 pt-32 lg:px-16"
      aria-label="Hero"
    >
      {/* Subtle texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Eyebrow */}
        <p
          className="font-body mb-8 text-xs font-medium tracking-[0.22em] uppercase"
          style={{ color: 'oklch(92% 0.03 40 / 0.65)' }}
        >
          AI-Enhanced Marketing for Luxury Service Brands
        </p>

        {/* Headline */}
        <h1
          className="font-display font-normal leading-[0.93] text-parchment"
          style={{ fontSize: 'var(--text-display)' }}
        >
          The Market
          <br />
          <span style={{ color: 'oklch(92% 0.03 40)' }}>Has Changed.</span>
        </h1>

        {/* Subhead */}
        <p
          className="font-body mt-8 max-w-[52ch] text-base font-light leading-relaxed lg:mt-10 lg:text-lg"
          style={{ color: 'oklch(97% 0.006 62 / 0.7)' }}
        >
          Portico Society builds precision marketing for luxury service brands that refuse
          to disappear. AI implementation, search, and paid media — calibrated for
          hospitality, concierge medicine, longevity, beauty, and events.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-14">
          <Link
            href="#audit"
            className="font-body inline-block bg-parchment px-8 py-4 text-xs font-semibold tracking-[0.12em] uppercase text-inkwell transition-colors duration-300 hover:bg-terracotta-pale"
          >
            Request a Free AI Visibility Audit
          </Link>
          <Link
            href="#services"
            className="font-body inline-flex items-center gap-2 px-2 py-4 text-xs font-medium tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-70"
            style={{ color: 'oklch(97% 0.006 62 / 0.6)' }}
          >
            Explore the Society
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div
          className="h-12 w-px"
          style={{
            backgroundColor: 'oklch(97% 0.006 62 / 0.35)',
            animation: 'pulse-soft 2.4s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
