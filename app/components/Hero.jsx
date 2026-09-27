"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaPhoneAlt, FaCalculator } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-title",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        0.2,
      )
        .fromTo(
          ".hero-desc",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          0.4,
        )
        .fromTo(
          ".hero-buttons",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          0.6,
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85svh] md:min-h-[80svh] flex items-start md:items-center pt-24 md:pt-20 pb-8 md:pb-0 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image */}
        <Image
          src="/images/herobg.webp"
          alt="A2Z Solar Solutions Karachi Background"
          fill
          priority
          className="hidden md:block object-cover object-right"
          sizes="100vw"
        />
        {/* Mobile Image — 60% height, right-aligned */}
        <div className="block md:hidden absolute top-0 right-0 w-full h-[70%]">
          <Image
            src="/images/mobbackhero.webp"
            alt="A2Z Solar Solutions Karachi Mobile Background"
            fill
            priority
            className="object-cover object-center"
            sizes="80vw"
          />
        </div>
        {/* White Overlay for text legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-white/50 md:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[90%] md:max-w-2xl">
          {/* Title */}
          <h1 className="hero-title text-[28px] sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight mb-3 sm:mb-6">
            <span className="text-[#1a1c29]">Sustainable Power</span>
            <br />
            <span className="text-[#0fa353]">Made Simple &</span>
            <br />
            <span className="text-[#0fa353]">Reliable.</span>
          </h1>

          {/* Description */}
          <p className="hero-desc text-sm sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 leading-relaxed">
            Eliminate up to{" "}
            <span className="font-bold text-[#0fa353]">
              90% of your K-Electric bills
            </span>{" "}
            with premium On-Grid, Hybrid & Custom Solar Systems.
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col gap-3 sm:gap-4 w-full sm:max-w-md">
            <Link
              href="/#calculator"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#0fa353] text-white text-[13px] sm:text-[15px] font-bold rounded-lg shadow-sm hover:bg-[#0c8a45] transition-colors duration-300"
            >
              Calculate Solar Savings &rarr;
            </Link>

            <a
              href="tel:03214189298"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white border border-gray-200 text-[#1a1c29] text-[13px] sm:text-[15px] font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-300"
            >
              <FaPhoneAlt className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0fa353]" />
              Call Now — 0321-4189298
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
