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
    ? 'bg-[hsla(26,20%,6%,0.96)] border-b border-[hsl(30_14%_16%)]'
    : 'bg-background/95 border-b border-border';

  return (
    <header
      className={`fixed top-0 z-[40] w-full border-b transition-colors duration-500 ease-[var(--ease-expo)] ${
        scrolled ? `${scrolledBg} backdrop-blur-sm` : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Wordmark */}
        <Link href="/" className={`flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${chromeText}`}>
          <Image src="/logo.png" alt="" width={38} height={38} className="rounded-full" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-[0.18em] -mr-[0.18em]">APSAD</span>
            <span className={`font-display text-[10px] tracking-[0.32em] uppercase mt-1.5 ${nocturne ? 'text-[hsl(38_52%_63%)]' : 'text-accent'}`}>
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
                className={`relative font-display text-[12px] transition-colors duration-500 ease-[var(--ease-expo)] tracking-[0.22em] uppercase group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
                  isActive ? chromeText : chromeMuted
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-700 ease-[var(--ease-expo)] ${
                    nocturne ? 'bg-[hsl(38_52%_63%)]' : 'bg-primary'
                  } ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'}`}
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
                className={`h-11 w-11 hover:bg-transparent ${chromeText} ${nocturne ? 'hover:text-[hsl(40_30%_91%)]' : 'hover:text-foreground'}`}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="section-dark w-full max-w-none sm:max-w-md p-0 border-l border-border"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-7">
                <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary">
                  APSAD · Depuis 1960
                </p>
                <nav className="mt-10 flex flex-col border-t border-border" aria-label="Mobile">
                  {navItems.map((item, i) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`group flex items-baseline gap-6 border-b border-border py-6 transition-colors duration-500 ease-[var(--ease-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                        }`}
                      >
                        <span className="w-7 shrink-0 font-display text-[12px] tabular-nums tracking-[0.2em] text-primary">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-[length:clamp(1.5rem,7.6vw,2rem)] uppercase leading-[1.1] tracking-[0.03em]">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto pt-10">
                  <Button
                    asChild
                    className="h-14 w-full bg-primary font-display text-[12px] uppercase tracking-[0.22em] text-primary-foreground transition-colors duration-500 ease-[var(--ease-expo)] hover:bg-primary/90"
                  >
                    <Link href="/get-involved" onClick={() => setIsOpen(false)}>
                      Become a Member
                    </Link>
                  </Button>
                  <address className="mt-8 border-t border-border pt-6 text-[15px] not-italic leading-relaxed text-muted-foreground">
                    <p>Sursock Street, Aoun Building</p>
                    <p>Achrafieh, Beirut — Lebanon</p>
                    <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                      <a href="tel:+9611336368" className="link-rule hover:text-foreground">
                        +961 1 336 368
                      </a>
                      <a href="mailto:info@apsad.org" className="link-rule hover:text-foreground">
                        info@apsad.org
                      </a>
                    </p>
                  </address>
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
