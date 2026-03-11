import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import FeaturedMaterials from "@/components/home/FeaturedMaterials";
import AboutTeaser from "@/components/home/AboutTeaser";
import FinishesSection from "@/components/home/FinishesSection";
import LatestProjects from "@/components/home/LatestProjects";
import CTABand from "@/components/home/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedMaterials />
      <AboutTeaser />
      <FinishesSection />
      <LatestProjects />
      <CTABand />
    </>
  );
}
