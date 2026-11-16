import type { Metadata } from "next";
import { PageOpener } from "@/components/editorial/page-opener";
import { JournalRow } from "@/components/editorial/journal";
import { LegacyProse } from "@/components/editorial/legacy-prose";
import { events, journal, journalYears, legacyPage, news } from "@/lib/legacy";

export const metadata: Metadata = {
  title: "The Journal - News, Events & Press",
  description:
    "News, events and press coverage from APSAD's own record: concerts at the Grand Serail and the National Museum, National Heritage Days, and the opening of the Zaki Nassif Museum.",
};

const byYear = Object.entries(
  journal.reduce<Record<string, typeof journal>>((acc, entry) => {
    (acc[entry.date.slice(0, 4)] ??= []).push(entry);
    return acc;
  }, {}),
).sort(([a], [b]) => Number(b) - Number(a));

const photographs = events.reduce((sum, event) => sum + event.gallery.length, 0);

export default function JournalPage() {
  return (
    <div className="pt-20">
      <PageOpener
        title="The Journal"
        standfirst={
          <p>
            Concerts in the Grand Serail, guided visits through old Beirut, National Heritage Days in the
            regions, the opening of the Zaki Nassif Museum. The association&apos;s own record of its work,
            with the press that followed it.
          </p>
        }
        facts={[
          ["Years", `${journalYears.first} — ${journalYears.last}`],
          ["Entries", `${news.length} news · ${events.length} events`],
          ["Photographs", photographs.toLocaleString("en-GB")],
        ]}
      />

      <section aria-label="Entries by year" className="py-[clamp(4rem,8vw,7rem)]">
        <div className="container max-w-7xl mx-auto px-6 space-y-[clamp(3.5rem,7vw,6rem)]">
          {byYear.map(([year, entries]) => (
            <section key={year} aria-labelledby={`y${year}`} className="grid lg:grid-cols-12 gap-x-8 gap-y-6">
              <h2
                id={`y${year}`}
                className="lg:col-span-2 font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[0.04em] text-primary lg:sticky lg:top-28 self-start"
              >
                {year}
              </h2>
              <ol className="lg:col-span-10 border-b border-border">
                {entries.map((entry) => (
                  <JournalRow key={entry.href} entry={entry} />
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>

      <section id="press" aria-labelledby="press-title" className="section-light border-t border-border bg-secondary py-[clamp(5rem,9vw,8rem)] scroll-mt-20">
        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-x-8 gap-y-10">
          <div className="lg:col-span-4">
            <h2 id="press-title" className="font-display uppercase tracking-[0.03em] text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
              In the Press
            </h2>
            <p className="mt-6 text-[17px] italic leading-[1.6] text-muted-foreground max-w-[34ch]">
              Coverage in the Lebanese and Arab press, as the association filed it.
            </p>
          </div>
          <LegacyProse html={legacyPage("Press").content} className="lg:col-span-8" />
        </div>
      </section>
    </div>
  );
}
