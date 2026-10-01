import Link from "next/link";
import Image from "next/image";
import {
  FaSolarPanel,
  FaShieldHalved,
  FaEye,
  FaBullseye,
  FaBuilding,
  FaCity,
  FaWhatsapp,
  FaPhone,
  FaGlobe,
  FaCheck,
  FaLocationDot,
  FaArrowRight,
  FaBolt,
  FaWrench,
  FaFileContract,
} from "react-icons/fa6";

export const metadata = {
  title: "About Us | A2Z Solar Solutions - FBR Registered Solar Company",
  description:
    "Founded in 2015, A2Z Solar Solutions is an FBR registered renewable energy company headquartered in Karachi, delivering complete turnkey solar power solutions across Karachi and Lahore.",
  alternates: {
    canonical: "https://a2zsolarsolutions.com/about",
  },
  openGraph: {
    title: "About Us | A2Z Solar Solutions Pakistan",
    description:
      "Learn about A2Z Solar Solutions - Over a decade of excellence in residential, commercial and industrial solar power engineering.",
    url: "https://a2zsolarsolutions.com/about",
    siteName: "A2Z Solar Solutions",
    images: [
      {
        url: "/images/about-hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "About A2Z Solar Solutions",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | A2Z Solar Solutions",
    description:
      "Over a decade of excellence in residential, commercial and industrial solar power engineering in Karachi & Lahore.",
    images: ["/images/about-hero-bg.webp"],
  },
};

const PHONE_DISPLAY = "0321-4189298";
const PHONE_TEL = "+923214189298";
const WHATSAPP_URL = `https://wa.me/923214189298?text=${encodeURIComponent(
  "Salam A2Z Solar, I would like to talk to a solar engineer.",
)}`;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353]";
const FOCUS_DARK =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]";

const STATS = [
  { value: "2015", label: "Founded", subtext: "Over a decade of experience" },
  {
    value: "10+",
    label: "Years of trust",
    subtext: "Quality, safety and innovation",
  },
  {
    value: "2 cities",
    label: "Karachi and Lahore",
    subtext: "Homes, businesses, industry",
  },
  {
    value: "100%",
    label: "Turnkey execution",
    subtext: "From survey to net meter",
  },
];

const HIGHLIGHTS = [
  "FBR registered and compliant",
  "Active branches in Karachi and Lahore",
  "High-wind elevated structures",
  "Tier-1 N-Type bifacial solar modules",
  "Smart hybrid battery integration",
  "24/7 troubleshooting and maintenance",
];

const EXPERTISE_AREAS = [
  {
    title: "Complete turnkey installations",
    desc: "Load audits, system design, equipment procurement and seamless commissioning for smart Hybrid solar setups.",
    icon: FaSolarPanel,
  },
  {
    title: "Customized elevated structures",
    desc: "Heavy-gauge galvanized steel fabrication built for strong coastal wind and all-day sun capture.",
    icon: FaBuilding,
  },
  {
    title: "24/7 diagnostics and maintenance",
    desc: "Error code fixes (Error 04, 09, 52), thermal imaging for hot spots, cell equalization and earthing renewals.",
    icon: FaWrench,
  },
  {
    title: "Residential, commercial and industrial",
    desc: "Systems from 5kW to 20kW for villas, up to industrial rooftops in the megawatt range, in Karachi and Lahore.",
    icon: FaCity,
  },
];

const PILLARS = [
  {
    title: "FBR registered and compliant",
    desc: "A fully registered company that follows AEDB quality benchmarks and uses double-insulated wiring.",
    icon: FaFileContract,
  },
  {
    title: "Tier-1 hardware only",
    desc: "Tier-1 bifacial panels (580W-650W) and top-rated inverters such as Inverex, Nitrox, Huawei, Growatt and Deye.",
    icon: FaBolt,
  },
  {
    title: "Safe elevated structures",
    desc: "Structural joints and mounting hardware are chemically anchored and built with certified heavy-gauge channel sections.",
    icon: FaShieldHalved,
  },
  {
    title: "24/7 Power Security",
    desc: "Smart hybrid inverters paired with lithium batteries ensure zero downtime during grid load shedding and power cuts.",
    icon: FaGlobe,
  },
];

const LOCATIONS = [
  {
    city: "Karachi",
    role: "Headquarters and central warehouse",
    coverage:
      "DHA, Clifton, Gulshan, North Nazimabad, Korangi, Bahria Town and industrial estates (SITE, Korangi, FB Area).",
  },
  {
    city: "Lahore",
    role: "Regional operations and project office",
    coverage:
      "DHA, Bahria Town, Gulberg, Johar Town, Model Town, Raiwind Road and Sundar Industrial Estate.",
  },
];

