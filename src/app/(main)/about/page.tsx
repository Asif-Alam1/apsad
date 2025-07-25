import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Landmark, Target, Eye, Users, HistoryIcon, Sparkles, Star, Globe, Heart, ArrowRight, Clock, Award, BookOpen, Shield } from "lucide-react";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'About APSAD - Our Heritage Preservation Story | APSAD Lebanon',
  description: 'Learn about APSAD\'s 60+ year journey preserving Lebanon\'s cultural heritage. Discover our mission, vision, goals, and the dedicated team working to protect Lebanese historical sites and traditions.',
};

const milestones = [
  { year: "1960", title: "Foundation", description: "APSAD established to protect Lebanon's heritage sites", icon: Star },
  { year: "1975", title: "First Major Project", description: "Restoration of ancient Phoenician ruins in Byblos", icon: Landmark },
  { year: "1990", title: "UNESCO Partnership", description: "Official collaboration with UNESCO for heritage protection", icon: Globe },
  { year: "2000", title: "Digital Archive", description: "Launch of comprehensive digital heritage documentation", icon: BookOpen },
  { year: "2010", title: "Community Program", description: "Expansion into community-based conservation initiatives", icon: Users },
  { year: "2020", title: "Modern Era", description: "Integration of AI and modern technology in preservation", icon: Sparkles },
];

const achievements = [
  { number: "150+", label: "Heritage Sites Protected", icon: Shield },
  { number: "60+", label: "Years of Experience", icon: Clock },
  { number: "25+", label: "UNESCO Projects", icon: Award },
  { number: "500+", label: "Community Partners", icon: Heart },
];

const teamStats = [
  { role: "Heritage Specialists", count: "15+", color: "from-blue-500 to-cyan-500" },
  { role: "Field Archaeologists", count: "12+", color: "from-green-500 to-emerald-500" },
  { role: "Conservation Experts", count: "8+", color: "from-purple-500 to-pink-500" },
  { role: "Community Liaisons", count: "20+", color: "from-orange-500 to-red-500" },
];

