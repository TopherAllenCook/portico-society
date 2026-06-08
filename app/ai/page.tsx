import NavVerve from '@/components/verve/NavVerve'
import AIHeroVerve from '@/components/verve/AIHeroVerve'
import AIWorkflowVerve from '@/components/verve/AIWorkflowVerve'
import AIServicesListVerve from '@/components/verve/AIServicesListVerve'
import AIBottomCTAVerve from '@/components/verve/AIBottomCTAVerve'
import PhotoBandVerve from '@/components/verve/PhotoBandVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

const PAGE_URL = 'https://www.vervemd.com/ai'
const PAGE_TITLE = 'AI Systems for Home Service Businesses'
const PAGE_DESC =
  'Five AI systems built for home service businesses: call agent, lead nurture, reputation management, missed-call recovery, and reactivation.'

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
  { name: 'AI Call Agent', desc: '24/7 voice, chat, and text agent that qualifies inquiries, books jobs, and hands off to your team when needed.' },
  { name: 'Lead Nurture Engine', desc: 'Automated sequence that warms inquiries between first contact and a booked job, reducing ghosting.' },
  { name: 'Reputation Management System', desc: 'Two-touch review request flow that lifts review-to-job conversion from category-average 3% to 12%+.' },
  { name: 'Missed-Call Recovery', desc: 'Automated text-back that recovers missed calls and books the job before the customer calls a competitor.' },
  { name: 'Reactivation Engine', desc: 'Post-job cadence that drives repeat work, referrals, and maintenance renewals from past customers.' },
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
      name: 'AI Systems for Home Service Businesses',
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
            audienceType: 'Home service businesses and trade contractors',
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
          src="https://images.unsplash.com/photo-1473308822086-710304d7d30c?auto=format&fit=crop&w=2400&q=80"
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
