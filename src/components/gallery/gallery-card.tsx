import Image from "next/image";
import type { GalleryItem } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GalleryCardProps {
  item: GalleryItem;
}

export function GalleryCard({ item }: GalleryCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg">
      <div className="relative w-full h-64 sm:h-72 md:h-80">
        <Image
          src={item.imageUrl}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-105"
          data-ai-hint={item.aiHint}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <ScrollArea className="h-24">
            <p className="text-sm text-muted-foreground leading-relaxed pr-3">{item.description}</p>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <ScrollArea className="h-20">
            <p className="text-xs text-muted-foreground/80 italic pr-3">
                <strong>Historical Context:</strong> {item.historicalContext}
            </p>
        </ScrollArea>
      </CardFooter>
    </Card>
  );
}
