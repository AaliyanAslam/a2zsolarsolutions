import Link from "next/link";
import {
  FaComments,
  FaCompassDrafting,
  FaScrewdriverWrench,
  FaHeadset,
  FaArrowRight,
  FaWhatsapp,
  FaMagnifyingGlassLocation,
  FaQuoteLeft,
} from "react-icons/fa6";

const STEPS = [
  {
    step: "01",
    title: "Consultation",
    desc: "We begin by understanding your energy needs, budget, and goals. Our experts provide guidance on the best solar solutions tailored to your home, business, or industry.",
    icon: FaComments,
    badge: "Step 1",
  },
  {
    step: "02",
    title: "Site Inspection",
    desc: "Our certified engineers conduct a detailed on-site survey of your rooftop, structural azimuth, shading analysis, and electrical distribution board.",
    icon: FaMagnifyingGlassLocation,
    badge: "Step 2",
  },
  {
    step: "03",
    title: "Customized Structure Design",
    desc: "We engineer customized 3D CAD system layouts and heavy-gauge galvanized elevated frames built for maximum solar irradiance and high wind endurance.",
    icon: FaCompassDrafting,
    badge: "Step 3",
  },
  {
    step: "04",
    title: "Turnkey Installation",
    desc: "Our skilled technicians handle the complete installation process, ensuring proper alignment, secure mounting, and seamless integration with your electrical system for maximum performance.",
    icon: FaScrewdriverWrench,
    badge: "Step 4",
  },
  {
    step: "05",
    title: "After-Sales Support",
    desc: "We provide ongoing maintenance, troubleshooting, and support to ensure your solar system continues to operate at peak efficiency, giving you peace of mind and long-term savings.",
    icon: FaHeadset,
    badge: "Step 5",
  },
];

export default function HowWeDeliver() {
  return (
    <section id="process" className="py-14 sm:py-20 md:py-24 bg-[#fbfdfa] relative overflow-hidden border-t border-b border-gray-100">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0fa353]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3 sm:py-1.5 sm:px-4 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0fa353] animate-pulse" />
            Step-by-Step Process
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1a1c29] tracking-tight leading-tight mb-3 sm:mb-5">
            Solar Solutions — <span className="text-[#0fa353]">How We Deliver</span>
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-gray-600 leading-relaxed font-normal">
            At <strong className="text-[#1a1c29] font-bold">A2Z Solar Solutions.</strong>, we follow a structured and customer-focused process to deliver reliable and efficient solar solutions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {STEPS.map((stepItem, idx) => {
            const Icon = stepItem.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white hover:bg-emerald-50/20 rounded-sm p-5 sm:p-7 border border-emerald-100/90 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-sm bg-emerald-50 text-[#0fa353] group-hover:bg-[#0fa353] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs border border-emerald-100">
                        <Icon className="text-lg sm:text-xl" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-200 group-hover:text-emerald-400/80 transition-colors">
                        {stepItem.step}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-sm border border-emerald-200/70">
                      {stepItem.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1a1c29] mb-2 leading-snug group-hover:text-[#0fa353] transition-colors">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {stepItem.desc}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-gray-100 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                  <span>Structured Milestone</span>
                  <span className="text-gray-400 group-hover:text-[#0fa353] transition-colors">→</span>
                </div>
              </div>
            );
          })}

          <div className="bg-linear-to-br from-[#122116] via-[#162a1c] to-[#0d1a11] text-white rounded-sm p-5 sm:p-7 shadow-lg flex flex-col justify-between relative overflow-hidden border border-emerald-900/60">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#0fa353]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#a3e635] bg-white/10 px-2.5 py-0.5 rounded-sm border border-white/15">
                  Process Guarantee
                </span>
                <FaQuoteLeft className="text-emerald-400/40 text-xl" />
              </div>

              <blockquote className="text-lg sm:text-xl font-bold text-white leading-snug mb-3">
                “Seamless Solar Solutions, Every Step of the Way.”
              </blockquote>

              <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                From initial site audit to K-Electric green-meter sanctioning and 24/7 maintenance, we manage the entire lifecycle.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/15">
              <Link
                href="/#calculator"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#a3e635] transition-colors"
              >
                <span>Start Your Survey</span>
                <FaArrowRight size={10} />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative rounded-sm bg-linear-to-r from-[#f4f8f3] via-white to-[#edf5ec] p-5 sm:p-8 md:p-10 border border-emerald-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8">
            <div className="space-y-1.5 sm:space-y-2 text-center sm:text-left">
              <h4 className="text-base sm:text-xl font-bold text-[#1a1c29]">
                Ready to begin your step-by-step solar journey?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Book a free technical site inspection with our solar engineers in Karachi or Lahore.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
              <a
                href="https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20would%20like%20to%20schedule%20a%20Consultation%20and%20Site%20Inspection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-600/20 active:scale-[0.99] transition-all text-center"
              >
                <FaWhatsapp className="text-white text-base" />
                <span>Book Site Inspection</span>
              </a>

              <Link
                href="/#calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs sm:text-sm font-bold active:scale-[0.99] transition-all text-center shadow-2xs"
              >
                <span>Calculate Load</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
