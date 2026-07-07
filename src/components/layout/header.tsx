'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'The Association' },
  { href: '/gallery', label: 'The Sites' },
  { href: '/get-involved', label: 'Get Involved' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  /* Nocturne pages get light chrome; daylight pages get ink chrome */
  const nocturne = pathname === '/' || pathname.startsWith('/gallery');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chromeText = nocturne ? 'text-[hsl(40_30%_91%)]' : 'text-foreground';
  const chromeMuted = nocturne
    ? 'text-[hsl(36_14%_68%)] hover:text-[hsl(40_30%_91%)]'
    : 'text-muted-foreground hover:text-foreground';
  const scrolledBg = nocturne
    ? 'bg-[hsla(26,20%,6%,0.92)] border-b border-[hsl(30_14%_16%)]'
    : 'bg-background/90 border-b border-border';

  return (
    <header
      className={`fixed top-0 z-[40] w-full transition-all duration-500 ${
        scrolled ? `${scrolledBg} backdrop-blur-md` : 'bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Wordmark */}
        <Link href="/" className={`flex items-center gap-3 ${chromeText}`}>
          <Image src="/logo.png" alt="" width={38} height={38} className="rounded-full" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-[0.18em]">APSAD</span>
            <span className={`font-display text-[10px] tracking-[0.32em] uppercase mt-1 ${nocturne ? 'text-[hsl(38_52%_63%)]' : 'text-primary'}`}>
              Depuis 1960
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative font-display text-[12px] transition-colors duration-300 tracking-[0.22em] uppercase group py-2 ${
                  isActive ? chromeText : chromeMuted
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-px transition-[width] duration-300 ease-out ${
                    nocturne ? 'bg-[hsl(38_52%_63%)]' : 'bg-primary'
                  } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            size="sm"
            className={`font-display text-[12px] tracking-[0.22em] uppercase px-6 h-10 transition-colors ${
              nocturne
                ? 'bg-[hsl(38_52%_63%)] text-[hsl(26_20%_7%)] hover:bg-[hsl(38_52%_70%)]'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            <Link href="/get-involved">Become a Member</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${chromeText} hover:bg-transparent hover:${chromeText}`}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="section-dark w-[85vw] max-w-sm p-0 border-l"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col h-full p-8 pt-14">
                <p className="font-display text-[11px] tracking-[0.32em] uppercase text-primary mb-6">
                  APSAD · Depuis 1960
                </p>
                <nav className="flex flex-col" aria-label="Mobile">
                  {navItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`py-5 font-display text-2xl border-b border-border transition-colors ${
                          isActive ? 'text-primary' : 'hover:text-primary'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto pb-8">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display text-[12px] tracking-[0.22em] uppercase h-12"
                  >
                    <Link href="/get-involved" onClick={() => setIsOpen(false)}>
                      Become a Member
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-6 italic">
                    Guardians of Lebanese heritage
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] ${nocturne ? 'bg-[hsl(38_52%_63%)]' : 'bg-primary'}`}
        style={{ width: `${progress * 100}%`, transition: 'none' }}
        aria-hidden="true"
      />
    </header>
  );
}
