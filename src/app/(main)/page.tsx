import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Target, Eye, Users, History, Briefcase, Shield, Sparkles, ArrowRight, Star, Globe } from "lucide-react";
import type { Metadata } from 'next';
import HeroSection from "@/components/HeroSection";
import { StatsSection } from "@/components/StatSection";
import { TeamSection } from "@/components/TeamSection";

export const metadata: Metadata = {
  title: 'APSAD - Preserving Lebanon\'s Heritage | Home',
  description: 'Welcome to APSAD (Association for the Protection of Natural Sites and Old Buildings in Lebanon). Learn about our 60+ year mission to protect, preserve, and promote Lebanon\'s cultural and natural heritage.',
};

const teamMembers = [
  {
    name: "Mrs. Raya Daouk",
    title: "President",
    imageUrl: "/Raya.jpg",
    aiHint: "President Portrait",
    bio: "Leading APSAD with vision and dedication to preserve Lebanon's cultural heritage for future generations.",
  },
  {
    name: "Mr. Costa Doumani",
    title: "Director of Operations",
    imageUrl: "/Costa.jpg",
    aiHint: "director portrait",
    bio: "Orchestrating field operations and ensuring sustainable preservation practices across all APSAD projects.",
  },
  {
    name: "Dr. Yasmine Makaroun",
    title: "Chief Architect & Conservation Specialist",
    imageUrl: "/yasmine.jpeg",
    aiHint: "architect portrait",
    bio: "Bringing architectural expertise and innovative conservation techniques to Lebanon's most precious heritage sites.",
  },
];

const stats = [
  { number: "60+", label: "Years of Heritage Protection", icon: History },
  { number: "150+", label: "Sites Preserved", icon: Shield },
  { number: "500+", label: "Community Members", icon: Users },
  { number: "25+", label: "Active Projects", icon: Target },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Advanced Animations */}
   <HeroSection/>

      {/* Stats Section */}
   <StatsSection/>

      {/* Welcome Section with Glass Morphism */}
      <div className="py-28 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
        
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <header className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 group hover:bg-primary/20 transition-all duration-300">
              <Globe className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Heritage Preservation Excellence</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mb-8">
              Welcome to APSAD
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              APSAD - Association pour la Protection des Sites et Anciennes Demeures, is a non-governmental organization founded in 1960. 
              We are dedicated to the identification, protection, preservation, and promotion of Lebanon's rich cultural and natural heritage.
            </p>
          </header>

          {/* Mission & Vision Cards */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {/* Mission Card */}
            <Card className="group relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-white/30 hover:from-white/90 hover:to-white/70 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
              
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                    Our Mission
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  APSAD is committed to the identification, protection, conservation, and promotion of cultural and natural heritage in Lebanon. 
                  We strive to ensure that these invaluable assets are preserved for future generations, fostering a deeper understanding 
                  and appreciation of our collective history and identity through research, education, and community engagement.
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="group relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-white/30 hover:from-white/90 hover:to-white/70 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full -translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700" />
              
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-full bg-gradient-to-br from-accent to-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                    Our Vision
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We envision a Lebanon where cultural and natural heritage is universally valued, meticulously protected, and serves as a 
                  dynamic source of knowledge, inspiration, and sustainable development for all communities, enriching lives and strengthening 
                  national identity.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Goals Grid */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-primary mb-6 flex items-center justify-center gap-4">
                <Target className="h-10 w-10 text-accent" /> 
                Our Strategic Goals
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Six pillars that guide our mission to preserve Lebanon's invaluable heritage
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "Site Preservation", 
                  description: "Implement effective conservation for endangered Lebanese heritage sites using best practices and innovative technology.",
                  icon: Shield,
                  gradient: "from-blue-500 to-cyan-500"
                },
                { 
                  title: "Research & Documentation", 
                  description: "Conduct and support research enhancing understanding of Lebanese heritage; meticulously document sites.",
                  icon: History,
                  gradient: "from-purple-500 to-pink-500"
                },
                { 
                  title: "Community Engagement", 
                  description: "Actively involve local communities, empowering them as custodians of their history and culture in Lebanon.",
                  icon: Users,
                  gradient: "from-green-500 to-emerald-500"
                },
                { 
                  title: "Education & Awareness", 
                  description: "Raise public awareness of Lebanese heritage's significance and conservation importance via education.",
                  icon: Target,
                  gradient: "from-orange-500 to-red-500"
                },
                { 
                  title: "Advocacy & Policy", 
                  description: "Advocate for stronger legal frameworks supporting heritage protection at all levels concerning Lebanon.",
                  icon: Globe,
                  gradient: "from-indigo-500 to-purple-500"
                },
                { 
                  title: "Sustainable Practices", 
                  description: "Promote sustainable tourism and site management benefiting both heritage and local economies.",
                  icon: Sparkles,
                  gradient: "from-teal-500 to-blue-500"
                },
              ].map((goal, index) => (
                <Card key={index} className="group relative bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-xl border-white/30 hover:from-white/90 hover:to-white/70 transition-all duration-700 hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${goal.gradient} rounded-full opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700`} />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${goal.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <goal.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        {goal.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {goal.description}
                    </p>
                  </CardContent>
                  
                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section with Advanced Cards */}
        <TeamSection/>
        </div>
      </div>
      
      {/* Featured Projects with Advanced Scroll Animation */}
      <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Heritage in Action</span>
            </div>
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mb-8">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our most impactful preservation initiatives across Lebanon
            </p>
          </div>
          
          <ScrollArea className="w-full pb-6">
            <div className="flex space-x-8 px-1 py-2">
              {[
                { src: "/image-1.jpeg", title: "Ancient Baalbek Restoration", desc: "Roman Temple Complex", hint: "Project 1" },
                { src: "/image-2.jpeg", title: "Byblos Heritage Trail", desc: "Phoenician Port City", hint: "project 2" },
                { src: "/image-3.jpeg", title: "Community Education Program", desc: "Youth Heritage Awareness", hint: "children learning" },
              ].map((project, index) => (
                <Card key={index} className="group relative w-96 flex-shrink-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-white/30 hover:from-white/90 hover:to-white/70 transition-all duration-700 hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative w-full h-72 overflow-hidden">
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      data-ai-hint={project.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
                      <span className="text-white text-xs font-medium">Featured</span>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3 pt-6 relative z-10">
                    <CardTitle className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-accent font-medium text-lg">
                      {project.desc}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow relative z-10">
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      Preserving Lebanon's invaluable cultural heritage through meticulous restoration and community engagement.
                    </p>
                  </CardContent>
                  
                  {/* Hover Effect Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="mt-4" />
          </ScrollArea>
          
          <div className="text-center mt-20">
            <Button asChild size="lg" variant="outline" className="group bg-white/10 border-primary/30 text-primary hover:bg-primary/10 backdrop-blur-md px-10 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <Link href="/gallery" className="flex items-center gap-2">
                Explore All Projects
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Animation */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),transparent_70%)]" />
        
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-12 shadow-2xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Briefcase className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Join Our Mission</span>
              </div>
              <Briefcase className="h-20 w-20 text-accent mx-auto mb-8 animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mb-8">
              Make a Difference with APSAD
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Your support is crucial to our efforts in Lebanon. Whether you volunteer, become a member, or advocate for our cause, 
              you can play a part in preserving our shared heritage for generations to come.
            </p>
            
            <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105">
              <Link href="/get-involved" className="flex items-center gap-2">
                Join Our Cause
                <Users className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}