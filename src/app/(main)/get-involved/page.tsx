import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";

export const metadata: Metadata = {
  title: "Get Involved - Membership, Volunteering & Partnership",
  description:
    "Join APSAD as a member, volunteer, advocate, or partner. The association has been carried by its members since 1960 — the salon on Sursock Street, Beirut is open.",
};

const involvementOptions = [
  {
    title: "Volunteer Your Time",
    label: "Volunteering",
    imageSrc: "/volunteer.jpg",
    imageAlt: "Volunteers collaborating on an APSAD heritage project",
    description:
      "Lend your skills to the work itself — from field restoration to archival research.",
    details:
      "APSAD welcomes volunteers of every background: hands-on restoration, digital archiving, educational outreach, or the quiet administration that keeps a sixty-five-year-old association running.",
  },
  {
    title: "Become a Member",
    label: "Membership",
    imageSrc: "/members.jpg",
    imageAlt: "Members gathered at an APSAD event",
    description:
      "Join the assembly that has carried APSAD since 1960 and sustain the work with regular support.",
    details:
      "Membership provides the association's vital regular funding — and admits you to a company that has included architects, historians, and patrons of Lebanese heritage for six decades.",
  },
  {
    title: "Advocate for Heritage",
    label: "Advocacy",
    imageSrc: "/heritage.jpg",
    imageAlt: "A historic Lebanese façade under advocacy protection",
    description:
      "Use your voice where it counts — APSAD's campaigns have moved ministers, municipalities, and the Central Bank.",
    details:
      "From letters to the Ministry of Culture to public complaints against demolitions, advocacy is how endangered houses stay standing. Share the campaigns, write, speak, and hold the line with us.",
  },
  {
    title: "Partner With Us",
    label: "Partnership",
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

const numerals = ["I", "II", "III", "IV"];

export default function GetInvolvedPage() {
  return (
    <div className="pt-20">
      {/* Opener — title left, standfirst and index right */}
      <section className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <Reveal>
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-8">
              The Invitation
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-end">
            <SplitText
              as="h1"
              className="lg:col-span-7 font-display uppercase tracking-[0.04em] text-[clamp(3rem,8.4vw,7.5rem)] leading-[0.98]"
            >
              Get Involved
            </SplitText>
            <Reveal delay={200} className="lg:col-span-5">
              <p className="text-xl md:text-[1.375rem] leading-[1.55] text-foreground/85 max-w-[34ch]">
                APSAD has always been carried by its members. Volunteering,
                membership, advocacy, partnership — choose your way into the
                record.
              </p>
            </Reveal>
          </div>

          {/* Index of the four ways */}
          <Reveal delay={300}>
            <nav aria-label="Ways to get involved" className="mt-16 md:mt-24 border-t border-border">
              <ol className="grid grid-cols-2 lg:grid-cols-4">
                {involvementOptions.map((option, index) => (
                  <li key={option.title} className="border-b lg:border-b-0 border-border lg:border-r lg:last:border-r-0 odd:border-r even:pl-5 lg:pl-6 lg:even:pl-6 lg:first:pl-0">
                    <a
                      href={`#way-${index + 1}`}
                      className="group flex items-baseline gap-3 sm:gap-4 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                      <span className="font-display text-[13px] tracking-[0.2em] text-primary w-6 sm:w-7 shrink-0">
                        {numerals[index]}
                      </span>
                      <span className="font-display text-[11px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.26em] text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        <span className="link-rule">{option.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* The four ways — ruled editorial rows, plates at their native scale */}
      <section aria-label="Ways to get involved">
        <div className="container max-w-7xl mx-auto px-6">
          {involvementOptions.map((option, index) => (
            <article
              key={option.title}
              id={`way-${index + 1}`}
              className="scroll-mt-24 border-b border-border last:border-b-0 py-20 md:py-28"
            >
              <Reveal>
                <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
                  <p
                    className="lg:col-span-2 font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-primary"
                    aria-hidden="true"
                  >
                    {numerals[index]}
                  </p>

                  <div className="lg:col-span-5">
                    <h2 className="font-display uppercase tracking-[0.03em] text-3xl md:text-[2.75rem] leading-[1.08] mb-7">
                      {option.title}
                    </h2>
                    <p className="font-body italic text-xl md:text-[1.375rem] leading-[1.5] text-foreground/90 mb-6 max-w-[40ch]">
                      {option.description}
                    </p>
                    <p className="text-[1.0625rem] md:text-lg text-muted-foreground leading-[1.7] mb-10 max-w-[52ch]">
                      {option.details}
                    </p>
                    <Link
                      href="#contact"
                      className="group inline-flex items-center gap-4 font-display text-[12px] uppercase tracking-[0.26em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      <span className="link-rule">Write to us</span>
                      <ArrowRight
                        className="h-4 w-4 text-primary transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <figure className="plate-hover group lg:col-span-4 lg:col-start-9 w-full max-w-[460px] lg:justify-self-end">
                    <div className="border border-border p-3 md:p-4 bg-card">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={option.imageSrc}
                          alt={option.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 90vw, 430px"
                          className="plate object-cover group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                    <figcaption className="flex items-baseline justify-between gap-6 pt-4 font-display text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      <span>Pl. {numerals[index]}</span>
                      <span>{option.label}</span>
                    </figcaption>
                  </figure>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* The Member's Privileges */}
      <section className="section-dark border-y">
        <div className="container max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14">
            <Reveal className="lg:col-span-5">
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-8">
                  The Member&apos;s Privileges
                </p>
                <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-[3.25rem] leading-[1.06] mb-8">
                  What membership brings
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-[1.65] max-w-[38ch]">
                  Beyond sustaining the restorations, members belong to the life
                  of the association — its salons, its journeys, its assemblies.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
              <ol>
                {privileges.map((privilege, index) => (
                  <li
                    key={privilege}
                    className="group border-t border-border last:border-b py-7 grid grid-cols-[3.25rem_1fr] items-baseline"
                  >
                    <span className="font-display text-[12px] tracking-[0.2em] text-primary" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl md:text-[1.375rem] leading-[1.45]">{privilege}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact — a letter, not a web form */}
      <section id="contact" className="py-24 md:py-36 scroll-mt-20">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-16">
            <Reveal className="lg:col-span-4">
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-8">
                  Write to Us
                </p>
                <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-5xl leading-[1.08] mb-8">
                  The salon is open
                </h2>
                <p className="text-lg text-muted-foreground leading-[1.65] mb-12 max-w-[36ch]">
                  Questions about the projects, membership, or a building you
                  believe should be saved — we are eager to hear from you.
                </p>
                <dl className="border-t border-border">
                  <div className="border-b border-border py-5 grid grid-cols-[6.5rem_1fr] gap-4 items-baseline">
                    <dt className="font-display text-[10px] uppercase tracking-[0.3em] text-primary">Address</dt>
                    <dd className="text-[1.0625rem] leading-relaxed">
                      Sursock Street, Aoun Building, GF
                      <br />
                      Achrafieh, Beirut — P.O.Box 11-154
                    </dd>
                  </div>
                  <div className="border-b border-border py-5 grid grid-cols-[6.5rem_1fr] gap-4 items-baseline">
                    <dt className="font-display text-[10px] uppercase tracking-[0.3em] text-primary">Telephone</dt>
                    <dd className="text-[1.0625rem]">
                      <a href="tel:+9611336368" className="link-rule">
                        +961 1 336 368
                      </a>
                    </dd>
                  </div>
                  <div className="border-b border-border py-5 grid grid-cols-[6.5rem_1fr] gap-4 items-baseline">
                    <dt className="font-display text-[10px] uppercase tracking-[0.3em] text-primary">Email</dt>
                    <dd className="text-[1.0625rem]">
                      <a href="mailto:info@apsad.org" className="link-rule">
                        info@apsad.org
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
