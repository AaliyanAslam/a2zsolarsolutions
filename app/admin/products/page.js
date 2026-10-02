"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaTrash,
  FaPen,
  FaImage,
  FaUpload,
  FaCircleCheck,
  FaXmark,
  FaRotate,
  FaChevronDown,
  FaBoxOpen,
  FaTag,
  FaStar,
  FaCircleXmark,
} from "react-icons/fa6";

const CATEGORIES = [
  "Inverters",
  "Tubular Batteries",
  "Lithium Batteries",
  "Energy Storage",
  "Solar Panels",
  "MPPT Charge Controllers",
  "EV Charging Solutions",
  "Electrical DB Accessories",
  "DB Accessories",
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Inverters");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [warranty, setWarranty] = useState("");
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [specifications, setSpecifications] = useState([{ label: "", value: "" }]);
  const [features, setFeatures] = useState([""]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const params = filterCategory !== "All" ? `?category=${encodeURIComponent(filterCategory)}` : "";
      const res = await fetch(`/api/products${params}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      } else {
        setErrorMsg(data.error || "Failed to load products.");
      }
    } catch {
      setErrorMsg("Network error loading products.");
    } finally {
      setIsLoading(false);
    }
  }, [filterCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetForm = () => {
    setTitle("");
    setCategory("Inverters");
    setShortDescription("");
    setDescription("");
    setPrice("");
    setDiscountPrice("");
    setBrand("");
    setModel("");
    setWarranty("");
    setInStock(true);
    setIsFeatured(false);
    setSpecifications([{ label: "", value: "" }]);
    setFeatures([""]);
    setImageFiles([]);
    setImagePreviews([]);
    setExistingImages([]);
    setDeletedImageIds([]);
    setEditingProduct(null);
    setErrorMsg("");
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = async (product) => {
    resetForm();
    // Fetch full product details with slug
    try {
      const res = await fetch(`/api/products?slug=${product.slug}`);
      const data = await res.json();
      if (data.success && data.product) {
        const p = data.product;
        setEditingProduct(p);
        setTitle(p.title || "");
        setCategory(p.category || "Inverters");
        setShortDescription(p.shortDescription || "");
        setDescription(p.description || "");
        setPrice(p.price ? String(p.price) : "");
        setDiscountPrice(p.discountPrice ? String(p.discountPrice) : "");
        setBrand(p.brand || "");
        setModel(p.model || "");
        setWarranty(p.warranty || "");
        setInStock(p.inStock !== false);
        setIsFeatured(p.isFeatured === true);
        setSpecifications(
          p.specifications?.length > 0
            ? p.specifications
            : [{ label: "", value: "" }]
        );
        setFeatures(p.features?.length > 0 ? p.features : [""]);
        setExistingImages(p.images || []);
        setShowModal(true);
      }
    } catch {
      setErrorMsg("Failed to load product details.");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (publicId) => {
    setDeletedImageIds((prev) => [...prev, publicId]);
    setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
  };

  // Specifications helpers
  const addSpec = () => setSpecifications((prev) => [...prev, { label: "", value: "" }]);
  const removeSpec = (idx) => setSpecifications((prev) => prev.filter((_, i) => i !== idx));
  const updateSpec = (idx, field, val) =>
    setSpecifications((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s))
    );

  // Features helpers
  const addFeature = () => setFeatures((prev) => [...prev, ""]);
  const removeFeature = (idx) => setFeatures((prev) => prev.filter((_, i) => i !== idx));
  const updateFeature = (idx, val) =>
    setFeatures((prev) => prev.map((f, i) => (i === idx ? val : f)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim()) {
      setErrorMsg("Product title is required.");
      return;
    }
    if (!editingProduct && imageFiles.length === 0) {
      setErrorMsg("Please upload at least one product image.");
      return;
    }
    if (editingProduct && existingImages.length === 0 && imageFiles.length === 0) {
      setErrorMsg("Product must have at least one image.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      if (editingProduct) formData.append("id", editingProduct._id);
      formData.append("title", title.trim());
      formData.append("category", category);
      formData.append("shortDescription", shortDescription.trim());
      formData.append("description", description.trim());
      formData.append("price", price || "0");
      formData.append("discountPrice", discountPrice || "0");
      formData.append("brand", brand.trim());
      formData.append("model", model.trim());
      formData.append("warranty", warranty.trim());
      formData.append("inStock", String(inStock));
      formData.append("isFeatured", String(isFeatured));

      const validSpecs = specifications.filter((s) => s.label.trim() && s.value.trim());
      formData.append("specifications", JSON.stringify(validSpecs));

      const validFeatures = features.filter((f) => f.trim());
      formData.append("features", JSON.stringify(validFeatures));

      if (deletedImageIds.length > 0) {
        formData.append("deletedImages", JSON.stringify(deletedImageIds));
      }

      imageFiles.forEach((file) => formData.append("images", file));

      const method = editingProduct ? "PUT" : "POST";
      const res = await fetch("/api/products", { method, body: formData });
      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        resetForm();
        setSuccessMsg(editingProduct ? "Product updated!" : "Product created!");
        fetchProducts();
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        setErrorMsg(data.error || "Failed to save product.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => (p._id || p.id) !== id));
        setSuccessMsg("Product deleted!");
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        alert(data.error || "Failed to delete product.");
      }
    } catch {
      alert("Error deleting product.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (p) => {
    if (!p || p === 0) return "";
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(p);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-10 px-3 sm:px-6 space-y-6 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0fa353] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
              Product Catalog
            </span>
            <span className="text-xs text-gray-400">• Total: {products.length}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Products Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Add, edit, and manage your solar products, inverters, batteries, and accessories.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none text-xs font-medium bg-white border border-gray-200 rounded-sm px-3 py-2 pr-8 focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <FaChevronDown className="absolute right-2.5 top-2.5 text-gray-400 text-[10px] pointer-events-none" />
          </div>

          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-2xs"
            title="Refresh"
          >
            <FaRotate className={isLoading ? "animate-spin" : ""} size={13} />
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-600/20 active:scale-95 transition-all"
          >
            <FaPlus size={12} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-3.5 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <FaCircleCheck className="text-[#0fa353]" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && !showModal && (
        <div className="p-3.5 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-3 border-[#0fa353] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-medium">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-sm p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-sm bg-emerald-50 text-[#0fa353] flex items-center justify-center mx-auto border border-emerald-200">
            <FaBoxOpen size={24} />
          </div>
          <h3 className="text-base font-bold text-gray-900">No Products Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Click &quot;Add Product&quot; to create your first product listing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
          {products.map((prod) => {
            const id = prod._id || prod.id;
            const mainImage = prod.images?.[0]?.url;
            return (
              <div
                key={id}
                className="group bg-white border border-gray-200/90 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {mainImage ? (
                      <Image
                        src={mainImage}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <FaImage size={32} />
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-col gap-1 z-10 max-w-[65%] sm:max-w-none">
                      <span className="text-[9px] sm:text-[10px] font-bold bg-[#0fa353] text-white px-1.5 sm:px-2 py-0.5 rounded-sm truncate shadow-xs">
                        {prod.category}
                      </span>
                      {prod.isFeatured && (
                        <span className="text-[8px] sm:text-[10px] font-bold bg-amber-500 text-white px-1.5 sm:px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-xs">
                          <FaStar size={7} /> Featured
                        </span>
                      )}
                      {!prod.inStock && (
                        <span className="text-[8px] sm:text-[10px] font-bold bg-red-500 text-white px-1.5 sm:px-2 py-0.5 rounded-sm shadow-xs">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Top-Right Quick Action Icons (Always visible on mobile & desktop) */}
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex flex-col gap-1 sm:gap-1.5 z-10">
                      <button
                        type="button"
                        onClick={() => openEditModal(prod)}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
                        title="Edit product"
                      >
                        <FaPen size={9} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(id)}
                        disabled={deletingId === id}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md active:scale-90 transition-all disabled:opacity-50 cursor-pointer"
                        title="Delete product"
                      >
                        <FaTrash size={9} />
                      </button>
                    </div>

                    {/* Image count badge */}
                    {prod.images?.length > 1 && (
                      <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-black/75 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                        <FaImage size={8} /> {prod.images.length}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 space-y-1">
                    {prod.brand && (
                      <p className="text-[9px] sm:text-[10px] font-bold text-[#0fa353] uppercase tracking-wider truncate">
                        {prod.brand}
                      </p>
                    )}
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
                      {prod.title}
                    </h3>
                    {prod.shortDescription && (
                      <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1 sm:line-clamp-2">
                        {prod.shortDescription}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                      {prod.discountPrice > 0 && (
                        <span className="text-xs sm:text-sm font-black text-[#0fa353]">
                          {formatPrice(prod.discountPrice)}
                        </span>
                      )}
                      {prod.price > 0 && (
                        <span
                          className={`font-bold ${
                            prod.discountPrice > 0
                              ? "text-gray-400 line-through text-[10px] sm:text-xs"
                              : "text-xs sm:text-sm text-gray-900 font-black"
                          }`}
                        >
                          {formatPrice(prod.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer (Easy tap buttons) */}
                <div className="p-2 sm:p-2.5 pt-0">
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => openEditModal(prod)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-sm text-[10px] sm:text-xs font-bold transition-all active:scale-95 border border-blue-200 hover:border-blue-600 cursor-pointer"
                    >
                      <FaPen size={9} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      disabled={deletingId === id}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white rounded-sm text-[10px] sm:text-xs font-bold transition-all active:scale-95 border border-red-200 hover:border-red-600 disabled:opacity-50 cursor-pointer"
                    >
                      <FaTrash size={9} />
                      <span>{deletingId === id ? "..." : "Delete"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Add/Edit Product Modal ── */}
      {showModal && (
        <div
          onClick={() => { setShowModal(false); resetForm(); }}
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl relative border border-gray-200 my-4"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <p className="text-xs text-gray-500">
                  Fill in all product details and upload images.
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setShowModal(false); resetForm(); }}
                className="w-7 h-7 rounded-sm text-gray-400 hover:text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FaXmark size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {errorMsg && (
                <div className="p-3 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Inverex Nitrox 6kW Hybrid Inverter"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Brand, Model, Warranty */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Inverex, Longi"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Model</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Nitrox 6kW"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Warranty</label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="e.g. 5 Years"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Short Description
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief product summary (shown on product cards)"
                  className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed product description (shown on product detail page)"
                  className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none resize-none"
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                </div>
                <div className="flex items-end gap-2 pb-0.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="w-4 h-4 accent-[#0fa353]"
                    />
                    <span className="text-xs font-bold text-gray-700">In Stock</span>
                  </label>
                </div>
                <div className="flex items-end gap-2 pb-0.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span className="text-xs font-bold text-gray-700">Featured</span>
                  </label>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Specifications
                  </label>
                  <button type="button" onClick={addSpec} className="text-xs font-bold text-[#0fa353] hover:underline">
                    + Add Row
                  </button>
                </div>
                <div className="space-y-2">
                  {specifications.map((spec, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => updateSpec(i, "label", e.target.value)}
                        placeholder="e.g. Capacity"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-sm px-3 py-1.5 text-xs text-gray-900 focus:border-[#0fa353] outline-none"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateSpec(i, "value", e.target.value)}
                        placeholder="e.g. 6kW"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-sm px-3 py-1.5 text-xs text-gray-900 focus:border-[#0fa353] outline-none"
                      />
                      {specifications.length > 1 && (
                        <button type="button" onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600">
                          <FaCircleXmark size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Key Features
                  </label>
                  <button type="button" onClick={addFeature} className="text-xs font-bold text-[#0fa353] hover:underline">
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {features.map((feat, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => updateFeature(i, e.target.value)}
                        placeholder="e.g. Pure Sine Wave Output"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-sm px-3 py-1.5 text-xs text-gray-900 focus:border-[#0fa353] outline-none"
                      />
                      {features.length > 1 && (
                        <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600">
                          <FaCircleXmark size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Product Images <span className="text-red-500">*</span>
                </label>

                {/* Existing images */}
                {existingImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {existingImages.map((img) => (
                      <div key={img.publicId} className="relative w-20 h-20 rounded-sm overflow-hidden border border-gray-200">
                        <Image src={img.url} alt="Product" fill className="object-cover" sizes="80px" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(img.publicId)}
                          className="absolute top-0.5 right-0.5 bg-red-600 text-white p-0.5 rounded-sm"
                        >
                          <FaXmark size={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New image previews */}
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-sm overflow-hidden border-2 border-emerald-300">
                        <Image src={src} alt="Preview" fill unoptimized className="object-cover" sizes="80px" />
                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          className="absolute top-0.5 right-0.5 bg-red-600 text-white p-0.5 rounded-sm"
                        >
                          <FaXmark size={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 hover:border-[#0fa353] rounded-sm cursor-pointer bg-gray-50/50 hover:bg-emerald-50/20 transition-all">
                  <FaUpload className="text-[#0fa353] text-xl mb-1.5" />
                  <span className="text-xs font-bold text-gray-700">Click to select images</span>
                  <span className="text-[10px] text-gray-400">PNG, JPG, WEBP • Multiple selection allowed</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
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
                      <span>{editingProduct ? "Updating..." : "Creating..."}</span>
                    </>
                  ) : (
                    <>
                      <FaUpload size={12} />
                      <span>{editingProduct ? "Update Product" : "Create Product"}</span>
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
