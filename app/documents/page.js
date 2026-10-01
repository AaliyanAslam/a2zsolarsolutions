import DocumentsClient from "./DocumentsClient";

export const metadata = {
  title: "Download Solar Brochures, Datasheets & Inverter Manuals | A2Z Solar",
  description:
    "Download official PDF technical datasheets, solar panel warranty terms, hybrid inverter manuals, and net metering guidebooks provided by A2Z Solar Solutions.",
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

export default function DocumentsPage() {
  return <DocumentsClient />;
}
