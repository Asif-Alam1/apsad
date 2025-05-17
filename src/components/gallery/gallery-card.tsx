
import Image from "next/image";
import type { GalleryItem } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagesIcon } from "lucide-react"; 

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void; 
}

export function GalleryCard({ item, onClick }: GalleryCardProps) {
  const hasMultipleImages = item.imageUrls.length > 1;

  return (
    <Card 
      className="flex flex-col overflow-hidden h-full shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out rounded-xl cursor-pointer group bg-card"
      onClick={onClick}
    >
      <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden">
        <Image
          src={item.imageUrls[0]} 
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={item.aiHints[0] || "historical site"} 
        />
        {hasMultipleImages && (
          <div className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-md flex items-center gap-1 text-xs">
            <ImagesIcon className="h-4 w-4" />
            <span>{item.imageUrls.length}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <h3 className="text-lg font-semibold text-white drop-shadow-md">{item.title}</h3>
        </div>
      </div>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-300">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        {/* Use line-clamp for the description on the card */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        {/* Historical context can remain as is, or also be clamped if it tends to be long */}
        <p className="text-xs text-muted-foreground/70 italic line-clamp-2">
          <strong>Context:</strong> {item.historicalContext}
        </p>
      </CardFooter>
    </Card>
  );
}
