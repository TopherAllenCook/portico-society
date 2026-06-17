import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { adminSupabase } from '@/lib/audit/supabase'
import { classifyTrade, type TradeFamily } from '@/lib/outbound/trade'

export const dynamic = 'force-dynamic'

/**
 * /preview/[slug]: auto-designed homepage mockup for an outbound prospect.
 *
 * Rendered from a mockup_previews row written by POST /api/outbound/mockup.
 * Section order follows the local-service consensus blueprint (phone CTA in
 * hero, trust badges, services, review proof, financing, repeat phone CTA) and
 * the type scale follows the 1.67 golden ratio. Always noindex.
 *
 * Trade (HVAC / plumbing / electrical / multi) is derived from the company NAME
 * at render time via classifyTrade — the upstream pipeline can't tell us the
 * real trade, so a plumber must never be shown an HVAC homepage. Trust badges
 * are derived only from data we actually have (Google rating/review count,
 * service area); we do not assert "Licensed & Insured", "24/7", or specific
 * financing terms we can't verify for a stranger's business.
 */

interface PreviewRow {
  slug: string
  company_name: string
  city: string | null
  state: string | null
  phone: string | null
  rating: number | null
  reviews: number | null
  specialty: string
  website: string | null
  accent: string
}

interface ServiceCard {
  name: string
  blurb: string
}

const HERO: Record<TradeFamily, string> = {
  hvac: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2400&q=80',
  plumbing: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=2400&q=80',
  electrical: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=2400&q=80',
  // No roofing photo in the verified set; reuse the (overlaid) HVAC hero so the
  // background always loads. Roofing is rare-to-absent in the current ICP.
  roofing: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2400&q=80',
}

const SINGLE: Record<
  TradeFamily,
  { label: string; noun: string; headline: string; services: ServiceCard[] }
> = {
  hvac: {
    label: 'Heating & Air',
    noun: 'HVAC',
    headline: 'Comfort you can count on.',
    services: [
      { name: 'AC Repair', blurb: 'Same-day diagnosis and repair when the cooling quits.' },
      { name: 'Heating', blurb: 'Furnace and heat pump service, repair, and replacement.' },
      { name: 'New Installs', blurb: 'Right-sized systems with honest, upfront pricing.' },
      { name: 'Maintenance Plans', blurb: 'Twice-yearly tune-ups that prevent the big bills.' },
    ],
  },
  plumbing: {
    label: 'Plumbing',
    noun: 'plumbing',
    headline: 'Plumbing done right the first time.',
    services: [
      { name: 'Emergency Repairs', blurb: 'Burst pipes and leaks handled fast, day or night.' },
      { name: 'Drain Cleaning', blurb: 'Clogs cleared right the first time.' },
      { name: 'Water Heaters', blurb: 'Repair, tankless upgrades, and full replacement.' },
      { name: 'Repipes & Remodels', blurb: 'Clean work, clear quotes, no surprises.' },
    ],
  },
  electrical: {
    label: 'Electric',
    noun: 'electrical',
    headline: 'Safe, reliable electrical work.',
    services: [
      { name: 'Panel Upgrades', blurb: 'Modern capacity for modern homes.' },
      { name: 'Troubleshooting', blurb: 'Flickers, trips, and dead outlets solved fast.' },
      { name: 'EV Chargers', blurb: 'Level 2 home charging, installed clean.' },
      { name: 'Lighting', blurb: 'Indoor, outdoor, and landscape lighting done right.' },
    ],
  },
  roofing: {
    label: 'Roofing',
    noun: 'roofing',
    headline: 'A roof that holds up.',
    services: [
      { name: 'Roof Repairs', blurb: 'Leaks and missing shingles fixed before they spread.' },
      { name: 'Replacements', blurb: 'Full tear-offs with clean, warrantied work.' },
      { name: 'Storm Damage', blurb: 'Fast response and insurance-claim help.' },
      { name: 'Inspections', blurb: 'Know where your roof stands before you buy or sell.' },
    ],
  },
}

