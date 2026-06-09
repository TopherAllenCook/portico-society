import NavVerve from '@/components/verve/NavVerve'
import HeroVerve from '@/components/verve/HeroVerve'
import LogoStripVerve from '@/components/verve/LogoStripVerve'
import PainPointsVerve from '@/components/verve/PainPointsVerve'
import ResultsVerve from '@/components/verve/ResultsVerve'
import PackagesOverviewVerve from '@/components/verve/PackagesOverviewVerve'
import AEOBlockVerve from '@/components/verve/AEOBlockVerve'
import TestimonialsVerve from '@/components/verve/TestimonialsVerve'
import WhoWeWorkWithVerve from '@/components/verve/WhoWeWorkWithVerve'
import BottomCTAVerve from '@/components/verve/BottomCTAVerve'
import FooterVerve from '@/components/verve/FooterVerve'

export default function HomePage() {
  return (
    <>
      <NavVerve light />
      <main>
        <HeroVerve />
        <LogoStripVerve />
        <PainPointsVerve />
        <ResultsVerve />
        <PackagesOverviewVerve />
        <AEOBlockVerve />
        <TestimonialsVerve />
        <WhoWeWorkWithVerve />
        <BottomCTAVerve />
      </main>
      <FooterVerve />
    </>
  )
}
