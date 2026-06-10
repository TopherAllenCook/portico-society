'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function RefreshOnInterval({ ms }: { ms: number }) {
  const router = useRouter()
  useEffect(() => {
    const id = setInterval(() => router.refresh(), ms)
    return () => clearInterval(id)
  }, [ms, router])
  return null
}
