import { Reveal } from '@/components/ui/reveal'

const affiliations = [
  {
    name: 'Europa Nostra',
    tenure: 'Member since 1963',
    note: 'Through APSAD, Lebanon is the only non-European country in Europe’s federation of heritage organizations.',
  },
  {
    name: 'ICOMOS',
    tenure: 'Official partner in Lebanon',
    note: 'UNESCO’s principal advisor on the conservation of the world’s monuments and sites.',
  },
  {
    name: 'World Monuments Fund',
    tenure: 'Collaboration',
    note: 'Together, the region of Enfeh was placed on the list of the world’s 100 most endangered sites.',
  },
  {
    name: 'Patrimoine Sans Frontières',
    tenure: 'Member since 1996',
    note: 'Locating threats to old heritage and answering them with concrete action.',
  },
  {
    name: 'Civitas Nostra',
    tenure: 'Member since 1961',
    note: 'Assemblies and congresses across the historic cities of Europe.',
  },
]

export function AffiliationsSection() {
  return (
    <section className="section-light py-24 md:py-32 border-t border-border">
      <div className="container max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
              In Good Company
            </p>
            <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-5xl leading-[1.1]">
              The company of guardians
            </h2>
          </div>
        </Reveal>

        <div>
          {affiliations.map((item, index) => (
            <Reveal key={item.name} delay={index * 80}>
              <div className="group border-t border-border last:border-b py-7 md:py-8 grid md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                <h3 className="md:col-span-4 font-display text-2xl md:text-[1.7rem] tracking-[0.02em] group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="md:col-span-3 font-display text-[11px] uppercase tracking-[0.25em] text-primary">
                  {item.tenure}
                </p>
                <p className="md:col-span-5 text-base text-muted-foreground leading-relaxed">
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
