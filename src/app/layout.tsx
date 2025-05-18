
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'APSAD - Protecting Lebanon\'s Cultural & Natural Heritage',
    template: '%s | APSAD Lebanon',
  },
  description: 'APSAD (Association for the Protection of Natural Sites and Old Buildings in Lebanon) is a leading NGO dedicated to identifying, protecting, preserving, and promoting Lebanon\'s rich cultural and natural heritage for future generations. Discover our projects, sites, and how you can contribute.',
  keywords: ['APSAD', 'Lebanon', 'heritage', 'preservation', 'NGO', 'cultural heritage', 'natural sites', 'old buildings', 'archaeology', 'Baalbek', 'Byblos', 'Tyre', 'Anjar', 'Qadisha Valley', 'Lebanese heritage', 'heritage conservation'],
  applicationName: 'APSAD Lebanon',
  authors: [{ name: 'APSAD', url: 'https://apsad.org' }], // Replace with actual URL if available
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'APSAD - Protecting Lebanon\'s Cultural & Natural Heritage',
    description: 'Join APSAD in preserving Lebanon\'s invaluable historical sites and natural beauty. Learn about our mission, projects, and how to get involved.',
    url: 'https://apsad.org', // Replace with actual URL
    siteName: 'APSAD Lebanon',
    images: [
      {
        url: 'https://placehold.co/1200x630.png?text=APSAD+Lebanon', // Replace with a compelling OG image URL
        width: 1200,
        height: 630,
        alt: 'APSAD - Preserving Lebanon\'s Heritage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APSAD - Protecting Lebanon\'s Cultural & Natural Heritage',
    description: 'APSAD is dedicated to safeguarding Lebanon\'s cultural and natural treasures. Explore our work and support our mission.',
    // images: ['https://placehold.co/1200x630.png?text=APSAD+Lebanon'], // Replace with a compelling Twitter card image URL
  },
  // viewport: 'width=device-width, initial-scale=1', // Next.js handles this by default
  // themeColor: '#yourThemeColor', // Optional: if you have a specific theme color
  // verification: { // Optional: for site verification with search consoles
  //   google: 'your-google-site-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   other: {
  //     me: ['my-email@example.com', 'my-link-to-profile.com/me'],
  //   },
  // },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "APSAD - Association pour la Protection des Sites et Anciennes Demeures",
  "alternateName": "APSAD Lebanon",
  "url": "https://apsad.org", // Replace with actual URL
  "logo": "https://placehold.co/200x200.png?text=APSAD+Logo", // Replace with actual logo URL
  "description": "APSAD is a non-governmental organization founded in 1960, dedicated to the identification, protection, preservation, and promotion of Lebanon's rich cultural and natural heritage.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Beirut",
    "addressCountry": "LB"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service", // Or "Public Relations", "General Inquiry"
    "email": "info@apsad.org", // Replace with actual email
    // "telephone": "+961-X-XXXXXX" // Replace with actual phone
  },
  "sameAs": [
    // Add links to social media profiles if available
    // "https://www.facebook.com/APSADLebanon",
    // "https://www.instagram.com/APSADLebanon",
    // "https://www.twitter.com/APSADLebanon"
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
