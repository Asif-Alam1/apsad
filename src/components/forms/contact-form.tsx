"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormState, submitContactForm } from "@/app/actions/contact";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ContactFormData = z.infer<typeof contactFormSchema>;

const initialFormState: ContactFormState = {
  message: "",
  success: false,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Message
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialFormState);
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
    if (state.timestamp) { // Only show toast if state has been updated by action
      if (state.success) {
        toast({
          title: "Message Sent!",
          description: state.message,
          variant: "default",
          duration: 5000,
        });
        form.reset(); // Reset form fields on successful submission
      } else if (state.message && !state.success) {
         toast({
          title: "Error",
          description: state.message || "An unexpected error occurred.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  }, [state, toast, form]);


  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Send Us a Message</CardTitle>
        <CardDescription>
          Have questions or want to get in touch? Fill out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="e.g. Jane Doe"
                aria-invalid={!!form.formState.errors.name || !!state.errors?.name}
                aria-describedby="name-error"
              />
              {form.formState.errors.name && (
                <p id="name-error" className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
              {state.errors?.name && (
                 <p id="name-server-error" className="text-sm text-destructive">{state.errors.name[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="e.g. jane@example.com"
                aria-invalid={!!form.formState.errors.email || !!state.errors?.email}
                aria-describedby="email-error"
              />
              {form.formState.errors.email && (
                <p id="email-error" className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
               {state.errors?.email && (
                 <p id="email-server-error" className="text-sm text-destructive">{state.errors.email[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              {...form.register("subject")}
              placeholder="e.g. Inquiry about volunteering"
              aria-invalid={!!form.formState.errors.subject || !!state.errors?.subject}
              aria-describedby="subject-error"
            />
            {form.formState.errors.subject && (
              <p id="subject-error" className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
            )}
            {state.errors?.subject && (
                 <p id="subject-server-error" className="text-sm text-destructive">{state.errors.subject[0]}</p>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              {...form.register("message")}
              placeholder="Write your message here..."
              rows={5}
              aria-invalid={!!form.formState.errors.message || !!state.errors?.message}
              aria-describedby="message-error"
            />
            {form.formState.errors.message && (
              <p id="message-error" className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
            {state.errors?.message && (
                 <p id="message-server-error" className="text-sm text-destructive">{state.errors.message[0]}</p>
              )}
          </div>
          
          {state.errors?._form && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Form Error</AlertTitle>
              <AlertDescription>
                {state.errors._form.join(", ")}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
