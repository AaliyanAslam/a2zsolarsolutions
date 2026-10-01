import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import SolarCalculator from "./components/SolarCalculator";
import WhySolar from "./components/WhySolar";
import HowWeDeliver from "./components/HowWeDeliver";
import Services from "./components/Services";
import RecentProjects from "./components/RecentProjects";
import ClientsFeedback from "./components/ClientsFeedback";
import YouTubeSection from "./components/YouTubeSection";
import DocumentsSection from "./components/DocumentsSection";

export const metadata = {
  title: "A2Z Solar Solutions | Best Solar Energy Company in Karachi & Lahore",
  description:
    "Pakistan's trusted solar energy partner since 2015. Turnkey residential, commercial & industrial solar installations, Tier-1 panels, smart inverters & K-Electric net-metering.",
  alternates: {
    canonical: "https://a2zsolarsolutions.com",
  },
  openGraph: {
    title: "A2Z Solar Solutions | Turnkey Solar Energy Systems in Pakistan",
    description:
      "Cut electricity bills by up to 90%. Tier-1 solar panels, hybrid inverters & K-Electric net metering in Karachi & Lahore.",
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
    title: "A2Z Solar Solutions | Turnkey Solar Energy Systems",
    description:
      "Cut electricity bills by up to 90%. Tier-1 solar panels, hybrid inverters & K-Electric net metering in Karachi & Lahore.",
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
      <RecentProjects />
      <ClientsFeedback />
      <YouTubeSection />
      <DocumentsSection />
    </main>
  );
}
