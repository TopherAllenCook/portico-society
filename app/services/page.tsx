import type { Metadata } from 'next'
import NavV2 from '@/components/v2/NavV2'
import SvcHero from '@/components/SvcHero'
import SvcServicesGrid from '@/components/SvcServicesGrid'
import SvcTrustStrip from '@/components/SvcTrustStrip'
import SvcServiceDetail from '@/components/SvcServiceDetail'
import SvcProcess from '@/components/SvcProcess'
import ProofV2 from '@/components/v2/ProofV2'
import SvcTiers from '@/components/SvcTiers'
import SvcFAQ from '@/components/SvcFAQ'
import BeginCTA from '@/components/BeginCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Services — Verve',
  description:
    'AI search authority, patient inquiry architecture, and growth systems for longevity, concierge, and aesthetic medicine practices. Three engagement tiers, one starting point: the free audit.',
}

export default function ServicesPage() {
  return (
    <>
      <NavV2 dark={false} />
      <main>
        {/* Offer: agency identity + dual CTA */}
        <SvcHero />
        {/* What we build: 4 service cards with anchor links */}
        <SvcServicesGrid />
        {/* Trust: testimonial + stats */}
        <SvcTrustStrip />
        {/* Detail: what each system includes */}
        <SvcServiceDetail />
        {/* Process: 4 numbered steps */}
        <SvcProcess />
        {/* Proof: extended testimonial + results */}
        <ProofV2 />
        {/* Pricing: 3 tier cards */}
        <SvcTiers />
        {/* FAQ: 5 physician objections */}
        <SvcFAQ />
        {/* CTA: audit request form */}
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
