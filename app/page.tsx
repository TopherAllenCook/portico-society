import type { Metadata } from 'next'
import VerveVaulkMock from '@/components/mock/VerveVaulkMock'
import './mockup/mock.css'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main
      style={{
        ['--vk-font' as string]: 'var(--font-display-family)',
        ['--vk-mono-font' as string]: 'var(--font-mono-family)',
      }}
    >
      <VerveVaulkMock />
    </main>
  )
}
