'use client'

import { type CSSProperties, type ReactNode } from 'react'

const CAL_LINK = 'christopher-cook-jfcxhu/verve-discovery'
const CAL_NAMESPACE = 'verve-discovery'

interface CalButtonProps {
  label?: string
  variant?: 'primary' | 'secondary' | 'link'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Button that opens the Cal.com booking modal. Requires <CalScript /> to be
 * mounted somewhere on the page (typically once in the root layout).
 */
export default function CalButton({
  label = 'Book a discovery call',
  variant = 'secondary',
  className,
  style,
  children,
}: CalButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 cursor-pointer'

  const variantClass =
    variant === 'primary'
      ? 'px-6 py-3'
      : variant === 'secondary'
      ? 'border px-6 py-3'
      : 'underline-offset-4 hover:underline'

  const baseStyle: CSSProperties =
    variant === 'primary'
      ? { background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }
      : variant === 'secondary'
      ? { background: 'transparent', borderColor: 'var(--color-ink)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }
      : { color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }

  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config='{"layout":"month_view"}'
      className={`${base} ${variantClass} ${className ?? ''}`}
      style={{ ...baseStyle, ...style }}
    >
      {children ?? label}
    </button>
  )
}
