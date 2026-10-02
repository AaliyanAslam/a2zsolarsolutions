"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaYoutube,
  FaPlus,
  FaTrash,
  FaLink,
  FaImage,
  FaUpload,
  FaClock,
  FaCircleExclamation,
  FaCircleCheck,
  FaXmark,
} from "react-icons/fa6";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalErrorMsg, setModalErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch videos from MongoDB on mount
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const res = await fetch("/api/videos");
      const data = await res.json();
      if (data.success) {
        setVideos(data.videos || []);
      } else {
        setErrorMsg(data.error || "Failed to load videos from server.");
      }
    } catch (err) {
      console.error("Failed to load videos:", err);
      setErrorMsg("Network error loading videos. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailChange = (e) => {
    setModalErrorMsg("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type?.startsWith("image/") || /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file.name);
    if (!isImage) {
      setModalErrorMsg(`Invalid file type "${file.name}". Please select an image file (PNG, JPG, WEBP, AVIF).`);
      e.target.value = "";
      return;
    }

    // Validate file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setModalErrorMsg(`Selected image is too large (${sizeMB} MB). Maximum allowed size is 10 MB.`);
      e.target.value = "";
      return;
    }

    if (file.size === 0) {
      setModalErrorMsg("The selected image file is empty (0 bytes). Please choose another photo.");
      e.target.value = "";
      return;
    }

    setThumbnailFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.onerror = () => {
      setModalErrorMsg("Failed to read the selected image file from your device.");
      setThumbnailFile(null);
      setThumbnailPreview("");
    };
    reader.readAsDataURL(file);
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    setModalErrorMsg("");
    setErrorMsg("");
    setSuccessMsg("");

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setModalErrorMsg("Video Title is required. Please enter a title.");
      return;
    }
    if (trimmedTitle.length < 3) {
      setModalErrorMsg("Video Title must be at least 3 characters long.");
      return;
    }

    const trimmedUrl = youtubeUrl.trim();
    if (!trimmedUrl) {
      setModalErrorMsg("YouTube Video URL is required.");
      return;
    }

    const isYoutube = trimmedUrl.includes("youtube.com") || trimmedUrl.includes("youtu.be");
    if (!isYoutube) {
      setModalErrorMsg("Invalid video link. Please enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...).");
      return;
    }

    if (!thumbnailFile) {
      setModalErrorMsg("Thumbnail image is required. Please choose an image file.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", trimmedTitle);
      formData.append("youtubeUrl", trimmedUrl);
      formData.append("thumbnail", thumbnailFile);

      const res = await fetch("/api/videos", {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        const text = await res.text();
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error(`Server returned unexpected response (HTTP ${res.status}: ${res.statusText || "Server Error"}). Please check your server connection.`);
      }

      if (!res.ok || !data.success) {
        // Display exact reason from server
        const reason = data.error || `Server error (${res.status}). Failed to save video.`;
        setModalErrorMsg(reason);
        return;
      }

      // Success
      if (data.video) {
        setVideos([data.video, ...videos]);
      } else {
        fetchVideos();
      }

      setTitle("");
      setYoutubeUrl("");
      setThumbnailFile(null);
      setThumbnailPreview("");
      setModalErrorMsg("");
      setShowAddModal(false);
      setSuccessMsg("YouTube video added successfully and published to live website!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Video upload error:", err);
      setModalErrorMsg(err.message || "Network error. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this video?")) {
      return;
    }

    try {
      const res = await fetch(`/api/videos?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setVideos(videos.filter((v) => v._id !== id));
      } else {
        alert(data.error || "Failed to delete video");
      }
    } catch (err) {
      alert("Failed to delete video: " + err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            YouTube Video Showcase
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your YouTube video showcases and project walkthroughs.
          </p>
        </div>

        <button
          onClick={() => {
            setErrorMsg("");
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 bg-[#0fa353] hover:bg-[#0d8e48] text-white font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs hover:shadow-sm text-xs whitespace-nowrap shrink-0"
        >
          <FaPlus size={12} />
          Add New Video
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FaCircleCheck className="text-[#0fa353]" />
            {successMsg}
          </span>
          <button onClick={() => setSuccessMsg("")} className="text-emerald-600 hover:text-emerald-900">
            <FaXmark />
          </button>
        </div>
      )}

      {/* Page Error Notification */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FaCircleExclamation className="text-red-600" />
            {errorMsg}
          </span>
          <button onClick={() => setErrorMsg("")} className="text-red-600 hover:text-red-900">
            <FaXmark />
          </button>
        </div>
      )}

      {/* Videos List */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <FaYoutube className="text-red-600 text-base" />
            <h2 className="text-sm font-bold text-gray-900">Showcase Library</h2>
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-white px-2.5 py-1 rounded-lg border border-gray-200/60">
            {videos.length} Videos
          </span>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-gray-400">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="py-16 text-center text-gray-500 px-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3 border border-red-100">
              <FaYoutube size={22} />
            </div>
            <h3 className="text-sm font-bold text-gray-900">No videos uploaded yet</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              Click &quot;Add New Video&quot; above to upload a thumbnail and link your YouTube video.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/40 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3.5">Video Details</th>
                  <th className="px-5 py-3.5">YouTube Link</th>
                  <th className="px-5 py-3.5">Added Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {videos.map((vid) => (
                  <tr key={vid._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          {vid.thumbnailUrl ? (
                            <Image
                              src={vid.thumbnailUrl}
                              alt={vid.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FaImage />
                            </div>
                          )}
                        </div>
                        <span className="font-semibold text-gray-900 line-clamp-1 max-w-xs sm:max-w-md">
                          {vid.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <a
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-medium hover:underline truncate max-w-xs"
                      >
                        <FaLink size={10} />
                        <span className="truncate">{vid.youtubeUrl}</span>
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                      {vid.createdAt ? new Date(vid.createdAt).toLocaleDateString() : "Recent"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(vid._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete video"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <FaYoutube className="text-red-600" />
                Add YouTube Video
              </h3>
              <button
                onClick={() => {
                  if (!isSubmitting) {
                    setShowAddModal(false);
                    setModalErrorMsg("");
                  }
                }}
                className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-lg hover:bg-gray-100"
              >
                <FaXmark size={16} />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="p-6 space-y-4">
              {/* Prominent Modal Error Alert Banner */}
              {modalErrorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2.5 shadow-xs animate-in fade-in duration-200">
                  <FaCircleExclamation className="text-red-600 shrink-0 text-base mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-red-900">Upload Issue</p>
                    <p className="mt-0.5 text-xs text-red-700 leading-relaxed font-normal">
                      {modalErrorMsg}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalErrorMsg("")}
                    className="text-red-400 hover:text-red-700 p-0.5 transition-colors"
                  >
                    <FaXmark size={14} />
                  </button>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (modalErrorMsg) setModalErrorMsg("");
                  }}
                  placeholder="e.g. 10kW Hybrid Solar System in Karachi"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>

              {/* YouTube URL */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    YouTube Video URL *
                  </label>
                  <span className="text-[10px] text-gray-400">youtube.com or youtu.be</span>
                </div>
                <input
                  type="url"
                  required
                  value={youtubeUrl}
                  onChange={(e) => {
                    setYoutubeUrl(e.target.value);
                    if (modalErrorMsg) setModalErrorMsg("");
                  }}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>

              {/* Thumbnail Image upload */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Thumbnail Image *
                  </label>
                  <span className="text-[10px] text-gray-400">Max 10 MB (PNG, JPG, WEBP)</span>
                </div>

                {thumbnailPreview ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 group mb-2 shadow-xs">
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded max-w-[70%] truncate">
                      {thumbnailFile ? thumbnailFile.name : "Custom thumbnail"}
                      {thumbnailFile && ` (${(thumbnailFile.size / (1024 * 1024)).toFixed(2)} MB)`}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailFile(null);
                        setThumbnailPreview("");
                      }}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors shadow-xs"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-xl cursor-pointer bg-gray-50 hover:bg-emerald-50/30 transition-colors">
                    <FaUpload className="text-gray-400 text-lg mb-1" />
                    <span className="text-xs font-semibold text-gray-700">Choose thumbnail image</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex gap-2.5 justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setModalErrorMsg("");
                  }}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0fa353] hover:bg-[#0d8e48] text-white transition-all shadow-xs disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading &amp; Saving...
                    </>
                  ) : (
                    "Save & Upload"
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
