export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  historicalContext: string;
  aiHint: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
}
