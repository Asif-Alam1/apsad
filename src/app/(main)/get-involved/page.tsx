import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Handshake, ShieldCheck, Briefcase, Mail } from "lucide-react";

const involvementOptions = [
  {
    icon: Users,
    title: "Volunteer Your Time",
    description: "Lend your skills and passion to our projects in Lebanon. From field work to archival research, there are many ways to contribute directly.",
    details: "We welcome volunteers with diverse backgrounds. Opportunities include site maintenance, event support, research assistance, and administrative tasks. Check our current needs or propose how you can help!",
    aiHint: "people volunteering lebanon"
  },
  {
    icon: Handshake,
    title: "Become a Member",
    description: "Join the APSAD family and enjoy exclusive benefits while supporting our ongoing conservation efforts in Lebanon.",
    details: "Membership provides vital regular funding and comes with perks like newsletters, event invitations, and discounts on publications. Various membership tiers are available.",
    aiHint: "group handshake support"
  },
  {
    icon: ShieldCheck,
    title: "Advocate for Heritage",
    description: "Use your voice to raise awareness about the importance of Lebanese heritage preservation and support our advocacy campaigns.",
    details: "Help us influence policy and public opinion. Share our stories, participate in campaigns, and contact your representatives about heritage issues in Lebanon.",
    aiHint: "person speaking advocacy"
  },
  {
    icon: Briefcase,
    title: "Partner With Us",
    description: "Collaborate with APSAD on projects, sponsor initiatives, or explore corporate social responsibility opportunities for Lebanon's heritage.",
    details: "We seek partnerships with institutions, corporations, and other NGOs that share our commitment to heritage. Let's discuss how we can work together for Lebanon.",
    aiHint: "business meeting lebanon"
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Get Involved with APSAD</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your support is vital to preserving Lebanon's shared heritage. Discover how you can make a difference with APSAD.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-primary mb-10 text-center">Ways to Contribute</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {involvementOptions.map((option) => (
              <Card key={option.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                         <option.icon className="h-8 w-8" />
                    </div>
                    <div>
                        <CardTitle className="text-xl text-primary">{option.title}</CardTitle>
                        <CardDescription className="mt-1">{option.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground leading-relaxed">{option.details}</p>
                </CardContent>
                <div className="relative h-40 mt-auto rounded-b-lg overflow-hidden">
                  <Image
                    src={`https://placehold.co/600x250.png`}
                    alt={option.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={option.aiHint}
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact-section" className="py-12 bg-secondary/20 rounded-lg shadow-md scroll-mt-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center justify-center gap-3 mb-6">
                <Mail className="h-10 w-10 text-accent" />
                <h2 className="text-3xl font-semibold text-primary text-center">Contact APSAD</h2>
            </div>
            <p className="text-center text-muted-foreground mb-10">
              Whether you have questions about our work in Lebanon, want to discuss involvement opportunities, or simply wish to learn more, we'd love to hear from you.
            </p>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
