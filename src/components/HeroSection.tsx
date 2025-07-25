'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Star, Globe, Shield, Heart, Zap } from "lucide-react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Split text animation
  const splitText = (text: string) => {
    return text.split('').map((char: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
      <span
        key={index}
        className="inline-block"
        style={{
          animationDelay: `${index * 0.03}s`,
          animation: 'slide-up-fade 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };
  
  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced Background Layers */}
      <div className="absolute inset-0">
        {/* Base Image Layer */}
        <div className="absolute inset-0">
          <Image
            src="/hero.jpeg"
            alt="Panoramic view of a significant historical site in Lebanon"
            fill
            style={{ objectFit: "cover" }}
            className="scale-110"
            priority
          />
        </div>
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Aurora Effect */}
        <div className="absolute inset-0 aurora-bg opacity-30" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-advanced ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 text-center text-white px-6 max-w-6xl mx-auto ${isLoaded ? 'animate-slide-up-fade' : 'opacity-0'}`}>
        {/* Animated Badge */}
        <div className="mb-8 transform transition-all duration-1000 ease-out">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-gradient backdrop-blur-xl border border-white/20 group hover:scale-105 transition-all duration-500 cursor-pointer">
            <div className="relative">
              <Sparkles className="h-5 w-5 text-accent animate-pulse" />
              <div className="absolute inset-0 blur-lg bg-accent/50 animate-pulse" />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Preserving Heritage Since 1960
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 h-1 bg-accent rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Title with Advanced Animation */}
        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
          <span className="block transform transition-all duration-1000 ease-out mb-6">
            <span className="text-gradient-animate text-transparent">
              {splitText('APSAD')}
            </span>
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 font-light">
            <span className="inline-block animate-reveal-text">Protecting Lebanon's</span>
            <span className="inline-block text-accent font-semibold ml-3 animate-pulse-glow">Heritage</span>
          </span>
        </h1>

        {/* Animated Description */}
        <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-white/90">
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Association for the Protection of Natural Sites and Old Buildings in Lebanon.
          </span>
          <span className="inline-block text-accent font-medium animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            {' '}Join us in our mission
          </span>
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            {' '}to safeguard these irreplaceable treasures for future generations.
          </span>
        </p>

        {/* Advanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            asChild 
            size="lg" 
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-yellow-500 px-10 py-6 text-lg rounded-full shadow-2xl transition-all duration-500 hover:scale-105 neon-border"
          >
            <Link href="/gallery" className="relative z-10 flex items-center gap-3">
              <Globe className="h-6 w-6 group-hover:rotate-180 transition-transform duration-700" />
              <span className="font-semibold">Explore Our Work</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="group relative overflow-hidden glass-gradient border-white/30 text-white hover:bg-white/20 backdrop-blur-xl px-10 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105"
          >
            <Link href="/get-involved" className="relative z-10 flex items-center gap-3">
              <Heart className="h-6 w-6 group-hover:scale-125 text-red-400 transition-transform duration-300" />
              <span className="font-semibold text-green-800">Get Involved</span>
              <Zap className="h-5 w-5 text-yellow-400 group-hover:animate-pulse" />
            </Link>
          </Button>
        </div>

        {/* Interactive Stats Preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Shield, number: "150+", label: "Sites Protected" },
            { icon: Heart, number: "60+", label: "Years Active" },
            { icon: Globe, number: "25+", label: "UNESCO Projects" },
            { icon: Star, number: "500+", label: "Partners" }
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-gradient backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:scale-105 transition-all duration-500 cursor-pointer group"
              style={{ animationDelay: `${1.2 + index * 0.1}s` }}
            >
              <stat.icon className="h-6 w-6 text-accent mx-auto mb-2 group-hover:animate-rotate-3d" />
              <div className="text-2xl font-bold text-white group-hover:text-gradient-animate">{stat.number}</div>
              <div className="text-xs text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Scroll Indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="relative w-8 h-12 border-2 border-white/30 rounded-full group-hover:border-white/60 transition-all duration-300">
            <div className="absolute left-1/2 top-2 w-1 h-4 bg-white/60 rounded-full -translate-x-1/2 animate-bounce" />
          </div>
          <span className="text-xs uppercase tracking-wider font-medium group-hover:text-white transition-colors duration-300">
            Scroll to Explore
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-1 h-1 bg-white/40 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;