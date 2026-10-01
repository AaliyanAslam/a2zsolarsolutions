import Link from "next/link";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaLocationDot,
  FaArrowRight,
} from "react-icons/fa6";

export const metadata = {
  title: "Contact Us | Solar Consultation & Free Site Survey in Karachi & Lahore",
  description:
    "Get in touch with A2Z Solar Solutions for solar consultation, site inspections, and hybrid solar system installations in Karachi and Lahore. Call or WhatsApp +92 321 4189298.",
  alternates: {
    canonical: "https://a2zsolarsolutions.com/contact",
  },
  openGraph: {
    title: "Contact Us | A2Z Solar Solutions",
    description:
      "Speak with certified solar engineers in Karachi and Lahore. Get your customized solar energy proposal today.",
    url: "https://a2zsolarsolutions.com/contact",
    siteName: "A2Z Solar Solutions",
    images: [
      {
        url: "/images/solar-image.webp",
        width: 1200,
        height: 630,
        alt: "Contact A2Z Solar Solutions",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | A2Z Solar Solutions",
    description:
      "Get in touch with A2Z Solar Solutions for hybrid solar quotes, site inspections and battery backup solutions.",
    images: ["/images/solar-image.webp"],
  },
};

const PHONE_DISPLAY = "+92 321 4189298";
const PHONE_TEL = "+923214189298";
const EMAIL = "a2zsolarsolutions.com@gmail.com";
const WHATSAPP_URL = `https://wa.me/923214189298?text=${encodeURIComponent(
  "Salam A2Z Solar, I would like to get a solar quote.",
)}`;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353]";
const FOCUS_DARK =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]";

const CONTACT_CHANNELS = [
  {
    icon: FaPhone,
    title: "Call us",
    desc: "Speak with our certified solar engineers.",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
    btnText: "Call now",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    desc: "Get a quick quote and system estimate.",
    value: PHONE_DISPLAY,
    href: WHATSAPP_URL,
    btnText: "Chat on WhatsApp",
    external: true,
  },
  {
    icon: FaEnvelope,
    title: "Email",
    desc: "For corporate tenders and formal inquiries.",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    btnText: "Send email",
  },
];

const LOCATIONS = [
  {
    city: "Karachi head office",
    address: "Gulistan-e-Johar / Malir City, Karachi, Sindh",
    timing: "Mon - Sat, 9:00 AM - 7:00 PM",
  },
  {
    city: "Lahore regional office",
    address: "Model Town / DHA Phase 5, Lahore, Punjab",
    timing: "Mon - Sat, 9:00 AM - 6:00 PM",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pb-16 pt-24 text-gray-900 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-3xl sm:mb-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-sm font-medium text-gray-600"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className={`hover:text-[#0fa353] ${FOCUS}`}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">
                /
              </li>
              <li aria-current="page" className="font-semibold text-[#0fa353]">
                Contact
              </li>
            </ol>
          </nav>

          <h1 className="text-[2rem] font-black leading-[1.1] tracking-tight text-[#1a1c29] sm:text-5xl">
            Let&apos;s power your home or business with{" "}
            <span className="text-[#0fa353]">solar</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            Questions about system sizing, hybrid battery backup or inverter
            prices? Our certified solar engineers are ready to help.
          </p>
        </div>

        {/* Contact channels */}
        <ul className="mb-12 grid gap-4 sm:mb-16 md:grid-cols-3 md:gap-6">
          {CONTACT_CHANNELS.map(
            ({ icon: Icon, title, desc, value, href, btnText, external }) => (
              <li
                key={title}
                className="flex flex-col rounded-sm border border-gray-200 border-t-2 border-t-[#0fa353] bg-white p-6 sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-emerald-50 text-xl text-[#0fa353]">
                  <Icon aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-[#1a1c29]">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
                <p className="mb-6 mt-3 break-all text-base font-black text-gray-900">
                  {value}
                </p>

                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-sm bg-[#0fa353] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] ${FOCUS}`}
                >
                  {btnText}
                </a>
              </li>
            ),
          )}
        </ul>

        {/* Offices */}
        <section aria-labelledby="offices-heading" className="mb-12 sm:mb-16">
          <h2
            id="offices-heading"
            className="text-2xl font-black tracking-tight text-[#1a1c29] sm:text-3xl"
          >
            Our offices
          </h2>

          <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
            {LOCATIONS.map((loc) => (
              <li
                key={loc.city}
                className="rounded-sm border border-gray-200 bg-[#fbfdfa] p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-emerald-50 text-[#0fa353]">
                    <FaLocationDot aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-[#1a1c29]">
                    {loc.city}
                  </h3>
                </div>

                <dl className="mt-5 space-y-3 border-t border-gray-200 pt-5 text-sm sm:text-base">
                  <div>
                    <dt className="font-bold text-gray-800">Address</dt>
                    <dd className="mt-0.5 text-gray-600">{loc.address}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-800">Hours</dt>
                    <dd className="mt-0.5 text-gray-600">{loc.timing}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-800">Phone</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${PHONE_TEL}`}
                        className={`inline-block py-1 font-bold text-[#0fa353] hover:underline ${FOCUS}`}
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* Calculator CTA */}
        <div className="flex flex-col gap-6 rounded-sm bg-[#122116] p-6 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl font-black sm:text-2xl">
              Want an instant load estimate?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100/80 sm:text-base">
              Use our solar calculator to find the capacity you need, your daily
              energy units and your monthly savings.
            </p>
          </div>
          <Link
            href="/#calculator"
            className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] ${FOCUS_DARK}`}
          >
            Open solar calculator
            <FaArrowRight size={11} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
