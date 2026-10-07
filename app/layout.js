import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const font = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://a2zsolarsolutions.com"),

  title: {
    default: "A2Z Solar Solutions | Best Solar Energy Company in Karachi & Lahore",
    template: "%s | A2Z Solar Solutions",
  },

  description:
    "A2Z Solar Solutions is Pakistan's leading renewable energy company specializing in Tier-1 hybrid solar systems, advanced lithium battery storage, and turnkey rooftop installations across Karachi and Lahore.",

  keywords: [
    "A2Z Solar Solutions",
    "A to Z Solar Solutions",
    "A2Z Solar",
    "Solar Company in Pakistan",
    "Best Solar Company in Karachi",
    "Solar Panel Installation Lahore",
    "Solar EPC Company Pakistan",
    "Renewable Energy Company Pakistan",
    "Certified Solar Engineers Karachi",
    "Turnkey Solar Solutions Pakistan",

    "Hybrid Solar System Pakistan",
    "Hybrid Solar System Karachi",
    "Off-Grid Solar System Pakistan",
    "3kW Hybrid Solar System",
    "5kW Hybrid Solar System",
    "6kW Hybrid Solar System Karachi",
    "10kW Hybrid Solar System",
    "15kW Hybrid Solar System",
    "20kW Hybrid Solar Plant",
    "Solar System for Home in Pakistan",
    "Commercial Solar Panels Karachi",
    "Industrial Solar Solutions Pakistan",

    "Hybrid Solar Inverter Pakistan",
    "Solar Battery Backup Karachi",
    "Lithium Battery Solar Storage",
    "24/7 Load Shedding Solution",
    "Hybrid Solar System Price in Pakistan",
    "Zero Electricity Bill Pakistan",
    "Solar Energy Bill Reduction",
    "UPS Replacement Solar System",

    "Tier 1 Solar Panels Pakistan",
    "Longi Solar Panels Price",
    "Jinko Solar Panels Karachi",
    "Canadian Solar Panels Pakistan",
    "JA Solar Panels",
    "Trina Solar Panels",
    "Solar Inverter Price in Pakistan",
    "Inverex Hybrid Inverter",
    "Nitrox Hybrid Inverter 6kW",
    "Growatt Solar Inverter",
    "Huawei Solar Inverter Pakistan",
    "Knox Inverter Price",
    "Dyness Lithium Battery Pakistan",
    "Solar Tubular Battery",
    "Lithium Iron Phosphate Battery",

    "Solar Load Calculator Pakistan",
    "Solar Sizing Calculator",
    "Solar Panel Cleaning Services",
    "Solar System Maintenance Karachi",
    "Solar Structure Fabrication",
    "Solar Battery Installation Lahore",
    "Solar Consultation Pakistan",
    "Solar Financing Banks Pakistan",

    "Solar Panel Installation DHA Karachi",
    "Solar Installation Bahria Town Karachi",
    "Solar Company Gulistan-e-Johar",
    "Solar Installation Model Colony Malir",
    "Solar System Model Town Lahore",
    "Solar Panel DHA Lahore",
  ],

  authors: [
    { name: "A2Z Solar Solutions", url: "https://a2zsolarsolutions.com" },
  ],
  creator: "A2Z Solar Solutions",
  publisher: "A2Z Solar Solutions",
  applicationName: "A2Z Solar Solutions",
  category: "Renewable Energy & Solar Installations",
  classification: "Solar Power Contractor",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://a2zsolarsolutions.com",
  },

  openGraph: {
    title: "A2Z Solar Solutions | Best Solar Energy Company in Karachi & Lahore",
    description:
      "Cut your electricity bills up to 90% and secure 24/7 power backup with Tier-1 solar panels, smart hybrid inverters, and lithium battery storage by A2Z Solar Solutions.",
    url: "https://a2zsolarsolutions.com",
    siteName: "A2Z Solar Solutions",
    images: [
      {
        url: "/images/solar-image.webp",
        width: 1200,
        height: 630,
        alt: "A2Z Solar Solutions - Turnkey Solar Energy Systems in Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "A2Z Solar Solutions | Solar Energy Systems Pakistan",
    description:
      "Certified solar installations, Tier-1 panels, smart hybrid inverters & lithium battery backup across Karachi and Lahore.",
    images: ["/images/solar-image.webp"],
  },

  verification: {
    google: "XVfiMRA9Dl5ji9U4pqlRVj8xbZgPteVYqKLUxt-Jfzc",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/logo/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  const SITE_URL = "https://a2zsolarsolutions.com/";
  const BRAND = "A2Z Solar Solutions";

  // Address exactly as listed on the Google Business Profile (NAP consistency)
  const karachiAddress = {
    "@type": "PostalAddress",
    streetAddress:
      "D-164, Korangi No. 6, Sector 51-A, Hasrat Mohani Colony, Korangi",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "78400",
    addressCountry: "PK",
  };

  const sameAs = [
    "https://www.facebook.com/share/18PCFJQaZC/",
    "https://www.tiktok.com/@a2z.solar.solutions",
    "https://youtube.com/@A2ZSolarSolutions",
  ];

  // Single connected @graph — WebSite (drives the site name shown in Google),
  // Organization (brand/knowledge panel) and LocalBusiness (maps/local pack).
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: BRAND,
        alternateName: [
          "A2Z Solar Solutions Pakistan",
          "A2Z Solar Solutions Karachi",
          "A to Z Solar Solutions",
          "A2ZSolarSolutions",
        ],
        description:
          "Official website of A2Z Solar Solutions — solar panels, hybrid inverters, lithium batteries and turnkey solar installations in Karachi and Lahore.",
        inLanguage: "en-PK",
        publisher: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: BRAND,
        legalName: BRAND,
        alternateName: ["A to Z Solar Solutions", "A2ZSolarSolutions"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}#logo`,
          url: "https://a2zsolarsolutions.com/logo/icon-512x512.png",
          width: 512,
          height: 512,
          caption: BRAND,
        },
        image: { "@id": `${SITE_URL}#logo` },
        description:
          "A2Z Solar Solutions is a Karachi-based solar energy company (est. 2015) providing hybrid, on-grid and off-grid solar systems, Tier-1 panels, inverters and lithium battery storage across Pakistan.",
        foundingDate: "2015",
        telephone: "+92-321-4189298",
        email: "a2zsolarsolutions.com@gmail.com",
        address: karachiAddress,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+92-321-4189298",
          contactType: "customer service",
          areaServed: "PK",
          availableLanguage: ["English", "Urdu"],
        },
        sameAs,
      },
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${SITE_URL}#localbusiness`,
        name: BRAND,
        url: SITE_URL,
        parentOrganization: { "@id": `${SITE_URL}#organization` },
        logo: { "@id": `${SITE_URL}#logo` },
        image: "https://a2zsolarsolutions.com/images/solar-image.webp",
        description:
          "Solar energy company in Karachi — solar panel installation, hybrid inverters, lithium batteries and complete solar systems for homes, businesses and industries.",
        telephone: "+92-321-4189298",
        email: "a2zsolarsolutions.com@gmail.com",
        address: karachiAddress,
        hasMap:
          "https://www.google.com/maps/search/?api=1&query=A2Z+Solar+Solutions+Korangi+Karachi",
        priceRange: "$$",
        currenciesAccepted: "PKR",
        paymentAccepted: "Cash, Bank Transfer, Pay Order",
        areaServed: [
          { "@type": "City", name: "Karachi" },
          { "@type": "City", name: "Lahore" },
          { "@type": "Country", name: "Pakistan" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "19:00",
          },
        ],
        sameAs,
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${font.variable} font-sans h-full antialiased overflow-x-hidden`}
    >
      <head>
        {/* Favicons, verification & app name are emitted via `metadata` above */}
        <meta name="apple-mobile-web-app-title" content="A2Z Solar Solutions" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaGraph).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-white text-gray-900 overflow-x-hidden w-full relative"
        suppressHydrationWarning
      >

        <Navbar />
        <div className="flex-1 w-full overflow-x-hidden">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
