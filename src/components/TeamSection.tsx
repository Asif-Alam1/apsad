'use client'
import React, { useState } from 'react';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Award, Briefcase, Heart, Globe, Sparkles, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Mrs. Raya Daouk",
    title: "President",
    imageUrl: "/Raya.jpg",
    bio: "Leading APSAD with vision and dedication to preserve Lebanon's cultural heritage for future generations. Over 20 years of experience in heritage conservation.",
    expertise: ["Strategic Leadership", "Heritage Policy", "International Relations"],
    social: {
      linkedin: "#",
      email: "raya@apsad.org"
    },
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Mr. Costa Doumani",
    title: "Director of Operations",
    imageUrl: "/Costa.jpg",
    bio: "Orchestrating field operations and ensuring sustainable preservation practices across all APSAD projects with expertise in project management.",
    expertise: ["Operations Management", "Field Coordination", "Sustainability"],
    social: {
      linkedin: "#",
      email: "costa@apsad.org"
    },
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Dr. Yasmine Makaroun",
    title: "Chief Architect & Conservation Specialist",
    imageUrl: "/yasmine.jpeg",
    bio: "Bringing architectural expertise and innovative conservation techniques to Lebanon's most precious heritage sites with a PhD in Heritage Architecture.",
    expertise: ["Architecture", "Conservation Science", "Digital Heritage"],
    social: {
      linkedin: "#",
      email: "yasmine@apsad.org"
    },
    gradient: "from-green-500 to-emerald-500"
  },
];

interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
  expertise: string[];
  social: {
    linkedin: string;
    email: string;
  };
  gradient: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative h-[550px] group"
      style={{
        perspective: '1000px',
        animationDelay: `${index * 0.2}s`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 transition-all duration-700 cursor-pointer ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        style={{
          transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <Card 
          className="absolute inset-0 rounded-3xl overflow-hidden [backface-visibility:hidden]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl" />
          <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
          
          {/* Animated Background Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse" />
          
          {/* Profile Image */}
          <div className="relative h-60 overflow-hidden">
            <Image
              src={member.imageUrl}
              alt={`${member.name}, ${member.title} at APSAD`}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className={`bg-gradient-to-r ${member.gradient} text-white border-0 px-3 py-1 text-xs mb-2`}>
                <Award className="h-3 w-3 mr-1" />
                {member.title}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6 relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              {member.name}
            </h3>
            
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {member.bio}
            </p>
            
            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {member.expertise.map((skill, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className="text-xs bg-white/60 backdrop-blur-sm border-white/30"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            
            {/* Flip Indicator */}
            <div className="flex items-center justify-center">
              <div className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 text-xs font-medium flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="h-3 w-3 text-blue-600 animate-pulse" />
                <span>Click to view contact</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back of Card */}
        <Card 
          className="absolute inset-0 rounded-3xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-90`} />
          <div 
            className="absolute inset-0 opacity-30" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          {/* Floating Elements */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${10 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
          
          <CardContent className="p-8 h-full flex flex-col justify-center items-center text-white text-center relative z-10">
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Globe className={`h-5 w-5 text-transparent bg-gradient-to-r ${member.gradient} bg-clip-text`} />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
            <p className="text-white/80 mb-6">{member.title}</p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href={`mailto:${member.social.email}`}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">{member.social.email}</span>
              </a>
              
              <a 
                href={member.social.linkedin}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">Connect on LinkedIn</span>
              </a>
            </div>
            
            {/* Quote */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <p className="text-sm italic">
                &quot;Preserving heritage is not just about the past, it&apos;s about building a foundation for the future.&quot;
              </p>
            </div>
            
            {/* Back to Front Indicator */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium flex items-center justify-center gap-2">
                <span>Click to flip back</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50/50 to-blue-50/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur-md border border-white/20 mb-8 hover:scale-105 transition-transform duration-500">
            <Users className="h-5 w-5 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-600">Meet Our Leaders</span>
            <Heart className="h-5 w-5 text-purple-600 animate-bounce" />
          </div>
          
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Leadership Team
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated professionals united by a shared passion for preserving Lebanon&apos;s invaluable heritage
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Additional Team Info */}
        <div className="text-center">
          <Card className="inline-block bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/30">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-blue-600">Join Our Team</h3>
                  <p className="text-sm text-gray-600">Be part of something meaningful</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                APSAD is always looking for passionate individuals who share our commitment to heritage preservation.
              </p>
              
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-8 hover:scale-105 transition-transform duration-300">
                <Heart className="h-4 w-4 mr-2" />
                Explore Opportunities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}