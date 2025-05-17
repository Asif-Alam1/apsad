
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Landmark, Target, Eye, Users, History, Handshake, Briefcase, Shield } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Layla Hassan",
    title: "President & Lead Archaeologist",
    imageUrl: "https://placehold.co/400x400.png",
    aiHint: "professional woman portrait",
    bio: "Dr. Hassan has dedicated over 20 years to uncovering and preserving Lebanon's rich archaeological heritage. Her expertise in Roman and Phoenician sites has guided many of APSAD's key restoration projects, contributing significantly to the understanding and safeguarding of ancient civilizations in the region. She is also a published author and frequent speaker at international heritage conferences.",
  },
  {
    name: "Mr. Karim Nader",
    title: "Director of Operations & Community Outreach",
    imageUrl: "https://placehold.co/400x400.png",
    aiHint: "professional man portrait",
    bio: "Mr. Nader manages APSAD's field operations and fosters crucial relationships with local communities, ensuring that preservation efforts are collaborative and sustainable. He has a background in project management and social development, and is passionate about empowering local stakeholders in the heritage conservation process.",
  },
  {
    name: "Ms. Rania Khoury",
    title: "Chief Architect & Conservation Specialist",
    imageUrl: "https://placehold.co/400x400.png",
    aiHint: "female architect portrait",
    bio: "Ms. Khoury brings a wealth of knowledge in historical building conservation and sustainable architectural practices. She oversees the structural integrity and authentic restoration of APSAD's diverse projects, from ancient ruins to traditional dwellings, ensuring adherence to international conservation standards.",
  },
];