// One signature card per family, used to assemble a multi-trade services grid.
const SIGNATURE: Record<TradeFamily, ServiceCard> = {
  hvac: { name: 'Heating & Cooling', blurb: 'AC and furnace repair, installs, and seasonal tune-ups.' },
  plumbing: { name: 'Plumbing', blurb: 'Leaks, drains, water heaters, and repipes.' },
  electrical: { name: 'Electrical', blurb: 'Panels, troubleshooting, and safe installs.' },
  roofing: { name: 'Roofing', blurb: 'Repairs, replacements, and storm-damage work.' },
}

// Value-prop padding cards (no service claim we can't stand behind).
const PADDING: ServiceCard[] = [
  { name: 'Upfront Pricing', blurb: 'Straight quotes before any work starts.' },
  { name: 'Local Crew', blurb: 'Technicians who know your neighborhood.' },
]

async function getRow(slug: string): Promise<PreviewRow | null> {
  const sb = adminSupabase()
  const { data } = await sb.from('mockup_previews').select('*').eq('slug', slug).single()
  return (data as PreviewRow) ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const row = await getRow(slug)
  return {
    title: row ? `${row.company_name} · Concept Preview` : 'Preview',
    robots: { index: false, follow: false },
  }
}

function formatPhone(raw: string | null) {
  if (!raw) return null
  const digits = raw.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')
  if (digits.length !== 10) return raw
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span aria-label={`${rating} star rating`} className="tracking-tight">
      {'★'.repeat(Math.min(5, full))}
      {'☆'.repeat(Math.max(0, 5 - full))}
    </span>
  )
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const row = await getRow(slug)
  if (!row) notFound()

  const phone = formatPhone(row.phone)
  const telHref = row.phone ? `tel:${row.phone.replace(/[^\d+]/g, '')}` : null
  const place = [row.city, row.state].filter(Boolean).join(', ')
  const accent = row.accent || '#0D6E7A'
  const hasProof = typeof row.rating === 'number' && (row.reviews ?? 0) > 0

  // Trade derives from the company NAME, not the (always-'hvac') stored value.
  const trade = classifyTrade(row.company_name)
  const view = trade.isMulti
    ? {
        label: 'Home Services',
        noun: 'home service',
        headline: 'One call for your whole home.',
        hero: HERO[trade.primary],
        services: [...trade.families.map((f) => SIGNATURE[f]), ...PADDING].slice(0, 4),
      }
    : { ...SINGLE[trade.primary], hero: HERO[trade.primary] }

  // Trust badges: only what the prospect's own Google data supports.
  const badges: string[] = []
  if (hasProof) badges.push(`${(row.rating as number).toFixed(1)} ★ on Google`)
  if (hasProof && (row.reviews ?? 0) > 0) badges.push(`${row.reviews} Google reviews`)
  if (place) badges.push(`Serving ${place}`)
  badges.push('Free estimates')
  if (badges.length < 4) badges.push('Locally owned & operated')
  const trustBadges = badges.slice(0, 4)

  // Type scale: 1.67 golden ratio steps from a 16px base (16 / 27 / 45 / 75).
  return (
    <main className="min-h-screen bg-white text-zinc-900 antialiased">
      {/* Hero: phone CTA above the fold, 10-word discipline */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${view.hero})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-zinc-950/65" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col px-6 py-8">
          <header className="flex items-center justify-between gap-4">
            <div className="text-[27px] font-bold leading-none text-white">{row.company_name}</div>
            {telHref && (
              <a
                href={telHref}
                className="rounded-full px-6 py-3 text-[16px] font-semibold text-white shadow-lg"
                style={{ backgroundColor: accent }}
              >
                Call {phone}
              </a>
            )}
          </header>
          <div className="py-24 sm:py-32">
            <p className="mb-4 text-[16px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {place ? `${place} ${view.label}` : view.label}
            </p>
            <h1 className="max-w-3xl text-[45px] font-bold leading-[1.05] text-white sm:text-[75px]">
              {view.headline}
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {telHref && (
                <a
                  href={telHref}
                  className="rounded-full px-8 py-4 text-[16px] font-semibold text-white shadow-xl"
                  style={{ backgroundColor: accent }}
                >
                  Call Now · {phone}
                </a>
              )}
              <a
                href="#estimate"
                className="rounded-full border border-white/40 px-8 py-4 text-[16px] font-semibold text-white"
              >
                Request Free Estimate
              </a>
            </div>
            {hasProof && (
              <p className="mt-8 text-[16px] text-white/90">
                <span style={{ color: '#FFC53D' }}>
                  <Stars rating={row.rating as number} />
                </span>{' '}
                {(row.rating as number).toFixed(1)} from {row.reviews} Google reviews
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Trust badges: derived only from the prospect's real Google data */}
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 text-center sm:grid-cols-4">
          {trustBadges.map((t) => (
            <div key={t} className="text-[16px] font-semibold text-zinc-700">
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-[45px] font-bold leading-tight">What we do</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {view.services.map((s) => (
            <div key={s.name} className="rounded-2xl border border-zinc-100 p-8 shadow-sm">
              <h3 className="text-[27px] font-semibold" style={{ color: accent }}>
                {s.name}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">{s.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Review proof */}
      {hasProof && (
        <section className="bg-zinc-950 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:grid-cols-2">
            <div>
              <div className="text-[75px] font-bold leading-none">{(row.rating as number).toFixed(1)}</div>
              <div className="mt-2 text-[27px]" style={{ color: '#FFC53D' }}>
                <Stars rating={row.rating as number} />
              </div>
              <p className="mt-4 text-[16px] text-white/70">
                Rated by {row.reviews} of your neighbors on Google.
              </p>
            </div>
            <p className="text-[27px] font-medium leading-snug text-white/90">
              {place ? `${place} trusts ${row.company_name}.` : `Your neighbors trust ${row.company_name}.`} The
              reviews say it better than we ever could.
            </p>
          </div>
        </section>
      )}

      {/* Value band: upfront pricing, no unverifiable financing claim */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div
          className="rounded-3xl px-10 py-16 text-white"
          style={{ background: `linear-gradient(120deg, ${accent}, #1c1c22)` }}
        >
          <h2 className="text-[45px] font-bold leading-tight">Upfront pricing, no surprises.</h2>
          <p className="mt-4 max-w-xl text-[16px] text-white/80">
            Straight quotes before the work starts. Ask about financing options on new system installs.
          </p>
        </div>
      </section>

      {/* Final CTA: repeat the phone number (consensus position: last) */}
      <section id="estimate" className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-[45px] font-bold leading-tight">
            {row.city ? `Need ${view.noun} help in ${row.city}?` : `Need ${view.noun} help today?`}
          </h2>
          {telHref ? (
            <a
              href={telHref}
              className="mt-10 inline-block rounded-full px-10 py-5 text-[27px] font-semibold text-white shadow-xl"
              style={{ backgroundColor: accent }}
            >
              {phone}
            </a>
          ) : (
            <p className="mt-6 text-[16px] text-zinc-600">Call today for a free estimate.</p>
          )}
          <p className="mt-6 text-[16px] text-zinc-500">Free estimates. Straight answers. Local crew.</p>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-10 text-center">
          <p className="text-[16px] font-semibold text-zinc-700">{row.company_name}</p>
          {place && <p className="text-[14px] text-zinc-500">{place}</p>}
          <p className="mt-4 text-[12px] text-zinc-400">
            Concept preview prepared by VerveMD for {row.company_name}. Not a live website.
          </p>
        </div>
      </footer>
    </main>
  )
}
