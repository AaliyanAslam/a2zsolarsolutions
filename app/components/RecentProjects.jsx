"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, SWR_CACHE_CONFIG } from "@/lib/fetcher";
import {
  FaLocationDot,
  FaArrowRight,
  FaWhatsapp,
  FaXmark,
  FaChevronDown,
  FaCircleCheck,
} from "react-icons/fa6";
import SocialShareButton from "@/app/components/SocialShareButton";

const PAGE_SIZE = 10;
const WHATSAPP_NUMBER = "923214189298";
const QUOTE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Salam A2Z Solar, I saw your recent projects and want to get a quote for my property.",
)}`;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353]";

const projectKey = (p) => p._id || p.id || p.imageUrl || p.image;

// Modern skeleton placeholder matching vertical portrait card layout
function CardSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col h-full animate-pulse">
      <div className="relative aspect-[3/4] w-full bg-gray-100 rounded-2xl mb-3" />
      <div className="px-1 space-y-1.5">
        <div className="h-2.5 bg-gray-100 rounded w-1/3" />
        <div className="h-3.5 bg-gray-100 rounded w-3/4" />
        <div className="h-2.5 bg-gray-100 rounded w-1/2 pt-1" />
      </div>
    </div>
  );
}

export default function RecentProjects() {
  const [projects, setProjects] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const { data, error, isLoading } = useSWR(
    `/api/projects?limit=${PAGE_SIZE}`,
    fetcher,
    SWR_CACHE_CONFIG,
  );

  useEffect(() => {
    if (data?.success && Array.isArray(data.projects)) {
      setProjects(data.projects);
      setHasMore(Boolean(data.hasMore));

      // Auto-open modal if URL contains ?project=ID or #project-ID
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const targetId =
          params.get("project") ||
          (window.location.hash.startsWith("#project-")
            ? window.location.hash.replace("#project-", "")
            : "");
        if (targetId) {
          const matched = data.projects.find((p) => String(p._id) === targetId);
          if (matched) setActiveProject(matched);
        }
      }
    }
  }, [data]);

  // Modal: Escape to close, lock page scroll
  useEffect(() => {
    if (!activeProject) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveProject(null);
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
  }, [activeProject]);

  const openProject = (proj, e) => {
    lastTriggerRef.current = e.currentTarget;
    setActiveProject(proj);
  };

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setLoadMoreError(false);

    try {
      const res = await fetch(
        `/api/projects?skip=${projects.length}&limit=${PAGE_SIZE}`,
      );
      const json = await res.json();

      if (json.success && Array.isArray(json.projects)) {
        const shown = new Set(projects.map(projectKey));
        const newItems = json.projects.filter((p) => !shown.has(projectKey(p)));

        if (newItems.length > 0) {
          setProjects((prev) => [...prev, ...newItems]);
        }
        setHasMore(Boolean(json.hasMore) && newItems.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more projects:", err);
      setLoadMoreError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const showEmpty = !isLoading && !error && projects.length === 0;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative scroll-mt-20 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0fa353] mb-2 inline-block">
              Verified Portfolio
            </span>
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight"
            >
              Our recent solar installations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
              Over 250+ turnkey solar setups commissioned across Karachi and Lahore. Tap any project to view full photos and engineering details.
            </p>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-semibold self-start sm:self-auto">
            <FaCircleCheck className="text-[#0fa353]" size={13} />
            <span>250+ Turnkey Projects</span>
          </div>
        </div>

        {/* ── Project Grid ── */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
          {isLoading &&
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <li key={`skeleton-${i}`}>
                <CardSkeleton />
              </li>
            ))}

          {!isLoading &&
            projects.map((proj, idx) => {
              const imgSrc = proj.imageUrl || proj.image;
              return (
                <li key={projectKey(proj) || idx} className="group">
                  <div
                    onClick={(e) => openProject(proj, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openProject(proj, e)}
                    aria-label={`View ${proj.capacity} solar setup in ${proj.location}`}
                    className={`group flex flex-col h-full cursor-pointer rounded-2xl ${FOCUS}`}
                  >
                    {/* Vertical Portrait Image Container */}
                    <div className="relative aspect-[3/4] w-full rounded-2xl bg-gray-100 overflow-hidden mb-3">
                      <Image
                        src={imgSrc}
                        alt={`${proj.capacity} solar installation in ${proj.location}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Glassmorphic Capacity Tag */}
                      <div className="absolute top-2.5 left-2.5 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-gray-900 shadow-2xs border border-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0fa353]" />
                          <span>{proj.capacity}</span>
                        </span>
                      </div>

                      {/* Share Button (Desktop hover) */}
                      <div
                        className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SocialShareButton
                          title={`${proj.capacity} Solar Installation in ${proj.location}`}
                          url={
                            proj._id
                              ? `https://a2zsolarsolutions.com/projects/${proj._id}`
                              : "https://a2zsolarsolutions.com/#projects"
                          }
                          image={imgSrc}
                          location={proj.location}
                          capacity={proj.capacity}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Content Below Image - Clean non-boxy typography */}
                    <div className="flex flex-col flex-1 px-1">
                      <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">
                        Turnkey Setup
                      </p>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#0fa353] transition-colors line-clamp-1">
                        {proj.location}
                      </h3>

                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                        <span className="flex items-center gap-1 truncate">
                          <FaLocationDot size={10} className="text-[#0fa353] shrink-0" />
                          <span className="truncate">{proj.location.split(",")[0]}</span>
                        </span>
                        <span className="text-[#0fa353] font-semibold text-[11px] flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          View <FaArrowRight size={8} />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}

          {isLoadingMore &&
            Array.from({ length: 5 }).map((_, i) => (
              <li key={`more-skeleton-${i}`}>
                <CardSkeleton />
              </li>
            ))}
        </ul>

        {/* ── Error / Empty States ── */}
        {error && !isLoading && projects.length === 0 && (
          <div
            role="alert"
            className="rounded-2xl border border-gray-100 bg-gray-50/70 p-8 text-center sm:p-12 mt-8"
          >
            <h3 className="text-base font-semibold text-gray-900">
              Projects could not be loaded
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
              Please check your connection and refresh the page.
            </p>
          </div>
        )}

        {showEmpty && (
          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-8 text-center sm:p-12 mt-8">
            <h3 className="text-base font-semibold text-gray-900">
              New installations are being added
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
              Recent turnkey solar sites will appear here shortly.
            </p>
          </div>
        )}

        {/* ── Load More Button ── */}
        {!isLoading && hasMore && (
          <div className="mt-10 sm:mt-12 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className={`inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-50 px-6 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 transition-all shadow-2xs disabled:pointer-events-none disabled:opacity-60 cursor-pointer ${FOCUS}`}
            >
              {isLoadingMore ? (
                "Loading projects..."
              ) : (
                <>
                  <span>Load more installations</span>
                  <FaChevronDown size={10} className="text-gray-500" />
                </>
              )}
            </button>
            {loadMoreError && (
              <p role="alert" className="text-xs text-red-600 font-medium">
                Could not load more projects. Please try again.
              </p>
            )}
          </div>
        )}

        {/* ── Bottom Value Banner ── */}
        <div className="mt-16 sm:mt-20 rounded-2xl bg-gray-900 text-white p-8 sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0fa353] mb-2 inline-block">
                Karachi &amp; Lahore Coverage
              </span>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                250+ custom solar installations delivered
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-300">
                From residential rooftop systems across DHA, Bahria Town, and Malir to commercial 20kW+ industrial setups. Every installation features Tier-1 hardware, wind-resistant galvanized structures, and 24/7 post-install support.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
              <a
                href={QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0fa353] px-6 text-sm font-semibold text-white transition-all hover:bg-[#0c8a45] shadow-sm hover:shadow"
              >
                <FaWhatsapp size={18} />
                <span>Get a Free Site Quote</span>
              </a>
              <Link
                href="/#calculator"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <span>Calculate Your Savings</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modern Lightbox Modal ── */}
      {activeProject && (() => {
        const modalImgSrc = activeProject.imageUrl || activeProject.image;
        const shareTitle = `${activeProject.capacity} Solar Installation in ${activeProject.location}`;
        const projectId = activeProject._id;
        const projectShareUrl =
          typeof window !== "undefined" && projectId
            ? `${window.location.origin}/projects/${projectId}`
            : typeof window !== "undefined"
            ? `${window.location.origin}/#projects`
            : "https://a2zsolarsolutions.com/#projects";

        return (
          <div
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3.5 sm:p-5 animate-[fadeIn_150ms_ease-out]"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.capacity} solar installation in ${activeProject.location}`}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-[modalSlide_200ms_ease-out]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0fa353]" />
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                      {activeProject.capacity} Turnkey System
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate mt-0.5">
                    {activeProject.location}
                  </h3>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActiveProject(null)}
                  aria-label="Close dialog"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <FaXmark size={16} />
                </button>
              </div>

              {/* Photo Canvas - tall enough for full vertical 9:16 and 3:4 photos without any cut */}
              <div className="relative w-full h-[58vh] sm:h-[65vh] max-h-[620px] bg-neutral-950 flex items-center justify-center overflow-hidden p-2">
                <Image
                  src={modalImgSrc}
                  alt={`${activeProject.capacity} solar installation in ${activeProject.location}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 576px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Modal Actions */}
              <div className="border-t border-gray-100 bg-white px-5 py-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Salam A2Z Solar, I am interested in a ${activeProject.capacity} solar system like your setup at ${activeProject.location}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0fa353] hover:bg-[#0c8a45] px-4 text-sm font-semibold text-white transition-all shadow-sm hover:shadow"
                  >
                    <FaWhatsapp size={18} />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <div className="flex-1">
                    <SocialShareButton
                      title={shareTitle}
                      url={projectShareUrl}
                      image={modalImgSrc}
                      location={activeProject.location}
                      capacity={activeProject.capacity}
                      fullWidth
                      dropUp
                      variant="outline"
                      label="Share Project"
                      headerTitle="Share Project"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
