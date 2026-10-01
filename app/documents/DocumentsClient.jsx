"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, SWR_CACHE_CONFIG } from "@/lib/fetcher";
import {
  FaFilePdf,
  FaArrowUpRightFromSquare,
  FaDownload,
  FaMagnifyingGlass,
  FaCopy,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";

const CATEGORIES = [
  "All",
  "Datasheet",
  "Brochure",
  "Warranty",
  "Company Profile",
  "Guide",
  "Report",
  "Other",
];

const SEARCH_DELAY_MS = 300;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0fa353]";

// Plain grey placeholder, same shape as a document card.
function DocSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse rounded-sm border border-gray-200 bg-white p-5 sm:p-6"
    >
      <div className="h-11 w-11 rounded-sm bg-gray-200" />
      <div className="mt-4 h-4 w-3/4 rounded-sm bg-gray-200" />
      <div className="mt-2 h-3 w-full rounded-sm bg-gray-200" />
      <div className="mt-1.5 h-3 w-2/3 rounded-sm bg-gray-200" />
      <div className="mt-6 h-12 rounded-sm bg-gray-200" />
    </div>
  );
}

export default function DocumentsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // debounced value
  const [copiedId, setCopiedId] = useState(null);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimeoutRef = useRef(null);

  // Wait for the visitor to stop typing before asking the server.
  useEffect(() => {
    const t = setTimeout(
      () => setSearchQuery(searchInput.trim()),
      SEARCH_DELAY_MS,
    );
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

  const queryParams = new URLSearchParams();
  if (selectedCategory !== "All")
    queryParams.append("category", selectedCategory);
  if (searchQuery) queryParams.append("search", searchQuery);
  const queryStr = queryParams.toString();
  const swrKey = `/api/documents${queryStr ? `?${queryStr}` : ""}`;

  // keepPreviousData: the list stays on screen while new results load.
  const { data, error, isLoading, isValidating } = useSWR(swrKey, fetcher, {
    ...SWR_CACHE_CONFIG,
    keepPreviousData: true,
  });

  const documents =
    data?.success && Array.isArray(data.documents) ? data.documents : [];

  // Safety net in case the API does not filter by search itself.
  const q = searchQuery.toLowerCase();
  const filteredDocs = q
    ? documents.filter(
        (doc) =>
          doc.title?.toLowerCase().includes(q) ||
          doc.description?.toLowerCase().includes(q) ||
          doc.fileName?.toLowerCase().includes(q),
      )
    : documents;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim()); // apply immediately
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const handleCopy = async (url, id) => {
    clearTimeout(copyTimeoutRef.current);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setCopyFailed(false);
    } catch {
      setCopiedId(null);
      setCopyFailed(true);
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedId(null);
      setCopyFailed(false);
    }, 2500);
  };

  const hasFilters = selectedCategory !== "All" || searchQuery;

  return (
    <main className="min-h-screen bg-white pb-16 text-[#1a1c29] selection:bg-emerald-100 selection:text-emerald-900 sm:pb-24">
      {/* Header */}
      <section className="border-b border-gray-100 bg-[#fbfdfa] pb-10 pt-24 sm:pb-14 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-sm font-medium text-gray-600"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className={`hover:text-[#0fa353] ${FOCUS}`}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">
                /
              </li>
              <li aria-current="page" className="font-semibold text-[#0fa353]">
                Downloads
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl text-[2rem] font-black leading-[1.1] tracking-tight sm:text-5xl">
            Datasheets, brochures and{" "}
            <span className="text-[#0fa353]">solar guides</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Download technical datasheets for hybrid and on-grid inverters
            (Inverex, Solis, Deye), Tier-1 solar panel specifications, our
            company brochure, and K-Electric and LESCO net metering guidelines.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 sm:mt-12 sm:px-6 lg:px-8">
        {/* Search and filters */}
        <div className="space-y-4">
          <form
            onSubmit={handleSearchSubmit}
            role="search"
            className="relative max-w-xl"
          >
            <label htmlFor="doc-search" className="sr-only">
              Search documents
            </label>
            <FaMagnifyingGlass
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400"
              aria-hidden="true"
            />
            <input
              id="doc-search"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by inverter model or keyword"
              className="min-h-12 w-full rounded-sm border border-gray-300 bg-white py-3 pl-11 pr-12 text-base text-gray-900 placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#0fa353] sm:text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  setSearchQuery("");
                }}
                aria-label="Clear search"
                className={`absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800 ${FOCUS}`}
              >
                <FaXmark aria-hidden="true" />
              </button>
            )}
          </form>

          <div
            role="group"
            aria-label="Filter documents by category"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={active}
                  className={`min-h-11 shrink-0 whitespace-nowrap rounded-sm border px-4 py-2 text-sm font-bold transition-colors ${FOCUS} ${
                    active
                      ? "border-[#0fa353] bg-[#0fa353] text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count + copy announcements for screen readers and sighted users */}
        <p
          role="status"
          aria-live="polite"
          className="mb-4 mt-6 text-sm text-gray-600"
        >
          {copiedId
            ? "Link copied"
            : copyFailed
              ? "Could not copy link"
              : !isLoading && !error
                ? `${filteredDocs.length} ${filteredDocs.length === 1 ? "document" : "documents"}${
                    hasFilters ? " found" : ""
                  }`
                : "\u00A0"}
        </p>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <DocSkeleton key={i} />
            ))}
          </div>
        ) : error && documents.length === 0 ? (
          <div
            role="alert"
            className="rounded-sm border border-gray-200 bg-gray-50 p-8 text-center sm:p-12"
          >
            <h2 className="text-lg font-bold">Documents could not be loaded</h2>
            <p className="mx-auto mt-1 max-w-md text-sm text-gray-600">
              Please check your connection and refresh the page.
            </p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="rounded-sm border border-gray-200 bg-gray-50 p-8 text-center sm:p-12">
            <h2 className="text-lg font-bold">No documents found</h2>
            <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-gray-600">
              {searchQuery
                ? `Nothing matched "${searchQuery}". Try another keyword or clear the filters.`
                : "Documents will appear here once they are uploaded."}
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className={`inline-flex min-h-12 items-center justify-center rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-bold hover:bg-gray-50 ${FOCUS}`}
                >
                  Clear filters
                </button>
              )}
              <Link
                href="/contact"
                className={`inline-flex min-h-12 items-center justify-center rounded-sm bg-[#0fa353] px-5 py-3 text-sm font-bold text-white hover:bg-[#0c8a45] ${FOCUS}`}
              >
                Request a specific datasheet
              </Link>
            </div>
          </div>
        ) : (
          <ul
            className={`grid grid-cols-1 gap-4 transition-opacity sm:gap-6 md:grid-cols-2 lg:grid-cols-3 ${
              isValidating ? "opacity-60" : ""
            }`}
          >
            {filteredDocs.map((doc, idx) => {
              const id = doc._id || doc.id || idx;
              const copied = copiedId === id;
              return (
                <li
                  key={id}
                  className="flex flex-col rounded-sm border border-gray-200 border-t-2 border-t-[#0fa353] bg-white p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-red-50 text-red-600">
                        <FaFilePdf size={20} aria-hidden="true" />
                      </span>
                      <span className="truncate text-sm font-semibold text-emerald-800">
                        {doc.category || "Document"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(doc.pdfUrl, id)}
                      aria-label={`Copy link to ${doc.title}`}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 ${FOCUS}`}
                    >
                      {copied ? (
                        <FaCheck
                          className="text-[#0fa353]"
                          aria-hidden="true"
                        />
                      ) : (
                        <FaCopy size={14} aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  <h2 className="mt-4 line-clamp-2 text-base font-bold leading-snug sm:text-lg">
                    {doc.title}
                  </h2>

                  {doc.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {doc.description}
                    </p>
                  )}

                  <p className="mt-4 text-xs font-medium text-gray-500">
                    PDF
                    {doc.fileSizeFormatted ? `, ${doc.fileSizeFormatted}` : ""}
                  </p>

                  <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
                    <a
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-[#0fa353] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c8a45] ${FOCUS}`}
                    >
                      <FaArrowUpRightFromSquare size={12} aria-hidden="true" />
                      View PDF
                      <span className="sr-only">: {doc.title}</span>
                    </a>
                    <a
                      href={doc.pdfUrl}
                      download={doc.fileName || "document.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm font-bold transition-colors hover:bg-gray-50 ${FOCUS}`}
                    >
                      <FaDownload size={12} aria-hidden="true" />
                      Download
                      <span className="sr-only">: {doc.title}</span>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
