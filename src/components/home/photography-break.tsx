import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

/**
 * From the Archive — four of the association's own photographs, hung
 * salon-style at their native scale. The gallery's ambassador on the home page.
 */
const plates = [
  { src: '/archive/hammam-2.jpg', title: 'Hammam el-Jédid, Tripoli', offset: '' },
  { src: '/archive/bijoutiers-1.jpg', title: "The Jeweler's Souk, Beirut", offset: 'lg:mt-24' },
  { src: '/archive/khan-khayatin.jpg', title: 'The Khans of Tripoli', offset: 'lg:mt-10' },
  { src: '/archive/salima-1.jpg', title: 'Salima', offset: 'lg:mt-32' },
]

export function PhotographyBreak() {
  return (
    <section className="section-dark border-y overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 py-24 md:py-36">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-end mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-8">
                From the Archive
              </p>
              <p
                className="font-body italic leading-[1.3] text-foreground max-w-[24ch]"
                style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
              >
                Stone by stone — the slow, patient work of keeping a place alive.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-4 font-display text-[12px] uppercase tracking-[0.28em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span className="link-rule">Enter the gallery</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 md:gap-x-10 gap-y-12 items-start">
          {plates.map((plate, index) => (
            <li key={plate.src} className={plate.offset}>
              <Reveal delay={index * 120}>
                <Link
                  href="/gallery"
                  data-cursor-label="View"
                  className="plate-hover group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <figure>
                    <div className="border border-border p-2.5 md:p-3.5 transition-colors duration-700 group-hover:border-primary/60">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={plate.src}
                          alt={`Archive photograph: ${plate.title}`}
                          fill
                          sizes="(max-width: 1024px) 45vw, 280px"
                          className="plate object-cover group-hover:scale-[1.05]"
                        />
                      </div>
                    </div>
                    <figcaption className="pt-4 flex items-baseline gap-4">
                      <span className="font-display text-[10px] uppercase tracking-[0.3em] text-primary shrink-0">
                        Pl. {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base leading-snug text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {plate.title}
                      </span>
                    </figcaption>
                  </figure>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
