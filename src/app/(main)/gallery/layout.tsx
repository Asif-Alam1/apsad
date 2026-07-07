import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Sites - Lebanese Heritage Catalogue",
  description:
    "The places APSAD works for — Baalbek, Byblos, Anjar, the Qadisha Valley, the khans and hammams of Tripoli, and the traditional houses of Lebanon.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
