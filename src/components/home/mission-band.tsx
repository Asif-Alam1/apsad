import { Reveal } from '@/components/ui/reveal'
import { SplitText } from '@/components/ui/split-text'

/* The aims are condensed from APSAD's stated objectives (apsad.net, "Our history") */
const aims = [
  {
    numeral: 'I',
    title: 'Protect & Restore',
    description:
      'Promote the protection and restoration of ancient buildings of historic and artistic character, and the conservation of natural sites.',
  },
  {
    numeral: 'II',
    title: 'Act Upon the Law',
    description:
      'Advance and defend the legal frameworks that shield Lebanon’s architectural heritage from demolition.',
  },
  {
    numeral: 'III',
    title: 'Enlist Investment',
    description:
      'Persuade investors that preservation pays — economically, culturally, and in the standing of the country.',
  },
  {
    numeral: 'IV',
    title: 'Awaken the Public',
    description:
      'Raise awareness of urban and environmental problems through campaigns, publications, and debate in three languages.',
  },
  {
    numeral: 'V',
    title: 'Strengthen the Fabric',
    description:
      'Mobilize communities around their own heritage, stimulating civic responsibility and a sense of custodianship.',
  },
  {
    numeral: 'VI',
    title: 'Build Toward Tourism',
    description:
      'Develop architectural and natural sites so Lebanon regains the standing it deserves on a regional scale.',
  },
]

const figures = [
  { value: '1960', label: 'Founded in Beirut' },
  { value: '100+', label: 'Treasures saved' },
  { value: '4', label: 'Regional sections' },
  { value: '5', label: 'International affiliations' },
]

/**
 * Daylight breaks into the nocturne home page here — the chiaroscuro turn.
 */
export function MissionBand() {
  return (
    <section className="section-light py-24 md:py-36">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                Why We Exist
              </p>
              <SplitText
                as="h2"
                className="font-display uppercase tracking-[0.03em] text-4xl md:text-[3.25rem] leading-[1.06]"
              >
                Proud of its past, trustful in its future
              </SplitText>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={150}>
              <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed max-w-[46ch]">
                APSAD requests all initiatives and accepts all suggestions; it
                saves old buildings and coordinates every effort within the
                field. From the founding charter onward, the work has followed
                six aims.
              </p>
            </Reveal>
          </div>
        </div>

        {/* The six aims — a ruled index, not a card grid */}
        <div className="grid md:grid-cols-2 gap-x-12 border-b border-border">
          {aims.map((aim, index) => (
            <Reveal key={aim.numeral} delay={(index % 2) * 100}>
              <div className="group relative h-full border-t border-border py-9 md:py-11 grid grid-cols-[3.5rem_1fr] md:grid-cols-[5.5rem_1fr] gap-x-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-full bg-foreground/70 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[var(--ease-expo)]"
                />
                <span
                  className="font-display text-3xl md:text-[2.5rem] leading-none text-primary pt-1"
                  aria-hidden="true"
                >
                  {aim.numeral}
                </span>
                <div>
                  <h3 className="font-display text-2xl md:text-[1.75rem] leading-[1.15] tracking-[0.02em] mb-3 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
                    {aim.title}
                  </h3>
                  <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[44ch]">
                    {aim.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Figures — a ruled ledger row */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-foreground/40">
          {figures.map((figure, index) => (
            <Reveal
              key={figure.label}
              delay={index * 100}
              className={[
                'border-b border-border lg:border-b-0',
                index % 2 === 1 ? 'border-l' : '',
                index > 0 ? 'lg:border-l' : '',
              ].join(' ')}
            >
              <div
                className={[
                  'py-8 md:py-10',
                  index % 2 === 1 ? 'pl-6' : 'pr-4',
                  index > 0 ? 'lg:pl-8' : '',
                ].join(' ')}
              >
                <p className="font-display text-5xl md:text-7xl leading-none text-foreground">
                  {figure.value}
                </p>
                <p className="font-display text-[11px] uppercase tracking-[0.28em] leading-relaxed text-muted-foreground mt-5">
                  {figure.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
