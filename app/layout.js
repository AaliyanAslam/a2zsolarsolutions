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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "A2Z Solar Solutions",
    alternateName: "A to Z Solar Solutions",
    url: "https://a2zsolarsolutions.com",
    logo: "https://a2zsolarsolutions.com/logo/a2zlogo.webp",
    description:
      "A2Z Solar Solutions is a certified solar energy company providing smart hybrid and off-grid solar systems with advanced battery storage across Karachi and Lahore.",
    telephone: "+923214189298",
    email: "a2zsolarsolutions.com@gmail.com",
    sameAs: [
      "https://www.facebook.com/faizanelectronicsonline",
      "https://youtube.com/@A2ZSolarSolutions",
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Gulistan-e-Johar / Malir City",
        addressLocality: "Karachi",
        addressRegion: "Sindh",
        addressCountry: "PK",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Model Town / DHA Phase 5",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "A2Z Solar Solutions",
    url: "https://a2zsolarsolutions.com",
    logo: "https://a2zsolarsolutions.com/logo/a2zlogo.webp",
    image: "https://a2zsolarsolutions.com/images/solar-image.webp",
    telephone: "+923214189298",
    priceRange: "$$",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Bank Transfer, Pay Order",
    areaServed: ["Karachi", "Lahore", "Sindh", "Punjab", "Pakistan"],
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
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "A2Z Solar Solutions",
    alternateName: "A to Z Solar Solutions Pakistan",
    url: "https://a2zsolarsolutions.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://a2zsolarsolutions.com/documents?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${font.variable} font-sans h-full antialiased overflow-x-hidden`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="XVfiMRA9Dl5ji9U4pqlRVj8xbZgPteVYqKLUxt-Jfzc"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo/a2zlogo.webp" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body
        className="min-h-full flex flex-col bg-white text-gray-900 overflow-x-hidden w-full relative"
        suppressHydrationWarning
      >
        <h1 className="sr-only">
          A2Z Solar Solutions - Best Solar Energy Company in Karachi and Lahore
        </h1>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <Navbar />
        <div className="flex-1 w-full overflow-x-hidden">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
