import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import WhySolar from "./components/WhySolar";
import SolarCalculator from "./components/SolarCalculator";
import Services from "./components/Services";
import YouTubeSection from "./components/YouTubeSection";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <TrustBadges />
      <SolarCalculator />
      <WhySolar />
      <Services />
      <YouTubeSection />
    </main>
  );
}
