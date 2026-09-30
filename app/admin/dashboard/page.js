"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminAuth } from "../components/AdminAuth";
import {
  FaMagnifyingGlass,
  FaPlus,
  FaChevronRight,
  FaYoutube,
  FaFilePdf,
  FaSolarPanel,
  FaStar,
  FaRotate,
  FaArrowUpRightFromSquare,
  FaLocationDot,
  FaDatabase,
  FaCloudArrowUp,
  FaCircle,
  FaCircleCheck,
  FaXmark,
  FaHardDrive,
} from "react-icons/fa6";

export default function AdminDashboardPage() {
  const { adminUser } = useAdminAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("projects");

  const displayName = adminUser?.name || "A2Z Solar Solutions";

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async (isManual = false) => {
    try {
      if (isManual) setIsRefreshing(true);
      else setIsLoading(true);
      setErrorMsg("");

      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      const json = await res.json();

      if (json.success) {
        setData(json);
      } else {
        setErrorMsg(json.error || "Failed to fetch live database stats.");
      }
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setErrorMsg("Network error fetching live stats from MongoDB Atlas.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const stats = data?.stats || {
    projects: 0,
    documents: 0,
    videos: 0,
    testimonials: 0,
  };

  const recent = data?.recent || {
    projects: [],
    documents: [],
    videos: [],
    testimonials: [],
  };

  const system = data?.system || {
    database: { connected: false, name: "Connecting...", host: "MongoDB Atlas" },
    storage: { provider: "Cloudinary", cloudName: "ufzwfnc0", configured: true },
  };

  // Live filter across recent items
  const q = searchQuery.toLowerCase().trim();
  const filteredProjects = recent.projects.filter(
    (p) => !q || p.capacity?.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q)
  );
  const filteredDocs = recent.documents.filter(
    (d) => !q || d.title?.toLowerCase().includes(q) || d.category?.toLowerCase().includes(q)
  );
  const filteredVideos = recent.videos.filter(
    (v) => !q || v.title?.toLowerCase().includes(q)
  );
  const filteredTestimonials = recent.testimonials.filter(
    (t) => !q || t.name?.toLowerCase().includes(q) || t.address?.toLowerCase().includes(q) || t.review?.toLowerCase().includes(q)
  );

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-10 px-3 sm:px-6 space-y-8 select-none">
      {/* ── 1. Top Greeting & Live Health Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {/* Live Database status pill */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0fa353]" />
              </span>
              <span>Atlas Live: {system.database?.name || "a2zsolarsolutions"}</span>
            </div>

            {/* Cloudinary pill */}
            <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <FaCloudArrowUp size={11} />
              <span>Cloudinary: {system.storage?.cloudName || "ufzwfnc0"}</span>
            </div>

            <span className="text-gray-400 text-xs hidden sm:inline">•</span>
            <span className="text-gray-400 text-[11px]">Real-Time Sync</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Hi, {displayName}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time management portal for A2Z Solar Solutions projects, media, and documents.
          </p>
        </div>

        {/* Top Actions: Refresh & Visit Website */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => fetchDashboardStats(true)}
            disabled={isRefreshing || isLoading}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs transition-all active:scale-95 disabled:opacity-60"
            title="Refresh database metrics"
          >
            <FaRotate className={isRefreshing ? "animate-spin text-[#0fa353]" : "text-gray-500"} size={12} />
            <span>{isRefreshing ? "Syncing..." : "Sync Live Data"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold shadow-md shadow-green-600/20 transition-all active:scale-95"
          >
            <span>Live Website</span>
            <FaArrowUpRightFromSquare size={10} />
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg("")} className="text-red-500 hover:text-red-700">
            <FaXmark />
          </button>
        </div>
      )}

      {/* ── 2. Search Across Live Portal Data ── */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-xs focus-within:border-[#0fa353] focus-within:ring-2 focus-within:ring-green-100 transition-all">
          <FaMagnifyingGlass className="text-gray-400 text-xs mr-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search live projects, PDF documents, YouTube videos, or customer reviews..."
            className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 outline-none pr-3"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-gray-400 hover:text-gray-600 p-1 text-xs"
            >
              <FaXmark />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-[11px] text-gray-500 mt-1.5 px-2">
            Filtering live items matching &quot;<span className="font-semibold text-gray-800">{searchQuery}</span>&quot; below.
          </p>
        )}
      </div>

      {/* ── 3. Real KPI Counters Row (4 Grid KPI Cards) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Projects */}
        <Link
          href="/admin/projects"
          className="bg-white border border-gray-200/90 hover:border-emerald-400 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Gallery
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0fa353] flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaSolarPanel size={14} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isLoading ? "..." : stats.projects}
            </div>
            <div className="text-xs font-bold text-gray-700 mt-1">Solar Projects</div>
            <p className="text-[10px] text-gray-400 mt-0.5">Live on Homepage</p>
          </div>
          <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-[#0fa353] group-hover:underline">
            <span>Manage Projects</span>
            <FaChevronRight size={9} />
          </div>
        </Link>

        {/* KPI 2: Documents / PDFs */}
        <Link
          href="/admin/documents"
          className="bg-white border border-gray-200/90 hover:border-amber-400 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Cloudinary
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaFilePdf size={14} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isLoading ? "..." : stats.documents}
            </div>
            <div className="text-xs font-bold text-gray-700 mt-1">PDF Documents</div>
            <p className="text-[10px] text-gray-400 mt-0.5">Manuals &amp; Brochures</p>
          </div>
          <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-amber-600 group-hover:underline">
            <span>Manage Documents</span>
            <FaChevronRight size={9} />
          </div>
        </Link>

        {/* KPI 3: YouTube Videos */}
        <Link
          href="/admin/videos"
          className="bg-white border border-gray-200/90 hover:border-red-400 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                YouTube
              </span>
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaYoutube size={15} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isLoading ? "..." : stats.videos}
            </div>
            <div className="text-xs font-bold text-gray-700 mt-1">Video Showcases</div>
            <p className="text-[10px] text-gray-400 mt-0.5">Rooftop Project Tours</p>
          </div>
          <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-red-600 group-hover:underline">
            <span>Manage Videos</span>
            <FaChevronRight size={9} />
          </div>
        </Link>

        {/* KPI 4: Customer Testimonials */}
        <Link
          href="/admin/testimonials"
          className="bg-white border border-gray-200/90 hover:border-yellow-400 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
                Reviews
              </span>
              <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaStar size={14} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isLoading ? "..." : stats.testimonials}
            </div>
            <div className="text-xs font-bold text-gray-700 mt-1">Client Reviews</div>
            <p className="text-[10px] text-gray-400 mt-0.5">Verified Customer Stars</p>
          </div>
          <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-yellow-700 group-hover:underline">
            <span>Manage Reviews</span>
            <FaChevronRight size={9} />
          </div>
        </Link>
      </div>

      {/* ── 4. Quick Action Hub ── */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Quick Actions Hub
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/projects"
            className="flex items-center gap-2.5 p-3.5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-gray-800 transition-all text-xs font-bold"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0fa353] flex items-center justify-center shrink-0">
              <FaPlus size={11} />
            </div>
            <span className="truncate">Add Project</span>
          </Link>

          <Link
            href="/admin/documents"
            className="flex items-center gap-2.5 p-3.5 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50/40 text-gray-800 transition-all text-xs font-bold"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <FaPlus size={11} />
            </div>
            <span className="truncate">Upload PDF</span>
          </Link>

          <Link
            href="/admin/videos"
            className="flex items-center gap-2.5 p-3.5 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50/40 text-gray-800 transition-all text-xs font-bold"
          >
            <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <FaPlus size={11} />
            </div>
            <span className="truncate">Add Video</span>
          </Link>

          <Link
            href="/admin/testimonials"
            className="flex items-center gap-2.5 p-3.5 rounded-xl border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/40 text-gray-800 transition-all text-xs font-bold"
          >
            <div className="w-7 h-7 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center shrink-0">
              <FaPlus size={11} />
            </div>
            <span className="truncate">Add Review</span>
          </Link>
        </div>
      </div>

      {/* ── 5. Live Activity & Database Explorer (Tabbed) ── */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Live Database Explorer
            </h2>
            <p className="text-xs text-gray-500">
              View real uploaded records currently published to the live website.
            </p>
          </div>

          {/* Explorer Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                activeTab === "projects"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              Projects ({stats.projects})
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                activeTab === "documents"
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              Documents ({stats.documents})
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                activeTab === "videos"
                  ? "bg-red-600 text-white shadow-2xs"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              Videos ({stats.videos})
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                activeTab === "testimonials"
                  ? "bg-yellow-600 text-white shadow-2xs"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              Reviews ({stats.testimonials})
            </button>
          </div>
        </div>

        {/* Tab 1: Live Projects */}
        {activeTab === "projects" && (
          <div>
            {filteredProjects.length === 0 ? (
              <div className="py-12 text-center text-gray-400 space-y-2">
                <FaSolarPanel size={28} className="mx-auto text-gray-300" />
                <p className="text-xs">No projects found.</p>
                <Link
                  href="/admin/projects"
                  className="inline-block text-xs font-bold text-[#0fa353] hover:underline"
                >
                  Upload your first solar project →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj._id}
                    className="relative aspect-3/4 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm bg-gray-900 group"
                  >
                    <Image
                      src={proj.imageUrl}
                      alt={proj.location}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    <div className="absolute top-2 left-0 z-10 bg-[#e02424] text-white text-[10px] font-black px-2 py-0.5 rounded-r">
                      {proj.capacity}
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 z-10 flex justify-center">
                      <span className="inline-flex items-center gap-1 bg-[#f59e0b] text-gray-950 font-bold text-[10px] px-2 py-0.5 rounded-full truncate max-w-full">
                        <FaLocationDot size={9} className="shrink-0" />
                        <span className="truncate">{proj.location}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-4 flex justify-end">
              <Link
                href="/admin/projects"
                className="text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] inline-flex items-center gap-1"
              >
                <span>Go to Projects Management</span>
                <FaChevronRight size={10} />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Live PDF Documents */}
        {activeTab === "documents" && (
          <div>
            {filteredDocs.length === 0 ? (
              <div className="py-12 text-center text-gray-400 space-y-2">
                <FaFilePdf size={28} className="mx-auto text-gray-300" />
                <p className="text-xs">No PDF documents found.</p>
                <Link
                  href="/admin/documents"
                  className="inline-block text-xs font-bold text-[#0fa353] hover:underline"
                >
                  Upload your first PDF document to Cloudinary →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc._id}
                    className="p-4 rounded-xl border border-gray-200/90 hover:border-amber-300 bg-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                          {doc.category || "Brochure"}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {doc.fileSizeFormatted || "PDF"}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 mb-1">
                        {doc.title}
                      </h4>
                      {doc.description && (
                        <p className="text-[11px] text-gray-500 line-clamp-2">
                          {doc.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-gray-400 truncate max-w-[160px]">
                        {doc.fileName}
                      </span>
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#0fa353] hover:underline text-[11px]"
                      >
                        <span>View PDF</span>
                        <FaArrowUpRightFromSquare size={9} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-4 flex justify-end">
              <Link
                href="/admin/documents"
                className="text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] inline-flex items-center gap-1"
              >
                <span>Go to Documents Management</span>
                <FaChevronRight size={10} />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 3: Live YouTube Videos */}
        {activeTab === "videos" && (
          <div>
            {filteredVideos.length === 0 ? (
              <div className="py-12 text-center text-gray-400 space-y-2">
                <FaYoutube size={28} className="mx-auto text-gray-300" />
                <p className="text-xs">No YouTube showcase videos found.</p>
                <Link
                  href="/admin/videos"
                  className="inline-block text-xs font-bold text-[#0fa353] hover:underline"
                >
                  Add your first YouTube showcase video →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVideos.map((vid) => (
                  <div
                    key={vid._id}
                    className="p-3 rounded-xl border border-gray-200/90 hover:border-red-300 bg-white shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      {vid.thumbnailUrl && (
                        <Image
                          src={vid.thumbnailUrl}
                          alt={vid.title}
                          fill
                          sizes="300px"
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <FaYoutube size={18} />
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                      {vid.title}
                    </h4>
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">
                        {vid.createdAt ? new Date(vid.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                      <a
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-red-600 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open Video</span>
                        <FaArrowUpRightFromSquare size={9} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-4 flex justify-end">
              <Link
                href="/admin/videos"
                className="text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] inline-flex items-center gap-1"
              >
                <span>Go to Videos Management</span>
                <FaChevronRight size={10} />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 4: Live Customer Testimonials */}
        {activeTab === "testimonials" && (
          <div>
            {filteredTestimonials.length === 0 ? (
              <div className="py-12 text-center text-gray-400 space-y-2">
                <FaStar size={28} className="mx-auto text-gray-300" />
                <p className="text-xs">No client reviews found.</p>
                <Link
                  href="/admin/testimonials"
                  className="inline-block text-xs font-bold text-[#0fa353] hover:underline"
                >
                  Upload your first client review →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTestimonials.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 rounded-xl border border-gray-200/90 hover:border-yellow-300 bg-white shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-gray-400">
                            {item.address}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400 mb-2">
                        {[...Array(item.starQty || 5)].map((_, i) => (
                          <FaStar key={i} size={11} />
                        ))}
                      </div>

                      <p className="text-xs text-gray-600 italic line-clamp-3">
                        &ldquo;{item.review}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gray-100 text-[10px] text-emerald-700 font-semibold flex items-center justify-between">
                      <span>Live on Homepage</span>
                      <span className="text-gray-400">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-4 flex justify-end">
              <Link
                href="/admin/testimonials"
                className="text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] inline-flex items-center gap-1"
              >
                <span>Go to Testimonials Management</span>
                <FaChevronRight size={10} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── 6. System & Infrastructure Health ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Database Health Card */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0fa353] border border-emerald-200 flex items-center justify-center shrink-0">
            <FaDatabase size={16} />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">
                MongoDB Atlas Cluster
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <FaCircle size={6} className="text-[#0fa353] animate-pulse" />
                <span>Connected</span>
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Primary cloud database storing all solar projects, customer testimonials, showcase videos, and PDF document metadata.
            </p>
            <div className="pt-2 text-[11px] font-mono text-gray-400">
              Database: <span className="text-gray-700 font-bold">{system.database?.name || "a2zsolarsolutions"}</span>
            </div>
          </div>
        </div>

        {/* Cloudinary Storage Health Card */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
            <FaHardDrive size={16} />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">
                Cloudinary Asset Storage
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                <FaCircleCheck size={10} className="text-sky-600" />
                <span>Configured</span>
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Cloud media repository hosting project installation photos, raw PDF brochures/manuals, and video thumbnails.
            </p>
            <div className="pt-2 text-[11px] font-mono text-gray-400">
              Cloud Name: <span className="text-gray-700 font-bold">{system.storage?.cloudName || "ufzwfnc0"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
