import { notFound } from "next/navigation";

/* Routes every unknown path through the (main) layout so the 404 keeps the header and footer. */
export default function CatchAll() {
  notFound();
}
