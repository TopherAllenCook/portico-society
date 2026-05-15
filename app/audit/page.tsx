import NavVerve from '@/components/verve/NavVerve'
import AuditHeroVerve from '@/components/verve/AuditHeroVerve'
import AuditFormVerve from '@/components/verve/AuditFormVerve'
import AuditWhatYouGetVerve from '@/components/verve/AuditWhatYouGetVerve'
import PhotoBandVerve from '@/components/verve/PhotoBandVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AEO + Marketing Audit: Verve MD',
  description: 'Find out if AI recommends your clinic. Free AEO visibility audit + marketing assessment for longevity and aesthetics practices.',
}

export default function AuditPage() {
  return (
    <>
      <NavVerve light />
      <main>
        <AuditHeroVerve />
        <PhotoBandVerve
          src="https://images.unsplash.com/photo-1657687380097-88a4a3570bba?auto=format&fit=crop&w=2400&q=80"
          height="clamp(200px, 26vw, 340px)"
        />
        <section id="audit-form" className="px-6 py-16 lg:px-16" style={{ background: 'var(--color-ink)' }}>
          <AuditFormVerve />
        </section>
        <AuditWhatYouGetVerve />
      </main>
      <FooterVerve />
    </>
  )
}
