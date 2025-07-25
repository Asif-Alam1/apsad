import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Handshake, Mail, HeartHandshake, MessageSquareQuote, Building, Sparkles, ArrowRight, Star, Globe, Target, CheckCircle } from "lucide-react";
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
    details: "We welcome volunteers with diverse backgrounds and skill sets. Whether you're interested in hands-on restoration work, digital archiving, educational outreach, or administrative support, your contribution makes a real difference in preserving Lebanon's cultural heritage.",
    aiHint: "volunteering hands",
    benefits: ["Hands-on experience", "Skill development", "Networking opportunities", "Cultural immersion"],
    commitment: "Flexible hours",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: HeartHandshake, 
    title: "Become a Member",
    imageSrc: "/members.jpg",
    imageAlt: "Symbolic representation of APSAD community support and membership benefits",
    description: "Join the APSAD family and enjoy exclusive benefits while supporting our ongoing conservation efforts in Lebanon.",
    details: "Membership provides vital regular funding and comes with exclusive perks including quarterly newsletters, priority access to events, behind-the-scenes site visits, and discounts on our publications and merchandise.",
    aiHint: "support network",
    benefits: ["Exclusive access", "Priority bookings", "Member publications", "Special events"],
    commitment: "Annual membership",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageSquareQuote, 
    title: "Advocate for Heritage",
    imageSrc: "/heritage.jpg",
    imageAlt: "Person passionately advocating for Lebanese heritage preservation",
    description: "Use your voice to raise awareness about the importance of Lebanese heritage preservation and support our advocacy campaigns.",
    details: "Help us influence policy and public opinion by sharing our stories on social media, participating in awareness campaigns, writing to representatives, and speaking within your communities about heritage preservation issues.",
    aiHint: "speaking podium",
    benefits: ["Policy influence", "Community impact", "Skill building", "Network expansion"],
    commitment: "Ongoing engagement",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Building, 
    title: "Partner With Us",
    imageSrc: "/partner.jpg",
    imageAlt: "Professional handshake symbolizing corporate partnership with APSAD for Lebanon's heritage",
    description: "Collaborate with APSAD on projects, sponsor initiatives, or explore corporate social responsibility opportunities for Lebanon's heritage.",
    details: "We seek meaningful partnerships with institutions, corporations, and other NGOs that share our commitment to heritage preservation. Together, we can create larger impact through joint projects, sponsorships, and knowledge sharing.",
    aiHint: "office handshake",
    benefits: ["Brand visibility", "CSR fulfillment", "Tax benefits", "Impact measurement"],
    commitment: "Project-based",
    gradient: "from-orange-500 to-red-500"
  },
];

const impactStats = [
  { number: "500+", label: "Active Volunteers", icon: Users },
  { number: "25", label: "Partner Organizations", icon: Building },
  { number: "1000+", label: "Members Worldwide", icon: HeartHandshake },
  { number: "50+", label: "Advocacy Campaigns", icon: MessageSquareQuote },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Volunteer Archaeologist",
    quote: "Working with APSAD has been transformative. Every day, I contribute to preserving stories that span millennia.",
    avatar: "/volunteer.jpg"
  },
  {
    name: "Ahmad Khalil",
    role: "Corporate Partner",
    quote: "Our partnership with APSAD aligns perfectly with our values of cultural preservation and community impact.",
    avatar: "/partner.jpg"
  },
  {
    name: "Elena Rodriguez",
    role: "Heritage Advocate",
    quote: "Through APSAD's advocacy programs, I've learned to be an effective voice for heritage preservation.",
    avatar: "/heritage.jpg"
  }
];

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full animate-pulse" />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="py-24 md:py-32 relative z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <header className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 group hover:bg-primary/20 transition-all duration-300">
              <Handshake className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Join Our Mission</span>
              <Star className="h-3 w-3 text-accent" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Join Our
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl mt-2 text-foreground">
                Heritage Mission
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Preserving Lebanon's rich tapestry of history and culture is a collective endeavor. APSAD offers diverse avenues for you to contribute your unique skills, passion, and support. 
              <span className="text-accent font-medium"> Discover how you can become an integral part</span> of safeguarding our shared heritage for generations to come.
            </p>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {impactStats.map((stat, index) => (
                <Card key={index} className="group relative bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </header>

          {/* Ways to Get Involved */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
                Ways You Can Make a Difference
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Four meaningful paths to contribute to Lebanon's heritage preservation
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {involvementOptions.map((option, index) => (
                <Card key={option.title} className="group relative bg-white/70 backdrop-blur-xl border-white/30 hover:bg-white/90 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl overflow-hidden rounded-3xl">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${option.gradient} opacity-5 rounded-full group-hover:opacity-10 group-hover:scale-150 transition-all duration-1000`} />
                  
                  {/* Image Section */}
                  <div className="relative w-full h-64 md:h-72 overflow-hidden">
                    <Image
                      src={option.imageSrc}
                      alt={option.imageAlt}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      data-ai-hint={option.aiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
                      <span className="text-white text-xs font-medium">{option.commitment}</span>
                    </div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${option.gradient} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <option.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 relative z-10">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <CardTitle className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                          {option.title}
                        </CardTitle>
                        <Badge variant="outline" className={`bg-gradient-to-r ${option.gradient} text-white border-none`}>
                          Popular
                        </Badge>
                      </div>
                      <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                        {option.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-0 mb-6">
                      <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
                        {option.details}
                      </p>
                      
                      {/* Benefits Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {option.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-0">
                      <div className="w-full space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-white/20">
                          <span className="text-sm font-medium text-primary">Ready to start?</span>
                          <Button size="sm" className={`bg-gradient-to-r ${option.gradient} hover:shadow-lg text-white rounded-full transition-all duration-300 hover:scale-105`}>
                            <span>Get Started</span>
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-24 py-20 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl rounded-3xl border border-white/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
            <div className="relative z-10 container max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold text-primary mb-6">
                  What Our Community Says
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hear from the passionate individuals who make our mission possible
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="group relative bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full p-1">
                            <div className="w-full h-full bg-white rounded-full" />
                          </div>
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="relative z-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary">{testimonial.name}</h4>
                          <p className="text-sm text-accent">{testimonial.role}</p>
                        </div>
                      </div>
                      <blockquote className="text-muted-foreground italic leading-relaxed group-hover:text-foreground transition-colors duration-300">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact-section" className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl shadow-2xl scroll-mt-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.2),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(120,119,198,0.1),transparent_70%)]" />
            
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-8 backdrop-blur-sm">
                  <Mail className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-primary">Get In Touch</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    Connect With APSAD
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                  Whether you have questions about our projects in Lebanon, wish to explore involvement opportunities, or simply want to share your thoughts on heritage preservation, we are eager to hear from you.
                </p>
                
                {/* Quick Contact Options */}
                <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/90 transition-all duration-300 group">
                    <Mail className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-medium text-primary">Email Us</p>
                    <p className="text-xs text-muted-foreground">Quick response</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/90 transition-all duration-300 group">
                    <Globe className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-medium text-primary">Visit Us</p>
                    <p className="text-xs text-muted-foreground">Beirut office</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/90 transition-all duration-300 group">
                    <Users className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-medium text-primary">Join Events</p>
                    <p className="text-xs text-muted-foreground">Community meetups</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Contact Form Container */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-2 border border-white/40 shadow-2xl">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}