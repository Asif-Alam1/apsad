"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, Sparkles, Zap, Star, Heart } from "lucide-react";
import type { ChatMessage } from "@/types";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { answerQuestionsAboutAPSAD } from "@/ai/flows/answer-questions-about-apsad";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Hello! 👋 I'm the APSAD Heritage Assistant. I'm here to help you learn more about our work preserving Lebanon's cultural treasures. How can I assist you today?",
            timestamp: Date.now(),
          },
        ]);
      }, 1500);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await answerQuestionsAboutAPSAD({ question: text });
      
      setTimeout(() => {
        setIsTyping(false);
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: response.answer,
          timestamp: Date.now(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsLoading(false);
      }, 1000 + Math.random() * 1000); // Simulate realistic response time
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setTimeout(() => {
        setIsTyping(false);
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "I apologize, but I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to contact us directly through our contact form. 🔧",
          timestamp: Date.now(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Enhanced Floating Button */}
        <SheetTrigger asChild>
          <div className="fixed bottom-6 right-6 z-50 group">
            {/* Pulse Animation Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-ping opacity-20" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse opacity-30" />
            
            {/* Main Button */}
            <Button
              variant="default"
              size="lg"
              className="relative h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-110 group"
              aria-label="Open APSAD Heritage Assistant"
            >
              <div className="relative">
                <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                
                {/* Notification Dot */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
            </Button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-xl shadow-xl border border-white/30 whitespace-nowrap">
                <p className="text-sm font-medium">Ask me about APSAD! 💬</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/90" />
                </div>
              </div>
            </div>
          </div>
        </SheetTrigger>

        {/* Enhanced Chat Interface */}
        <SheetContent
          side="right"
          className="w-full max-w-md p-0 flex flex-col h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border-white/30"
          aria-label="APSAD Heritage Assistant Chat"
        >
          {/* Enhanced Header */}
          <SheetHeader className="relative p-6 border-b border-white/20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
            
            <div className="relative z-10 flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full p-1 animate-pulse">
                  <div className="w-full h-full bg-white rounded-full" />
                </div>
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="h-7 w-7 text-white" />
                </div>
                
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="flex-1">
                <SheetTitle className="text-xl font-bold text-primary flex items-center gap-2">
                  APSAD Assistant
                  <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent text-xs">
                    <Zap className="h-2 w-2 mr-1" />
                    AI Powered
                  </Badge>
                </SheetTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Online • Heritage Expert
                </p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="relative z-10 flex gap-2 mt-4">
              <Badge variant="outline" className="bg-white/50 border-white/30 text-xs hover:bg-white/70 transition-colors duration-300 cursor-pointer">
                <Star className="h-2 w-2 mr-1" />
                Site Info
              </Badge>
              <Badge variant="outline" className="bg-white/50 border-white/30 text-xs hover:bg-white/70 transition-colors duration-300 cursor-pointer">
                <Heart className="h-2 w-2 mr-1" />
                Get Involved
              </Badge>
            </div>
          </SheetHeader>

          {/* Chat Messages */}
          <div className="flex-1 relative">
            <ChatMessages messages={messages} isLoading={isLoading} isTyping={isTyping} />
          </div>

          {/* Enhanced Input */}
          <div className="border-t border-white/20 bg-white/50 backdrop-blur-sm">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            
            {/* Footer Info */}
            <div className="px-4 pb-3">
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3 text-accent" />
                Powered by AI • Preserving Heritage Since 1960
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}