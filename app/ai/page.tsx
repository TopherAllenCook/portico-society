import NavVerve from '@/components/verve/NavVerve'
import AIHeroVerve from '@/components/verve/AIHeroVerve'
import AIWorkflowVerve from '@/components/verve/AIWorkflowVerve'
import AIPartnersVerve from '@/components/verve/AIPartnersVerve'
import AIServicesListVerve from '@/components/verve/AIServicesListVerve'
import AIBottomCTAVerve from '@/components/verve/AIBottomCTAVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Systems for Clinics — Verve MD',
  description: 'Five AI systems built for longevity and aesthetics clinics: patient agent, lead nurture, reputation management, no-show recovery, and retention.',
}

export default function AIPage() {
  return (
    <>
      <NavVerve />
      <main>
        <AIHeroVerve />
        <AIWorkflowVerve />
        <AIPartnersVerve />
        <AIServicesListVerve />
        <AIBottomCTAVerve />
      </main>
      <FooterVerve />
    </>
  )
}
