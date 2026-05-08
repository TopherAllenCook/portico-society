import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import SvcHero from '@/components/SvcHero'
import SvcArbitrage from '@/components/SvcArbitrage'
import SvcProductized from '@/components/SvcProductized'
import SvcTraining from '@/components/SvcTraining'
import SvcBundles from '@/components/SvcBundles'
import BeginCTA from '@/components/BeginCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Services — Verve',
  description:
    'Two motions, one engine. Arbitrage services where we carry the risk, and productized AI services on monthly retainer. Local lead gen, AI Receptionist, AEO, automations, and more.',
}

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <SvcHero />
        <SvcArbitrage />
        <SvcProductized />
        <SvcTraining />
        <SvcBundles />
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
