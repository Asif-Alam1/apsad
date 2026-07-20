import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { ParallaxImage } from "@/components/ui/parallax-image";
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

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
              Est. 1960 · Beirut
            </p>
            <SplitText
              as="h1"
              className="font-display uppercase tracking-[0.05em] text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8"
            >
              The Association
            </SplitText>
            <p className="font-body italic text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Association pour la Protection des Sites et Anciennes Demeures au
              Liban — the Association for Protecting Natural Sites and Old
              Buildings in Lebanon.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The Founding */}
      <section id="history" className="py-24 md:py-32 scroll-mt-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                  The Founding
                </p>
                <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-[2.75rem] leading-[1.1] mb-8">
                  An appeal, answered
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    In 1960, APSAD launched its first appeal to the Lebanese
                    people — to those who would preserve harmonious,
                    well-ordered towns and villages; <em>a welcoming Lebanon,
                    proud of its past, trustful in its future</em>.
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
                <div className="flex flex-wrap gap-4 mt-10">
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
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ParallaxImage
                src="/history.jpeg"
                alt="Early conservation work on a traditional Lebanese building"
                className="aspect-[4/5]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 md:py-32 bg-secondary/60 border-y border-border">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20">
            <Reveal>
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                  Purpose
                </p>
                <h2 className="font-display uppercase tracking-[0.03em] text-3xl md:text-4xl mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To identify, protect, conserve, and promote the cultural and
                  natural heritage of Lebanon — acting upon the laws that shield
                  it, restoring what can be saved, and documenting what must be
                  remembered, so that these assets pass intact to the next
                  generation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                  Aspiration
                </p>
                <h2 className="font-display uppercase tracking-[0.03em] text-3xl md:text-4xl mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A Lebanon whose architectural and natural heritage is
                  universally valued and defended — where old souks, houses, and
                  sites are living sources of knowledge, identity, and
                  sustainable prosperity, and where the country regains the
                  standing its past deserves.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                Across Lebanon
              </p>
              <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-5xl leading-[1.1]">
                Where we work
              </h2>
            </div>
          </Reveal>

          {/* Regional sections */}
          <div className="mb-20">
            {regions.map((region, index) => (
              <Reveal key={region.name} delay={index * 80}>
                <div className="group border-t border-border last:border-b py-6 md:py-7 grid md:grid-cols-12 gap-2 md:gap-8 items-baseline">
                  <h3 className="md:col-span-4 font-display text-2xl tracking-[0.02em] group-hover:text-primary transition-colors duration-300">
                    {region.name}
                  </h3>
                  <p className="md:col-span-8 text-base text-muted-foreground leading-relaxed">
                    {region.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Development projects */}
          <Reveal>
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-10">
              Development Projects
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-10">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 100}>
                <article className="border-t border-primary/40 pt-6 h-full">
                  <p className="font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                    {project.period}
                  </p>
                  <h3 className="font-display text-xl tracking-[0.02em] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
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
        <div className="container max-w-6xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                The Chronicle
              </p>
              <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-5xl leading-[1.1]">
                The association, lately
              </h2>
            </div>
          </Reveal>

          <div className="mb-20">
            {chronicle.map((entry, index) => (
              <Reveal key={entry.title} delay={index * 80}>
                <div className="group border-t border-border last:border-b py-7 md:py-8 grid md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                  <p className="md:col-span-2 font-display text-[11px] uppercase tracking-[0.25em] text-primary">
                    {entry.date}
                  </p>
                  <h3 className="md:col-span-4 font-display text-2xl tracking-[0.02em] group-hover:text-primary transition-colors duration-300">
                    {entry.title}
                  </h3>
                  <p className="md:col-span-6 text-base text-muted-foreground leading-relaxed">
                    {entry.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* In the Press */}
          <Reveal>
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-10">
              In the Press
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-16">
            {press.map((item, index) => (
              <Reveal key={item.headline} delay={(index % 2) * 80}>
                <div className="border-t border-border py-6 grid gap-1.5">
                  <p className="font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {item.outlet} · {item.date}
                  </p>
                  <p
                    className="font-body italic text-lg leading-snug"
                    dir={item.rtl ? 'rtl' : undefined}
                  >
                    {item.headline}
                  </p>
                </div>
              </Reveal>
            ))}
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
          <div className="container max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
              Continue the Story
            </p>
            <SplitText
              as="h2"
              className="font-display uppercase tracking-[0.04em] text-4xl md:text-5xl leading-[1.1] mb-8"
            >
              Sixty-five years, and counting
            </SplitText>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
              Every saved building in the record began with someone deciding it
              mattered. Membership, volunteering, advocacy — choose your way in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </Reveal>
      </section>
    </div>
  );
}
