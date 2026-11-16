import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { isArabic } from "@/lib/legacy";

type PageOpenerProps = {
  title: string;
  standfirst?: ReactNode;
  facts?: [string, ReactNode][];
  /** "monument" for section indexes, "article" for long legacy titles. */
  size?: "monument" | "article";
};

const labelMuted = "font-display text-[11px] uppercase tracking-[0.3em] text-muted-foreground";

/** Asymmetric opener (DESIGN.md): title, standfirst in the right column, a colophon of facts on the left. */
export function PageOpener({ title, standfirst, facts = [], size = "monument" }: PageOpenerProps) {
  const arabic = isArabic(title);
  const titleClass =
    size === "monument"
      ? "font-display uppercase tracking-[0.02em] text-[clamp(2.5rem,9vw,7rem)] leading-[0.98]"
      : arabic
        ? "font-display text-[clamp(2.1rem,4.8vw,3.9rem)] leading-[1.35] max-w-[24ch]"
        : "font-display text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.08] tracking-[0.01em] max-w-[24ch]";

  return (
    <section className="border-b border-border">
      <div className="container max-w-7xl mx-auto px-6 pt-[clamp(3rem,7vw,6rem)] pb-[clamp(3rem,6vw,5rem)]">
        {size === "monument" && !arabic ? (
          <SplitText as="h1" className={titleClass}>
            {title}
          </SplitText>
        ) : (
          <Reveal>
            <h1 dir="auto" lang={arabic ? "ar" : undefined} className={titleClass}>
              {title}
            </h1>
          </Reveal>
        )}

        {(standfirst || facts.length > 0) && (
          <Reveal delay={120}>
            <div className="grid md:grid-cols-12 gap-x-8 gap-y-10 mt-[clamp(2rem,4.5vw,4rem)]">
              {standfirst && (
                <div className="md:col-span-7 md:col-start-6 md:order-2 text-[18px] md:text-[20px] leading-[1.55] text-foreground/85 max-w-[52ch]">
                  {standfirst}
                </div>
              )}
              {facts.length > 0 && (
                <dl className="md:col-span-4 md:order-1 self-end border-t border-border">
                  {facts.map(([term, value]) => (
                    <div key={term} className="grid grid-cols-[8.75rem_1fr] items-baseline gap-4 border-b border-border py-3">
                      <dt className={labelMuted}>{term}</dt>
                      <dd dir="auto" className="text-[16px] leading-snug">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
