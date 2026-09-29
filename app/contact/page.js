import Link from "next/link";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaShieldHalved,
  FaArrowRight,
  FaCheck,
  FaHeadset,
} from "react-icons/fa6";

export const metadata = {
  title: "Contact Us | A2Z Solar Solutions",
  description:
    "Get in touch with A2Z Solar Solutions for solar consultation, site inspections, and net-metering services in Karachi and Lahore.",
};

const CONTACT_CHANNELS = [
  {
    icon: FaPhone,
    title: "Call Us Directly",
    desc: "Speak with our certified solar engineers",
    value: "+92 321 4189298",
    href: "tel:03214189298",
    btnText: "Call Now",
    color: "emerald",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp Consultation",
    desc: "Instant quote & system audit estimates",
    value: "+92 321 4189298",
    href: "https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20would%20like%20to%20get%20a%20solar%20quote.",
    btnText: "Chat on WhatsApp",
    color: "green",
  },
  {
    icon: FaEnvelope,
    title: "Email Inquiries",
    desc: "Corporate tenders & formal inquiries",
    value: "a2zsolarsolutions.com@gmail.com",
    href: "mailto:a2zsolarsolutions.com@gmail.com",
    btnText: "Send Email",
    color: "blue",
  },
];

const LOCATIONS = [
  {
    city: "Karachi Head Office",
    address: "Gulistan-e-Johar / Malir City, Karachi, Sindh, Pakistan",
    timing: "Mon - Sat: 9:00 AM - 7:00 PM",
    phone: "0321-4189298",
  },
  {
    city: "Lahore Regional Office",
    address: "Model Town / DHA Phase 5, Lahore, Punjab, Pakistan",
    timing: "Mon - Sat: 9:00 AM - 6:00 PM",
    phone: "0321-4189298",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pt-24 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Page Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-4">
            <FaHeadset className="text-[#0fa353]" />
            <span>24/7 Dedicated Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#1a1c29] tracking-tight leading-tight mb-4">
            Let’s Power Your Home or Business With <span className="text-[#0fa353]">Solar</span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-600 leading-relaxed font-normal">
            Have questions regarding system sizing, K-Electric green net-metering, or inverter pricing? Our team of certified solar experts is ready to assist you.
          </p>
        </div>

        {/* ── Contact Channels Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {CONTACT_CHANNELS.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 bg-gray-50 border border-gray-200/80 rounded-sm flex flex-col justify-between hover:border-[#0fa353] hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-emerald-100/80 text-[#0fa353] flex items-center justify-center text-xl mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                    {channel.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{channel.desc}</p>
                  <p className="text-sm font-black text-gray-800 break-all mb-6">
                    {channel.value}
                  </p>
                </div>

                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-full py-2.5 px-4 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold text-center transition-all shadow-xs"
                >
                  {channel.btnText}
                </a>
              </div>
            );
          })}
        </div>

        {/* ── Locations & Offices Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-16">
          {LOCATIONS.map((loc, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-white border-2 border-emerald-100 rounded-sm shadow-xs space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-emerald-50 text-[#0fa353] flex items-center justify-center text-lg">
                  <FaLocationDot />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">{loc.city}</h3>
                  <span className="text-[11px] font-semibold text-emerald-700">Official Branch</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <p className="flex items-start gap-2">
                  <span className="font-bold text-gray-800 shrink-0">Address:</span>
                  <span>{loc.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 shrink-0">Timing:</span>
                  <span>{loc.timing}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 shrink-0">Phone:</span>
                  <a href={`tel:${loc.phone}`} className="text-[#0fa353] font-bold hover:underline">
                    {loc.phone}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick Calculator CTA ── */}
        <div className="rounded-sm bg-linear-to-r from-[#122116] via-[#162a1c] to-[#0d1a11] text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-900/60">
          <div>
            <h3 className="text-lg sm:text-2xl font-black mb-2">Want an instant load estimate?</h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
              Use our Solar Calculator to calculate required KW capacity, daily energy units, and monthly savings.
            </p>
          </div>
          <Link
            href="/#calculator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-600/20 active:scale-95 transition-all shrink-0"
          >
            <span>Open Solar Calculator</span>
            <FaArrowRight size={11} />
          </Link>
        </div>
      </div>
    </main>
  );
}
