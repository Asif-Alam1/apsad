
'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight, Eye, Star, Sparkles, Zap, Award, Users, Calendar, MapPin, TrendingUp } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "Ancient Baalbek Restoration",
    category: "Temple Complex",
    location: "Baalbek, Lebanon",
    year: "2023-2024",
    progress: 75,
    image: "/image-1.jpeg",
    description: "Preserving the magnificent Roman temple complex featuring the Temple of Jupiter.",
    stats: {
      area: "2,500 m²",
      duration: "18 months",
      team: "45 experts"
    },
    gradient: "from-purple-500 to-pink-500",
    tags: ["UNESCO Site", "Roman Heritage", "Active Project"]
  },
  {
    id: 2,
    title: "Byblos Heritage Trail",
    category: "Archaeological Site",
    location: "Byblos, Lebanon",
    year: "2023",
    progress: 90,
    image: "/image-2.jpeg",
    description: "Creating accessible pathways through one of the world's oldest cities.",
    stats: {
      visitors: "250K/year",
      pathways: "3.5 km",
      artifacts: "1,200+"
    },
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Phoenician", "Tourism", "Education"]
  },
  {
    id: 3,
    title: "Community Education Program",
    category: "Youth Initiative",
    location: "Multiple Locations",
    year: "Ongoing",
    progress: 60,
    image: "/image-3.jpeg",
    description: "Engaging young Lebanese in heritage preservation through interactive programs.",
    stats: {
      students: "5,000+",
      schools: "120",
      workshops: "200+"
    },
    gradient: "from-green-500 to-emerald-500",
    tags: ["Education", "Community", "Future Leaders"]
  },
];

function ProjectCard3D({ project, index }:any) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative w-[400px] h-[500px] flex-shrink-0"
      style={{ 
        perspective: '1000px',
        animationDelay: `${index * 0.2}s`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 transition-all duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x + (isFlipped ? 180 : 0)}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <Card className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl" />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
          
          {/* Image Section */}
          <div className="relative h-60 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              className={`transition-all duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Floating Elements */}
            {isHovered && (
              <>
                <div className="absolute top-4 right-4 animate-slide-in-right">
                  <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0 px-3 py-1`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {project.progress}% Complete
                  </Badge>
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div 
                      className={`h-full bg-gradient-to-r ${project.gradient} transition-all duration-1000`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </>
            )}
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="glass-gradient backdrop-blur-md border-white/30 text-white">
                {project.category}
              </Badge>
            </div>
          </div>
          
          {/* Content */}
          <CardContent className="p-6 relative z-10">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                {project.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {project.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.year}
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 line-clamp-2">
              {project.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, i: React.Key | null | undefined) => (
                <Badge key={i} variant="outline" className="text-xs glass-gradient backdrop-blur-sm border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Flip Indicator */}
            <div className="flex items-center justify-center">
              <div className="px-4 py-2 rounded-full glass-gradient backdrop-blur-sm border border-white/30 text-xs font-medium flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <Eye className="h-3 w-3 text-primary" />
                <span>Click for details</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back of Card */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden border-0 shadow-2xl" style={{ transform: 'rotateY(180deg)' }}>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
          
          <CardContent className="p-8 h-full flex flex-col justify-between text-white relative z-10">
            <div>
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/80">{project.description}</p>
              </div>
              
              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(project.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <div className="text-2xl font-bold mb-1">{value}</div>
                    <div className="text-xs text-white/70 capitalize">{key}</div>
                  </div>
                ))}
              </div>
              
              {/* Team Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Project Team
                </h4>
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30" />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-xs font-medium">
                    +40
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-full font-semibold">
                <Award className="h-4 w-4 mr-2" />
                View Full Project
              </Button>
              
              <div className="text-center">
                <span className="text-xs text-white/70">Click to flip back</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function FeaturedProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = ["All", "Temples", "Archaeological", "Community", "Active"];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = 420; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 aurora-bg opacity-20" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-gradient backdrop-blur-md border border-white/20 mb-8 hover:scale-105 transition-transform duration-500">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Featured Projects</span>
              <Star className="h-5 w-5 text-accent animate-float-advanced" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-animate">Transforming Heritage</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              Discover our most impactful preservation initiatives across Lebanon's historical landscape
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 transition-all duration-500 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-xl scale-105"
                      : "glass-gradient backdrop-blur-sm border-white/30 hover:border-white/50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full glass-gradient backdrop-blur-sm border-white/30 shadow-2xl transition-all duration-300 ${
                canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-50'
              }`}
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full glass-gradient backdrop-blur-sm border-white/30 shadow-2xl transition-all duration-300 ${
                canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-50'
              }`}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>

            {/* Projects Container */}
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredProjects.map((project, index) => (
                <ProjectCard3D key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>

          {/* View All Link */}
          <div className="text-center mt-16">
            <Link href="/gallery">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-accent text-white rounded-full px-10 py-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <span className="font-semibold">Explore All Projects</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                <Zap className="h-4 w-4 ml-1 text-yellow-300 animate-pulse" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