const H2 =
  "text-[1.65rem] font-black leading-tight tracking-tight text-[#1a1c29] sm:text-3xl lg:text-4xl";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pb-12 pt-24 sm:pb-16 sm:pt-32 md:flex md:min-h-[80svh] md:items-center md:pt-40">
        <div
          className="absolute inset-0 z-0 hidden md:block"
          aria-hidden="true"
        >
          <Image
            src="/images/about-hero-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover md:object-right"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/20 to-white" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-400 px-4 sm:px-6 lg:px-8">
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
                About us
              </li>
            </ol>
          </nav>

          <div className="max-w-2xl lg:max-w-3xl">
            <h1 className="text-[2rem] font-black leading-[1.1] tracking-tight text-[#1a1c29] sm:text-5xl lg:text-6xl">
              An FBR registered solar company,{" "}
              <span className="text-[#0fa353]">since 2015</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-gray-700 sm:text-lg lg:text-xl">
              A2Z Solar Solutions is a renewable energy company headquartered in
              Karachi. We serve clients across Karachi and Lahore with complete
              solar power solutions for homes, businesses and industries.
            </p>

            <p className="mt-4 border-l-4 border-[#0fa353] pl-4 text-base font-semibold text-[#1a3821]">
              Lighting the Nation with Clean Energy.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#calculator"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] ${FOCUS}`}
              >
                Calculate your savings
                <FaArrowRight size={11} aria-hidden="true" />
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-[#1a1c29] transition-colors hover:bg-gray-50 ${FOCUS}`}
              >
                <FaPhone size={12} aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-gray-200 pt-8 sm:mt-16 lg:grid-cols-4 lg:gap-x-8">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border-t-2 border-[#0fa353] pt-3"
              >
                <dd className="text-2xl font-black tracking-tight text-[#0fa353] sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-sm font-bold leading-tight text-[#1a1c29]">
                  {stat.label}
                </dt>
                <dd className="mt-0.5 text-sm leading-snug text-gray-600">
                  {stat.subtext}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story + expertise */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className={H2}>Engineering, reliability and innovation</h2>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              <p>
                With over a decade of experience, A2Z Solar Solutions has built
                a reputation for quality and reliability. Our engineers and
                technicians specialize in solar system design, installation,
                maintenance and customized elevated structures, so your system
                performs well, stays safe and keeps saving you money.
              </p>
              <p>
                We believe renewable energy is not just the future, it is the
                present. Our mission is to give communities and businesses
                clean, affordable solar power that cuts costs and supports
                Pakistan&apos;s move toward energy independence.
              </p>
            </div>

            <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <FaCheck size={9} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-gray-800 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold text-gray-600">What we do</h3>
            <ul className="mt-2 divide-y divide-gray-200 border-y border-gray-200">
              {EXPERTISE_AREAS.map(({ title, desc, icon: Icon }) => (
                <li key={title} className="flex gap-4 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-emerald-50 text-[#0fa353]">
                    <Icon className="text-lg" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold leading-snug text-[#1a1c29]">
                      {title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <figure className="rounded-sm bg-[#122116] p-6 text-white sm:p-10 md:p-14">
          <blockquote className="max-w-4xl text-xl font-extrabold leading-snug tracking-tight sm:text-2xl md:text-3xl">
            &ldquo;We don&apos;t just install solar systems. We build lasting
            energy partnerships that give you clean, dependable and affordable
            power for years to come.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-emerald-100/80">
            A2Z Solar Solutions, Karachi
          </figcaption>
        </figure>
      </section>

      {/* Vision and mission */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <h2 className={H2}>Our vision and mission</h2>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-6">
          {[
            {
              title: "Our vision",
              icon: FaEye,
              text: "To become Pakistan's most trusted and innovative solar energy provider, leading the move to a clean, sustainable and energy-independent future. We want solar power to be accessible, affordable and reliable for every home and business.",
            },
            {
              title: "Our mission",
              icon: FaBullseye,
              text: "To deliver reliable, efficient and sustainable solar solutions for homes, businesses and industries across Pakistan, with quality installations, professional maintenance and innovative technology that support energy independence.",
            },
          ].map(({ title, icon: Icon, text }) => (
            <article
              key={title}
              className="rounded-sm border border-gray-200 border-t-2 border-t-[#0fa353] bg-white p-6 sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-emerald-50 text-[#0fa353]">
                <Icon className="text-xl" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-black tracking-tight text-[#1a1c29] sm:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="border-y border-gray-100 bg-[#fbfdfa]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className={H2}>Serving Karachi and Lahore</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              Local teams in both cities for installation and fast maintenance
              support.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-6">
            {LOCATIONS.map((loc) => (
              <article
                key={loc.city}
                className="flex flex-col rounded-sm border border-gray-200 bg-white p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-emerald-50 text-[#0fa353]">
                    <FaLocationDot aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-black text-[#1a1c29] sm:text-2xl">
                    {loc.city}
                  </h3>
                </div>

                <p className="mt-4 text-base font-semibold text-emerald-800">
                  {loc.role}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                  <strong className="font-bold text-gray-800">
                    Coverage:{" "}
                  </strong>
                  {loc.coverage}
                </p>

                <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-gray-300 px-5 py-3 text-sm font-bold text-[#1a1c29] transition-colors hover:bg-gray-50 ${FOCUS}`}
                  >
                    <FaPhone size={12} aria-hidden="true" />
                    Call {PHONE_DISPLAY}
                  </a>
                  <p className="text-sm text-gray-600">
                    Mon - Sat, 9 AM - 8 PM
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className={H2}>Why choose A2Z Solar Solutions</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            The standards and service that set our installations apart.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PILLARS.map(({ title, desc, icon: Icon }) => (
            <li
              key={title}
              className="rounded-sm border border-gray-200 border-t-2 border-t-[#0fa353] bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-emerald-50 text-[#0fa353]">
                <Icon className="text-lg" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug text-[#1a1c29] sm:text-lg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {desc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="rounded-sm bg-[#122116] p-6 text-white sm:p-10 md:p-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl md:text-4xl">
                Ready to build your energy independence?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-emerald-100/80">
                Get a load audit, see how much your bill can drop, and receive a
                customized solar proposal from our certified engineers.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
              <Link
                href="/#calculator"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] ${FOCUS_DARK}`}
              >
                Calculate your savings
                <FaArrowRight size={11} aria-hidden="true" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 ${FOCUS_DARK}`}
              >
                <FaWhatsapp
                  className="text-base text-[#25D366]"
                  aria-hidden="true"
                />
                Talk to an engineer
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
