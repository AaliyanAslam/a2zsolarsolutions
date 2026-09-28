import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-0 md:min-h-[90svh] flex items-start md:items-center pt-20 md:pt-20 pb-8 md:pb-0 overflow-hidden">
      {/* Background Image & Light Overlay */}
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
            className="absolute inset-0 w-full h-full object-cover object-[82%_center] md:object-right"
          />
        </picture>
        {/* Soft Left Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent md:via-white/80" />
        {/* Subtle Bottom Fade into white section below */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/20 to-white md:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-77.5 sm:max-w-none md:max-w-2xl">
          {/* Title */}
          <h1 className="hero-animate-title text-[30px] sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-3.5 sm:mb-6">
            <span className="text-[#1a1c29]">Sustainable Power</span>
            <br />
            <span className="text-[#0fa353]">Made Simple &</span>
            <br />
            <span className="text-[#0fa353]">Reliable.</span>
          </h1>

          {/* Description */}
          <p className="hero-animate-desc text-[14px] sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 leading-relaxed max-w-82.5 sm:max-w-xl">
            Eliminate up to{" "}
            <span className="font-bold text-[#0fa353]">
              90% of your K-Electric bills
            </span>{" "}
            with premium On-Grid, Hybrid & Custom Solar Systems.
          </p>

          {/* Action Buttons */}
          <div className="hero-animate-buttons flex flex-col gap-3 sm:gap-4 w-full sm:max-w-md">
            <Link
              href="/#calculator"
              className="w-full h-12 sm:h-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#0fa353] text-white text-[14px] sm:text-[15px] font-bold rounded-lg shadow-md shadow-green-600/15 hover:bg-[#0c8a45] active:scale-[0.99] transition-all duration-200"
            >
              Calculate Solar Savings &rarr;
            </Link>

            <a
              href="tel:03214189298"
              className="w-full h-11 sm:h-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white border border-gray-200/90 text-[#1a1c29] text-[14px] sm:text-[15px] font-bold rounded-lg shadow-xs hover:bg-gray-50 active:scale-[0.99] transition-all duration-200"
            >
              <FaPhoneAlt className="w-3.5 h-3.5 text-[#0fa353]" />
              Call Now — 0321-4189298
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="hero-animate-metrics mt-6 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-8">
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
