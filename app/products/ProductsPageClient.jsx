"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaBoxOpen,
  FaMagnifyingGlass,
  FaTag,
  FaStar,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa6";
import SocialShareButton from "@/app/components/SocialShareButton";

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
  "Tools",
];

const formatPrice = (p) => {
  if (!p || Number(p) === 0) return "";
  const num = Math.round(Number(p));
  return `PKR ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export default function ProductsPageClient({ initialProducts = [] }) {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  // Default to "All" on mount to match SSR HTML exactly
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Sync category from URL parameter after mount to prevent hydration mismatch
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && urlCategory !== "All") {
      setCategory(urlCategory);
    }
    setIsMounted(true);
  }, [searchParams]);

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

  // Only fetch client-side when user changes filters after mount
  useEffect(() => {
    if (isMounted) {
      fetchProducts();
    }
  }, [isMounted, category, search, fetchProducts]);

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
            <FaMagnifyingGlass className="absolute left-3 top-2.5 text-gray-400" size={13} />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10">
            {products.map((prod) => {
              const mainImage = prod.images?.[0]?.url;
              const hasDiscount = prod.discountPrice > 0 && prod.price > 0;
              return (
                <Link
                  key={prod._id}
                  href={`/products/${prod.slug}`}
                  className="group"
                >
                  <article className="h-full flex flex-col">
                    <div className="relative aspect-square rounded-2xl bg-[#fafafa] border border-gray-100 overflow-hidden mb-3.5 group-hover:border-gray-200 transition-all flex items-center justify-center">
                      {mainImage ? (
                        <Image
                          src={mainImage}
                          alt={prod.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className="object-contain p-3.5 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <FaBoxOpen size={32} />
                        </div>
                      )}
                      {/* Category tag */}
                      <span className="absolute top-2.5 left-2.5 text-[9px] font-semibold bg-white/95 text-gray-700 px-2 py-0.5 rounded-full shadow-2xs border border-white/40">
                        {prod.category}
                      </span>
                      {prod.isFeatured && (
                        <span className="absolute top-2.5 right-2.5 text-[9px] font-semibold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                          <FaStar size={7} /> Featured
                        </span>
                      )}
                      {hasDiscount && !prod.isFeatured && (
                        <span className="absolute top-2.5 right-2.5 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                          {Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)}% OFF
                        </span>
                      )}
                      {/* Share button — only shown when no discount or featured badge */}
                      {!hasDiscount && !prod.isFeatured && (
                        <div
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={(e) => e.preventDefault()}
                        >
                          <SocialShareButton
                            title={prod.title}
                            url={`https://a2zsolarsolutions.com/products/${prod.slug}`}
                            image={prod.images?.[0]?.url}
                            size="sm"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      {prod.brand && (
                        <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                          {prod.brand}
                        </p>
                      )}
                      <h2 className="text-[13px] sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#0fa353] transition-colors mb-auto">
                        {prod.title}
                      </h2>
                      <div className="mt-2.5 flex items-baseline gap-1.5">
                        {hasDiscount ? (
                          <>
                            <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                              {formatPrice(prod.discountPrice)}
                            </span>
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                              {formatPrice(prod.price)}
                            </span>
                          </>
                        ) : prod.price > 0 ? (
                          <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                            {formatPrice(prod.price)}
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-gray-400">
                            Contact for price
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
