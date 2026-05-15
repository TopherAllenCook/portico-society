import NavVerve from '@/components/verve/NavVerve'
import CalculatorVerve from '@/components/verve/CalculatorVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Revenue Calculator: Verve MD',
  description: 'See how much additional revenue your longevity or aesthetics clinic could add in 12 months with Verve MD.',
}

export default function CalculatorPage() {
  return (
    <>
      <NavVerve />
      <main style={{ paddingTop: '5rem' }}>
        <CalculatorVerve />
      </main>
      <FooterVerve />
    </>
  )
}
