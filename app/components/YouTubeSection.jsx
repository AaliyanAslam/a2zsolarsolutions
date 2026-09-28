"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaYoutube,
  FaPlay,
  FaArrowUpRightFromSquare,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { youtubeChannelData } from "../data/videosData";

export default function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollContainerRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  // Doubled for continuous smooth infinite scrolling
  const videosList = [...youtubeChannelData.videos, ...youtubeChannelData.videos];

  // Continuous horizontal auto-scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const scrollSpeed = 0.8;

    const step = () => {
      if (!isHovered && !isUserInteracting && container) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isUserInteracting]);

  const handleUserInteractionStart = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
  };

  const handleUserInteractionEnd = () => {
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 1800);
  };

  const scrollManual = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const offset = direction === "left" ? -320 : 320;
    container.scrollBy({ left: offset, behavior: "smooth" });
    handleUserInteractionStart();
    handleUserInteractionEnd();
  };

  // Keyboard escape for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    if (activeVideo) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeVideo]);

  return (
    <section id="youtube" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Accents — matching Services */}
      <div className="absolute top-0 right-0 w-full h-125 bg-linear-to-b from-gray-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            {/* Badge — green theme matching Services */}
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live Rooftop Demos
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              Watch Our Real <span className="text-green-600">Solar Projects</span>
            </h2>

            <p className="text-sm md:text-lg text-gray-600 max-w-2xl">
              Real high-wind elevated structures, tier-1 inverter unboxings, and certified net metering activations recorded on-site by Uzair Khan.
            </p>
          </div>

          {/* Controls + YouTube Channel CTA */}
          <div className="flex items-center gap-3">
            {/* Left / Right arrows */}
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              <button
                onClick={() => scrollManual("left")}
                aria-label="Previous video"
                className="w-10 h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                onClick={() => scrollManual("right")}
                aria-label="Next video"
                className="w-10 h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>

            <a
              href={youtubeChannelData.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-md border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs sm:text-sm font-bold transition-all shadow-sm hover:scale-[1.02] whitespace-nowrap"
            >
              <FaYoutube className="text-lg text-red-600 shrink-0" />
              <span>{youtubeChannelData.handle}</span>
              <FaArrowUpRightFromSquare className="text-[10px] text-red-400 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Continuous Horizontal Video Gallery ── */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* linear fades */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          onTouchStart={handleUserInteractionStart}
          onTouchEnd={handleUserInteractionEnd}
          onMouseDown={handleUserInteractionStart}
          onMouseUp={handleUserInteractionEnd}
          onWheel={handleUserInteractionStart}
          className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-8 py-4 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
          style={{ scrollBehavior: isUserInteracting ? "smooth" : "auto" }}
        >
          {videosList.map((video, idx) => (
            <div
              key={`${video.id}-${idx}`}
              onClick={() => setActiveVideo(video)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveVideo(video);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Play video: ${video.title}`}
              className="group relative w-75 sm:w-95 md:w-115 lg:w-130 aspect-video rounded-md overflow-hidden shrink-0 border border-gray-200 hover:border-green-300 transition-all duration-300 cursor-pointer bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm hover:shadow-xl hover:shadow-green-500/10"
            >
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={`${video.title} - Solar Video Demonstration Karachi`}
                width={480}
                height={270}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* linear Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/20 to-transparent group-hover:via-gray-950/40 transition-colors duration-300" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 text-gray-900 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <FaPlay className="text-base sm:text-lg ml-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-400 mb-1 drop-shadow-md">
                  {video.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-green-300 transition-colors drop-shadow-md">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Video Player Modal ── */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-md max-w-4xl w-full overflow-hidden shadow-2xl relative border border-gray-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-lg">
                  <FaYoutube />
                </span>
                <div>
                  <span className="text-sm font-bold text-gray-900 block leading-tight">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    A2Z Solar Solutions • Uzair Khan
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <FaXmark className="text-sm" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-gray-50">
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {activeVideo.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {activeVideo.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500 font-medium">
                  {activeVideo.views} • Karachi Rooftop Project
                </span>

                <a
                  href={`https://wa.me/923214189298?text=Salam%20Uzair%20Khan%2C%20I%20watched%20your%20video%20%22${encodeURIComponent(
                    activeVideo.title
                  )}%22%20and%20want%20to%20discuss%20a%20similar%20solar%20setup%20for%20my%20home.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-gray-50 hover:bg-[#25D366] text-gray-800 hover:text-white font-bold border border-gray-200 hover:border-[#25D366] text-xs sm:text-sm shadow-sm hover:shadow-md transition-all whitespace-nowrap group/btn"
                >
                  <FaWhatsapp size={16} className="text-[#25D366] group-hover/btn:text-white transition-colors" />
                  Inquire for Similar Project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
