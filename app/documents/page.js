import connectDB from "@/lib/mongodb";
import Document from "@/models/Document";
import DocumentsClient from "./DocumentsClient";

export const metadata = {
  title: "Download Solar Brochures, Datasheets & Inverter Manuals | A2Z Solar",
  description:
    "Download official PDF technical datasheets, solar panel warranty terms, hybrid inverter manuals, and battery storage guides provided by A2Z Solar Solutions.",
  alternates: {
    canonical: "https://a2zsolarsolutions.com/documents",
  },
  openGraph: {
    title: "Solar Technical Documents & Downloads | A2Z Solar Solutions",
    description:
      "Access official solar panel brochures, inverter user manuals, and warranty documentation for your solar power system.",
    url: "https://a2zsolarsolutions.com/documents",
    siteName: "A2Z Solar Solutions",
    images: [
      {
        url: "/images/solar-image.webp",
        width: 1200,
        height: 630,
        alt: "A2Z Solar Technical Documents & Downloads",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Solar Datasheets & Manuals | A2Z Solar",
    description:
      "Download official PDF datasheets, brochures, and warranty manuals for solar systems.",
    images: ["/images/solar-image.webp"],
  },
};

async function getDocuments() {
  try {
    await connectDB();
    const documents = await Document.find({}).sort({ createdAt: -1 }).lean();
    // Serialize MongoDB ObjectIds and dates to plain JSON
    return JSON.parse(JSON.stringify(documents));
  } catch (error) {
    console.error("Failed to fetch documents for SSR:", error?.message);
    return [];
  }
}

export default async function DocumentsPage() {
  const initialDocuments = await getDocuments();

  return <DocumentsClient initialDocuments={initialDocuments} />;
}