export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] md:h-[70vh] w-full">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Panoramic view of a significant historical site in Lebanon, bathed in golden hour light"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
          data-ai-hint="lebanon heritage sunset"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 bg-black/50">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-shadow-lg">
            APSAD: Protecting Lebanon's Heritage
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-10 text-shadow">
            Association for the Protection of Natural Sites and Old Buildings in Lebanon. Join us in our mission to safeguard these irreplaceable treasures for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/gallery">Explore Our Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="py-16 md:py-24 bg-background">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          
          <header className="text-center mb-20 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Welcome to APSAD</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              APSAD - Association pour la Protection des Sites et Anciennes Demeures (Association for the Protection of Natural Sites and Old Buildings in Lebanon), is a non-governmental organization founded in 1960. We are dedicated to the identification, protection, preservation, and promotion of Lebanon's rich cultural and natural heritage.
            </p>
          </header>

          <section className="mb-20 md:mb-24">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl lg:text-4xl font-semibold text-primary mb-6 flex items-center gap-3">
                  <History className="h-10 w-10 text-accent" /> Our History
                </h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Founded in 1960, APSAD emerged from a collective desire among historians, archaeologists, architects, and community leaders to address the growing concerns over the neglect and degradation of significant heritage sites in Lebanon.
                  </p>
                  <p>
                    Over the decades, APSAD has grown into a leading non-governmental organization, spearheading numerous successful preservation projects, advocating for policy changes, and fostering public awareness about the importance of our shared past. Our journey has been marked by collaboration, dedication, and an unwavering commitment to protecting the legacies entrusted to us.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-2xl aspect-video">
                <Image
                  src="https://placehold.co/600x450.png"
                  alt="Historical photo of APSAD founders or an early project in Lebanon"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  data-ai-hint="historical archive lebanon"
                />
              </div>
            </div>
          </section>

          <section className="mb-20 md:mb-24 py-12 md:py-16 bg-secondary/10 rounded-xl shadow-lg">
            <div className="container max-w-5xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="rounded-xl overflow-hidden shadow-2xl aspect-video">
                        <Image
                        src="https://placehold.co/600x450.png"
                        alt="Conceptual image representing heritage preservation and planning"
                        width={600}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        data-ai-hint="heritage preservation planning"
                        />
                    </div>
                    <div>
                        <h3 className="text-3xl lg:text-4xl font-semibold text-primary mb-6 flex items-center gap-3">
                        <Shield className="h-10 w-10 text-accent" /> Our Mission
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                        APSAD is committed to the identification, protection, conservation, and promotion of cultural and natural heritage in Lebanon. We strive to ensure that these invaluable assets are preserved for future generations, fostering a deeper understanding and appreciation of our collective history and identity through research, education, and community engagement.
                        </p>
                    </div>
                </div>
            </div>
          </section>

          <section className="mb-20 md:mb-24">
             <div className="container max-w-5xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <h3 className="text-3xl lg:text-4xl font-semibold text-primary mb-6 flex items-center gap-3">
                        <Eye className="h-10 w-10 text-accent" /> Our Vision
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                        We envision a Lebanon where cultural and natural heritage is universally valued, meticulously protected, and serves as a dynamic source of knowledge, inspiration, and sustainable development for all communities, enriching lives and strengthening national identity.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-2xl aspect-video">
                        <Image
                        src="https://placehold.co/600x450.png"
                        alt="Inspirational image of a preserved heritage site in Lebanon, looking towards the future"
                        width={600}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        data-ai-hint="future lebanon heritage"
                        />
                    </div>
                </div>
            </div>
          </section>

          <section className="mb-20 md:mb-24">
            <div className="container max-w-5xl mx-auto px-6">
                <h3 className="text-3xl lg:text-4xl font-semibold text-primary mb-12 md:mb-16 text-center flex items-center justify-center gap-3">
                <Target className="h-10 w-10 text-accent" /> Our Goals
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: "Site Preservation", description: "Implement effective conservation for endangered Lebanese heritage sites using best practices and innovative tech." },
                    { title: "Research & Documentation", description: "Conduct and support research enhancing understanding of Lebanese heritage; meticulously document sites." },
                    { title: "Community Engagement", description: "Actively involve local communities, empowering them as custodians of their history and culture in Lebanon." },
                    { title: "Education & Awareness", description: "Raise public awareness of Lebanese heritage's significance and conservation importance via education and outreach." },
                    { title: "Advocacy & Policy", description: "Advocate for stronger legal frameworks supporting heritage protection at all levels concerning Lebanon." },
                    { title: "Sustainable Practices", description: "Promote sustainable tourism and site management benefiting both heritage and local economies in Lebanon." },
                ].map((goal, index) => (
                    <Card key={index} className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-accent">{goal.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </div>
          </section>

          <section className="mb-20 md:mb-24 py-12 md:py-16 bg-secondary/10 rounded-xl shadow-lg">
            <div className="container max-w-5xl mx-auto px-6">
              <h3 className="text-3xl lg:text-4xl font-semibold text-primary mb-12 md:mb-16 text-center flex items-center justify-center gap-3">
                <Users className="h-10 w-10 text-accent" /> Our Team
              </h3>
              <Accordion type="single" collapsible className="w-full space-y-6">
                {teamMembers.map((member, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card border-border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <AccordionTrigger className="p-6 text-left hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                          data-ai-hint={member.aiHint}
                        />
                        <div>
                          <h4 className="text-xl font-semibold text-primary">{member.name}</h4>
                          <p className="text-sm text-accent">{member.title}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0">
                      <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
               <p className="text-center text-muted-foreground mt-12 text-lg">
                APSAD is also powered by numerous dedicated volunteers and a supportive board of directors, all united by a shared passion for Lebanon's heritage.
              </p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Featured Projects/Sites */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-16 md:mb-20">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-xl">
              <div className="relative w-full h-64">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Restoration of Historical Building in Lebanon"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                    data-ai-hint="lebanon architecture restoration"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Old Souk Rehabilitation</CardTitle>
                <CardDescription className="mt-1 text-md">Revitalizing a traditional marketplace.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed">
                  This project focuses on structural repairs and preserving the authentic character of a historic souk in Lebanon, ensuring its continued role in community life.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-xl">
              <div className="relative w-full h-64">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Natural Site Conservation in Lebanon"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                    data-ai-hint="lebanon nature conservation"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Cedar Reserve Protection</CardTitle>
                <CardDescription className="mt-1 text-md">Conserving a vital natural heritage site.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed">
                  Working to protect ancient cedar forests through sustainable management, reforestation efforts, and community involvement in ecological preservation.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-xl">
              <div className="relative w-full h-64">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Community Heritage Workshops in Lebanon"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                    data-ai-hint="lebanon community workshop"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Heritage Awareness Program</CardTitle>
                <CardDescription className="mt-1 text-md">Engaging youth in Lebanese heritage.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed">
                  Educational initiatives and interactive workshops designed to foster appreciation and stewardship for local heritage sites among young Lebanese.
                </p>
              </CardContent>
            </Card>
          </div>
           <div className="text-center mt-16 md:mt-20">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/gallery">See More of Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action: Get Involved */}
      <section className="py-16 lg:py-24 bg-secondary/10">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Briefcase className="h-16 w-16 text-accent mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Make a Difference with APSAD
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Your support is crucial to our efforts in Lebanon. Whether you volunteer, become a member, or advocate for our cause, you can play a part in preserving our shared heritage for generations to come.
          </p>
          <Button asChild size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/get-involved">Join Our Cause</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

    