"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, SWR_CACHE_CONFIG } from "@/lib/fetcher";
import {
  FaFilePdf,
  FaArrowUpRightFromSquare,
  FaDownload,
  FaCopy,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa6";

const CATEGORY_ORDER = [
  "Datasheet",
  "Brochure",
  "Warranty",
  "Guide",
  "Company Profile",
];
const MAX_VISIBLE = 6;

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

export default function DocumentsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimeoutRef = useRef(null);

  const { data, isLoading } = useSWR(
    "/api/documents",
    fetcher,
    SWR_CACHE_CONFIG,
  );

  const documents =
    data?.success && Array.isArray(data.documents) ? data.documents : [];

  useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

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

  // Only offer filters for categories that actually have documents.
  const present = new Set(documents.map((d) => d.category).filter(Boolean));
  const categories = [
    "All",
    ...CATEGORY_ORDER.filter((c) => present.has(c)),
    ...[...present].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  const filteredDocs =
    selectedCategory === "All"
      ? documents
      : documents.filter((doc) => doc.category === selectedCategory);

  // Keep the homepage compact if there is nothing to show yet.
  if (!isLoading && documents.length === 0) return null;

  return (
    <section
      id="documents"
      aria-labelledby="documents-heading"
      className="scroll-mt-20 border-t border-gray-100 bg-[#fbfdfa] py-12 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              id="documents-heading"
              className="text-[1.75rem] font-black leading-tight tracking-tight text-[#1a1c29] sm:text-4xl md:text-5xl"
            >
              Datasheets, brochures and{" "}
              <span className="text-[#0fa353]">solar guides</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              Download inverter and panel datasheets, error code guides,
              warranty information and our company brochure.
            </p>
          </div>

          <Link
            href="/documents"
            className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-[#1a1c29] transition-colors hover:bg-gray-50 ${FOCUS}`}
          >
            Browse all downloads
            <FaArrowRight size={11} aria-hidden="true" />
          </Link>
        </div>

        {/* Category filters */}
        {categories.length > 2 && (
          <div
            role="group"
            aria-label="Filter documents by category"
            className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
          >
            {categories.map((cat) => {
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
        )}

        {/* Announces copy result to screen readers */}
        <p className="sr-only" role="status" aria-live="polite">
          {copiedId ? "Link copied" : copyFailed ? "Could not copy link" : ""}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <DocSkeleton key={i} />
            ))}
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="rounded-sm border border-gray-200 bg-white p-8 text-center sm:p-12">
            <h3 className="text-base font-bold text-[#1a1c29]">
              No {selectedCategory.toLowerCase()} documents yet
            </h3>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`mt-3 text-sm font-bold text-[#0fa353] underline underline-offset-4 ${FOCUS}`}
            >
              Show all documents
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocs.slice(0, MAX_VISIBLE).map((doc, idx) => {
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

                  <h3 className="mt-4 line-clamp-2 text-base font-bold leading-snug text-[#1a1c29] sm:text-lg">
                    {doc.title}
                  </h3>

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
                      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-[#1a1c29] transition-colors hover:bg-gray-50 ${FOCUS}`}
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

        {!isLoading && filteredDocs.length > MAX_VISIBLE && (
          <p className="mt-8 text-center text-sm text-gray-600">
            Showing {MAX_VISIBLE} of {filteredDocs.length}.{" "}
            <Link
              href="/documents"
              className={`font-bold text-[#0fa353] underline underline-offset-4 ${FOCUS}`}
            >
              See all downloads
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
