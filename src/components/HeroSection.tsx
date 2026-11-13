'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { CharReveal } from "@/components/ui/char-reveal";
import { DONE_EVENT, isPreloaderRunning } from "@/components/ui/preloader";

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
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Entrance holds until the preloader curtain lifts */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setLoaded(true);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const start = () => { t = setTimeout(() => setLoaded(true), 100); };

    // No curtain this load (revisit within session) — enter right away.
    if (!isPreloaderRunning()) {
      start();
      return () => clearTimeout(t);
    }

    window.addEventListener(DONE_EVENT, start, { once: true });
    // safety net in case the curtain never lifts
    const fallback = setTimeout(() => setLoaded(true), 3600);
    return () => {
      window.removeEventListener(DONE_EVENT, start);
      clearTimeout(t);
      clearTimeout(fallback);
    };
  }, []);

  /* Pointer parallax — the photograph drifts against the type */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let frame: number;
    const animate = () => {
      pos.x += (target.x - pos.x) * 0.06;
      pos.y += (target.y - pos.y) * 0.06;
      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(${pos.x * -14}px, ${pos.y * -10}px, 0) scale(1.06)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${pos.x * 7}px, ${pos.y * 5}px, 0)`;
      }
      frame = requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-[hsl(26_20%_4%)]">
      {/* Photograph emerging from the dark, drifting against the cursor */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/hero.jpeg"
          alt="Traditional Lebanese stone villa above the Mediterranean at dusk"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '70% 50%' }}
          className="animate-ken-burns"
          priority
        />
        <div className="absolute inset-0 bg-[hsla(26,20%,4%,0.42)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsla(26,20%,4%,0.8)] via-transparent to-[hsl(26_20%_5%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsla(26,20%,4%,0.86)] via-[hsla(26,20%,4%,0.42)] to-transparent" />
      </div>

      {/* Engraved title block — set low and left, like a lintel inscription */}
      <div
        ref={contentRef}
        className="relative z-10 w-full container max-w-7xl mx-auto px-6 pt-36 pb-32 md:pb-36 will-change-transform"
      >
        <p
          className="font-display text-[11px] sm:text-[12px] uppercase tracking-[0.42em] text-[hsl(38_52%_63%)] mb-8 md:mb-10"
          style={reveal(loaded, 0.2)}
        >
          Beirut · Founded 1960
        </p>

        {loaded ? (
          <CharReveal
            as="h1"
            className="font-display uppercase text-[hsl(40_30%_93%)] tracking-[0.04em] leading-[0.98] max-w-[13ch] text-[clamp(2.75rem,8.6vw,8rem)]"
            delay={250}
            stagger={34}
          >
            Guardians of a Vanishing Lebanon
          </CharReveal>
        ) : (
          <h1 className="font-display uppercase opacity-0 tracking-[0.04em] leading-[0.98] max-w-[13ch] text-[clamp(2.75rem,8.6vw,8rem)]">
            Guardians of a Vanishing Lebanon
          </h1>
        )}

        <div
          className="h-px bg-[hsla(38,52%,63%,0.55)] mt-10 md:mt-14 mb-8 origin-left"
          style={{
            transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 1.4s ${ease} 1.1s`,
          }}
        />

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
          <p
            className="lg:col-span-6 text-lg md:text-xl text-[hsla(40,25%,88%,0.92)] max-w-[46ch] leading-[1.6]"
            style={reveal(loaded, 1.4)}
          >
            For sixty-five years, APSAD has stood between Lebanon&apos;s
            architectural treasures and their disappearance — restoring,
            documenting, and defending the places that hold our memory.
          </p>

          <div
            className="lg:col-span-6 flex flex-col sm:flex-row gap-4 lg:justify-end"
            style={reveal(loaded, 1.65)}
          >
            <Magnetic>
              <Button
                asChild
                className="bg-[hsl(38_52%_63%)] hover:bg-[hsl(38_52%_70%)] text-[hsl(26_20%_7%)] h-[52px] w-full sm:w-auto min-w-[220px] font-display text-[12px] tracking-[0.25em] uppercase"
              >
                <Link href="/get-involved">Become a Guardian</Link>
              </Button>
            </Magnetic>

            <Magnetic>
              <Button
                asChild
                variant="outline"
                className="border-[hsla(40,25%,85%,0.35)] bg-transparent text-[hsl(40_25%_90%)] hover:bg-[hsla(40,25%,90%,0.1)] hover:text-[hsl(40_25%_95%)] h-[52px] w-full sm:w-auto min-w-[220px] font-display text-[12px] tracking-[0.25em] uppercase"
              >
                <Link href="/gallery">Enter the Sites</Link>
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Colophon strip */}
      <div
        className="absolute bottom-0 inset-x-0 z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: `opacity 0.8s ${ease} 2.2s`,
        }}
        aria-hidden="true"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <div className="border-t border-[hsla(40,25%,85%,0.16)] py-5 flex items-center justify-between gap-6 font-display text-[10px] uppercase tracking-[0.35em] text-[hsla(40,25%,85%,0.7)]">
            <span className="hidden sm:inline">Sursock Street · Achrafieh</span>
            <span className="flex items-center gap-4 whitespace-nowrap">
              <span
                className="h-px w-10 bg-[hsl(38_52%_63%)]"
                style={{ animation: 'gold-pulse 2.4s ease-in-out infinite' }}
              />
              Scroll — The Record
            </span>
            <span className="hidden sm:inline">Depuis 1960</span>
          </div>
        </div>
      </div>
    </section>
  );
}
