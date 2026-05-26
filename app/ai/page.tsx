import NavVerve from '@/components/verve/NavVerve'
import AIHeroVerve from '@/components/verve/AIHeroVerve'
import AIWorkflowVerve from '@/components/verve/AIWorkflowVerve'
import AIServicesListVerve from '@/components/verve/AIServicesListVerve'
import AIBottomCTAVerve from '@/components/verve/AIBottomCTAVerve'
import PhotoBandVerve from '@/components/verve/PhotoBandVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

const PAGE_URL = 'https://www.vervemd.com/ai'
const PAGE_TITLE = 'AI Systems for Longevity & Aesthetics Clinics'
const PAGE_DESC =
  'Five AI systems built for longevity and aesthetics clinics: patient agent, lead nurture, reputation management, no-show recovery, and retention.'

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

const AI_SYSTEMS = [
  { name: 'AI Patient Agent', desc: '24/7 voice and chat agent that qualifies inquiries, books consults, and hands off to staff when needed.' },
  { name: 'Lead Nurture Engine', desc: 'Automated sequence that warms inquiries between consult booking and arrival, reducing no-shows and ghosting.' },
  { name: 'Reputation Management System', desc: 'Two-touch review request flow that lifts review-to-visit conversion from category-average 3% to 12%+.' },
  { name: 'No-Show Recovery', desc: 'Automated re-engagement that recovers ghosted consults and books replacement slots before staff notices.' },
  { name: 'Retention Engine', desc: 'Post-visit cadence that drives re-booking, referral, and membership renewal for longevity, aesthetics, and concierge patients.' },
]

const pageLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vervemd.com' },
        { '@type': 'ListItem', position: 2, name: 'AI Systems', item: PAGE_URL },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#systems`,
      name: 'AI Systems for Clinics',
      itemListElement: AI_SYSTEMS.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: s.name,
          description: s.desc,
          provider: { '@id': 'https://www.vervemd.com#organization' },
          serviceType: s.name,
          areaServed: { '@type': 'Country', name: 'United States' },
          audience: {
            '@type': 'BusinessAudience',
            audienceType: 'Longevity, concierge, and aesthetic medicine practices',
          },
        },
      })),
    },
  ],
}

export default function AIPage() {
  return (
    <>
      <NavVerve light />
      <main>
        <AIHeroVerve />
        <AIWorkflowVerve />
        <PhotoBandVerve
          src="https://images.unsplash.com/photo-1660557989725-f511e9fa6267?auto=format&fit=crop&w=2400&q=80"
          height="clamp(220px, 28vw, 360px)"
        />
        <AIServicesListVerve />
        <AIBottomCTAVerve />
      </main>
      <FooterVerve />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
    </>
  )
}
