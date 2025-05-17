
import Image from "next/image";
import type { GalleryItem } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagesIcon } from "lucide-react"; // To indicate multiple images

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void; // To handle opening the modal
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
          src={item.imageUrls[0]} // Display the first image
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={item.aiHints[0] || "historical site"} // Use first hint or a default
        />
        {hasMultipleImages && (
          <div className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-md flex items-center gap-1 text-xs">
            <ImagesIcon className="h-4 w-4" />
            <span>{item.imageUrls.length}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <h3 className="text-lg font-semibold text-white Ddrop-shadow-md">{item.title}</h3>
        </div>
      </div>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-300">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <ScrollArea className="h-20 pr-1">
          <p className="text-sm text-muted-foreground leading-relaxed pr-2">{item.description}</p>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <ScrollArea className="h-16 pr-1">
          <p className="text-xs text-muted-foreground/70 italic pr-2">
            <strong>Context:</strong> {item.historicalContext}
          </p>
        </ScrollArea>
      </CardFooter>
    </Card>
  );
}
