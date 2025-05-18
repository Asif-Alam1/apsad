
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
import type { Metadata } from 'next';

// Note: Page-specific metadata in client components is not directly supported.
// This metadata would ideally be in a parent server component or layout.
// For demonstration, if this were a server component:
// export const metadata: Metadata = {
//   title: 'Gallery - APSAD\'s Heritage Preservation Projects',
//   description: 'Explore a visual gallery of APSAD\'s diverse projects across Lebanon, showcasing the preservation of ancient ruins, traditional architecture, and natural sites.',
// };


const initialGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Project 1",
    imageUrls: [
      "https://placehold.co/800x600.png",
      "https://placehold.co/800x601.png",
      "https://placehold.co/800x602.png"
    ],
    description: "Project 1 description",
    historicalContext: "Project 1 context",
    aiHints: ["Baalbek temple", "Jupiter columns", "Roman carving"]
  },
  {
    id: "2",
    title: "Project 2",
    imageUrls: [
      "https://placehold.co/800x603.png",
      "https://placehold.co/800x604.png"
    ],
    description: "Project 2 description",
    historicalContext: "Project 2 context",
    aiHints: ["Byblos port", "Crusader castle"]
  },
  {
    id: "3",
    title: "Project 3",
    imageUrls: [
      "https://placehold.co/800x605.png",
      "https://placehold.co/800x606.png",
      "https://placehold.co/800x607.png",
      "https://placehold.co/800x608.png"
    ],
    description: "Project 3 description",
    historicalContext: "Project 3 context",
    aiHints: ["Anjar ruins", "Umayyad city", "Islamic architecture", "Anjar arches"]
  },
  {
    id: "4",
    title: "Project 4",
    imageUrls: [
      "https://placehold.co/800x609.png",
      "https://placehold.co/800x610.png"
    ],
    description: "Project 4 description",
    historicalContext: "Project 4 context",
    aiHints: ["Qadisha monastery", "cliff dwelling"]
  },
  {
    id: "5",
    title: "Project 5",
    imageUrls: [
      "https://placehold.co/800x611.png",
      "https://placehold.co/800x612.png",
      "https://placehold.co/800x613.png"
    ],
    description: "Project 5 description",
    historicalContext: "Project 5 context",
    aiHints: ["Tyre ruins", "Roman hippodrome", "Phoenician city"]
  },
  {
    id: "6",
    title: "Project 6",
    imageUrls: [
      "https://placehold.co/800x614.png",
      "https://placehold.co/800x615.png"
    ],
    description: "Project 6 description",
    historicalContext: "Project 6 context",
    aiHints: ["Lebanese house", "triple arch"]
  },
   {
    id: "7",
    title: "Project 7",
    imageUrls: [
      "https://placehold.co/800x616.png"
    ],
    description: "Project 7 description",
    historicalContext: "Project 7 context",
    aiHints: ["Roman aqueduct"]
  },
  {
    id: "8",
    title: "Project 8",
    imageUrls: [
      "https://placehold.co/800x617.png",
      "https://placehold.co/800x618.png",
      "https://placehold.co/800x619.png"
    ],
    description: "Project 8 description",
    historicalContext: "Project 8 context",
    aiHints: ["Tripoli khan", "Ottoman architecture", "Mamluk caravanserai"]
  },
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Simulate fetching data
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
                alt={`${selectedItem.title} - Image ${currentImageIndex + 1} of ${selectedItem.imageUrls.length}. ${selectedItem.description.substring(0,50)}...`}
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
