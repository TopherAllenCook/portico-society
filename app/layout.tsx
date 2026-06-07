import type { Metadata, Viewport } from 'next'
import { Fraunces } from 'next/font/google'
import JsonLd from '@/components/verve/JsonLd'
import CalScript from '@/components/verve/CalScript'
import GoogleAnalytics from '@/components/verve/GoogleAnalytics'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const SITE_URL = 'https://www.vervemd.com'
const SITE_NAME = 'Verve MD'
const SITE_TITLE = 'Verve MD: Marketing for Home Service Businesses'
const SITE_DESCRIPTION =
  'The marketing department for home service businesses. Get found in AI search, answer every call day or night, and turn more inquiries into booked jobs. Free audit, no sales call.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s · Verve MD',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Verve MD', url: SITE_URL }],
  keywords: [
    'home services marketing',
    'contractor marketing',
    'plumber marketing',
    'HVAC marketing',
    'AEO',
    'answer engine optimization',
    'AI search visibility',
    'local service ads management',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'business',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f1ead9' },
    { media: '(prefers-color-scheme: dark)', color: '#211c18' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>
        {children}
        <JsonLd />
        <CalScript />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
