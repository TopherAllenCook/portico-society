import type { Metadata } from 'next'
import NavV2 from '@/components/v2/NavV2'
import SvcHero from '@/components/SvcHero'
import SvcProblem from '@/components/SvcProblem'
import SvcContrast from '@/components/SvcContrast'
import ProofV2 from '@/components/v2/ProofV2'
import SvcProcess from '@/components/SvcProcess'
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
        {/* Attention: market shift headline + dual CTA */}
        <SvcHero />
        {/* Pain: AI search stats + early pricing anchor */}
        <SvcProblem />
        {/* Contrast: generic agency vs. what Verve builds */}
        <SvcContrast />
        {/* Proof: testimonial + results */}
        <ProofV2 />
        {/* Process: 4 numbered steps */}
        <SvcProcess />
        {/* Close: 3 tier cards */}
        <SvcTiers />
        {/* FAQ: 5 physician objections */}
        <SvcFAQ />
        {/* Final close: audit request form */}
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
