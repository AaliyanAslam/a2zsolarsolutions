import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import SolarCalculator from "./components/SolarCalculator";
import WhySolar from "./components/WhySolar";
import HowWeDeliver from "./components/HowWeDeliver";
import Services from "./components/Services";
import RecentProjects from "./components/RecentProjects";
import YouTubeSection from "./components/YouTubeSection";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <TrustBadges />
      <SolarCalculator />
      <WhySolar />
      <HowWeDeliver />
      <Services />
      <RecentProjects />
      <YouTubeSection />
    </main>
  );
}
