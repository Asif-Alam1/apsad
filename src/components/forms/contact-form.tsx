'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validators/contact";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      {/* Honeypot — hidden from people and assistive technology; only bots fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
        <div>
          <label htmlFor="name" className="block font-display text-[10px] uppercase tracking-[0.3em] text-primary">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
            className="field-line"
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive flex items-center gap-1 mt-1.5">
              <AlertCircle className="h-3 w-3" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-display text-[10px] uppercase tracking-[0.3em] text-primary">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="Where we may reply"
            className="field-line"
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
        <label htmlFor="subject" className="block font-display text-[10px] uppercase tracking-[0.3em] text-primary">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="Membership, a project, a building…"
          className="field-line"
        />
        {errors.subject && (
          <p id="subject-error" className="text-sm text-destructive flex items-center gap-1 mt-1.5">
            <AlertCircle className="h-3 w-3" />
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-display text-[10px] uppercase tracking-[0.3em] text-primary">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Your message"
          rows={5}
          className="field-line resize-none"
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive flex items-center gap-1 mt-1.5">
            <AlertCircle className="h-3 w-3" />
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6 pt-2">
        <p className="text-base italic text-muted-foreground">
          Every message is read by the association.
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="group bg-primary hover:bg-accent text-primary-foreground h-[52px] px-9 font-display text-[12px] tracking-[0.25em] uppercase transition-colors duration-500"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-3" />
              Sending
            </>
          ) : (
            <>
              Send the letter
              <ArrowRight className="h-4 w-4 ml-3 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5" />
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
