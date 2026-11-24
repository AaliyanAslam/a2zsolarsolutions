"use client";

import { useState, useEffect, useRef } from "react";
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
  FaClock,
} from "react-icons/fa6";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: FaHouse },
  { label: "Products", href: "/products", icon: FaBoxOpen },
  { label: "Solar Solutions", href: "/#services", icon: FaSolarPanel },
  { label: "Projects", href: "/#projects", icon: FaBriefcase },
  { label: "About Us", href: "/about", icon: FaUsers },
  {
    label: "More",
    href: "#",
    icon: FaCompass,
    dropdownItems: [
      {
        label: "Solar Calculator",
        desc: "Size your kW system & savings",
        href: "/#calculator",
        icon: FaCalculator,
      },
      {
        label: "Downloads & PDFs",
        desc: "Inverter & panel datasheets",
        href: "/documents",
        icon: FaFilePdf,
      },
      {
        label: "Why Solar?",
        desc: "ROI, net metering & benefits",
        href: "/#why-solar",
        icon: FaLeaf,
      },
      {
        label: "How We Deliver",
        desc: "4-step engineering process",
        href: "/#process",
        icon: FaTruck,
      },
      {
        label: "Clients Feedback",
        desc: "Verified customer reviews",
        href: "/#reviews",
        icon: FaStar,
      },
      {
        label: "Video Showcase",
        desc: "Site walkthroughs on YouTube",
        href: "/#videos",
        icon: FaYoutube,
      },
      {
        label: "Certifications",
        desc: "PEC, AEDB & Tier-1 partners",
        href: "/#certifications",
        icon: FaCertificate,
      },
    ],
  },
  { label: "Contact", href: "/contact", icon: FaPhoneAlt },
];

