
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Target, Eye, Users, History, Handshake } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Panoramic view of a historical site in Lebanon"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
          data-ai-hint="lebanon landscape"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 bg-black/40">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-shadow-lg">
            APSAD: Protecting Lebanon's Heritage
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-shadow">
            Association for the Protection of Natural Sites and Old Buildings in Lebanon. Join us in our mission to safeguard these treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="primary">
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
        <div className="container max-w-5xl mx-auto px-6">
          
          <header className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Welcome to APSAD</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              APSAD - Association pour la Protection des Sites et Anciennes Demeures (Association for the Protection of Natural Sites and Old Buildings in Lebanon), is a non-governmental organization dedicated to the identification, protection, preservation, and promotion of Lebanon's cultural and natural heritage.
            </p>
          </header>

          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-3">
                  <History className="h-8 w-8 text-accent" /> Our History
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 1960, APSAD emerged from a collective desire among historians, archaeologists, architects, and community leaders to address the growing concerns over the neglect and degradation of significant heritage sites in Lebanon.
                  </p>
                  <p>
                    Over the decades, APSAD has grown into a leading non-governmental organization, spearheading numerous successful preservation projects, advocating for policy changes, and fostering public awareness about the importance of our shared past. Our journey has been marked by collaboration, dedication, and an unwavering commitment to protecting the legacies entrusted to us.
                  </p>
                  <p>
                    We have partnered with local communities, national institutions, and international bodies to achieve our goals, continuously adapting our strategies to meet new challenges in the field of heritage conservation.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://placehold.co/600x450.png"
                  alt="Historical photo of APSAD founders or an early project in Lebanon"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  data-ai-hint="historical archive lebanon"
                />
              </div>
            </div>
          </section>

          <section className="mb-20 p-10 md:p-12 bg-secondary/20 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-3">
              <Landmark className="h-8 w-8 text-accent" /> Our Mission
            </h3>
            <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              APSAD is committed to the identification, protection, conservation, and promotion of cultural and natural heritage in Lebanon. We strive to ensure that these invaluable assets are preserved for future generations, fostering a deeper understanding and appreciation of our collective history and identity through research, education, and community engagement.
            </p>
          </section>

          <section className="mb-20">
            <h3 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-3">
              <Eye className="h-8 w-8 text-accent" /> Our Vision
            </h3>
            <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We envision a Lebanon where cultural and natural heritage is universally valued, meticulously protected, and serves as a dynamic source of knowledge, inspiration, and sustainable development for all communities.
            </p>
          </section>

          <section className="mb-24">
            <h3 className="text-3xl font-semibold text-primary mb-12 text-center flex items-center justify-center gap-3">
              <Target className="h-8 w-8 text-accent" /> Our Goals
            </h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {[
                { title: "Site Preservation", description: "To implement effective conservation measures for endangered heritage sites in Lebanon, utilizing best practices and innovative technologies." },
                { title: "Research & Documentation", description: "To conduct and support scholarly research that enhances understanding of Lebanese heritage, and to meticulously document sites and artifacts." },
                { title: "Community Engagement", description: "To actively involve local communities in heritage preservation, empowering them as custodians of their own history and culture in Lebanon." },
                { title: "Education & Awareness", description: "To raise public awareness about the significance of Lebanese heritage and the importance of its conservation through educational programs and outreach activities." },
                { title: "Advocacy & Policy", description: "To advocate for stronger legal frameworks and policies that support heritage protection at local, national, and international levels concerning Lebanon." },
                { title: "Sustainable Practices", description: "To promote sustainable tourism and site management practices that benefit both heritage and local economies in Lebanon." },
              ].map((goal, index) => (
                <div key={index} className="p-8 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-xl font-semibold text-accent mb-3">{goal.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h3 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-3">
              <Users className="h-8 w-8 text-accent" /> Our Team
            </h3>
            <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              APSAD is powered by a dedicated team of professionals, researchers, volunteers, and a supportive board of directors, all united by a shared passion for Lebanon's heritage. (Further details about the team structure or key members can be added here if desired).
            </p>
          </section>
        </div>
      </div>
      
      {/* Featured Projects/Sites */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Restoration of Historical Building in Lebanon"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
                data-ai-hint="lebanon architecture restoration"
              />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Old Souk Rehabilitation</CardTitle>
                <CardDescription className="mt-1">Revitalizing a traditional marketplace.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This project focuses on structural repairs and preserving the authentic character of a historic souk in Lebanon.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Natural Site Conservation in Lebanon"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
                data-ai-hint="lebanon nature conservation"
              />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Cedar Reserve Protection</CardTitle>
                <CardDescription className="mt-1">Conserving a vital natural heritage site.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Working to protect ancient cedar forests through sustainable management and community involvement.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Community Heritage Workshops in Lebanon"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
                data-ai-hint="lebanon community workshop"
              />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Heritage Awareness Program</CardTitle>
                <CardDescription className="mt-1">Engaging youth in Lebanese heritage preservation.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Educational initiatives and workshops designed to foster appreciation and stewardship for local heritage sites among young Lebanese.
                </p>
              </CardContent>
            </Card>
          </div>
           <div className="text-center mt-16">
            <Button asChild variant="link" className="text-lg text-accent hover:text-accent/80">
              <Link href="/gallery">See More of Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action: Get Involved */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Handshake className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Make a Difference with APSAD
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Your support is crucial to our efforts in Lebanon. Whether you volunteer, become a member, or advocate for our cause, you can play a part in preserving our shared heritage.
          </p>
          <Button asChild size="lg" variant="primary">
            <Link href="/get-involved">Join Our Cause</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
