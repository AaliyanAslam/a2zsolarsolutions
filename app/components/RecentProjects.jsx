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
} from "react-icons/fa6";

const PAGE_SIZE = 10;
const WHATSAPP_NUMBER = "923214189298";
const QUOTE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Salam A2Z Solar, I saw your recent projects and want to get a quote for my property.",
)}`;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353]";

const projectKey = (p) => p._id || p.id || p.imageUrl || p.image;

// Plain grey placeholder, same shape as a project card.
function CardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="aspect-3/4 animate-pulse rounded-sm bg-gray-200 sm:aspect-4/5"
    />
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
    }
  }, [data]);

  // Modal: Escape to close, lock page scroll, move focus in and back out.
  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveProject(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
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
      setLoadMoreError(true); // keep the button so the visitor can retry
    } finally {
      setIsLoadingMore(false);
    }
  };

  const showEmpty = !isLoading && !error && projects.length === 0;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 bg-white py-12 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-12">
          <h2
            id="projects-heading"
            className="text-[1.75rem] font-black leading-tight tracking-tight text-[#1a1c29] sm:text-4xl md:text-5xl"
          >
            Our recent <span className="text-[#0fa353]">solar projects</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            Alhamdulillah, A2Z Solar Solutions has completed 250+ solar projects
            across Karachi and Lahore. Tap a photo to see it full size.
          </p>
        </div>

        {/* Project grid */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
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
                <li key={projectKey(proj) || idx}>
                  <button
                    type="button"
                    onClick={(e) => openProject(proj, e)}
                    aria-label={`View ${proj.capacity} solar installation in ${proj.location}`}
                    className={`group relative block aspect-3/4 w-full overflow-hidden rounded-sm bg-gray-900 sm:aspect-4/5 ${FOCUS}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`${proj.capacity} solar installation in ${proj.location}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent"
                    />

                    <span className="absolute left-0 top-2.5 rounded-r-sm bg-[#0fa353] px-2.5 py-1 text-xs font-black text-white shadow-sm sm:text-sm">
                      {proj.capacity}
                    </span>

                    <span className="absolute inset-x-2 bottom-2.5 flex justify-center">
                      <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#1a1c29] shadow-sm">
                        <FaLocationDot
                          className="shrink-0 text-[#0fa353]"
                          aria-hidden="true"
                        />
                        <span className="truncate">{proj.location}</span>
                      </span>
                    </span>
                  </button>
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

        {/* Error / empty states */}
        {error && !isLoading && projects.length === 0 && (
          <div
            role="alert"
            className="rounded-sm border border-gray-200 bg-gray-50 p-8 text-center sm:p-12"
          >
            <h3 className="text-base font-bold text-[#1a1c29]">
              Projects could not be loaded
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-600">
              Please check your connection and refresh the page.
            </p>
          </div>
        )}

        {showEmpty && (
          <div className="rounded-sm border border-gray-200 bg-gray-50 p-8 text-center sm:p-12">
            <h3 className="text-base font-bold text-[#1a1c29]">
              New projects are coming soon
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-600">
              Projects added from the admin panel will appear here.
            </p>
          </div>
        )}

        {/* Load more */}
        {!isLoading && hasMore && (
          <div className="mt-8 flex flex-col items-center gap-2 sm:mt-10">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className={`inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-sm border-2 border-[#0fa353] bg-white px-8 py-3 text-sm font-bold text-[#1a1c29] transition-colors hover:bg-emerald-50 disabled:pointer-events-none disabled:opacity-70 sm:w-auto ${FOCUS}`}
            >
              {isLoadingMore ? (
                "Loading projects..."
              ) : (
                <>
                  See more projects
                  <FaChevronDown
                    size={11}
                    className="text-[#0fa353]"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
            {loadMoreError && (
              <p role="alert" className="text-sm text-red-700">
                Could not load more projects. Please try again.
              </p>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-sm bg-[#122116] p-5 text-white sm:mt-16 sm:p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <p className="text-xl font-black leading-snug sm:text-2xl md:text-3xl">
                250+ solar projects in Karachi and Lahore
              </p>
              <p className="mt-3 text-sm leading-relaxed text-emerald-100/80 sm:text-base">
                From compact homes in Malir and Mehmoodabad to 10kW-12kW villas
                in Falaknaz Dreams and Saba School Korangi. Every system uses
                Tier-1 hardware and wind-resistant structures.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
              <a
                href={QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
              >
                <FaWhatsapp className="text-base" aria-hidden="true" />
                Get a quote on WhatsApp
              </a>
              <Link
                href="/#calculator"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
              >
                Calculate your payback
                <FaArrowRight size={11} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image modal */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.capacity} solar installation in ${activeProject.location}`}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-sm bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 p-3 sm:p-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="shrink-0 rounded-sm bg-[#0fa353] px-2.5 py-0.5 text-xs font-black text-white sm:text-sm">
                  {activeProject.capacity}
                </span>
                <span className="flex min-w-0 items-center gap-1.5 text-sm font-bold text-[#1a1c29]">
                  <FaLocationDot
                    className="shrink-0 text-[#0fa353]"
                    aria-hidden="true"
                  />
                  <span className="truncate">{activeProject.location}</span>
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close image"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800 ${FOCUS}`}
              >
                <FaXmark size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-4/3 min-h-0 w-full bg-gray-900">
              <Image
                src={activeProject.imageUrl || activeProject.image}
                alt={`${activeProject.capacity} solar installation in ${activeProject.location}`}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <p className="truncate text-xs font-medium text-gray-600">
                Verified installation in {activeProject.location}
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Salam A2Z Solar, I am interested in a ${activeProject.capacity} solar system like your setup at ${activeProject.location}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] ${FOCUS}`}
              >
                <FaWhatsapp size={16} aria-hidden="true" />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
