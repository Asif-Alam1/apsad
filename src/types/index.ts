
export interface GalleryItem {
  id: string;
  title: string;
  imageUrls: string[]; // Changed from imageUrl to imageUrls
  description: string;
  historicalContext: string;
  aiHints: string[]; // Changed from aiHint to aiHints
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
}
