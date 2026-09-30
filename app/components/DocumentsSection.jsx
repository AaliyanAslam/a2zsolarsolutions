"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, SWR_CACHE_CONFIG } from "@/lib/fetcher";
import {
  FaFilePdf,
  FaArrowUpRightFromSquare,
  FaDownload,
  FaFileLines,
  FaCalendarDays,
  FaHardDrive,
  FaCopy,
  FaCheck,
  FaArrowRight,
  FaTag,
} from "react-icons/fa6";

const CATEGORIES = ["All", "Datasheet", "Brochure", "Warranty", "Guide", "Company Profile"];

export default function DocumentsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  // SWR basic cache for documents
  const { data, error, isLoading } = useSWR(
    "/api/documents",
    fetcher,
    SWR_CACHE_CONFIG
  );

  const documents =
    data?.success && Array.isArray(data.documents) ? data.documents : [];

  const handleCopy = (url, id) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const filteredDocs =
    selectedCategory === "All"
      ? documents
      : documents.filter((doc) => doc.category === selectedCategory);

  // If loading is done and there are 0 documents in database, we can show a nice placeholder state or return null.
  // Showing a clean section with fallback allows visitors to see the feature.
  if (!isLoading && documents.length === 0) {
    return null; // Keep homepage compact if no documents exist yet
  }

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Datasheet":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Brochure":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Warranty":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Company Profile":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section id="documents" className="py-16 sm:py-24 bg-[#fbfdfb] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <FaFilePdf className="text-red-500" />
              <span>Official Resources &amp; Downloads</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1a1c29] tracking-tight leading-tight">
              Inverter Datasheets, Brochures &amp; <span className="text-[#0fa353]">Solar Guides</span>
            </h2>
            <p className="text-xs sm:text-base text-gray-600 mt-2 font-normal leading-relaxed">
              Download technical specifications, inverter error code guides, Tier-1 module datasheets, and official company brochures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/documents"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200/90 text-xs sm:text-sm font-bold text-gray-800 hover:text-[#0fa353] hover:border-[#0fa353] transition-all shadow-xs"
            >
              <span>Browse All Downloads</span>
              <FaArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#0fa353] text-white shadow-2xs"
                  : "bg-white hover:bg-gray-100 text-gray-600 border border-gray-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Documents Cards Grid ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse space-y-4 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-1/3 bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-8 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocs.slice(0, 6).map((doc) => {
              const id = doc._id || doc.id;
              return (
                <div
                  key={id}
                  className="bg-white border border-gray-200/90 hover:border-emerald-300 rounded-xl p-5 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    {/* Top Row: Icon + Category + Copy Link */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          <FaFilePdf size={20} />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getCategoryColor(
                            doc.category
                          )}`}
                        >
                          {doc.category || "Brochure"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(doc.pdfUrl, id)}
                        title="Copy direct PDF URL"
                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {copiedId === id ? (
                          <FaCheck className="text-[#0fa353]" size={12} />
                        ) : (
                          <FaCopy size={12} />
                        )}
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-[#1a1c29] group-hover:text-[#0fa353] transition-colors line-clamp-2 leading-snug mb-1.5">
                      {doc.title}
                    </h3>

                    {/* Description Text */}
                    {doc.description && (
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3">
                        {doc.description}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100">
                      <span className="truncate max-w-[170px] font-mono text-[10px]">
                        {doc.fileName || "document.pdf"}
                      </span>
                      <span className="font-semibold text-gray-600 shrink-0">
                        {doc.fileSizeFormatted || "PDF"}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <a
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <FaArrowUpRightFromSquare size={11} />
                      <span>Open / View PDF</span>
                    </a>

                    <a
                      href={doc.pdfUrl}
                      download={doc.fileName || "document.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs font-semibold transition-colors"
                      title="Download PDF"
                    >
                      <FaDownload size={11} />
                      <span className="hidden sm:inline">Download</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
