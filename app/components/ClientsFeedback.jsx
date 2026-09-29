"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaWhatsapp,
  FaGlobe,
  FaMapMarkerAlt,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

const ClientsFeedback = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const WHATSAPP_FEEDBACK_URL =
    "https://wa.me/923214189298?text=Hello%20A2Z%20Solar%20Solutions%2C%20I%20would%20like%20to%20share%20my%20feedback%20regarding%20your%20solar%20services";

  useEffect(() => {
    fetchInitialTestimonials();
  }, []);

  const fetchInitialTestimonials = async () => {
    try {
      setIsLoadingInitial(true);
      const res = await fetch("/api/testimonials?skip=0&limit=6");
      const data = await res.json();

      if (data.success && data.testimonials) {
        setTestimonials(data.testimonials);
        setHasMore(data.hasMore || false);
      } else {
        setTestimonials([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading testimonials:", err);
      setTestimonials([]);
      setHasMore(false);
    } finally {
      setIsLoadingInitial(false);
    }
  };

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    try {
      setIsLoadingMore(true);
      const skip = testimonials.length;
      const res = await fetch(`/api/testimonials?skip=${skip}&limit=6`);
      const data = await res.json();

      if (data.success && data.testimonials) {
        setTestimonials((prev) => [...prev, ...data.testimonials]);
        setHasMore(data.hasMore || false);
      }
    } catch (err) {
      console.error("Error loading more testimonials:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <section
      id="reviews"
      className="scroll-mt-20 py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      {/* Subtle modern dot-grid pattern as in the user screenshot */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient gradient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

      {/* Target alias */}
      <div id="feedback" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
            <HiOutlineSparkles className="text-[#0fa353] text-sm" />
            <span>That Inspires Us</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1a1c29] tracking-tight">
            Read what people are saying
          </h2>

          <p className="text-sm sm:text-lg font-bold text-[#0fa353] italic">
            “Your Opinion Drives Our Excellence”
          </p>

          <p className="text-xs sm:text-sm md:text-[15px] text-gray-600 leading-relaxed max-w-2xl mx-auto font-normal">
            At{" "}
            <strong className="text-gray-900 font-bold">
              A2Z Solar Solutions
            </strong>
            , customer satisfaction is our top priority. We continuously strive
            to enhance our solar solutions and services through your valuable
            feedback. Share your thoughts and help us maintain our commitment to
            quality, reliability, and innovation in every project we deliver.
          </p>
        </div>

        {/* Featured Mission Quote Banner (rounded-sm & polished UI) */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
          <div className="relative rounded-sm bg-[#16271c] border-l-4 border-l-[#0fa353] border-y border-r border-[#264632] p-5 sm:p-7 text-white shadow-md overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#0fa353]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-[#0fa353]/20 border border-[#0fa353]/40 flex items-center justify-center shrink-0 text-emerald-400 shadow-2xs">
                <FaQuoteLeft className="text-base sm:text-lg" />
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-xs sm:text-base md:text-[17px] font-medium leading-relaxed text-emerald-50">
                  “At{" "}
                  <strong className="text-emerald-300 font-bold">
                    A2Z Solar Solutions.
                  </strong>
                  , we don’t just install solar systems — we build lasting energy
                  partnerships that empower you to enjoy clean, dependable, and
                  affordable power for years to come.”
                </p>

                {/* Karachi & Lahore Energy Partnerships (refined badge, rounded-sm) */}
                <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/10 border border-white/20 text-[11px] sm:text-xs font-semibold text-emerald-200 tracking-wide backdrop-blur-xs shadow-2xs">
                    <FaHeart className="text-[#F47C20] text-[10px]" />
                    <span>Karachi & Lahore Energy Partnerships</span>
                  </div>
                  <span className="text-[11px] text-emerald-400/60 hidden sm:inline">•</span>
                  <span className="text-[11px] text-emerald-300/80 font-medium">
                    Verified Customer Feedback & Ratings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid or Clean Empty State */}
        {isLoadingInitial ? (
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-sm p-5 sm:p-6 border border-gray-200 shadow-2xs animate-pulse space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                  <div className="h-3 bg-gray-100 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="mt-10 max-w-xl mx-auto text-center p-8 bg-white rounded-sm border border-dashed border-gray-300 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-sm bg-emerald-50 text-[#0fa353] flex items-center justify-center mx-auto border border-emerald-100">
              <FaQuoteLeft className="text-base" />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Client testimonials and project feedback will appear here as they are uploaded.
            </p>
            <a
              href={WHATSAPP_FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0fa353] hover:underline"
            >
              <FaWhatsapp className="text-sm" />
              <span>Share your feedback directly via WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-sm p-5 sm:p-6 border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-[#0fa353]/50 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div className="space-y-3.5">
                  {/* Header: Avatar, Name & Address, Quote / Stars icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-gray-50 shadow-2xs">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-sm sm:text-base text-[#1a1c29] leading-tight">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 mt-0.5 font-medium">
                          <FaMapMarkerAlt className="text-[#0fa353] text-[9px]" />
                          <span>{item.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Top right icon / verification */}
                    <div className="text-gray-300 group-hover:text-emerald-500 transition-colors">
                      <FaQuoteLeft className="text-sm opacity-60" />
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.starQty || 5)].map((_, i) => (
                      <FaStar key={i} className="text-xs" />
                    ))}
                    <span className="text-[10px] font-bold text-gray-400 ml-1">
                      ({item.starQty || 5}.0)
                    </span>
                  </div>

                  {/* Review Feedback Text */}
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Card Footer: Verified Client Tag */}
                <div className="pt-3.5 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-sm border border-emerald-200/60">
                    <FaCheckCircle className="text-[10px]" />
                    Verified Client
                  </span>
                  <span className="text-gray-400">A2Z Solar</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (matching user screenshot with rounded-sm) */}
        {hasMore && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-60"
            >
              {isLoadingMore ? (
                <>
                  <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span>Loading feedback...</span>
                </>
              ) : (
                <span>Load More</span>
              )}
            </button>
          </div>
        )}

        {/* Action & Official Website Bar (with rounded-sm) */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-sm bg-white border border-emerald-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-[#0fa353]">
              <FaGlobe className="text-lg" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                Visit Our Official Website
              </div>
              <a
                href="https://www.a2zsolarsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-black text-[#0fa353] hover:text-[#0c8a45] transition-colors"
              >
                www.A2ZSolarSolutions.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={WHATSAPP_FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#0fa353] text-white text-xs sm:text-sm font-bold hover:bg-[#0c8a45] transition-colors shadow-2xs active:scale-95"
            >
              <FaWhatsapp className="text-base" />
              <span>Share Your Feedback</span>
            </a>
            <Link
              href="/#calculator"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold transition-colors active:scale-95"
            >
              <span>Get Free Quote</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsFeedback;
