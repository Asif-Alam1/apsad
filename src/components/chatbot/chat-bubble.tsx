import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Bot, MessageCircle, Sparkles, Zap, Star, Heart, Send, Mic, Paperclip, Smile, X, Plus, Minus } from "lucide-react";
import type { ChatMessage } from "@/types";

const quickActions = [
  { label: "About APSAD", icon: Star, color: "from-blue-500 to-cyan-500" },
  { label: "How to Help", icon: Heart, color: "from-purple-500 to-pink-500" },
  { label: "Heritage Sites", icon: MessageCircle, color: "from-green-500 to-emerald-500" },
  { label: "Contact Info", icon: Zap, color: "from-orange-500 to-red-500" }
];

const ChatBubble = ({ message, isTyping = false }:any) => {
  const isUser = message?.sender === "user";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (isTyping) {
    return (
      <div className="flex items-start gap-3 mb-6">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </div>
        <div className="glass-gradient backdrop-blur-sm rounded-2xl rounded-bl-md p-4 shadow-lg border border-white/30">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">APSAD Assistant is typing</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"} ${
      isVisible ? "animate-slide-up-fade" : "opacity-0"
    }`}>
      {!isUser && (
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
            <div className="w-full h-full bg-green-400 rounded-full animate-ping" />
          </div>
        </div>
      )}
      
      <div className={`group relative max-w-[75%] ${isUser ? "order-first" : ""}`}>
        <div className={`relative rounded-2xl p-4 shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
          isUser
            ? "bg-gradient-to-r from-primary to-accent text-white rounded-br-md border-primary/20"
            : "glass-gradient text-foreground rounded-bl-md border-white/30"
        }`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
          
          {/* Message decorations */}
          <div className={`absolute -bottom-2 ${isUser ? "-right-2" : "-left-2"} w-4 h-4 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 ${
            isUser ? "bg-accent" : "bg-primary"
          }`} />
        </div>
        
        <div className={`flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-muted-foreground ${
          isUser ? "flex-row-reverse" : ""
        }`}>
          <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      
      {isUser && (
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-sm">You</span>
          </div>
        </div>
      )}
    </div>
  );
};

