'use client'

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const stats = [
  { number: 60, suffix: "+", label: "Years of Heritage Protection" },
  { number: 150, suffix: "+", label: "Sites Preserved" },
  { number: 500, suffix: "+", label: "Community Members" },
  { number: 25, suffix: "+", label: "Active Projects" },
];

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, inView]);

  return (
    <span ref={ref} className="font-serif text-5xl md:text-6xl font-bold text-primary">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 border-y border-border">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <CountUp end={stat.number} suffix={stat.suffix} />
              <p className="text-[13px] text-muted-foreground mt-3 tracking-[0.1em] uppercase leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
