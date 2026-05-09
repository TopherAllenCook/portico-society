import type { Metadata } from 'next'
import NavV2 from '@/components/v2/NavV2'
import SvcHero from '@/components/SvcHero'
import SvcWhatWeBuild from '@/components/SvcWhatWeBuild'
import SvcEngagement from '@/components/SvcEngagement'
import SvcTwoWays from '@/components/SvcTwoWays'
import SvcAuditDetail from '@/components/SvcAuditDetail'
import BeginCTA from '@/components/BeginCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Services — Verve',
  description:
    'AI search authority, inquiry architecture, and growth foundation for longevity, concierge, and aesthetic medicine practices. Two engagement paths: Verve Engagement and Strategic Advisory.',
}

export default function ServicesPage() {
  return (
    <>
      <NavV2 dark={false} />
      <main>
        <SvcHero />
        <SvcWhatWeBuild />
        <SvcEngagement />
        <SvcTwoWays />
        <SvcAuditDetail />
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
