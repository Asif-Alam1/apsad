"use client";

import { useState, type FormEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Paperclip, Smile, Sparkles, Zap } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const quickSuggestions = [
  "Tell me about APSAD's mission",
  "How can I volunteer?",
  "What heritage sites do you preserve?",
  "How to become a member?"
];

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSendMessage(suggestion);
  };

  useEffect(() => {
    if (!inputValue && isFocused) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, isFocused]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative p-4 space-y-3">
      {/* Quick Suggestions */}
      {showSuggestions && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Quick questions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer bg-white/70 border-white/30 hover:bg-white/90 transition-all duration-300 hover:scale-105 text-xs py-1 px-3"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center gap-2 p-2 bg-white/80 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ${
          isFocused 
            ? "border-primary shadow-lg scale-[1.02] bg-white/90" 
            : "border-white/30 hover:border-white/50"
        }`}>
          {/* Decorative Elements */}
          {isFocused && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 -z-10 animate-pulse" />
          )}
          
          {/* Additional Action Buttons */}
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 transition-colors duration-300"
              disabled={isLoading}
            >
              <Paperclip className="h-4 w-4 text-muted-foreground hover:text-primary" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 transition-colors duration-300"
              disabled={isLoading}
            >
              <Smile className="h-4 w-4 text-muted-foreground hover:text-primary" />
            </Button>
          </div>

          {/* Main Input */}
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask about APSAD's heritage work..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1 border-0 bg-transparent focus:ring-0 focus:ring-offset-0 placeholder:text-muted-foreground/70 text-sm"
            aria-label="Type your message to the APSAD assistant"
          />

          {/* Voice Input Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 transition-colors duration-300"
            disabled={isLoading}
          >
            <Mic className="h-4 w-4 text-muted-foreground hover:text-accent" />
          </Button>

          {/* Send Button */}
          <Button 
            type="submit" 
            size="sm" 
            disabled={isLoading || !inputValue.trim()}
            className={`h-10 w-10 p-0 rounded-full transition-all duration-300 ${
              inputValue.trim() 
                ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 scale-100 shadow-lg" 
                : "bg-muted hover:bg-muted/80 scale-90"
            }`}
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <Send className={`h-5 w-5 transition-all duration-300 ${
                inputValue.trim() ? "text-white" : "text-muted-foreground"
              }`} />
            )}
          </Button>
        </div>

        {/* Input Footer */}
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="h-3 w-3 text-accent" />
              <span>AI-powered responses</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <kbd className="px-2 py-1 bg-white/50 rounded border border-white/30 text-xs">Enter</kbd>
            <span>to send</span>
          </div>
        </div>
      </form>

      {/* Loading State Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span>Processing your message...</span>
          </div>
        </div>
      )}
    </div>
  );
}