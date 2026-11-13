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
    focus: "100% 30%",
    bio: "Presiding over the association's restorations, campaigns, and partnerships — from the Zaki Nassif Museum to the defense of Beirut's old houses.",
  },
  {
    name: "Costa Doumani",
    title: "Director of Operations",
    imageUrl: "/Costa.jpg",
    focus: "center",
    bio: "Orchestrating field operations and sustaining the work of the regional sections across Lebanon.",
  },
  {
    name: "Yasmine Makaroun",
    title: "Architect & Conservation Specialist",
    imageUrl: "/yasmine.jpeg",
    focus: "center",
    bio: "The architect behind the study that turned Zaki Nassif's family house into a museum, cultural centre, and music school.",
  },
];

const two = (n: number) => String(n).padStart(2, "0");

export function TeamSection() {
  return (
    <section className="py-[clamp(6rem,10vw,9rem)] border-b border-border">
      <div className="container max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-x-8 gap-y-6 items-end mb-[clamp(3rem,6vw,5rem)]">
            <div className="md:col-span-7">
              <p className="font-display text-[11px] uppercase tracking-[0.36em] text-primary mb-6">
                Leadership
              </p>
              <SplitText
                as="h2"
                className="font-display uppercase tracking-[0.03em] text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]"
              >
                The Executive
              </SplitText>
            </div>
            <p className="md:col-span-5 font-body italic text-[18px] md:text-[19px] leading-[1.55] text-muted-foreground max-w-[40ch]">
              Twelve committee members are elected by the general assembly;
              these are among the hands that carry the work.
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-3 border-y border-border">
          {teamMembers.map((member, index) => (
            <li
              key={member.name}
              className={`py-10 md:py-12 ${
                index > 0
                  ? "border-t md:border-t-0 md:border-l border-border md:pl-8 lg:pl-10"
                  : ""
              } ${index < teamMembers.length - 1 ? "md:pr-8 lg:pr-10" : ""}`}
            >
              <Reveal delay={index * 150}>
                <figure className="plate-hover group grid grid-cols-[auto_1fr] md:grid-cols-1 gap-x-6 gap-y-7 items-start">
                  <div className="w-[128px] sm:w-[168px] md:w-[184px] border border-border p-2 md:p-2.5">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                      <Image
                        src={member.imageUrl}
                        alt={`${member.name}, ${member.title} at APSAD`}
                        fill
                        style={{ objectFit: "cover", objectPosition: member.focus ?? "center" }}
                        sizes="184px"
                        className="plate group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>

                  <figcaption>
                    <p className="font-display text-[11px] tracking-[0.3em] text-muted-foreground tabular-nums mb-4">
                      {two(index + 1)}
                    </p>
                    <h3 className="font-display text-[1.45rem] leading-[1.2] tracking-[0.03em] mb-2">
                      {member.name}
                    </h3>
                    <p className="font-display text-primary text-[11px] uppercase tracking-[0.3em] leading-relaxed mb-4">
                      {member.title}
                    </p>
                    <p className="text-[17px] leading-relaxed text-muted-foreground max-w-[38ch]">
                      {member.bio}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
