import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { events, news, workPages } from "@/lib/legacy";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority,
  });

  return [
    page("/", 1),
    page("/about", 0.8),
    page("/about/record", 0.6),
    page("/affiliations", 0.6),
    page("/work", 0.8),
    ...workPages.map((p) => page(`/work/${p.slug}`, 0.7)),
    page("/gallery", 0.8),
    page("/journal", 0.8),
    ...news.map((n) => ({ ...page(`/news/${n.id}`, 0.5), lastModified: n.date })),
    ...events.map((e) => ({ ...page(`/events/${e.id}`, 0.5), lastModified: e.date })),
    page("/get-involved", 0.8),
  ];
}
