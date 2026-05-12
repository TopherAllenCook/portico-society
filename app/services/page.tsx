import type { Metadata } from 'next'
import NavV2 from '@/components/v2/NavV2'
import SalesSvcHero from '@/components/SalesSvcHero'
import CostOfInvisibility from '@/components/CostOfInvisibility'
import SalesSvcServices from '@/components/SalesSvcServices'
import ProofV2 from '@/components/v2/ProofV2'
import SalesSvcPricing from '@/components/SalesSvcPricing'
import SalesSvcRiskReversal from '@/components/SalesSvcRiskReversal'
import CtaBridge from '@/components/CtaBridge'
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
        {/* Attention: headline + dual CTA */}
        <SalesSvcHero />
        {/* Pain: animated stats on what's being lost */}
        <CostOfInvisibility />
        {/* Solution: four service panels + add-ons, each with inline CTA */}
        <SalesSvcServices />
        {/* Proof: testimonial + results + visibility bars */}
        <ProofV2 />
        {/* Bridge: catch ready-to-convert readers between proof and pricing */}
        <CtaBridge />
        {/* Close: two-tier pricing, CTA on each path */}
        <SalesSvcPricing />
        {/* Risk reversal: free audit, zero commitment */}
        <SalesSvcRiskReversal />
        {/* Final close: audit request form */}
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
