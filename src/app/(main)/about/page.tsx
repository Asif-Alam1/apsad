import Image from "next/image";
import { Landmark, Target, Eye, Users, HistoryIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container max-w-5xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About APSAD</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated to the preservation and promotion of cultural and natural heritage.
          </p>
        </header>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-3">
                <HistoryIcon className="h-8 w-8 text-accent" /> Our History
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in [Year of Foundation, e.g., 1985], APSAD emerged from a collective desire among historians, archaeologists, and community leaders to address the growing concerns over the neglect and degradation of significant heritage sites.
                </p>
                <p>
                  Over the decades, APSAD has grown into a leading non-governmental organization, spearheading numerous successful preservation projects, advocating for policy changes, and fostering public awareness about the importance of our shared past. Our journey has been marked by collaboration, dedication, and an unwavering commitment to protecting the legacies entrusted to us.
                </p>
                <p>
                  We have partnered with local communities, national institutions, and international bodies to achieve our goals, continuously adapting our strategies to meet new challenges in the field of heritage conservation.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/600x450.png"
                alt="Historical photo of APSAD founders or an early project"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                data-ai-hint="historical archive"
              />
            </div>
          </div>
        </section>

        <section className="mb-16 p-8 bg-secondary/20 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-3">
            <Landmark className="h-8 w-8 text-accent" /> Our Mission
          </h2>
          <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            APSAD is committed to the identification, protection, conservation, and promotion of cultural and natural heritage. We strive to ensure that these invaluable assets are preserved for future generations, fostering a deeper understanding and appreciation of our collective history and identity through research, education, and community engagement.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-3">
            <Eye className="h-8 w-8 text-accent" /> Our Vision
          </h2>
          <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We envision a world where cultural and natural heritage is universally valued, meticulously protected, and serves as a dynamic source of knowledge, inspiration, and sustainable development for all communities.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-10 text-center flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-accent" /> Our Goals
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { title: "Site Preservation", description: "To implement effective conservation measures for endangered heritage sites, utilizing best practices and innovative technologies." },
              { title: "Research & Documentation", description: "To conduct and support scholarly research that enhances understanding of our heritage, and to meticulously document sites and artifacts." },
              { title: "Community Engagement", description: "To actively involve local communities in heritage preservation, empowering them as custodians of their own history and culture." },
              { title: "Education & Awareness", description: "To raise public awareness about the significance of heritage and the importance of its conservation through educational programs and outreach activities." },
              { title: "Advocacy & Policy", description: "To advocate for stronger legal frameworks and policies that support heritage protection at local, national, and international levels." },
              { title: "Sustainable Practices", description: "To promote sustainable tourism and site management practices that benefit both heritage and local economies." },
            ].map((goal, index) => (
              <div key={index} className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-accent mb-2">{goal.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-accent" /> Our Team (Optional)
          </h2>
          <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            APSAD is powered by a dedicated team of professionals, researchers, volunteers, and a supportive board of directors, all united by a shared passion for heritage. (Further details about the team structure or key members can be added here if desired).
          </p>
        </section>
      </div>
    </div>
  );
}
