"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import { fetcher, SWR_CACHE_CONFIG } from "@/lib/fetcher";
import {
  FaYoutube,
  FaPlay,
  FaPause,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import SocialShareButton from "@/app/components/SocialShareButton";

const WHATSAPP_NUMBER = "923214189298";
const CHANNEL_URL = "https://www.youtube.com/@A2ZSolarSolutions";
const MIN_ITEMS_PER_SET = 5; // keeps the loop wider than the screen

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353]";

// Returns an 11-character YouTube video id, or "" if the URL is not recognised.
function getYouTubeId(url) {
  if (!url) return "";
  const isId = (s) => /^[\w-]{11}$/.test(s || "");
  if (isId(url)) return url;

  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const parts = u.pathname.split("/").filter(Boolean);

    if (host === "youtu.be") return isId(parts[0]) ? parts[0] : "";

    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = u.searchParams.get("v");
      if (isId(v)) return v;
      if (["shorts", "embed", "live"].includes(parts[0]) && isId(parts[1])) {
        return parts[1];
      }
    }
  } catch {
    // fall through
  }
  return "";
}

const CARD_WIDTH = "w-68 sm:w-95 lg:w-105";

// Plain grey placeholder, same shape as a video card.
function VideoSkeleton() {
  return (
    <div aria-hidden="true" className={`${CARD_WIDTH} shrink-0`}>
      <div className="aspect-video animate-pulse rounded-sm bg-gray-200" />
      <div className="mt-3 h-4 w-4/5 animate-pulse rounded-sm bg-gray-200" />
    </div>
  );
}

