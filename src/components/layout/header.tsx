import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navItems = [
  { href: '/gallery', label: 'Our Work' },
  { href: '/get-involved', label: 'Get Involved' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="APSAD Home">
          <Logo className="h-16 w-16 text-primary" />
         
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8 text-sm pr-4"> {/* Added pr-4 here */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-foreground/70 transition-colors hover:text-foreground hover:text-opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur">
              <nav className="flex flex-col gap-6 pt-8">
                <Link href="/" className="flex items-center gap-2 mb-4 px-4" aria-label="APSAD Home">
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="font-serif text-xl font-semibold tracking-tight text-primary">
                    APSAD
                  </span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-lg font-medium text-foreground/80 transition-colors hover:text-foreground rounded-md hover:bg-secondary/50"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
