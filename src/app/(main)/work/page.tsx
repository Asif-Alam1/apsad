import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageOpener } from "@/components/editorial/page-opener";
import { workPages } from "@/lib/legacy";

export const metadata: Metadata = {
  title: "The Work - Restoration, Studies & Campaigns",
  description:
    "What APSAD has done for Lebanon's heritage since 1960: restorations from Abey to Tripoli, plans for the old souks, awareness and campaigns, development in Jounieh, and the Zaki Nassif Museum.",
};

export default function WorkPage() {
  return (
    <div className="pt-20">
      <PageOpener
        title="The Work"
        standfirst={
          <p>
            Stone restored, plans drawn, ministers written to, souks brought back to life. Six fields of
            work, set down as the association recorded them.
          </p>
        }
        facts={[
          ["Restoring", "Since 1962"],
          ["Surveying", "Since 1963"],
          ["Newest", "Zaki Nassif Museum, 2016"],
        ]}
      />

      <section className="py-[clamp(4rem,8vw,7rem)]">
        <div className="container max-w-7xl mx-auto px-6">
          <ol className="border-b border-border">
            {workPages.map((page) => (
              <li key={page.slug} className="border-t border-border">
                <Link
                  href={`/work/${page.slug}`}
                  className="group relative grid md:grid-cols-12 gap-x-8 gap-y-3 py-9 md:py-12 items-baseline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-px w-full bg-primary origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                  <h2 className="md:col-span-5 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] tracking-[0.02em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
                    {page.title}
                  </h2>
                  <p className="md:col-span-2 font-display text-[11px] uppercase tracking-[0.28em] text-primary tabular-nums">
                    {page.span}
                  </p>
                  <p className="md:col-span-4 text-[17px] leading-[1.6] text-muted-foreground max-w-[46ch]">
                    {page.note}
                  </p>
                  <ArrowRight
                    aria-hidden
                    className="hidden md:block md:col-span-1 justify-self-end h-4 w-4 text-primary transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
