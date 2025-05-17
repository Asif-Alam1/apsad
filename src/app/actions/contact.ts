
// @/app/actions/contact.ts
"use server";

import { contactFormSchema, type ContactFormState } from "@/lib/validators/contact";

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  }

  // In a real application, you would typically:
  // 1. Send an email using a service like Nodemailer, Resend, or SendGrid.
  // 2. Save the submission to a database.
  // For this example, we'll just log the data to the console.
  console.log("Contact Form Submission Received:");
  console.log("Name:", validatedFields.data.name);
  console.log("Email:", validatedFields.data.email);
  console.log("Subject:", validatedFields.data.subject);
  console.log("Message:", validatedFields.data.message);

  // Example of a potential server-side error
  // if (validatedFields.data.subject.toLowerCase().includes("spam")) {
  //   return {
  //     message: "Your message was flagged as spam and could not be processed.",
  //     success: false,
  //     errors: { _form: ["Message flagged as spam."] },
  //     timestamp: Date.now(),
  //   };
  // }

  return {
    message: "Thank you for your message! We'll get back to you as soon as possible.",
    success: true,
    timestamp: Date.now(),
  };
}
