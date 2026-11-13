import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="container max-w-3xl mx-auto px-6 py-32 md:py-44 text-center">
      <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-8">
        Error 404
      </p>
      <h1 className="font-display uppercase tracking-[0.05em] leading-[1.1] text-4xl md:text-6xl">
        This page is not in the record
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-8 mb-12 max-w-xl mx-auto">
        The address may have changed, or the page may never have existed. The
        association and its sites are still here.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-[52px] min-w-[220px] font-display text-[12px] tracking-[0.25em] uppercase"
        >
          <Link href="/">Return Home</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground h-[52px] min-w-[220px] font-display text-[12px] tracking-[0.25em] uppercase"
        >
          <Link href="/gallery">See the Sites</Link>
        </Button>
      </div>
    </section>
  );
}