const goals = [
  { 
    title: "Site Preservation", 
    description: "Implement effective conservation measures for endangered heritage sites, utilizing best practices and innovative technologies that ensure long-term sustainability.",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    features: ["Advanced 3D scanning", "Climate monitoring", "Structural analysis", "Preventive conservation"]
  },
  { 
    title: "Research & Documentation", 
    description: "Conduct and support scholarly research that enhances understanding of our heritage, and meticulously document sites and artifacts for future generations.",
    icon: BookOpen,
    gradient: "from-purple-500 to-pink-500",
    features: ["Digital archives", "Academic partnerships", "Publication programs", "Data preservation"]
  },
  { 
    title: "Community Engagement", 
    description: "Actively involve local communities in heritage preservation, empowering them as custodians of their own history and cultural identity.",
    icon: Users,
    gradient: "from-green-500 to-emerald-500",
    features: ["Training programs", "Local partnerships", "Cultural events", "Youth education"]
  },
  { 
    title: "Education & Awareness", 
    description: "Raise public awareness about the significance of heritage and the importance of its conservation through innovative educational programs.",
    icon: Target,
    gradient: "from-orange-500 to-red-500",
    features: ["School programs", "Public workshops", "Media campaigns", "Digital platforms"]
  },
  { 
    title: "Advocacy & Policy", 
    description: "Advocate for stronger legal frameworks and policies that support heritage protection at local, national, and international levels.",
    icon: Globe,
    gradient: "from-indigo-500 to-purple-500",
    features: ["Policy development", "Legal advocacy", "International cooperation", "Regulatory guidance"]
  },
  { 
    title: "Sustainable Practices", 
    description: "Promote sustainable tourism and site management practices that benefit both heritage preservation and local economic development.",
    icon: Sparkles,
    gradient: "from-teal-500 to-blue-500",
    features: ["Eco-tourism", "Economic impact", "Sustainable development", "Local benefits"]
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full animate-pulse" />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="py-24 md:py-32 relative z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Hero Section */}
          <header className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 group hover:bg-primary/20 transition-all duration-300">
              <HistoryIcon className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Our Story</span>
              <Star className="h-3 w-3 text-accent" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                About
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl mt-2 text-foreground">
                APSAD
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              For over six decades, we have been dedicated to the preservation and promotion of Lebanon's cultural and natural heritage. 
              <span className="text-accent font-medium"> Our journey is one of passion, dedication, and unwavering commitment</span> to protecting the treasures of our past for future generations.
            </p>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {achievements.map((achievement, index) => (
                <Card key={index} className="group relative bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                      {achievement.number}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </header>

          {/* History Section */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-primary mb-6 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg">
                      <HistoryIcon className="h-8 w-8 text-white" />
                    </div>
                    Our Rich History
                  </h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      Founded in 1960, APSAD emerged from a collective desire among historians, archaeologists, architects, and community leaders to address the growing concerns over the neglect and degradation of Lebanon's significant heritage sites.
                    </p>
                    <p>
                      Over the decades, APSAD has evolved into Lebanon's leading non-governmental organization for heritage preservation, spearheading numerous groundbreaking conservation projects, advocating for transformative policy changes, and fostering unprecedented public awareness about the critical importance of our shared cultural legacy.
                    </p>
                    <p>
                      Our journey has been marked by strategic partnerships with local communities, national institutions, and international bodies, continuously adapting our methodologies to meet new challenges in the ever-evolving field of heritage conservation while maintaining our core commitment to excellence.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full px-6">
                    <Link href="/gallery" className="flex items-center gap-2">
                      View Our Projects
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/70 border-white/30 hover:bg-white/90 rounded-full px-6">
                    <Link href="/get-involved">Join Our Mission</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <Card className="relative bg-white/80 backdrop-blur-sm border-white/30 rounded-3xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-all duration-500">
                  <div className="relative h-96 md:h-[500px]">
                    <Image
                      src="/history.jpeg"
                      alt="Historical photograph showcasing APSAD's early heritage preservation work in Lebanon"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint="APSAD historical archive"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <Badge variant="outline" className="bg-white/90 border-white/50 text-primary mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        Est. 1960
                      </Badge>
                      <h3 className="text-white text-xl font-bold">Building Lebanon's Heritage Future</h3>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="mb-24 py-20 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl rounded-3xl border border-white/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
            <div className="relative z-10 container max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold text-primary mb-6">
                  Our Journey Through Time
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Six decades of dedication to preserving Lebanon's cultural treasures
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {milestones.map((milestone, index) => (
                  <Card key={index} className="group relative bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <milestone.icon className="h-5 w-5 text-white" />
                        </div>
                        <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent font-bold">
                          {milestone.year}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        {milestone.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Mission */}
              <Card className="group relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-white/30 hover:from-white/90 hover:to-white/70 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="pb-6 relative z-10 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Landmark className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        Our Mission
                      </CardTitle>
                      <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary mt-2">
                        <Shield className="h-3 w-3 mr-1" />
                        Heritage Protection
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 p-8 pt-0">
                  <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    APSAD is committed to the identification, protection, conservation, and promotion of cultural and natural heritage in Lebanon. We strive to ensure that these invaluable assets are preserved for future generations, fostering a deeper understanding and appreciation of our collective history and identity through cutting-edge research, innovative education, and meaningful community engagement.
                  </p>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="group relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-white/30 hover:from-white/90 hover:to-white/70 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full -translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="pb-6 relative z-10 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-full bg-gradient-to-br from-accent to-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        Our Vision
                      </CardTitle>
                      <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent mt-2">
                        <Globe className="h-3 w-3 mr-1" />
                        Global Impact
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 p-8 pt-0">
                  <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    We envision a Lebanon where cultural and natural heritage is universally valued, meticulously protected, and serves as a dynamic source of knowledge, inspiration, and sustainable development for all communities, enriching lives and strengthening national identity while contributing to global heritage preservation efforts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Goals Section */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-primary mb-6 flex items-center justify-center gap-4">
                <Target className="h-10 w-10 text-accent" /> 
                Our Strategic Goals
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Six comprehensive pillars that guide our mission to preserve and promote Lebanon's invaluable heritage
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {goals.map((goal, index) => (
                <Card key={index} className="group relative bg-white/70 backdrop-blur-xl border-white/30 hover:bg-white/90 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl overflow-hidden cursor-pointer rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${goal.gradient} rounded-full opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700`} />
                  
                  <CardHeader className="pb-4 relative z-10 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${goal.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <goal.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        {goal.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10 p-8 pt-0 space-y-6">
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300 text-lg">
                      {goal.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-3">
                      {goal.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${goal.gradient}`} />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.2),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(120,119,198,0.1),transparent_70%)]" />
            
            <div className="container max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    Our Expert Team
                  </span>
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                  APSAD is powered by a diverse team of passionate professionals, researchers, volunteers, and a supportive board of directors, all united by an unwavering commitment to heritage preservation excellence.
                </p>
                
                {/* Team Statistics */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                  {teamStats.map((stat, index) => (
                    <Card key={index} className="group relative bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                      <CardContent className="p-6 text-center relative z-10">
                        <div className={`mx-auto w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                          {stat.count}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {stat.role}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our multidisciplinary approach brings together archaeologists, architects, historians, conservators, digital specialists, and community engagement experts, creating a comprehensive framework for heritage preservation that addresses both technical and social aspects of conservation work.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full px-8">
                      <Link href="/get-involved" className="flex items-center gap-2">
                        Join Our Team
                        <Users className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="bg-white/70 border-white/30 hover:bg-white/90 rounded-full px-8">
                      <Link href="/gallery">See Our Work</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}