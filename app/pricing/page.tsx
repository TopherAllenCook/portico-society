import NavVerve from '@/components/verve/NavVerve'
import PricingHeroVerve from '@/components/verve/PricingHeroVerve'
import PricingPackagesVerve from '@/components/verve/PricingPackagesVerve'
import PricingAIPackagesVerve from '@/components/verve/PricingAIPackagesVerve'
import BundleBuilderVerve from '@/components/verve/BundleBuilderVerve'
import PricingAlaCarteVerve from '@/components/verve/PricingAlaCarteVerve'
import TestimonialsVerve from '@/components/verve/TestimonialsVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

const PAGE_URL = 'https://www.vervemd.com/pricing'
const PAGE_TITLE = 'Pricing for Longevity & Aesthetics Clinic Marketing'
const PAGE_DESC =
  'Straightforward monthly retainers for longevity and aesthetics clinic marketing. Essential ($1,500), Growth ($3,500), and Full Service ($6,500). Month to month. No setup fees.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', title: PAGE_TITLE, description: PAGE_DESC, images: ['/twitter-image'] },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vervemd.com' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: PAGE_URL },
  ],
}

export default function PricingPage() {
  return (
    <>
      <NavVerve light />
      <main>
        <PricingHeroVerve />
        <PricingPackagesVerve />
        <TestimonialsVerve />
        <PricingAIPackagesVerve />
        <BundleBuilderVerve />
        <PricingAlaCarteVerve />
      </main>
      <FooterVerve />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  )
}
