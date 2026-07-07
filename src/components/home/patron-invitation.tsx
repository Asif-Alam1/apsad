import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { Reveal } from '@/components/ui/reveal'
import { SplitText } from '@/components/ui/split-text'

/**
 * The finale — a patron's invitation, not a donation plea.
 */
export function PatronInvitation() {
  return (
    <section className="section-dark relative overflow-hidden">
      <div className="container max-w-4xl mx-auto px-6 py-28 md:py-40 text-center relative">
        <Reveal>
          <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-8">
            The Invitation
          </p>
        </Reveal>
        <SplitText
          as="h2"
          className="font-display uppercase tracking-[0.05em] leading-[1.1] text-4xl md:text-6xl"
          delay={150}
        >
          Add your name to the record
        </SplitText>
        <Reveal delay={350}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-8 mb-12 max-w-2xl mx-auto">
            APSAD has always been carried by its members — patrons, volunteers,
            and friends of Lebanese heritage. The salon on Sursock Street is
            open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Magnetic>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-[52px] min-w-[220px] font-display text-[12px] tracking-[0.25em] uppercase"
              >
                <Link href="/get-involved">Become a Member</Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                variant="outline"
                className="border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground h-[52px] min-w-[220px] font-display text-[12px] tracking-[0.25em] uppercase"
              >
                <Link href="/get-involved">Volunteer With Us</Link>
              </Button>
            </Magnetic>
          </div>
          <p className="font-display text-[11px] uppercase tracking-[0.3em] text-muted-foreground mt-14">
            Sursock Street, Aoun Building · Achrafieh, Beirut
          </p>
        </Reveal>
      </div>
    </section>
  )
}
