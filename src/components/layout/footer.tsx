import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

const columns = [
  {
    heading: 'The Association',
    links: [
      { href: '/about', label: 'Who We Are' },
      { href: '/about#history', label: 'Our History' },
      { href: '/about#team', label: 'Leadership' },
      { href: '/gallery', label: 'The Sites' },
    ],
  },
  {
    heading: 'Take Part',
    links: [
      { href: '/get-involved', label: 'Become a Member' },
      { href: '/get-involved', label: 'Volunteer' },
      { href: '/get-involved#contact', label: 'Write to Us' },
    ],
  },
];

const affiliations = [
  'Europa Nostra',
  'ICOMOS Lebanon',
  'World Monuments Fund',
  'Patrimoine Sans Frontières',
];

const socialLinks = [
  { href: 'https://www.facebook.com/apsad.lebanon/', icon: Facebook, label: 'APSAD on Facebook' },
  { href: 'https://www.instagram.com/apsad_lebanon/', icon: Instagram, label: 'APSAD on Instagram' },
];

export function Footer() {
  return (
    <footer className="section-dark border-t">
      {/* Monumental signature */}
      <div className="overflow-hidden select-none" aria-hidden="true">
        <p className="font-display text-[21vw] leading-[0.85] text-center text-foreground/[0.05] tracking-[0.08em] -mb-[4vw]">
          APSAD
        </p>
      </div>

      <div className="container max-w-7xl mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="APSAD" width={40} height={40} className="rounded-full brightness-110" />
              <span className="font-display text-xl tracking-[0.18em]">APSAD</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-md italic">
              Association pour la Protection des Sites et Anciennes Demeures au Liban
            </p>
            <p className="text-base leading-relaxed text-muted-foreground max-w-md">
              Founded in 1960 to identify, protect, and restore Lebanon&apos;s
              architectural treasures and natural sites — a hundred saved so far,
              and the work continues.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 border border-border hover:border-primary hover:text-primary transition-colors duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="lg:col-span-2">
              <h4 className="font-display text-[12px] tracking-[0.25em] uppercase mb-6 text-primary">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
                    >
                      {link.label}
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-primary transition-[width] duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Visit */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-[12px] tracking-[0.25em] uppercase mb-6 text-primary">
              The Salon
            </h4>
            <address className="not-italic text-base text-muted-foreground space-y-3">
              <p>
                Sursock Street, Aoun Building
                <br />
                Achrafieh, Beirut — Lebanon
                <br />
                P.O.Box 11-154
              </p>
              <p>
                <a href="tel:+9611336368" className="hover:text-foreground transition-colors">
                  +961 1 336 368
                </a>
                <br />
                <a href="mailto:info@apsad.org" className="hover:text-foreground transition-colors">
                  info@apsad.org
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Affiliations line */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="font-display text-[11px] tracking-[0.25em] uppercase text-muted-foreground text-center">
            {affiliations.join('  ·  ')}
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground/70">
            &copy; {new Date().getFullYear()} APSAD. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/70 italic">
            Guardians of Lebanese heritage since 1960
          </p>
        </div>
      </div>
    </footer>
  );
}
