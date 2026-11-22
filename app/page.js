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
    absolute: "A2Z Solar Solutions | Solar Company Karachi & Lahore",
  },
  description:
    "A2Z Solar Solutions installs Tier-1 solar panels & hybrid systems in Karachi & Lahore. Cut bills up to 90%. Call 0321-4189298 for a free quote.",
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
    title: "A2Z Solar Solutions | Solar Company Karachi & Lahore",
    description:
      "A2Z Solar Solutions installs Tier-1 solar panels & hybrid systems in Karachi & Lahore. Cut bills up to 90%. Call 0321-4189298 for a free quote.",
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
    title: "A2Z Solar Solutions | Solar Company Karachi & Lahore",
    description:
      "A2Z Solar Solutions installs Tier-1 solar panels & hybrid systems in Karachi & Lahore. Cut bills up to 90%. Call 0321-4189298 for a free quote.",
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
