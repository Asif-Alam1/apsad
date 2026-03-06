'use client'

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpeg"
          alt="Panoramic view of a significant historical site in Lebanon"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-[13px] uppercase tracking-[0.35em] text-white/60 mb-8 font-medium">
          Preserving Heritage Since 1960
        </p>

        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 leading-[0.9]">
          APSAD
        </h1>

        <div className="w-12 h-px bg-white/40 mx-auto mb-6" />

        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
          Protecting Lebanon&apos;s Cultural &amp; Natural Heritage
        </p>

        <p className="text-sm text-white/50 max-w-lg mx-auto mb-12 leading-relaxed">
          Association for the Protection of Natural Sites and Old Buildings &mdash;
          safeguarding irreplaceable treasures for future generations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-[13px] tracking-[0.15em] uppercase"
          >
            <Link href="/gallery">Explore Our Work</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-[13px] tracking-[0.15em] uppercase"
          >
            <Link href="/get-involved" className="flex items-center gap-2">
              Get Involved
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
