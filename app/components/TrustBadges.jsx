"use client";

import Image from "next/image";

const BADGES = [
  {
    src: "/images/badges/fbr-badge.webp",
    alt: "FBR Registered",
  },
  {
    src: "/images/badges/solax-badge.webp",
    alt: "SolaX Authorized Dealer",
  },
  {
    src: "/images/badges/solis-badge.webp",
    alt: "Solis Authorized Partner",
  },
  {
    src: "/images/badges/inv-badge.webp",
    alt: "Inverex Solar Energy",
  },
  {
    src: "/images/badges/goodwe-badge.webp",
    alt: "GoodWe Solar Inverters",
  },
  {
    src: "/images/badges/longi-badge.webp",
    alt: "LONGi Solar",
  },
  {
    src: "/images/badges/dyness-badge.webp",
    alt: "Dyness Energy Storage",
  },
  {
    src: "/images/badges/saj-badge.webp",
    alt: "SAJ Electric",
  },
  {
    src: "/images/badges/coretech-badge.webp",
    alt: "CoreTech Solutions",
  },
  {
    src: "/images/badges/itel-badge.webp",
    alt: "Itel Energy",
  },
  {
    src: "/images/badges/zie-badge.webp",
    alt: "Ziewnic Solar Energy",
  },
  {
    src: "/images/badges/sunlife-badge.webp",
    alt: "Sun Life Solar",
  },
];

const GROUP = BADGES;

const TrustBadges = () => {
  return (
    <section className="w-full bg-white border-t border-b border-gray-100 py-8 sm:py-10">
      {/* Heading */}
      <div className="text-center px-4 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#39393e]">
          Our Trusted Certifications &amp; Partners
        </h2>
      </div>

      {/* Marquee wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade mask */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10
                        bg-linear-to-r from-white to-transparent"
        />
        {/* Right fade mask */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10
                        bg-linear-to-l from-white to-transparent"
        />

        {/* Track: Group A + Group B (identical). Animates -50% = exactly Group A width. */}
        <div className="marquee-track flex w-max">
          {/* Group A */}
          {GROUP.map((badge, i) => (
            <div
              key={`a${i}`}
              className="flex items-center justify-center shrink-0 px-8 sm:px-12"
            >
              <div className="relative w-16 h-16 sm:w-30 sm:h-20">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  loading="lazy"
                  className="object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  sizes="120px"
                />
              </div>
            </div>
          ))}

          {/* Group B — exact clone, hidden from screen-readers */}
          {GROUP.map((badge, i) => (
            <div
              key={`b${i}`}
              aria-hidden="true"
              className="flex items-center justify-center shrink-0 px-8 sm:px-12"
            >
              <div className="relative w-16 h-16 sm:w-30 sm:h-20">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  loading="lazy"
                  className="object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  sizes="120px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
