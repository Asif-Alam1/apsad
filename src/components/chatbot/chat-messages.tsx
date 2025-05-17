"use client";

import type { ChatMessage } from "@/types";
import { ChatBubble } from "./chat-bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1 p-4 bg-muted/30" viewportRef={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 mb-4 justify-start">
            <Skeleton className="h-8 w-8 rounded-full bg-primary" />
            <Skeleton className="h-10 w-32 rounded-lg bg-card" />
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
