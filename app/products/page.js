import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductsPageClient from "./ProductsPageClient";

export const metadata = {
  title: "Solar Products Karachi & Lahore | Inverters, Panels & Batteries Price",
  description:
    "Buy Tier-1 hybrid solar inverters, lithium batteries, bifacial solar panels & accessories at competitive market prices in Karachi & Lahore. Verified warranties & same-day delivery.",
  keywords: [
    "Solar Panels Karachi",
    "Solar Inverter Price Karachi",
    "Lithium Battery Karachi",
    "Solar Panel Price in Pakistan",
    "Inverex Inverter Karachi",
    "Longi Solar Panels Karachi",
    "Jinko Solar Karachi",
    "Dyness Lithium Battery Pakistan",
    "Solar Accessories Karachi",
  ],
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

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({})
      .sort({ order: 1, createdAt: -1 })
      .select("-description -specifications -features")
      .lean();
    // Serialize MongoDB ObjectIds and dates to plain JSON
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to fetch products for SSR:", error?.message);
    return [];
  }
}

export default async function ProductsPage() {
  const initialProducts = await getProducts();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-[#0fa353] rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsPageClient initialProducts={initialProducts} />
    </Suspense>
  );
}
