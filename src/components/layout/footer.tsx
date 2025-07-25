'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, Globe, Heart, Star, ArrowUp, Sparkles, Zap, Send, Award, Users } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home', icon: Globe },
  { href: '/about', label: 'About Us', icon: Star },
  { href: '/gallery', label: 'Our Work', icon: Award },
  { href: '/get-involved', label: 'Get Involved', icon: Heart },
];

const socialLinks = [
  { 
    href: "https://www.facebook.com/apsad.lebanon/", 
    icon: Facebook, 
    label: "Facebook",
    gradient: "from-blue-600 to-blue-700",
    hoverColor: "hover:text-blue-600"
  },
  { 
    href: "https://www.instagram.com/apsad_lebanon/", 
    icon: Instagram, 
    label: "Instagram",
    gradient: "from-pink-600 to-purple-600",
    hoverColor: "hover:text-pink-600"
  },
  { 
    href: "#", 
    icon: Twitter, 
    label: "Twitter",
    gradient: "from-blue-400 to-blue-500",
    hoverColor: "hover:text-blue-400"
  },
  { 
    href: "#", 
    icon: Linkedin, 
    label: "LinkedIn",
    gradient: "from-blue-700 to-blue-800",
    hoverColor: "hover:text-blue-700"
  }
];

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Achrafieh, Sursock Street",
    subValue: "Aoun Building, Beirut, Lebanon",
    link: "https://maps.google.com",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@apsad.org",
    subValue: "24/7 Support",
    link: "mailto:info@apsad.org",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+961-1-XXXXXX",
    subValue: "Mon-Fri 9AM-6PM",
    link: "tel:+9611XXXXXX",
    gradient: "from-blue-500 to-cyan-500"
  }
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubscribe = async () => {
    if (!email) return;
    
    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubscribing(false);
    setEmail('');
    // Show success toast
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-50/30 via-white to-blue-50/20 overflow-hidden">
      {/* Progress Bar */}
      <div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-300"
        style={{ transform: `scaleX(${scrollProgress / 100})` }} 
      />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-purple-100/10" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="container max-w-screen-xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12">
              {/* Background Pattern */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 20h40v20H0V20zm20 10h20v10H20V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
              
              <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Newsletter</span>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay Connected with Heritage News
                </h3>
                
                <p className="text-white/90 mb-8">
                  Get the latest updates on our preservation projects and events
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border-white/30 rounded-full text-white placeholder:text-white/60 focus:bg-white/30 transition-all duration-300"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Zap className="h-5 w-5 text-yellow-300 animate-pulse" />
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleSubscribe}
                    disabled={isSubscribing}
                    className="px-8 py-4 bg-white text-blue-600 hover:bg-white/90 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    {isSubscribing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        <span>Subscribe</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-20">
          <div className="container max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
              
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-8">
                <Link href="/" className="group inline-block">
                  <div className="flex items-center gap-4 group-hover:scale-105 transition-transform duration-500">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                      <div className="relative bg-white rounded-full p-3 shadow-2xl">
                        <Logo className="h-14 w-14 text-blue-600 group-hover:text-purple-600 transition-colors duration-500" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          APSAD
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        Heritage Preservation Since 1960
                      </div>
                    </div>
                  </div>
                </Link>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  Dedicated to the identification, protection, conservation, and promotion of Lebanon&apos;s rich cultural and natural heritage.
                </p>

                {/* Awards & Recognition */}
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/60 backdrop-blur-sm border-blue-500/20 px-4 py-2 rounded-full">
                    <Award className="h-4 w-4 mr-2 text-blue-600" />
                    UNESCO Partner
                  </Badge>
                  <Badge className="bg-white/60 backdrop-blur-sm border-purple-500/20 px-4 py-2 rounded-full">
                    <Users className="h-4 w-4 mr-2 text-purple-600" />
                    500+ Members
                  </Badge>
                  <Badge className="bg-white/60 backdrop-blur-sm border-green-500/20 px-4 py-2 rounded-full">
                    <Star className="h-4 w-4 mr-2 text-green-500" />
                    60+ Years
                  </Badge>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-blue-600">Connect With Us</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="group relative p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-110 overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <social.icon className={`h-5 w-5 text-gray-600 ${social.hoverColor} transition-colors duration-300 relative z-10`} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600 animate-spin" />
                  Quick Links
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-110 transition-transform duration-300">
                          <link.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{link.label}</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowUp className="h-4 w-4 rotate-90" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600 animate-pulse" />
                  Contact Info
                </h3>
                <ul className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <li key={index}>
                      <Link 
                        href={contact.link}
                        className="group block p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-[1.02]"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${contact.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <contact.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-blue-600 text-sm mb-1">{contact.label}</p>
                            <p className="text-gray-900 font-semibold">{contact.value}</p>
                            <p className="text-xs text-gray-600 mt-1">{contact.subValue}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 bg-white/60 backdrop-blur-xl">
          <div className="container max-w-screen-xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  © {new Date().getFullYear()} APSAD. All rights reserved.
                </p>
                <Separator orientation="vertical" className="hidden sm:block h-4 bg-white/20" />
                <p className="flex items-center gap-2">
                  <span>Preserving Heritage, Shaping Futures</span>
                  <Heart className="h-3 w-3 text-red-500 animate-pulse" />
                </p>
              </div>
              
              {/* Advanced Scroll to Top Button */}
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="lg"
                className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-white/30 hover:border-white/50 rounded-full transition-all duration-500 hover:scale-110"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center gap-2 text-gray-700 group-hover:text-white">
                  <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
                  <span className="font-semibold">Back to Top</span>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}