import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden" aria-label="Hero">

      {/* Full-bleed editorial photo — no panel split */}
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90&auto=format&fit=crop"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ filter: 'brightness(0.44) saturate(0.7)' }}
        aria-hidden="true"
      />

      {/* Clean bottom gradient — legibility only, no panel blending */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, oklch(16% 0.006 35 / 0.88) 0%, oklch(16% 0.006 35 / 0.15) 38%, transparent 58%)',
        }}
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="absolute inset-0 flex flex-col justify-between px-6 pb-16 pt-24 lg:px-16 lg:pb-24 lg:pt-32">

        {/* Top: eyebrow */}
        <p
          className="font-body text-xs font-medium tracking-[0.22em] uppercase"
          style={{ color: 'oklch(97% 0.006 62 / 0.5)' }}
        >
          AI-Enhanced Marketing — Luxury Service Brands
        </p>

        {/* Bottom: two-column layout — headline left, hook + CTAs right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">

          {/* Left: headline */}
          <h1
            className="font-display font-normal leading-[0.88] text-parchment"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            The Market
            <br />
            <em style={{ color: 'oklch(92% 0.03 40)', fontStyle: 'italic' }}>Has Changed.</em>
          </h1>

          {/* Right: hook + CTAs */}
          <div>
            <p
              className="font-body max-w-[44ch] text-base font-light leading-relaxed lg:text-lg"
              style={{ color: 'oklch(97% 0.006 62 / 0.65)' }}
            >
              Your competitors are already appearing in AI-generated recommendations.
              You may not be. The audit tells you exactly where you stand.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#audit"
                className="font-body inline-block bg-parchment px-8 py-4 text-xs font-semibold tracking-[0.12em] uppercase text-inkwell transition-colors duration-300 hover:bg-terracotta-pale"
              >
                Request a Free AI Visibility Audit
              </Link>
              <Link
                href="#services"
                className="font-body inline-flex items-center gap-2 px-2 py-4 text-xs font-medium tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-70"
                style={{ color: 'oklch(97% 0.006 62 / 0.65)' }}
              >
                Explore the Society
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
        </div>
      </div>
    </section>
  )
}
