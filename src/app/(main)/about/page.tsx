import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { ParallaxImage } from "@/components/ui/parallax-image";

export const metadata: Metadata = {
  title: "About APSAD - Our Heritage Preservation Story | APSAD Lebanon",
  description:
    "Learn about APSAD's 60+ year journey preserving Lebanon's cultural heritage. Discover our mission, vision, goals, and the dedicated team working to protect Lebanese historical sites and traditions.",
};

const milestones = [
  { year: "1960", title: "Foundation", description: "APSAD established to protect Lebanon's heritage sites." },
  { year: "1975", title: "First Major Project", description: "Restoration of ancient Phoenician ruins in Byblos." },
  { year: "1990", title: "UNESCO Partnership", description: "Official collaboration with UNESCO for heritage protection." },
  { year: "2000", title: "Digital Archive", description: "Launch of comprehensive digital heritage documentation." },
  { year: "2010", title: "Community Program", description: "Expansion into community-based conservation initiatives." },
  { year: "2020", title: "Modern Era", description: "Integration of modern technology in preservation efforts." },
];

const goals = [
  { num: "01", title: "Site Preservation", description: "Implement effective conservation measures for endangered heritage sites, utilizing best practices and innovative technologies." },
  { num: "02", title: "Research & Documentation", description: "Conduct and support scholarly research that enhances understanding of our heritage, and meticulously document sites and artifacts." },
  { num: "03", title: "Community Engagement", description: "Actively involve local communities in heritage preservation, empowering them as custodians of their own history." },
  { num: "04", title: "Education & Awareness", description: "Raise public awareness about the significance of heritage and the importance of its conservation through innovative educational programs." },
  { num: "05", title: "Advocacy & Policy", description: "Advocate for stronger legal frameworks and policies that support heritage protection at local, national, and international levels." },
  { num: "06", title: "Sustainable Practices", description: "Promote sustainable tourism and site management practices that benefit both heritage preservation and local economic development." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-24 border-b border-border">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
              Our Story
            </p>
            <SplitText as="h1" className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              About APSAD
            </SplitText>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              For over six decades, we have been dedicated to the preservation and
              promotion of Lebanon&apos;s cultural and natural heritage &mdash; a
              journey of passion, dedication, and unwavering commitment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* History */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                  Since 1960
                </p>
                <h2 className="font-serif text-4xl font-bold mb-6">
                  Our Rich History
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 1960, APSAD emerged from a collective desire among
                    historians, archaeologists, architects, and community leaders
                    to address the growing concerns over the neglect and
                    degradation of Lebanon&apos;s significant heritage sites.
                  </p>
                  <p>
                    Over the decades, APSAD has evolved into Lebanon&apos;s
                    leading non-governmental organization for heritage
                    preservation, spearheading numerous groundbreaking conservation
                    projects and advocating for transformative policy changes.
                  </p>
                  <p>
                    Our journey has been marked by strategic partnerships with
                    local communities, national institutions, and international
                    bodies, continuously adapting our methodologies to meet new
                    challenges in heritage conservation.
                  </p>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] tracking-[0.1em] uppercase px-6 py-5"
                  >
                    <Link href="/gallery" className="flex items-center gap-2">
                      View Our Projects
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="text-[13px] tracking-[0.1em] uppercase px-6 py-5"
                  >
                    <Link href="/get-involved">Join Our Mission</Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ParallaxImage
                src="/history.jpeg"
                alt="Historical photograph showcasing APSAD's early heritage preservation work in Lebanon"
                className="aspect-[4/5]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                Milestones
              </p>
              <SplitText as="h2" className="font-serif text-4xl font-bold mb-6">
                Our Journey Through Time
              </SplitText>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                Six decades of dedication to preserving Lebanon&apos;s cultural
                treasures.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {milestones.map((milestone, index) => (
              <Reveal key={milestone.year} delay={index * 80}>
                <div className="bg-secondary/50 p-8 md:p-10 h-full">
                  <span className="font-serif text-4xl font-bold text-primary/20 block mb-3">
                    {milestone.year}
                  </span>
                  <h3 className="font-serif text-xl font-bold mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                  Purpose
                </p>
                <h2 className="font-serif text-3xl font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  APSAD is committed to the identification, protection,
                  conservation, and promotion of cultural and natural heritage in
                  Lebanon. We strive to ensure that these invaluable assets are
                  preserved for future generations, fostering a deeper
                  understanding and appreciation of our collective history and
                  identity through cutting-edge research, innovative education,
                  and meaningful community engagement.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                  Aspiration
                </p>
                <h2 className="font-serif text-3xl font-bold mb-6">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We envision a Lebanon where cultural and natural heritage is
                  universally valued, meticulously protected, and serves as a
                  dynamic source of knowledge, inspiration, and sustainable
                  development for all communities, enriching lives and
                  strengthening national identity while contributing to global
                  heritage preservation efforts.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-24 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                Our Focus
              </p>
              <h2 className="font-serif text-4xl font-bold mb-6">
                Strategic Goals
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                Six comprehensive pillars that guide our mission to preserve and
                promote Lebanon&apos;s invaluable heritage.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {goals.map((goal, index) => (
              <Reveal key={goal.num} delay={index * 80}>
                <div className="bg-secondary/50 p-8 md:p-10 h-full">
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

      {/* Team CTA */}
      <section className="section-dark">
        <Reveal>
          <div className="container max-w-4xl mx-auto px-6 py-24 text-center">
            <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
              Our People
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Join Our Expert Team
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              APSAD is powered by a diverse team of passionate professionals,
              researchers, and volunteers united by an unwavering commitment to
              heritage preservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-[13px] tracking-[0.15em] uppercase"
              >
                <Link href="/get-involved">Get Involved</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-muted-foreground/30 hover:bg-muted/20 px-8 py-6 text-[13px] tracking-[0.15em] uppercase"
              >
                <Link href="/gallery">See Our Work</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
