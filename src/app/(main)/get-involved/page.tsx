import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { ParallaxImage } from "@/components/ui/parallax-image";

export const metadata: Metadata = {
  title: "Get Involved - Support APSAD's Mission in Lebanon",
  description:
    "Join APSAD in protecting Lebanon's heritage. Discover ways to get involved, from volunteering and membership to advocacy and partnerships.",
};

const involvementOptions = [
  {
    title: "Volunteer Your Time",
    imageSrc: "/volunteer.jpg",
    imageAlt: "Volunteers collaborating on an APSAD heritage project",
    description:
      "Lend your skills and passion to our projects in Lebanon. From field work to archival research, there are many ways to contribute directly.",
    details:
      "We welcome volunteers with diverse backgrounds. Whether you're interested in hands-on restoration, digital archiving, educational outreach, or administrative support, your contribution makes a real difference.",
  },
  {
    title: "Become a Member",
    imageSrc: "/members.jpg",
    imageAlt: "APSAD community support and membership",
    description:
      "Join the APSAD family and enjoy exclusive benefits while supporting our ongoing conservation efforts in Lebanon.",
    details:
      "Membership provides vital regular funding and comes with exclusive perks including newsletters, priority access to events, behind-the-scenes site visits, and discounts on publications.",
  },
  {
    title: "Advocate for Heritage",
    imageSrc: "/heritage.jpg",
    imageAlt: "Advocating for Lebanese heritage preservation",
    description:
      "Use your voice to raise awareness about the importance of Lebanese heritage preservation and support our advocacy campaigns.",
    details:
      "Help us influence policy and public opinion by sharing our stories on social media, participating in awareness campaigns, writing to representatives, and speaking within your communities.",
  },
  {
    title: "Partner With Us",
    imageSrc: "/partner.jpg",
    imageAlt: "Corporate partnership with APSAD",
    description:
      "Collaborate with APSAD on projects, sponsor initiatives, or explore corporate social responsibility opportunities.",
    details:
      "We seek meaningful partnerships with institutions, corporations, and other NGOs. Together, we can create larger impact through joint projects, sponsorships, and knowledge sharing.",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Volunteer Archaeologist",
    quote:
      "Working with APSAD has been transformative. Every day, I contribute to preserving stories that span millennia.",
  },
  {
    name: "Ahmad Khalil",
    role: "Corporate Partner",
    quote:
      "Our partnership with APSAD aligns perfectly with our values of cultural preservation and community impact.",
  },
  {
    name: "Elena Rodriguez",
    role: "Heritage Advocate",
    quote:
      "Through APSAD's advocacy programs, I've learned to be an effective voice for heritage preservation.",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-24 border-b border-border">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
              Join Our Mission
            </p>
            <SplitText as="h1" className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Get Involved
            </SplitText>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Preserving Lebanon&apos;s rich tapestry of history and culture is a
              collective endeavor. Discover how you can become an integral part of
              safeguarding our shared heritage.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                How You Can Help
              </p>
              <h2 className="font-serif text-4xl font-bold mb-6">
                Ways to Make a Difference
              </h2>
            </div>
          </Reveal>

          <div className="space-y-24">
            {involvementOptions.map((option, index) => (
              <Reveal key={option.title}>
                <div
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              
                      <ParallaxImage
                        src={option.imageSrc}
                        alt={option.imageAlt}
                        className="aspect-[4/3]"
                      />
             
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                      {option.description}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {option.details}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="text-[13px] tracking-[0.1em] uppercase px-6 py-5"
                    >
                      <Link href="#contact-section" className="flex items-center gap-2">
                        Get Started
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

      {/* Testimonials */}
      <section className="py-24 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                Community Voices
              </p>
              <h2 className="font-serif text-4xl font-bold mb-6">
                What Our Community Says
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {testimonials.map((t, index) => (
              <Reveal key={index} delay={index * 120}>
                <div className="bg-secondary/50 p-8 md:p-10 h-full">
                  <blockquote className="text-foreground leading-relaxed mb-6 text-lg italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="font-serif font-bold">{t.name}</p>
                  <p className="text-[13px] text-primary uppercase tracking-[0.1em]">
                    {t.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-24 scroll-mt-20">
        <div className="container max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
                Get in Touch
              </p>
              <h2 className="font-serif text-4xl font-bold mb-6">
                Connect With APSAD
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you have questions about our projects, wish to explore
                involvement opportunities, or simply want to share your thoughts
                &mdash; we are eager to hear from you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
