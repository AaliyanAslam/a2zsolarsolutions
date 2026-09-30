import {
  FaCheckCircle,
  FaSolarPanel,
  FaTools,
  FaBoxOpen,
  FaHardHat,
  FaBroom,
  FaPlug,
  FaWhatsapp,
} from "react-icons/fa";

const WHATSAPP_NUMBER = "923214189298";

const inquiryLink = (title) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Salam Uzair Khan, I want to inquire about ${title} at A2Z Solar Solutions.`,
  )}`;

// The first item is shown as the featured service.
const services = [
  {
    label: "Core service",
    title: "Solar System Installations",
    description:
      "Complete turnkey design and installation of On-Grid, Hybrid and Off-Grid solar systems for homes, offices, schools and factories.",
    bullets: [
      "Custom load audit and solar capacity calculation",
      "High-efficiency Tier-1 bifacial panels (580W - 650W)",
      "Copper cabling with double insulation and AC/DC breakers",
      "AEDB compliant installation with zero-export configuration",
    ],
    icon: FaSolarPanel,
  },
  {
    label: "24/7 diagnostics",
    title: "Solar Troubleshoot & Maintenance",
    description:
      "Inverter fault diagnosis (Error 04, 09, 52, 58), loose termination fixes, earthing tests and earthing pit renewal.",
    bullets: [
      "Rapid on-site emergency troubleshooting in Karachi",
      "Inverter motherboard and MPPT component repair",
      "Thermal camera inspection to find hotspots",
      "Battery health analysis and cell equalization",
    ],
    icon: FaTools,
  },
  {
    label: "Authorized supply",
    title: "Sales of Inverters & Solar Panels",
    description:
      "Wholesale and retail supply of verified Tier-1 solar panels and top-brand inverters at competitive Pakistani market prices.",
    bullets: [
      "Original Inverex, Knox, Fronius, Growatt and Huawei inverters",
      "Longi Hi-MO, Jinko Tiger Neo and Canadian Solar bifacial modules",
      "Brand warranty cards with serial number verification",
      "Same-day pickup at Korangi No. 6 or delivery across Karachi",
    ],
    icon: FaBoxOpen,
  },
  {
    label: "Custom engineering",
    title: "Elevated Structures Fabrication",
    description:
      "Heavy-duty galvanized iron (GI) rooftop structures that lift the panels up, so your roof stays usable.",
    bullets: [
      "Raised pergola-style frames, 8ft to 12ft high",
      "Wind-load rated up to 150 km/h",
      "Hot-dip galvanized steel with civil foundation anchoring",
      "Keeps your full terrace free for family use",
    ],
    icon: FaHardHat,
  },
  {
    label: "Up to +30% power",
    title: "Solar Panels Cleaning Services",
    description:
      "Karachi's humidity, dust and pollution can cut solar output by 25-35%. Regular cleaning brings it back.",
    bullets: [
      "Soft rotating microfiber brushes that protect the glass",
      "Demineralized water rinse to prevent water spots",
      "Monthly and quarterly maintenance contracts",
      "Before and after generation report",
    ],
    icon: FaBroom,
  },
  {
    label: "Green meter",
    title: "K-Electric Net Metering Turnkey",
    description:
      "We handle the full net metering process: K-Electric approvals, AEDB licensing, bi-directional meter installation and reverse billing activation.",
    bullets: [
      "Complete legal documentation and engineer site survey",
      "NEPRA and K-Electric clearance and NOC processing",
      "Sell surplus power to the grid and earn credits",
      "Bring your electricity bill to zero or a credit balance",
    ],
    icon: FaPlug,
  },
];

function InquireButton({ title, dark = false }) {
  return (
    <a
      href={inquiryLink(title)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Inquire about ${title} on WhatsApp`}
      className={
        "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353] " +
        (dark
          ? "bg-[#25D366] text-[#122116] hover:bg-[#3ee27c]"
          : "border border-gray-300 bg-white text-[#1a1c29] hover:border-[#25D366] hover:bg-[#25D366] hover:text-white")
      }
    >
      <FaWhatsapp size={16} aria-hidden="true" />
      Inquire on WhatsApp
    </a>
  );
}

export default function Services() {
  const [featured, ...rest] = services;
  const FeaturedIcon = featured.icon;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-20 bg-gray-50 py-14 sm:py-20 md:py-24"
    >
      {/* Anchor kept for links pointing to #solutions */}
      <div
        id="solutions"
        className="absolute -top-24 left-0"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <h2
            id="services-heading"
            className="text-3xl font-black leading-tight tracking-tight text-[#1a1c29] sm:text-4xl md:text-5xl"
          >
            Everything you need to{" "}
            <span className="text-[#0fa353]">go solar</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
            From factory installations to home net metering, one team handles
            design, supply, installation and upkeep.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-6">
          {/* Featured service */}
          <article className="flex flex-col gap-8 rounded-sm bg-[#122116] p-6 text-white sm:p-10 md:col-span-2 lg:col-span-6 lg:flex-row lg:items-center lg:gap-14">
            <div className="lg:w-1/2">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-white/10 text-[#a3e635]">
                  <FeaturedIcon size={26} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-emerald-200">
                  {featured.label}
                </span>
              </div>
              <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-emerald-100/80 sm:text-base">
                {featured.description}
              </p>
              <div className="mt-6">
                <InquireButton title={featured.title} dark />
              </div>
            </div>

            <ul className="space-y-3 lg:w-1/2">
              {featured.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <FaCheckCircle
                    className="mt-0.5 shrink-0 text-[#a3e635]"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-snug text-emerald-50 sm:text-base">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Other services: 3 on the first row, 2 wider on the second (desktop) */}
          {rest.map((service, index) => {
            const Icon = service.icon;
            const span = index < 3 ? "lg:col-span-2" : "lg:col-span-3";
            return (
              <article
                key={service.title}
                className={`flex flex-col rounded-sm border border-gray-200 border-t-2 border-t-[#0fa353] bg-white p-6 sm:p-7 ${span}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-emerald-50 text-[#0fa353]">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-emerald-800">
                    {service.label}
                  </span>
                </div>

                <h3 className="text-lg font-bold leading-snug text-[#1a1c29] sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>

                <ul className="mb-7 mt-5 grow space-y-2.5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <FaCheckCircle
                        className="mt-0.5 shrink-0 text-sm text-[#0fa353]"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-snug text-gray-700">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <InquireButton title={service.title} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
