'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Our Work' },
  { href: '/get-involved', label: 'Get Involved' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-background/95 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? 'border-b border-border shadow-sm' : ''
      }`}
    >
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="APSAD" width={40} height={40} className="rounded-full" />
          <span className="font-serif text-xl font-bold tracking-wide">APSAD</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-[0.1em] uppercase group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            size="sm"
            className="bg-foreground hover:bg-foreground/90 text-background text-[13px] tracking-[0.1em] uppercase px-6"
          >
            <Link href="/get-involved">Support Us</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <div className="flex flex-col h-full p-8 pt-12">
                <nav className="flex flex-col">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="py-4 text-base font-medium border-b border-border hover:text-primary transition-colors tracking-wide"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pb-8">
                  <Button
                    asChild
                    className="w-full bg-foreground hover:bg-foreground/90 text-background text-sm tracking-wider uppercase"
                  >
                    <Link href="/get-involved" onClick={() => setIsOpen(false)}>
                      Support Us
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-6">
                    Preserving Heritage Since 1960
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
