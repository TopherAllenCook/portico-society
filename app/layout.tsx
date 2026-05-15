import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Verve MD: Marketing for Longevity & Aesthetics Clinics',
  description:
    'We help longevity and aesthetics clinics make more money. SEO, PPC, AI tools, and web design built exclusively for longevity and aesthetics practices.',
  openGraph: {
    title: 'Verve MD',
    description: 'We help longevity and aesthetics clinics make more money.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>{children}</body>
    </html>
  )
}
