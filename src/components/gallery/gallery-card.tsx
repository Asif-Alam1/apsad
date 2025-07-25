import Image from "next/image";
import type { GalleryItem } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImagesIcon, Eye, Heart, Clock, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function GalleryCard({ item, onClick, isFavorite = false, onToggleFavorite }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasMultipleImages = item.imageUrls.length > 1;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.();
  };

  return (
    <Card 
      className="group relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border border-white/30 hover:from-white/95 hover:to-white/85 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl cursor-pointer overflow-hidden rounded-2xl"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.title}`}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-1000" />
      
      {/* Image Container with Advanced Effects */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden">
        {/* Loading Shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 animate-pulse" />
        )}
        
        <Image
          src={item.imageUrls[0]}
          alt={`Preview of ${item.title} - ${item.description.substring(0, 70)}...`}
          fill
          style={{ objectFit: "cover" }}
          className={`transition-all duration-700 group-hover:scale-110 ${isHovered ? 'group-hover:rotate-1' : ''} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          data-ai-hint={item.aiHints[0] || "historical site"}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
        
        {/* Top Right Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {hasMultipleImages && (
            <div className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full flex items-center gap-1 text-xs font-medium border border-white/30 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
              <ImagesIcon className="h-3 w-3" />
              <span>{item.imageUrls.length}</span>
            </div>
          )}
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
            style={{ transitionDelay: '100ms' }}
          >
            <Heart 
              className={`h-4 w-4 transition-all duration-300 ${
                isFavorite 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "text-white hover:text-red-400"
              }`}
            />
          </Button>
        </div>
        
        {/* Bottom Left Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <MapPin className="h-3 w-3" />
            <span>Lebanon</span>
            <Clock className="h-3 w-3 ml-2" />
            <span>Ancient Heritage</span>
          </div>
        </div>
        
        {/* Center View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 transform scale-50 group-hover:scale-100 transition-all duration-500 flex items-center gap-2">
            <Eye className="h-5 w-5 text-white" />
            <span className="text-white text-sm font-medium hidden sm:block">View Details</span>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="relative z-10">
        <CardHeader className="pb-3 pt-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight">
                {item.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary text-xs">
                  <Sparkles className="h-2 w-2 mr-1" />
                  Heritage Site
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors duration-300">
            {item.description}
          </p>
        </CardContent>
        
        <CardFooter className="pt-0 pb-6">
          <div className="w-full space-y-3">
            {/* Historical Context Preview */}
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-1 h-12 bg-gradient-to-b from-primary to-accent rounded-full mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-accent mb-1">Historical Context</p>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.historicalContext}
                </p>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="flex items-center justify-between pt-2 border-t border-white/20">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Est. reading: 2 min</span>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-primary hover:bg-primary/10 rounded-full flex items-center gap-1 text-xs font-medium"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </div>
      
      {/* Shimmer Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shimmer" 
             style={{
               animation: isHovered ? 'shimmer 1.5s ease-out' : 'none'
             }} />
      </div>
    </Card>
  );
}

// Add to your global CSS for the shimmer effect
const shimmerStyle = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(12deg);
  }
  100% {
    transform: translateX(300%) skewX(12deg);
  }
}
`;