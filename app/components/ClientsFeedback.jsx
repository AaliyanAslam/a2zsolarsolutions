"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import { fetcher, SWR_CACHE_CONFIG } from "@/lib/fetcher";
import {
  FaStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaHeart,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaXmark,
  FaArrowRight,
} from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi2";

const WHATSAPP_FEEDBACK_URL =
  "https://wa.me/923214189298?text=Hello%20A2Z%20Solar%20Solutions%2C%20I%20would%20like%20to%20share%20my%20feedback%20regarding%20your%20solar%20services";

const MIN_ITEMS_PER_SET = 6;
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353]";

function TestimonialCard({ item, duplicate, onOpen }) {
  const [imgError, setImgError] = useState(false);
  const initials = (item.name || "C")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isLong = Boolean(item.review && item.review.length > 150);

  return (
    <div
      aria-hidden={duplicate ? "true" : undefined}
      className="w-[290px] xs:w-[325px] sm:w-[365px] md:w-[395px] shrink-0 pr-4 sm:pr-5 box-content select-none"
    >
      <div className="h-[320px] sm:h-[330px] p-5 sm:p-6 bg-white rounded-sm border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-[#0fa353]/50 transition-all duration-300 flex flex-col justify-between group relative select-text">
        <div className="space-y-3">
          {/* Header: Avatar, Name & Location, Quote Icon */}
          <div className="flex items-start justify-between gap-3 select-none">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-emerald-50 text-[#0fa353] flex items-center justify-center font-bold text-sm shadow-2xs">
                {item.image && !imgError ? (
                  <Image
                    src={item.image}
                    alt={item.name || "Customer"}
                    fill
                    unoptimized
                    onError={() => setImgError(true)}
                    className="object-cover pointer-events-none select-none"
                    sizes="48px"
                  />
                ) : (
                  <span>{initials || "C"}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm sm:text-base text-[#1a1c29] leading-tight truncate">
                  {item.name}
                </div>
                <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 mt-0.5 font-medium truncate">
                  <FaMapMarkerAlt className="text-[#0fa353] text-[9px] shrink-0" />
                  <span className="truncate">{item.address}</span>
                </div>
              </div>
            </div>

            <div className="text-gray-300 group-hover:text-emerald-500 transition-colors shrink-0">
              <FaQuoteLeft className="text-sm opacity-60" />
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-amber-400 select-none">
            {[...Array(item.starQty || 5)].map((_, i) => (
              <FaStar key={i} className="text-xs" />
            ))}
            <span className="text-[10px] font-bold text-gray-400 ml-1">
              ({item.starQty || 5}.0)
            </span>
          </div>

          {/* Review text preview */}
          <div className="relative">
            <p className="line-clamp-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
              &ldquo;{item.review}&rdquo;
            </p>

            {isLong && (
              <button
                type="button"
                tabIndex={duplicate ? -1 : 0}
                onClick={(e) => onOpen(item, e)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] transition-colors mt-2 cursor-pointer focus-visible:outline-hidden"
              >
                <span>Read full review</span>
                <FaArrowRight className="text-[9px]" />
              </button>
            )}
          </div>
        </div>

        {/* Card Footer: Verified Client Tag */}
        <div className="pt-3.5 mt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 select-none">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-sm border border-emerald-200/60">
            <FaCheckCircle className="text-[10px]" />
            Verified Client
          </span>
          <span className="text-gray-400 font-medium">A2Z Solar</span>
        </div>
      </div>
    </div>
  );
}

const ClientsFeedback = () => {
  const [activeReview, setActiveReview] = useState(null);
  const [userPaused, setUserPaused] = useState(false);

  const containerRef = useRef(null);
  const isInteractingRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const mouseStartXRef = useRef(0);
  const mouseStartScrollRef = useRef(0);
  const resumeTimeoutRef = useRef(null);
  const hasDraggedRef = useRef(false);
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const accumulatedScrollRef = useRef(0);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  // Fetch all testimonials
  const { data, error, isLoading } = useSWR(
    "/api/testimonials",
    fetcher,
    SWR_CACHE_CONFIG
  );

  const testimonials =
    data?.success && Array.isArray(data.testimonials) ? data.testimonials : [];

  // Generate sets wide enough for infinite wrap
  const copies = testimonials.length
    ? Math.max(1, Math.ceil(MIN_ITEMS_PER_SET / testimonials.length))
    : 1;
  const set = Array.from({ length: copies }).flatMap(() => testimonials);

  // Initialize scroll position to center set so user can scroll left or right immediately
  useEffect(() => {
    const el = containerRef.current;
    if (!el || testimonials.length === 0) return;

    const initScroll = () => {
      if (el && el.scrollWidth > el.clientWidth) {
        const oneSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft === 0 && oneSetWidth > 0) {
          el.scrollLeft = oneSetWidth;
          accumulatedScrollRef.current = oneSetWidth;
        }
      }
    };

    initScroll();
    const timeout = setTimeout(initScroll, 120);
    return () => clearTimeout(timeout);
  }, [testimonials]);

  // Butter-smooth continuous horizontal auto-scroll via requestAnimationFrame
  useEffect(() => {
    if (testimonials.length === 0) return;

    let animationFrameId;
    let lastTime = performance.now();
    const pixelsPerSecond = 38; // smooth, comfortable reading pace

    const step = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const el = containerRef.current;
      if (el) {
        const oneSetWidth = el.scrollWidth / 3;

        if (
          !isInteractingRef.current &&
          !userPaused &&
          !activeReview &&
          oneSetWidth > 0
        ) {
          accumulatedScrollRef.current += pixelsPerSecond * dt;
          if (accumulatedScrollRef.current >= oneSetWidth * 2) {
            accumulatedScrollRef.current -= oneSetWidth;
          }
          el.scrollLeft = accumulatedScrollRef.current;
        } else {
          accumulatedScrollRef.current = el.scrollLeft;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [testimonials.length, userPaused, activeReview]);

  // Touch handlers for seamless mobile thumb scrolling
  const handleTouchStart = (e) => {
    isInteractingRef.current = true;
    hasDraggedRef.current = false;
    if (e.touches && e.touches[0]) {
      touchStartPosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchMove = (e) => {
    if (!hasDraggedRef.current && e.touches && e.touches[0]) {
      const dx = Math.abs(e.touches[0].clientX - touchStartPosRef.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartPosRef.current.y);
      if (dx > 7 && dx > dy) {
        hasDraggedRef.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 2800);

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 150);
  };

  // Seamless infinite loop wrap on native scroll (momentum fling or thumb swipe)
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    accumulatedScrollRef.current = el.scrollLeft;

    const oneSetWidth = el.scrollWidth / 3;
    if (oneSetWidth > 0) {
      if (el.scrollLeft >= oneSetWidth * 2) {
        el.scrollLeft -= oneSetWidth;
        accumulatedScrollRef.current = el.scrollLeft;
      } else if (el.scrollLeft <= 10) {
        el.scrollLeft += oneSetWidth;
        accumulatedScrollRef.current = el.scrollLeft;
      }
    }
  };

  // Mouse drag handlers for desktop PC
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const el = containerRef.current;
    if (!el) return;
    isMouseDownRef.current = true;
    isInteractingRef.current = true;
    hasDraggedRef.current = false;
    mouseStartXRef.current = e.pageX - el.offsetLeft;
    mouseStartScrollRef.current = el.scrollLeft;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - mouseStartXRef.current;
    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = mouseStartScrollRef.current - walk;
    accumulatedScrollRef.current = el.scrollLeft;
  };

  const handleMouseUp = () => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 150);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 2500);
    }
  };

  const handleMouseEnter = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    if (isMouseDownRef.current) {
      handleMouseUp();
    } else {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 1800);
    }
  };

  // Step left or right via button
  const scrollByDirection = (dir) => {
    const el = containerRef.current;
    if (!el) return;
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    el.scrollBy({ left: dir * 380, behavior: "smooth" });

    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 3500);
  };

  // Modal dialog handler
  const openReviewModal = (review, e) => {
    if (hasDraggedRef.current) return;
    lastTriggerRef.current = e?.currentTarget;
    setActiveReview(review);
  };

  // Keyboard and scroll lock for modal
  useEffect(() => {
    if (!activeReview) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveReview(null);
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [activeReview]);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      <style>{`
        .scrollbar-none {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Subtle modern dot-grid pattern */}
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

          <h2
            id="reviews-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1a1c29] tracking-tight"
          >
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

        {/* Featured Mission Quote Banner */}
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

                <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/10 border border-white/20 text-[11px] sm:text-xs font-semibold text-emerald-200 tracking-wide backdrop-blur-xs shadow-2xs">
                    <FaHeart className="text-[#F47C20] text-[10px]" />
                    <span>Karachi & Lahore Energy Partnerships</span>
                  </div>
                  <span className="text-[11px] text-emerald-400/60 hidden sm:inline">
                    •
                  </span>
                  <span className="text-[11px] text-emerald-300/80 font-medium">
                    Verified Customer Feedback & Ratings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls Bar */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0fa353] animate-pulse" />
            <span className="font-semibold text-gray-700">
              Verified Customer Reviews
            </span>
            <span className="text-gray-400">•</span>
            <span className="hidden xs:inline">Auto-scrolling (Swipe or drag anytime)</span>
            <span className="xs:hidden">Swipe to explore</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {testimonials.length > 0 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollByDirection(-1)}
                  aria-label="Previous testimonials"
                  className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-sm border border-gray-300 bg-white text-[#1a1c29] transition-colors hover:bg-gray-50 cursor-pointer shadow-2xs ${FOCUS}`}
                >
                  <FaChevronLeft className="text-xs" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByDirection(1)}
                  aria-label="Next testimonials"
                  className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-sm border border-gray-300 bg-white text-[#1a1c29] transition-colors hover:bg-gray-50 cursor-pointer shadow-2xs ${FOCUS}`}
                >
                  <FaChevronRight className="text-xs" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-pressed={userPaused}
                  className={`inline-flex min-h-9 sm:min-h-10 items-center justify-center gap-1.5 rounded-sm border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-[#1a1c29] transition-colors hover:bg-gray-50 cursor-pointer shadow-2xs ${FOCUS}`}
                >
                  {userPaused ? (
                    <FaPlay
                      className="text-[10px] text-[#0fa353]"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaPause className="text-[10px]" aria-hidden="true" />
                  )}
                  <span>{userPaused ? "Play" : "Pause"}</span>
                </button>
              </div>
            )}

            <a
              href={WHATSAPP_FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-9 sm:min-h-10 items-center justify-center gap-1.5 rounded-sm border border-emerald-300 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer shadow-2xs ${FOCUS}`}
            >
              <FaWhatsapp className="text-sm text-[#0fa353]" />
              <span>Share Feedback</span>
            </a>
          </div>
        </div>
      </div>

      {/* Auto Horizontal Scrolling Testimonials Row */}
      <div className="mt-6 relative">
        {isLoading ? (
          <div className="flex gap-4 sm:gap-5 overflow-hidden px-4 sm:px-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[290px] xs:w-[325px] sm:w-[365px] md:w-[395px] shrink-0 h-[320px] bg-white rounded-sm p-6 border border-gray-200 shadow-2xs animate-pulse space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-5/6" />
                    <div className="h-3 bg-gray-100 rounded w-4/6" />
                  </div>
                </div>
                <div className="h-4 bg-gray-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : error && testimonials.length === 0 ? (
          <div className="max-w-xl mx-auto text-center p-8 bg-white rounded-sm border border-gray-200 shadow-2xs">
            <p className="text-sm text-gray-600">
              Reviews currently unavailable. Please refresh or check back shortly.
            </p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="max-w-xl mx-auto text-center p-8 bg-white rounded-sm border border-dashed border-gray-300 space-y-3 shadow-2xs">
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
          <div
            ref={containerRef}
            role="region"
            aria-label="Customer Reviews"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onScroll={handleScroll}
            className="scrollbar-none overflow-x-auto cursor-grab active:cursor-grabbing select-none py-3"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 3%, #000 97%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 3%, #000 97%, transparent)",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex w-max pl-4 sm:pl-8">
              {set.map((item, idx) => (
                <TestimonialCard
                  key={`a-${item._id || idx}-${idx}`}
                  item={item}
                  onOpen={openReviewModal}
                />
              ))}
              {set.map((item, idx) => (
                <TestimonialCard
                  key={`b-${item._id || idx}-${idx}`}
                  item={item}
                  duplicate
                  onOpen={openReviewModal}
                />
              ))}
              {set.map((item, idx) => (
                <TestimonialCard
                  key={`c-${item._id || idx}-${idx}`}
                  item={item}
                  duplicate
                  onOpen={openReviewModal}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review Full Text Modal */}
      {activeReview && (
        <div
          onClick={() => setActiveReview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Feedback from ${activeReview.name}`}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-sm bg-white shadow-2xl border border-gray-200"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/80 p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-emerald-50 text-[#0fa353] flex items-center justify-center font-bold text-sm shadow-2xs">
                  {activeReview.image ? (
                    <Image
                      src={activeReview.image}
                      alt={activeReview.name || "Customer"}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <span>
                      {(activeReview.name || "C")
                        .split(" ")
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-[#1a1c29] leading-tight truncate">
                    {activeReview.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <FaMapMarkerAlt className="text-[#0fa353] text-[10px]" />
                    <span>{activeReview.address}</span>
                  </div>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveReview(null)}
                aria-label="Close review dialog"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800 cursor-pointer ${FOCUS}`}
              >
                <FaXmark size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(activeReview.starQty || 5)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                  <span className="text-xs font-bold text-gray-400 ml-1.5">
                    ({activeReview.starQty || 5}.0 rating)
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200/60 text-xs">
                  <FaCheckCircle className="text-[10px]" />
                  Verified Customer
                </span>
              </div>

              <div className="relative pl-3.5 border-l-2 border-[#0fa353]">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-line">
                  &ldquo;{activeReview.review}&rdquo;
                </p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="border-t border-gray-100 bg-gray-50/80 p-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gray-500">
                A2Z Solar Solutions Verified Review
              </span>
              <a
                href={WHATSAPP_FEEDBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs ${FOCUS}`}
              >
                <FaWhatsapp className="text-sm" />
                <span>Connect on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientsFeedback;
