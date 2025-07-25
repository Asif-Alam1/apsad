"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
  initialContactFormState
} from "@/lib/validators/contact";
import { submitContactForm } from "@/app/actions/contact";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, AlertCircle, Send, User, Mail, MessageSquare, FileText, Sparkles, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="group w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          <span>Send Message</span>
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialContactFormState);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.timestamp) {
      if (state.success) {
        toast({
          title: "Message Sent Successfully! 🎉",
          description: state.message,
          variant: "default",
          duration: 5000,
        });
        form.reset();
      } else if (state.message && !state.success) {
        toast({
          title: "Oops! Something went wrong",
          description: state.message || "An unexpected error occurred.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  }, [state, toast, form]);

  return (
    <Card className="relative w-full bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full -translate-y-16 translate-x-16" />
      
      <CardHeader className="relative z-10 p-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Send Us a Message
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Quick Response
              </Badge>
              <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent text-xs">
                <Heart className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-lg text-muted-foreground leading-relaxed">
          Have questions or want to get in touch? We'd love to hear from you. Fill out the form below and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 p-8 pt-0">
        <form action={formAction} className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="group space-y-3">
              <Label 
                htmlFor="name" 
                className="flex items-center gap-2 text-sm font-semibold text-primary group-focus-within:text-accent transition-colors duration-300"
              >
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="e.g. Jane Doe"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 text-base bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 focus:bg-white/90 focus:scale-[1.02] focus:shadow-lg ${
                    focusedField === "name" ? "border-primary shadow-lg" : "border-white/30"
                  } ${form.formState.errors.name || state.errors?.name ? "border-red-300 focus:border-red-500" : ""}`}
                  aria-invalid={!!form.formState.errors.name || !!state.errors?.name}
                  aria-describedby="name-error"
                />
                {focusedField === "name" && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 -z-10 animate-pulse" />
                )}
              </div>
              {form.formState.errors.name && (
                <p id="name-error" className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.name.message}
                </p>
              )}
              {state.errors?.name && (
                <p id="name-server-error" className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="group space-y-3">
              <Label 
                htmlFor="email" 
                className="flex items-center gap-2 text-sm font-semibold text-primary group-focus-within:text-accent transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="e.g. jane@example.com"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 text-base bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 focus:bg-white/90 focus:scale-[1.02] focus:shadow-lg ${
                    focusedField === "email" ? "border-primary shadow-lg" : "border-white/30"
                  } ${form.formState.errors.email || state.errors?.email ? "border-red-300 focus:border-red-500" : ""}`}
                  aria-invalid={!!form.formState.errors.email || !!state.errors?.email}
                  aria-describedby="email-error"
                />
                {focusedField === "email" && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 -z-10 animate-pulse" />
                )}
              </div>
              {form.formState.errors.email && (
                <p id="email-error" className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.email.message}
                </p>
              )}
              {state.errors?.email && (
                <p id="email-server-error" className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {state.errors.email[0]}
                </p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div className="group space-y-3">
            <Label 
              htmlFor="subject" 
              className="flex items-center gap-2 text-sm font-semibold text-primary group-focus-within:text-accent transition-colors duration-300"
            >
              <FileText className="h-4 w-4" />
              Subject
            </Label>
            <div className="relative">
              <Input
                id="subject"
                {...form.register("subject")}
                placeholder="e.g. Inquiry about volunteering opportunities"
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 text-base bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 focus:bg-white/90 focus:scale-[1.02] focus:shadow-lg ${
                  focusedField === "subject" ? "border-primary shadow-lg" : "border-white/30"
                } ${form.formState.errors.subject || state.errors?.subject ? "border-red-300 focus:border-red-500" : ""}`}
                aria-invalid={!!form.formState.errors.subject || !!state.errors?.subject}
                aria-describedby="subject-error"
              />
              {focusedField === "subject" && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 -z-10 animate-pulse" />
              )}
            </div>
            {form.formState.errors.subject && (
              <p id="subject-error" className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {form.formState.errors.subject.message}
              </p>
            )}
            {state.errors?.subject && (
              <p id="subject-server-error" className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {state.errors.subject[0]}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="group space-y-3">
            <Label 
              htmlFor="message" 
              className="flex items-center gap-2 text-sm font-semibold text-primary group-focus-within:text-accent transition-colors duration-300"
            >
              <MessageSquare className="h-4 w-4" />
              Your Message
            </Label>
            <div className="relative">
              <Textarea
                id="message"
                {...form.register("message")}
                placeholder="Tell us about your interest in APSAD's work, questions about heritage preservation, or how you'd like to get involved..."
                rows={6}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 text-base bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 focus:bg-white/90 focus:scale-[1.01] focus:shadow-lg resize-none ${
                  focusedField === "message" ? "border-primary shadow-lg" : "border-white/30"
                } ${form.formState.errors.message || state.errors?.message ? "border-red-300 focus:border-red-500" : ""}`}
                aria-invalid={!!form.formState.errors.message || !!state.errors?.message}
                aria-describedby="message-error"
              />
              {focusedField === "message" && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 -z-10 animate-pulse" />
              )}
            </div>
            {form.formState.errors.message && (
              <p id="message-error" className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {form.formState.errors.message.message}
              </p>
            )}
            {state.errors?.message && (
              <p id="message-server-error" className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {state.errors.message[0]}
              </p>
            )}
          </div>

          {/* Form Errors */}
          {state.errors?._form && (
            <Alert variant="destructive" className="bg-red-50/50 backdrop-blur-sm border-red-200 rounded-xl">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-red-800">Form Error</AlertTitle>
              <AlertDescription className="text-red-700">
                {state.errors._form.join(", ")}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>We typically respond within 24 hours</span>
            </div>
            <SubmitButton />
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="h-5 w-5 text-accent" />
            <h4 className="font-semibold text-primary">Why Contact Us?</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span>Learn about volunteer opportunities</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span>Explore partnership possibilities</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span>Get heritage preservation guidance</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span>Schedule site visits</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}