
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Chatbot } from "@/components/chatbot/chatbot";
import { PageTransition } from "@/components/ui/page-transition";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Preloader } from "@/components/ui/preloader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Preloader />
      <SmoothScroll />
      <CursorFollower />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
