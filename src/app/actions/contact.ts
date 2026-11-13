"use server";

import { contactFormSchema, type ContactFormState } from "@/lib/validators/contact";

/**
 * Delivers a contact-form message by email through Resend's REST API.
 *
 * Requires three environment variables (see .env.example):
 *   RESEND_API_KEY      — API key from resend.com
 *   CONTACT_TO_EMAIL    — the APSAD inbox that receives messages
 *   CONTACT_FROM_EMAIL  — a sender on a domain verified in Resend
 *
 * When they are missing, or delivery fails, the form reports the failure
 * instead of pretending the message was sent.
 */
export async function submitContactForm(input: unknown): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse(input);

  if (!parsed.success) {
    return {
      message: "Please check the highlighted fields.",
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message, website } = parsed.data;

  // Honeypot: real visitors never see or fill this field. Accept silently.
  if (website) {
    return { message: "Thank you — your message has been sent.", success: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  const failure: ContactFormState = {
    message:
      "Your message could not be sent from this form. Please write or telephone the association directly.",
    success: false,
  };

  if (!apiKey || !to || !from) {
    console.error("Contact form: email delivery is not configured (see .env.example).");
    return failure;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Website] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Contact form: delivery failed", response.status, await response.text());
      return failure;
    }
  } catch (error) {
    console.error("Contact form: delivery failed", error);
    return failure;
  }

  return { message: "Thank you — your message has been sent.", success: true };
}
