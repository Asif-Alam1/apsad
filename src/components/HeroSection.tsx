'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

function reveal(loaded: boolean, delayS: number, y = 20) {
  return {
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : `translateY(${y}px)`,
    transition: `opacity 0.8s ${ease} ${delayS}s, transform 0.8s ${ease} ${delayS}s`,
  } as React.CSSProperties;
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setLoaded(true);
      return;
    }
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpeg"
          alt="Panoramic view of a significant historical site in Lebanon"
          fill
          style={{ objectFit: "cover" }}
          className="animate-ken-burns"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Staggered content entrance */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p
          className="text-[13px] uppercase tracking-[0.35em] text-white/60 mb-8 font-medium"
          style={reveal(loaded, 0.3)}
        >
          Preserving Heritage Since 1960
        </p>

        <h1
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 leading-[0.9]"
          style={reveal(loaded, 0.5, 30)}
        >
          APSAD
        </h1>

        <div
          className="h-px bg-white/40 mx-auto mb-6"
          style={{
            width: loaded ? '3rem' : '0',
            transition: `width 0.8s ${ease} 0.8s`,
          }}
        />

        <p
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed"
          style={reveal(loaded, 1.0)}
        >
          Protecting Lebanon&apos;s Cultural &amp; Natural Heritage
        </p>

        <p
          className="text-sm text-white/50 max-w-lg mx-auto mb-12 leading-relaxed"
          style={reveal(loaded, 1.1)}
        >
          Association for the Protection of Natural Sites and Old Buildings &mdash;
          safeguarding irreplaceable treasures for future generations.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={reveal(loaded, 1.3)}
        >
          <Magnetic>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-[52px] min-w-[220px] text-[13px] tracking-[0.15em] uppercase"
            >
              <Link href="/gallery">Explore Our Work</Link>
            </Button>
          </Magnetic>

          <Magnetic>
            <Button
              asChild
              variant="outline"
              className="border-white/30 text-black hover:bg-white/10 h-[52px] min-w-[220px] text-[13px] tracking-[0.15em] uppercase"
            >
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </Magnetic>
        </div>
      </div>

      {/* Scroll indicator — delayed appearance */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        style={{
          opacity: loaded ? 1 : 0,
          transition: `opacity 0.8s ${ease} 2s`,
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
