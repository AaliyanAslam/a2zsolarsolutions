import { Suspense } from "react";
import ProductsPageClient from "./ProductsPageClient";

export const metadata = {
  title: "Solar Products | Inverters, Batteries, Panels & Accessories",
  description:
    "Browse A2Z Solar Solutions' complete product catalog: Tier-1 hybrid inverters, lithium batteries, tubular batteries, solar panels, MPPT charge controllers, EV charging stations, and electrical accessories in Karachi & Lahore.",
  alternates: {
    canonical: "https://a2zsolarsolutions.com/products",
  },
  openGraph: {
    title: "Solar Products Catalog | A2Z Solar Solutions",
    description:
      "Shop Tier-1 solar inverters, lithium & tubular batteries, solar panels, MPPT controllers, and EV charging solutions from Pakistan's leading solar company.",
    url: "https://a2zsolarsolutions.com/products",
    siteName: "A2Z Solar Solutions",
    images: [
      {
        url: "/images/solar-image.webp",
        width: 1200,
        height: 630,
        alt: "A2Z Solar Solutions Products Catalog",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Products | A2Z Solar Solutions",
    description:
      "Tier-1 inverters, lithium batteries, solar panels, MPPT controllers & EV chargers from A2Z Solar Solutions.",
    images: ["/images/solar-image.webp"],
  },
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-[#0fa353] rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsPageClient />
    </Suspense>
  );
}
