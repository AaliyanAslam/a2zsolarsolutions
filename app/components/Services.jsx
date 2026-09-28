"use client";

import { FaCheckCircle, FaSolarPanel, FaTools, FaBoxOpen, FaHardHat, FaBroom, FaPlug, FaWhatsapp } from "react-icons/fa";

const services = [
  {
    label: "Core Service",
    title: "Solar System Installations",
    description: "Complete turnkey design and installation for On-Grid, Hybrid, and Off-Grid solar energy setups customized for homes, offices, schools, and industrial factories.",
    bullets: [
      "Custom load audit & solar capacity calculation",
      "High-efficiency Tier-1 Bifacial panels (580W - 650W)",
      "Standard copper cabling with double-insulation & AC/DC breakers",
      "AEDB compliant installation with zero-export configuration"
    ],
    icon: <FaSolarPanel size={28} className="text-green-500 group-hover:text-green-600 transition-colors" />,
    link: "https://wa.me/923214189298?text=Salam%20Uzair%20Khan%2C%20I%20want%20to%20inquire%20about%20Solar%20System%20Installations%20at%20A2Z%20Solar%20Solutions."
  },
  {
    label: "24/7 Diagnostics",
    title: "Solar Troubleshoot & Maintenance",
    description: "Professional error diagnostics, inverter fault resolution (Error 04, 09, 52, 58), loose termination fixes, grounding earth testing, and earthing pit renewal.",
    bullets: [
      "Rapid on-site emergency troubleshooting in Karachi",
      "Inverter motherboard & MPPT component repair",
      "Thermal camera inspection for hotspot detection",
      "Battery health analysis & active cell equalization"
    ],
    icon: <FaTools size={28} className="text-green-500 group-hover:text-green-600 transition-colors" />,
    link: "https://wa.me/923214189298?text=Salam%20Uzair%20Khan%2C%20I%20want%20to%20inquire%20about%20Solar%20Troubleshoot%20%26%20Maintenance%20at%20A2Z%20Solar%20Solutions."
  },
  {
    label: "Authorized Supply",
    title: "Sales of Inverters & Solar Panels",
    description: "Direct wholesale and retail supply of authentic, verified Tier-1 solar panels and top-brand inverters at competitive Pakistani market prices.",
    bullets: [
      "Original Inverex, Knox, Fronus, Growatt, Huawei inverters",
      "Longi Hi-MO, Jinko Tiger Neo, Canadian Solar Bifacial modules",
      "Brand warranty cards with serial number verification",
      "Same-day pickup at Korangi No. 6 or delivery across Karachi"
    ],
    icon: <FaBoxOpen size={28} className="text-green-500 group-hover:text-green-600 transition-colors" />,
    link: "https://wa.me/923214189298?text=Salam%20Uzair%20Khan%2C%20I%20want%20to%20inquire%20about%20Sales%20of%20Inverters%20%26%20Solar%20Panels%20at%20A2Z%20Solar%20Solutions."
  },
  {
    label: "Custom Engineering",
    title: "Elevated Structures Fabrication",
    description: "Custom-built, heavy-duty elevated rooftop structures fabricated from Galvanized Iron (GI) to maximize roof usability while providing maximum solar angle irradiance.",
    bullets: [
      "High-rise 8ft to 12ft raised pergola style framing",
      "High wind-load rated (up to 150 km/h cyclone resistance)",
      "Rust-proof hot-dip galvanized steel with civil foundation anchoring",
      "Preserves full rooftop terrace space for family use"
    ],
    icon: <FaHardHat size={28} className="text-green-500 group-hover:text-green-600 transition-colors" />,
    link: "https://wa.me/923214189298?text=Salam%20Uzair%20Khan%2C%20I%20want%20to%20inquire%20about%20Elevated%20Structures%20Fabrication%20at%20A2Z%20Solar%20Solutions."
  },
  {
    label: "Boost +30% Power",
    title: "Solar Panels Cleaning Services",
    description: "Karachi's coastal humidity, dust, and pollution can reduce solar output by 25-35%. Our specialized cleaning service restores peak generation.",
    bullets: [
      "Soft rotating microfiber brushes that prevent glass micro-scratches",
      "Demineralized water rinse to eliminate calcification & water spots",
      "Monthly and quarterly recurring maintenance contracts",
      "Before & after solar generation data report provided"
    ],
    icon: <FaBroom size={28} className="text-green-500 group-hover:text-green-600 transition-colors" />,
    link: "https://wa.me/923214189298?text=Salam%20Uzair%20Khan%2C%20I%20want%20to%20inquire%20about%20Solar%20Panels%20Cleaning%20Services%20at%20A2Z%20Solar%20Solutions."
  },
  {
    label: "Green Meter",
    title: "K-Electric Net Metering Turnkey",
    description: "Hassle-free, end-to-end management of K-Electric Net Metering approvals, AEDB licensing, bi-directional green meter installation, and reverse billing activation.",
    bullets: [
      "100% legal documentation & engineer site survey",
      "NEPRA and K-Electric clearance and NOC processing",
      "Sell surplus power back to the grid and earn credits",
      "Reduce electricity bills to zero or negative balance"
    ],
    icon: <FaPlug size={28} className="text-green-500 group-hover:text-green-600 transition-colors" />,
    link: "https://wa.me/923214189298?text=Salam%20Uzair%20Khan%2C%20I%20want%20to%20inquire%20about%20K-Electric%20Net%20Metering%20Turnkey%20at%20A2Z%20Solar%20Solutions."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block py-1.5 px-4 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-5">
            Premium <span className="text-green-600">Solar Services</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            From industrial megawatt installations to residential K-Electric net metering, we deliver turnkey energy solutions engineered for maximum ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-[6px] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-200 transition-all duration-300 relative flex flex-col h-full"
            >
              {/* Subtle top border indicator */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-t-[6px]" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-green-50 rounded-[6px] flex items-center justify-center group-hover:scale-110 group-hover:bg-green-100 transition-transform duration-300">
                  {service.icon}
                </div>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-[6px] group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                  {service.label}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="mb-8 space-y-3 flex-grow">
                {service.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-green-500 shrink-0 mt-0.5 text-sm" />
                    <span className="text-xs md:text-sm text-gray-600 leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>

              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#25D366] text-gray-800 hover:text-white font-bold py-3.5 rounded-[6px] transition-all duration-300 border border-gray-200 hover:border-[#25D366] text-sm group/btn"
              >
                <FaWhatsapp size={16} className="text-[#25D366] group-hover/btn:text-white transition-colors" />
                Inquire Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
