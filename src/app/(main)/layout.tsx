import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Chatbot } from "@/components/chatbot/chatbot";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
