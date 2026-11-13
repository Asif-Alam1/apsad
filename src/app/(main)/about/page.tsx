import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { HorizontalText } from "@/components/ui/horizontal-text";
import { Magnetic } from "@/components/ui/magnetic";
import { TeamSection } from "@/components/TeamSection";

export const metadata: Metadata = {
  title: "The Association - APSAD's Story Since 1960",
  description:
    "APSAD — Association pour la Protection des Sites et Anciennes Demeures — was founded in Beirut in 1960. Discover the founding appeal, our mission, the regional sections, and the people behind six decades of Lebanese heritage preservation.",
};

const regions = [
  { name: "Beirut", role: "The salon on Sursock Street — headquarters since the founding" },
  { name: "Tripoli", role: "Regional section — from the Hammam el-Jédid to the old khans" },
  { name: "Deir el-Qamar", role: "Regional section — a rehabilitated residence in the Chouf since 1972" },
  { name: "Saïda & Aley", role: "Regional sections — carrying the work along the coast and mountain" },
];

const projects = [
  {
    title: "The Old Souk of Jounieh",
    period: "Since 2001",
    description:
      "Demolition bans won, restorations regulated, façades cleaned and repainted — and a festival that turns the souk into a pedestrian street by night.",
  },
  {
    title: "Tourist Centre of Jbeil",
    period: "2001 — 2002",
    description:
      "A historic residence restored with the DGA and the municipal council to welcome visitors to Kesrouan, Jbeil, and Batroun.",
  },
  {
    title: "Salima Village",
    period: "Two-year study",
    description:
      "With Patrimoine Sans Frontières and a team of Lebanese architects, seventy residences were classified as historic by the Ministry of Culture.",
  },
];

const chronicle = [
  {
    date: "May 2017",
    title: "National Heritage Days",
    note: "Three itineraries with the Ministry of Culture — departing the Linda Sursock palace for the old souks of Douma and Batroun, the fortresses of Niha in the Bekaa, and the silk works and heritage houses of Qobayat in Akkar.",
  },
  {
    date: "Jan 2017",
    title: "Nocturne d'opéra",
    note: "For APSAD's 57th anniversary, four voices and a string quintet among the marble gods of the National Museum of Beirut, under the patronage of the Minister of Culture.",
  },
  {
    date: "May 2016",
    title: "The Zaki Nassif Museum opens",
    note: "The composer's blue house in Mashghara returns as museum, cultural centre, and music school — some 1,100 works opened to the public, and APSAD's music school receiving its first students.",
  },
];

const press = [
  {
    outlet: "L'Orient-Le Jour",
    date: "January 2017",
    headline: "« Le patrimoine libanais sur un air d'opéra »",
    rtl: false,
  },
  {
    outlet: "Annahar",
    date: "January 2017",
    headline: "الموسيقى والغناء الأوبرالي أعادا رمق حياة إلى التماثيل الرخام",
    rtl: true,
  },
  {
    outlet: "Sky News Arabia",
    date: "August 2016",
    headline: "افتتاح متحف زكي ناصيف بذكراه المئوية",
    rtl: true,
  },
  {
    outlet: "L'Orient-Le Jour",
    date: "June 2016",
    headline: "« Bienvenue chez Zaki Nassif ! »",
    rtl: false,
  },
  {
    outlet: "Al Jazeera.net",
    date: "May 2016",
    headline: "منزل زكي ناصيف يتحول لمتحف ومعهد موسيقي",
    rtl: true,
  },
  {
    outlet: "Middle East Online",
    date: "June 2016",
    headline: "بيت زكي ناصيف متحفاً ومركزاً ثقافياً",
    rtl: true,
  },
];

const label =
  "font-display text-[11px] uppercase tracking-[0.36em] text-primary";
const labelMuted =
  "font-display text-[11px] uppercase tracking-[0.3em] text-muted-foreground";
