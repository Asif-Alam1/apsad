"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Photo } from "@/lib/legacy";

export type Plate = Photo & { caption?: string; note?: string; number?: string };

const LABEL = "font-display text-[11px] uppercase tracking-[0.3em]";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background";
const pad = (n: number) => String(n).padStart(2, "0");

/** Night viewing room for a run of plates: arrows, keys, counter, typeset caption. */
export function PlateLightbox({
  plates,
  index,
  onIndexChange,
  onClose,
  title,
}: {
  plates: Plate[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  title: string;
}) {
  const plate = index === null ? null : plates[index];
  const step = useCallback(
    (delta: number) => {
      if (index !== null) onIndexChange((index + delta + plates.length) % plates.length);
    },
    [index, onIndexChange, plates.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <Dialog open={plate !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        aria-describedby={undefined}
        className="section-dark block max-w-[1180px] w-[94vw] p-0 gap-0 max-h-[94vh] overflow-y-auto border-border shadow-none sm:rounded-none [&>button:last-child]:z-20 [&>button:last-child]:right-2 [&>button:last-child]:top-2 [&>button:last-child]:h-11 [&>button:last-child]:w-11 [&>button:last-child]:flex [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:rounded-none [&>button:last-child]:bg-transparent [&>button:last-child]:text-foreground [&>button:last-child]:focus:ring-1 [&>button:last-child]:focus:ring-primary [&>button:last-child]:focus:ring-offset-0"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {plate && index !== null && (
          <div className="flex flex-col bg-black/35 px-5 pt-14 pb-6 md:px-12 md:pt-12">
            <div className="flex items-center justify-center md:min-h-[420px]">
              <figure className="border border-border bg-card p-1.5 md:p-2.5">
                {/* Native <img>: intrinsic size, never upscaled past the scan */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={plate.src}
                  src={plate.src}
                  width={plate.width}
                  height={plate.height}
                  alt={plate.caption ?? `${title} — photograph ${index + 1} of ${plates.length}`}
                  className="block h-auto w-auto max-w-full max-h-[52vh] md:max-h-[calc(94vh-15rem)] select-none animate-in fade-in duration-700"
                />
              </figure>
            </div>

            <div className="mx-auto mt-5 w-full max-w-[880px] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
                className={`group/nav justify-self-start inline-flex min-h-[44px] items-center gap-3 cursor-pointer ${LABEL} text-muted-foreground hover:text-primary transition-colors duration-300 ${FOCUS}`}
              >
                <ArrowLeft strokeWidth={1} className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover/nav:-translate-x-1" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <span className="font-display text-[12px] tracking-[0.3em] tabular-nums text-foreground/85">
                {pad(index + 1)} <span className="text-primary">/</span> {pad(plates.length)}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photograph"
                className={`group/nav justify-self-end inline-flex min-h-[44px] items-center gap-3 cursor-pointer ${LABEL} text-muted-foreground hover:text-primary transition-colors duration-300 ${FOCUS}`}
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight strokeWidth={1} className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover/nav:translate-x-1" />
              </button>
            </div>

            {(plate.caption || plate.note) && (
              <div className="mx-auto mt-5 w-full max-w-[880px] border-t border-border pt-4 grid sm:grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-baseline">
                {plate.number && <span className={`${LABEL} tabular-nums text-primary`}>{plate.number}</span>}
                <div>
                  {plate.caption && (
                    <p dir="auto" lang="fr" className="text-[17px] leading-[1.55] text-foreground/90">
                      {plate.caption}
                    </p>
                  )}
                  {plate.note && <p className="mt-1 text-[15px] italic text-muted-foreground">{plate.note}</p>}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** An event's photo set: a matted contact sheet that opens into the lightbox. */
export function PlateSheet({ plates, title, initial = 18 }: { plates: Photo[]; title: string; initial?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(plates.length <= initial + 6);
  const shown = expanded ? plates : plates.slice(0, initial);

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
        {shown.map((plate, i) => (
          <li key={plate.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View photograph ${i + 1} of ${plates.length}`}
              data-cursor-label="View"
              className={`plate-hover group block w-full cursor-pointer border border-border bg-card p-1.5 transition-colors duration-700 hover:border-primary/50 ${FOCUS}`}
            >
              <span className="relative block aspect-[5/4] overflow-hidden">
                <Image
                  src={plate.thumb}
                  alt=""
                  fill
                  unoptimized
                  className="plate object-cover group-hover:scale-[1.04]"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={`link-rule mt-8 cursor-pointer ${LABEL} text-primary ${FOCUS}`}
        >
          Show all {plates.length} photographs
        </button>
      )}
      <PlateLightbox plates={plates} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} title={title} />
    </>
  );
}
