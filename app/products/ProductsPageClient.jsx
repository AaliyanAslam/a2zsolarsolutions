"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaBoxOpen,
  FaSearch,
  FaTag,
  FaStar,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa6";

const CATEGORIES = [
  "All",
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

const formatPrice = (p) => {
  if (!p || p === 0) return "";
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(p);
};

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== "All") params.set("category", category);
      if (search.trim()) params.set("search", search.trim());
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      if (data.success) setProducts(data.products || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="min-h-screen bg-white text-[#1a1c29] pt-24 sm:pt-28 pb-20">
      {/* Hero Header */}
      <header className="border-b border-gray-200/90 bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3"
          >
            <Link href="/" className="hover:text-[#0fa353] transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#0fa353]">Products</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1c29] tracking-tight leading-tight">
            Solar Products
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
            Explore our full range of Tier-1 inverters, lithium & tubular batteries, solar panels, charge controllers, EV charging, and electrical accessories.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={13} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-sm pl-9 pr-4 py-2 text-sm text-gray-900 focus:bg-white focus:border-[#0fa353] focus:ring-1 focus:ring-[#0fa353] outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all ${
                  category === c
                    ? "bg-[#0fa353] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-8 h-8 border-3 border-[#0fa353] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center mx-auto">
              <FaBoxOpen size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Products Found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              {search ? `No products matching "${search}".` : `No products in ${category} yet.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {products.map((prod) => {
              const mainImage = prod.images?.[0]?.url;
              return (
                <Link
                  key={prod._id}
                  href={`/products/${prod.slug}`}
                  className="group"
                >
                  <article className="bg-white border border-gray-200/80 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      {mainImage ? (
                        <Image
                          src={mainImage}
                          alt={prod.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                          <FaBoxOpen size={32} />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <span className="text-[9px] font-bold bg-[#0fa353]/90 text-white px-1.5 py-0.5 rounded-sm backdrop-blur-sm">
                          {prod.category}
                        </span>
                        {prod.isFeatured && (
                          <span className="text-[9px] font-bold bg-amber-500/90 text-white px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                            <FaStar size={7} /> Featured
                          </span>
                        )}
                      </div>
                      {prod.discountPrice > 0 && prod.price > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm">
                          {Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 sm:p-3 flex-1 flex flex-col">
                      {prod.brand && (
                        <p className="text-[9px] sm:text-[10px] font-bold text-[#0fa353] uppercase tracking-wider mb-0.5">
                          {prod.brand}
                        </p>
                      )}
                      <h2 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-auto">
                        {prod.title}
                      </h2>
                      <div className="mt-2 flex items-center gap-1.5">
                        {prod.discountPrice > 0 ? (
                          <>
                            <span className="text-xs sm:text-sm font-black text-[#0fa353]">
                              {formatPrice(prod.discountPrice)}
                            </span>
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                              {formatPrice(prod.price)}
                            </span>
                          </>
                        ) : prod.price > 0 ? (
                          <span className="text-xs sm:text-sm font-black text-gray-900">
                            {formatPrice(prod.price)}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            Contact for Price
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 p-6 sm:p-10 rounded-lg bg-gradient-to-br from-[#122116] to-[#0a1a0f] text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Need a custom solar quote?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto mb-6">
            Our engineers will design the perfect hybrid system for your home or business. Contact us for a free site survey.
          </p>
          <a
            href="https://wa.me/923214189298?text=Salam%20A2Z%20Solar%2C%20I%20want%20to%20inquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#25D366] hover:bg-[#3ee27c] text-[#122116] text-sm font-bold transition-colors shadow-lg"
          >
            <FaWhatsapp size={18} />
            WhatsApp Us Now
          </a>
        </div>
      </div>
    </main>
  );
}
