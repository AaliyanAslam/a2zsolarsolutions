"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaTrash,
  FaImage,
  FaUpload,
  FaStar,
  FaLocationDot,
  FaUser,
  FaXmark,
  FaRotate,
  FaQuoteLeft,
} from "react-icons/fa6";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [starQty, setStarQty] = useState(5);
  const [review, setReview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials || []);
      } else {
        setErrorMsg(data.error || "Failed to load testimonials.");
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
      setErrorMsg("Network error loading testimonials.");
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

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Customer name is required.");
      return;
    }
    if (!address.trim()) {
      setErrorMsg("Address / Location is required.");
      return;
    }
    if (!review.trim()) {
      setErrorMsg("Review / Feedback text is required.");
      return;
    }
    if (!imageFile) {
      setErrorMsg("Please select a customer photo or avatar to upload.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("address", address.trim());
      formData.append("starQty", starQty.toString());
      formData.append("review", review.trim());
      formData.append("image", imageFile);

      const res = await fetch("/api/testimonials", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setTestimonials([data.testimonial, ...testimonials]);
        setName("");
        setAddress("");
        setStarQty(5);
        setReview("");
        setImageFile(null);
        setImagePreview("");
        setShowAddModal(false);
        setSuccessMsg("Testimonial uploaded successfully!");
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        setErrorMsg(data.error || "Failed to upload testimonial.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials(testimonials.filter((t) => t._id !== id));
        setSuccessMsg("Testimonial deleted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        alert(data.error || "Failed to delete testimonial.");
      }
    } catch (err) {
      alert("Error deleting testimonial: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span>Customer Testimonials</span>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              {testimonials.length} Total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Upload and manage client reviews, star ratings, and feedback
            displayed on the website.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchTestimonials}
            disabled={isLoading}
            className="p-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <FaRotate className={isLoading ? "animate-spin text-sm" : "text-sm"} />
          </button>
          <button
            onClick={() => {
              setErrorMsg("");
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all active:scale-95"
          >
            <FaPlus size={12} />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg("")} className="text-emerald-600 hover:text-emerald-900">
            <FaXmark />
          </button>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg("")} className="text-red-600 hover:text-red-900">
            <FaXmark />
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded w-1/3" />
              <div className="space-y-1.5">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white border border-gray-200/90 rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0fa353] flex items-center justify-center mx-auto border border-emerald-100">
            <FaQuoteLeft size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              No Testimonials Uploaded Yet
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mt-1">
              Add your first customer review with their name, address, photo, and
              star rating to showcase on the website.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-[#0fa353] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#0c8a45] transition-colors"
          >
            <FaPlus size={12} />
            <span>Upload First Testimonial</span>
          </button>
        </div>
      ) : (
        /* Testimonials Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-tight">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <FaLocationDot className="text-[#0fa353] text-[10px]" />
                        <span>{item.address}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Testimonial"
                  >
                    <FaTrash size={13} />
                  </button>
                </div>

                {/* Star rating display */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.starQty || 5)].map((_, i) => (
                    <FaStar key={i} className="text-xs sm:text-sm" />
                  ))}
                  <span className="text-[11px] font-bold text-gray-400 ml-1">
                    ({item.starQty || 5}/5)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic line-clamp-4">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "Recently"}
                </span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Live on Site
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Add New Client Testimonial
                </h3>
                <p className="text-xs text-gray-500">
                  Enter customer details, star rating, address, and upload photo.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaXmark size={18} />
              </button>
            </div>

            <form
              onSubmit={handleAddTestimonial}
              className="p-5 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm"
            >
              {/* Customer Name */}
              <div className="space-y-1">
                <label className="font-bold text-gray-700 flex items-center gap-1.5">
                  <FaUser className="text-[#0fa353]" />
                  <span>Customer Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood / Engr. Salman Farooq"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] transition-colors"
                />
              </div>

              {/* Address / Location */}
              <div className="space-y-1">
                <label className="font-bold text-gray-700 flex items-center gap-1.5">
                  <FaLocationDot className="text-[#0fa353]" />
                  <span>Address / Location *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DHA Phase 6, Karachi / Bahria Town, Lahore"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] transition-colors"
                />
              </div>

              {/* Star Quantity (Rating) */}
              <div className="space-y-1">
                <label className="font-bold text-gray-700 flex items-center gap-1.5">
                  <FaStar className="text-amber-400" />
                  <span>Star Quantity (Rating) *</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setStarQty(star)}
                      className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 ${
                        starQty >= star
                          ? "bg-amber-50 border-amber-300 text-amber-500 font-bold"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      <FaStar className="text-base" />
                      <span className="text-xs">{star}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo / Avatar Upload */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 flex items-center gap-1.5">
                  <FaImage className="text-[#0fa353]" />
                  <span>Customer Photo / Avatar *</span>
                </label>

                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0 shadow-sm">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 shrink-0">
                      <FaUser size={24} />
                    </div>
                  )}

                  <label className="flex-1 cursor-pointer">
                    <div className="px-4 py-3 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2.5 text-gray-600">
                      <FaUpload className="text-[#0fa353]" />
                      <span className="text-xs font-semibold">
                        {imageFile ? imageFile.name : "Choose photo from device"}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Review / Feedback Text */}
              <div className="space-y-1">
                <label className="font-bold text-gray-700 flex items-center gap-1.5">
                  <FaQuoteLeft className="text-[#0fa353]" />
                  <span>Review / Feedback Message *</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share what the customer said about their hybrid solar system, installation quality, battery backup, or savings..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] transition-colors resize-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#0fa353] hover:bg-[#0c8a45] text-white font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Uploading..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
