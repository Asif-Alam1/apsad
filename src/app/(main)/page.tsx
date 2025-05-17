import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Users, Handshake, BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Panoramic view of a historical site"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
          data-ai-hint="historical landscape"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 bg-black/40">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-shadow-lg">
            Preserving Our Past, Inspiring Our Future
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-shadow">
            Discover the rich history and cultural heritage protected by APSAD. Join us in our mission to safeguard these treasures for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="primary">
              <Link href="/gallery">Explore Our Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About APSAD Snippet */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              About APSAD
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              APSAD is a non-governmental organization dedicated to the identification, protection, preservation, and promotion of cultural and natural heritage sites. We believe that our heritage is a vital link to our past and a source of inspiration for our future.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Landmark className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">To safeguard and promote cultural heritage through research, conservation, and community engagement.</p>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our History</h3>
              <p className="text-muted-foreground">Founded with a passion for history, APSAD has been actively working for decades to protect significant sites.</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-muted-foreground">A future where cultural heritage is cherished, protected, and accessible to all.</p>
            </div>
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="link" className="text-lg text-accent">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects/Sites */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Restoration of Ancient Temple"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
                data-ai-hint="temple restoration"
              />
              <CardHeader>
                <CardTitle>Ancient Temple Restoration</CardTitle>
                <CardDescription>Revitalizing a 12th-century temple complex.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  This ambitious project involves structural repairs, mural conservation, and site interpretation to bring history alive.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Digital Archive Initiative"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
                data-ai-hint="archive documents"
              />
              <CardHeader>
                <CardTitle>Digital Archive Initiative</CardTitle>
                <CardDescription>Preserving historical documents for future generations.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Digitizing rare manuscripts and photographs, making them accessible to researchers and the public worldwide.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Community Heritage Workshops"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
                data-ai-hint="community workshop"
              />
              <CardHeader>
                <CardTitle>Heritage Education Program</CardTitle>
                <CardDescription>Engaging local communities in heritage preservation.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Workshops and educational programs designed to foster a sense of ownership and stewardship for local heritage sites.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action: Get Involved */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Handshake className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Make a Difference
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Your support is crucial to our efforts. Whether you volunteer your time, become a member, or advocate for our cause, you can play a part in preserving our shared heritage.
          </p>
          <Button asChild size="lg" variant="primary">
            <Link href="/get-involved">Join Our Cause</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
