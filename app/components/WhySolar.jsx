import Link from "next/link";
import {
  FaBolt,
  FaLeaf,
  FaShieldHeart,
  FaWrench,
  FaChartLine,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa6";

const BENEFITS = [
  {
    icon: FaBolt,
    title: "Lower electricity bills",
    desc: "Depend less on the grid and protect yourself from rising tariffs and fuel adjustment surcharges.",
  },
  {
    icon: FaShieldHeart,
    title: "Energy independence",
    desc: "Generate your own power on-site and stop relying on the grid during outages and load shedding.",
  },
  {
    icon: FaWrench,
    title: "Low maintenance, long life",
    desc: "Tier-1 solar modules have no moving parts, need little upkeep and are built to last 25+ years.",
  },
  {
    icon: FaChartLine,
    title: "Higher property value",
    desc: "Homes and commercial buildings with a verified solar system are more attractive to buyers and tenants.",
  },
  {
    icon: FaLeaf,
    title: "Cleaner air",
    desc: "Solar produces no carbon emissions, which helps reduce urban air pollution across Pakistan.",
  },
];

const WHATSAPP_URL =
  "https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20want%20to%20consult%20about%20switching%20my%20property%20to%20Solar.";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]";

export default function WhySolar() {
  return (
    <section
      id="why-solar"
      aria-labelledby="why-solar-heading"
      className="scroll-mt-20 bg-white py-12 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left: intro + CTA (sticks while the list scrolls on desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2
                id="why-solar-heading"
                className="text-[1.75rem] font-black leading-tight tracking-tight text-[#1a1c29] sm:text-4xl md:text-5xl"
              >
                Why choose <span className="text-[#0fa353]">solar?</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                Solar is clean, renewable and cost-effective, which makes it a
                smart choice for homes, businesses and industries.
              </p>

              <div className="mt-8 rounded-sm bg-[#122116] p-5 text-white sm:p-7">
                <p className="text-lg font-bold leading-snug sm:text-xl">
                  Harness the sun. Save money. Power your future.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-emerald-100/80">
                  From consultation and system design to installation and
                  maintenance, our team handles everything for you.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/#calculator"
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] ${FOCUS}`}
                  >
                    Calculate your savings
                    <FaArrowRight size={11} aria-hidden="true" />
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 ${FOCUS}`}
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
          </div>

          {/* Right: benefits list */}
          <ul className="divide-y divide-gray-200 border-y border-gray-200 lg:col-span-7">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex gap-4 py-5 sm:gap-5 sm:py-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-emerald-50 text-[#0fa353] sm:h-12 sm:w-12">
                  <Icon className="text-lg sm:text-xl" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug text-[#1a1c29] sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:text-base">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
