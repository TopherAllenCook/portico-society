import NavVerve from '@/components/verve/NavVerve'
import PricingHeroVerve from '@/components/verve/PricingHeroVerve'
import PricingPackagesVerve from '@/components/verve/PricingPackagesVerve'
import PricingAIPackagesVerve from '@/components/verve/PricingAIPackagesVerve'
import PricingAlaCarteVerve from '@/components/verve/PricingAlaCarteVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Verve MD',
  description: 'Straightforward pricing for longevity and aesthetics clinic marketing. Essential, Growth, and Full Service plans.',
}

export default function PricingPage() {
  return (
    <>
      <NavVerve />
      <main>
        <PricingHeroVerve />
        <PricingPackagesVerve />
        <PricingAIPackagesVerve />
        <PricingAlaCarteVerve />
      </main>
      <FooterVerve />
    </>
  )
}
