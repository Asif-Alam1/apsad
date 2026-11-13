'use client'

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, ArrowRight } from "lucide-react";
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
  const [chatHistory, setChatHistory] = useState<NonNullable<AnswerQuestionsAboutAPSADInput['chatHistory']>>([]);
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

  const suggestionClass =
    "group flex w-full min-h-[48px] items-baseline justify-between gap-4 border-b border-border py-3 text-left text-[16px] leading-snug text-foreground transition-colors duration-500 ease-[var(--ease-expo)] hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const suggestionLabel =
    "mb-1 border-b border-border pb-3 font-display text-[11px] uppercase tracking-[0.42em] text-primary";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Launcher — a quiet hairline tab; gold fill only on hover */}
      <SheetTrigger asChild>
        <button
          className="group fixed bottom-5 right-5 z-[40] flex h-12 items-center gap-3 border border-[hsl(38_52%_63%/0.45)] bg-[hsl(26_20%_7%)] px-3.5 text-[hsl(38_52%_63%)] transition-colors duration-500 ease-[var(--ease-expo)] hover:border-[hsl(38_52%_63%)] hover:bg-[hsl(38_52%_63%)] hover:text-[hsl(26_20%_7%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(26_20%_7%)] md:bottom-6 md:right-6 md:px-4"
          aria-label="Ask the heritage assistant"
        >
          <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          <span className="hidden font-display text-[11px] uppercase tracking-[0.32em] md:inline" aria-hidden="true">
            Ask
          </span>
        </button>
      </SheetTrigger>

      {/* Chat Panel */}
      <SheetContent
        side="right"
        className="flex h-full w-[calc(100vw-1.25rem)] max-w-[440px] flex-col border-l border-border bg-background p-0 shadow-none sm:max-w-[440px] [&>button:last-child]:hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border py-5 pl-6 pr-3">
          <div>
            <SheetTitle asChild>
              <h2 className="font-display text-[15px] font-normal uppercase tracking-[0.22em]">APSAD Assistant</h2>
            </SheetTitle>
            <p className="mt-1.5 text-[15px] italic leading-none text-muted-foreground">Heritage Expert</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors duration-500 ease-[var(--ease-expo)] hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-7 py-7">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={
                    msg.sender === 'user'
                      ? 'max-w-[85%] border border-border px-4 py-3 text-right'
                      : 'max-w-[92%] border-l border-primary pl-4'
                  }
                >
                  <p className="whitespace-pre-wrap text-[17px] leading-[1.55] text-foreground">{msg.text}</p>
                  <p className="mt-2 font-display text-[10px] tabular-nums tracking-[0.2em] text-muted-foreground">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start" role="status">
                <div className="flex items-center gap-2.5 border-l border-primary pl-4">
                  <span className="text-[16px] italic text-muted-foreground">Thinking</span>
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="h-[3px] w-[3px] animate-pulse bg-primary"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}

            {/* Follow-up suggestions */}
            {!isLoading && lastBotMsg?.followUps && lastBotMsg.followUps.length > 0 && (
              <div className="pt-2">
                <p className={suggestionLabel}>Suggested</p>
                {lastBotMsg.followUps.map((fu: { text: string }, i: number) => (
                  <button key={i} onClick={() => handleSend(fu.text)} className={suggestionClass}>
                    <span>{fu.text}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-primary transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}

            {/* Initial suggestions when chat is fresh */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2">
                <p className={suggestionLabel}>Common Questions</p>
                {suggestedQuestions.map((q, i) => (
                  <button key={i} onClick={() => handleSend(q)} className={suggestionClass}>
                    <span>{q}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-primary transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border px-6 pb-5 pt-4">
          <div className="flex items-end gap-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="field-line min-w-0 flex-1 text-[17px] disabled:opacity-50"
              aria-label="Type your message"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="h-11 shrink-0 px-1 font-display text-[11px] uppercase tracking-[0.32em] text-primary transition-colors duration-500 ease-[var(--ease-expo)] hover:text-foreground disabled:text-muted-foreground disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Send message"
            >
              {isLoading ? 'Sending' : 'Send'}
            </button>
          </div>
          <p className="mt-4 text-[13px] italic text-muted-foreground">
            Powered by AI &middot; Preserving Heritage Since 1960
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
