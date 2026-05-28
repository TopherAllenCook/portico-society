import NavVerve from '@/components/verve/NavVerve'
import PricingHeroVerve from '@/components/verve/PricingHeroVerve'
import SvcTiers from '@/components/SvcTiers'
import PricingAIPackagesVerve from '@/components/verve/PricingAIPackagesVerve'
import PricingAlaCarteVerve from '@/components/verve/PricingAlaCarteVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing · Verve MD',
  description: 'Engagement options for longevity, concierge, and aesthetic clinic marketing. Built around your practice, not a tier menu.',
}

export default function PricingPage() {
  return (
    <>
      <NavVerve light />
      <main>
        <PricingHeroVerve />
        <SvcTiers />
        <PricingAIPackagesVerve />
        <PricingAlaCarteVerve />
      </main>
      <FooterVerve />
    </>
  )
}
