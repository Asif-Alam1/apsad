import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

/**
 * Night returns — the President's word, adapted from Raya Daouk's
 * September 2016 message on apsad.net.
 */
export function PresidentSection() {
  return (
    <section className="section-dark py-24 md:py-36 border-t">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden max-w-sm mx-auto lg:mx-0">
              <Image
                src="/Raya.jpg"
                alt="Raya Daouk, President of APSAD"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 90vw, 30vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[hsla(26,20%,6%,0.6)] to-transparent"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal delay={150}>
              <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-10">
                From the President
              </p>
              <blockquote
                className="font-body italic leading-[1.4] text-foreground"
                style={{ fontSize: 'clamp(1.375rem, 2.6vw, 2.125rem)' }}
              >
                Our cultural heritage is of a richness beyond telling. We must
                look past the disappointing chronology of the everyday and never
                succumb to indifference — but learn again to respect our
                heritage, and to love our country.
              </blockquote>
              <p className="font-body italic text-muted-foreground mt-8 text-lg">
                « Réapprendre à respecter notre patrimoine et aimer notre pays. »
              </p>
              <div className="mt-10 flex items-center gap-5">
                <span className="h-px w-12 bg-primary" aria-hidden="true" />
                <div>
                  <p className="font-display text-lg tracking-[0.05em]">Raya Daouk</p>
                  <p className="font-display text-[11px] uppercase tracking-[0.28em] text-muted-foreground mt-1">
                    President, APSAD
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
