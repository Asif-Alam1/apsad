import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ParallaxImage } from '@/components/ui/parallax-image'

/**
 * Full-bleed photographic chapter break between the daylight sections —
 * the gallery's ambassador on the home page.
 */
export function PhotographyBreak() {
  return (
    <section className="relative">
      <ParallaxImage
        src="/image-2.jpeg"
        alt="Restorers at work on the scaffolded stone arches of a heritage site"
        className="h-[68vh] md:h-[78vh]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[hsla(26,20%,5%,0.85)] via-[hsla(26,20%,5%,0.1)] to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0">
        <div className="container max-w-6xl mx-auto px-6 pb-10 md:pb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="font-body italic text-xl md:text-2xl text-[hsl(40_30%_92%)] max-w-md leading-snug">
            Stone by stone — the slow, patient work of keeping a place alive.
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 font-display text-[12px] uppercase tracking-[0.28em] text-[hsl(38_52%_68%)] hover:text-[hsl(38_52%_78%)] transition-colors shrink-0 pb-1"
          >
            Enter the gallery
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
