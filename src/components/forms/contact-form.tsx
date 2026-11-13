'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validators/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, AlertCircle, Send } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setResult(null);
    try {
      const state = await submitContactForm(data);
      setResult({ success: state.success, message: state.message });
      if (state.success) reset();
    } catch {
      setResult({
        success: false,
        message:
          "Your message could not be sent from this form. Please write or telephone the association directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot — hidden from people and assistive technology; only bots fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-sm font-medium mb-2 block">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Jane Doe"
            className="py-5"
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive flex items-center gap-1 mt-1.5">
              <AlertCircle className="h-3 w-3" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium mb-2 block">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="jane@example.com"
            className="py-5"
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive flex items-center gap-1 mt-1.5">
              <AlertCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="subject" className="text-sm font-medium mb-2 block">
          Subject
        </Label>
        <Input
          id="subject"
          type="text"
          {...register("subject")}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="How can we help?"
          className="py-5"
        />
        {errors.subject && (
          <p id="subject-error" className="text-sm text-destructive flex items-center gap-1 mt-1.5">
            <AlertCircle className="h-3 w-3" />
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-sm font-medium mb-2 block">
          Message
        </Label>
        <Textarea
          id="message"
          {...register("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell us about your interest in APSAD's work..."
          rows={6}
          className="resize-none"
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive flex items-center gap-1 mt-1.5">
            <AlertCircle className="h-3 w-3" />
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-[13px] text-muted-foreground">
          Every message is read by the association.
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-foreground hover:bg-foreground/90 text-background text-[13px] tracking-[0.1em] uppercase px-8 py-5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </div>

      <div role="status" aria-live="polite">
        {result && (
          <p
            className={`flex items-center gap-2 text-sm pt-2 ${
              result.success ? "text-primary" : "text-destructive"
            }`}
          >
            {result.success ? (
              <CheckCircle className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            {result.message}
          </p>
        )}
      </div>
    </form>
  );
}
