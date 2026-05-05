import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative flex min-h-svh overflow-hidden" aria-label="Hero">

      {/* Left panel: editorial photo */}
      <div className="relative flex-1 lg:flex-[3]">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 62vw"
          className="object-cover"
          style={{ filter: 'brightness(0.36) saturate(0.65)' }}
          aria-hidden="true"
        />
        {/* Deep bottom gradient anchors the headline */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, oklch(16% 0.006 35 / 0.92) 0%, oklch(16% 0.006 35 / 0.4) 42%, transparent 68%)',
          }}
          aria-hidden="true"
        />
        {/* Right edge dissolves into terracotta */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, transparent 45%, oklch(47% 0.135 33 / 0.92) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Right panel: terracotta (desktop only) */}
      <div
        className="relative hidden bg-terracotta lg:block lg:flex-[2]"
        aria-hidden="true"
      >
        {/* Film-grain texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.045,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Editorial still life — lower half of panel, Valencia-style corner image */}
        <div className="absolute inset-x-0 bottom-0 h-[46%] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=85&auto=format&fit=crop"
            alt=""
            fill
            sizes="(max-width: 1023px) 0px, 38vw"
            className="object-cover object-center"
            style={{ filter: 'brightness(0.48) saturate(0.6)' }}
          />
          {/* Fade from terracotta at top edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, oklch(47% 0.135 33) 0%, transparent 48%)',
            }}
          />
        </div>

        {/* Vertical category tag */}
        <p
          className="absolute right-7 top-1/2 -translate-y-1/2 origin-center rotate-90 font-body text-[9px] font-medium tracking-[0.4em] uppercase"
          style={{
            color: 'oklch(92% 0.03 40 / 0.28)',
            whiteSpace: 'nowrap',
          }}
        >
          AI-Enhanced Luxury Marketing
        </p>
      </div>

      {/* Content layer — anchored to the bottom */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 lg:px-16 lg:pb-24">

        {/* Headline — Valencia-style size contrast between lines */}
        <h1>
          {/* Qualifier line: quiet, creates rhythm before the crash */}
          <span
            className="block font-display font-normal"
            style={{
              fontSize: 'clamp(1rem, 3vw, 2.5rem)',
              color: 'oklch(97% 0.006 62 / 0.5)',
              letterSpacing: '0.06em',
              marginBottom: '0.2em',
            }}
          >
            The Market
          </span>
          {/* Dominant line: enormous, italic, terracotta accent */}
          <span
            className="block font-display italic leading-[0.82]"
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 12rem)',
              color: 'oklch(92% 0.03 40)',
            }}
          >
            Has Changed.
          </span>
        </h1>

        {/* Hook — gives the skeptic a specific reason to stay */}
        <p
          className="font-body mt-8 max-w-[44ch] text-sm font-light leading-relaxed lg:text-base"
          style={{ color: 'oklch(97% 0.006 62 / 0.62)' }}
        >
          Your competitors are already appearing in AI-generated recommendations.
          You may not be. The audit tells you exactly where you stand.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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
    </section>
  )
}
