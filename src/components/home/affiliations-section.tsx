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
    <section className="section-light py-24 md:py-36 border-t border-border">
      <div className="container max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="mb-14 md:mb-20">
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
              In Good Company
            </p>
            <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-[3.25rem] leading-[1.06] max-w-[16ch]">
              The company of guardians
            </h2>
          </div>
        </Reveal>

        <div className="border-b border-border">
          {affiliations.map((item, index) => (
            <Reveal key={item.name} delay={index * 80}>
              <div className="group relative border-t border-border py-8 md:py-10 grid lg:grid-cols-12 gap-x-12 gap-y-3 items-baseline">
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-full bg-foreground/70 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[var(--ease-expo)]"
                />
                <span
                  aria-hidden="true"
                  className="hidden lg:block lg:col-span-1 font-display text-[11px] tracking-[0.28em] text-muted-foreground"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="lg:col-span-4 font-display text-2xl md:text-[1.75rem] leading-[1.15] tracking-[0.02em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
                  {item.name}
                </h3>
                <p className="lg:col-span-3 font-display text-[11px] uppercase tracking-[0.28em] leading-relaxed text-primary">
                  {item.tenure}
                </p>
                <p className="lg:col-span-4 text-[17px] text-muted-foreground leading-relaxed max-w-[46ch]">
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
