import {
  FaComments,
  FaCompassDrafting,
  FaScrewdriverWrench,
  FaHeadset,
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
      </div>
    </section>
  );
}