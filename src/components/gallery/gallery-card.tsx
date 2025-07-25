import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Clock, MapPin, Sparkles, ArrowRight, Star, Zap, Camera } from "lucide-react";

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function GalleryCard({ item, onClick, isFavorite = false, onToggleFavorite }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const hasMultipleImages = item.imageUrls.length > 1;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current && isHovered) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x: x * 10, y: y * 10 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.();
    
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <Card 
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-700 hover:scale-[1.02]"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)` : 'none',
        transition: 'transform 0.3s ease-out'
      }}
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Animated Orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:animate-float-advanced" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:animate-float-advanced" style={{ animationDelay: '0.5s' }} />
      
      {/* Image Container with Advanced Effects */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden z-10">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton-shimmer" />
        )}
        
        {/* Main Image */}
        <Image
          src={item.imageUrls[0]}
          alt={`Preview of ${item.title}`}
          fill
          style={{ objectFit: "cover" }}
          className={`transition-all duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'}`}
          onLoad={() => setImageLoaded(true)}
          data-ai-hint={item.aiHints[0] || "historical site"}
        />
        
        {/* Advanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-40 transition-all duration-1000 mix-blend-overlay" />
        
        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          {hasMultipleImages && (
            <div className="glass-gradient backdrop-blur-md text-white px-3 py-2 rounded-full flex items-center gap-2 text-sm font-medium border border-white/30 transform translate-x-20 group-hover:translate-x-0 transition-all duration-500">
              <Camera className="h-4 w-4" />
              <span>{item.imageUrls.length}</span>
            </div>
          )}
          
          {/* Enhanced Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className="relative p-3 rounded-full glass-gradient backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-500 transform translate-x-20 group-hover:translate-x-0 overflow-hidden"
            style={{ transitionDelay: '100ms' }}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-500 relative z-10 ${
                isFavorite 
                  ? "fill-red-500 text-red-500 scale-110 animate-pulse-glow" 
                  : "text-white hover:text-red-400 hover:scale-125"
              }`}
            />
            {isFavorite && (
              <div className="absolute inset-0 bg-red-500/20 animate-ping" />
            )}
          </Button>
        </div>
        
        {/* Title Overlay with Parallax */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 z-20"
          style={{
            transform: `translateY(${isHovered ? '0' : '100%'}) translateZ(20px)`,
            transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          }}
        >
          <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg animate-fade-in-up">
            {item.title}
          </h3>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Lebanon</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Ancient Heritage</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Featured</span>
            </div>
          </div>
        </div>
        
        {/* Interactive View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-xl scale-150 animate-pulse" />
            <div className="relative glass-gradient backdrop-blur-md rounded-full p-5 border border-white/40 transform scale-0 group-hover:scale-100 transition-all duration-700 hover:scale-110">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/20 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/20 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      </div>
      
      {/* Enhanced Card Content */}
      <div className="relative z-10 p-6 space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-2xl font-bold text-primary group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                {item.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="glass-gradient backdrop-blur-sm border-primary/20 text-primary text-xs px-3 py-1 rounded-full">
                  <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                  Heritage Site
                </Badge>
                <Badge variant="outline" className="glass-gradient backdrop-blur-sm border-accent/20 text-accent text-xs px-3 py-1 rounded-full">
                  <Zap className="h-3 w-3 mr-1" />
                  Protected
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <p className="text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors duration-500">
            {item.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-0">
          <div className="w-full space-y-4">
            {/* Historical Context Preview */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/20 group-hover:border-white/40 transition-all duration-500">
              <div className="flex-shrink-0 w-1 h-12 bg-gradient-to-b from-primary to-accent rounded-full animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-accent mb-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Historical Context
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.historicalContext}
                </p>
              </div>
            </div>
            
            {/* Action Area */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-white" />
                  ))}
                </div>
                <span>+12 interested</span>
              </div>
              
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-primary hover:bg-primary/10 rounded-full flex items-center gap-2 text-sm font-semibold px-4 py-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500"
              >
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30">
        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shimmer" />
      </div>
    </Card>
  );
}