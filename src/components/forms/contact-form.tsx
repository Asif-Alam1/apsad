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

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-sm font-medium mb-2 block">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Jane Doe"
            className="py-5"
          />
          {errors.name && (
            <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
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
            placeholder="jane@example.com"
            className="py-5"
          />
          {errors.email && (
            <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
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
          placeholder="How can we help?"
          className="py-5"
        />
        {errors.subject && (
          <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
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
          placeholder="Tell us about your interest in APSAD's work..."
          rows={6}
          className="resize-none"
        />
        {errors.message && (
          <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
            <AlertCircle className="h-3 w-3" />
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-[13px] text-muted-foreground">
          We respond within 24 hours.
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

      {isSuccess && (
        <div className="flex items-center gap-2 text-sm text-primary pt-2">
          <CheckCircle className="h-4 w-4" />
          Message sent successfully. We&apos;ll be in touch soon.
        </div>
      )}
    </form>
  );
}
