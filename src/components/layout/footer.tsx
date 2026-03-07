import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/gallery', label: 'Our Work' },
  { href: '/get-involved', label: 'Get Involved' },
];

const socialLinks = [
  { href: "https://www.facebook.com/apsad.lebanon/", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/apsad_lebanon/", icon: Instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="section-dark">
      <div className="container max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="APSAD" width={40} height={40} className="rounded-full brightness-110" />
              <span className="font-serif text-xl font-bold tracking-wide">APSAD</span>
            </Link>
            <p className="text-sm leading-relaxed opacity-60 max-w-md">
              Dedicated to the identification, protection, conservation, and promotion of
              Lebanon&apos;s rich cultural and natural heritage since 1960.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 border border-white/20 hover:border-white/40 transition-colors duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.15em] uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-current transition-[width] duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.15em] uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 opacity-60 flex-shrink-0" />
                <span className="opacity-60">
                  Achrafieh, Sursock Street
                  <br />
                  Beirut, Lebanon
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 opacity-60 flex-shrink-0" />
                <a
                  href="mailto:info@apsad.org"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  info@apsad.org
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 opacity-60 flex-shrink-0" />
                <span className="opacity-60">+961-1-XXXXXX</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40">
            &copy; {new Date().getFullYear()} APSAD. All rights reserved.
          </p>
          <p className="text-xs opacity-40">Preserving Heritage, Shaping Futures</p>
        </div>
      </div>
    </footer>
  );
}
