
import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'APSAD - Protecting Lebanon\'s Cultural & Natural Heritage',
    template: '%s | APSAD Lebanon',
  },
  description: 'APSAD (Association for the Protection of Natural Sites and Old Buildings in Lebanon) is a leading NGO dedicated to identifying, protecting, preserving, and promoting Lebanon\'s rich cultural and natural heritage for future generations.',
  keywords: ['APSAD', 'Lebanon', 'heritage', 'preservation', 'NGO', 'cultural heritage', 'natural sites', 'old buildings', 'archaeology', 'Baalbek', 'Byblos', 'Tyre', 'Anjar', 'Qadisha Valley', 'Lebanese heritage', 'heritage conservation'],
  applicationName: 'APSAD Lebanon',
  authors: [{ name: 'APSAD', url: 'https://apsad.org' }],
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
    description: 'Join APSAD in preserving Lebanon\'s invaluable historical sites and natural beauty.',
    url: 'https://apsad.org',
    siteName: 'APSAD Lebanon',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APSAD - Protecting Lebanon\'s Cultural & Natural Heritage',
    description: 'APSAD is dedicated to safeguarding Lebanon\'s cultural and natural treasures.',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "APSAD - Association pour la Protection des Sites et Anciennes Demeures",
  "alternateName": "APSAD Lebanon",
  "url": "https://apsad.org",
  "description": "APSAD is a non-governmental organization founded in 1960, dedicated to the identification, protection, preservation, and promotion of Lebanon's rich cultural and natural heritage.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Beirut",
    "addressCountry": "LB"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "General Inquiry",
    "email": "info@apsad.org",
  },
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
      <body className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
