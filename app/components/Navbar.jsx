"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaYoutube,
  FaPhoneAlt,
  FaChevronDown,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solar Solutions", href: "/#solutions" },
  {
    label: "More",
    href: "#",
    dropdownItems: [
      { label: "Our Services", href: "/#services" },
      { label: "Client Reviews", href: "/#reviews" },
      { label: "Videos", href: "/#videos" },
      { label: "FAQs", href: "/#faqs" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_NUMBER = "923214189298";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20solar%20solutions`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line
      closeDrawer();
    }
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      <div
        className={`hidden lg:block w-full bg-[#2A3439] py-2.5 transition-all duration-300 ${isScrolled ? "-translate-y-full absolute opacity-0 pointer-events-none" : "translate-y-0 relative opacity-100 shadow-md"}`}
      >
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[13px] font-medium tracking-wide">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#0fa353]">
              <FaMapMarkerAlt className="text-[#F47C20]" />
              <span>Shop No.2, Korangi No.6, Karachi</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FaEnvelope className="text-[#0fa353]" />
              <span>solarwala2023@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://youtube.com/@A2ZSolarSolutions"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#FF0000] hover:opacity-80 transition-opacity"
            >
              <FaYoutube className="text-base" />
              <span>@A2ZSolarSolutions</span>
            </a>
            <div className="w-px h-4 bg-gray-500" />
            <div className="flex items-center gap-2 text-[#0fa353]">
              <FaPhoneAlt className="text-[#F47C20]" />
              <span>Uzair Khan: +92-321-4189298</span>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100/80 lg:backdrop-blur-none ${
          isScrolled
            ? "shadow-sm border-b border-gray-100 bg-white"
            : "lg:bg-transparent lg:border-transparent"
        }`}
      >
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="relative w-27.5 sm:w-40 h-9 sm:h-12 flex items-center">
                <Image
                  src="/logo/a2zlogo.webp"
                  alt="A to Z Solar Solutions Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-3 xl:gap-5">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative group py-2">
                  <Link
                    href={link.href}
                    className={`
                      flex items-center gap-1 text-[14px] xl:text-[15px] font-semibold transition-colors duration-200
                      ${
                        isActive(link.href) && link.href !== "#"
                          ? "text-[#0fa353]"
                          : "text-gray-800 group-hover:text-[#0fa353]"
                      }
                    `}
                  >
                    {link.label}
                    {link.dropdownItems && (
                      <FaChevronDown className="text-[10px] opacity-70 mt-0.5 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {link.dropdownItems && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                      <div className="w-48 bg-white shadow-xl rounded-xl border border-gray-100 py-2 flex flex-col">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#0fa353] transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-[14px] font-bold text-[#0fa353] bg-emerald-50 hover:bg-emerald-100 border border-[#0fa353]/30 rounded-md transition-colors"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp
              </a>
              <Link
                href="/#calculator"
                className="flex items-center gap-2 px-5 py-2 text-[14px] font-bold text-white bg-[#0fa353] hover:bg-[#0c8a45] rounded-md shadow-md shadow-green-600/20 transition-all active:scale-95"
              >
                <HiOutlineSparkles className="text-yellow-300" />
                Get Free Quote
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-md bg-[#0fa353] text-white shadow-sm hover:opacity-90 active:scale-95 transition-all"
                aria-label="WhatsApp Us"
              >
                <FaWhatsapp className="text-lg" />
              </a>

              <button
                onClick={openDrawer}
                className="flex items-center justify-center w-9 h-9 rounded-md text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <HiOutlineMenuAlt3 className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-60 lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeDrawer}
          aria-hidden="true"
        />

        <div
          className={`absolute top-0 right-0 h-full w-[min(80vw,300px)] sm:w-[min(85vw,320px)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 shrink-0">
            <div className="relative w-28 h-8 flex items-center">
              <Image
                src="/logo/a2zlogo.webp"
                alt="A to Z Solar Solutions Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <button
              onClick={closeDrawer}
              className="flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <HiOutlineX className="text-xl" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4">
            <ul className="space-y-0.5 sm:space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.dropdownItems ? (
                    <details className="group">
                      <summary
                        className={`flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold rounded-lg transition-colors text-gray-800 hover:bg-gray-50 cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
                      >
                        {link.label}
                        <FaChevronDown className="text-xs text-gray-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="pl-6 pr-4 pb-2 space-y-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeDrawer}
                            className="block px-3 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-medium text-gray-600 rounded-lg hover:text-[#0fa353] hover:bg-emerald-50/50 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeDrawer}
                      className={`
                        flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold rounded-lg transition-colors
                        ${
                          isActive(link.href) && link.href !== "#"
                            ? "text-[#0fa353] bg-emerald-50/50"
                            : "text-gray-800 hover:bg-gray-50"
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-3 sm:px-4 pb-5 sm:pb-6 pt-3 sm:pt-4 border-t border-gray-100 shrink-0 space-y-2 sm:space-y-3">
            <Link
              href="/#calculator"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 text-[13px] sm:text-[15px] font-bold text-white bg-[#0fa353] rounded-md shadow-md shadow-green-600/20 active:scale-[0.98] transition-transform"
            >
              <HiOutlineSparkles className="text-yellow-300 text-lg" />
              Get Free Quote
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 text-[13px] sm:text-[15px] font-bold text-[#0fa353] bg-emerald-50 border border-[#0fa353]/30 rounded-md active:scale-[0.98] transition-transform"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
