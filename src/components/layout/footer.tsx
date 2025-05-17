import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/10 text-foreground border-t border-border/40 py-12 md:py-16">
      <div className="container max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1: APSAD Info & Logo */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6" aria-label="APSAD Home">
              <div className="flex items-center gap-3">
                <Logo className="h-10 w-10 text-primary" />
                <span className="font-serif text-2xl font-bold text-primary">APSAD</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Dedicated to the identification, protection, conservation, and promotion of Lebanon&apos;s rich cultural and natural heritage.
            </p>
            <p className="text-xs text-muted-foreground/80">
              Association pour la Protection des Sites et Anciennes Demeures.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  Get Involved
                </Link>
              </li>
              {/* You can add more links here as your site grows */}
              {/* Example:
              <li>
                <Link href="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  News & Events
                </Link>
              </li>
              */}
            </ul>
          </div>

          {/* Column 3: Stay Connected */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-5">Stay Connected</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link href="/get-involved#contact-section" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li className="text-sm text-muted-foreground">Beirut, Lebanon</li>
            </ul>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} APSAD. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Preserving Heritage, Shaping Futures.</p>
        </div>
      </div>
    </footer>
  );
}
