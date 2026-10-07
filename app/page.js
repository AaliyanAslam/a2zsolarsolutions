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
    absolute: "A2Z Solar Solutions | Best Solar Energy Company in Karachi & Lahore",
  },
  description:
    "A2Z Solar Solutions (est. 2015) — Karachi's trusted solar company. Solar panels, hybrid inverters, lithium batteries & turnkey solar installations for homes, businesses & industries. Call 0321-4189298.",
  alternates: {
    canonical: "https://a2zsolarsolutions.com",
  },
  openGraph: {
    title: "A2Z Solar Solutions | Turnkey Hybrid Solar Systems in Pakistan",
    description:
      "Cut electricity bills by up to 90% and ensure 24/7 power backup with Tier-1 solar panels and smart hybrid systems in Karachi & Lahore.",
    url: "https://a2zsolarsolutions.com",
    siteName: "A2Z Solar Solutions",
    images: [
      {
        url: "/images/solar-image.webp",
        width: 1200,
        height: 630,
        alt: "A2Z Solar Solutions - Premium Solar Installations Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A2Z Solar Solutions | Turnkey Hybrid Solar Systems",
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
