import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

/* Routes every unknown path through the (main) layout so the 404 keeps the header and footer. */
export default function CatchAll() {
  notFound();
}
