import NavVerve from '@/components/verve/NavVerve'
import HeroVerve from '@/components/verve/HeroVerve'
import LogoStripVerve from '@/components/verve/LogoStripVerve'
import PainPointsVerve from '@/components/verve/PainPointsVerve'
import ResultsVerve from '@/components/verve/ResultsVerve'
import PackagesOverviewVerve from '@/components/verve/PackagesOverviewVerve'
import CalculatorVerve from '@/components/verve/CalculatorVerve'
import PhotoBandVerve from '@/components/verve/PhotoBandVerve'
import AIToolsVerve from '@/components/verve/AIToolsVerve'
import AEOBlockVerve from '@/components/verve/AEOBlockVerve'
import TestimonialsVerve from '@/components/verve/TestimonialsVerve'
import WhoWeWorkWithVerve from '@/components/verve/WhoWeWorkWithVerve'
import BottomCTAVerve from '@/components/verve/BottomCTAVerve'
import FooterVerve from '@/components/verve/FooterVerve'

export default function HomePage() {
  return (
    <>
      <NavVerve />
      <main>
        <HeroVerve />
        <LogoStripVerve />
        <PainPointsVerve />
        <ResultsVerve />
        <PackagesOverviewVerve />
        <CalculatorVerve />
        <PhotoBandVerve />
        <AIToolsVerve />
        <AEOBlockVerve />
        <TestimonialsVerve />
        <WhoWeWorkWithVerve />
        <BottomCTAVerve />
      </main>
      <FooterVerve />
    </>
  )
}
