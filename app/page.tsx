import NavV2 from '@/components/v2/NavV2'
import HeroV2 from '@/components/v2/HeroV2'
import ManifestoV2 from '@/components/v2/ManifestoV2'
import ServicesV2 from '@/components/v2/ServicesV2'
import ProcessV2 from '@/components/v2/ProcessV2'
import ProofV2 from '@/components/v2/ProofV2'
import CtaV2 from '@/components/v2/CtaV2'
import FooterV2 from '@/components/v2/FooterV2'

export default function HomePage() {
  return (
    <>
      <NavV2 />
      <main>
        <HeroV2 />
        <ManifestoV2 />
        <ServicesV2 />
        <ProcessV2 />
        <ProofV2 />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  )
}
