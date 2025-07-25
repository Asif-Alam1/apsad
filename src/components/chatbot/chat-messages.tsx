"use client";

import type { ChatMessage } from "@/types";
import { ChatBubble } from "./chat-bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isTyping?: boolean;
}

// Typing Indicator Component
function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-4 justify-start animate-fade-in">
      <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-accent text-white shadow-lg">
        <AvatarFallback className="bg-transparent">
          <Bot className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      
      <div className="bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm text-foreground rounded-2xl rounded-bl-md p-4 shadow-lg border border-white/30 max-w-[70%]">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground mr-2">APSAD Assistant is typing</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatMessages({ messages, isLoading, isTyping = false }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ 
        top: scrollAreaRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  }, [messages, isTyping]);

  return (
    <div className="relative h-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background/50 to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
      
      <ScrollArea className="h-full p-4 relative z-10" viewportRef={scrollAreaRef}>
        <div className="space-y-4">
          {/* Welcome Message for Empty State */}
          {messages.length === 0 && !isTyping && (
            <div className="text-center py-8">
              <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Welcome to APSAD Chat
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I'm here to help you learn about Lebanon's heritage preservation. Ask me anything!
                </p>
              </div>
            </div>
          )}
          
          {/* Chat Messages */}
          {messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ChatBubble message={msg} />
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}
        </div>
        
        {/* Scroll to bottom indicator when there are many messages */}
        {messages.length > 5 && (
          <div className="sticky bottom-4 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30 shadow-lg">
              <p className="text-xs text-muted-foreground">
                Scroll down for latest messages
              </p>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}