
import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users, Handshake, Mail, HeartHandshake, MessageSquareQuote, Building } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Involved - Support APSAD\'s Mission in Lebanon',
  description: 'Join APSAD in protecting Lebanon\'s heritage. Discover various ways to get involved, from volunteering and membership to advocacy and partnerships. Contact us to make a difference.',
};

const involvementOptions = [
  {
    icon: Users,
    title: "Volunteer Your Time",
    imageSrc: "/volunteer.jpg",
    imageAlt: "Diverse group of people collaborating on an APSAD heritage project",
    description: "Lend your skills and passion to our projects in Lebanon. From field work to archival research, there are many ways to contribute directly.",
    details: "We welcome volunteers with diverse backgrounds. Opportunities include site maintenance, event support, research assistance, and administrative tasks. Your time and expertise are invaluable to our mission.",
    aiHint: "volunteering hands"
  },
  {
    icon: HeartHandshake, 
    title: "Become a Member",
    imageSrc: "/members.jpg",
    imageAlt: "Symbolic representation of APSAD community support and membership benefits",
    description: "Join the APSAD family and enjoy exclusive benefits while supporting our ongoing conservation efforts in Lebanon.",
    details: "Membership provides vital regular funding and comes with perks like newsletters, event invitations, and discounts on publications. Various membership tiers are available to suit your level of support.",
    aiHint: "support network"
  },
  {
    icon: MessageSquareQuote, 
    title: "Advocate for Heritage",
    imageSrc: "/heritage.jpg",
    imageAlt: "Person passionately advocating for Lebanese heritage preservation",
    description: "Use your voice to raise awareness about the importance of Lebanese heritage preservation and support our advocacy campaigns.",
    details: "Help us influence policy and public opinion. Share our stories on social media, participate in our campaigns, and contact your representatives about the critical heritage issues facing Lebanon.",
    aiHint: "speaking podium"
  },
  {
    icon: Building, 
    title: "Partner With Us",
    imageSrc: "/partner.jpg",
    imageAlt: "Professional handshake symbolizing corporate partnership with APSAD for Lebanon's heritage",
    description: "Collaborate with APSAD on projects, sponsor initiatives, or explore corporate social responsibility opportunities for Lebanon's heritage.",
    details: "We seek impactful partnerships with institutions, corporations, and other NGOs that share our commitment to heritage. Let's discuss how we can work together for the future of Lebanon's past.",
    aiHint: "office handshake"
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="py-16 md:py-24 bg-background text-foreground">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-20 md:mb-24">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
            <Handshake className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
            Join Our Mission
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Preserving Lebanon's rich tapestry of history and culture is a collective endeavor. APSAD offers diverse avenues for you to contribute your unique skills, passion, and support. Discover how you can become an integral part of safeguarding our shared heritage for generations to come.
          </p>
        </header>

        <section className="mb-20 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-16 text-center">
            Ways You Can Make a Difference
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 lg:gap-x-12 lg:gap-y-16">
            {involvementOptions.map((option) => (
              <Card key={option.title} className="flex flex-col bg-card rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden group">
                <div className="relative w-full h-64 md:h-72">
                  <Image
                    src={option.imageSrc}
                    alt={option.imageAlt} // Updated alt text
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={option.aiHint}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
                <CardHeader className="pt-6 pb-3">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-full bg-accent/10 text-accent flex-shrink-0">
                         <option.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-primary group-hover:text-accent transition-colors">{option.title}</CardTitle>
                  </div>
                  <CardDescription className="text-md text-muted-foreground pt-1">{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-0 pb-5">
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">{option.details}</p>
                </CardContent>
                 <CardFooter className="p-5 bg-muted/30 border-t">
                    <p className="text-xs text-accent italic">Learn more by contacting us below.</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact-section" className="py-16 md:py-24 bg-gradient-to-br from-secondary/20 to-primary/5 rounded-xl shadow-2xl scroll-mt-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="inline-block p-3 bg-background rounded-full shadow-md mb-6">
                <Mail className="h-12 w-12 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-5">Connect With APSAD</h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Whether you have questions about our projects in Lebanon, wish to explore involvement opportunities, or simply want to share your thoughts on heritage preservation, we are eager to hear from you. Please reach out using the form below.
            </p>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
    
