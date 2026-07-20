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
            The Photographic Archive
          </p>
          <SplitText as="h1" className="font-display uppercase tracking-[0.05em] text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
            The Sites
          </SplitText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Souks and khans, palaces and villages — from the association&apos;s
            own archive, photographed by APSAD&apos;s surveyors across sixty-five
            years of fieldwork.
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
