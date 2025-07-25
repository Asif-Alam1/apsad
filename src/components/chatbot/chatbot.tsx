'use client'
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, MessageCircle, Sparkles, Zap, Star, Heart, Send, Mic, Paperclip, Smile, X, Plus, Minus, LucideProps, ExternalLink, ArrowRight, Globe, BookOpen, Users, Shield } from "lucide-react";
import Link from "next/link";
import { answerQuestionsAboutAPSAD } from "@/ai/flows/answer-questions-about-apsad";
import type { AnswerQuestionsAboutAPSADInput, AnswerQuestionsAboutAPSADOutput } from "@/ai/flows/answer-questions-about-apsad";

// Enhanced types
interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  metadata?: {
    sentiment?: string;
    topicCategory?: string;
    suggestedFollowUps?: AnswerQuestionsAboutAPSADOutput['suggestedFollowUps'];
    additionalResources?: AnswerQuestionsAboutAPSADOutput['additionalResources'];
  };
}

interface QuickAction {
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  color: string;
  query: string;
}

const quickActions: QuickAction[] = [
  { label: "About APSAD", icon: Star, color: "from-blue-500 to-cyan-500", query: "Tell me about APSAD's mission and history" },
  { label: "How to Help", icon: Heart, color: "from-purple-500 to-pink-500", query: "How can I get involved with APSAD?" },
  { label: "Heritage Sites", icon: Globe, color: "from-green-500 to-emerald-500", query: "What heritage sites does APSAD protect?" },
  { label: "Contact Info", icon: Zap, color: "from-orange-500 to-red-500", query: "How can I contact APSAD?" }
];

