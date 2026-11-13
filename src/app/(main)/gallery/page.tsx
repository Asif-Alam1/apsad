"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

const initialGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "The Jeweler's Souk, Beirut",
    imageUrls: ["/archive/bijoutiers-1.jpg", "/archive/bijoutiers-2.jpg", "/archive/bijoutiers-3.jpg"],
    description:
      "The goldsmiths' souk of the Borj, photographed by APSAD's surveyors in the heart of old Beirut.",
    historicalContext:
      "APSAD studied the souk in 1964, and in 1978 drew the plans for its reconstruction after the war.",
    aiHints: ["jewelers souk", "old Beirut"],
  },
  {
    id: "2",
    title: "Beirut from the Air",
    imageUrls: ["/archive/beirut-aerial-1.jpg", "/archive/beirut-aerial-2.jpg"],
    description:
      "Aerial surveys of Beirut from the association's photographic archive \u2014 the city's old fabric seen whole.",
    historicalContext:
      "Views like these underpinned APSAD's campaigns against the disfigurement the 1960 appeal warned of.",
    aiHints: ["aerial Beirut"],
  },
  {
    id: "3",
    title: "Hammam el-J\u00e9did, Tripoli",
    imageUrls: ["/archive/hammam-1.jpg", "/archive/hammam-2.jpg", "/archive/hammam-3.jpg"],
    description:
      "The 18th-century bathhouse of Tripoli \u2014 domed chambers and stone arcades in the association's own photographs.",
    historicalContext:
      "Restored in 1964 with the Directorate General of Antiquities \u2014 one of APSAD's first restorations.",
    aiHints: ["Tripoli hammam"],
  },
  {
    id: "4",
    title: "The Khans of Tripoli",
    imageUrls: ["/archive/khan-khayatin.jpg", "/archive/khan-saboun.jpg", "/archive/khan-tamassili.jpg"],
    description:
      "Khan al-Khayatin, Khan el-Saboun, and Khan el-Tamassili at El-Mina \u2014 the caravanserais of Tripoli's old city.",
    historicalContext:
      "APSAD drew restoration studies for Khan al-Khayatin in 1965; the khans remain touchstones of the association's northern work.",
    aiHints: ["Tripoli khan"],
  },
  {
    id: "5",
    title: "Houses of Beirut",
    imageUrls: ["/archive/beirut-khoury.jpg", "/archive/beirut-arts-metiers.jpg"],
    description:
      "The Bechara el-Khoury house and the H\u00f4pital des Arts et M\u00e9tiers \u2014 Beirut's endangered mansions on file.",
    historicalContext:
      "The Arts et M\u00e9tiers building was the subject of a 1979 APSAD restoration study; house dossiers like these are how classification battles are won.",
    aiHints: ["Beirut mansion"],
  },
  {
    id: "6",
    title: "Deir el-Qamar",
    imageUrls: ["/archive/deirelkamar-1.jpg", "/archive/deirelkamar-2.jpg", "/archive/deirelkamar-3.jpg"],
    description:
      "The silk souk, the serail, and the stone lanes of the mountain capital of the Chouf.",
    historicalContext:
      "APSAD drew plans for the old street in 1964 and made a rehabilitated residence its regional home here in 1972.",
    aiHints: ["Deir el-Qamar"],
  },
  {
    id: "7",
    title: "Abey",
    imageUrls: ["/archive/abey-1.jpg", "/archive/abey-2.jpg", "/archive/abey-3.jpg"],
    description:
      "The mountain village of Abey, where the association's field record begins.",
    historicalContext:
      "APSAD's first restoration, 1962: the historic El-Dine residence, later chosen as the British Ambassador's residence.",
    aiHints: ["Abey village"],
  },
  {
    id: "8",
    title: "Beiteddine",
    imageUrls: ["/archive/beiteddine-1.jpg", "/archive/beiteddine-2.jpg"],
    description:
      "The palace of the emirs and its mountain site, from the classification archive.",
    historicalContext:
      "The Green Folders \u2014 APSAD's site-by-site dossiers \u2014 record the palace of Emir Amin among Lebanon's first-rank treasures.",
    aiHints: ["Beiteddine palace"],
  },
  {
    id: "9",
    title: "Jounieh",
    imageUrls: ["/archive/jounieh-1.jpg", "/archive/jounieh-2.jpg", "/archive/jounieh-3.jpg"],
    description:
      "The bay, the old souk, and the houses along the sea \u2014 the coast town before the towers.",
    historicalContext:
      "APSAD studied the old souk and principal street in 1963, and led the souk's rehabilitation and pedestrian revival from 2001.",
    aiHints: ["Jounieh bay"],
  },
  {
    id: "10",
    title: "Byblos",
    imageUrls: ["/archive/byblos-1.jpg", "/archive/byblos-2.jpg", "/archive/byblos-3.jpg"],
    description:
      "The port, the crusader church of St. John, and the archaeological site of the coast's oldest city.",
    historicalContext:
      "APSAD's Kesrouan-Jbeil section restored a historic residence here as the region's tourist and information centre.",
    aiHints: ["Byblos port"],
  },
  {
    id: "11",
    title: "Sofar",
    imageUrls: ["/archive/sofar-1.jpg", "/archive/sofar-2.jpg"],
    description:
      "The Sursock palace at Sofar \u2014 the grand mountain villa of Lebanon's summering age.",
    historicalContext:
      "Photographed for the association's archive; the Sursock name also marks APSAD's own street in Achrafieh.",
    aiHints: ["Sofar palace"],
  },
  {
    id: "12",
    title: "Salima",
    imageUrls: ["/archive/salima-1.jpg", "/archive/salima-2.jpg"],
    description:
      "The Nagib Asmar house and the mountain village whose architecture was judged exceptional enough to save whole.",
    historicalContext:
      "With Patrimoine Sans Fronti\u00e8res, APSAD's two-year study led the Ministry of Culture to classify seventy of Salima's residences as historic.",
    aiHints: ["Salima village"],
  },
  {
    id: "13",
    title: "Enfeh",
    imageUrls: ["/archive/enfeh-1.jpg", "/archive/enfeh-2.jpg"],
    description:
      "Rock-cut salinas and chapels on the coast's most fragile peninsula.",
    historicalContext:
      "With APSAD's collaboration, the World Monuments Fund placed Enfeh among the 100 most endangered sites of the world.",
    aiHints: ["Enfeh peninsula"],
  },
  {
    id: "14",
    title: "The Qadisha Valley",
    imageUrls: ["/archive/kadisha-1.jpg", "/archive/kadisha-2.jpg"],
    description:
      "Deir Qannoubin and the holy valley \u2014 monasteries in the mountain cliffs.",
    historicalContext:
      "From the Green Folders: the valley's monasteries documented site by site for their protection.",
    aiHints: ["Qadisha monastery"],
  },
  {
    id: "15",
    title: "Nahr el-Kalb",
    imageUrls: ["/archive/nahrelkalb.jpg"],
    description:
      "The old bridge at the Dog River, where every coast-bound empire left its stele.",
    historicalContext:
      "In 2016 APSAD began a partnership with Factum Foundation to study the river's ancient stelae for preservation.",
    aiHints: ["Nahr el-Kalb"],
  },
  {
    id: "16",
    title: "Batroun",
    imageUrls: ["/archive/batroun-wall.jpg"],
    description:
      "The Phoenician sea wall \u2014 the coast town's oldest defence, still holding the waves.",
    historicalContext:
      "APSAD studied Batroun's old souk in 1967 and restored the church of Mar Estephan in 1969.",
    aiHints: ["Batroun wall"],
  },
];

