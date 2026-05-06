import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import CostOfInvisibility from '@/components/CostOfInvisibility'
import PhotoBand from '@/components/PhotoBand'
import WhatWeEngineer from '@/components/WhatWeEngineer'
import EngagementPaths from '@/components/EngagementPaths'
import Categories from '@/components/Categories'
import HowWeWork from '@/components/HowWeWork'
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
        <PhotoBand />
        <WhatWeEngineer />
        <EngagementPaths />
        <Categories />
        <HowWeWork />
        <SelectedWork />
        <BeginCTA />
      </main>
      <Footer />
    </>
  )
}
