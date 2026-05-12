/* Full-bleed editorial photo break between SvcHero and SvcWhatWeBuild.
   Swap the placeholder div for:

   import Image from 'next/image'
   <Image
     src="/editorial-break.jpg"
     alt=""
     fill
     sizes="100vw"
     className="object-cover"
     style={{ filter: 'brightness(0.85) saturate(0.65)' }}
     priority
   />

   Recommended shot: empty clinical consultation room, morning light,
   no people — desaturated toward the ivory/ink palette.
*/
export default function SvcEditorialBreak() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(280px, 45vh, 520px)', backgroundColor: 'var(--color-stone-mid)' }}
      aria-hidden="true"
      data-placeholder="editorial-break"
    />
  )
}
