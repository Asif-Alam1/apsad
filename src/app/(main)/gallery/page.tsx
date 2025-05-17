
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryCard } from "@/components/gallery/gallery-card";
import type { GalleryItem } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, XIcon, ImageIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const initialGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Baalbek Temples",
    imageUrls: [
      "https://placehold.co/800x600.png",
      "https://placehold.co/800x601.png",
      "https://placehold.co/800x602.png"
    ],
    description: "Magnificent Roman temple complex in Lebanon's Beqaa Valley, showcasing some of the largest and best-preserved Roman architecture. This site includes towering columns, grand courtyards, and intricate carvings that speak to the power and artistry of the Roman Empire. It is a UNESCO World Heritage site and a testament to Lebanon's rich historical tapestry, attracting visitors and scholars from around the globe.",
    historicalContext: "Flourished during the Roman Empire, particularly from the 1st to 3rd centuries CE. Dedicated to Jupiter, Venus, and Bacchus.",
    aiHints: ["roman temple lebanon", "ancient ruins beqaa", "historical architecture"]
  },
  {
    id: "2",
    title: "Byblos Ancient Port",
    imageUrls: [
      "https://placehold.co/800x603.png",
      "https://placehold.co/800x604.png"
    ],
    description: "One of the oldest continuously inhabited cities, with layers of history from Neolithic times through the Crusades. Explore the ancient harbor, Crusader castle, and royal tombs. Byblos is renowned for its role in the development of the alphabet and its extensive trade links across the Mediterranean.",
    historicalContext: "A major Phoenician port city, crucial for trade (especially cedar wood and papyrus) throughout antiquity.",
    aiHints: ["ancient port ruins", "phoenician city byblos"]
  },
  {
    id: "3",
    title: "Anjar Umayyad Ruins",
    imageUrls: [
      "https://placehold.co/800x605.png",
      "https://placehold.co/800x606.png",
      "https://placehold.co/800x607.png",
      "https://placehold.co/800x608.png"
    ],
    description: "The unique ruins of an 8th-century Umayyad inland city, displaying a fortified layout with Roman-inspired Sasanian influences. Its well-preserved structures offer a glimpse into early Islamic urban planning and architecture, distinct from coastal settlements of the era.",
    historicalContext: "Built by Caliph Walid I in the early 8th century CE, it served as a commercial and palace center before being abandoned.",
    aiHints: ["islamic ruins city", "umayyad architecture anjar", "archaeological site lebanon"]
  },
  {
    id: "4",
    title: "Qadisha Valley Monasteries",
    imageUrls: [
      "https://placehold.co/800x609.png",
      "https://placehold.co/800x610.png"
    ],
    description: "A rugged, sacred valley housing some of the earliest Christian monastic communities in the world, carved into cliffs. The valley is also home to the Cedars of God forest, ancient trees that are a symbol of Lebanon. This UNESCO site is a place of spiritual retreat and natural beauty.",
    historicalContext: "A refuge for Christian communities since the early centuries of Christianity, particularly for Maronite monks.",
    aiHints: ["cliff monastery lebanon", "sacred valley qadisha"]
  },
  {
    id: "5",
    title: "Tyre Al-Mina Site",
    imageUrls: [
      "https://placehold.co/800x611.png",
      "https://placehold.co/800x612.png",
      "https://placehold.co/800x613.png"
    ],
    description: "Extensive archaeological site of the ancient Phoenician island city of Tyre, featuring Roman colonnades, a triumphal arch, and a vast necropolis. Discover the Roman hippodrome and harbor remains, indicative of Tyre's importance in maritime trade and Roman provincial life.",
    historicalContext: "A dominant Phoenician city-state, famed for its purple dye and maritime power. Later a significant Roman colony.",
    aiHints: ["roman ruins coast", "phoenician tyre lebanon", "archaeology south lebanon"]
  },
  {
    id: "6",
    title: "Traditional Lebanese House",
    imageUrls: [
      "https://placehold.co/800x614.png",
      "https://placehold.co/800x615.png"
    ],
    description: "Preservation projects focusing on vernacular architecture, characterized by stone walls, triple arches, and red-tiled roofs. These houses are an integral part of Lebanon's cultural fabric and landscape, representing centuries of local building traditions and adaptation to the environment.",
    historicalContext: "Reflects centuries of adaptation to local climate and materials, forming a key part of Lebanon's cultural landscape.",
    aiHints: ["traditional lebanese house", "vernacular architecture middle east"]
  },
   {
    id: "7",
    title: "Roman Aqueduct of Zouk Mosbeh",
    imageUrls: [
      "https://placehold.co/800x616.png"
    ],
    description: "Remains of a Roman-era aqueduct that once supplied water to ancient Berytus (Beirut). This impressive feat of engineering highlights Roman infrastructural prowess and their impact on the development of urban centers throughout the Levant.",
    historicalContext: "Part of the extensive infrastructure built during Roman rule in Lebanon to support urban centers.",
    aiHints: ["roman aqueduct lebanon"]
  },
  {
    id: "8",
    title: "Silk Khan in Tripoli",
    imageUrls: [
      "https://placehold.co/800x617.png",
      "https://placehold.co/800x618.png",
      "https://placehold.co/800x619.png"
    ],
    description: "A historic caravanserai (khan) from the Mamluk or Ottoman era, reflecting Tripoli's importance as a trading city. These khans were vital hubs for merchants and travelers, providing lodging, storage, and commercial space along ancient trade routes.",
    historicalContext: "Khans provided lodging and commercial space for merchants along trade routes, vital for economic activity.",
    aiHints: ["ottoman architecture khan", "tripoli lebanon history", "mamluk caravanserai"]
  },
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGalleryItems(initialGalleryItems);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);
  
  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedItem.imageUrls.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedItem.imageUrls.length) % selectedItem.imageUrls.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedItem) {
        if (event.key === "ArrowRight") {
          nextImage();
        } else if (event.key === "ArrowLeft") {
          prevImage();
        } else if (event.key === "Escape") {
          closeModal();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]); 


  return (
    <div className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6">
        <header className="text-center mb-16 md:mb-20">
          <ImageIcon className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
            A Glimpse Into Our Heritage
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the diverse range of Lebanese heritage sites and projects APSAD is passionately dedicated to preserving. Each image and story unveils a unique chapter of our collective past, meticulously cared for to inspire future generations.
          </p>
        </header>

        {galleryItems.length === 0 ? (
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="flex flex-col overflow-hidden h-full shadow-lg rounded-xl">
                <div className="relative w-full h-72 sm:h-80 md:h-96 bg-muted animate-pulse"></div>
                <CardHeader className="pb-2 pt-4">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md"></div>
                </CardHeader>
                <CardContent className="flex-grow pb-3 space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                  <div className="h-4 w-5/6 bg-muted animate-pulse rounded-md"></div>
                </CardContent>
                <CardFooter className="pt-2 pb-4">
                   <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} onClick={() => openModal(item)} />
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-3xl w-[95vw] p-0 !rounded-xl shadow-2xl bg-card overflow-y-auto max-h-[85vh] md:max-h-[90vh]">
            <DialogHeader className="p-4 sm:p-6 border-b bg-card sticky top-0 z-10">
              <DialogTitle className="text-2xl text-primary">{selectedItem.title}</DialogTitle>
              <DialogClose asChild>
                 <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                    <XIcon className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                 </Button>
              </DialogClose>
            </DialogHeader>
            
            <div className="relative aspect-[4/3] w-full bg-black/10">
              <Image
                src={selectedItem.imageUrls[currentImageIndex]}
                alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="contain"
                className="transition-opacity duration-300 ease-in-out"
                key={selectedItem.imageUrls[currentImageIndex]} 
                data-ai-hint={selectedItem.aiHints[currentImageIndex] || selectedItem.aiHints[0] || "historical detail"}
              />
              {selectedItem.imageUrls.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 h-10 w-10 sm:h-12 sm:w-12"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 h-10 w-10 sm:h-12 sm:w-12"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                  </Button>
                </>
              )}
            </div>
            
            <div className="p-4 sm:p-6 bg-card border-t">
              {selectedItem.imageUrls.length > 1 && (
                <p className="text-center text-sm text-muted-foreground mb-3">
                  Image {currentImageIndex + 1} of {selectedItem.imageUrls.length}
                </p>
              )}
              <ScrollArea className="max-h-40 sm:max-h-48 md:max-h-56">
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedItem.description}</p>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

