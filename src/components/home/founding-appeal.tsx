import { Reveal } from '@/components/ui/reveal'

/**
 * The 1960 founding appeal as a typographic set-piece.
 * The quote is verbatim from APSAD's first appeal to the Lebanese people.
 */
export function FoundingAppeal() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-12 text-center">
            The First Appeal · 1960
          </p>
        </Reveal>

        <Reveal delay={150}>
          <figure className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-14 left-1/2 -translate-x-1/2 font-body italic text-[7rem] leading-none text-primary/30 select-none"
            >
              «
            </span>
            <blockquote
              className="font-body italic text-center leading-[1.35] text-foreground"
              style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.75rem)' }}
            >
              Take care: this heritage is sacked, abandoned, despised —
              disfigured by ugly buildings, incoherent suburbs, and cities
              without dignity&hellip;
            </blockquote>
            <figcaption className="mt-10 text-center">
              <span className="font-display text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                APSAD&apos;s appeal to the Lebanese people
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-16 mx-auto max-w-xl text-center">
            <div className="h-px w-16 bg-primary/50 mx-auto mb-8" aria-hidden="true" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              The appeal called on those who would preserve harmonious towns and
              villages — <em>a welcoming Lebanon, proud of its past, trustful in
              its future</em>. Lebanon answered. A hundred architectural
              treasures have been saved since, through plans, drawings, and
              stubborn devotion.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
