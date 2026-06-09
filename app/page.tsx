import NavVerve from '@/components/verve/NavVerve'
import HeroVerve from '@/components/verve/HeroVerve'
import LogoStripVerve from '@/components/verve/LogoStripVerve'
import PainPointsVerve from '@/components/verve/PainPointsVerve'
import ResultsVerve from '@/components/verve/ResultsVerve'
import PackagesOverviewVerve from '@/components/verve/PackagesOverviewVerve'
import PhotoBandVerve from '@/components/verve/PhotoBandVerve'
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
        <PhotoBandVerve src="https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=2400&q=80" />
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
