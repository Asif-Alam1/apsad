"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import archiveData from "@/data/legacy/gallery.json";
import type { ArchivePlate } from "@/lib/legacy";
import { PlateLightbox } from "@/components/editorial/plate-lightbox";

const SERIES = ["The Green Folders", "The Regional Survey", "Beirut", "Sofar"];
const PAGE = 60;

const plates = [...(archiveData as ArchivePlate[])].sort(
  (a, b) =>
    SERIES.indexOf(a.series) - SERIES.indexOf(b.series) || a.place.localeCompare(b.place) || a.id - b.id,
);
const placeCount = new Set(plates.map((p) => p.place)).size;

const LABEL = "font-display text-[11px] uppercase tracking-[0.3em]";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background";
const plateNo = (id: number) => `Pl. ${String(id).padStart(3, "0")}`;
const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/** The full photographic archive from the old site, shown below the curated collections. */
export function Archive() {
  const [series, setSeries] = useState("All");
  const [place, setPlace] = useState("");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  const inSeries = useMemo(() => (series === "All" ? plates : plates.filter((p) => p.series === series)), [series]);
  const places = useMemo(() => [...new Set(inSeries.map((p) => p.place))].sort((a, b) => a.localeCompare(b)), [inSeries]);
  const filtered = useMemo(() => {
    const q = fold(query.trim());
    return inSeries.filter(
      (p) => (!place || p.place === place) && (!q || fold(`${p.place} ${p.description}`).includes(q)),
    );
  }, [inSeries, place, query]);

  const shown = filtered.slice(0, limit);
  const lightboxPlates = useMemo(
    () =>
      filtered.map((p) => ({
        ...p,
        number: plateNo(p.id),
        caption: p.description || p.place,
        note: `${p.place} · ${p.series}`,
      })),
    [filtered],
  );

  const reset = (next: () => void) => {
    next();
    setLimit(PAGE);
  };

  return (
    <section aria-labelledby="archive-title" className="border-t border-border pt-[clamp(5rem,9vw,8rem)] pb-[clamp(6rem,10vw,9rem)]">
      <div className="mx-auto w-full max-w-[1320px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-10 md:items-end">
          <h2
            id="archive-title"
            className="md:col-span-6 font-display uppercase tracking-[0.03em] text-[clamp(2.4rem,6vw,5rem)] leading-[0.98]"
          >
            The Archive
          </h2>
          <div className="md:col-span-6 md:pb-2">
            <p className="text-[17px] md:text-[19px] leading-[1.6] text-foreground/80 max-w-[48ch]">
              Every plate from the association&apos;s photographic record: the Green Folders, its site-by-site
              classification dossiers of the 1960s; the regional survey of villages from Abey to Zouk; Beirut
              from the air and under excavation.
            </p>
            <p className={`${LABEL} tabular-nums text-muted-foreground mt-6`}>
              {plates.length} plates <span className="text-primary">·</span> {placeCount} places
            </p>
          </div>
        </div>

        {/* Index: series as text, place as a ruled select, search as a ruled line */}
        <div className="mt-[clamp(2.5rem,5vw,4rem)] border-t border-border pt-3 md:pt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter the archive by series" className="flex flex-wrap items-center gap-x-6 md:gap-x-8">
            {["All", ...SERIES].map((name) => {
              const active = series === name;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => reset(() => { setSeries(name); setPlace(""); })}
                  className={`group/f relative min-h-[44px] cursor-pointer ${LABEL} transition-colors duration-300 ${FOCUS} ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {name.replace(/^The /, "")}
                  <span
                    aria-hidden
                    className={`absolute left-0 right-[0.3em] bottom-[9px] h-px bg-primary origin-left transition-transform duration-700 ease-[var(--ease-expo)] ${
                      active ? "scale-x-100" : "scale-x-0 group-hover/f:scale-x-50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <label className="relative block sm:w-[220px]">
              <span className="sr-only">Place</span>
              <select
                value={place}
                onChange={(e) => reset(() => setPlace(e.target.value))}
                className="w-full h-11 cursor-pointer appearance-none bg-transparent pr-6 text-[16px] text-foreground border-0 border-b border-border outline-none transition-colors duration-300 focus:border-primary [&>option]:bg-card"
              >
                <option value="">Every place ({places.length})</option>
                {places.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <span aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rotate-45 border-b border-r border-primary" />
            </label>
            <div className="relative w-full sm:w-[260px]">
              <Search aria-hidden strokeWidth={1.25} className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                aria-label="Search the archive"
                placeholder="Search the archive..."
                value={query}
                onChange={(e) => reset(() => setQuery(e.target.value))}
                className="w-full h-11 bg-transparent pl-7 pr-10 text-[16px] text-foreground placeholder:text-muted-foreground placeholder:italic border-0 border-b border-border outline-none transition-colors duration-300 focus:border-primary [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => reset(() => setQuery(""))}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 h-11 w-9 flex items-center justify-end text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${FOCUS}`}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" strokeWidth={1.25} />
                </button>
              )}
            </div>
          </div>
        </div>
        <p aria-live="polite" className="mt-4 text-[15px] italic text-muted-foreground">
          {filtered.length === plates.length ? "Showing the whole archive" : `${filtered.length} plate${filtered.length === 1 ? "" : "s"} found`}
        </p>

        {filtered.length === 0 ? (
          <div className="max-w-[46ch] pt-10 md:pt-14">
            <p className="font-display text-2xl md:text-[2rem] leading-[1.25] mb-6">Nothing on file under that search.</p>
            <button
              type="button"
              onClick={() => reset(() => { setSeries("All"); setPlace(""); setQuery(""); })}
              className={`link-rule cursor-pointer ${LABEL} text-primary ${FOCUS}`}
            >
              Show the whole archive
            </button>
          </div>
        ) : (
          <ul className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
            {shown.map((plate, i) => (
              <li key={plate.id}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  data-cursor-label="View"
                  className={`group plate-hover block w-full text-left cursor-pointer ${FOCUS}`}
                >
                  <span className="block border border-border bg-card p-1.5 transition-colors duration-700 group-hover:border-primary/50">
                    <span className="relative block aspect-[5/4] overflow-hidden">
                      <Image
                        src={plate.thumb}
                        alt={plate.description || plate.place}
                        fill
                        unoptimized
                        className="plate object-cover group-hover:scale-[1.04]"
                      />
                    </span>
                  </span>
                  <span className="mt-3 block border-t border-border pt-2.5">
                    <span className={`${LABEL} block tabular-nums text-primary text-[10px]`}>{plateNo(plate.id)}</span>
                    <span className="mt-1.5 block font-display text-[15px] leading-[1.25] text-foreground">{plate.place}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {filtered.length > limit && (
          <div className="mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => setLimit((n) => n + PAGE)}
              className={`link-rule cursor-pointer ${LABEL} text-primary ${FOCUS}`}
            >
              Show {Math.min(PAGE, filtered.length - limit)} more
            </button>
            <span className="text-[15px] italic text-muted-foreground tabular-nums">
              {limit} of {filtered.length}
            </span>
          </div>
        )}
      </div>

      <PlateLightbox
        plates={lightboxPlates}
        index={open}
        onIndexChange={(i) => {
          setOpen(i);
          if (i >= limit) setLimit(Math.ceil((i + 1) / PAGE) * PAGE);
        }}
        onClose={() => setOpen(null)}
        title="The APSAD photographic archive"
      />
    </section>
  );
}
