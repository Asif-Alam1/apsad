import Link from "next/link";
import { ArrowRight } from "lucide-react";

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "The Association" },
  { href: "/gallery", label: "The Sites" },
  { href: "/get-involved", label: "Get Involved" },
];

export default function NotFound() {
  return (
    <div className="pt-20">
      {/* Rendered here because route metadata is dropped when the not-found boundary hydrates. */}
      <title>Page Not Found | APSAD Lebanon</title>
      <section className="container max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-36">
        <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-8">
          Error 404
        </p>
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-end">
          <h1 className="lg:col-span-8 font-display uppercase tracking-[0.04em] text-[clamp(2.75rem,7.4vw,6.5rem)] leading-[0.98]">
            This page is not in the record
          </h1>
          <p className="lg:col-span-4 text-xl leading-[1.55] text-foreground/85 max-w-[30ch]">
            The address may have changed, or the page may never have existed.
            The association and its sites are still here.
          </p>
        </div>

        <nav aria-label="Site sections" className="mt-16 md:mt-24 border-t border-border">
          <ol>
            {routes.map((route, index) => (
              <li key={route.href} className="border-b border-border">
                <Link
                  href={route.href}
                  className="group grid grid-cols-[3.25rem_1fr_auto] items-baseline py-6 md:py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <span className="font-display text-[12px] tracking-[0.2em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl md:text-3xl tracking-[0.02em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
                    {route.label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-primary transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </div>
  );
}
