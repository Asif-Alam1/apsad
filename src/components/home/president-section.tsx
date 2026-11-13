import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

/**
 * Night returns — the President's word, adapted from Raya Daouk's
 * September 2016 message on apsad.net.
 */
export function PresidentSection() {
  return (
    <section className="section-dark py-24 md:py-36 border-t">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
          <Reveal className="lg:col-span-3">
            <div className="plate-hover relative aspect-[3/4] overflow-hidden max-w-[14rem] lg:max-w-none border border-border p-3">
              <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/Raya.jpg"
                alt="Raya Daouk, President of APSAD"
                fill
                className="plate"
                style={{ objectFit: 'cover', objectPosition: '100% 30%' }}
                sizes="(max-width: 1024px) 90vw, 30vw"
              />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal delay={150}>
              <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-8 md:mb-10">
                From the President
              </p>
              <blockquote
                className="font-body italic leading-[1.22] text-foreground"
                style={{ fontSize: 'clamp(1.625rem, 3.1vw, 2.75rem)' }}
              >
                Our cultural heritage is of a richness beyond telling. We must
                look past the disappointing chronology of the everyday and never
                succumb to indifference — but learn again to respect our
                heritage, and to love our country.
              </blockquote>
              <p lang="fr" className="font-body italic text-muted-foreground mt-8 text-lg md:text-xl">
                « Réapprendre à respecter notre patrimoine et aimer notre pays. »
              </p>
              <div className="mt-12 md:mt-16 border-t border-border pt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <p className="font-display text-xl tracking-[0.05em]">Raya Daouk</p>
                <p className="font-display text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  President, APSAD
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
