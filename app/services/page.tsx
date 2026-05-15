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
import FooterVerve from '@/components/verve/FooterVerve'

export const metadata: Metadata = {
  title: 'Services / Verve MD',
  description:
    'AI search authority, patient inquiry architecture, and growth systems for longevity, concierge, and aesthetic medicine practices. Three engagement tiers, one starting point: the free audit.',
}

export default function ServicesPage() {
  return (
    <>
      <NavV2 dark={false} />
      <main>
        <SvcHero />
        <SvcServicesGrid />
        <SvcTrustStrip />
        <SvcServiceDetail />
        <SvcProcess />
        <ProofV2 />
        <SvcTiers />
        <SvcFAQ />
        <BeginCTA />
      </main>
      <FooterVerve />
    </>
  )
}
