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
import {
  FaHouse,
  FaBoxOpen,
  FaSolarPanel,
  FaBriefcase,
  FaUsers,
  FaCompass,
  FaStar,
  FaCalculator,
  FaLeaf,
  FaTruck,
  FaCertificate,
  FaFilePdf,
  FaChevronRight,
} from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi2";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: FaHouse },
  { label: "Products", href: "/products", icon: FaBoxOpen },
  { label: "Solar Solutions", href: "/#services", icon: FaSolarPanel },
  { label: "Recent Projects", href: "/#projects", icon: FaBriefcase },
  { label: "About Us", href: "/about", icon: FaUsers },
  {
    label: "More",
    href: "#",
    icon: FaCompass,
    dropdownItems: [
      { label: "Clients Feedback", href: "/#reviews", icon: FaStar, color: "text-amber-500" },
      { label: "Solar Calculator", href: "/#calculator", icon: FaCalculator, color: "text-emerald-500" },
      { label: "Why Solar?", href: "/#why-solar", icon: FaLeaf, color: "text-emerald-600" },
      { label: "How We Deliver", href: "/#process", icon: FaTruck, color: "text-blue-500" },
      { label: "Video Showcase", href: "/#videos", icon: FaYoutube, color: "text-red-500" },
      { label: "Certifications", href: "/#certifications", icon: FaCertificate, color: "text-purple-500" },
      { label: "Downloads & PDFs", href: "/documents", icon: FaFilePdf, color: "text-rose-500" },
    ],
  },
  { label: "Contact", href: "/contact", icon: FaPhoneAlt },
];

const WHATSAPP_NUMBER = "923214189298";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20solar%20solutions`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
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

  // Handle smooth scroll when navigating to hash from another page
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        const timer = setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  const handleNavClick = (e, href) => {
    if (isOpen) {
      closeDrawer();
    }

    if (href === "#") {
      e.preventDefault();
      return;
    }

    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
      return;
    }

    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      return;
    }
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#") || href === "#") return false;
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
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center gap-2 shrink-0 group"
            >
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
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`
                      flex items-center gap-1 text-[14px] xl:text-[15px] font-semibold transition-colors duration-200
                      ${
                        isActive(link.href)
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
                      <div className="w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-2 flex flex-col">
                        {link.dropdownItems.map((item) => {
                          const SubIcon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#0fa353] transition-colors group/item"
                            >
                              {SubIcon && (
                                <SubIcon
                                  className={`text-xs ${
                                    item.color || "text-gray-400"
                                  } group-hover/item:scale-110 transition-transform`}
                                />
                              )}
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
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
                onClick={(e) => handleNavClick(e, "/#calculator")}
                className="flex items-center gap-2 px-5 py-2 text-[14px] font-bold text-white bg-[#0fa353] hover:bg-[#0c8a45] rounded-md shadow-md shadow-green-600/20 transition-all active:scale-95 cursor-pointer"
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

      {/* Mobile Drawer (Sidebar) */}
      <div
        className={`fixed inset-0 z-60 lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeDrawer}
          aria-hidden="true"
        />

        <div
          className={`absolute top-0 right-0 h-full w-[min(86vw,340px)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-gray-100 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-gray-100 shrink-0 bg-white">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center gap-2"
            >
              <div className="relative w-28 h-8 flex items-center">
                <Image
                  src="/logo/a2zlogo.webp"
                  alt="A to Z Solar Solutions"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <button
              onClick={closeDrawer}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <HiOutlineX className="text-lg" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4">
            {/* Main Navigation */}
            <div>
              <p className="px-2.5 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest select-none">
                Main Menu
              </p>
              <ul className="space-y-1">
                {NAV_LINKS.filter((l) => !l.dropdownItems).map((link) => {
                  const active = isActive(link.href);
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer ${
                          active
                            ? "bg-emerald-50 text-[#0fa353] font-bold shadow-xs border border-emerald-200/50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
                              active
                                ? "bg-[#0fa353] text-white shadow-xs"
                                : "bg-gray-100 text-gray-500 group-hover:bg-emerald-50 group-hover:text-[#0fa353]"
                            }`}
                          >
                            {Icon && <Icon />}
                          </span>
                          <span className="text-[14px]">{link.label}</span>
                        </div>
                        {active ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0fa353]" />
                        ) : (
                          <FaChevronRight className="text-[10px] text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Explore & Tools Section (Accordion) */}
            <div className="pt-2 border-t border-gray-100">
              <p className="px-2.5 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest select-none">
                Explore & Tools
              </p>

              {NAV_LINKS.filter((l) => l.dropdownItems).map((link) => (
                <div key={link.label}>
                  <button
                    type="button"
                    onClick={() => setIsMoreOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors group cursor-pointer"
                    aria-expanded={isMoreOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 group-hover:bg-emerald-50 group-hover:text-[#0fa353] flex items-center justify-center text-sm transition-colors">
                        <FaCompass />
                      </span>
                      <span className="text-[14px] font-semibold text-gray-800">
                        More Pages & Tools
                      </span>
                    </div>
                    <FaChevronDown
                      className={`text-xs text-gray-400 transition-transform duration-300 ${
                        isMoreOpen ? "rotate-180 text-[#0fa353]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isMoreOpen
                        ? "max-h-[500px] opacity-100 mt-1"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-emerald-100 ml-4 my-1">
                      {link.dropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-gray-600 rounded-lg hover:text-[#0fa353] hover:bg-emerald-50/60 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`text-xs ${
                                    item.color || "text-gray-400"
                                  } group-hover:scale-110 transition-transform`}
                                >
                                  {Icon && <Icon />}
                                </span>
                                <span>{item.label}</span>
                              </div>
                              <FaChevronRight className="text-[9px] text-gray-300 group-hover:text-[#0fa353] group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Footer CTAs */}
          <div className="px-4 py-4 border-t border-gray-100 bg-gray-50/60 shrink-0 space-y-2.5">
            <Link
              href="/#calculator"
              onClick={(e) => handleNavClick(e, "/#calculator")}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-[14px] font-bold text-white bg-[#0fa353] hover:bg-[#0c8a45] rounded-xl shadow-md shadow-green-600/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <HiOutlineSparkles className="text-yellow-300 text-base" />
              <span>Get Free Quote</span>
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-[14px] font-bold text-[#0fa353] bg-white border border-[#0fa353]/30 hover:bg-emerald-50/50 rounded-xl shadow-2xs active:scale-[0.98] transition-all"
            >
              <FaWhatsapp className="text-base text-[#0fa353]" />
              <span>WhatsApp Us</span>
            </a>

            <div className="pt-1 flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
              <FaPhoneAlt className="text-[10px] text-[#F47C20]" />
              <a
                href="tel:+923214189298"
                className="hover:text-[#0fa353] transition-colors"
              >
                Call: +92 321 4189298
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
