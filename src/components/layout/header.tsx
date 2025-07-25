import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, Home, Image, Heart } from 'lucide-react';

const navItems = [
  { href: '/gallery', label: 'Our Work', icon: Image },
  { href: '/get-involved', label: 'Get Involved', icon: Heart },
];

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 animate-pulse" />
        <div className="absolute top-0 right-1/3 w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full -translate-y-12 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between relative z-10">
        {/* Logo Section with Enhanced Animation */}
        <Link href="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105" aria-label="APSAD Home">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full bg-white rounded-full" />
            </div>
            <Logo className="relative z-10 h-16 w-16 text-primary group-hover:text-accent transition-colors duration-300" />
          </div>
          <div className="hidden sm:block">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-300">
              APSAD
            </div>
            <div className="text-xs text-muted-foreground group-hover:text-accent transition-colors duration-300 font-medium">
              Heritage Preservation
            </div>
          </div>
        </Link>

        {/* Desktop Navigation with Enhanced Styling */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link
            href="/"
            className="group relative px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:bg-white/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Home</span>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:bg-white/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 relative z-10">
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>{item.label}</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
          
          {/* Enhanced CTA Button */}
          <div className="ml-4">
            <Button asChild className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="/get-involved" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden lg:inline">Support Us</span>
                <span className="lg:hidden">Join</span>
              </Link>
            </Button>
          </div>
        </nav>

        {/* Enhanced Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative group hover:bg-white/50 backdrop-blur-sm rounded-full transition-all duration-300">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Menu className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border-white/20">
              {/* Mobile Menu Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl" />
                <Link href="/" className="relative z-10 flex items-center gap-3 mb-8 p-4 rounded-2xl group" aria-label="APSAD Home">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full p-1">
                      <div className="w-full h-full bg-white rounded-full" />
                    </div>
                    <Logo className="relative z-10 h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      APSAD
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Heritage Preservation
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="group flex items-center gap-3 p-4 text-lg font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                    <Home className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span>Home</span>
                </Link>
                
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-3 p-4 text-lg font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                      <item.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                {/* Mobile CTA */}
                <div className="mt-6 p-1 bg-gradient-to-r from-primary to-accent rounded-xl">
                  <Link
                    href="/get-involved"
                    className="group flex items-center gap-3 p-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-white/20">
                      <Sparkles className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span>Join Our Mission</span>
                  </Link>
                </div>
              </nav>
              
              {/* Mobile Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-white/20 text-center">
                  <p className="text-sm text-muted-foreground">
                    Preserving Lebanon's Heritage
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Since 1960
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}