import Link from 'next/link'

type Props = {
  href: string
  label: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'on-cinnabar'
  className?: string
}

export default function CTAButton({ href, label, variant = 'primary', className = '' }: Props) {
  const base = 'inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'

  const styles: Record<string, string> = {
    primary: 'bg-[var(--color-cinnabar)] text-[var(--color-ivory)] hover:opacity-90 focus-visible:outline-[var(--color-cinnabar)]',
    secondary: 'border border-[var(--color-ivory-muted)] text-[var(--color-ivory)] hover:border-[var(--color-ivory)] focus-visible:outline-[var(--color-ivory)]',
    ghost: 'text-[var(--color-body-text)] hover:text-[var(--color-ink)] focus-visible:outline-[var(--color-ink)]',
    'on-cinnabar': 'bg-[var(--color-ivory)] text-[var(--color-ink)] hover:opacity-90 focus-visible:outline-[var(--color-ivory)]',
  }

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {label}
    </Link>
  )
}
