import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from 'next';
import HeroSection from "@/components/HeroSection";
import { StatsSection } from "@/components/StatSection";
import { TeamSection } from "@/components/TeamSection";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { SplitText } from "@/components/ui/split-text";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Magnetic } from "@/components/ui/magnetic";

export const metadata: Metadata = {
  title: 'APSAD - Preserving Lebanon\'s Heritage | Home',
  description: 'Welcome to APSAD (Association for the Protection of Natural Sites and Old Buildings in Lebanon). Learn about our 60+ year mission to protect, preserve, and promote Lebanon\'s cultural and natural heritage.',
};

const goals = [
  { num: "01", title: "Site Preservation", description: "Implement effective conservation for endangered heritage sites using best practices and innovative technology." },
  { num: "02", title: "Research & Documentation", description: "Conduct research enhancing understanding of Lebanese heritage and meticulously document sites for posterity." },
  { num: "03", title: "Community Engagement", description: "Actively involve local communities, empowering them as custodians of their history and culture." },
  { num: "04", title: "Education & Awareness", description: "Raise public awareness of heritage significance and conservation importance through education." },
  { num: "05", title: "Advocacy & Policy", description: "Advocate for stronger legal frameworks supporting heritage protection at all levels." },
  { num: "06", title: "Sustainable Practices", description: "Promote sustainable tourism and site management benefiting both heritage and local economies." },
];

const featuredProjects = [
  { src: "/image-1.jpeg", title: "Ancient Baalbek Restoration", category: "Conservation" },
  { src: "/image-2.jpeg", title: "Byblos Heritage Trail", category: "Cultural Route" },
  { src: "/image-3.jpeg", title: "Community Education Program", category: "Outreach" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Marquee Band */}
      <Marquee
        items={[
          "Heritage Preservation",
          "Cultural Identity",
          "Archaeological Conservation",
          "Community Engagement",
          "Sustainable Tourism",
          "Living History",
        ]}
        className="py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase font-medium"
      />

      <StatsSection />

      {/* Welcome / Intro */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                  About APSAD
                </p>
                <SplitText
                  as="h2"
                  className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight"
                >
                  Safeguarding Lebanon&apos;s Living Heritage
                </SplitText>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  APSAD &mdash; Association pour la Protection des Sites et
                  Anciennes Demeures &mdash; is a non-governmental organization
                  founded in 1960. We are dedicated to the identification,
                  protection, preservation, and promotion of Lebanon&apos;s rich
                  cultural and natural heritage.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Over six decades of work have established APSAD as the leading
                  voice for heritage conservation in Lebanon, partnering with
                  local communities, national institutions, and international
                  bodies to ensure irreplaceable treasures endure for generations
                  to come.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="text-[13px] tracking-[0.1em] uppercase px-6 py-5"
                >
                  <Link href="/about" className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ParallaxImage
                src="/history.jpeg"
                alt="Historic heritage site preserved by APSAD"
                className="aspect-[4/5]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                What Drives Us
              </p>
              <SplitText as="h2" className="font-serif text-4xl md:text-5xl font-bold">
                Mission & Vision
              </SplitText>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16">
            <Reveal delay={100}>
              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  APSAD is committed to the identification, protection,
                  conservation, and promotion of cultural and natural heritage in
                  Lebanon. We strive to ensure that these invaluable assets are
                  preserved for future generations, fostering a deeper
                  understanding and appreciation of our collective history and
                  identity through research, education, and community engagement.
                </p>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a Lebanon where cultural and natural heritage is
                  universally valued, meticulously protected, and serves as a
                  dynamic source of knowledge, inspiration, and sustainable
                  development for all communities, enriching lives and
                  strengthening national identity.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                Our Focus
              </p>
              <SplitText as="h2" className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Strategic Goals
              </SplitText>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                Six pillars that guide our mission to preserve Lebanon&apos;s
                invaluable heritage.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {goals.map((goal, index) => (
              <Reveal key={goal.num} delay={index * 80}>
                <div className="bg-background p-8 md:p-10 h-full">
                  <span className="font-serif text-4xl font-bold text-primary/20 block mb-4">
                    {goal.num}
                  </span>
                  <h3 className="font-serif text-xl font-bold mb-3">
                    {goal.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                  Heritage in Action
                </p>
                <SplitText as="h2" className="font-serif text-4xl md:text-5xl font-bold">
                  Featured Projects
                </SplitText>
              </div>
              <Button
                asChild
                variant="outline"
                className="text-[13px] tracking-[0.1em] uppercase px-6 py-5 self-start md:self-auto"
              >
                <Link href="/gallery" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Reveal key={index} delay={index * 120}>
                <Link href="/gallery" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                  </div>
                  <p className="text-[12px] uppercase tracking-[0.15em] text-primary mb-1 font-medium">
                    {project.category}
                  </p>
                  <h3 className="font-serif text-lg font-bold">
                    {project.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* CTA */}
      <section className="section-dark">
        <Reveal>
          <div className="container max-w-4xl mx-auto px-6 py-24 text-center">
            <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
              Join the Mission
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Make a Difference with APSAD
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Your support is crucial. Whether you volunteer, become a member, or
              advocate for our cause, you play a part in preserving our shared
              heritage for generations to come.
            </p>
            <Magnetic>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-[13px] tracking-[0.15em] uppercase"
              >
                <Link href="/get-involved">Get Involved</Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
