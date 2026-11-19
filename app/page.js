import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import SolarCalculator from "./components/SolarCalculator";
import WhySolar from "./components/WhySolar";
import HowWeDeliver from "./components/HowWeDeliver";
import Services from "./components/Services";
import ProductsShowcase from "./components/ProductsShowcase";
import RecentProjects from "./components/RecentProjects";
import ClientsFeedback from "./components/ClientsFeedback";
import YouTubeSection from "./components/YouTubeSection";
import DocumentsSection from "./components/DocumentsSection";

export const metadata = {
  title: {
    absolute: "A2Z Solar Solutions | Solar Karachi & Lahore — Best Solar Company & Installation",
  },
  description:
    "Looking for Solar in Karachi or Lahore? A2Z Solar Solutions (est. 2015) provides Tier-1 solar panels, hybrid inverters, lithium batteries & turnkey solar installations. Cut K-Electric bills up to 90%. Call 0321-4189298.",
  keywords: [
    "Solar Karachi",
    "Solar Panel Karachi",
    "Solar System Karachi",
    "Solar Energy Karachi",
    "Best Solar Company in Karachi",
    "Solar Installation Karachi",
    "Solar Panel Price in Karachi",
    "Solar System Price in Karachi",
    "Solar Inverter Karachi",
    "Solar Company near me",
    "Solar Lahore",
    "Solar Company in Lahore",
    "Solar Panel Installation Lahore",
    "K-Electric Net Metering Karachi",
    "Hybrid Solar System Pakistan",
    "3kW Solar System Price in Pakistan",
    "6kW Solar System Karachi",
    "10kW Solar System Karachi",
  ],
  alternates: {
    canonical: "https://a2zsolarsolutions.com",
  },
  openGraph: {
    title: "A2Z Solar Solutions | Solar Karachi & Lahore — Turnkey Solar Systems",
    description:
      "Cut K-Electric electricity bills by up to 90% and ensure 24/7 power backup with Tier-1 solar panels and smart hybrid systems in Karachi & Lahore.",
    url: "https://a2zsolarsolutions.com",
    siteName: "A2Z Solar Solutions",
    images: [
      {
        url: "/images/solar-image.webp",
        width: 1200,
        height: 630,
        alt: "A2Z Solar Solutions - Premium Solar Installations Karachi & Lahore",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A2Z Solar Solutions | Solar Karachi & Lahore",
    description:
      "Cut electricity bills by up to 90% and ensure 24/7 power backup with Tier-1 solar panels and smart hybrid systems in Karachi & Lahore.",
    images: ["/images/solar-image.webp"],
  },
};

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <TrustBadges />
      <SolarCalculator />
      <WhySolar />
      <HowWeDeliver />
      <Services />
      <ProductsShowcase />
      <RecentProjects />
      <ClientsFeedback />
      <YouTubeSection />
      <DocumentsSection />
    </main>
  );
}
