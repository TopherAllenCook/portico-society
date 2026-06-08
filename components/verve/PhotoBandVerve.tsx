import Image from 'next/image'

type Props = {
  src?: string
  alt?: string
  height?: string
}

const DEFAULT_SRC =
  'https://images.unsplash.com/photo-1473308822086-710304d7d30c?auto=format&fit=crop&w=2400&q=80'

export default function PhotoBandVerve({
  src = DEFAULT_SRC,
  alt = '',
  height = 'clamp(240px, 32vw, 420px)',
}: Props) {
  const decorative = alt === ''
  return (
    <section
      {...(decorative ? { 'aria-hidden': true } : {})}
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: 'center' }}
      />
    </section>
  )
}
