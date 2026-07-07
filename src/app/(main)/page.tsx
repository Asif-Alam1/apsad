import type { Metadata } from 'next';
import HeroSection from "@/components/HeroSection";
import { Marquee } from "@/components/ui/marquee";
import { FoundingAppeal } from "@/components/home/founding-appeal";
import { RestorationTimeline } from "@/components/home/restoration-timeline";
import { MissionBand } from "@/components/home/mission-band";
import { PhotographyBreak } from "@/components/home/photography-break";
import { AffiliationsSection } from "@/components/home/affiliations-section";
import { PresidentSection } from "@/components/home/president-section";
import { PatronInvitation } from "@/components/home/patron-invitation";

export const metadata: Metadata = {
  title: 'APSAD - Guardians of Lebanese Heritage Since 1960',
  description: 'APSAD (Association pour la Protection des Sites et Anciennes Demeures) has protected Lebanon\'s architectural treasures and natural sites since 1960 — over one hundred saved, from the Hammam el-Jédid in Tripoli to the Zaki Nassif Museum in Mashghara.',
};

export default function HomePage() {
  return (
    <>
      {/* Nocturne — the palace at night */}
      <div className="section-dark">
        <HeroSection />

        <Marquee
          items={[
            "Sauvegarde du Patrimoine",
            "Heritage Preservation",
            "حماية التراث",
            "Depuis 1960",
            "Restoration",
            "Conservation des Sites",
          ]}
          className="py-4 border-y border-border font-display text-[12px] tracking-[0.3em] uppercase text-primary"
        />

        <FoundingAppeal />
        <RestorationTimeline />
      </div>

      {/* Daylight — the archives by day */}
      <MissionBand />
      <PhotographyBreak />
      <AffiliationsSection />

      {/* Night returns */}
      <PresidentSection />
      <PatronInvitation />
    </>
  );
}
