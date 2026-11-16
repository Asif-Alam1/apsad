/**
 * Content imported from the legacy apsad.net CMS by scripts/import-legacy.mjs.
 * HTML fields are sanitized at import time, so they are safe to render as-is.
 */
import newsData from "@/data/legacy/news.json";
import eventsData from "@/data/legacy/events.json";
import pagesData from "@/data/legacy/pages.json";
import galleryData from "@/data/legacy/gallery.json";
import affiliationsData from "@/data/legacy/affiliations.json";

/** `thumb` is a 480px WebP made at import; legacy images skip the host's optimizer (see `unoptimized` uses). */
export type Photo = { src: string; thumb: string; width: number; height: number };

export type NewsItem = {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
  image: Photo | null;
};

export type EventItem = NewsItem & { location: string | null; gallery: Photo[] };

export type ArchivePlate = Photo & { id: number; description: string; series: string; place: string };

export type Affiliation = { id: number; name: string; description: string; link: string | null; image: Photo | null };

export type PageCode = keyof typeof pagesData;

export const news = newsData as NewsItem[];
export const events = eventsData as EventItem[];
export const archive = galleryData as ArchivePlate[];
export const affiliations = affiliationsData as Affiliation[];

export function legacyPage(code: PageCode) {
  return pagesData[code];
}

export const getNews = (id: number) => news.find((item) => item.id === id);
export const getEvent = (id: number) => events.find((item) => item.id === id);

export type JournalEntry = (NewsItem & { kind: "news"; href: string }) | (EventItem & { kind: "event"; href: string });

/** News and events in one chronology, newest first. */
export const journal: JournalEntry[] = [
  ...news.map((item) => ({ ...item, kind: "news" as const, href: `/news/${item.id}` })),
  ...events.map((item) => ({ ...item, kind: "event" as const, href: `/events/${item.id}` })),
].sort((a, b) => b.date.localeCompare(a.date));

export const journalYears = (() => {
  const years = journal.map((entry) => entry.date.slice(0, 4));
  return { first: years[years.length - 1], last: years[0] };
})();

export type WorkPage = { slug: string; code: PageCode; title: string; span: string; note: string; related?: RegExp };

/** The Work: the old "Achievements" pages, plus the Zaki Nassif Museum project. */
export const workPages: WorkPage[] = [
  {
    slug: "restoration",
    code: "Restoration",
    title: "Restoration",
    span: "1962 — 2015",
    note: "Houses, churches and a hammam restored with the association's own hands and funds, from Abey in 1962 to Mashghara.",
  },
  {
    slug: "plans-and-studies",
    code: "Plans",
    title: "Plans & Studies",
    span: "1963 — 1979",
    note: "Survey drawings and restoration plans for souks, khans and old streets, from Jounieh to the Jewelers' souk of Beirut.",
  },
  {
    slug: "awareness",
    code: "Awareness",
    title: "Awareness",
    span: "1959 — 2014",
    note: "Guided visits, exhibitions abroad, competitions for schools, and publications in French, English and Arabic.",
    related: /heritage day|guided visit|visit|أيام التراث/i,
  },
  {
    slug: "actions-and-campaigns",
    code: "Actions",
    title: "Actions & Campaigns",
    span: "2010 — 2012",
    note: "Letters to ministers, complaints against demolitions, and APSAD's own stand at the Riyadh conference on urban heritage.",
  },
  {
    slug: "development",
    code: "Development",
    title: "Development",
    span: "Since 2001",
    note: "The old souk of Jounieh brought back to life, and a tourist centre for Kesrouan, Jbeil and Batroun in a restored house.",
    related: /jounieh|jbeil|byblos/i,
  },
  {
    slug: "zaki-nassif-museum",
    code: "ZNMCC",
    title: "Zaki Nassif Museum",
    span: "Since 2012",
    note: "The composer's family house in Mashghara, given to APSAD by his heirs, now a museum, cultural centre and music school.",
    related: /zaki|nassif|ناصيف|mashgh|music/i,
  },
];

export const isArabic = (text: string) => /[؀-ۿ]/.test(text);

export function formatDate(iso: string, style: "long" | "short" = "long") {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
