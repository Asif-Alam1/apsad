import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalArticle } from "@/components/editorial/journal";
import { getNews, news } from "@/lib/legacy";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getNews(Number((await params).id));
  return item
    ? { title: item.title, description: item.summary, openGraph: item.image ? { images: [item.image.src] } : undefined }
    : {};
}

export default async function NewsPage({ params }: Props) {
  const item = getNews(Number((await params).id));
  if (!item) notFound();
  return <JournalArticle entry={{ ...item, kind: "news", href: `/news/${item.id}` }} />;
}
