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
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                Why We Exist
              </p>
              <SplitText
                as="h2"
                className="font-display uppercase tracking-[0.03em] text-4xl md:text-5xl leading-[1.1]"
              >
                Proud of its past, trustful in its future
              </SplitText>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <Reveal delay={150}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                APSAD requests all initiatives and accepts all suggestions; it
                saves old buildings and coordinates every effort within the
                field. From the founding charter onward, the work has followed
                six aims.
              </p>
            </Reveal>
          </div>
        </div>

        {/* The six aims — a carved index, not a card grid */}
        <div className="grid md:grid-cols-2 gap-x-16">
          {aims.map((aim, index) => (
            <Reveal key={aim.numeral} delay={(index % 2) * 100}>
              <div className="group border-t border-border py-8 grid grid-cols-[3.5rem_1fr] gap-6">
                <span
                  className="font-display text-2xl text-primary/70 pt-0.5 group-hover:text-primary transition-colors duration-300"
                  aria-hidden="true"
                >
                  {aim.numeral}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-[0.02em] mb-2">{aim.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {aim.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Figures */}
        <div className="mt-20 border-t border-border pt-14 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {figures.map((figure, index) => (
            <Reveal key={figure.label} delay={index * 100}>
              <div className="text-center">
                <p className="font-display text-5xl md:text-6xl text-foreground">
                  {figure.value}
                </p>
                <p className="font-display text-[11px] uppercase tracking-[0.28em] text-muted-foreground mt-3">
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
