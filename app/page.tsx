import NavVerve from '@/components/verve/NavVerve'
import HeroVerve from '@/components/verve/HeroVerve'
import LogoStripVerve from '@/components/verve/LogoStripVerve'
import PainPointsVerve from '@/components/verve/PainPointsVerve'
import PhotoBandVerve from '@/components/verve/PhotoBandVerve'
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
        <PhotoBandVerve src="https://images.unsplash.com/photo-1595831708961-1b13c0dd2422?auto=format&fit=crop&w=2400&q=80" alt="An electrician in safety gear servicing power lines" />
        <ResultsVerve />
        <PackagesOverviewVerve />
        <PhotoBandVerve src="https://images.unsplash.com/photo-1601993198415-19d86ae28424?auto=format&fit=crop&w=2400&q=80" alt="Air-conditioning condenser units mounted on a warm building wall" />
        <AEOBlockVerve />
        <TestimonialsVerve />
        <WhoWeWorkWithVerve />
        <BottomCTAVerve />
      </main>
      <FooterVerve />
    </>
  )
}
