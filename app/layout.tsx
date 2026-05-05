import type { Metadata } from 'next'
import { Bodoni_Moda, Jost } from 'next/font/google'
import './globals.css'

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni-moda',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portico Society — Precision Marketing for Luxury Service Brands',
  description:
    'AI-enhanced SEO, PPC, and marketing strategy exclusively for luxury hospitality, concierge medicine, longevity, beauty, and events brands.',
  openGraph: {
    title: 'Portico Society',
    description: 'Precision marketing for luxury service brands that refuse to disappear.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
