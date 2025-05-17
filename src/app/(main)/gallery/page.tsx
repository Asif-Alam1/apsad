import { GalleryCard } from "@/components/gallery/gallery-card";
import type { GalleryItem } from "@/types";

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "The Citadel of Ankor",
    imageUrl: "https://placehold.co/600x400.png",
    description: "A magnificent temple complex renowned for its intricate carvings and grand scale, representing the zenith of ancient Khmer architecture.",
    historicalContext: "Built in the 12th century as a state temple and capital city. It later transformed into a Buddhist temple.",
    aiHint: "ancient temple"
  },
  {
    id: "2",
    title: "Lost City of Eldoria",
    imageUrl: "https://placehold.co/600x400.png",
    description: "Ruins of an advanced civilization mysteriously abandoned centuries ago, featuring unique astronomical observatories.",
    historicalContext: "Flourished between 500 BCE and 200 CE. Known for its advanced understanding of mathematics and astronomy.",
    aiHint: "ruins city"
  },
  {
    id: "3",
    title: "The Sunken Library of Maris",
    imageUrl: "https://placehold.co/600x400.png",
    description: "An underwater archaeological site containing preserved scrolls and artifacts from a legendary coastal library.",
    historicalContext: "Lost to the sea in a cataclysmic earthquake around 300 CE. Yielded remarkably preserved organic materials.",
    aiHint: "underwater ruins"
  },
  {
    id: "4",
    title: "Sky Peaks Monastery",
    imageUrl: "https://placehold.co/600x400.png",
    description: "A remote mountain monastery accessible only by a treacherous path, home to ancient spiritual traditions.",
    historicalContext: "Established in the 8th century by ascetic monks seeking solitude and enlightenment. Contains rare manuscripts.",
    aiHint: "mountain monastery"
  },
  {
    id: "5",
    title: "Iron Hills Fortress",
    imageUrl: "https://placehold.co/600x400.png",
    description: "A formidable medieval fortress that withstood numerous sieges, showcasing advanced defensive architecture of its time.",
    historicalContext: "Constructed in the 14th century during a period of intense regional conflict. Key strategic military point.",
    aiHint: "medieval fortress"
  },
  {
    id: "6",
    title: "Whispering Caves Art",
    imageUrl: "https://placehold.co/600x400.png",
    description: "A network of caves containing prehistoric paintings depicting daily life, rituals, and extinct fauna.",
    historicalContext: "Paintings dated to be over 15,000 years old, offering insights into early human culture and environment.",
    aiHint: "cave paintings"
  },
   {
    id: "7",
    title: "The Grand Aqueduct",
    imageUrl: "https://placehold.co/600x400.png",
    description: "An engineering marvel of the ancient world, this aqueduct supplied water to a bustling metropolis for centuries.",
    historicalContext: "Constructed around 100 CE, showcasing Roman engineering principles adapted to local materials and terrain.",
    aiHint: "roman aqueduct"
  },
  {
    id: "8",
    title: "Silk Route Oasis City",
    imageUrl: "https://placehold.co/600x400.png",
    description: "Remains of a vibrant trading hub along the ancient Silk Route, reflecting a confluence of cultures.",
    historicalContext: "A key stopover from the 2nd century BCE to the 15th century CE, facilitating East-West trade and cultural exchange.",
    aiHint: "desert oasis"
  },
];

export default function GalleryPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Work</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the diverse range of heritage sites and projects APSAD is dedicated to preserving. Each tells a unique story of our past.
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