const WHATSAPP_NUMBER = "923214189298";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20solar%20solutions`;

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353]";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Admin check placed after all hooks to comply with React Rules of Hooks.
  const isAdminPage = pathname?.startsWith("/admin");

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
    handleScroll();
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
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line
      closeDrawer();
    }
    setDesktopMoreOpen(false);
  }, [pathname]);

  // Close desktop dropdown on Escape key or outside click
  useEffect(() => {
    if (!desktopMoreOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDesktopMoreOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopMoreOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [desktopMoreOpen]);

  // Smooth scroll when navigating to hash from another page
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
    setDesktopMoreOpen(false);

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
    }
  };

  const handleDropdownEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setDesktopMoreOpen(true);
  };

  const handleDropdownLeave = () => {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setDesktopMoreOpen(false);
    }, 120);
  };

  const isActive = (link) => {
    if (link.dropdownItems) {
      return link.dropdownItems.some(
        (item) => !item.href.startsWith("/#") && pathname?.startsWith(item.href)
      );
    }
    if (link.href === "/") return pathname === "/";
    if (link.href.startsWith("/#") || link.href === "#") return false;
    return pathname?.startsWith(link.href);
  };

  // Early return for admin pages — placed after all hooks
  if (isAdminPage) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* ── Top Utility Bar (Desktop Only, Smooth Collapse on Scroll) ── */}
      <div
        className={`hidden lg:block w-full bg-[#122116] text-emerald-100/90 transition-all duration-200 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100 border-b border-emerald-900/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex justify-between items-center text-[12px] font-medium">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-50">
              <FaMapMarkerAlt className="text-[#0fa353] text-[11px] shrink-0" />
              <span>D-164, Korangi No. 6, Karachi 78400</span>
            </span>
            <span className="text-emerald-700" aria-hidden="true">
              |
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-200/80">
              <FaClock className="text-[#0fa353] text-[11px] shrink-0" />
              <span>Mon &ndash; Sat, 9:00 AM &ndash; 7:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:info@a2zsolarsolutions.com"
              className="inline-flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors"
            >
              <FaEnvelope className="text-[#0fa353] text-[11px]" />
              <span>info@a2zsolarsolutions.com</span>
            </a>
            <span className="w-px h-3.5 bg-emerald-800/80" aria-hidden="true" />
            <a
              href="https://youtube.com/@A2ZSolarSolutions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors group"
            >
              <FaYoutube className="text-sm text-emerald-300/80 group-hover:text-red-400 transition-colors" />
              <span>@A2ZSolarSolutions</span>
            </a>
            <span className="w-px h-3.5 bg-emerald-800/80" aria-hidden="true" />
            <a
              href="tel:+923214189298"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#a3e635] font-semibold transition-colors"
            >
              <FaPhoneAlt className="text-[#0fa353] text-[10px]" />
              <span>+92 321 4189298</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <nav
        aria-label="Primary Navigation"
        className={`w-full bg-white/95 backdrop-blur-md border-b transition-shadow duration-200 ${
          isScrolled
            ? "border-gray-200 shadow-xs"
            : "border-gray-200/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[68px] gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className={`flex items-center shrink-0 rounded-sm ${FOCUS_RING}`}
            >
              <div className="relative w-28 sm:w-36 lg:w-40 h-9 sm:h-10 lg:h-11 flex items-center">
                <Image
                  src="/logo/a2zlogo.webp"
                  alt="A to Z Solar Solutions Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);

                if (link.dropdownItems) {
                  return (
                    <div
                      key={link.label}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setDesktopMoreOpen((prev) => !prev)}
                        aria-expanded={desktopMoreOpen}
                        aria-haspopup="menu"
                        className={`relative inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 text-[13px] xl:text-[14px] font-semibold whitespace-nowrap rounded-sm transition-colors cursor-pointer ${FOCUS_RING} ${
                          active || desktopMoreOpen
                            ? "text-[#0fa353] bg-gray-50"
                            : "text-[#1a1c29] hover:text-[#0fa353] hover:bg-gray-50"
                        }`}
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          className={`text-[10px] opacity-70 transition-transform duration-150 ${
                            desktopMoreOpen ? "rotate-180 text-[#0fa353]" : ""
                          }`}
                        />
                        {active && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#0fa353]"
                          />
                        )}
                      </button>

                      {/* Clean 2-Column Corporate Dropdown Panel */}
                      <div
                        role="menu"
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-150 ${
                          desktopMoreOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto visible"
                            : "opacity-0 translate-y-1 pointer-events-none invisible"
                        }`}
                      >
                        <div className="w-[460px] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                          <div className="p-2 grid grid-cols-2 gap-1">
                            {link.dropdownItems.map((item) => {
                              const SubIcon = item.icon;
                              const itemActive =
                                !item.href.startsWith("/#") &&
                                pathname?.startsWith(item.href);

                              return (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  role="menuitem"
                                  onClick={(e) => handleNavClick(e, item.href)}
                                  className={`flex items-start gap-2.5 p-2.5 rounded-sm transition-colors group/item ${FOCUS_RING} ${
                                    itemActive
                                      ? "bg-emerald-50/70"
                                      : "hover:bg-gray-50"
                                  }`}
                                >
                                  <span
                                    className={`mt-0.5 w-7 h-7 rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                                      itemActive
                                        ? "bg-[#0fa353] text-white"
                                        : "bg-gray-100 text-gray-600 group-hover/item:bg-[#0fa353]/10 group-hover/item:text-[#0fa353]"
                                    }`}
                                  >
                                    {SubIcon && <SubIcon className="text-xs" />}
                                  </span>
                                  <span className="min-w-0">
                                    <span
                                      className={`block text-[13px] font-semibold leading-snug transition-colors ${
                                        itemActive
                                          ? "text-[#0fa353]"
                                          : "text-[#1a1c29] group-hover/item:text-[#0fa353]"
                                      }`}
                                    >
                                      {item.label}
                                    </span>
                                    <span className="block text-[11px] text-gray-500 leading-snug mt-0.5">
                                      {item.desc}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>

                          <div className="bg-gray-50 border-t border-gray-200 px-3.5 py-2.5 flex items-center justify-between text-xs">
                            <span className="text-gray-600 font-medium">
                              Need custom system sizing?
                            </span>
                            <Link
                              href="/contact"
                              onClick={() => setDesktopMoreOpen(false)}
                              className="font-semibold text-[#0fa353] hover:text-[#0c8a45] inline-flex items-center gap-1 transition-colors"
                            >
                              <span>Book Free Site Survey</span>
                              <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative inline-flex items-center px-2.5 xl:px-3 py-2 text-[13px] xl:text-[14px] font-semibold whitespace-nowrap rounded-sm transition-colors ${FOCUS_RING} ${
                      active
                        ? "text-[#0fa353]"
                        : "text-[#1a1c29] hover:text-[#0fa353] hover:bg-gray-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#0fa353]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-[#1a1c29] bg-white hover:bg-gray-50 border border-gray-300 hover:border-[#0fa353] hover:text-[#0fa353] rounded-sm transition-colors whitespace-nowrap ${FOCUS_RING}`}
              >
                <FaWhatsapp className="text-sm text-[#0fa353]" />
                <span>WhatsApp</span>
              </a>
              <Link
                href="/#calculator"
                onClick={(e) => handleNavClick(e, "/#calculator")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#0fa353] hover:bg-[#0c8a45] border border-[#0fa353] rounded-sm transition-colors whitespace-nowrap cursor-pointer ${FOCUS_RING}`}
              >
                <span>Get Free Quote</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-sm bg-[#0fa353] text-white hover:bg-[#0c8a45] transition-colors"
                aria-label="WhatsApp Us"
              >
                <FaWhatsapp className="text-lg" />
              </a>

              <button
                onClick={openDrawer}
                className="flex items-center justify-center w-9 h-9 rounded-sm text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
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
          className={`absolute top-0 right-0 h-full w-[min(86vw,340px)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-gray-200 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-gray-200 shrink-0 bg-white">
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
              className="flex items-center justify-center w-8 h-8 rounded-sm bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
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
                  const active = isActive(link);
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-sm transition-colors group cursor-pointer ${
                          active
                            ? "bg-emerald-50 text-[#0fa353] font-bold border border-emerald-200/70"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm transition-colors ${
                              active
                                ? "bg-[#0fa353] text-white"
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
                          <FaChevronRight className="text-[10px] text-gray-300 group-hover:text-gray-500 transition-colors" />
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
                Explore &amp; Tools
              </p>

              {NAV_LINKS.filter((l) => l.dropdownItems).map((link) => (
                <div key={link.label}>
                  <button
                    type="button"
                    onClick={() => setIsMoreOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors group cursor-pointer"
                    aria-expanded={isMoreOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-sm bg-gray-100 text-gray-500 group-hover:bg-emerald-50 group-hover:text-[#0fa353] flex items-center justify-center text-sm transition-colors">
                        <FaCompass />
                      </span>
                      <span className="text-[14px] font-semibold text-gray-800">
                        More Pages &amp; Tools
                      </span>
                    </div>
                    <FaChevronDown
                      className={`text-xs text-gray-400 transition-transform duration-200 ${
                        isMoreOpen ? "rotate-180 text-[#0fa353]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      isMoreOpen
                        ? "max-h-[500px] opacity-100 mt-1"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-gray-200 ml-4 my-1">
                      {link.dropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-gray-600 rounded-sm hover:text-[#0fa353] hover:bg-gray-50 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs text-gray-400 group-hover:text-[#0fa353] transition-colors">
                                  {Icon && <Icon />}
                                </span>
                                <span>{item.label}</span>
                              </div>
                              <FaChevronRight className="text-[9px] text-gray-300 group-hover:text-[#0fa353] transition-colors" />
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
          <div className="px-4 py-4 border-t border-gray-200 bg-gray-50/70 shrink-0 space-y-2.5">
            <Link
              href="/#calculator"
              onClick={(e) => handleNavClick(e, "/#calculator")}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-[14px] font-semibold text-white bg-[#0fa353] hover:bg-[#0c8a45] rounded-sm transition-colors cursor-pointer"
            >
              <span>Get Free Quote</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-[14px] font-semibold text-[#1a1c29] bg-white border border-gray-300 hover:border-[#0fa353] hover:text-[#0fa353] rounded-sm transition-colors"
            >
              <FaWhatsapp className="text-base text-[#0fa353]" />
              <span>WhatsApp Us</span>
            </a>

            <div className="pt-1 flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
              <FaPhoneAlt className="text-[10px] text-[#0fa353]" />
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
