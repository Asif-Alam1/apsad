'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { History, Shield, Users, Target, Trophy, Globe, Sparkles, Zap } from "lucide-react";
import { useInView } from 'react-intersection-observer';

const stats = [
  { 
    number: 60, 
    suffix: "+", 
    label: "Years of Heritage Protection", 
    icon: History,
    color: "from-blue-500 to-cyan-500",
    delay: 0
  },
  { 
    number: 150, 
    suffix: "+", 
    label: "Sites Preserved", 
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  { 
    number: 500, 
    suffix: "+", 
    label: "Community Members", 
    icon: Users,
    color: "from-green-500 to-emerald-500",
    delay: 0.4
  },
  { 
    number: 25, 
    suffix: "+", 
    label: "Active Projects", 
    icon: Target,
    color: "from-orange-500 to-red-500",
    delay: 0.6
  },
];

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = "", duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [end, duration, inView]);
  
  return (
    <div ref={ref} className="relative">
      <span className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
        {count}{suffix}
      </span>
    </div>
  );
}

export function StatsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Parallax Grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.5' opacity='0.05'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Animated Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20 mb-6 group hover:scale-105 transition-transform duration-500">
            <Trophy className="h-4 w-4 text-purple-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-600">Our Impact</span>
            <Sparkles className="h-4 w-4 text-blue-600 animate-bounce" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Six Decades of Excellence
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Measurable impact in preserving Lebanon&apos;s invaluable heritage
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-700 hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animationDelay: `${stat.delay}s`,
                transform: hoveredIndex === index ? 'perspective(1000px) rotateY(5deg) rotateX(-5deg)' : 'none'
              }}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl" />
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
              
              {/* 3D Effect Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl rounded-3xl" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-2 right-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-br ${stat.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700`}
                    style={{
                      animation: hoveredIndex === index ? 'bounce 2s ease-in-out infinite' : 'none',
                      animationDelay: `${i * 0.2}s`,
                      transform: `rotate(${i * 120}deg) translateX(${10 + i * 5}px)`
                    }}
                  />
                ))}
              </div>
              
              <CardContent className="p-8 text-center relative z-10">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-12`}>
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Icon Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 scale-150`} />
                  
                  {/* Orbiting Dots */}
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 animate-spin">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full shadow-lg"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${i * 120}deg) translateX(40px) translateY(-50%)`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Number Counter */}
                <div className="mb-3">
                  <CountUp end={stat.number} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <div className="text-sm text-gray-600 font-medium leading-tight group-hover:text-gray-900 transition-colors duration-500">
                  {stat.label}
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000`}
                    style={{ transitionDelay: hoveredIndex === index ? '200ms' : '0ms' }}
                  />
                </div>
              </CardContent>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-pulse" />
              </div>
              
              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-3xl transform translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700`} />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur-md border border-white/20 hover:scale-105 transition-all duration-500 cursor-pointer group">
            <Globe className="h-5 w-5 text-blue-600 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-sm font-medium text-blue-600">
              Join our growing community
            </span>
            <Zap className="h-5 w-5 text-purple-600 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}