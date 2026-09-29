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
  FaQuoteLeft,
  FaLocationDot,
  FaArrowRight,
  FaBolt,
  FaWrench,
  FaFileContract,
  FaStar,
  FaAward,
  FaHandshake,
} from "react-icons/fa6";

export const metadata = {
  title: "About Us | A2Z Solar Solutions - FBR Registered Solar Company",
  description:
    "Founded in 2015, A2Z Solar Solutions is an FBR registered renewable energy company headquartered in Karachi, delivering complete turnkey solar power solutions across Karachi and Lahore.",
};

const STATS = [
  {
    value: "2015",
    label: "Founded in",
    subtext: "Over a Decade of Excellence",
    icon: FaBuilding,
    color: "text-[#0fa353]",
    bg: "from-[#0fa353]/10 to-transparent",
    border: "border-emerald-200/90",
  },
  {
    value: "10+",
    label: "Years of Trust",
    subtext: "Quality, Safety & Innovation",
    icon: FaStar,
    color: "text-[#0fa353]",
    bg: "from-[#0fa353]/10 to-transparent",
    border: "border-emerald-200/90",
  },
  {
    value: "2 Cities",
    label: "Karachi & Lahore",
    subtext: "Residential & Commercial",
    icon: FaCity,
    color: "text-[#0fa353]",
    bg: "from-[#0fa353]/10 to-transparent",
    border: "border-emerald-200/90",
  },
  {
    value: "100%",
    label: "Turnkey Execution",
    subtext: "Survey, Structure to Net-Meter",
    icon: FaShieldHalved,
    color: "text-[#0fa353]",
    bg: "from-[#0fa353]/10 to-transparent",
    border: "border-emerald-200/90",
  },
];

const EXPERTISE_AREAS = [
  {
    title: "Complete Turnkey Installations",
    desc: "End-to-end load audits, system design, equipment procurement, and net-metering sanctions for On-Grid, Hybrid, and Off-Grid solar setups.",
    tag: "On-Grid & Hybrid",
    icon: FaSolarPanel,
  },
  {
    title: "Customized Elevated Structures",
    desc: "Heavy-gauge galvanized steel fabrication engineered specifically for high coastal wind resistance and optimal all-day sun capture.",
    tag: "High-Wind Rated",
    icon: FaBuilding,
  },
  {
    title: "24/7 Diagnostics & Maintenance",
    desc: "Error code resolutions (Error 04, 09, 52), thermal imaging for hot spot detection, active cell equalization, and earthing renewals.",
    tag: "Rapid Response",
    icon: FaWrench,
  },
  {
    title: "Residential, Commercial & Industrial",
    desc: "Tailored energy setups from 5kW to 20kW villas to large industrial megawatt factory rooftops in Karachi and Lahore.",
    tag: "5kW to 1MW+",
    icon: FaCity,
  },
];

const PILLARS = [
  {
    title: "FBR Registered & Compliant",
    desc: "A fully registered legal corporate entity adhering strictly to AEDB quality benchmarks and standard double-insulated wiring.",
    icon: FaFileContract,
    badge: "100% Legal Entity",
  },
  {
    title: "Tier-1 Hardware Exclusively",
    desc: "We deploy exclusively Tier-1 bifacial panels (580W-650W) and top-rated inverters (Inverex, Nitrox, Huawei, Growatt, Deye).",
    icon: FaBolt,
    badge: "Tier-1 Certified",
  },
  {
    title: "Elevated Structural Safety",
    desc: "All structural joints and mounting hardware are chemically anchored with certified heavy-gauge channel sections.",
    icon: FaShieldHalved,
    badge: "Cyclone Resilient",
  },
  {
    title: "Seamless Net-Metering",
    desc: "Turnkey application processing with K-Electric (Karachi) and LESCO (Lahore) so you export units and minimize your bills.",
    icon: FaGlobe,
    badge: "Bill Reduction",
  },
];

