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
];

const GROUP = [...BADGES, ...BADGES, ...BADGES, ...BADGES];

const TrustBadges = () => {
  return (
    <section className="w-full bg-white border-t border-b border-gray-100 py-6 sm:py-8">
      {/* Label */}
      <p className="text-center text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 mb-5 sm:mb-6">
        Our Trusted Certifications &amp; Partners
      </p>

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
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  className="object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  sizes="80px"
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
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  className="object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  sizes="80px"
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
