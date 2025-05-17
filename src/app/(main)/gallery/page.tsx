import { GalleryCard } from "@/components/gallery/gallery-card";
import type { GalleryItem } from "@/types";

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Baalbek Temples",
    imageUrl: "https://placehold.co/600x400.png",
    description: "Magnificent Roman temple complex in Lebanon's Beqaa Valley, showcasing some of the largest and best-preserved Roman architecture.",
    historicalContext: "Flourished during the Roman Empire, particularly from the 1st to 3rd centuries CE. Dedicated to Jupiter, Venus, and Bacchus.",
    aiHint: "roman temple lebanon"
  },
  {
    id: "2",
    title: "Byblos Ancient Port",
    imageUrl: "https://placehold.co/600x400.png",
    description: "One of the oldest continuously inhabited cities, with layers of history from Neolithic times through the Crusades.",
    historicalContext: "A major Phoenician port city, crucial for trade (especially cedar wood and papyrus) throughout antiquity.",
    aiHint: "ancient port ruins"
  },
  {
    id: "3",
    title: "Anjar Umayyad Ruins",
    imageUrl: "https://placehold.co/600x400.png",
    description: "The unique ruins of an 8th-century Umayyad inland city, displaying a fortified layout with Roman-inspired Sasanian influences.",
    historicalContext: "Built by Caliph Walid I in the early 8th century CE, it served as a commercial and palace center before being abandoned.",
    aiHint: "islamic ruins city"
  },
  {
    id: "4",
    title: "Qadisha Valley Monasteries",
    imageUrl: "https://placehold.co/600x400.png",
    description: "A rugged, sacred valley housing some of the earliest Christian monastic communities in the world, carved into cliffs.",
    historicalContext: "A refuge for Christian communities since the early centuries of Christianity, particularly for Maronite monks.",
    aiHint: "cliff monastery lebanon"
  },
  {
    id: "5",
    title: "Tyre Al-Mina Site",
    imageUrl: "https://placehold.co/600x400.png",
    description: "Extensive archaeological site of the ancient Phoenician island city of Tyre, featuring Roman colonnades, a triumphal arch, and a vast necropolis.",
    historicalContext: "A dominant Phoenician city-state, famed for its purple dye and maritime power. Later a significant Roman colony.",
    aiHint: "roman ruins coast"
  },
  {
    id: "6",
    title: "Traditional Lebanese House",
    imageUrl: "https://placehold.co/600x400.png",
    description: "Preservation projects focusing on vernacular architecture, characterized by stone walls, triple arches, and red-tiled roofs.",
    historicalContext: "Reflects centuries of adaptation to local climate and materials, forming a key part of Lebanon's cultural landscape.",
    aiHint: "traditional lebanese house"
  },
   {
    id: "7",
    title: "Roman Aqueduct of Zouk Mosbeh",
    imageUrl: "https://placehold.co/600x400.png",
    description: "Remains of a Roman-era aqueduct that once supplied water to ancient Berytus (Beirut).",
    historicalContext: "Part of the extensive infrastructure built during Roman rule in Lebanon to support urban centers.",
    aiHint: "roman aqueduct lebanon"
  },
  {
    id: "8",
    title: "Silk Khan in Tripoli",
    imageUrl: "https://placehold.co/600x400.png",
    description: "A historic caravanserai (khan) from the Mamluk or Ottoman era, reflecting Tripoli's importance as a trading city.",
    historicalContext: "Khans provided lodging and commercial space for merchants along trade routes, vital for economic activity.",
    aiHint: "ottoman architecture khan"
  },
];

export default function GalleryPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Gallery of Our Work</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the diverse range of Lebanese heritage sites and projects APSAD is dedicated to preserving. Each tells a unique story of our past.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
