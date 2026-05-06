import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import CostOfInvisibility from '@/components/CostOfInvisibility'
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
