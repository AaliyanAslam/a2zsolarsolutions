"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaTrash,
  FaImage,
  FaUpload,
  FaLocationDot,
  FaBolt,
  FaCircleCheck,
  FaXmark,
  FaArrowUpRightFromSquare,
  FaRotate,
} from "react-icons/fa6";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
      } else {
        setErrorMsg(data.error || "Failed to load projects.");
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
      setErrorMsg("Network error loading projects.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!capacity.trim() || !location.trim()) {
      setErrorMsg("Please provide both KW Capacity and Location Name.");
      return;
    }

    if (!imageFile) {
      setErrorMsg("Please select an installation photo to upload.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("capacity", capacity.trim());
      formData.append("location", location.trim());
      formData.append("image", imageFile);

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setProjects([data.project, ...projects]);
        setCapacity("");
        setLocation("");
        setImageFile(null);
        setImagePreview("");
        setShowAddModal(false);
        setSuccessMsg("Project uploaded successfully!");
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        setErrorMsg(data.error || "Failed to upload project.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.filter((p) => (p._id || p.id) !== id));
      } else {
        alert(data.error || "Failed to delete project.");
      }
    } catch (err) {
      alert("Error deleting project. Please check your network.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-10 px-3 sm:px-6 space-y-6 select-none">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0fa353] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
              Backend Upload
            </span>
            <span className="text-xs text-gray-400">• Total: {projects.length} Projects</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Recent Projects Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Upload and manage your real solar installations (Capacity KW, Location Name &amp; Photo).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProjects}
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
            <span>Upload New Project</span>
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
        <div className="p-3.5 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* ── Projects Grid ── */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-3 border-[#0fa353] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-medium">Loading solar projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-sm p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-sm bg-emerald-50 text-[#0fa353] flex items-center justify-center mx-auto border border-emerald-200">
            <FaImage size={24} />
          </div>
          <h3 className="text-base font-bold text-gray-900">No Projects Uploaded Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Click "Upload New Project" to add your first solar installation with KW capacity and location.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {projects.map((proj, idx) => {
            const id = proj._id || proj.id || idx;
            return (
              <div
                key={id}
                className="group relative aspect-3/4 sm:aspect-4/5 bg-gray-900 rounded-sm overflow-hidden border-2 border-[#0fa353] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Photo */}
                <Image
                  src={proj.imageUrl || proj.image}
                  alt={`${proj.capacity} - ${proj.location}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

                {/* Top-Left Red Ribbon Badge (Capacity KW) */}
                <div className="absolute top-2 left-0 z-10">
                  <div className="bg-[#e02424] text-white text-[11px] sm:text-xs font-black px-2.5 py-0.5 shadow-md uppercase tracking-wider rounded-r-sm">
                    {proj.capacity}
                  </div>
                </div>

                {/* Top-Right Delete Action */}
                <button
                  type="button"
                  onClick={() => handleDelete(id)}
                  disabled={deletingId === id}
                  className="absolute top-2 right-2 z-10 w-7 h-7 rounded-sm bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-all active:scale-95 disabled:opacity-50"
                  title="Delete project"
                >
                  <FaTrash size={11} />
                </button>

                {/* Bottom Location Pill */}
                <div className="absolute bottom-2.5 left-0 right-0 px-2 z-10 flex justify-center">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f59e0b] text-gray-950 font-bold text-[10px] sm:text-[11px] shadow-md border border-white/40 max-w-full">
                    <FaLocationDot className="text-gray-900 shrink-0 text-[10px]" />
                    <span className="truncate">{proj.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Add Project Modal ── */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-sm max-w-md w-full overflow-hidden shadow-2xl relative border border-gray-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-900">Upload New Project</h3>
                <p className="text-xs text-gray-500">Only 3 fields: KW Capacity, Location &amp; Image.</p>
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
            <form onSubmit={handleAddProject} className="p-4 sm:p-5 space-y-4">
              {/* Capacity KW */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  KW Capacity <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g. 6KW, 10KW, 4.5KW, 8KW"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    <FaBolt size={12} />
                  </div>
                </div>
              </div>

              {/* Location Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Location Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Gulistan E Joher, Burhani Malir City"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    <FaLocationDot size={12} />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Installation Photo <span className="text-red-500">*</span>
                </label>

                {imagePreview ? (
                  <div className="relative aspect-4/3 rounded-sm overflow-hidden border border-emerald-300 bg-gray-900 mb-2">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-sm shadow-md hover:bg-red-700 text-xs"
                      title="Remove image"
                    >
                      <FaXmark />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      Ready to upload
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 hover:border-[#0fa353] rounded-sm cursor-pointer bg-gray-50/50 hover:bg-emerald-50/20 transition-all">
                    <FaUpload className="text-[#0fa353] text-2xl mb-2" />
                    <span className="text-xs font-bold text-gray-700">Click to select photo</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP formats supported</span>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleImageChange}
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
                  className="px-4 py-2 rounded-sm text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold shadow-md shadow-green-600/20 active:scale-95 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading project...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload size={12} />
                      <span>Upload Project</span>
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
