import type { Metadata } from 'next'
import NavV2 from '@/components/v2/NavV2'
import SvcHero from '@/components/SvcHero'
import SvcEditorialBreak from '@/components/SvcEditorialBreak'
import SvcWhatWeBuild from '@/components/SvcWhatWeBuild'
import SvcEngagement from '@/components/SvcEngagement'
import SvcTraining from '@/components/SvcTraining'
import SvcTwoWays from '@/components/SvcTwoWays'
import SvcAuditDetail from '@/components/SvcAuditDetail'
import BeginCTA from '@/components/BeginCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Services — Verve',
  description:
    'AI search authority, patient inquiry architecture, and practice authority for longevity, concierge, and aesthetic medicine practices. Two engagement paths: Verve Engagement and Strategic Advisory.',
}

export default function ServicesPage() {
  return (
    <>
      <NavV2 dark={false} />
      <main>
        <SvcHero />
        <SvcEditorialBreak />
        <SvcWhatWeBuild />
        <SvcEngagement />
        <SvcAuditDetail />
        <SvcTraining />
        <SvcTwoWays />
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
