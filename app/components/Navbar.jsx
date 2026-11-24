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
  FaStar,
  FaCalculator,
  FaLeaf,
  FaTruck,
  FaCertificate,
  FaFilePdf,
  FaClock,
} from "react-icons/fa6";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

// Strip browser-extension injected DOM attributes synchronously before React hydrates
if (typeof document !== "undefined") {
  try {
    const extAttrs = [
      "bis_skin_checked",
      "bis_use",
      "cz-shortcut-listen",
      "data-new-gr-c-s-check-loaded",
      "data-gr-ext-installed",
      "data-dynamic-id",
    ];
    document
      .querySelectorAll(`[${extAttrs.join("],[")}]`)
      .forEach((el) => extAttrs.forEach((attr) => el.removeAttribute(attr)));
  } catch {
    // ignore DOM access errors
  }
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solar Solutions", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "About Us", href: "/about" },
  {
    label: "More",
    href: "#",
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    document.body.style.overflow = "";
    setDesktopMoreOpen(false);
  }, [pathname]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        document.body.style.overflow = "";
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

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

            {/* Mobile & Tablet Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden">
              <Link
                href="/#calculator"
                onClick={(e) => handleNavClick(e, "/#calculator")}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0fa353] hover:bg-[#0c8a45] rounded-sm transition-colors whitespace-nowrap ${FOCUS_RING}`}
              >
                <span>Free Quote</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:gap-1.5 rounded-sm bg-[#0fa353] sm:bg-white sm:border sm:border-gray-300 text-white sm:text-[#1a1c29] hover:bg-[#0c8a45] sm:hover:border-[#0fa353] sm:hover:text-[#0fa353] sm:hover:bg-gray-50 transition-colors ${FOCUS_RING}`}
                aria-label="WhatsApp Us"
              >
                <FaWhatsapp className="text-lg sm:text-sm sm:text-[#0fa353]" />
                <span className="hidden sm:inline text-xs font-semibold">WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={openDrawer}
                className={`flex items-center justify-center gap-1.5 h-9 px-2 sm:px-3 rounded-sm text-[#1a1c29] border border-gray-200 sm:border-gray-300 bg-white hover:bg-gray-50 transition-colors cursor-pointer ${FOCUS_RING}`}
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <HiOutlineMenuAlt3 className="text-xl" />
                <span className="hidden sm:inline text-xs font-semibold">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Drawer (Clean Corporate Sidebar) */}
      <div
        className={`fixed inset-0 z-60 lg:hidden overflow-hidden transition-all duration-200 ${
          isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/45 transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeDrawer}
          aria-hidden="true"
        />

        <aside
          aria-label="Mobile Navigation"
          className={`absolute top-0 right-0 h-full w-[min(86vw,360px)] sm:w-[380px] bg-white shadow-xl flex flex-col transition-transform duration-200 ease-out border-l border-gray-200 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 shrink-0 bg-white">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className={`flex items-center rounded-sm ${FOCUS_RING}`}
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
              type="button"
              onClick={closeDrawer}
              className={`flex items-center justify-center w-9 h-9 rounded-sm border border-gray-200 text-gray-600 hover:text-[#1a1c29] hover:bg-gray-50 transition-colors cursor-pointer ${FOCUS_RING}`}
              aria-label="Close menu"
            >
              <HiOutlineX className="text-lg" />
            </button>
          </div>

          {/* Slim Theme Info Strip */}
          <div className="bg-[#122116] text-emerald-100/90 px-5 py-2 border-b border-emerald-900/60 flex items-center justify-between text-[11px] font-medium shrink-0">
            <span className="inline-flex items-center gap-1.5 text-emerald-200/85">
              <FaClock className="text-[#0fa353] text-[10px] shrink-0" />
              <span>Mon &ndash; Sat, 9 AM &ndash; 7 PM</span>
            </span>
            <a
              href="tel:+923214189298"
              className="inline-flex items-center gap-1 text-white hover:text-[#a3e635] font-semibold transition-colors"
            >
              <FaPhoneAlt className="text-[#0fa353] text-[9px]" />
              <span>0321-4189298</span>
            </a>
          </div>

          {/* Scrollable Navigation Links */}
          <nav className="flex-1 overflow-y-auto overscroll-contain bg-white">
            <ul className="divide-y divide-gray-100">
              {NAV_LINKS.filter((l) => !l.dropdownItems).map((link) => {
                const active = isActive(link);
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block py-3.5 px-5 text-[15px] transition-colors cursor-pointer ${FOCUS_RING} ${
                        active
                          ? "text-[#0fa353] font-semibold bg-emerald-50/35 border-l-[3px] border-l-[#0fa353] pl-[17px]"
                          : "text-[#1a1c29] font-medium hover:text-[#0fa353] hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              {/* Collapsible More & Tools Section */}
              {NAV_LINKS.filter((l) => l.dropdownItems).map((link) => {
                const moreActive = isActive(link);
                return (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => setIsMoreOpen((prev) => !prev)}
                      aria-expanded={isMoreOpen}
                      className={`w-full flex items-center justify-between py-3.5 px-5 text-[15px] transition-colors cursor-pointer ${FOCUS_RING} ${
                        moreActive
                          ? "text-[#0fa353] font-semibold bg-emerald-50/35 border-l-[3px] border-l-[#0fa353] pl-[17px]"
                          : isMoreOpen
                          ? "text-[#0fa353] font-semibold bg-gray-50/70"
                          : "text-[#1a1c29] font-medium hover:text-[#0fa353] hover:bg-gray-50"
                      }`}
                    >
                      <span>More &amp; Tools</span>
                      <FaChevronDown
                        className={`text-xs text-gray-400 transition-transform duration-200 ${
                          isMoreOpen ? "rotate-180 text-[#0fa353]" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isMoreOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="bg-gray-50/70 border-t border-gray-100 divide-y divide-gray-100/80">
                        {link.dropdownItems.map((item) => {
                          const itemActive =
                            !item.href.startsWith("/#") &&
                            pathname?.startsWith(item.href);

                          return (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={`block px-6 py-2.5 transition-colors cursor-pointer ${FOCUS_RING} ${
                                  itemActive
                                    ? "bg-white text-[#0fa353] border-l-2 border-l-[#0fa353] pl-[22px]"
                                    : "text-gray-700 hover:bg-white hover:text-[#0fa353]"
                                }`}
                              >
                                <span
                                  className={`block text-[13.5px] leading-snug ${
                                    itemActive ? "font-semibold" : "font-medium"
                                  }`}
                                >
                                  {item.label}
                                </span>
                                <span className="block text-[11px] text-gray-500 font-normal mt-0.5">
                                  {item.desc}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Drawer Footer */}
          <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 shrink-0 space-y-2.5">
            <Link
              href="/#calculator"
              onClick={(e) => handleNavClick(e, "/#calculator")}
              className={`flex items-center justify-center gap-1.5 w-full py-2.5 text-[14px] font-semibold text-white bg-[#0fa353] hover:bg-[#0c8a45] rounded-sm transition-colors cursor-pointer ${FOCUS_RING}`}
            >
              <span>Get Free Quote</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDrawer}
              className={`flex items-center justify-center gap-2 w-full py-2.5 text-[14px] font-semibold text-[#1a1c29] bg-white border border-gray-300 hover:border-[#0fa353] hover:text-[#0fa353] rounded-sm transition-colors ${FOCUS_RING}`}
            >
              <FaWhatsapp className="text-base text-[#0fa353]" />
              <span>Chat on WhatsApp</span>
            </a>

            <p className="pt-1 text-center text-[11px] text-gray-500">
              Karachi (Korangi) &amp; Lahore (Mughalpura)
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
