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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Images,
  X,
} from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

const initialGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Baalbek Temple Complex",
    imageUrls: ["/vision.jpeg"],
    description:
      "The Roman temple complex of Heliopolis, crowned by the Temple of Jupiter — among the largest religious structures ever raised, and the summit of Roman architecture in the Eastern Mediterranean.",
    historicalContext:
      "Built during the 1st-3rd centuries CE. Sites of this rank anchor APSAD's founding conviction: that Lebanon's stones carry a memory worth any effort to keep.",
    aiHints: ["Baalbek temple", "Jupiter columns", "Roman carving"],
  },
  {
    id: "2",
    title: "Byblos, City of the Alphabet",
    imageUrls: ["/image-3.jpeg"],
    description:
      "One of the world's oldest continuously inhabited cities and the birthplace of the Phoenician alphabet — port, castle, and old souks together in a single living site.",
    historicalContext:
      "Inhabited for over 7,000 years. APSAD's Kesrouan-Jbeil section restored a historic residence here as the region's tourist and information centre.",
    aiHints: ["Byblos port", "Crusader castle"],
  },
  {
    id: "3",
    title: "Anjar, the Umayyad City",
    imageUrls: ["/image-2.jpeg"],
    description:
      "The only inland commercial city founded by the Umayyad dynasty — 8th-century urban planning preserved in arcaded stone.",
    historicalContext:
      "Founded by Caliph Walid I around 705 CE on the trade route between Damascus and the coast.",
    aiHints: ["Anjar ruins", "Umayyad city", "Islamic architecture"],
  },
  {
    id: "4",
    title: "Qadisha Valley Monasteries",
    imageUrls: ["/history.jpeg"],
    description:
      "The sacred valley's monasteries, carved into cliffsides — centuries of devotion answered by architectural ingenuity.",
    historicalContext:
      "A Christian refuge since the earliest centuries; Maronite monks established monasteries here from the 4th century onward.",
    aiHints: ["Qadisha monastery", "cliff dwelling"],
  },
  {
    id: "5",
    title: "Tyre, Queen of the Seas",
    imageUrls: ["/mission.jpeg"],
    description:
      "The greatest of the Phoenician cities, famed for its purple dye and its fleets — with Roman ruins that include a vast hippodrome.",
    historicalContext:
      "Tyre founded colonies across the Mediterranean, Carthage among them.",
    aiHints: ["Tyre ruins", "Roman hippodrome", "Phoenician city"],
  },
  {
    id: "6",
    title: "The Triple-Arch House",
    imageUrls: ["/hero.jpeg"],
    description:
      "The iconic architecture of the traditional Lebanese house — three arches, red tile, local stone masonry in harmony with the landscape.",
    historicalContext:
      "Houses of this kind are the heart of APSAD's work: around one hundred have been saved through the association's plans, drawings, and classifications.",
    aiHints: ["Lebanese house", "triple arch"],
  },
  {
    id: "7",
    title: "Hammam el-Jédid, Tripoli",
    imageUrls: ["/image-4.jpeg"],
    description:
      "The 18th-century bathhouse of Tripoli — domed chambers and stone arcades returned to light in one of APSAD's earliest restorations.",
    historicalContext:
      "Restored in 1964 with the Directorate General of Antiquities, four years after the association's founding.",
    aiHints: ["Tripoli hammam", "Ottoman bathhouse"],
  },
  {
    id: "8",
    title: "Khan al-Khayatin, Tripoli",
    imageUrls: ["/image-1.jpeg"],
    description:
      "The tailors' khan of old Tripoli — Mamluk commercial architecture serving as caravanserai and covered market on the historic trade routes.",
    historicalContext:
      "APSAD drew restoration studies for Khan al-Khayatin in 1965, a year after restoring Tripoli's 18th-century Hammam el-Jédid with the DGA.",
    aiHints: ["Tripoli khan", "Mamluk caravanserai"],
  },
];

const categories = ["All", "Roman", "Phoenician", "Monasteries", "Houses"];

/**
 * Bento span assignment — repeating 5-item pattern fills exactly 3 rows
 * in a 3-column grid (9 cells per group). Falls back to uniform 1×1
 * when there aren't enough remaining items to complete a group.
 */
