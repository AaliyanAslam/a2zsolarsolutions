import Link from "next/link";
import {
  FaShieldHalved,
  FaFileLines,
  FaScaleBalanced,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaWhatsapp,
  FaCheck,
  FaCalculator,
  FaLock,
  FaCookieBite,
  FaBuilding,
  FaArrowRight,
} from "react-icons/fa6";

export const metadata = {
  title: "Privacy Policy | A to Z Solar Solutions",
  description:
    "Privacy Policy for A to Z Solar Solutions. Learn how we collect, use, and protect your data, solar calculator inputs, and cookies on a2zsolarsolutions.com.",
};

const TOC_SECTIONS = [
  {
    id: "sec-1",
    label: "1. Information We Collect",
    subItems: [
      { id: "sec-1-1", label: "1.1 Contact Details" },
      { id: "sec-1-2", label: "1.2 Solar Calculator Data" },
      { id: "sec-1-3", label: "1.3 Usage & Analytics" },
    ],
  },
  { id: "sec-2", label: "2. How We Use Your Information" },
  { id: "sec-3", label: "3. Cookies and Advertising" },
  { id: "sec-4", label: "4. Data Protection & Sharing" },
  { id: "sec-5", label: "5. Third-Party Links" },
  { id: "sec-6", label: "6. Contact Us" },
];

