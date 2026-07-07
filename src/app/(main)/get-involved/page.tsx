import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { ParallaxImage } from "@/components/ui/parallax-image";

export const metadata: Metadata = {
  title: "Get Involved - Membership, Volunteering & Partnership",
  description:
    "Join APSAD as a member, volunteer, advocate, or partner. The association has been carried by its members since 1960 — the salon on Sursock Street, Beirut is open.",
};

const involvementOptions = [
  {
    title: "Volunteer Your Time",
    imageSrc: "/volunteer.jpg",
    imageAlt: "Volunteers collaborating on an APSAD heritage project",
    description:
      "Lend your skills to the work itself — from field restoration to archival research.",
    details:
      "APSAD welcomes volunteers of every background: hands-on restoration, digital archiving, educational outreach, or the quiet administration that keeps a sixty-five-year-old association running.",
  },
  {
    title: "Become a Member",
    imageSrc: "/members.jpg",
    imageAlt: "Members gathered at an APSAD event",
    description:
      "Join the assembly that has carried APSAD since 1960 and sustain the work with regular support.",
    details:
      "Membership provides the association's vital regular funding — and admits you to a company that has included architects, historians, and patrons of Lebanese heritage for six decades.",
  },
  {
    title: "Advocate for Heritage",
    imageSrc: "/heritage.jpg",
    imageAlt: "A historic Lebanese façade under advocacy protection",
    description:
      "Use your voice where it counts — APSAD's campaigns have moved ministers, municipalities, and the Central Bank.",
    details:
      "From letters to the Ministry of Culture to public complaints against demolitions, advocacy is how endangered houses stay standing. Share the campaigns, write, speak, and hold the line with us.",
  },
  {
    title: "Partner With Us",
    imageSrc: "/partner.jpg",
    imageAlt: "Institutional partners meeting with APSAD",
    description:
      "Institutions and enterprises have always stood behind the association's largest undertakings.",
    details:
      "APSAD works with the DGA, municipalities, foundations, and international bodies — from Factum Foundation at Nahr el-Kalb to Mercy Corps in the schools. Joint projects, sponsorships, and studies are how the biggest work gets done.",
  },
];

const privileges = [
  "The association's newsletters and publications, in three languages",
  "Priority access to concerts, exhibitions, and events",
  "Guided visits of old houses and sites across Lebanon",
  "A voice and a vote in the general assembly",
];

export default function GetInvolvedPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
              The Invitation
            </p>
            <SplitText
              as="h1"
              className="font-display uppercase tracking-[0.05em] text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8"
            >
              Get Involved
            </SplitText>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              APSAD has always been carried by its members. Volunteering,
              membership, advocacy, partnership — choose your way into the
              record.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="space-y-24 md:space-y-32">
            {involvementOptions.map((option, index) => (
              <Reveal key={option.title}>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <ParallaxImage
                      src={option.imageSrc}
                      alt={option.imageAlt}
                      className="aspect-[4/3]"
                    />
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h3 className="font-display uppercase tracking-[0.02em] text-3xl md:text-4xl leading-[1.12] mb-5">
                      {option.title}
                    </h3>
                    <p className="font-body italic text-lg text-foreground/90 leading-relaxed mb-4">
                      {option.description}
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed mb-8">
                      {option.details}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="font-display text-[12px] tracking-[0.22em] uppercase px-7 h-12"
                    >
                      <Link href="#contact" className="flex items-center gap-2">
                        Write to Us
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Member's Privileges */}
      <section className="section-dark border-y">
        <div className="container max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
            <Reveal>
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                  The Member&apos;s Privileges
                </p>
                <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-5xl leading-[1.1] mb-8">
                  What membership brings
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond sustaining the restorations, members belong to the life
                  of the association — its salons, its journeys, its assemblies.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <ul className="flex flex-col justify-center h-full">
                {privileges.map((privilege) => (
                  <li
                    key={privilege}
                    className="border-t border-border last:border-b py-5 flex items-baseline gap-5"
                  >
                    <span className="h-1.5 w-1.5 bg-primary shrink-0 translate-y-[-2px]" aria-hidden="true" />
                    <span className="text-lg leading-relaxed">{privilege}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 scroll-mt-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
                  Write to Us
                </p>
                <h2 className="font-display uppercase tracking-[0.03em] text-4xl leading-[1.12] mb-8">
                  The salon is open
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-10">
                  Questions about the projects, membership, or a building you
                  believe should be saved — we are eager to hear from you.
                </p>
                <ul className="space-y-5 text-base">
                  <li className="flex items-start gap-4">
                    <MapPin className="h-4 w-4 mt-1.5 text-primary shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      Sursock Street, Aoun Building, GF
                      <br />
                      Achrafieh, Beirut — P.O.Box 11-154
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                    <a href="tel:+9611336368" className="text-muted-foreground hover:text-foreground transition-colors">
                      +961 1 336 368
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                    <a href="mailto:info@apsad.org" className="text-muted-foreground hover:text-foreground transition-colors">
                      info@apsad.org
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-8">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