function VideoCard({ video, duplicate, onOpen }) {
  return (
    <li
      className={`${CARD_WIDTH} shrink-0 pr-4 sm:pr-6 box-content select-none`}
      aria-hidden={duplicate ? "true" : undefined}
    >
      <div className="group block w-full text-left">
        <button
          type="button"
          tabIndex={duplicate ? -1 : 0}
          onClick={(e) => onOpen(video, e)}
          aria-label={`Play video: ${video.title}`}
          className={`relative block aspect-video w-full overflow-hidden rounded-sm bg-gray-900 cursor-pointer ${FOCUS}`}
        >
          <Image
            src={video.thumbnailUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 272px, (max-width: 1024px) 380px, 420px"
            className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
            draggable={false}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a1c29] shadow-lg transition-colors group-hover:bg-[#0fa353] group-hover:text-white sm:h-14 sm:w-14">
              <FaPlay className="ml-0.5 text-sm sm:text-base" />
            </span>
          </span>
        </button>

        <div className="mt-2.5 flex items-start justify-between gap-2.5">
          <button
            type="button"
            tabIndex={duplicate ? -1 : 0}
            onClick={(e) => onOpen(video, e)}
            className="flex-1 text-left cursor-pointer"
          >
            <span className="line-clamp-2 block text-sm font-bold leading-snug text-[#1a1c29] transition-colors hover:text-[#0fa353] sm:text-base select-text">
              {video.title}
            </span>
          </button>

          <div className="shrink-0 pt-0.5">
            <SocialShareButton
              title={`${video.title} — A2Z Solar Solutions`}
              url={video.youtubeUrl || "https://a2zsolarsolutions.com/#videos"}
              image={video.thumbnailUrl}
              variant="outline"
              label="Share"
              headerTitle="Share Video"
              size="sm"
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(null);
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

  const { data, error, isLoading } = useSWR(
    "/api/videos",
    fetcher,
    SWR_CACHE_CONFIG,
  );

  const videos = data?.success && Array.isArray(data.videos) ? data.videos : [];

  // Generate a set wide enough for infinite wrap
  const copies = videos.length
    ? Math.max(1, Math.ceil(MIN_ITEMS_PER_SET / videos.length))
    : 1;
  const set = Array.from({ length: copies }).flatMap(() => videos);

  // Initialize scroll position to center set so user can scroll left or right immediately
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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
  }, [videos]);

  // Butter-smooth continuous auto-scroll via requestAnimationFrame
  useEffect(() => {
    if (videos.length === 0) return;

    let animationFrameId;
    let lastTime = performance.now();
    const pixelsPerSecond = 42; // smooth and legible pace

    const step = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const el = containerRef.current;
      if (el) {
        const oneSetWidth = el.scrollWidth / 3;

        if (
          !isInteractingRef.current &&
          !userPaused &&
          !activeVideo &&
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
  }, [videos.length, userPaused, activeVideo]);

  // Touch handlers for mobile thumb scrolling
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
      if (dx > 8 && dx > dy) {
        hasDraggedRef.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 3000);

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 150);
  };

  // Infinite wrap handling on native scroll (thumb fling / momentum)
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

  // Mouse drag handlers for desktop
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
      }, 1500);
    }
  };

  // Nudge left or right via button
  const scrollByDirection = (dir) => {
    const el = containerRef.current;
    if (!el) return;
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    el.scrollBy({ left: dir * 360, behavior: "smooth" });

    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 3500);
  };

  // Modal: Escape to close, lock page scroll, move focus in and back out.
  useEffect(() => {
    if (!activeVideo) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
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
  }, [activeVideo]);

  const openVideo = (video, e) => {
    // If the user was swiping with thumb or dragging with mouse, ignore click
    if (hasDraggedRef.current) return;
    lastTriggerRef.current = e.currentTarget;
    setActiveVideo(video);
  };

  const activeId = activeVideo ? getYouTubeId(activeVideo.youtubeUrl) : "";

  return (
    <section
      id="videos"
      aria-labelledby="videos-heading"
      className="relative scroll-mt-20 overflow-hidden bg-white py-12 sm:py-20 md:py-24"
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

      {/* Anchor kept for links pointing to #youtube */}
      <div
        id="youtube"
        className="absolute -top-24 left-0"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              id="videos-heading"
              className="text-[1.75rem] font-black leading-tight tracking-tight text-[#1a1c29] sm:text-4xl md:text-5xl"
            >
              Watch our real{" "}
              <span className="text-[#0fa353]">solar projects</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              Elevated structures, hybrid inverter unboxings and battery storage
              activations, recorded on site.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {videos.length > 0 && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => scrollByDirection(-1)}
                  aria-label="Previous video"
                  className={`inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-sm border border-gray-300 bg-white text-[#1a1c29] transition-colors hover:bg-gray-50 cursor-pointer ${FOCUS}`}
                >
                  <FaChevronLeft className="text-xs" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByDirection(1)}
                  aria-label="Next video"
                  className={`inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-sm border border-gray-300 bg-white text-[#1a1c29] transition-colors hover:bg-gray-50 cursor-pointer ${FOCUS}`}
                >
                  <FaChevronRight className="text-xs" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-pressed={userPaused}
                  className={`inline-flex min-h-11 sm:min-h-12 items-center justify-center gap-2 rounded-sm border border-gray-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#1a1c29] transition-colors hover:bg-gray-50 cursor-pointer ${FOCUS}`}
                >
                  {userPaused ? (
                    <FaPlay
                      className="text-[10px] sm:text-xs text-[#0fa353]"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaPause
                      className="text-[10px] sm:text-xs"
                      aria-hidden="true"
                    />
                  )}
                  <span>{userPaused ? "Play" : "Pause"}</span>
                </button>
              </div>
            )}

            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 sm:min-h-12 items-center justify-center gap-2 rounded-sm border border-gray-300 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#1a1c29] transition-colors hover:bg-gray-50 cursor-pointer ${FOCUS}`}
            >
              <FaYoutube
                className="text-base sm:text-lg text-red-600"
                aria-hidden="true"
              />
              <span className="hidden xs:inline">Visit our </span>YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Running carousel (full width with native touch scroll + auto-flow) */}
      {isLoading ? (
        <div className="flex gap-4 overflow-hidden px-4 sm:gap-6 sm:px-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <VideoSkeleton key={i} />
          ))}
        </div>
      ) : error && videos.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="alert"
            className="rounded-sm border border-gray-200 bg-gray-50 p-8 text-center sm:p-12"
          >
            <h3 className="text-base font-bold text-[#1a1c29]">
              Videos could not be loaded
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-600">
              Please refresh the page, or watch them directly on our YouTube
              channel.
            </p>
          </div>
        </div>
      ) : videos.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm border border-gray-200 bg-gray-50 p-8 text-center sm:p-12">
            <h3 className="text-base font-bold text-[#1a1c29]">
              New videos are coming soon
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-600">
              Check our YouTube channel in the meantime.
            </p>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          role="region"
          aria-label="Project videos"
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
          className="scrollbar-none overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ul className="flex w-max py-2">
            {set.map((video, idx) => (
              <VideoCard
                key={`a-${video._id || idx}-${idx}`}
                video={video}
                onOpen={openVideo}
              />
            ))}
            {set.map((video, idx) => (
              <VideoCard
                key={`b-${video._id || idx}-${idx}`}
                video={video}
                duplicate
                onOpen={openVideo}
              />
            ))}
            {set.map((video, idx) => (
              <VideoCard
                key={`c-${video._id || idx}-${idx}`}
                video={video}
                duplicate
                onOpen={openVideo}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Video modal */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-y-auto rounded-sm bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 p-3 sm:p-4">
              <p className="flex min-w-0 items-center gap-2 text-sm font-bold text-[#1a1c29]">
                <FaYoutube
                  className="shrink-0 text-lg text-red-600"
                  aria-hidden="true"
                />
                <span className="truncate">A2Z Solar Solutions</span>
              </p>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800 ${FOCUS}`}
              >
                <FaXmark size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-video w-full shrink-0 bg-black">
              {activeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-white">
                  <p className="text-sm">
                    This video could not be played here.
                  </p>
                  <a
                    href={activeVideo.youtubeUrl || CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-white px-4 py-2 text-sm font-bold text-[#1a1c29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
                  >
                    <FaYoutube className="text-red-600" aria-hidden="true" />
                    Watch on YouTube
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <h3 className="text-base font-bold leading-snug text-[#1a1c29] sm:text-lg">
                {activeVideo.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2.5">
                <SocialShareButton
                  title={`${activeVideo.title} — A2Z Solar Solutions`}
                  url={activeVideo.youtubeUrl || "https://a2zsolarsolutions.com/#videos"}
                  image={activeVideo.thumbnailUrl}
                  variant="outline"
                  label="Share Video"
                  headerTitle="Share Video"
                  className="min-h-12! px-4! rounded-sm!"
                />

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Salam, I watched your solar video "${activeVideo.title}" and want to discuss a similar setup for my property.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] ${FOCUS}`}
                >
                  <FaWhatsapp size={16} aria-hidden="true" />
                  Ask about a similar project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
