import type { Metadata } from "next";
import Image from "next/image";
import { PageOpener } from "@/components/editorial/page-opener";
import { LegacyProse } from "@/components/editorial/legacy-prose";
import { affiliations, legacyPage } from "@/lib/legacy";

export const metadata: Metadata = {
  title: "Affiliations & Partners",
  description:
    "APSAD's place among the world's heritage organizations: Europa Nostra since 1963, Civitas Nostra, Patrimoine Sans Frontières, ICOMOS in Lebanon, and the World Monuments Fund.",
};

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export default function AffiliationsPage() {
  return (
    <div className="pt-20">
      <PageOpener
        title="Affiliations"
        standfirst={<LegacyProse html={legacyPage("Affiliations").content} />}
        facts={[["Partners", String(affiliations.length)]]}
      />

      <section className="py-[clamp(4rem,8vw,7rem)]">
        <div className="container max-w-7xl mx-auto px-6">
          <ul className="border-b border-border">
            {affiliations.map((item) => (
              <li key={item.id} className="border-t border-border py-10 md:py-14 grid md:grid-cols-12 gap-x-8 gap-y-6 items-start">
                {item.image && (
                  <div className="md:col-span-2 w-[132px] md:w-full max-w-[160px] border border-border bg-card p-2">
                    <Image
                      src={item.image.src}
                      width={item.image.width}
                      height={item.image.height}
                      alt={`${item.name} emblem`}
                      unoptimized
                      className="plate block h-auto w-full"
                    />
                  </div>
                )}
                <div className="md:col-span-4">
                  <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.1rem)] leading-[1.15] tracking-[0.02em]">
                    {item.name}
                  </h2>
                  <p className="mt-3 italic text-[16px] leading-[1.55] text-muted-foreground max-w-[34ch]">{item.statement}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-rule mt-5 inline-block font-display text-[11px] uppercase tracking-[0.28em] text-primary"
                    >
                      {host(item.link)}
                    </a>
                  )}
                </div>
                <LegacyProse html={item.description} className="md:col-span-6 !text-[17px]" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