const categories = ["All", "Beirut", "Tripoli", "Mountain", "Coast"];

const totalPlates = initialGalleryItems.reduce(
  (sum, item) => sum + item.imageUrls.length,
  0
);

const pad = (n: number | string) => String(n).padStart(2, "0");

const LABEL =
  "font-display text-[11px] uppercase tracking-[0.3em]";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGalleryItems(initialGalleryItems);
      setFilteredItems(initialGalleryItems);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = galleryItems;

    const matches = (item: GalleryItem, term: string) =>
      [item.title, item.description, item.historicalContext]
        .join(" ")
        .toLowerCase()
        .includes(term.toLowerCase());

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => matches(item, selectedCategory));
    }

    if (searchQuery) {
      filtered = filtered.filter((item) => matches(item, searchQuery));
    }

    setFilteredItems(filtered);
  }, [galleryItems, selectedCategory, searchQuery]);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => setSelectedItem(null);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const nextImage = useCallback(() => {
    if (selectedItem) {
      setCurrentImageIndex((i) => (i + 1) % selectedItem.imageUrls.length);
    }
  }, [selectedItem]);

  const prevImage = useCallback(() => {
    if (selectedItem) {
      setCurrentImageIndex(
        (i) => (i - 1 + selectedItem.imageUrls.length) % selectedItem.imageUrls.length
      );
    }
  }, [selectedItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, nextImage, prevImage]);

  return (
    <div className="section-dark min-h-screen pt-20">
      {/* Opening — editorial title block */}
      <section className="pt-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto w-full max-w-[1320px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-10 md:items-end">
            <div className="md:col-span-7">
              <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-7">
                The Photographic Archive
              </p>
              <SplitText
                as="h1"
                className="font-display uppercase tracking-[0.04em] text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.95]"
              >
                The Sites
              </SplitText>
            </div>
            <div className="md:col-span-5 md:pb-3">
              <p className="text-[17px] md:text-[19px] leading-[1.6] text-foreground/80 max-w-[38ch]">
                Souks and khans, palaces and villages — from the association&apos;s
                own archive, photographed by APSAD&apos;s surveyors across sixty-five
                years of fieldwork.
              </p>
              <p className={`${LABEL} tabular-nums text-muted-foreground mt-7`}>
                Archive <span className="text-primary">·</span>{" "}
                {initialGalleryItems.length} sites{" "}
                <span className="text-primary">·</span> {totalPlates} plates
              </p>
            </div>
          </div>

          {/* Index — filters as a text index, search as a ruled line */}
          <div className="mt-[clamp(3rem,6vw,5rem)] border-t border-border pt-3 md:pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div
              role="group"
              aria-label="Filter sites by region"
              className="flex flex-wrap items-center justify-between gap-x-3 sm:justify-start sm:gap-x-7 md:gap-x-9"
            >
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`group/f relative min-h-[44px] cursor-pointer ${LABEL} transition-colors duration-300 ${FOCUS} ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                    <span
                      aria-hidden
                      className={`absolute left-0 right-[0.3em] bottom-[9px] h-px bg-primary origin-left transition-transform duration-700 ease-[var(--ease-expo)] ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/f:scale-x-50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-6 md:gap-8">
              <p
                aria-live="polite"
                className="hidden lg:block text-[15px] italic text-muted-foreground whitespace-nowrap"
              >
                {isLoading
                  ? "Loading..."
                  : `${filteredItems.length} heritage site${filteredItems.length !== 1 ? "s" : ""}`}
              </p>
              <div className="relative w-full md:w-[280px]">
                <Search
                  aria-hidden
                  strokeWidth={1.25}
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <input
                  type="text"
                  aria-label="Search heritage sites"
                  placeholder="Search heritage sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-transparent pl-7 pr-10 text-[16px] text-foreground placeholder:text-muted-foreground placeholder:italic border-0 border-b border-border outline-none transition-colors duration-300 focus:border-primary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 h-11 w-9 flex items-center justify-end text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${FOCUS}`}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" strokeWidth={1.25} />
                  </button>
                )}
              </div>
            </div>
          </div>
          <p className="lg:hidden mt-4 text-[15px] italic text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `${filteredItems.length} heritage site${filteredItems.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </section>

      {/* Plate wall */}
      <section className="pt-[clamp(3rem,6vw,5rem)] pb-[clamp(6rem,10vw,9rem)]">
        <div className="mx-auto w-full max-w-[1320px] px-5 md:px-10">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-10 gap-y-12 md:gap-y-20">
              {[...Array(8)].map((_, i) => (
                <div key={i} aria-hidden>
                  <div className="aspect-[5/4] border border-border bg-card" />
                  <div className="mt-4 border-t border-border" />
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="max-w-[46ch] pt-2 pb-[clamp(2rem,6vw,5rem)] md:pt-6">
              <p className={`${LABEL} text-primary mb-6`}>No sites found</p>
              <p className="font-display text-2xl md:text-[2rem] leading-[1.25] mb-6">
                Nothing on file under that search.
              </p>
              <p className="text-[17px] leading-[1.65] text-muted-foreground mb-8">
                Try adjusting your search or filter criteria.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className={`link-rule cursor-pointer ${LABEL} text-primary ${FOCUS}`}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-10 gap-y-12 md:gap-y-20">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  data-cursor-label="View"
                  className={`group plate-hover cursor-pointer ${FOCUS} focus-visible:ring-offset-8`}
                  style={{ animation: `fade-up 0.7s var(--ease-expo) ${Math.min(index, 11) * 0.05}s both` }}
                  onClick={() => openModal(item)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(item); } }}
                >
                  {/* Matted plate */}
                  <div className="border border-border bg-card p-1.5 md:p-2.5 transition-colors duration-700 group-hover:border-primary/50">
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        src={item.imageUrls[0]}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 300px"
                        className="plate object-cover group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                      />
                    </div>
                  </div>

                  {/* Typeset label */}
                  <div className="relative mt-4 md:mt-5 border-t border-border pt-3">
                    <span
                      aria-hidden
                      className="absolute -top-px left-0 h-px w-full bg-primary origin-left scale-x-0 transition-transform duration-[900ms] ease-[var(--ease-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={`${LABEL} tabular-nums text-primary`}>
                        Pl. {pad(item.id)}
                      </span>
                      <span className="text-[13px] md:text-[14px] italic text-muted-foreground whitespace-nowrap">
                        {item.imageUrls.length} photograph{item.imageUrls.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <h3 className="font-display text-[15px] md:text-[19px] leading-[1.25] mt-2 md:mt-3 text-foreground [text-wrap:balance]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox — catalogue spread */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent
            aria-describedby={undefined}
            className="section-dark block max-w-[1180px] w-[94vw] p-0 gap-0 max-h-[92vh] overflow-y-auto border-border shadow-none sm:rounded-none [&>button:last-child]:z-20 [&>button:last-child]:right-2 [&>button:last-child]:top-2 [&>button:last-child]:h-11 [&>button:last-child]:w-11 [&>button:last-child]:flex [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:rounded-none [&>button:last-child]:bg-transparent [&>button:last-child]:text-foreground [&>button:last-child]:focus:ring-1 [&>button:last-child]:focus:ring-primary [&>button:last-child]:focus:ring-offset-0"
          >
            {/* Visually hidden title for accessibility */}
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedItem.title}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_400px]">
              {/* Plate on its mat */}
              <div className="flex flex-col bg-black/35 px-5 pt-14 pb-4 md:px-12 md:pt-12 md:pb-6">
                <div className="flex flex-1 items-center justify-center md:min-h-[420px]">
                  <figure className="plate-hover border border-border bg-card p-1.5 md:p-2.5">
                    {/* Native <img>: intrinsic size, never upscaled past the scan */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={selectedItem.imageUrls[currentImageIndex]}
                      src={selectedItem.imageUrls[currentImageIndex]}
                      alt={`${selectedItem.title} — photograph ${currentImageIndex + 1} of ${selectedItem.imageUrls.length}`}
                      className="plate block h-auto w-auto max-w-full max-h-[44vh] md:max-h-[calc(92vh-13rem)] select-none animate-in fade-in duration-700"
                    />
                  </figure>
                </div>

                <div className="mt-4 md:mt-6 flex items-center justify-between gap-4">
                  {selectedItem.imageUrls.length > 1 ? (
                    <button
                      type="button"
                      onClick={prevImage}
                      aria-label="Previous image"
                      className={`group/nav inline-flex min-h-[44px] items-center gap-3 cursor-pointer ${LABEL} text-muted-foreground hover:text-primary transition-colors duration-300 ${FOCUS}`}
                    >
                      <ArrowLeft
                        strokeWidth={1}
                        className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover/nav:-translate-x-1"
                      />
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                  ) : (
                    <span />
                  )}
                  <span className="font-display text-[12px] tracking-[0.3em] tabular-nums text-foreground/85">
                    {pad(currentImageIndex + 1)}{" "}
                    <span className="text-primary">/</span>{" "}
                    {pad(selectedItem.imageUrls.length)}
                  </span>
                  {selectedItem.imageUrls.length > 1 ? (
                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next image"
                      className={`group/nav inline-flex min-h-[44px] items-center gap-3 cursor-pointer ${LABEL} text-muted-foreground hover:text-primary transition-colors duration-300 ${FOCUS}`}
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ArrowRight
                        strokeWidth={1}
                        className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover/nav:translate-x-1"
                      />
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              </div>

              {/* Caption */}
              <div className="border-t md:border-t-0 md:border-l border-border px-6 py-8 md:px-10 md:py-12 flex flex-col">
                <p className={`${LABEL} tabular-nums text-primary mb-5`}>
                  Pl. {pad(selectedItem.id)}
                </p>
                <h2 className="font-display text-[1.75rem] md:text-[2.125rem] leading-[1.15] pr-8 md:pr-0 [text-wrap:balance]">
                  {selectedItem.title}
                </h2>

                <div className="rule-ornament my-7 md:my-8">
                  <span />
                </div>

                <p className="text-[17px] md:text-[18px] leading-[1.6] text-foreground/90">
                  {selectedItem.description}
                </p>

                <p className={`${LABEL} text-muted-foreground mt-8 mb-3`}>
                  The record
                </p>
                <p className="text-[16px] md:text-[17px] leading-[1.6] italic text-foreground/75">
                  {selectedItem.historicalContext}
                </p>

                {selectedItem.imageUrls.length > 1 && (
                  <div className="mt-10 md:mt-auto md:pt-10">
                    <p className={`${LABEL} text-muted-foreground mb-3`}>Plates</p>
                    <div className="flex gap-2">
                      {selectedItem.imageUrls.map((url, i) => (
                        <button
                          key={url}
                          type="button"
                          onClick={() => setCurrentImageIndex(i)}
                          aria-label={`View image ${i + 1}`}
                          aria-current={i === currentImageIndex}
                          className={`plate-hover relative h-14 w-[72px] overflow-hidden border cursor-pointer transition-[border-color,opacity] duration-500 ${FOCUS} focus-visible:ring-offset-2 ${
                            i === currentImageIndex
                              ? "border-primary opacity-100"
                              : "border-border opacity-55 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={url}
                            alt=""
                            fill
                            sizes="72px"
                            className="plate object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
