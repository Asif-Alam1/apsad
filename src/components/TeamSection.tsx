'use client'

import React from 'react';
import Image from "next/image";

const teamMembers = [
  {
    name: "Mrs. Raya Daouk",
    title: "President",
    imageUrl: "/Raya.jpg",
    bio: "Leading APSAD with vision and dedication to preserve Lebanon's cultural heritage for future generations.",
  },
  {
    name: "Mr. Costa Doumani",
    title: "Director of Operations",
    imageUrl: "/Costa.jpg",
    bio: "Orchestrating field operations and ensuring sustainable preservation practices across all APSAD projects.",
  },
  {
    name: "Dr. Yasmine Makaroun",
    title: "Chief Architect & Conservation Specialist",
    imageUrl: "/yasmine.jpeg",
    bio: "Bringing architectural expertise and innovative conservation techniques to Lebanon's most precious heritage sites.",
  },
];

export function TeamSection() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
            Leadership
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Dedicated professionals united by a shared passion for preserving
            Lebanon&apos;s invaluable heritage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <Image
                  src={member.imageUrl}
                  alt={`${member.name}, ${member.title} at APSAD`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary text-[13px] font-medium mb-3 uppercase tracking-[0.1em]">
                {member.title}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
