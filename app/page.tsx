import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import SectorMarquee from '@/components/SectorMarquee'
import Manifesto from '@/components/Manifesto'
import Process from '@/components/Process'
import Results from '@/components/Results'
import Comparison from '@/components/Comparison'
import Memberships from '@/components/Memberships'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import AuditCTA from '@/components/AuditCTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <SectorMarquee />
        <Manifesto />
        <Process />
        <Results />
        <Comparison />
        <Memberships />
        <Testimonials />
        <FAQ />
        <AuditCTA />
      </main>
      <Footer />
    </>
  )
}
