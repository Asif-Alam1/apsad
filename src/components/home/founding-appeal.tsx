import { Reveal } from '@/components/ui/reveal'

/**
 * The 1960 founding appeal as a typographic set-piece.
 * The quote is verbatim from APSAD's first appeal to the Lebanese people.
 */
export function FoundingAppeal() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-10 md:mb-14">
            The First Appeal · 1960
          </p>
        </Reveal>

        <figure>
          <Reveal delay={150}>
            <div className="grid lg:grid-cols-12 gap-x-12">
              <blockquote
                className="relative lg:col-span-10 font-body italic leading-[1.14] text-foreground"
                style={{ fontSize: 'clamp(1.875rem, 4.6vw, 4.25rem)' }}
              >
                <span
                  aria-hidden="true"
                  className="text-primary/70 select-none xl:absolute xl:left-0 xl:top-0 xl:-translate-x-[125%]"
                >
                  «{' '}
                </span>
                Take care: this heritage is sacked, abandoned, despised —
                disfigured by ugly buildings, incoherent suburbs, and cities
                without dignity&hellip;
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-14 md:mt-20 border-t border-border pt-8 grid lg:grid-cols-12 gap-x-12 gap-y-8">
              <figcaption className="lg:col-span-5">
                <span className="font-display text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                  APSAD&apos;s appeal to the Lebanese people
                </span>
              </figcaption>
              <p className="lg:col-span-6 lg:col-start-7 text-[17px] md:text-lg leading-relaxed text-muted-foreground max-w-[58ch]">
                The appeal called on those who would preserve harmonious towns and
                villages — <em>a welcoming Lebanon, proud of its past, trustful in
                its future</em>. Lebanon answered. A hundred architectural
                treasures have been saved since, through plans, drawings, and
                stubborn devotion.
              </p>
            </div>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}
