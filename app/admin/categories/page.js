"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FaPlus,
  FaPen,
  FaTrash,
  FaRotate,
  FaXmark,
  FaCircleCheck,
  FaLayerGroup,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const res = await fetch("/api/categories?all=true&includeCounts=true", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      } else {
        setErrorMsg(data.error || "Failed to load categories.");
      }
    } catch {
      setErrorMsg("Network error loading categories.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/categories?all=true&includeCounts=true", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.success) {
          setCategories(data.categories || []);
        } else {
          setErrorMsg(data.error || "Failed to load categories.");
        }
      })
      .catch(() => {
        if (!cancelled) setErrorMsg("Network error loading categories.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setOrder("");
    setIsActive(true);
    setEditingCategory(null);
    setErrorMsg("");
  };

  const openCreateModal = () => {
    resetForm();
    const nextOrder =
      categories.length > 0
        ? Math.max(...categories.map((c) => Number(c.order) || 0)) + 1
        : 0;
    setOrder(String(nextOrder));
    setShowModal(true);
  };

  const openEditModal = (cat) => {
    resetForm();
    setEditingCategory(cat);
    setName(cat.name || "");
    setDescription(cat.description || "");
    setOrder(cat.order !== undefined ? String(cat.order) : "0");
    setIsActive(cat.isActive !== false);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Category name is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        order: order === "" ? undefined : Number(order),
        isActive,
      };
      if (editingCategory) {
        payload.id = editingCategory._id;
      }

      const res = await fetch("/api/categories", {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        resetForm();
        setSuccessMsg(
          data.message ||
            (editingCategory ? "Category updated!" : "Category created!")
        );
        await fetchCategories();
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setErrorMsg(data.error || "Failed to save category.");
      }
    } catch {
      setErrorMsg("Network error saving category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (cat) => {
    setErrorMsg("");
    try {
      const res = await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: cat._id,
          isActive: cat.isActive === false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchCategories();
      } else {
        setErrorMsg(data.error || "Failed to update visibility.");
      }
    } catch {
      setErrorMsg("Network error updating category.");
    }
  };

  const handleDelete = async (cat) => {
    if (cat.productCount > 0) {
      setErrorMsg(
        `Cannot delete "${cat.name}" while ${cat.productCount} product(s) use it. Move or edit those products first.`
      );
      return;
    }
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;

    setDeletingId(cat._id);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/categories?id=${cat._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => prev.filter((c) => c._id !== cat._id));
        setSuccessMsg(`Category "${cat.name}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        setErrorMsg(data.error || "Failed to delete category.");
      }
    } catch {
      setErrorMsg("Network error deleting category.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-10 px-3 sm:px-6 space-y-6 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0fa353] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
              Catalog Structure
            </span>
            <span className="text-xs text-gray-400">
              • Total: {categories.length}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Product Categories
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Create, rename, reorder, and organize product categories synced across Admin &amp; Storefront.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
          >
            <span>Products</span>
            <FaArrowRight size={10} />
          </Link>

          <button
            type="button"
            onClick={fetchCategories}
            className="p-2.5 rounded-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-2xs cursor-pointer"
            title="Refresh"
          >
            <FaRotate className={isLoading ? "animate-spin" : ""} size={13} />
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <FaPlus size={12} />
            <span>Add Category</span>
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

      {/* Categories Table / Mobile Cards */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-3 border-[#0fa353] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-medium">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-sm p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-sm bg-emerald-50 text-[#0fa353] flex items-center justify-center mx-auto border border-emerald-200">
            <FaLayerGroup size={22} />
          </div>
          <h3 className="text-base font-bold text-gray-900">No Categories Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Click &quot;Add Category&quot; to create your first product category.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200/90 rounded-sm overflow-hidden shadow-2xs">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-16">Order</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Products</th>
                  <th className="py-3 px-4">Visibility</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((cat) => {
                  const active = cat.isActive !== false;
                  return (
                    <tr
                      key={cat._id}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-xs text-gray-500">
                        #{cat.order ?? 0}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-gray-900">{cat.name}</p>
                        {cat.description ? (
                          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                            {cat.description}
                          </p>
                        ) : (
                          <p className="text-[11px] text-gray-400 font-mono">
                            /{cat.slug}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/products`}
                          className="inline-flex items-center px-2 py-0.5 rounded-sm bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-emerald-50 hover:text-[#0fa353] transition-colors"
                        >
                          {cat.productCount || 0} product
                          {cat.productCount === 1 ? "" : "s"}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(cat)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold cursor-pointer transition-colors ${
                            active
                              ? "bg-emerald-50 text-[#0fa353] border border-emerald-200 hover:bg-emerald-100"
                              : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
                          }`}
                        >
                          {active ? <FaEye size={11} /> : <FaEyeSlash size={11} />}
                          <span>{active ? "Active" : "Hidden"}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(cat)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <FaPen size={10} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(cat)}
                            disabled={deletingId === cat._id}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm border text-xs font-semibold transition-colors cursor-pointer ${
                              cat.productCount > 0
                                ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border-red-200 hover:border-red-600"
                            }`}
                            title={
                              cat.productCount > 0
                                ? "Reassign products before deleting"
                                : "Delete category"
                            }
                          >
                            <FaTrash size={10} />
                            <span>{deletingId === cat._id ? "..." : "Delete"}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="sm:hidden divide-y divide-gray-100">
            {categories.map((cat) => {
              const active = cat.isActive !== false;
              return (
                <div key={cat._id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {cat.name}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Order #{cat.order ?? 0} • {cat.productCount || 0} products
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(cat)}
                      className={`px-2 py-0.5 rounded-sm text-[11px] font-semibold border ${
                        active
                          ? "bg-emerald-50 text-[#0fa353] border-emerald-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}
                    >
                      {active ? "Active" : "Hidden"}
                    </button>
                  </div>
                  {cat.description && (
                    <p className="text-xs text-gray-600">{cat.description}</p>
                  )}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(cat)}
                      className="flex-1 py-1.5 rounded-sm bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat)}
                      disabled={deletingId === cat._id}
                      className={`flex-1 py-1.5 rounded-sm border text-xs font-semibold ${
                        cat.productCount > 0
                          ? "bg-gray-50 text-gray-400 border-gray-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {showModal && (
        <div
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-sm max-w-md w-full overflow-hidden shadow-2xl border border-gray-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="text-xs text-gray-500">
                  {editingCategory
                    ? "Renaming automatically updates all products in this category."
                    : "New categories appear immediately in Add Product and storefront filters."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="w-7 h-7 rounded-sm text-gray-400 hover:text-gray-700 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
              >
                <FaXmark size={15} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Solar Water Pumps"
                  className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    placeholder="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
                  />
                </div>
                <div className="flex items-end pb-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 accent-[#0fa353]"
                    />
                    <span className="text-xs font-bold text-gray-700">
                      Visible on Storefront
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  SEO Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional note or SEO summary for this category"
                  className="w-full bg-gray-50 border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-sm text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-bold shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
