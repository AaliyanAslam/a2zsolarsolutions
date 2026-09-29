"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Hide footer on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmailInput("");
      }, 4000);
    }
  };

  return (
    <footer id="contact" className="scroll-mt-20 relative bg-white text-gray-800 pb-12 mt-24 sm:mt-28 md:mt-32 border-t border-gray-100 z-20 overflow-x-clip">
      {/* ── 1. Floating Newsletter / CTA Banner with Protruding 3D Graphic ── */}
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 md:-mt-28 relative z-30 mb-14 sm:mb-18 md:mb-20">
        <div className="relative rounded-sm bg-linear-to-r from-[#0fa353] via-[#0d8e48] to-[#0a753b] text-white p-6 sm:p-8 md:p-12 shadow-2xl shadow-green-950/20 overflow-visible">
          {/* Subtle Ambient Light Glows - Contained to prevent horizontal document overflow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* ── Protruding 3D Solar Illustration (Pops out of top edge) ── */}
          <div className="hidden md:block absolute -top-12 md:-top-16 lg:-top-20 xl:-top-24 left-4 md:left-6 lg:left-10 xl:left-12 w-56 md:w-64 lg:w-80 xl:w-96 select-none pointer-events-none z-20">
            {/* Responsive Solar Image with 3D drop-shadow */}
            <div className="relative filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.35)] transform hover:scale-102 transition-transform duration-300">
              <Image
                src="/images/solar-image.webp"
                alt="A2Z Solar System Installation"
                width={500}
                height={380}
                className="w-full h-auto object-contain pointer-events-none select-none rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* Mobile Protruding Solar Image (< md screens) */}
          <div className="md:hidden -mt-16 sm:-mt-20 mb-4 w-44 sm:w-56 mx-auto relative select-none pointer-events-none z-20">
            <div className="relative filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/solar-image.webp"
                alt="A2Z Solar System Installation"
                width={320}
                height={240}
                className="w-full h-auto object-contain rounded-sm"
                priority
              />
            </div>
          </div>

          {/* ── Banner Content (Right Side) ── */}
          <div className="md:ml-auto md:w-7/12 lg:w-3/5 xl:w-3/5 space-y-3 sm:space-y-4 relative z-10 text-left">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Subscribe to our newsletter to get updates to our latest solar installations
            </h3>

            <p className="text-xs sm:text-sm text-green-100/90 leading-relaxed max-w-xl">
              Get 20% off on your initial system survey &amp; instant WhatsApp solar load calculations.
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubscribe} className="pt-1 max-w-lg">
              <div className="relative flex flex-col sm:flex-row items-center bg-white/20 backdrop-blur-md p-2.5 sm:p-2 rounded-sm border border-white/30 shadow-inner focus-within:bg-white focus-within:border-white transition-all duration-300">
                <div className="flex items-center gap-2.5 px-4 py-2 sm:py-0 w-full text-white focus-within:text-gray-900">
                  <FaEnvelope className="text-white/80 group-focus-within:text-gray-400 text-sm shrink-0" />
                  <input
                    type="text"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email or WhatsApp number"
                    className="w-full bg-transparent text-xs sm:text-sm text-white focus:text-gray-900 placeholder:text-green-100 focus:placeholder:text-gray-400 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-gray-100 text-[#0fa353] hover:text-[#0c8a45] font-bold text-xs sm:text-sm shadow-md transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0"
                >
                  {isSubscribed ? (
                    <span className="flex items-center gap-1.5 text-green-700">
                      <FaCheck size={12} /> Subscribed!
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              <p className="text-[11px] text-green-100/80 mt-2.5">
                You will be able to unsubscribe at any time. Read our{" "}
                <Link href="/about" className="underline hover:text-white font-medium">
                  privacy policy here
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* ── 2. Main Footer Body Content (Pure White Theme) ── */}
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
          {/* Column 1: Logo & Company Description & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-12 flex items-center">
                <Image
                  src="/logo/a2zlogo.webp"
                  alt="A to Z Solar Solutions Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
              Founded in 2015, A2Z Solar Solutions is an FBR registered renewable energy company headquartered in Karachi, delivering high-performance solar solutions across Karachi and Lahore.
            </p>

            {/* Social Icons matching the screenshot */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0fa353] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-2xs"
              >
                <FaFacebookF size={12} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0fa353] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-2xs"
              >
                <FaXTwitter size={12} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0fa353] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-2xs"
              >
                <FaInstagram size={12} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0fa353] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-2xs"
              >
                <FaLinkedinIn size={12} />
              </a>
              <a
                href="https://youtube.com/@A2ZSolarSolutions"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-2xs"
              >
                <FaYoutube size={12} />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 tracking-tight">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-[#0fa353] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#0fa353] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/#youtube" className="hover:text-[#0fa353] transition-colors">
                  Project Videos
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#0fa353] transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 tracking-tight">
              Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <a
                  href="https://wa.me/923214189298"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0fa353] transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-[#0fa353] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0fa353] transition-colors">
                  FBR Registered
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-[#0fa353] transition-colors">
                  Solar Audit Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 tracking-tight">
              Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/#calculator" className="hover:text-[#0fa353] transition-colors">
                  Solar Calculator
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-[#0fa353] transition-colors">
                  Hybrid Systems
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-[#0fa353] transition-colors">
                  Net Metering Guide
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0fa353] transition-colors">
                  All in One Solar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 tracking-tight">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FaPhone className="text-[#0fa353] text-xs shrink-0" />
                <a href="tel:03214189298" className="hover:text-gray-900 font-semibold transition-colors">
                  (92) 321 4189 298
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#0fa353] text-xs shrink-0" />
                <a href="mailto:solarwala2023@gmail.com" className="hover:text-gray-900 transition-colors truncate">
                  solarwala2023@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <FaLocationDot className="text-[#F47C20] text-xs shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-gray-500">
                  Shop No.2, Korangi No.6, Karachi
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── 3. Bottom Bar ── */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} A2Z Solar Solutions. All rights reserved. “Lighting the Nation with Clean Energy.”
          </p>

          <div className="flex items-center gap-4 sm:gap-6 font-medium text-gray-600">
            <Link href="/about" className="hover:text-[#0fa353] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-[#0fa353] transition-colors">
              Terms of Use
            </Link>
            <Link href="/about" className="hover:text-[#0fa353] transition-colors">
              Legal
            </Link>
            <Link href="/#solutions" className="hover:text-[#0fa353] transition-colors">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
