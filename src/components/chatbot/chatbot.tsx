"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bot, MessageCircle } from "lucide-react";
import type { ChatMessage } from "@/types";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { answerQuestionsAboutAPSAD } from "@/ai/flows/answer-questions-about-apsad";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initial greeting from bot when chat opens for the first time or is empty
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Hello! I'm the APSAD assistant. How can I help you learn more about our work and heritage preservation in Lebanon?",
          timestamp: Date.now(),
        },
      ]);
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

    try {
      const response = await answerQuestionsAboutAPSAD({ question: text });
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(), // ensure unique id
        sender: "bot",
        text: response.answer,
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Sorry, I encountered an error. Please try again later.",
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="primary"
            size="lg"
            className="fixed bottom-6 right-6 rounded-full shadow-lg p-4 h-16 w-16"
            aria-label="Open chatbot"
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full max-w-md p-0 flex flex-col h-full"
          aria-describedby="chatbot-title"
        >
          <SheetHeader className="p-4 border-b">
            <SheetTitle id="chatbot-title" className="flex items-center gap-2 text-lg">
              <Bot className="h-6 w-6 text-primary" />
              APSAD Assistant
            </SheetTitle>
          </SheetHeader>
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </SheetContent>
      </Sheet>
    </>
  );
}
