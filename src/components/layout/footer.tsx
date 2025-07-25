'use client'
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, Globe, Heart, Star, ArrowUp, Sparkles } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home', icon: Globe },
  { href: '/gallery', label: 'Our Work', icon: Star },
  { href: '/get-involved', label: 'Get Involved', icon: Heart },
];

const socialLinks = [
  { 
    href: "https://www.facebook.com/apsad.lebanon/", 
    icon: Facebook, 
    label: "Facebook",
    color: "hover:text-blue-600",
    bgColor: "hover:bg-blue-50"
  },
  { 
    href: "https://www.instagram.com/apsad_lebanon/", 
    icon: Instagram, 
    label: "Instagram",
    color: "hover:text-pink-600",
    bgColor: "hover:bg-pink-50"
  },
];

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Achrafieh, Sursock Street, Aoun Building, Ground Floor, Beirut, Lebanon",
    link: "https://maps.google.com"
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@apsad.org",
    link: "mailto:info@apsad.org"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+961-1-XXXXXX",
    link: "tel:+9611XXXXXX"
  }
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-secondary/20 via-background to-primary/10 border-t border-white/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full -translate-y-16 animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full translate-y-12 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="container max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
              
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-8">
                <Link href="/" className="group inline-block" aria-label="APSAD Home">
                  <div className="flex items-center gap-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-full bg-white rounded-full" />
                      </div>
                      <Logo className="relative z-10 h-16 w-16 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-300">
                        APSAD
                      </div>
                      <div className="text-sm text-muted-foreground group-hover:text-accent transition-colors duration-300 font-medium">
                        Heritage Preservation Since 1960
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    Dedicated to the identification, protection, conservation, and promotion of Lebanon's rich cultural and natural heritage.
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground/80 italic">
                      Association pour la Protection des Sites et Anciennes Demeures
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                        <Star className="h-3 w-3 mr-1" />
                        UNESCO Partner
                      </Badge>
                      <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Heritage Leader
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary">Connect With Us</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className={`group relative p-3 rounded-full bg-white/70 backdrop-blur-sm border border-white/30 hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.bgColor}`}
                      >
                        <social.icon className={`h-5 w-5 text-muted-foreground ${social.color} transition-colors duration-300`} />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  Quick Links
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 p-2 rounded-lg hover:bg-white/50 backdrop-blur-sm"
                      >
                        <div className="p-1 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                          <link.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                  
                  {/* Newsletter Signup */}
                  <li className="pt-4">
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-white/20">
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Stay Updated
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get heritage news and updates
                      </p>
                      <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full">
                        Subscribe to Newsletter
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Contact Info
                </h3>
                <ul className="space-y-6">
                  {contactInfo.map((contact, index) => (
                    <li key={index}>
                      <Link 
                        href={contact.link}
                        className="group block p-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors duration-300">
                            <contact.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-primary mb-1">{contact.label}</p>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                              {contact.value}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="p-1 bg-gradient-to-r from-primary to-accent rounded-xl">
                  <Button asChild className="w-full bg-white/90 hover:bg-white text-primary hover:text-accent rounded-lg font-semibold transition-all duration-300">
                    <Link href="/get-involved" className="flex items-center justify-center gap-2">
                      <Heart className="h-4 w-4" />
                      Join Our Mission
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-white/30 backdrop-blur-sm">
          <div className="container max-w-screen-xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} APSAD. All rights reserved.</p>
                <Separator orientation="vertical" className="hidden sm:block h-4" />
                <p className="flex items-center gap-2">
                  <span>Preserving Heritage, Shaping Futures</span>
                  <Heart className="h-3 w-3 text-red-500" />
                </p>
              </div>
              
              {/* Scroll to Top Button */}
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="group bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 rounded-full transition-all duration-300 hover:scale-105"
              >
                <ArrowUp className="h-4 w-4 mr-2 group-hover:-translate-y-1 transition-transform duration-300" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}