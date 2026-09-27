import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-[85svh] md:min-h-[90svh] flex items-start md:items-center pt-24 md:pt-20 pb-8 md:pb-0 overflow-hidden">
      {/* Background Image: Responsive picture avoids downloading both images */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/images/mobbackhero.webp"
          />
          <img
            src="/images/herobg.webp"
            alt="A2Z Solar Solutions Karachi Background"
            fetchPriority="high"
            decoding="async"
            className="absolute top-0 right-0 w-full h-[62%] md:h-full md:left-0 md:inset-0 object-cover object-center md:object-right"
          />
        </picture>
        {/* White Overlay for text legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-white/50 md:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[90%] md:max-w-2xl">
          {/* Title */}
          <h1 className="hero-animate-title text-[28px] sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight mb-3 sm:mb-6">
            <span className="text-[#1a1c29]">Sustainable Power</span>
            <br />
            <span className="text-[#0fa353]">Made Simple &</span>
            <br />
            <span className="text-[#0fa353]">Reliable.</span>
          </h1>

          {/* Description */}
          <p className="hero-animate-desc text-sm sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 leading-relaxed">
            Eliminate up to{" "}
            <span className="font-bold text-[#0fa353]">
              90% of your K-Electric bills
            </span>{" "}
            with premium On-Grid, Hybrid & Custom Solar Systems.
          </p>

          {/* Buttons */}
          <div className="hero-animate-buttons flex flex-col gap-3 sm:gap-4 w-full sm:max-w-md">
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

          {/* Trust Metrics */}
          <div className="hero-animate-metrics mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
            {/* Established Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0fa353]/10 text-[#0fa353] shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">
                  Established 2015
                </p>
                <p className="text-[11px] sm:text-xs text-gray-600">
                  10+ Years Market Experience
                </p>
              </div>
            </div>

            {/* Installations Metric */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0fa353]/10 text-[#0fa353] shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">
                  250+ Successful Installs
                </p>
                <p className="text-[11px] sm:text-xs text-gray-600">
                  Across Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
