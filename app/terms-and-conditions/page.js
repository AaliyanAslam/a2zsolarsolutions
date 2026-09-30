import Link from "next/link";
import {
  FaScaleBalanced,
  FaShieldHalved,
  FaPhone,
  FaLocationDot,
  FaWhatsapp,
  FaCalculator,
  FaBuilding,
  FaArrowRight,
  FaTriangleExclamation,
} from "react-icons/fa6";

export const metadata = {
  title: "Terms & Conditions | A to Z Solar Solutions",
  description:
    "Official Terms and Conditions for using a2zsolarsolutions.com operated by A to Z Solar Solutions (FBR Registered). Review our intellectual property, solar calculator disclaimers, warranties, and governing law.",
};

const TOC_SECTIONS = [
  { id: "sec-1", label: "1. Acceptance of Terms" },
  { id: "sec-2", label: "2. Intellectual Property & Copyright" },
  { id: "sec-3", label: "3. Solar Calculator Disclaimer" },
  { id: "sec-4", label: "4. Quotations, Pricing & Warranties" },
  { id: "sec-5", label: "5. Limitation of Liability" },
  { id: "sec-6", label: "6. Governing Law" },
  { id: "sec-7", label: "7. Contact Information" },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-white text-[#1a1c29] pt-24 sm:pt-28 pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── Top Header Banner (Docs Style) ── */}
      <header className="border-b border-gray-200/90 bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3"
          >
            <Link href="/" className="hover:text-[#0fa353] transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400">Legal</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#0fa353]">Terms &amp; Conditions</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1c29] tracking-tight leading-tight">
            Terms &amp; Conditions
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-2.5 font-medium">
            <span>Last Updated: October 2026</span>
            <span className="text-gray-300">•</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/60">
              A to Z Solar Solutions (FBR Registered)
            </span>
          </div>
        </div>
      </header>

      {/* ── Mobile/Tablet Nav Switcher ── */}
      <div className="lg:hidden border-b border-gray-200 bg-white sticky top-16 z-20 px-4 py-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">
            Document:
          </span>
          <div className="flex items-center gap-1.5">
            <Link
              href="/privacy-policy"
              className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="px-3 py-1.5 rounded-md bg-[#0fa353] text-white font-bold shadow-2xs"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* ── 3-Column Documentation Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ── Left Sidebar (Navigation & Legal Menu) ── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
                Legal Documents
              </div>
              <Link
                href="/privacy-policy"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:text-[#0fa353] hover:bg-gray-50 font-medium text-sm transition-all"
              >
                <FaShieldHalved className="text-sm shrink-0 text-gray-400" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                href="/terms-and-conditions"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-[#0fa353] font-bold border-l-3 border-[#0fa353] text-sm transition-all"
              >
                <FaScaleBalanced className="text-sm shrink-0" />
                <span>Terms &amp; Conditions</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
                Solar Tools &amp; Help
              </div>
              <Link
                href="/#calculator"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:text-[#0fa353] hover:bg-gray-50 text-xs sm:text-sm font-medium transition-all"
              >
                <FaCalculator className="text-xs text-gray-400 shrink-0" />
                <span>Load Calculator</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:text-[#0fa353] hover:bg-gray-50 text-xs sm:text-sm font-medium transition-all"
              >
                <FaBuilding className="text-xs text-gray-400 shrink-0" />
                <span>Contact Our Office</span>
              </Link>
            </div>

            {/* Quick Contact Card */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/70 space-y-3">
              <div className="text-xs font-bold text-[#1a1c29]">
                Legal &amp; Business Support
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Need clarification regarding contracts, warranty claims, or copyrights?
              </p>
              <a
                href="https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20have%20a%20legal%20query%20regarding%20Terms%20and%20Conditions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold transition-colors shadow-2xs"
              >
                <FaWhatsapp size={14} />
                <span>Contact on WhatsApp</span>
              </a>
            </div>
          </aside>

          {/* ── Center Column: Main Document Content ── */}
          <article className="lg:col-span-6 min-w-0 space-y-10 text-gray-700 leading-relaxed">
            {/* Intro Header */}
            <div className="space-y-4 pb-6 border-b border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1c29] tracking-tight">
                Terms and Conditions
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold">
                Last Updated: October 2026
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                Please read these Terms and Conditions carefully before using{" "}
                <a
                  href="https://a2zsolarsolutions.com"
                  className="text-[#0fa353] font-semibold underline underline-offset-2 hover:text-[#0c8a45]"
                >
                  a2zsolarsolutions.com
                </a>{" "}
                operated by <strong className="text-[#1a1c29] font-bold">A to Z Solar Solutions</strong>.
              </p>
            </div>

            {/* 1. Acceptance of Terms */}
            <section id="sec-1" className="scroll-mt-28 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                1. Acceptance of Terms
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                By accessing and browsing this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue using the website.
              </p>
            </section>

            {/* 2. Intellectual Property & Copyright Protection */}
            <section id="sec-2" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                2. Intellectual Property &amp; Copyright Protection
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                All content on this website—including project photographs, drone shots, brand logos, custom graphics, structure designs, text, and layout—is the exclusive intellectual property of <strong className="text-[#1a1c29] font-bold">A to Z Solar Solutions</strong> (FBR Registered, Trademark Protected).
              </p>
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                <FaTriangleExclamation className="text-amber-600 mt-1 shrink-0" size={16} />
                <p>
                  Unauthorized downloading, copying, modifying, reproducing, or using our project images or written content for commercial purposes without prior written consent is strictly prohibited and subject to legal action.
                </p>
              </div>
            </section>

            {/* 3. Solar Load Calculator Disclaimer */}
            <section id="sec-3" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                3. Solar Load Calculator Disclaimer
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  The Solar Load Calculator provided on this website is designed solely for informational, preliminary estimation purposes.
                </p>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-2 text-xs sm:text-sm">
                  <p className="text-gray-700">
                    Final system sizing (kW capacity, panel count, and inverter specifications) is subject to physical on-site technical inspection, shadow analysis, grid availability, and structural engineering evaluation.
                  </p>
                  <p className="font-semibold text-emerald-800">
                    Calculations displayed online do not constitute a legally binding contractual quote.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Quotations, Pricing & Warranties */}
            <section id="sec-4" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                4. Quotations, Pricing &amp; Warranties
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  Prices, project timelines, and product availability displayed or discussed are subject to change based on market rates for solar panels, inverters, and mounting structures.
                </p>
                <p>
                  Equipment warranties (e.g., Tier-1 solar panels, inverters) are governed directly by the respective manufacturers (e.g., Inverex, Solis, Solax) and will be formally documented in individual client contracts.
                </p>
              </div>
            </section>

            {/* 5. Limitation of Liability */}
            <section id="sec-5" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                5. Limitation of Liability
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                A to Z Solar Solutions strives to keep all web information accurate and up-to-date. However, we do not guarantee that the site will always be uninterrupted or error-free. We shall not be held liable for any direct or indirect damages resulting from the use or inability to use this website.
              </p>
            </section>

            {/* 6. Governing Law */}
            <section id="sec-6" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                6. Governing Law
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                These Terms and Conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any legal disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the courts in Karachi, Sindh.
              </p>
            </section>

            {/* 7. Contact Information */}
            <section id="sec-7" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                7. Contact Information
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                For official legal inquiries or copyright permissions:
              </p>

              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/80 space-y-3.5 text-xs sm:text-sm">
                <div>
                  <strong className="text-gray-900 block">Company:</strong>
                  <span className="text-gray-700 font-semibold">
                    A to Z Solar Solutions
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <FaLocationDot className="text-[#0fa353] mt-1 shrink-0" />
                  <div>
                    <strong className="text-gray-900 block">Address:</strong>
                    <span className="text-gray-600">
                      2nd Floor, Plot No. D164, Korangi No. 6, D-Area, Karachi, Pakistan
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhone className="text-[#0fa353] mt-1 shrink-0" />
                  <div>
                    <strong className="text-gray-900 block">Contact:</strong>
                    <a
                      href="tel:03214189298"
                      className="text-[#0fa353] font-semibold hover:underline"
                    >
                      +92-321-4189298
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* ── Right Sidebar: Table of Contents ("On this page") ── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-3 pl-2">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              On this page
            </div>
            <nav className="space-y-1 text-xs">
              {TOC_SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block py-1 text-gray-600 hover:text-[#0fa353] hover:translate-x-0.5 transition-all font-medium"
                >
                  {sec.label}
                </a>
              ))}
            </nav>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] transition-colors"
              >
                <span>Read Privacy Policy</span>
                <FaArrowRight size={10} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