function getBentoClass(index: number, total: number): string {
  const mod = index % 5;
  const remaining = total - index;

  // Large featured: 2 cols × 2 rows (4 cells)
  if (mod === 0 && remaining >= 5) return "md:col-span-2 md:row-span-2";
  // Tall portrait: 1 col × 2 rows (2 cells)
  if (mod === 2 && remaining >= 3) return "md:row-span-2";

  return "";
}

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
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
            The Catalogue
          </p>
          <SplitText as="h1" className="font-display uppercase tracking-[0.05em] text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
            The Sites
          </SplitText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            The places APSAD works for — temples and souks, monasteries and
            family houses, photographed as they deserve to be seen.
          </p>

          {/* Search & Filters */}
          <div className="max-w-xl mx-auto space-y-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search heritage sites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 py-5 text-sm bg-background border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 min-h-[44px] font-display text-[12px] uppercase tracking-[0.18em] transition-colors duration-200 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    selectedCategory === category
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <p className="text-[13px] text-muted-foreground">
              {isLoading
                ? "Loading..."
                : `${filteredItems.length} heritage site${filteredItems.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
      </section>

      {/* Bento Gallery Grid */}
      <section className="py-6 md:py-10">
        <div className="container max-w-[1400px] mx-auto px-3 md:px-6">
          {isLoading ? (
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-[3px]"
              style={{ gridAutoRows: "200px" }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`bg-secondary animate-pulse ${getBentoClass(i, 8)}`}
                />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl mb-4">
                No sites found
              </p>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-[13px] tracking-[0.1em] uppercase"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-[3px]"
              style={{ gridAutoRows: "200px", gridAutoFlow: "dense" }}
            >
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  data-cursor-label="View"
                  className={`group relative cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${getBentoClass(index, filteredItems.length)}`}
                  style={{ animation: `fade-up 0.5s ease-out ${index * 0.06}s both` }}
                  onClick={() => openModal(item)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(item); } }}
                >
                  {/* Image */}
                  <Image
                    src={item.imageUrls[0]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient + hover overlay (single layer to avoid double-darkening) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 group-hover:from-black/60 group-hover:via-black/20 group-hover:to-black/10 transition-all duration-500" />

                  {/* Catalog number */}
                  <span className="absolute top-3 left-3 text-white/60 text-[12px] font-medium tracking-[0.15em] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Image count badge */}
                  {item.imageUrls.length > 1 && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[11px] px-2 py-1 tracking-wide">
                      <Images className="h-3 w-3" />
                      {item.imageUrls.length}
                    </span>
                  )}

                  {/* Bottom info — always visible title, description on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3 className="font-display text-white text-sm md:text-base leading-tight drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-[12px] mt-1 line-clamp-1 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal — Editorial two-panel lightbox */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 overflow-hidden max-h-[90vh] gap-0 [&>button:last-child]:z-20 [&>button:last-child]:bg-black/50 [&>button:last-child]:text-white [&>button:last-child]:hover:bg-black/70 [&>button:last-child]:rounded-none [&>button:last-child]:right-3 [&>button:last-child]:top-3 [&>button:last-child]:h-10 [&>button:last-child]:w-10 [&>button:last-child]:flex [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:opacity-100">
            {/* Visually hidden title for accessibility */}
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedItem.title}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              {/* Left — Image viewer */}
              <div className="relative md:flex-1 bg-black min-h-[240px] md:min-h-0">
                <div className="relative w-full h-[50vh] md:h-full">
                  <Image
                    src={selectedItem.imageUrls[currentImageIndex]}
                    alt={`${selectedItem.title} — Image ${currentImageIndex + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="select-none"
                    key={selectedItem.imageUrls[currentImageIndex]}
                  />
                </div>

                {/* Image nav arrows */}
                {selectedItem.imageUrls.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {selectedItem.imageUrls.length > 1 && (
                  <span className="absolute bottom-3 left-3 text-white/70 text-[11px] tracking-[0.15em] tabular-nums bg-black/40 px-2.5 py-1">
                    {currentImageIndex + 1} / {selectedItem.imageUrls.length}
                  </span>
                )}
              </div>

              {/* Right — Info panel */}
              <div className="md:w-[340px] lg:w-[380px] flex flex-col border-l border-border bg-background overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                  {/* Title block */}
                  <div className="px-6 pt-6 pb-5 border-b border-border">
                    <p className="font-display text-[11px] uppercase tracking-[0.3em] text-primary mb-2">
                      Heritage Site
                    </p>
                    <h2 className="font-display text-xl md:text-2xl leading-tight">
                      {selectedItem.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="px-6 py-5 border-b border-border">
                    <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-muted-foreground mb-3">
                      Description
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Historical Context */}
                  <div className="px-6 py-5 border-b border-border">
                    <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-muted-foreground mb-3">
                      Historical Context
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {selectedItem.historicalContext}
                    </p>
                  </div>

                  {/* Thumbnail strip */}
                  {selectedItem.imageUrls.length > 1 && (
                    <div className="px-6 py-5">
                      <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-muted-foreground mb-3">
                        Gallery
                      </h4>
                      <div className="flex gap-[3px]">
                        {selectedItem.imageUrls.map((url, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`relative h-16 flex-1 overflow-hidden transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              i === currentImageIndex
                                ? "opacity-100 ring-2 ring-foreground"
                                : "opacity-40 hover:opacity-70"
                            }`}
                            aria-label={`View image ${i + 1}`}
                          >
                            <Image src={url} alt="" fill style={{ objectFit: "cover" }} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
