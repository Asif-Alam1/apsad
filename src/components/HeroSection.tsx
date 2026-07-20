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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(26_20%_4%)]">
      {/* Photograph emerging from the dark, drifting against the cursor */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/hero.jpeg"
          alt="Traditional Lebanese stone villa above the Mediterranean at dusk"
          fill
          style={{ objectFit: 'cover' }}
          className="animate-ken-burns"
          priority
        />
        <div className="absolute inset-0 bg-[hsla(26,20%,4%,0.62)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsla(26,20%,4%,0.85)] via-transparent to-[hsl(26_20%_6%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsla(26,20%,4%,0.5)] via-transparent to-[hsla(26,20%,4%,0.5)]" />
      </div>

      {/* Engraved title block */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20 will-change-transform">
        <p
          className="font-display text-[11px] sm:text-[12px] uppercase tracking-[0.42em] text-[hsl(38_52%_63%)] mb-10"
          style={reveal(loaded, 0.2)}
        >
          Beirut · Founded 1960
        </p>

        {loaded ? (
          <CharReveal
            as="h1"
            className="font-display uppercase text-[hsl(40_30%_93%)] tracking-[0.06em] leading-[1.04] mb-8 text-[clamp(2.25rem,6.5vw,5.5rem)]"
            delay={250}
            stagger={34}
          >
            Guardians of a Vanishing Lebanon
          </CharReveal>
        ) : (
          <h1 className="font-display uppercase opacity-0 tracking-[0.06em] leading-[1.04] mb-8 text-[clamp(2.25rem,6.5vw,5.5rem)]">
            Guardians of a Vanishing Lebanon
          </h1>
        )}

        <div
          className="h-px bg-[hsl(38_52%_63%)]/60 mx-auto mb-8"
          style={{
            width: loaded ? '5rem' : '0',
            transition: `width 0.9s ${ease} 1.2s`,
          }}
        />

        <p
          className="text-lg md:text-xl text-[hsla(40,25%,88%,0.92)] max-w-2xl mx-auto mb-12 leading-relaxed"
          style={reveal(loaded, 1.4)}
        >
          For sixty-five years, APSAD has stood between Lebanon&apos;s
          architectural treasures and their disappearance — restoring,
          documenting, and defending the places that hold our memory.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={reveal(loaded, 1.65)}
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
          transition: `opacity 0.8s ${ease} 2.2s`,
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
