"use client";

import { useState, useEffect } from "react";
import {
  FaFilePdf,
  FaUpload,
  FaTrash,
  FaPlus,
  FaRotate,
  FaMagnifyingGlass,
  FaArrowUpRightFromSquare,
  FaCopy,
  FaCheck,
  FaCircleCheck,
  FaXmark,
  FaFileArrowDown,
  FaFolderOpen,
  FaTag,
  FaCalendarDays,
  FaHardDrive,
} from "react-icons/fa6";

const CATEGORIES = [
  "All",
  "Brochure",
  "Datasheet",
  "Warranty",
  "Company Profile",
  "Guide",
  "Report",
  "Other",
];

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Brochure");
  const [pdfFile, setPdfFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Action states
  const [deletingId, setDeletingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, [selectedCategory]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim());
      }

      const res = await fetch(`/api/documents?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents || []);
      } else {
        setErrorMsg(data.error || "Failed to load documents.");
      }
    } catch (err) {
      console.error("Failed to load documents:", err);
      setErrorMsg("Network error loading documents.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDocuments();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        !file.name.toLowerCase().endsWith(".pdf") &&
        file.type !== "application/pdf"
      ) {
        setErrorMsg("Please select a valid PDF file (.pdf).");
        return;
      }
      setPdfFile(file);
      setErrorMsg("");
    }
  };

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim()) {
      setErrorMsg("Please provide a document title.");
      return;
    }

    if (!pdfFile) {
      setErrorMsg("Please select a PDF file to upload.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", category);
      formData.append("pdf", pdfFile);

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setDocuments([data.document, ...documents]);
        setTitle("");
        setDescription("");
        setCategory("Brochure");
        setPdfFile(null);
        setShowAddModal(false);
        setSuccessMsg("Document uploaded successfully!");
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        setErrorMsg(data.error || "Failed to upload document.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/documents?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setDocuments(documents.filter((doc) => (doc._id || doc.id) !== id));
        setSuccessMsg("Document deleted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        alert(data.error || "Failed to delete document.");
      }
    } catch (err) {
      alert("Error deleting document. Please check your network.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyLink = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
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

  // Client-side quick filter
  const filteredDocuments = documents.filter((doc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      doc.title?.toLowerCase().includes(q) ||
      doc.description?.toLowerCase().includes(q) ||
      doc.fileName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-10 px-3 sm:px-6 space-y-6 select-none">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0fa353] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
              Official Documents
            </span>
            <span className="text-xs text-gray-400">
              • Total: {documents.length} PDF Documents
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Documents &amp; PDFs Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Upload company brochures, warranties, system manuals, and inverter datasheets with custom text descriptions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchDocuments}
            className="p-2.5 rounded-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-2xs"
            title="Refresh list"
          >
            <FaRotate className={isLoading ? "animate-spin" : ""} size={13} />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-600/20 active:scale-95 transition-all"
          >
            <FaPlus size={12} />
            <span>Upload New PDF</span>
          </button>
        </div>
      </div>

      {/* ── Alerts ── */}
      {successMsg && (
        <div className="p-3.5 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <FaCircleCheck className="text-[#0fa353]" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg("")} className="text-red-500 hover:text-red-700">
            <FaXmark />
          </button>
        </div>
      )}

      {/* ── Toolbar: Search & Category Filters ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or filename..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
          />
          <FaMagnifyingGlass className="absolute left-3 top-2.5 text-gray-400 text-xs" />
        </form>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
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

      {/* ── Documents Cards Grid ── */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-3 border-[#0fa353] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-medium">Loading documents...</p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <FaFilePdf size={24} />
          </div>
          <h3 className="text-sm font-bold text-gray-900">No Documents Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {searchQuery
              ? "No documents matched your search query. Try another keyword."
              : "Upload company brochures, warranties, and inverter datasheets for website visitors."}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold transition-all mt-2"
          >
            <FaPlus size={10} />
            <span>Upload First PDF</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => {
            const id = doc._id || doc.id;
            return (
              <div
                key={id}
                className="bg-white border border-gray-200/90 hover:border-emerald-300 rounded-xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group relative"
              >
                <div>
                  {/* Top Bar: PDF Icon, Category & Actions */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 shadow-2xs">
                        <FaFilePdf size={20} />
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider inline-block ${getCategoryColor(
                            doc.category
                          )}`}
                        >
                          {doc.category || "Brochure"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyLink(doc.pdfUrl, id)}
                        title="Copy document link"
                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {copiedId === id ? (
                          <FaCheck className="text-[#0fa353]" size={12} />
                        ) : (
                          <FaCopy size={12} />
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(id)}
                        disabled={deletingId === id}
                        title="Delete document"
                        className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#0fa353] transition-colors leading-snug mb-1.5 line-clamp-2">
                    {doc.title}
                  </h3>

                  {/* Description / Text */}
                  {doc.description && (
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3">
                      {doc.description}
                    </p>
                  )}

                  {/* Metadata: File name, Size, Date */}
                  <div className="space-y-1 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate max-w-45 font-mono text-[10px]">
                        {doc.fileName || "document.pdf"}
                      </span>
                      <span className="text-gray-400 shrink-0 font-semibold">
                        {doc.fileSizeFormatted || formatFileSize(doc.fileSize)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
                      <FaCalendarDays size={10} />
                      <span>
                        {doc.createdAt
                          ? new Date(doc.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Recently uploaded"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action: View/Open PDF */}
                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] transition-colors"
                  >
                    <span>View / Download PDF</span>
                    <FaArrowUpRightFromSquare size={10} />
                  </a>

                  {copiedId === id && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Link Copied!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Upload New PDF Modal ── */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-gray-200 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100/80 text-[#0fa353] flex items-center justify-center">
                  <FaUpload size={14} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Upload Document
                  </h3>
                  <p className="text-xs text-gray-500">
                    Add PDF file along with title, text description, and category.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-sm text-gray-400 hover:text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FaXmark size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUploadDocument} className="p-4 sm:p-6 space-y-4">
              {/* Document Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Inverex Nitrox 6KW Hybrid Inverter Datasheet"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                >
                  <option value="Brochure">Brochure</option>
                  <option value="Datasheet">Datasheet</option>
                  <option value="Warranty">Warranty</option>
                  <option value="Company Profile">Company Profile</option>
                  <option value="Guide">Guide</option>
                  <option value="Report">Report</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Text Description / Content */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Description / Details (Text)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Complete technical specifications, pinout diagram, load calculations, and manufacturer warranty terms."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none resize-none"
                />
              </div>

              {/* PDF File Picker */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  PDF File <span className="text-red-500">*</span>
                </label>

                {pdfFile ? (
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <FaFilePdf size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">
                          {pdfFile.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {formatFileSize(pdfFile.size)} • Ready to upload
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPdfFile(null)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-white transition-colors"
                      title="Remove file"
                    >
                      <FaXmark size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 hover:border-[#0fa353] rounded-xl cursor-pointer bg-gray-50/50 hover:bg-emerald-50/20 transition-all">
                    <FaFilePdf className="text-red-500 text-3xl mb-2" />
                    <span className="text-xs font-bold text-gray-800">
                      Click to choose or drag &amp; drop PDF
                    </span>
                    <span className="text-[10px] text-gray-400 mt-1">
                      Standard PDF documents (.pdf) up to 25MB
                    </span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      required
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold shadow-md shadow-green-600/20 active:scale-95 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading document...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload size={12} />
                      <span>Upload Document</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
