import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/admin/auth'
import OwnerEconomicsCalculator from '@/components/verve/OwnerEconomicsCalculator'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Owner Economics',
  robots: { index: false, follow: false },
}

export default async function OwnerEconomicsPage() {
  if (!(await isAdmin())) redirect('/admin/login?next=/admin/owner-economics')
  return <OwnerEconomicsCalculator />
}