// Enhanced ChatBubble Component
const ChatBubble = ({ message, isTyping = false }: { message?: ChatMessage; isTyping?: boolean }) => {
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

  if (!message) return null;

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
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          
          {/* Show topic badge for bot messages */}
          {!isUser && message.metadata?.topicCategory && (
            <Badge className="mt-2 bg-white/20 text-xs">
              {message.metadata.topicCategory.replace(/_/g, ' ')}
            </Badge>
          )}
          
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

// Follow-up Suggestions Component
const FollowUpSuggestions = ({ 
  suggestions, 
  onSelect 
}: { 
  suggestions: AnswerQuestionsAboutAPSADOutput['suggestedFollowUps'];
  onSelect: (text: string) => void;
}) => {
  if (!suggestions || suggestions.length === 0) return null;

  const getIcon = (category: string) => {
    switch (category) {
      case 'learn_more': return BookOpen;
      case 'take_action': return Heart;
      case 'explore': return Globe;
      case 'specific_detail': return Star;
      default: return MessageCircle;
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Sparkles className="h-3 w-3" />
        Suggested questions:
      </p>
      <div className="grid gap-2">
        {suggestions.map((suggestion, index) => {
          const Icon = getIcon(suggestion.category || 'learn_more');
          return (
            <button
              key={index}
              onClick={() => onSelect(suggestion.text)}
              className="group relative p-3 rounded-xl glass-gradient backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center gap-3">
                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">{suggestion.text}</span>
                {suggestion.link && (
                  <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Additional Resources Component
const AdditionalResources = ({ 
  resources 
}: { 
  resources?: AnswerQuestionsAboutAPSADOutput['additionalResources'];
}) => {
  if (!resources || resources.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'website': return Globe;
      case 'document': return BookOpen;
      case 'gallery': return Star;
      case 'contact': return MessageCircle;
      default: return ExternalLink;
    }
  };

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-white/20">
      <p className="text-xs font-medium text-primary mb-2 flex items-center gap-1">
        <Shield className="h-3 w-3" />
        Helpful Resources:
      </p>
      <div className="space-y-2">
        {resources.map((resource, index) => {
          const Icon = getIcon(resource.type);
          return (
            <div key={index} className="flex items-start gap-2">
              <Icon className="h-3 w-3 text-accent mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium">{resource.title}</p>
                <p className="text-xs text-muted-foreground">{resource.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Chatbot Component
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<AnswerQuestionsAboutAPSADInput['chatHistory']>([]);
  const [showFollowUps, setShowFollowUps] = useState<AnswerQuestionsAboutAPSADOutput['suggestedFollowUps']>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          sender: "bot",
          text: "Hello! 👋 Welcome to APSAD Heritage Assistant.\n\nI'm here to help you learn about our 60+ years of work preserving Lebanon's cultural treasures. Whether you're interested in our heritage sites, want to volunteer, or have questions about our mission, I'm here to help!\n\nHow can I assist you today?",
          timestamp: Date.now(),
          metadata: {
            topicCategory: 'general_info',
            suggestedFollowUps: [
              { text: "Tell me about APSAD's mission", category: 'learn_more', link: '/about' },
              { text: "What heritage sites do you protect?", category: 'explore', link: '/gallery' },
              { text: "How can I volunteer?", category: 'take_action', link: '/get-involved' },
              { text: "Show me your latest projects", category: 'specific_detail' }
            ]
          }
        };
        setMessages([welcomeMessage]);
        setShowFollowUps(welcomeMessage.metadata?.suggestedFollowUps || []);
      }, 1500);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Clear follow-ups when user sends a message
    setShowFollowUps([]);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      // Update chat history for context
      const updatedHistory: AnswerQuestionsAboutAPSADInput['chatHistory'] = [
        ...chatHistory,
        {
          role: 'user',
          parts: [{ text }]
        }
      ];
      setChatHistory(updatedHistory);

      // Call the AI function
      const response = await answerQuestionsAboutAPSAD({
        question: text,
        chatHistory: updatedHistory,
        userLanguage: 'en',
        conversationTone: 'friendly'
      });
      
      // Add bot response
      setTimeout(() => {
        setIsTyping(false);
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: response.answer,
          timestamp: Date.now(),
          metadata: {
            sentiment: response.sentiment,
            topicCategory: response.topicCategory,
            suggestedFollowUps: response.suggestedFollowUps,
            additionalResources: response.additionalResources
          }
        };
        
        setMessages(prev => [...prev, botMessage]);
        setShowFollowUps(response.suggestedFollowUps || []);
        
        // Update chat history with bot response
        setChatHistory(prev => [
          ...prev,
          {
            role: 'model',
            parts: [{ text: response.answer }]
          }
        ]);
        
        setIsLoading(false);
      }, 1000 + Math.random() * 1000);
      
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setTimeout(() => {
        setIsTyping(false);
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "I apologize, but I'm experiencing some technical difficulties right now. 🔧\n\nWhile I work on getting back online, you can:\n• Explore our heritage gallery\n• Learn about our mission\n• Contact us directly through our form\n\nPlease try again in a moment!",
          timestamp: Date.now(),
          metadata: {
            sentiment: 'needs_help',
            topicCategory: 'other',
            suggestedFollowUps: [
              { text: "Visit the heritage gallery", category: 'explore', link: '/gallery' },
              { text: "Learn about APSAD", category: 'learn_more', link: '/about' },
              { text: "Contact APSAD directly", category: 'take_action', link: '/get-involved#contact-section' }
            ]
          }
        };
        setMessages(prev => [...prev, errorMessage]);
        setShowFollowUps(errorMessage.metadata?.suggestedFollowUps || []);
        setIsLoading(false);
      }, 800);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.query);
  };

  const handleFollowUpSelect = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Floating Chat Button */}
        <SheetTrigger asChild>
          <div className="fixed bottom-6 right-6 z-50 group">
            {/* Pulse Animation Rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-ping opacity-20" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse opacity-30" />
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            
            {/* Main Button */}
            <Button
              variant="default"
              size="lg"
              className="relative h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-110 group overflow-hidden"
              aria-label="Open APSAD Heritage Assistant"
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              
              <div className="relative z-10">
                <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                
                {/* Notification Dot */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="h-2 w-2 text-primary" />
                </div>
              </div>
            </Button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
              <div className="glass-gradient backdrop-blur-xl text-primary px-4 py-2 rounded-xl shadow-xl border border-white/30 whitespace-nowrap">
                <p className="text-sm font-medium flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  Ask me about APSAD!
                </p>
                <p className="text-xs text-muted-foreground">60+ years of heritage preservation</p>
              </div>
            </div>
          </div>
        </SheetTrigger>

        {/* Chat Interface */}
        <SheetContent
          side="right"
          className="w-full max-w-md p-0 flex flex-col h-full border-0 shadow-2xl"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
          
          {/* Header */}
          <SheetHeader className="relative z-10 p-6 bg-gradient-to-r from-primary to-accent text-white">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                
                <div>
                  <SheetTitle className="text-xl font-bold text-white flex items-center gap-2">
                    APSAD Assistant
                    <Badge className="bg-white/20 text-white border-white/30 text-xs px-2 py-0.5">
                      <Zap className="h-3 w-3 mr-1" />
                      AI Powered
                    </Badge>
                  </SheetTitle>
                  <p className="text-sm text-white/80 flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online • Heritage Expert
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-full hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-2 mt-4 relative z-10">
              <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs">
                <Star className="h-3 w-3 mr-1" />
                60+ Years
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs">
                <Heart className="h-3 w-3 mr-1" />
                150+ Sites
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs">
                <Users className="h-3 w-3 mr-1" />
                500+ Volunteers
              </Badge>
            </div>
          </SheetHeader>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6 relative z-10">
            <div className="space-y-2">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <ChatBubble isTyping />}
              
              {/* Show follow-up suggestions after last bot message */}
              {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'bot' && showFollowUps.length > 0 && (
                <FollowUpSuggestions 
                  suggestions={showFollowUps}
                  onSelect={handleFollowUpSelect}
                />
              )}
              
              {/* Show additional resources if available */}
              {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].metadata?.additionalResources && (
                <AdditionalResources 
                  resources={messages[messages.length - 1].metadata?.additionalResources}
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          {messages.length === 0 && (
            <div className="px-6 pb-4 relative z-10">
              <p className="text-xs text-muted-foreground mb-3">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className={`group relative p-3 rounded-xl glass-gradient backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="relative z-10 flex items-center gap-2 text-sm">
                      <action.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">{action.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-white/20 bg-white/50 backdrop-blur-sm relative z-10">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Ask about APSAD's heritage work..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(inputValue)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 bg-white/70 backdrop-blur-sm border-white/30 rounded-full focus:bg-white/90 transition-all duration-300"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
                    disabled={isLoading}
                  >
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
                    disabled={isLoading}
                  >
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              
              <Button 
                size="lg"
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="h-12 w-12 p-0 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="h-5 w-5 text-white" />
                )}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3 text-accent" />
              Powered by AI • Preserving Heritage Since 1960
            </p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add custom animations to global styles */}
      <style jsx global>{`
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up-fade {
          animation: slide-up-fade 0.3s ease-out;
        }
        
        .glass-gradient {
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
        }
      `}</style>
    </>
  );
}