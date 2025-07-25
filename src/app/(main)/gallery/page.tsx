"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryCard } from "@/components/gallery/gallery-card";
import type { GalleryItem } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, XIcon, ImageIcon, Filter, Grid3X3, Grid2X2, LayoutGrid, Search, Eye, Heart, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const initialGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Ancient Baalbek Temple Complex",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg", "/image-3.jpeg"],
    description: "Magnificent Roman temple complex featuring the Temple of Jupiter, one of the largest religious structures ever built. This UNESCO World Heritage site represents the pinnacle of Roman architectural achievement in the Eastern Mediterranean.",
    historicalContext: "Built during the 1st-3rd centuries CE, Baalbek was known as Heliopolis during Roman times. The complex includes the Temple of Jupiter, Temple of Bacchus, and Temple of Venus, showcasing extraordinary engineering prowess.",
    aiHints: ["Baalbek temple", "Jupiter columns", "Roman carving"]
  },
  {
    id: "2",
    title: "Historic Byblos Port City",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg"],
    description: "One of the world's oldest continuously inhabited cities, Byblos is the birthplace of the Phoenician alphabet and a crucial link in ancient Mediterranean trade networks.",
    historicalContext: "Dating back over 7,000 years, Byblos gave its name to the Bible (Biblos) due to its role in papyrus trade. The site contains remains from Neolithic, Chalcolithic, Bronze Age, and subsequent periods.",
    aiHints: ["Byblos port", "Crusader castle"]
  },
  {
    id: "3",
    title: "Anjar Umayyad Archaeological Site",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg", "/image-3.jpeg", "/image-4.jpeg"],
    description: "The only inland commercial city established by the Umayyad dynasty, representing a unique example of 8th-century urban planning and Islamic architecture in Lebanon.",
    historicalContext: "Founded by Caliph Walid I around 705 CE, Anjar served as a commercial hub on the trade route between Damascus and the Mediterranean coast. Its grid pattern reflects both Roman and Islamic urban planning principles.",
    aiHints: ["Anjar ruins", "Umayyad city", "Islamic architecture", "Anjar arches"]
  },
  {
    id: "4",
    title: "Qadisha Valley Monasteries",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg"],
    description: "Sacred valley housing ancient Christian monasteries carved into cliffsides, representing centuries of spiritual devotion and architectural ingenuity.",
    historicalContext: "The Qadisha Valley has been a Christian refuge since the early centuries of Christianity. Maronite monks established monasteries here from the 4th century onwards, creating a unique monastic landscape.",
    aiHints: ["Qadisha monastery", "cliff dwelling"]
  },
  {
    id: "5",
    title: "Ancient Tyre Archaeological Complex",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg", "/image-3.jpeg"],
    description: "Legendary Phoenician city known for its purple dye production and maritime prowess, featuring extensive Roman ruins including a massive hippodrome.",
    historicalContext: "Tyre was the greatest of Phoenician cities, founding colonies across the Mediterranean including Carthage. The Roman period left impressive monuments including baths, aqueducts, and the renowned hippodrome.",
    aiHints: ["Tyre ruins", "Roman hippodrome", "Phoenician city"]
  },
  {
    id: "6",
    title: "Traditional Lebanese Architecture",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg"],
    description: "Exemplary traditional Lebanese house featuring the iconic triple arch design, showcasing local stone masonry and architectural harmony with the landscape.",
    historicalContext: "Traditional Lebanese architecture evolved over centuries, incorporating Ottoman, Arab, and Mediterranean influences. The triple arch (thalatha arches) became a distinctive feature of Lebanese vernacular architecture.",
    aiHints: ["Lebanese house", "triple arch"]
  },
  {
    id: "7",
    title: "Roman Aqueduct System",
    imageUrls: ["/image-1.jpeg"],
    description: "Remarkable example of Roman hydraulic engineering, demonstrating the sophisticated water management systems that supplied ancient Lebanese cities.",
    historicalContext: "Roman aqueducts in Lebanon were engineering marvels that supplied water to major cities. These structures showcase the Romans' mastery of hydraulic engineering and their lasting impact on the region's infrastructure.",
    aiHints: ["Roman aqueduct"]
  },
  {
    id: "8",
    title: "Tripoli's Historic Khan",
    imageUrls: ["/image-1.jpeg", "/image-2.jpeg", "/image-3.jpeg"],
    description: "Magnificent example of Mamluk commercial architecture, serving as a trading center and caravanserai along historic trade routes.",
    historicalContext: "Built during the Mamluk period (13th-16th centuries), this khan represents the architectural and commercial heritage of medieval Tripoli. It served merchants traveling along the Silk Road and Mediterranean trade networks.",
    aiHints: ["Tripoli khan", "Ottoman architecture", "Mamluk caravanserai"]
  },
];

