import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters." }).max(120),
  email: z.string().trim().email({ message: "Please enter a valid email address." }).max(200),
  subject: z.string().trim().min(5, { message: "Subject must be at least 5 characters." }).max(200),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters." }).max(5000),
  /** Honeypot — hidden from visitors; only bots fill it. */
  website: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactFormState {
  message: string;
  success: boolean;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
}
