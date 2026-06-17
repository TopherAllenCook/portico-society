import NavVerve from '@/components/verve/NavVerve'
import PricingHeroVerve from '@/components/verve/PricingHeroVerve'
import PricingAIPackagesVerve from '@/components/verve/PricingAIPackagesVerve'
import PricingAlaCarteVerve from '@/components/verve/PricingAlaCarteVerve'
import TestimonialsVerve from '@/components/verve/TestimonialsVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

const PAGE_URL = 'https://www.vervemd.com/pricing'
const PAGE_TITLE = 'Pricing for Home Service Marketing'
const PAGE_DESC =
  'Straightforward marketing pricing for home service businesses: AI automation systems, à la carte services, and custom monthly plans built around your business. Month to month. No setup fees. Start with a free audit.'

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
        <TestimonialsVerve />
        <PricingAIPackagesVerve />
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
