'use client'

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, ArrowRight } from "lucide-react";
import { answerQuestionsAboutAPSAD } from "@/ai/flows/answer-questions-about-apsad";
import type { AnswerQuestionsAboutAPSADInput, AnswerQuestionsAboutAPSADOutput } from "@/ai/flows/answer-questions-about-apsad";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  followUps?: AnswerQuestionsAboutAPSADOutput['suggestedFollowUps'];
}

const suggestedQuestions = [
  "Tell me about APSAD's mission",
  "What heritage sites do you protect?",
  "How can I volunteer?",
  "How do I become a member?",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<AnswerQuestionsAboutAPSADInput['chatHistory']>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome: ChatMessage = {
        id: "welcome",
        sender: "bot",
        text: "Welcome to APSAD. I can help you learn about our heritage preservation work, how to get involved, or answer questions about Lebanon's cultural sites.\n\nWhat would you like to know?",
        timestamp: Date.now(),
      };
      setMessages([welcome]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages.length]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const updatedHistory: AnswerQuestionsAboutAPSADInput['chatHistory'] = [
        ...chatHistory,
        { role: 'user', parts: [{ text }] }
      ];
      setChatHistory(updatedHistory);

      const response = await answerQuestionsAboutAPSAD({
        question: text,
        chatHistory: updatedHistory,
        userLanguage: 'en',
        conversationTone: 'friendly'
      });

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.answer,
        timestamp: Date.now(),
        followUps: response.suggestedFollowUps,
      };

      setMessages(prev => [...prev, botMsg]);
      setChatHistory(prev => [
        ...prev,
        { role: 'model' as const, parts: [{ text: response.answer }] }
      ]);
    } catch {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I'm having trouble connecting right now. Please try again in a moment, or reach out to us directly through the contact form.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 flex items-center justify-center bg-foreground text-background shadow-lg hover:bg-foreground/90 transition-all duration-300 rounded-full hover:scale-105"
          aria-label="Open heritage assistant"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      </SheetTrigger>

      {/* Chat Panel */}
      <SheetContent
        side="right"
        className="w-full max-w-[420px] p-0 flex flex-col h-full border-l border-border bg-background [&>button:last-child]:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-serif text-lg font-bold">APSAD Assistant</h2>
            <p className="text-[12px] text-muted-foreground tracking-[0.1em] uppercase mt-0.5">Heritage Expert</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-5">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-foreground text-background'
                      : 'bg-secondary text-foreground'
                  } px-4 py-3`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-[10px] mt-2 ${
                    msg.sender === 'user' ? 'text-background/50' : 'text-muted-foreground'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Thinking</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-1 h-1 bg-muted-foreground/50 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Follow-up suggestions */}
            {!isLoading && lastBotMsg?.followUps && lastBotMsg.followUps.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-muted-foreground uppercase tracking-[0.1em]">
                  Suggested
                </p>
                {lastBotMsg.followUps.map((fu: { text: string }, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSend(fu.text)}
                    className="w-full text-left px-4 py-3 min-h-[44px] border border-border hover:border-foreground/30 hover:bg-secondary/50 transition-colors duration-200 text-sm flex items-center justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{fu.text}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {/* Initial suggestions when chat is fresh */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-muted-foreground uppercase tracking-[0.1em]">
                  Common Questions
                </p>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="w-full text-left px-4 py-3 min-h-[44px] border border-border hover:border-foreground/30 hover:bg-secondary/50 transition-colors duration-200 text-sm flex items-center justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{q}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground disabled:opacity-50"
              aria-label="Type your message"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="h-11 w-11 flex items-center justify-center bg-foreground text-background disabled:opacity-30 transition-opacity duration-200 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 text-center tracking-[0.05em]">
            Powered by AI &middot; Preserving Heritage Since 1960
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
