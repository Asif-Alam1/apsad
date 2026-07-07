'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(26_20%_4%)]">
      {/* Photograph emerging from the dark */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpeg"
          alt="A traditional stone villa above the Lebanese coast at golden hour"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.52) saturate(0.88)' }}
          className="animate-ken-burns"
          priority
        />
        {/* Nocturne treatment: the image glows out of blackness */}
        <div className="absolute inset-0 bg-[hsla(26,20%,4%,0.38)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsla(26,20%,4%,0.85)] via-transparent to-[hsl(26_20%_6%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsla(26,20%,4%,0.5)] via-transparent to-[hsla(26,20%,4%,0.5)]" />
      </div>

      {/* Engraved title block */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        <p
          className="font-display text-[11px] sm:text-[12px] uppercase tracking-[0.42em] text-[hsl(38_52%_63%)] mb-10"
          style={reveal(loaded, 0.3)}
        >
          Beirut · Founded 1960
        </p>

        <h1
          className="font-display uppercase text-[hsl(40_30%_93%)] tracking-[0.06em] leading-[1.04] mb-8"
          style={{
            fontSize: 'clamp(2.25rem, 6.5vw, 5.5rem)',
            ...reveal(loaded, 0.5, 30),
          }}
        >
          Guardians of a<br />
          Vanishing Lebanon
        </h1>

        <div
          className="h-px bg-[hsla(38,52%,63%,0.6)] mx-auto mb-8"
          style={{
            width: loaded ? '5rem' : '0',
            transition: `width 0.9s ${ease} 0.9s`,
          }}
        />

        <p
          className="text-lg md:text-xl text-[hsla(40,25%,88%,0.92)] max-w-2xl mx-auto mb-12 leading-relaxed"
          style={reveal(loaded, 1.0)}
        >
          For sixty-five years, APSAD has stood between Lebanon&apos;s
          architectural treasures and their disappearance — restoring,
          documenting, and defending the places that hold our memory.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={reveal(loaded, 1.25)}
        >
          <Magnetic>
            <Button
              asChild
              className="bg-[hsl(38_52%_63%)] hover:bg-[hsl(38_52%_70%)] text-[hsl(26_20%_7%)] h-[52px] min-w-[220px] font-display text-[12px] tracking-[0.25em] uppercase"
            >
              <Link href="/get-involved">Become a Guardian</Link>
            </Button>
          </Magnetic>

          <Magnetic>
            <Button
              asChild
              variant="outline"
              className="border-[hsla(40,25%,85%,0.35)] bg-transparent text-[hsl(40_25%_90%)] hover:bg-[hsla(40,25%,90%,0.1)] hover:text-[hsl(40_25%_95%)] h-[52px] min-w-[220px] font-display text-[12px] tracking-[0.25em] uppercase"
            >
              <Link href="/gallery">Enter the Sites</Link>
            </Button>
          </Magnetic>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{
          opacity: loaded ? 1 : 0,
          transition: `opacity 0.8s ${ease} 2s`,
        }}
        aria-hidden="true"
      >
        <span className="font-display text-[10px] uppercase tracking-[0.35em] text-[hsla(40,25%,85%,0.6)]">
          The Record
        </span>
        <div
          className="w-px h-10 bg-gradient-to-b from-[hsl(38_52%_63%)] to-transparent"
          style={{ animation: 'gold-pulse 2.4s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
}
