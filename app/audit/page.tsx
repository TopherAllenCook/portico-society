import NavVerve from '@/components/verve/NavVerve'
import AuditHeroVerve from '@/components/verve/AuditHeroVerve'
import AuditFormVerve from '@/components/verve/AuditFormVerve'
import AuditWhatYouGetVerve from '@/components/verve/AuditWhatYouGetVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AEO + Marketing Audit — Verve MD',
  description: 'Find out if AI recommends your clinic. Free AEO visibility audit + marketing assessment for longevity and aesthetics practices.',
}

export default function AuditPage() {
  return (
    <>
      <NavVerve />
      <main>
        <AuditHeroVerve />
        <section className="px-6 py-16 lg:px-16" style={{ background: 'var(--color-ink)' }}>
          <AuditFormVerve />
        </section>
        <AuditWhatYouGetVerve />
      </main>
      <FooterVerve />
    </>
  )
}
