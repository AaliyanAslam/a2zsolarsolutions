"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { FaWhatsapp } from "react-icons/fa";

import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Solar Calculator", href: "/#calculator" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Videos", href: "/#videos" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_NUMBER = "923001234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20solar%20solutions`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const drawerWrapperRef = useRef(null);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const navLinksRef = useRef([]);

  const lockScroll = useCallback((lock) => {
    document.body.style.overflow = lock ? "hidden" : "";
  }, []);

  const { contextSafe } = useGSAP({ scope: drawerWrapperRef });

  const openDrawer = contextSafe(() => {
    setIsOpen(true);
    lockScroll(true);

    const wrapper = drawerWrapperRef.current;
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    const links = navLinksRef.current.filter(Boolean);

    if (!wrapper || !drawer || !overlay) return;

    gsap.set(wrapper, { pointerEvents: "auto", visibility: "visible" });

    gsap.fromTo(
      overlay,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
    );

    gsap.fromTo(
      drawer,
      { x: "100%" },
      { x: "0%", duration: 0.4, ease: "power3.out" },
    );

    if (links.length > 0) {
      gsap.fromTo(
        links,
        { x: 40, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.07,
          delay: 0.15,
        },
      );
    }
  });

  const closeDrawer = contextSafe(() => {
    const wrapper = drawerWrapperRef.current;
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;

    if (!wrapper || !drawer || !overlay) return;

    gsap.to(drawer, {
      x: "100%",
      duration: 0.35,
      ease: "power3.in",
    });

    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(wrapper, { pointerEvents: "none", visibility: "hidden" });
        setIsOpen(false);
        lockScroll(false);
      },
    });
  });

  useEffect(() => {
    return () => {
      lockScroll(false);
    };
  }, [lockScroll]);

  useEffect(() => {
    if (isOpen) closeDrawer();
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-md" : "bg-transparent py-2"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="relative w-35 sm:w-40 h-10 sm:h-12 flex items-center">
                <Image
                  src="/logo/a2zlogo.webp"
                  alt="A to Z Solar Solutions Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${
                      isActive(link.href)
                        ? "text-[#2CA518] underline decoration-2 underline-offset-[6px]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-[#2CA518] to-[#51C624] rounded-md shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Get a Quote</span>
            </a>

            <div className="flex items-center gap-3 lg:hidden">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-md bg-linear-to-br from-[#2CA518] to-[#51C624] text-white shadow-md shadow-green-500/25 hover:opacity-90 active:scale-95 transition-all duration-200"
                aria-label="WhatsApp Us"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>

              <button
                onClick={openDrawer}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <HiOutlineMenuAlt3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-[#2CA518] to-transparent transition-opacity duration-300 ${isScrolled ? "opacity-80" : "opacity-0"}`} />
      </nav>

      <div
        ref={drawerWrapperRef}
        className="fixed inset-0 z-60 lg:hidden"
        style={{ pointerEvents: "none", visibility: "hidden" }}
      >
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeDrawer}
          style={{ opacity: 0, visibility: "hidden" }}
          aria-hidden="true"
        />

        <div
          ref={drawerRef}
          className="absolute top-0 right-0 h-full w-[min(85vw,320px)] bg-white shadow-2xl"
          style={{ transform: "translateX(100%)" }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="relative w-30 h-8 flex items-center">
                <Image
                  src="/logo/a2zlogo.webp"
                  alt="A to Z Solar Solutions Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={closeDrawer}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                aria-label="Close menu"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <Link
                      ref={(el) => {
                        navLinksRef.current[i] = el;
                      }}
                      href={link.href}
                      onClick={closeDrawer}
                      className={`
                        flex items-center gap-3 px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-200
                        ${
                          isActive(link.href)
                            ? "text-[#2CA518] underline decoration-2 underline-offset-[6px]"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        }
                      `}
                      style={{ opacity: 0, visibility: "hidden" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="px-4 pb-6 pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-linear-to-r from-[#2CA518] to-[#51C624] rounded-md shadow-lg shadow-green-500/20 hover:shadow-green-500/35 active:scale-[0.98] transition-all duration-200"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
