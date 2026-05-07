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
  title: 'Verve — AI Visibility for Longevity and Concierge Practices',
  description:
    'Verve engineers AI search authority, patient inquiry systems, and recurring revenue growth for longevity, concierge medicine, and aesthetic practices.',
  openGraph: {
    title: 'Verve',
    description: 'Be the answer high net worth patients are already asking AI for.',
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
