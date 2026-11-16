import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageOpener } from "@/components/editorial/page-opener";
import { LegacyProse } from "@/components/editorial/legacy-prose";
import { JournalRow } from "@/components/editorial/journal";
import { journal, legacyPage, workPages } from "@/lib/legacy";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return workPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = workPages.find((p) => p.slug === slug);
  return page ? { title: `${page.title} - The Work`, description: page.note } : {};
}

const sectionHeading = "font-display uppercase tracking-[0.03em] text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.08]";

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = workPages.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const page = workPages[index];
  const next = workPages[(index + 1) % workPages.length];
  const related = page.related
    ? journal.filter((entry) => page.related!.test(`${entry.title} ${entry.kind === "event" ? entry.location ?? "" : ""} ${entry.summary}`))
    : [];

  return (
    <div className="pt-20">
      <PageOpener title={page.title} standfirst={<p>{page.note}</p>} facts={[["Span", page.span], ["Part of", <Link key="w" href="/work" className="link-rule">The Work</Link>]]} />

      <section className="py-[clamp(4rem,8vw,7rem)]">
        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-x-8">
          <LegacyProse html={legacyPage(page.code).content} className="lg:col-span-8 lg:col-start-3" />
        </div>
      </section>

      {page.code === "ZNMCC" && (
        <section id="music-school" aria-labelledby="music-school-title" className="border-t border-border bg-secondary py-[clamp(4.5rem,8vw,7rem)] scroll-mt-20">
          <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-x-8 gap-y-10">
            <h2 id="music-school-title" className={`lg:col-span-4 ${sectionHeading}`}>
              The Music School
            </h2>
            <div className="lg:col-span-8">
              <LegacyProse html={legacyPage("Registration").content} />
              <p className="mt-10 text-[17px] leading-[1.6] text-muted-foreground max-w-[60ch]">
                To ask about registration, write to the association through the{" "}
                <Link href="/get-involved#contact" className="link-rule text-primary">
                  contact form
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-border py-[clamp(4.5rem,8vw,7rem)]">
          <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-x-8 gap-y-8">
            <h2 id="related-title" className={`lg:col-span-12 ${sectionHeading}`}>
              From the Journal
            </h2>
            <ol className="lg:col-span-12 border-b border-border">
              {related.map((entry) => (
                <JournalRow key={entry.href} entry={entry} />
              ))}
            </ol>
          </div>
        </section>
      )}

      <nav aria-label="Next field of work" className="section-dark">
        <Link
          href={`/work/${next.slug}`}
          className="group container max-w-7xl mx-auto px-6 py-[clamp(4rem,8vw,7rem)] grid md:grid-cols-12 gap-x-8 gap-y-4 items-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          <span className="md:col-span-2 font-display text-[11px] uppercase tracking-[0.3em] text-primary">Next</span>
          <span className="md:col-span-8 font-display uppercase tracking-[0.03em] text-[clamp(2.25rem,6vw,4.75rem)] leading-[1] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
            {next.title}
          </span>
          <ArrowRight aria-hidden className="md:col-span-2 justify-self-end h-6 w-6 text-primary transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2" />
        </Link>
      </nav>
    </div>
  );
}
