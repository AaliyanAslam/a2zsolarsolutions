"use client";

import { useState } from "react";
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
  FaRotate,
  FaCalendarDays,
  FaHardDrive,
  FaArrowLeft,
  FaTag,
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

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const queryParams = new URLSearchParams();
  if (selectedCategory && selectedCategory !== "All") {
    queryParams.append("category", selectedCategory);
  }
  if (searchQuery.trim()) {
    queryParams.append("search", searchQuery.trim());
  }
  const queryStr = queryParams.toString();
  const swrKey = `/api/documents${queryStr ? `?${queryStr}` : ""}`;

  // SWR basic cache for documents
  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    fetcher,
    SWR_CACHE_CONFIG
  );

  const documents =
    data?.success && Array.isArray(data.documents) ? data.documents : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const handleCopy = (url, id) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

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
      case "Guide":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredDocs = documents.filter((doc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      doc.title?.toLowerCase().includes(q) ||
      doc.description?.toLowerCase().includes(q) ||
      doc.fileName?.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-[#1a1c29] pt-24 sm:pt-32 pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200/80 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4"
          >
            <Link href="/" className="hover:text-[#0fa353] transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#0fa353]">Downloads &amp; Documents</span>
          </nav>

          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <FaFilePdf className="text-red-500" />
            <span>Technical Resources &amp; Downloads</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#1a1c29] tracking-tight leading-tight mb-3">
            Solar Documents, <span className="text-[#0fa353]">Brochures &amp; Datasheets</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            Access and download verified technical datasheets for hybrid/on-grid inverters (Inverex, Solis, Deye), Tier-1 solar panel specifications, official company brochures, and K-Electric / LESCO net-metering guidelines.
          </p>
        </div>
      </section>

      {/* ── Content & Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-8">
        {/* Search & Category Filter Toolbar */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by inverter model, brochure, or keywords..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
            />
            <FaMagnifyingGlass className="absolute left-3.5 top-3.5 text-gray-400 text-xs sm:text-sm" />
          </form>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0fa353] text-white shadow-2xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Document Cards Grid ── */}
        {isLoading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-9 h-9 border-3 border-[#0fa353] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-semibold">Loading documents from database...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 shadow-2xs">
              <FaFilePdf size={28} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              No Documents Found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              {searchQuery
                ? `No documents matched "${searchQuery}". Please try another keyword or select "All".`
                : "Documents and brochures will appear here once uploaded by the admin."}
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0fa353] text-white text-xs font-bold hover:bg-[#0c8a45] transition-all shadow-xs"
              >
                <span>Request Specific Datasheet</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => {
              const id = doc._id || doc.id;
              return (
                <div
                  key={id}
                  className="bg-white border border-gray-200/90 hover:border-emerald-300 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    {/* Header: Red PDF Icon + Category Tag + Copy Link */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 border border-red-200/90 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          <FaFilePdf size={22} />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${getCategoryColor(
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
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {copiedId === id ? (
                          <FaCheck className="text-[#0fa353]" size={13} />
                        ) : (
                          <FaCopy size={13} />
                        )}
                      </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-base sm:text-lg font-bold text-[#1a1c29] group-hover:text-[#0fa353] transition-colors line-clamp-2 leading-snug mb-2">
                      {doc.title}
                    </h2>

                    {/* Text Description */}
                    {doc.description && (
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                        {doc.description}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100 font-medium">
                      <span className="truncate max-w-[180px] font-mono text-[10px]">
                        {doc.fileName || "document.pdf"}
                      </span>
                      <span className="font-semibold text-gray-600 shrink-0">
                        {doc.fileSizeFormatted || "PDF Document"}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <a
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <FaArrowUpRightFromSquare size={11} />
                      <span>View PDF</span>
                    </a>

                    <a
                      href={doc.pdfUrl}
                      download={doc.fileName || "document.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-700 hover:text-gray-950 hover:bg-gray-100 text-xs font-semibold transition-colors border border-gray-200/70"
                    >
                      <FaDownload size={11} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
