"use client";

import type { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Clock, CheckCheck } from "lucide-react";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user";
  const timeAgo = new Date(message.timestamp);
  const formattedTime = timeAgo.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div
      className={cn(
        "flex items-start gap-3 mb-6 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="relative flex-shrink-0">
          <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-accent text-white shadow-lg ring-2 ring-white/50 group-hover:scale-105 transition-transform duration-300">
            <AvatarFallback className="bg-transparent">
              <Bot className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          
          {/* Online Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm">
            <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* Message Container */}
      <div className={cn(
        "flex flex-col max-w-[75%] min-w-0",
        isUser ? "items-end" : "items-start"
      )}>
        {/* Sender Label */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-1 px-1">
            <span className="text-xs font-medium text-primary">APSAD Assistant</span>
            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs px-2 py-0">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />
              Online
            </Badge>
          </div>
        )}
        
        {/* Message Bubble */}
        <div
          className={cn(
            "relative rounded-2xl p-4 shadow-lg backdrop-blur-sm border transition-all duration-300 group-hover:shadow-xl",
            isUser
              ? "bg-gradient-to-r from-primary to-accent text-white rounded-br-md border-primary/20 shadow-primary/20"
              : "bg-gradient-to-r from-white/90 to-white/70 text-foreground rounded-bl-md border-white/30"
          )}
        >
          {/* Message Text */}
          <p className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap",
            isUser ? "text-white" : "text-foreground"
          )}>
            {message.text}
          </p>
          
          {/* Message Decorations for Bot */}
          {!isUser && (
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
          )}
          
          {/* User Message Decorations */}
          {isUser && (
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          )}
        </div>
        
        {/* Message Footer */}
        <div className={cn(
          "flex items-center gap-2 mt-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          isUser ? "flex-row-reverse" : "flex-row"
        )}>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formattedTime}</span>
          </div>
          
          {isUser && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCheck className="h-3 w-3 text-green-500" />
              <span>Delivered</span>
            </div>
          )}
          
          {!isUser && (
            <Badge variant="outline" className="bg-white/50 border-white/30 text-xs px-2 py-0">
              AI Response
            </Badge>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="relative flex-shrink-0">
          <Avatar className="h-10 w-10 bg-gradient-to-br from-accent to-primary text-white shadow-lg ring-2 ring-white/50 group-hover:scale-105 transition-transform duration-300">
            <AvatarFallback className="bg-transparent">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          
          {/* Active Status for User */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm">
            <div className="w-full h-full bg-blue-400 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}