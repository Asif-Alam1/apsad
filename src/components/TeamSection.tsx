'use client'

import React from 'react';
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";

const teamMembers = [
  {
    name: "Raya Daouk",
    title: "President",
    imageUrl: "/Raya.jpg",
    bio: "Presiding over the association's restorations, campaigns, and partnerships — from the Zaki Nassif Museum to the defense of Beirut's old houses.",
  },
  {
    name: "Costa Doumani",
    title: "Director of Operations",
    imageUrl: "/Costa.jpg",
    bio: "Orchestrating field operations and sustaining the work of the regional sections across Lebanon.",
  },
  {
    name: "Yasmine Makaroun",
    title: "Architect & Conservation Specialist",
    imageUrl: "/yasmine.jpeg",
    bio: "The architect behind the study that turned Zaki Nassif's family house into a museum, cultural centre, and music school.",
  },
];

export function TeamSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary/60 border-y border-border">
      <div className="container max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
              Leadership
            </p>
            <SplitText
              as="h2"
              className="font-display uppercase tracking-[0.04em] text-4xl md:text-5xl mb-6"
            >
              The Executive
            </SplitText>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Twelve committee members are elected by the general assembly;
              these are among the hands that carry the work.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 150}>
              <div className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={member.imageUrl}
                    alt={`${member.name}, ${member.title} at APSAD`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 90vw, 30vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <h3 className="font-display text-xl tracking-[0.03em] mb-1">{member.name}</h3>
                <p className="font-display text-primary text-[11px] uppercase tracking-[0.25em] mb-3">
                  {member.title}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
