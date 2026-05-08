import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import CostOfInvisibility from '@/components/CostOfInvisibility'
import TheFragmentation from '@/components/TheFragmentation'
import PhotoBand from '@/components/PhotoBand'
import WhatWeEngineer from '@/components/WhatWeEngineer'
import EngagementPaths from '@/components/EngagementPaths'
import Categories from '@/components/Categories'
import HowWeWork from '@/components/HowWeWork'
import Testimonials from '@/components/Testimonials'
import SelectedWork from '@/components/SelectedWork'
import BeginCTA from '@/components/BeginCTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CostOfInvisibility />
        <TheFragmentation />
        <PhotoBand />
        <WhatWeEngineer />
        <Categories />
        <HowWeWork />
        <Testimonials />
        <SelectedWork />
        <EngagementPaths />
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
