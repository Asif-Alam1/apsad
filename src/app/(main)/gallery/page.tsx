"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Search,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollZoom } from "@/components/ui/scroll-zoom";
import { SplitText } from "@/components/ui/split-text";

const initialGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Ancient Baalbek Temple Complex",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg", "/image-3.jpeg"],
    description:
      "Magnificent Roman temple complex featuring the Temple of Jupiter, one of the largest religious structures ever built. This UNESCO World Heritage site represents the pinnacle of Roman architectural achievement in the Eastern Mediterranean.",
    historicalContext:
      "Built during the 1st-3rd centuries CE, Baalbek was known as Heliopolis during Roman times. The complex includes the Temple of Jupiter, Temple of Bacchus, and Temple of Venus.",
    aiHints: ["Baalbek temple", "Jupiter columns", "Roman carving"],
  },
  {
    id: "2",
    title: "Historic Byblos Port City",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg"],
    description:
      "One of the world's oldest continuously inhabited cities, Byblos is the birthplace of the Phoenician alphabet and a crucial link in ancient Mediterranean trade networks.",
    historicalContext:
      "Dating back over 7,000 years, Byblos gave its name to the Bible (Biblos) due to its role in papyrus trade.",
    aiHints: ["Byblos port", "Crusader castle"],
  },
  {
    id: "3",
    title: "Anjar Umayyad Archaeological Site",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg", "/image-3.jpeg", "/image-4.jpeg"],
    description:
      "The only inland commercial city established by the Umayyad dynasty, representing a unique example of 8th-century urban planning and Islamic architecture in Lebanon.",
    historicalContext:
      "Founded by Caliph Walid I around 705 CE, Anjar served as a commercial hub on the trade route between Damascus and the Mediterranean coast.",
    aiHints: ["Anjar ruins", "Umayyad city", "Islamic architecture", "Anjar arches"],
  },
  {
    id: "4",
    title: "Qadisha Valley Monasteries",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg"],
    description:
      "Sacred valley housing ancient Christian monasteries carved into cliffsides, representing centuries of spiritual devotion and architectural ingenuity.",
    historicalContext:
      "The Qadisha Valley has been a Christian refuge since the early centuries of Christianity. Maronite monks established monasteries here from the 4th century onwards.",
    aiHints: ["Qadisha monastery", "cliff dwelling"],
  },
  {
    id: "5",
    title: "Ancient Tyre Archaeological Complex",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg", "/image-3.jpeg"],
    description:
      "Legendary Phoenician city known for its purple dye production and maritime prowess, featuring extensive Roman ruins including a massive hippodrome.",
    historicalContext:
      "Tyre was the greatest of Phoenician cities, founding colonies across the Mediterranean including Carthage.",
    aiHints: ["Tyre ruins", "Roman hippodrome", "Phoenician city"],
  },
  {
    id: "6",
    title: "Traditional Lebanese Architecture",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg"],
    description:
      "Exemplary traditional Lebanese house featuring the iconic triple arch design, showcasing local stone masonry and architectural harmony with the landscape.",
    historicalContext:
      "Traditional Lebanese architecture evolved over centuries, incorporating Ottoman, Arab, and Mediterranean influences.",
    aiHints: ["Lebanese house", "triple arch"],
  },
  {
    id: "7",
    title: "Roman Aqueduct System",
    imageUrls: ["/image-1.jpeg"],
    description:
      "Remarkable example of Roman hydraulic engineering, demonstrating the sophisticated water management systems that supplied ancient Lebanese cities.",
    historicalContext:
      "Roman aqueducts in Lebanon were engineering marvels that supplied water to major cities.",
    aiHints: ["Roman aqueduct"],
  },
  {
    id: "8",
    title: "Tripoli's Historic Khan",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg", "/image-3.jpeg"],
    description:
      "Magnificent example of Mamluk commercial architecture, serving as a trading center and caravanserai along historic trade routes.",
    historicalContext:
      "Built during the Mamluk period (13th-16th centuries), this khan represents the architectural and commercial heritage of medieval Tripoli.",
    aiHints: ["Tripoli khan", "Ottoman architecture", "Mamluk caravanserai"],
  },
];

const categories = ["All", "Temples", "Cities", "Monasteries", "Architecture"];

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

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          item.description.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [galleryItems, selectedCategory, searchQuery]);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => setSelectedItem(null);

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((i) => (i + 1) % selectedItem.imageUrls.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex(
        (i) => (i - 1 + selectedItem.imageUrls.length) % selectedItem.imageUrls.length
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-24 border-b border-border">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary mb-4 font-medium">
            Heritage Gallery
          </p>
          <SplitText as="h1" className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Our Work
          </SplitText>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Explore the diverse range of Lebanese heritage sites and projects
            APSAD is dedicated to preserving.
          </p>

          {/* Search & Filters */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search heritage sites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 py-5 text-sm bg-background border-border"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 text-[12px] uppercase tracking-[0.1em] font-medium transition-colors duration-300 border ${
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

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-[4/3] bg-secondary animate-pulse" />
                  <div className="mt-4 h-4 w-3/4 bg-secondary animate-pulse" />
                  <div className="mt-2 h-3 w-1/2 bg-secondary animate-pulse" />
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl font-bold mb-4">
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
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  style={{ animation: `fade-up 0.5s ease-out ${index * 0.06}s both` }}
                  onClick={() => openModal(item)}
                >
                  <ScrollZoom className="mb-4">
                    <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="text-white text-[12px] uppercase tracking-[0.15em] font-medium translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                          View Project
                        </span>
                      </div>
                      {item.imageUrls.length > 1 && (
                        <span className="absolute top-3 right-3 bg-black/60 text-white text-[11px] px-2 py-1 tracking-wide">
                          {item.imageUrls.length} images
                        </span>
                      )}
                    </div>
                  </ScrollZoom>
                  <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden max-h-[90vh] gap-0">
            <DialogHeader className="p-6 pb-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="font-serif text-2xl font-bold">
                    {selectedItem.title}
                  </DialogTitle>
                  {selectedItem.imageUrls.length > 1 && (
                    <p className="text-[13px] text-muted-foreground mt-1">
                      {currentImageIndex + 1} of {selectedItem.imageUrls.length} images
                    </p>
                  )}
                </div>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>

            {/* Image */}
            <div className="relative aspect-[16/10] w-full bg-secondary">
              <Image
                src={selectedItem.imageUrls[currentImageIndex]}
                alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                fill
                style={{ objectFit: "contain" }}
                key={selectedItem.imageUrls[currentImageIndex]}
              />
              {selectedItem.imageUrls.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Description */}
            <ScrollArea className="p-6 max-h-64">
              <div className="space-y-4">
                <div>
                  <h4 className="text-[13px] uppercase tracking-[0.1em] font-medium text-primary mb-2">
                    Description
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-[13px] uppercase tracking-[0.1em] font-medium text-primary mb-2">
                    Historical Context
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedItem.historicalContext}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
