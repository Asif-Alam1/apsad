'use client'
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validators/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, AlertCircle, Send, User, Mail, MessageSquare, FileText, Sparkles, Heart, Zap, Globe, Phone, MapPin, Clock } from "lucide-react";

const inputFields = [
  {
    name: "name",
    label: "Full Name",
    icon: User,
    placeholder: "Jane Doe",
    type: "text",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "email",
    label: "Email Address",
    icon: Mail,
    placeholder: "jane@example.com",
    type: "email",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "subject",
    label: "Subject",
    icon: FileText,
    placeholder: "How can we help?",
    type: "text",
    gradient: "from-green-500 to-emerald-500"
  }
];

const contactReasons = [
  { icon: Heart, label: "Volunteer", color: "text-red-500" },
  { icon: Globe, label: "Partnership", color: "text-blue-500" },
  { icon: Zap, label: "Donation", color: "text-yellow-500" },
  { icon: MessageSquare, label: "General Inquiry", color: "text-purple-500" }
];

export function ContactForm({ onSubmit }:any) {
  const [focusedField, setFocusedField] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const formRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit?.(data);
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <Card ref={formRef} className="relative w-full overflow-hidden rounded-3xl border-0">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-2xl" />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      
      {/* Animated Orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-morph" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
      
      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-br from-primary to-accent rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-advanced ${15 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      <CardHeader className="relative z-10 p-8 pb-0">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-2xl animate-pulse-glow">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white animate-pulse" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">
              <span className="text-gradient-animate">Get in Touch</span>
            </CardTitle>
            <CardDescription className="text-lg mt-1">
              We'd love to hear from you
            </CardDescription>
          </div>
        </div>

        {/* Contact Reason Selector */}
        <div className="mb-8">
          <Label className="text-sm font-medium text-muted-foreground mb-3 block">
            I'm interested in...
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {contactReasons.map((reason, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedReason(index)}
                className={`group relative p-4 rounded-2xl glass-gradient backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                  selectedReason === index 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <reason.icon className={`h-6 w-6 ${reason.color} transition-transform duration-300 group-hover:scale-110`} />
                  <span className="text-xs font-medium">{reason.label}</span>
                </div>
                {selectedReason === index && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 p-8 pt-4">
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {inputFields.slice(0, 2).map((field) => (
              <div key={field.name} className="group relative">
                <Label 
                  htmlFor={field.name} 
                  className="flex items-center gap-2 text-sm font-semibold text-primary mb-2"
                >
                  <field.icon className="h-4 w-4" />
                  {field.label}
                </Label>
                <div className="relative">
                  <Input
                    id={field.name}
                    type={field.type}
                    {...form.register(field.name)}
                    placeholder={field.placeholder}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-500 ${
                      focusedField === field.name 
                        ? 'border-primary shadow-lg scale-[1.02] bg-white/90' 
                        : 'border-white/30 hover:border-white/50'
                    }`}
                  />
                  {focusedField === field.name && (
                    <>
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${field.gradient} opacity-10 -z-10 animate-pulse`} />
                      <div className="absolute -top-1 -right-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                      </div>
                    </>
                  )}
                </div>
                {form.formState.errors[field.name] && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-2 animate-fade-in">
                    <AlertCircle className="h-3 w-3" />
                    {form.formState.errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Subject Field */}
          <div className="group relative">
            <Label 
              htmlFor="subject" 
              className="flex items-center gap-2 text-sm font-semibold text-primary mb-2"
            >
              <FileText className="h-4 w-4" />
              Subject
            </Label>
            <div className="relative">
              <Input
                id="subject"
                {...form.register("subject")}
                placeholder={inputFields[2].placeholder}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-500 ${
                  focusedField === "subject" 
                    ? 'border-primary shadow-lg scale-[1.01] bg-white/90' 
                    : 'border-white/30 hover:border-white/50'
                }`}
              />
              {focusedField === "subject" && (
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-10 -z-10 animate-pulse`} />
              )}
            </div>
          </div>

          {/* Message Field */}
          <div className="group relative">
            <Label 
              htmlFor="message" 
              className="flex items-center gap-2 text-sm font-semibold text-primary mb-2"
            >
              <MessageSquare className="h-4 w-4" />
              Your Message
            </Label>
            <div className="relative">
              <Textarea
                id="message"
                {...form.register("message")}
                placeholder="Tell us about your interest in APSAD's work..."
                rows={6}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-500 resize-none ${
                  focusedField === "message" 
                    ? 'border-primary shadow-lg scale-[1.01] bg-white/90' 
                    : 'border-white/30 hover:border-white/50'
                }`}
              />
              {focusedField === "message" && (
                <>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 opacity-10 -z-10 animate-pulse" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 h-1 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-green-500" />
                <span>Response within 24 hours</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>100% Secure</span>
              </div>
            </div>
            
            <Button 
              type="button"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isSubmitting} 
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white rounded-full px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              {isSubmitting ? (
                <div className="relative z-10 flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="relative z-10 flex items-center gap-2">
                  <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  <span className="font-semibold">Send Message</span>
                  <Zap className="h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/20">
          {[
            { icon: Phone, label: "Call Us", value: "+961-1-XXXXXX", color: "from-blue-500 to-cyan-500" },
            { icon: Mail, label: "Email Us", value: "info@apsad.org", color: "from-purple-500 to-pink-500" },
            { icon: MapPin, label: "Visit Us", value: "Beirut, Lebanon", color: "from-green-500 to-emerald-500" }
          ].map((info, index) => (
            <div 
              key={index}
              className="group relative p-4 rounded-2xl glass-gradient backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="relative z-10 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${info.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-medium text-primary">{info.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}