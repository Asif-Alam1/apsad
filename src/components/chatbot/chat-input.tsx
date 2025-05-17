"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4 bg-background">
      <Input
        type="text"
        placeholder="Ask about APSAD..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isLoading}
        className="flex-1"
        aria-label="Type your question for the chatbot"
      />
      <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} aria-label="Send message">
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
