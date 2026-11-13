import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/gallery`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/get-involved`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