export default function PrivacyPolicyPage() {
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
            <span className="text-[#0fa353]">Privacy Policy</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1c29] tracking-tight leading-tight">
            Privacy Policy
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
              className="px-3 py-1.5 rounded-md bg-[#0fa353] text-white font-bold shadow-2xs"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
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
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 text-[#0fa353] font-bold border-l-3 border-[#0fa353] text-sm transition-all"
              >
                <FaShieldHalved className="text-sm shrink-0" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                href="/terms-and-conditions"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:text-[#0fa353] hover:bg-gray-50 font-medium text-sm transition-all"
              >
                <FaScaleBalanced className="text-sm shrink-0 text-gray-400" />
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
                Need Immediate Support?
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Contact our customer support team directly via WhatsApp or phone.
              </p>
              <a
                href="https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20have%20a%20query%20regarding%20Privacy%20Policy."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold transition-colors shadow-2xs"
              >
                <FaWhatsapp size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </aside>

          {/* ── Center Column: Main Document Content ── */}
          <article className="lg:col-span-6 min-w-0 space-y-10 text-gray-700 leading-relaxed">
            {/* Intro Header */}
            <div className="space-y-4 pb-6 border-b border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1c29] tracking-tight">
                Privacy Policy
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold">
                Last Updated: October 2026
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                Welcome to <strong className="text-[#1a1c29] font-bold">A to Z Solar Solutions</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your data when you visit our website{" "}
                <a
                  href="https://a2zsolarsolutions.com"
                  className="text-[#0fa353] font-semibold underline underline-offset-2 hover:text-[#0c8a45]"
                >
                  a2zsolarsolutions.com
                </a>.
              </p>
            </div>

            {/* 1. Information We Collect */}
            <section id="sec-1" className="scroll-mt-28 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                1. Information We Collect
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We collect information that you voluntarily provide to us when using our services, such as:
              </p>

              {/* 1.1 Contact Details */}
              <div id="sec-1-1" className="scroll-mt-28 pl-3 sm:pl-4 border-l-2 border-emerald-400 space-y-1.5 py-1">
                <h4 className="text-sm sm:text-base font-bold text-[#1a1c29]">
                  1.1 Contact Details
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Name, phone number, email address, and physical location when submitting an inquiry or contacting us via WhatsApp.
                </p>
              </div>

              {/* 1.2 Solar Calculator Data */}
              <div id="sec-1-2" className="scroll-mt-28 pl-3 sm:pl-4 border-l-2 border-emerald-400 space-y-1.5 py-1">
                <h4 className="text-sm sm:text-base font-bold text-[#1a1c29]">
                  1.2 Solar Calculator Data
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Appliance counts, estimated electrical load, and system preferences entered into our Solar Load Calculator.
                </p>
              </div>

              {/* 1.3 Usage & Analytics */}
              <div id="sec-1-3" className="scroll-mt-28 pl-3 sm:pl-4 border-l-2 border-emerald-400 space-y-1.5 py-1">
                <h4 className="text-sm sm:text-base font-bold text-[#1a1c29]">
                  1.3 Usage &amp; Analytics
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Browser type, IP address, device information, and pages visited via standard web analytics and cookies to improve performance.
                </p>
              </div>
            </section>

            {/* 2. How We Use Your Information */}
            <section id="sec-2" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                2. How We Use Your Information
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We use the collected information for the following purposes:
              </p>

              <ul className="space-y-2.5 pl-1">
                {[
                  "To provide accurate solar load estimates, customized quotations, and technical consultations.",
                  "To schedule on-site inspections, system installations, and maintenance services.",
                  "To respond to your customer service requests and provide ongoing technical support.",
                  "To optimize website performance, improve user experience, and monitor SEO health.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0fa353] mt-2 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Cookies and Advertising */}
            <section id="sec-3" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                3. Cookies and Advertising
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our website may use standard cookies to enhance user experience, remember preferences, and serve relevant advertisements (such as Google AdSense). You have the option to disable cookies through your personal browser settings at any time.
              </p>
            </section>

            {/* 4. Data Protection & Sharing */}
            <section id="sec-4" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                4. Data Protection &amp; Sharing
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  We do not sell, rent, or trade your personal data to third parties.
                </p>
                <p>
                  Information is only shared with trusted service providers strictly necessary to operate our infrastructure (e.g., cloud hosting, email dispatch) or when required by Pakistani legal authorities.
                </p>
                <p>
                  We implement standard security and encryption protocols (SSL) to ensure your data remains protected.
                </p>
              </div>
            </section>

            {/* 5. Third-Party Links */}
            <section id="sec-5" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                5. Third-Party Links
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our website may contain links to external sites, including YouTube videos and partner manufacturer portals. We are not responsible for the privacy practices or content of third-party platforms.
              </p>
            </section>

            {/* 6. Contact Us */}
            <section id="sec-6" className="scroll-mt-28 space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                6. Contact Us
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                If you have any questions regarding this Privacy Policy, you can reach out to us:
              </p>

              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/80 space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-[#0fa353] mt-1 shrink-0" />
                  <div>
                    <strong className="text-gray-900 block">Email:</strong>
                    <a
                      href="mailto:solarwala2023@gmail.com"
                      className="text-[#0fa353] font-semibold hover:underline"
                    >
                      solarwala2023@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhone className="text-[#0fa353] mt-1 shrink-0" />
                  <div>
                    <strong className="text-gray-900 block">Phone:</strong>
                    <div className="space-x-2">
                      <a href="tel:03214189298" className="hover:text-[#0fa353] font-medium">
                        +92-321-4189298
                      </a>
                      <span>/</span>
                      <a href="tel:03201864588" className="hover:text-[#0fa353] font-medium">
                        +92-320-1864588
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaLocationDot className="text-[#0fa353] mt-1 shrink-0" />
                  <div>
                    <strong className="text-gray-900 block">Office:</strong>
                    <span className="text-gray-600">
                      2nd Floor, Plot No. D164, Korangi No. 6, D-Area, Karachi, Pakistan
                    </span>
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
                <div key={sec.id} className="space-y-1">
                  <a
                    href={`#${sec.id}`}
                    className="block py-1 text-gray-600 hover:text-[#0fa353] hover:translate-x-0.5 transition-all font-medium"
                  >
                    {sec.label}
                  </a>
                  {sec.subItems && (
                    <div className="pl-3 space-y-1 border-l border-gray-200">
                      {sec.subItems.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          className="block py-0.5 text-gray-500 hover:text-[#0fa353] text-[11px] transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link
                href="/terms-and-conditions"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] transition-colors"
              >
                <span>Read Terms &amp; Conditions</span>
                <FaArrowRight size={10} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