const LOCATIONS = [
  {
    city: "Karachi",
    role: "Headquarters & Central Warehouse",
    coverage:
      "DHA, Clifton, Gulshan, North Nazimabad, Korangi, Bahria Town & Industrial Estates (SITE, Korangi, FB Area).",
    phone: "0321-4189298",
    badge: "Main HQ",
  },
  {
    city: "Lahore",
    role: "Regional Operations & Project Office",
    coverage:
      "DHA, Bahria Town, Gulberg, Johar Town, Model Town, Raiwind Road & Sundar Industrial Estate.",
    phone: "0321-4189298",
    badge: "Active Operations",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-20 overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      <section className="relative min-h-0 md:min-h-[85svh] flex flex-col justify-start md:justify-center pt-24 sm:pt-32 md:pt-40 pb-10 sm:pb-16 md:pb-20 overflow-hidden mb-10 sm:mb-16 bg-white">
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/images/about-hero-bg.webp"
            alt="A2Z Solar Solutions About Us Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[82%_center] md:object-right"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-transparent md:via-white/85" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/20 to-white" />
        </div>

        <div className="relative z-10 w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6"
          >
            <Link href="/" className="hover:text-[#0fa353] transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#0fa353]">About Us</span>
          </nav>

          <div className="max-w-2xl lg:max-w-3xl space-y-3.5 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-emerald-50/70 sm:bg-white/90 sm:backdrop-blur-md border border-emerald-200/90 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider shadow-2xs max-w-full">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0fa353] animate-pulse shrink-0" />
              <span className="truncate sm:overflow-visible">FBR Registered Renewable Energy Company</span>
              <span className="text-emerald-400 shrink-0">•</span>
              <span className="text-emerald-700 font-semibold shrink-0">Est. 2015</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1c29] tracking-tight leading-[1.15] sm:leading-[1.1] wrap-break-word">
              About Our <span className="text-[#0fa353]">Company</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-normal">
              Founded in 2015,{" "}
              <strong className="text-[#1a1c29] font-bold">
                A2Z Solar Solutions.
              </strong>{" "}
              is an FBR registered renewable energy company headquartered in
              Karachi, Pakistan. We proudly serve clients across{" "}
              <span className="font-semibold text-emerald-800 bg-emerald-50/90 px-2 py-0.5 rounded border border-emerald-200/70 inline-block">
                Karachi and Lahore
              </span>
              , delivering complete solar power solutions tailored for
              residential, commercial, and industrial applications.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full max-w-400 p-2.5 sm:p-2.5 rounded-xl border border-[#9ab596] bg-linear-to-r from-[#cfe1cb] to-[#b7ceb4] shadow-sm gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#9ab596] flex items-center justify-center shrink-0 shadow-2xs">
                  <FaBolt className="text-[#1a3821] text-xs sm:text-base" />
                </div>
                <div className="text-xs sm:text-sm text-[#1a3821] font-medium text-left">
                  <span className="font-bold opacity-80">Official Tagline:</span> “Lighting the Nation with Clean Energy.”
                </div>
              </div>
              <Link href="/#calculator" className="px-4 py-2 sm:px-5 sm:py-2 rounded-lg border border-[#84a380] text-[#1a3821] text-xs sm:text-sm font-semibold hover:bg-white/30 transition-colors w-full sm:w-auto text-center shrink-0 shadow-2xs">
                Get Started
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-0 mt-8 sm:mt-14 pt-6 sm:pt-10 border-t border-gray-200/80">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-none bg-white border ${stat.border} shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${stat.bg}`}
                  />
                  <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                    <div
                      className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center ${stat.color} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="text-sm sm:text-lg" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 rounded-md border border-gray-100">
                      Verified
                    </span>
                  </div>

                  <div>
                    <div
                      className={`text-xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-0.5 sm:mb-1 ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-sm font-bold text-[#1a1c29] leading-tight">
                      {stat.label}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5 leading-tight">
                      {stat.subtext}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80">
              <FaAward className="text-[#0fa353] text-xs sm:text-sm" />
              Over A Decade Of Experience
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#1a1c29] tracking-tight leading-snug wrap-break-word">
              Engineering Excellence, Reliability & Innovation Since 2015
            </h2>

            <p className="text-xs sm:text-base text-gray-600 sm:text-gray-700 leading-relaxed">
              With over a decade of experience,{" "}
              <strong className="text-[#1a1c29] font-semibold">
                A2Z Solar Solutions.
              </strong>{" "}
              has built a strong reputation for quality, reliability, and
              innovation. Our skilled engineering and technical team specializes
              in solar system design, installation, maintenance, and customized
              elevated structures — ensuring high performance, safety, and
              long-term energy efficiency.
            </p>

            <p className="text-xs sm:text-base text-gray-600 sm:text-gray-700 leading-relaxed">
              We believe that renewable energy is not just the future — it’s the
              present. Our mission is to empower communities and businesses with
              sustainable, affordable, and clean solar energy solutions that
              reduce costs and support Pakistan’s transition toward a greener
              and energy-independent future.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 pt-1 sm:pt-2">
              {[
                "FBR Registered & Compliant Entity",
                "Karachi & Lahore Active Branch Operations",
                "Certified High-Wind Elevated Structures",
                "Tier-1 N-Type Bifacial Solar Modules",
                "Complete Net-Metering Approval Processing",
                "24/7 Troubleshooting & Preventive Maintenance",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-2 sm:p-2.5 bg-white hover:bg-emerald-50/20 transition-all"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                    <FaCheck size={8} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug wrap-break-word">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-0 mt-4 lg:mt-0">
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
                Core Specializations
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#0fa353]">
                Turnkey Solutions
              </span>
            </div>

            {EXPERTISE_AREAS.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-5 bg-white hover:bg-gray-50 transition-all duration-300 flex items-start gap-3 sm:gap-4 group"
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-[#0fa353] group-hover:bg-[#0fa353] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-2xs border border-emerald-100">
                    <Icon className="text-base sm:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <h3 className="text-xs sm:text-base font-bold text-[#1a1c29] wrap-break-word">
                        {area.title}
                      </h3>
                      <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-200/80 shrink-0">
                        {area.tag}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                      {area.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="relative rounded-2xl sm:rounded-3xl bg-linear-to-br from-[#f8faf8] via-white to-[#f0f5ec] p-5 sm:p-10 md:p-14 lg:p-16 overflow-hidden shadow-sm border border-emerald-100">
          <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-100/50 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 sm:w-80 h-64 sm:h-80 bg-[#0fa353]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 sm:space-y-6">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-50 text-[#0fa353] flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs">
              <FaQuoteLeft className="text-base sm:text-2xl" />
            </div>

            <blockquote className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug sm:leading-tight text-[#1a2e22] wrap-break-word">
              “At A2Z Solar Solutions., we don’t just install solar systems — we
              build lasting energy partnerships that empower you to enjoy clean,
              dependable, and affordable power for years to come.”
            </blockquote>

            <div className="pt-1 sm:pt-2">
              <div className="text-xs sm:text-sm font-bold text-[#0fa353] uppercase tracking-widest">
                A2Z Solar Solutions
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500 mt-1 font-medium">
                Headquartered in Karachi • Complete Solar Power Solutions Across
                Karachi & Lahore
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 inline-block mb-1.5 sm:mb-2">
            Guiding Principles
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#1a1c29] tracking-tight">
            Our Vision & Mission
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1.5 sm:mt-2">
            The values and objectives steering our commitment to renewable
            energy across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="p-4 sm:p-7 lg:p-9 rounded-2xl sm:rounded-3xl bg-white border border-emerald-200/90 shadow-2xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 sm:space-y-4 relative z-10">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-50 text-[#0fa353] flex items-center justify-center shadow-2xs border border-emerald-100">
                <FaEye className="text-lg sm:text-2xl" />
              </div>

              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0fa353] block mb-0.5 sm:mb-1">
                  Forward Looking
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-[#1a1c29] tracking-tight">
                  Our Vision
                </h3>
              </div>

              <p className="text-gray-700 text-xs sm:text-base lg:text-[17px] leading-relaxed font-normal">
                Our vision at A2Z Solar Solutions. is to become Pakistan’s most
                trusted and innovative solar energy provider, leading the
                transition toward a clean, sustainable, and energy-independent
                future. We strive to make solar power accessible, affordable,
                and reliable for every home and business.
              </p>
            </div>

            <div className="pt-3 sm:pt-5 mt-4 sm:mt-6 border-t border-emerald-100 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-emerald-800">
              <span className="bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-emerald-200/60">
                Clean Energy
              </span>
              <span className="bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-emerald-200/60">
                Sustainable Future
              </span>
              <span className="bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-emerald-200/60">
                Accessible & Affordable
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-7 lg:p-9 rounded-2xl sm:rounded-3xl bg-white border border-green-200/90 shadow-2xs hover:shadow-xl hover:border-green-400 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 sm:space-y-4 relative z-10">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-green-50 text-[#0fa353] flex items-center justify-center shadow-2xs border border-green-100">
                <FaBullseye className="text-lg sm:text-2xl" />
              </div>

              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0fa353] block mb-0.5 sm:mb-1">
                  Daily Execution
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-[#1a1c29] tracking-tight">
                  Our Mission
                </h3>
              </div>

              <p className="text-gray-700 text-xs sm:text-base lg:text-[17px] leading-relaxed font-normal">
                Our mission at A2Z Solar Solutions. is to deliver reliable,
                efficient, and sustainable solar energy solutions that empower
                homes, businesses, and industries across Pakistan. We are
                dedicated to providing quality installations, professional
                maintenance, and innovative technology that promote energy
                independence and a greener future for all.
              </p>
            </div>

            <div className="pt-3 sm:pt-5 mt-4 sm:mt-6 border-t border-green-100 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-emerald-800">
              <span className="bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-emerald-200/60">
                Quality Installations
              </span>
              <span className="bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-emerald-200/60">
                Professional Maintenance
              </span>
              <span className="bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-emerald-200/60">
                Greener Pakistan
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 inline-block mb-1.5 sm:mb-2">
            Dual City Presence
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#1a1c29] tracking-tight">
            Serving Karachi & Lahore
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1.5 sm:mt-2">
            Active on-ground operations, technical teams, and rapid maintenance
            support across both metropolises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200/80 rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xs">
          {LOCATIONS.map((loc, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-8 lg:p-10 hover:bg-emerald-50/40 transition-colors duration-500 flex flex-col justify-between group ${
                idx === 0 ? "border-b md:border-b-0 md:border-r border-gray-100" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-2.5 sm:gap-3.5">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-[#0fa353] flex items-center justify-center border border-emerald-100 group-hover:scale-110 group-hover:bg-[#0fa353] group-hover:text-white transition-all shadow-2xs">
                      <FaLocationDot className="text-xs sm:text-base" />
                    </div>
                    <span className="text-base sm:text-xl md:text-2xl font-black text-[#1a1c29]">
                      {loc.city}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    {loc.badge}
                  </span>
                </div>

                <div className="text-xs sm:text-base font-semibold text-emerald-700 mb-2 sm:mb-3">
                  {loc.role}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6 font-normal">
                  <strong className="text-gray-800 font-bold">Coverage: </strong>
                  {loc.coverage}
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                <a
                  href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1a1c29] hover:text-[#0fa353] transition-colors"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                    <FaPhone size={9} className="text-gray-600 group-hover:text-[#0fa353]" />
                  </div>
                  <span>Call {loc.phone}</span>
                </a>
                <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Mon - Sat: 9 AM - 8 PM
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 inline-block mb-1.5 sm:mb-2">
            Key Advantages
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#1a1c29] tracking-tight">
            Why Choose A2Z Solar Solutions
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1.5 sm:mt-2">
            Engineering standards and service integrity that set our solar
            installations apart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-4 sm:p-6 bg-white hover:bg-gray-50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-[#0fa353] flex items-center justify-center shadow-2xs border border-emerald-100">
                      <Icon className="text-base sm:text-xl" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-[#1a1c29] mb-1.5 sm:mb-2 leading-snug wrap-break-word">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3.5 border-t border-gray-100 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#0fa353]">
                  <FaCheck size={10} />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="w-full bg-[#f8f9fa] py-14 sm:py-24 mt-12 sm:mt-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-[#1a1c29] text-white text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-xs tracking-wide">
            Get started
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium text-[#1a1c29] tracking-tight mb-3 sm:mb-5 leading-tight">
            Ready to Build Your Energy Independence?
          </h2>

          <p className="text-xs sm:text-base md:text-[17px] text-gray-500 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10 font-normal">
            Get a tailored load audit, calculate your electricity bill reduction,
            and receive a customized solar system proposal from our certified engineers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            <a
              href="tel:03214189298"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-white border border-gray-200 text-[#1a1c29] text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors shadow-xs"
            >
              <span>Jump on a call</span>
              <FaPhone className="text-gray-400 text-[10px] sm:text-xs" />
            </a>

            <Link
              href="/#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-[#0fa353] text-white text-xs sm:text-sm font-semibold hover:bg-[#0c8a45] transition-colors shadow-xs"
            >
              <span>Calculate Savings</span>
              <FaArrowRight className="text-white/80 text-[10px] sm:text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
