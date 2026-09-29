"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaLocationDot,
  FaArrowRight,
  FaWhatsapp,
  FaTrophy,
  FaXmark,
  FaExpand,
  FaCircleCheck,
  FaChevronDown,
  FaBolt,
} from "react-icons/fa6";

export default function RecentProjects() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialProjects = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/projects?limit=10");
        const data = await res.json();

        if (isMounted && data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
          setHasMore(Boolean(data.hasMore));
        }
      } catch (err) {
        console.error("Failed to load projects from DB:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchInitialProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    if (activeProject) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeProject]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const res = await fetch(`/api/projects?skip=${projects.length}&limit=10`);
      const data = await res.json();

      if (data.success && Array.isArray(data.projects)) {
        const displayedIds = new Set(
          projects.map((p) => p._id || p.id || p.imageUrl)
        );
        const newItems = data.projects.filter(
          (p) => !displayedIds.has(p._id || p.id || p.imageUrl)
        );

        if (newItems.length > 0) {
          setProjects((prev) => [...prev, ...newItems]);
        }

        setHasMore(Boolean(data.hasMore) && newItems.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more projects:", err);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <section suppressHydrationWarning id="projects" className="py-14 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0fa353]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3 sm:py-1.5 sm:px-4 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 shadow-2xs">
            <FaTrophy className="text-[#0fa353] text-xs" />
            Solar Success Stories • Our Most Recent
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1a1c29] tracking-tight leading-tight mb-3 sm:mb-5">
            Featured <span className="text-[#0fa353]">Recent Projects</span>
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-gray-600 leading-relaxed font-normal">
            Alhamdulillah, <strong className="text-[#1a1c29] font-bold">A2Z Solar Solutions</strong> has successfully completed over 250+ solar projects across Karachi and Lahore. Each milestone represents our commitment to quality, innovation, and customer satisfaction.
          </p>
        </div>

        <div suppressHydrationWarning className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`init-skeleton-${i}`}
                className="relative aspect-3/4 sm:aspect-4/5 bg-gray-900/95 rounded-sm overflow-hidden border-2 border-emerald-900/40 shadow-sm animate-pulse select-none"
              >
                <div className="absolute top-2 sm:top-2.5 left-0 z-10">
                  <div className="w-12 sm:w-14 h-5 sm:h-6 bg-[#e02424]/50 rounded-r-sm" />
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/40 border border-emerald-500/20 flex items-center justify-center mb-2 animate-bounce">
                    <FaBolt className="text-[#0fa353]/70 text-sm" />
                  </div>
                  <div className="w-20 h-2 bg-gray-800 rounded-sm" />
                </div>
                <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 px-3 z-10 flex justify-center">
                  <div className="w-28 sm:w-32 h-6 rounded-full bg-[#f59e0b]/40 border border-[#f59e0b]/30" />
                </div>
              </div>
            ))}

          {!isLoading &&
            projects.map((proj, idx) => {
              const key = proj._id || proj.id || idx;
              const imgSrc = proj.imageUrl || proj.image;
              return (
                <div
                  key={key}
                  suppressHydrationWarning
                  onClick={() => setActiveProject(proj)}
                  className="group relative aspect-3/4 sm:aspect-4/5 bg-gray-900 rounded-sm overflow-hidden border-2 border-[#0fa353] hover:border-[#0c8a45] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
                >
                  {mounted ? (
                    <img
                      src={imgSrc}
                      alt={`${proj.capacity} Solar Installation - ${proj.location}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900" />
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40 group-hover:from-black/90 transition-colors duration-300 pointer-events-none" />

                  <div className="absolute top-2 sm:top-2.5 left-0 z-10">
                    <div className="bg-[#e02424] text-white text-[11px] sm:text-xs md:text-sm font-black px-2.5 sm:px-3 py-0.5 sm:py-1 shadow-md uppercase tracking-wider rounded-r-sm">
                      {proj.capacity}
                    </div>
                  </div>

                  <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-black/60 text-white flex items-center justify-center backdrop-blur-xs text-[10px]">
                      <FaExpand />
                    </div>
                  </div>

                  <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 px-2 sm:px-2.5 z-10 flex justify-center">
                    <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-gray-950 font-bold text-[10px] sm:text-[11px] shadow-md border border-white/40 max-w-full transition-colors">
                      <FaLocationDot className="text-gray-900 shrink-0 text-[10px]" />
                      <span className="truncate">{proj.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}

          {isLoadingMore &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`more-skeleton-${i}`}
                className="relative aspect-3/4 sm:aspect-4/5 bg-gray-900/95 rounded-sm overflow-hidden border-2 border-emerald-900/50 shadow-sm animate-pulse select-none"
              >
                <div className="absolute top-2 sm:top-2.5 left-0 z-10">
                  <div className="w-12 sm:w-14 h-5 sm:h-6 bg-[#e02424]/50 rounded-r-sm" />
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/40 border border-emerald-500/20 flex items-center justify-center mb-2 animate-bounce">
                    <FaBolt className="text-[#0fa353]/70 text-sm" />
                  </div>
                  <div className="w-20 h-2 bg-gray-800 rounded-sm" />
                </div>
                <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 px-3 z-10 flex justify-center">
                  <div className="w-28 sm:w-32 h-6 rounded-full bg-[#f59e0b]/40 border border-[#f59e0b]/30" />
                </div>
              </div>
            ))}
        </div>

        {!isLoading && projects.length === 0 && (
          <div className="p-8 sm:p-12 text-center bg-gray-50 border border-gray-200/80 rounded-sm mb-10">
            <div className="w-12 h-12 rounded-sm bg-emerald-50 text-[#0fa353] flex items-center justify-center mx-auto border border-emerald-200 mb-3">
              <FaTrophy size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900">Featured Installations Coming Soon</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              New solar system projects uploaded from the Admin Panel will appear here.
            </p>
          </div>
        )}

        {!isLoading && hasMore && (
          <div className="flex justify-center mb-10 sm:mb-14">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-sm bg-white hover:bg-emerald-50 text-gray-900 border-2 border-[#0fa353] hover:border-[#0c8a45] text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
            >
              {isLoadingMore ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0fa353] border-t-transparent rounded-full animate-spin" />
                  <span>Loading Solar Projects...</span>
                </>
              ) : (
                <>
                  <span>See More Projects</span>
                  <FaChevronDown size={11} className="text-[#0fa353]" />
                </>
              )}
            </button>
          </div>
        )}

        <div className="relative rounded-sm bg-linear-to-br from-[#122116] via-[#162a1c] to-[#0d1a11] text-white p-5 sm:p-8 md:p-10 border border-emerald-900/60 shadow-xl overflow-hidden mb-8 sm:mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0fa353]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#a3e635] bg-white/10 px-2.5 py-0.5 rounded-sm border border-white/15">
                  Over 250+ Installed Sites
                </span>
                <span className="text-xs text-emerald-300">• Karachi &amp; Lahore</span>
              </div>

              <blockquote className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                “Over 250+ Success Stories in Solar Energy.”
              </blockquote>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
                Alhamdulillah, our installations range from compact residential systems in Malir and Mehmoodabad to 10kW-12kW luxury villas in Falaknaz Dreams and Saba School Korangi. Every project is engineered with high-wind structural integrity and Tier-1 hardware.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
              <a
                href="https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20saw%20your%20recent%20projects%20and%20want%20to%20get%20a%20quote%20for%20my%20property."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-600/20 active:scale-[0.99] transition-all text-center"
              >
                <FaWhatsapp className="text-white text-base" />
                <span>Inquire on WhatsApp</span>
              </a>

              <Link
                href="/#calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-300 text-xs sm:text-sm font-bold active:scale-[0.99] transition-all text-center shadow-2xs"
              >
                <span>Calculate Your Payback</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-sm max-w-xl w-full overflow-hidden shadow-2xl relative border border-gray-200"
          >
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2.5">
                <span className="bg-[#e02424] text-white text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                  {activeProject.capacity}
                </span>
                <div className="flex items-center gap-1.5 text-gray-900 font-bold text-xs sm:text-sm">
                  <FaLocationDot className="text-[#f59e0b] shrink-0" />
                  <span>{activeProject.location}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="w-7 h-7 rounded-sm text-gray-400 hover:text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Close image modal"
              >
                <FaXmark size={16} />
              </button>
            </div>

            <div className="relative aspect-4/3 w-full bg-gray-900">
              <img
                src={activeProject.imageUrl || activeProject.image}
                alt={`${activeProject.capacity} at ${activeProject.location}`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              <div className="text-[11px] text-gray-500 font-medium truncate">
                Verified Installation • {activeProject.location}
              </div>

              <a
                href={`https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20am%20interested%20in%20a%20${encodeURIComponent(activeProject.capacity)}%20solar%20system%20like%20your%20setup%20at%20${encodeURIComponent(activeProject.location)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold transition-all shadow-xs shrink-0"
              >
                <FaWhatsapp size={14} />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
