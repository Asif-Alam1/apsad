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
  title: 'APSAD - Association pour la Protection des Sites et Anciennes Demeures',
  description: 'APSAD (Association for the Protection of Natural Sites and Old Buildings in Lebanon) is dedicated to preserving Lebanon\'s cultural and natural heritage. Discover our projects, sites, and how you can get involved.',
  keywords: ['APSAD', 'Lebanon', 'heritage', 'preservation', 'NGO', 'cultural heritage', 'natural sites', 'old buildings', 'archaeology'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
