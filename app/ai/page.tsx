import NavVerve from '@/components/verve/NavVerve'
import AIHeroVerve from '@/components/verve/AIHeroVerve'
import AIWorkflowVerve from '@/components/verve/AIWorkflowVerve'
import AIServicesListVerve from '@/components/verve/AIServicesListVerve'
import AIBottomCTAVerve from '@/components/verve/AIBottomCTAVerve'
import PhotoBandVerve from '@/components/verve/PhotoBandVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Systems for Clinics: Verve MD',
  description: 'Five AI systems built for longevity and aesthetics clinics: patient agent, lead nurture, reputation management, no-show recovery, and retention.',
}

export default function AIPage() {
  return (
    <>
      <NavVerve />
      <main>
        <AIHeroVerve />
        <AIWorkflowVerve />
        <PhotoBandVerve
          src="https://images.unsplash.com/photo-1660557989725-f511e9fa6267?auto=format&fit=crop&w=2400&q=80"
          height="clamp(220px, 28vw, 360px)"
        />
        <AIServicesListVerve />
        <AIBottomCTAVerve />
      </main>
      <FooterVerve />
    </>
  )
}
