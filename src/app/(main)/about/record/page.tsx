import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { PageOpener } from "@/components/editorial/page-opener";
import { LegacyProse } from "@/components/editorial/legacy-prose";
import { legacyPage, type PageCode } from "@/lib/legacy";

export const metadata: Metadata = {
  title: "From the Record - APSAD in Its Own Words",
  description:
    "APSAD's founding statement, its aims and objectives since 1960, the President's message of September 2016, and the 2015 General Assembly, with the association's internal regulations.",
};

const entries: { id: string; code: PageCode; title: string; note: string; lang?: string }[] = [
  { id: "association", code: "AboutUs", title: "The Association", note: "Its founding statement, with the internal regulations and general presentation." },
  { id: "aims", code: "History", title: "Aims & Objectives", note: "What APSAD has sought to achieve since 1960." },
  { id: "president", code: "Home", title: "From the President", note: "Raya Daouk, September 2016 — in French, as written.", lang: "fr" },
  { id: "general-assembly", code: "CurrentExecutive", title: "General Assembly 2015", note: "The election of the executive committee." },
];

export default function RecordPage() {
  return (
    <div className="pt-20">
      <PageOpener
        title="From the Record"
        standfirst={
          <>
            <p>
              The association in its own words: the statements and messages it published on apsad.net, kept
              here unabridged.
            </p>
            <nav aria-label="On this page" className="mt-8 border-t border-border">
              <ul>
                {entries.map((entry) => (
                  <li key={entry.id} className="border-b border-border">
                    <a
                      href={`#${entry.id}`}
                      className="group flex items-baseline justify-between gap-6 py-3 font-display text-[12px] uppercase tracking-[0.24em] text-foreground hover:text-primary transition-colors duration-500"
                    >
                      {entry.title}
                      <ArrowDown
                        aria-hidden
                        strokeWidth={1.25}
                        className="h-3.5 w-3.5 shrink-0 text-primary transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        }
      />

      {entries.map((entry, i) => (
        <section
          key={entry.id}
          id={entry.id}
          aria-labelledby={`${entry.id}-title`}
          className={`scroll-mt-20 py-[clamp(4.5rem,8vw,7rem)] ${i > 0 ? "border-t border-border" : ""} ${i % 2 ? "bg-secondary" : ""}`}
        >
          <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-x-8 gap-y-8">
            <div className="lg:col-span-4">
              <h2 id={`${entry.id}-title`} className="font-display uppercase tracking-[0.03em] text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.08]">
                {entry.title}
              </h2>
              <p className="mt-5 text-[17px] italic leading-[1.6] text-muted-foreground max-w-[34ch]">{entry.note}</p>
            </div>
            <LegacyProse html={legacyPage(entry.code).content} lang={entry.lang} className="lg:col-span-8" />
          </div>
        </section>
      ))}
    </div>
  );
}