const categories = ["All", "Temples", "Cities", "Monasteries", "Architecture"];
const viewModes = [
  { icon: Grid3X3, mode: "grid-3", label: "3 Columns" },
  { icon: Grid2X2, mode: "grid-2", label: "2 Columns" },
  { icon: LayoutGrid, mode: "masonry", label: "Masonry" },
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid-3");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGalleryItems(initialGalleryItems);
      setFilteredItems(initialGalleryItems);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = galleryItems;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        item.description.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(item =>
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

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedItem) {
        if (event.key === "ArrowRight") nextImage();
        else if (event.key === "ArrowLeft") prevImage();
        else if (event.key === "Escape") closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const getGridClass = () => {
    switch (viewMode) {
      case "grid-2": return "grid-cols-1 lg:grid-cols-2";
      case "grid-3": return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
      case "masonry": return "columns-1 md:columns-2 xl:columns-3 space-y-6";
      default: return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
      
      <div className="py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Enhanced Header */}
          <header className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 group hover:bg-primary/20 transition-all duration-300">
              <ImageIcon className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Heritage Gallery</span>
              <Star className="h-3 w-3 text-accent" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Heritage
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl mt-2 text-foreground">
                Collection
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Explore the diverse range of Lebanese heritage sites and projects APSAD is passionately dedicated to preserving. 
              Each image and story unveils a unique chapter of our collective past, meticulously cared for to inspire future generations.
            </p>

            {/* Enhanced Controls */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search heritage sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-white/30 rounded-full focus:bg-white/90 transition-all duration-300 shadow-lg"
                />
              </div>

              {/* Filters and View Controls */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-6 py-2 transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105"
                          : "bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* View Mode Controls */}
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full p-1 border border-white/30">
                  {viewModes.map((mode) => (
                    <Button
                      key={mode.mode}
                      variant={viewMode === mode.mode ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode(mode.mode)}
                      className={`rounded-full p-2 transition-all duration-300 ${
                        viewMode === mode.mode
                          ? "bg-primary text-white shadow-md"
                          : "hover:bg-white/50"
                      }`}
                      title={mode.label}
                    >
                      <mode.icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Results Counter */}
              <div className="text-center">
                <Badge variant="outline" className="bg-white/70 backdrop-blur-sm border-white/30 px-4 py-2 text-sm">
                  {isLoading ? "Loading..." : `${filteredItems.length} heritage sites`}
                </Badge>
              </div>
            </div>
          </header>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className={`grid ${getGridClass()} gap-8 md:gap-10`}>
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="group relative bg-white/70 backdrop-blur-sm border-white/30 rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative w-full h-80 bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" />
                  <CardHeader className="pb-3 pt-6">
                    <div className="h-6 w-3/4 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse rounded-lg" />
                    <div className="h-4 w-1/2 bg-primary/10 animate-pulse rounded-lg mt-2" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-4 w-full bg-muted/30 animate-pulse rounded" />
                    <div className="h-4 w-5/6 bg-muted/30 animate-pulse rounded" />
                    <div className="h-4 w-4/6 bg-muted/30 animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={viewMode === "masonry" ? getGridClass() : `grid ${getGridClass()} gap-8 md:gap-10`}>
              {filteredItems.map((item) => (
                <div key={item.id} className={viewMode === "masonry" ? "break-inside-avoid mb-6" : ""}>
                  <Card className="group relative bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl cursor-pointer overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image Container */}
                    <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden" onClick={() => openModal(item)}>
                      <Image
                        src={item.imageUrls[0]}
                        alt={`Preview of ${item.title}`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        data-ai-hint={item.aiHints[0] || "historical site"}
                      />
                      
                      {/* Overlay Elements */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                      
                      {/* Multiple Images Badge */}
                      {item.imageUrls.length > 1 && (
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full flex items-center gap-1 text-xs font-medium border border-white/30">
                          <ImageIcon className="h-3 w-3" />
                          <span>{item.imageUrls.length}</span>
                        </div>
                      )}
                      
                      {/* View Details on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <CardHeader className="pb-3 pt-6 relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                          className="ml-2 p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                        >
                          <Heart 
                            className={`h-5 w-5 transition-all duration-300 ${
                              favorites.includes(item.id) 
                                ? "fill-red-500 text-red-500 scale-110" 
                                : "text-muted-foreground hover:text-red-400"
                            }`}
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-6 relative z-10">
                      <p className="text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                        {item.description}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="pt-0 pb-6 relative z-10">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent">
                            {item.historicalContext.split('.')[0].substring(0, 20)}...
                          </Badge>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 rounded-full">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-white/30 max-w-lg mx-auto">
                <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-4">No sites found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria to discover more heritage sites.
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="rounded-full">
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 rounded-3xl shadow-2xl bg-white/95 backdrop-blur-xl border border-white/30 overflow-hidden max-h-[90vh]">
            {/* Modal Header */}
            <DialogHeader className="p-6 border-b border-white/20 bg-gradient-to-r from-primary/5 to-accent/5 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {selectedItem.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent">
                      Heritage Site
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                      {selectedItem.imageUrls.length} Images
                    </Badge>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-sm transition-all duration-300">
                    <XIcon className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>
            
            {/* Image Viewer */}
            <div className="relative aspect-[16/10] w-full bg-black/5">
              <Image
                src={selectedItem.imageUrls[currentImageIndex]}
                alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                fill
                style={{ objectFit: "contain" }}
                className="transition-all duration-500 ease-out"
                key={selectedItem.imageUrls[currentImageIndex]}
                data-ai-hint={selectedItem.aiHints[currentImageIndex] || selectedItem.aiHints[0] || "historical detail"}
              />
              
              {/* Navigation Controls */}
              {selectedItem.imageUrls.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm h-12 w-12 transition-all duration-300"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-7 w-7" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm h-12 w-12 transition-all duration-300"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-7 w-7" />
                  </Button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                    {currentImageIndex + 1} of {selectedItem.imageUrls.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Content */}
            <ScrollArea className="p-6 max-h-80">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-3">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedItem.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-3">Historical Context</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedItem.historicalContext}</p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}