const sectionPad = "py-[clamp(6rem,10vw,9rem)]";
const two = (n: number) => String(n).padStart(2, "0");

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Opener */}
      <section className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-6 pt-[clamp(3rem,7vw,6rem)] pb-[clamp(3.5rem,7vw,6rem)]">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-4 mb-[clamp(2.5rem,6vw,5rem)]">
              <p className={label}>Est. 1960 — Beirut</p>
              <p className={`${labelMuted} hidden sm:block`}>APSAD</p>
            </div>

            <SplitText
              as="h1"
              className="font-display uppercase tracking-[0.02em] text-[clamp(2.5rem,10.2vw,7.5rem)] leading-[0.98]"
            >
              The Association
            </SplitText>

            <div className="grid md:grid-cols-12 gap-x-8 gap-y-12 mt-[clamp(2.5rem,5vw,4.5rem)]">
              <div className="md:col-span-7 md:col-start-6 md:order-2">
                <p
                  lang="fr"
                  className="font-body italic text-[clamp(1.4rem,2.3vw,1.95rem)] leading-[1.32] text-foreground"
                >
                  Association pour la Protection des Sites et Anciennes
                  Demeures au Liban
                </p>
                <p className="mt-5 text-[17px] md:text-[18px] leading-relaxed text-muted-foreground max-w-[52ch]">
                  The Association for Protecting Natural Sites and Old
                  Buildings in Lebanon.
                </p>
              </div>

              <dl className="md:col-span-4 md:order-1 self-end border-t border-border">
                {[
                  ["Founded", "1960"],
                  ["Seat", "Sursock Street, Beirut"],
                  ["Sections", "Tripoli · Deir el-Qamar · Saïda & Aley"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-border py-3"
                  >
                    <dt className={labelMuted}>{k}</dt>
                    <dd className="text-[16px] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Founding */}
      <section id="history" className={`${sectionPad} scroll-mt-20`}>
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-8 gap-y-16">
            <Reveal className="lg:col-span-7">
              <p className={`${label} mb-6`}>The Founding</p>
              <h2 className="font-display uppercase tracking-[0.03em] text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06] mb-10">
                An appeal, answered
              </h2>
              <div className="space-y-5 text-[18px] md:text-[19px] leading-[1.65] text-muted-foreground max-w-[62ch]">
                <p className="dropcap text-foreground">
                  In 1960, APSAD launched its first appeal to the Lebanese
                  people — to those who would preserve harmonious,
                  well-ordered towns and villages;{" "}
                  <em>
                    a welcoming Lebanon, proud of its past, trustful in its
                    future
                  </em>
                  .
                </p>
                <p>
                  Those who wished to save their heritage joined the
                  association and supported its action. APSAD requests all
                  initiatives, accepts all suggestions, saves old buildings,
                  and coordinates all efforts within the field.
                </p>
                <p>
                  Wherever you go in Lebanon, you will find the print of that
                  work: around one hundred architectural treasures saved
                  through plans, drawings, and painstaking documentation, and
                  regional sections carrying the mission across the country.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-12">
                <Magnetic>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-[12px] tracking-[0.22em] uppercase px-7 h-12"
                  >
                    <Link href="/gallery" className="flex items-center gap-2">
                      See the Sites
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button
                    asChild
                    variant="outline"
                    className="font-display text-[12px] tracking-[0.22em] uppercase px-7 h-12"
                  >
                    <Link href="/get-involved">Join the Mission</Link>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={200} className="lg:col-span-5 lg:pt-[4.5rem]">
              <figure className="plate-hover group max-w-[520px] lg:ml-auto">
                <div className="border border-border p-3 sm:p-4">
                  <div className="relative aspect-[800/557] overflow-hidden bg-secondary">
                    <Image
                      src="/archive/deirelkamar-1.jpg"
                      alt="Deir el-Qamar, from the APSAD archive"
                      fill
                      sizes="(max-width: 1024px) 90vw, 480px"
                      className="plate object-cover group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <figcaption className="mt-4 grid grid-cols-[auto_1fr] items-baseline gap-5 border-t border-border pt-3">
                  <span className="font-display text-[11px] uppercase tracking-[0.3em] text-primary tabular-nums">
                    Pl. 01
                  </span>
                  <span className="font-body italic text-[15px] leading-snug text-muted-foreground">
                    Deir el-Qamar, in the Chouf — from the association&rsquo;s
                    archive.
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2">
            {[
              {
                numeral: "I",
                kicker: "Purpose",
                title: "Our Mission",
                body: "To identify, protect, conserve, and promote the cultural and natural heritage of Lebanon — acting upon the laws that shield it, restoring what can be saved, and documenting what must be remembered, so that these assets pass intact to the next generation.",
              },
              {
                numeral: "II",
                kicker: "Aspiration",
                title: "Our Vision",
                body: "A Lebanon whose architectural and natural heritage is universally valued and defended — where old souks, houses, and sites are living sources of knowledge, identity, and sustainable prosperity, and where the country regains the standing its past deserves.",
              },
            ].map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 150}
                className={`py-[clamp(4rem,8vw,7rem)] ${
                  index === 0
                    ? "md:pr-[clamp(2rem,5vw,5rem)] border-b md:border-b-0 md:border-r border-border"
                    : "md:pl-[clamp(2rem,5vw,5rem)]"
                }`}
              >
                <div className="flex items-baseline justify-between gap-6 mb-8">
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none text-primary"
                  >
                    {item.numeral}
                  </span>
                  <span className={labelMuted}>{item.kicker}</span>
                </div>
                <h2 className="font-display uppercase tracking-[0.04em] text-[clamp(1.7rem,3vw,2.25rem)] leading-[1.1] mb-6">
                  {item.title}
                </h2>
                <p className="text-[18px] leading-[1.65] text-muted-foreground max-w-[46ch]">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section className={sectionPad}>
        <div className="container max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="grid md:grid-cols-12 gap-x-8 gap-y-4 items-end mb-[clamp(3rem,6vw,5rem)]">
              <p className={`${label} md:col-span-4`}>Across Lebanon</p>
              <h2 className="md:col-span-8 font-display uppercase tracking-[0.03em] text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
                Where we work
              </h2>
            </div>
          </Reveal>

          {/* Regional sections — ruled index */}
          <ol className="mb-[clamp(5rem,9vw,8rem)] border-b border-border">
            {regions.map((region, index) => (
              <li key={region.name}>
                <Reveal delay={index * 80}>
                  <div className="group grid grid-cols-[2.75rem_1fr] md:grid-cols-12 gap-x-4 md:gap-x-8 gap-y-2 items-baseline border-t border-border py-6 md:py-8">
                    <span className="md:col-span-1 font-display text-[12px] tracking-[0.2em] text-primary tabular-nums">
                      {two(index + 1)}
                    </span>
                    <h3 className="md:col-span-4 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[0.02em] transition-colors duration-500 group-hover:text-primary">
                      {region.name}
                    </h3>
                    <p className="col-start-2 md:col-start-auto md:col-span-7 text-[17px] leading-relaxed text-muted-foreground md:text-right">
                      {region.role}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* Development projects — three ruled columns */}
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 border-b border-foreground/50 pb-4">
              <p className={label}>Development Projects</p>
              <p className={`${labelMuted} tabular-nums`}>
                {two(projects.length)}
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 border-b border-border">
            {projects.map((project, index) => (
              <Reveal
                key={project.title}
                delay={index * 100}
                className={`py-9 md:py-11 ${
                  index > 0
                    ? "border-t md:border-t-0 md:border-l border-border md:pl-8 lg:pl-10"
                    : ""
                } ${index < projects.length - 1 ? "md:pr-8 lg:pr-10" : ""}`}
              >
                <article>
                  <p className="font-display text-[11px] uppercase tracking-[0.3em] text-primary mb-5">
                    {project.period}
                  </p>
                  <h3 className="font-display text-[1.45rem] leading-[1.2] tracking-[0.02em] mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[17px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Chronicle */}
      <section className="section-dark border-y">
        <div className={`container max-w-7xl mx-auto px-6 ${sectionPad}`}>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-x-8 gap-y-4 items-end mb-[clamp(3rem,6vw,5rem)]">
              <p className={`${label} md:col-span-4`}>The Chronicle</p>
              <h2 className="md:col-span-8 font-display uppercase tracking-[0.03em] text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
                The association, lately
              </h2>
            </div>
          </Reveal>

          <ol className="mb-[clamp(5rem,9vw,8rem)] border-b border-border">
            {chronicle.map((entry, index) => (
              <li key={entry.title}>
                <Reveal delay={index * 80}>
                  <div className="group grid md:grid-cols-12 gap-x-8 gap-y-3 items-baseline border-t border-border py-8 md:py-10">
                    <p className="md:col-span-2 font-display text-[11px] uppercase tracking-[0.3em] text-primary tabular-nums">
                      {entry.date}
                    </p>
                    <h3 className="md:col-span-4 font-display text-[clamp(1.5rem,2.4vw,1.9rem)] leading-[1.2] tracking-[0.02em] transition-colors duration-500 group-hover:text-primary">
                      {entry.title}
                    </h3>
                    <p className="md:col-span-6 text-[17px] leading-[1.65] text-muted-foreground">
                      {entry.note}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* In the Press */}
          <div className="grid md:grid-cols-12 gap-x-8 gap-y-8">
            <Reveal className="md:col-span-4 md:sticky md:top-28 md:self-start">
              <p className={label}>In the Press</p>
            </Reveal>
            <ul className="md:col-span-8 border-b border-border">
              {press.map((item, index) => (
                <li key={item.headline}>
                  <Reveal delay={(index % 3) * 60}>
                    <div className="border-t border-border py-6 md:py-7">
                      <p className={`${labelMuted} mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1`}>
                        <span>{item.outlet}</span>
                        <span className="tabular-nums">{item.date}</span>
                      </p>
                      {item.rtl ? (
                        <p
                          dir="rtl"
                          lang="ar"
                          className="text-right text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.6]"
                          style={{
                            fontFamily:
                              'var(--font-arabic), "Amiri", "Noto Naskh Arabic", "Scheherazade New", "Geeza Pro", "Traditional Arabic", serif',
                          }}
                        >
                          {item.headline}
                        </p>
                      ) : (
                        <p
                          lang="fr"
                          className="font-body italic text-[clamp(1.35rem,2.3vw,1.75rem)] leading-[1.3]"
                        >
                          {item.headline}
                        </p>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Decorative Scroll Text */}
      <HorizontalText>DEPUIS 1960 · بيروت · BEYROUTH</HorizontalText>

      {/* Team */}
      <div id="team" className="scroll-mt-20">
        <TeamSection />
      </div>

      {/* CTA */}
      <section className="section-dark border-t">
        <Reveal>
          <div className={`container max-w-7xl mx-auto px-6 ${sectionPad}`}>
            <div className="rule-ornament mb-[clamp(3rem,6vw,5rem)]">
              <span />
            </div>
            <div className="grid md:grid-cols-12 gap-x-8 gap-y-10 items-end">
              <div className="md:col-span-7">
                <p className={`${label} mb-6`}>Continue the Story</p>
                <SplitText
                  as="h2"
                  className="font-display uppercase tracking-[0.03em] text-[clamp(2.2rem,5vw,4rem)] leading-[1.04]"
                >
                  Sixty-five years, and counting
                </SplitText>
              </div>
              <div className="md:col-span-5">
                <p className="text-[18px] leading-[1.65] text-muted-foreground mb-9 max-w-[44ch]">
                  Every saved building in the record began with someone
                  deciding it mattered. Membership, volunteering, advocacy —
                  choose your way in.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-[52px] font-display text-[12px] tracking-[0.25em] uppercase"
                  >
                    <Link href="/get-involved">Get Involved</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground px-8 h-[52px] font-display text-[12px] tracking-[0.25em] uppercase"
                  >
                    <Link href="/gallery">See the Sites</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
