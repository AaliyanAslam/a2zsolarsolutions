import Link from "next/link";
import {
  FaBolt,
  FaLeaf,
  FaShieldHeart,
  FaWrench,
  FaChartLine,
  FaArrowRight,
  FaWhatsapp,
  FaSun,
  FaCheck,
  FaQuoteLeft,
} from "react-icons/fa6";

const BENEFITS = [
  {
    icon: FaBolt,
    title: "Reduces Electricity Bills",
    desc: "Reduce reliance on conventional energy sources and protect yourself from escalating grid tariffs and peak fuel adjustment surcharges.",
    badge: "Cost Efficiency",
  },
  {
    icon: FaLeaf,
    title: "Environmentally Friendly",
    desc: "Solar energy produces zero carbon emissions, directly combating urban air pollution and contributing to a cleaner, greener Pakistan.",
    badge: "Zero Emissions",
  },
  {
    icon: FaShieldHeart,
    title: "Energy Independence",
    desc: "Generate your own clean electricity on-site and eliminate vulnerable dependency on frequent grid power outages and load shedding.",
    badge: "Self Reliance",
  },
  {
    icon: FaWrench,
    title: "Low Maintenance & Reliability",
    desc: "Modern Tier-1 solar modules are engineered with no moving parts, requiring minimal upkeep while delivering 25+ years of reliable power.",
    badge: "25+ Yrs Lifespan",
  },
  {
    icon: FaChartLine,
    title: "Increases Property Value",
    desc: "Homes and commercial facilities equipped with verified solar power systems command higher appraisal values and faster tenant acquisition.",
    badge: "Asset Growth",
  },
];

export default function WhySolar() {
  return (
    <section id="why-solar" className="py-14 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Background Ambient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0fa353]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 shadow-2xs">
            <FaSun className="text-[#0fa353] text-xs sm:text-sm animate-[spin_12s_linear_infinite]" />
            Clean Energy Transition
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1a1c29] tracking-tight leading-tight mb-3 sm:mb-5">
            Why Should You <span className="text-[#0fa353]">Choose Solar?</span>
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-gray-600 leading-relaxed font-normal">
            Solar energy is clean, renewable, and cost-effective, making it the smart choice for homes, businesses, and industries. Choosing solar power helps you take charge of your energy future:
          </p>
        </div>

        {/* ── Benefits Grid (5 Cards Layout) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#fbfdfa] hover:bg-white rounded-sm p-5 sm:p-7 border border-emerald-100/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-[#0fa353] group-hover:bg-[#0fa353] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs border border-emerald-100/80">
                      <Icon className="text-lg sm:text-xl" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1a1c29] mb-2 leading-snug group-hover:text-[#0fa353] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-[#0fa353]">
                  <FaCheck size={11} />
                  <span>Guaranteed Advantage</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Official Quote & Website Highlight */}
          <div className="bg-gradient-to-br from-[#1a3821] via-[#152a1a] to-[#0f1f13] text-white rounded-sm p-5 sm:p-7 shadow-lg flex flex-col justify-between relative overflow-hidden border border-emerald-800/40">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#0fa353]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#a3e635] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  Official Vision
                </span>
                <FaQuoteLeft className="text-emerald-400/50 text-xl" />
              </div>

              <blockquote className="text-base sm:text-lg font-bold text-white leading-snug mb-3">
                “Harness the Sun. Save Money. Power Your Future.”
              </blockquote>

              <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                Visit our official portal for solar insights, verified certifications, and turnkey project assistance:
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/15">
              <span className="text-xs sm:text-sm font-black tracking-wide text-[#a3e635] block mb-2">
                www.A2ZSolarSolutions.com
              </span>
              <Link
                href="/#calculator"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#a3e635] transition-colors"
              >
                <span>Calculate Your Payback</span>
                <FaArrowRight size={10} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Corporate Mission & Value Proposition Banner ── */}
        <div className="relative rounded-sm sm:rounded-sm bg-linear-to-r from-[#f4f8f3] via-white to-[#edf5ec] p-5 sm:p-8 md:p-10 border border-emerald-200/80 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="space-y-2.5 sm:space-y-3.5 max-w-3xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0fa353] bg-white px-3 py-1 rounded-sm border border-emerald-200/80 inline-block shadow-2xs">
                Turnkey Execution &amp; Support
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-[#1a1c29] tracking-tight leading-snug">
                Switch to Solar Simply, Affordably &amp; Efficiently
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-normal">
                At <strong className="text-[#1a1c29] font-bold">A2Z Solar Solutions</strong>, we make switching to solar simple, affordable, and efficient. Our expert team handles everything from consultation and system design to installation and maintenance, ensuring a seamless experience. By choosing solar, you take control of your energy, reduce costs, and contribute to a cleaner, greener future for your home, business, and the nation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/#calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-600/20 active:scale-[0.99] transition-all text-center"
              >
                <span>Calculate Savings</span>
                <FaArrowRight size={11} />
              </Link>

              <a
                href="https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20want%20to%20consult%20about%20switching%20my%20property%20to%20Solar."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-bold active:scale-[0.99] transition-all text-center shadow-2xs"
              >
                <FaWhatsapp className="text-[#25D366] text-base" />
                <span>Talk to an Engineer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
