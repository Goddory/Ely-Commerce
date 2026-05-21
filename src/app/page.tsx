import HeroBanner from "@/components/home/HeroBanner";
import StatsBar from "@/components/home/StatsBar";
import SubjectGrid from "@/components/home/SubjectGrid";
import FeaturesSection from "@/components/home/FeaturesSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-bg">
      <HeroBanner />
      <StatsBar />
      <SubjectGrid />
      <FeaturesSection />
      <ComparisonSection />
      <Testimonials />
    </main>
  );
}
