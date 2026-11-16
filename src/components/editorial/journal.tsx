import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageOpener } from "@/components/editorial/page-opener";
import { LegacyProse } from "@/components/editorial/legacy-prose";
import { PlateSheet } from "@/components/editorial/plate-lightbox";
import { formatDate, isArabic, journal, type JournalEntry } from "@/lib/legacy";

const LABEL = "font-display text-[11px] uppercase tracking-[0.3em]";
const kindLabel = { news: "News", event: "Event" } as const;

/** One ruled row of the Journal ledger: date and kind, title, place and summary, a small matted plate. */
export function JournalRow({ entry }: { entry: JournalEntry }) {
  const arabic = isArabic(entry.title);
  const location = entry.kind === "event" ? entry.location : null;

  return (
    <li className="border-t border-border">
      <Link
        href={entry.href}
        className="group plate-hover relative grid grid-cols-[1fr_auto] md:grid-cols-[9.5rem_1fr_auto] gap-x-6 md:gap-x-10 gap-y-3 py-7 md:py-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <span
          aria-hidden
          className="absolute -top-px left-0 h-px w-full bg-primary origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        <p className={`${LABEL} col-span-2 md:col-span-1 text-muted-foreground tabular-nums leading-relaxed`}>
          <time dateTime={entry.date}>{formatDate(entry.date, "short")}</time>
          <span className="text-primary md:block md:mt-1">
            <span className="md:hidden"> · </span>
            {kindLabel[entry.kind]}
          </span>
        </p>
        <div className="min-w-0">
          <h3
            dir="auto"
            lang={arabic ? "ar" : undefined}
            className={`font-display text-[1.35rem] md:text-[1.6rem] ${arabic ? "leading-[1.5]" : "leading-[1.2] tracking-[0.01em]"} transition-colors duration-500 group-hover:text-primary`}
          >
            {entry.title}
          </h3>
          {location && (
            <p dir="auto" className="mt-1.5 italic text-[16px] text-muted-foreground">
              {location}
            </p>
          )}
          <p dir="auto" className="mt-3 me-auto text-[16px] md:text-[17px] leading-[1.6] text-foreground/75 max-w-[62ch] line-clamp-2">
            {entry.summary}
          </p>
        </div>
        {entry.image && (
          <span className="block w-[88px] sm:w-[120px] md:w-[148px] border border-border bg-card p-1 md:p-1.5 transition-colors duration-700 group-hover:border-primary/50 self-start">
            <span className="relative block aspect-[5/4] overflow-hidden">
              <Image
                src={entry.image.thumb}
                alt=""
                fill
                unoptimized
                className="plate object-cover group-hover:scale-[1.04]"
              />
            </span>
          </span>
        )}
      </Link>
    </li>
  );
}

/** A news item or event, read as an article: opener with plate, prose, photo set, then the neighbours in the record. */
export function JournalArticle({ entry }: { entry: JournalEntry }) {
  const index = journal.findIndex((item) => item.kind === entry.kind && item.id === entry.id);
  const later = journal[index - 1];
  const earlier = journal[index + 1];
  const location = entry.kind === "event" ? entry.location : null;
  const photos = entry.kind === "event" ? entry.gallery : [];

  const facts: [string, ReactNode][] = [
    ["Date", <time key="d" dateTime={entry.date}>{formatDate(entry.date)}</time>],
    ...(location ? ([["Place", location]] as [string, string][]) : []),
    ["Filed", kindLabel[entry.kind]],
    ...(photos.length ? ([["Photographs", String(photos.length)]] as [string, string][]) : []),
  ];

  return (
    <article className="pt-20">
      <PageOpener
        size="article"
        title={entry.title}
        facts={facts}
        standfirst={
          entry.image ? (
            <figure className="plate-hover group w-fit max-w-full">
              <div className="border border-border p-2.5 sm:p-3">
                <Image
                  src={entry.image.src}
                  width={entry.image.width}
                  height={entry.image.height}
                  alt=""
                  priority
                  unoptimized
                  className="plate block h-auto w-auto max-w-full max-h-[460px]"
                />
              </div>
            </figure>
          ) : undefined
        }
      />

      <section className="py-[clamp(4rem,8vw,7rem)]">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-8">
            <LegacyProse html={entry.content} className="lg:col-span-8 lg:col-start-3" />
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section aria-labelledby="photographs" className="section-dark py-[clamp(4.5rem,8vw,7rem)]">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-5 mb-10 md:mb-14">
              <h2 id="photographs" className="font-display uppercase tracking-[0.03em] text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.1]">
                The photographs
              </h2>
              <p className="text-[16px] italic text-muted-foreground">
                {photos.length} plates from the event
              </p>
            </div>
            <PlateSheet plates={photos} title={entry.title} />
          </div>
        </section>
      )}

      <nav aria-label="More from the Journal" className="border-t border-border">
        <div className="container max-w-7xl mx-auto px-6 py-[clamp(3.5rem,7vw,6rem)]">
          <div className="grid md:grid-cols-2 border-y border-border">
            {[
              { item: earlier, label: "Earlier", Icon: ArrowLeft },
              { item: later, label: "Later", Icon: ArrowRight },
            ].map(({ item, label, Icon }, i) =>
              item ? (
                <Link
                  key={label}
                  href={item.href}
                  className={`group py-8 md:py-10 ${i === 1 ? "md:pl-10 md:border-l border-t md:border-t-0 border-border md:text-right" : "md:pr-10"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset`}
                >
                  <span className={`${LABEL} inline-flex items-center gap-3 text-primary ${i === 1 ? "md:flex-row-reverse" : ""}`}>
                    <Icon strokeWidth={1} className="h-4 w-4" aria-hidden />
                    {label} · {formatDate(item.date, "short")}
                  </span>
                  <span dir="auto" className="mt-4 block font-display text-[1.3rem] md:text-[1.5rem] leading-[1.25] transition-colors duration-500 group-hover:text-primary">
                    {item.title}
                  </span>
                </Link>
              ) : (
                <span key={label} className={i === 1 ? "hidden md:block md:border-l border-border" : ""} />
              ),
            )}
          </div>
          <Link href="/journal" className={`link-rule mt-10 inline-block ${LABEL} text-primary`}>
            The full Journal
          </Link>
        </div>
      </nav>
    </article>
  );
}
