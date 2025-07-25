'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, Home, Image, Heart, X, Globe, Zap, Star } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Globe },
  { href: '/gallery', label: 'Our Work', icon: Image },
  { href: '/get-involved', label: 'Get Involved', icon: Heart },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const headerClasses = `fixed top-0 z-50 w-full transition-all duration-700 ${
    scrolled ? 'py-2' : 'py-4'
  }`;

  const backgroundClasses = `absolute inset-0 transition-all duration-700 ${
    scrolled 
      ? 'bg-white/80 backdrop-blur-xl shadow-2xl' 
      : 'bg-white/60 backdrop-blur-md'
  }`;

  return (
    <header className={headerClasses}>
      {/* Advanced Glassmorphism Background */}
      <div className={backgroundClasses}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50" />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-1/3 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>
      
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between relative z-10 px-6">
        {/* Enhanced Logo Section */}
        <Link 
          href="/" 
          className="group flex items-center gap-4 transition-all duration-500 hover:scale-105"
          onMouseEnter={() => setHoveredItem('logo')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="relative">
            {/* Logo Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-150" />
            
            {/* Logo Container */}
            <div className="relative bg-white rounded-full p-2 shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <Logo className="h-14 w-14 text-blue-600 group-hover:text-purple-600 transition-colors duration-500 group-hover:rotate-12" />
            </div>
            
            {/* Orbiting Dots */}
            <div className="absolute inset-0 group-hover:animate-spin">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 120}deg) translateX(30px) translateY(-50%)`,
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="hidden sm:block">
            <div className="text-2xl font-bold relative overflow-hidden">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                APSAD
              </span>
            </div>
            <div className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors duration-300 font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3 animate-pulse" />
              Heritage Preservation
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
          {navItems.map((item) => {
            const isActive = activeLink === item.href;
            const isHovered = hoveredItem === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Background Animation */}
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 scale-100'
                    : 'bg-white/0 scale-90 group-hover:bg-white/80 group-hover:scale-100'
                }`} />
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" />
                  </div>
                )}
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                  <item.icon className={`h-4 w-4 transition-all duration-500 ${
                    isHovered ? 'scale-110 rotate-12' : ''
                  }`} />
                  <span>{item.label}</span>
                  
                  {/* Hover Particles */}
                  {isHovered && (
                    <div className="absolute -top-1 -right-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-purple-500 rounded-full animate-bounce"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            transform: `rotate(${i * 120}deg) translateX(10px)`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
          
          {/* Advanced CTA Button */}
          <div className="ml-6">
            <Button 
              asChild 
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-8 py-2.5 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <Link href="/get-involved" className="relative z-10 flex items-center gap-2">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Sparkles className="h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />
                <span className="font-semibold hidden xl:inline">Support Us</span>
                <span className="font-semibold xl:hidden">Join</span>
                <Zap className="h-4 w-4 text-yellow-300 animate-pulse" />
              </Link>
            </Button>
          </div>
        </nav>

        {/* Enhanced Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative group bg-white/60 backdrop-blur-md rounded-full transition-all duration-500 hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />
                <Menu className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-80 p-0 border-0 bg-white/95 backdrop-blur-xl"
            >
              {/* Mobile Menu Header */}
              <div className="relative p-6 pb-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <Logo className="h-10 w-10 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          APSAD
                        </div>
                        <div className="text-xs text-gray-600">Heritage Preservation</div>
                      </div>
                    </Link>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full hover:bg-white/20 transition-all duration-300"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      Since 1960
                    </div>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
                      <Globe className="h-3 w-3 text-blue-600" />
                      Lebanon
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <nav className="p-6 space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-lg font-medium group-hover:text-blue-600 transition-colors duration-300">
                      {item.label}
                    </span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    </div>
                  </Link>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-6">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl py-6 shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    <Link href="/get-involved" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3">
                      <Heart className="h-5 w-5 animate-pulse" />
                      <span className="font-bold text-lg">Join Our Mission</span>
                      <Sparkles className="h-5 w-5 animate-bounce" />
                    </Link>
                  </Button>
                </div>
              </nav>
              
              {/* Mobile Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Preserving Lebanon&apos;s Heritage
                  </p>
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}