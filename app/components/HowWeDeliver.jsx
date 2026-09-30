import Link from "next/link";
import {
  FaComments,
  FaCompassDrafting,
  FaScrewdriverWrench,
  FaHeadset,
  FaArrowRight,
  FaWhatsapp,
  FaMagnifyingGlassLocation,
} from "react-icons/fa6";

const STEPS = [
  {
    title: "Consultation",
    desc: "We understand your energy needs, budget and goals, then recommend the right solar setup for your home, business or industry.",
    icon: FaComments,
  },
  {
    title: "Site inspection",
    desc: "Our certified engineers survey your rooftop: orientation, shading and your electrical distribution board.",
    icon: FaMagnifyingGlassLocation,
  },
  {
    title: "Custom structure design",
    desc: "We prepare a 3D CAD layout and heavy-gauge galvanized frames built for maximum sunlight and strong wind.",
    icon: FaCompassDrafting,
  },
  {
    title: "Turnkey installation",
    desc: "Our technicians handle alignment, secure mounting and clean integration with your electrical system.",
    icon: FaScrewdriverWrench,
  },
  {
    title: "After-sales support",
    desc: "Ongoing maintenance and troubleshooting keep your system running at peak efficiency for years.",
    icon: FaHeadset,
  },
];

const WHATSAPP_URL =
  "https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20would%20like%20to%20schedule%20a%20Consultation%20and%20Site%20Inspection.";

export default function HowWeDeliver() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-20 border-y border-gray-100 bg-[#fbfdfa] py-14 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl sm:mb-16">
          <h2
            id="process-heading"
            className="text-3xl font-black leading-tight tracking-tight text-[#1a1c29] sm:text-4xl md:text-5xl"
          >
            From first call to{" "}
            <span className="text-[#0fa353]">a working solar system</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
            A2Z Solar Solutions follows the same five steps on every project, so
            you always know what happens next.
          </p>
        </div>

        {/* Timeline: vertical on mobile, horizontal on desktop */}
        <ol className="relative grid grid-cols-1 gap-y-10 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
          {/* Vertical line (mobile) */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-emerald-200 lg:hidden"
          />
          {/* Horizontal line (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-6 right-6 top-6 hidden h-px bg-emerald-200 lg:block"
          />

          {STEPS.map(({ title, desc, icon: Icon }, idx) => (
            <li
              key={title}
              className="relative flex gap-5 lg:block"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#0fa353] shadow-xs">
                <Icon className="text-lg" aria-hidden="true" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0fa353] text-[11px] font-bold leading-none text-white">
                  {idx + 1}
                </span>
              </div>

              <div className="lg:mt-6">
                <h3 className="text-base font-bold leading-snug text-[#1a1c29] sm:text-lg">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Closing CTA */}
        <div className="mt-14 overflow-hidden rounded-sm bg-[#122116] text-white sm:mt-20">
          <div className="flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xl font-bold leading-snug sm:text-2xl">
                Seamless solar, every step of the way.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-emerald-100/80">
                We manage the full journey: site audit, K-Electric green-meter
                sanctioning and 24/7 maintenance. Book a free site inspection
                with our engineers in Karachi or Lahore.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
              >
                <FaWhatsapp className="text-base" aria-hidden="true" />
                Book site inspection
              </a>
              <Link
                href="/#calculator"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
              >
                Calculate your load
                <FaArrowRight size={11} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}