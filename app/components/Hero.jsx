import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-0 md:min-h-[90svh] flex items-start md:items-center pt-20 md:pt-20 pb-8 md:pb-0 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mobbackhero.webp"
          alt="A2Z Solar Solutions Karachi Background"
          fill
          priority
          sizes="100vw"
          className="md:hidden object-cover object-[82%_center]"
        />
        <Image
          src="/images/herobg.webp"
          alt="A2Z Solar Solutions Karachi Background"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-right"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent md:via-white/80" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/20 to-white md:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl md:max-w-2xl">
          <h1 className="hero-animate-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.18] sm:leading-[1.1] tracking-tight mb-3 sm:mb-6">
            <span className="mb-2 sm:mb-4 inline-flex items-center gap-2 rounded-full bg-[#0fa353]/10 px-3 py-1 text-[11px] sm:text-sm font-bold uppercase tracking-[0.12em] text-[#0fa353]">
              A2Z Solar Solutions
              <span className="sr-only"> — Solar Energy Company in Karachi:</span>
            </span>
            <br />
            <span className="text-[#1a1c29]">Sustainable Power</span>{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#0fa353]">Made Simple &amp;</span>{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#0fa353]">Reliable.</span>
          </h1>

          <p className="hero-animate-desc text-xs sm:text-base md:text-lg lg:text-xl text-gray-600 mb-5 sm:mb-8 md:mb-10 leading-relaxed max-w-lg sm:max-w-xl">
            Eliminate up to{" "}
            <span className="font-bold text-[#0fa353]">
              90% of your K-Electric bills
            </span>{" "}
            with premium On-Grid, Hybrid &amp; Custom Solar Systems.
          </p>

          <div className="hero-animate-buttons flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/#calculator"
              className="w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 bg-[#0fa353] text-white text-xs sm:text-sm md:text-[15px] font-bold rounded-lg shadow-md shadow-green-600/15 hover:bg-[#0c8a45] active:scale-[0.99] transition-all duration-200"
            >
              <span>Calculate Solar Savings</span>
              <span>&rarr;</span>
            </Link>

            <a
              href="tel:03214189298"
              className="w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-white border border-gray-200/90 text-[#1a1c29] text-xs sm:text-sm md:text-[15px] font-bold rounded-lg shadow-xs hover:bg-gray-50 active:scale-[0.99] transition-all duration-200"
            >
              <FaPhoneAlt className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0fa353] shrink-0" />
              <span>Call Now — 0321-4189298</span>
            </a>
          </div>

          <div className="hero-animate-metrics mt-6 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8 pt-2">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#0fa353]/10 text-[#0fa353] shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
                <p className="text-[11px] sm:text-sm font-bold text-gray-900 leading-tight">
                  Established 2015
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-tight mt-0.5">
                  10+ Years Market Experience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#0fa353]/10 text-[#0fa353] shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
                <p className="text-[11px] sm:text-sm font-bold text-gray-900 leading-tight">
                  250+ Successful Installs
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-tight mt-0.5">
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
