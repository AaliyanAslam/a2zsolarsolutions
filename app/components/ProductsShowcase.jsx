"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, SWR_CACHE_CONFIG } from "@/lib/fetcher";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaBoxOpen } from "react-icons/fa6";

const CATEGORY_ORDER = [
  "Inverters",
  "Lithium Batteries",
  "Tubular Batteries",
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

/* ── Single product card ─────────────────────────────────────────── */
function ProductCard({ product }) {
  const img = product.images?.[0]?.url;
  const hasDiscount = product.discountPrice > 0 && product.price > 0;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col h-full"
    >
      {/* Image Canvas */}
      <div className="relative aspect-square rounded-2xl bg-[#fafafa] border border-gray-100 overflow-hidden mb-3 group-hover:border-gray-200 transition-all flex items-center justify-center">
        {img ? (
          <Image
            src={img}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3.5 sm:p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <FaBoxOpen size={36} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide shadow-2xs">
              {discountPct}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-400 text-amber-950 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide shadow-2xs">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1">
        {/* Brand */}
        {product.brand && (
          <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h3 className="text-[13px] sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#0fa353] transition-colors mb-auto">
          {product.title}
        </h3>

        {/* Price */}
        <div className="mt-2.5 flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : product.price > 0 ? (
            <span className="text-sm sm:text-[15px] font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          ) : (
            <span className="text-xs font-medium text-gray-400">
              Contact for price
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ── Category row with horizontal scroll ─────────────────────────── */
function CategoryRow({ category, products }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div>
      {/* Category header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          {category}
        </h3>
        <Link
          href={`/products?category=${encodeURIComponent(category)}`}
          className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          View all <FaArrowRight size={9} />
        </Link>
      </div>

      {/* Scrollable product row */}
      <div className="relative group/scroll">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            aria-label={`Scroll ${category} left`}
            className="hidden sm:flex absolute -left-4 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all opacity-0 group-hover/scroll:opacity-100"
          >
            <FaChevronLeft size={13} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((prod) => (
            <div
              key={prod._id}
              className="flex-shrink-0 w-[165px] sm:w-[210px] md:w-[230px] snap-start"
            >
              <ProductCard product={prod} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            aria-label={`Scroll ${category} right`}
            className="hidden sm:flex absolute -right-4 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all opacity-0 group-hover/scroll:opacity-100"
          >
            <FaChevronRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────────── */
export default function ProductsShowcase() {
  const { data, isLoading } = useSWR(
    "/api/products?limit=50",
    fetcher,
    SWR_CACHE_CONFIG,
  );

  const grouped = useMemo(() => {
    if (!data?.success || !data.products?.length) return {};
    const groups = {};
    data.products.forEach((p) => {
      if (!groups[p.category]) groups[p.category] = [];
      if (groups[p.category].length < 10) groups[p.category].push(p);
    });
    return groups;
  }, [data]);

  // Sort categories by defined order
  const categories = useMemo(() => {
    const keys = Object.keys(grouped);
    return keys.sort(
      (a, b) =>
        (CATEGORY_ORDER.indexOf(a) === -1 ? 99 : CATEGORY_ORDER.indexOf(a)) -
        (CATEGORY_ORDER.indexOf(b) === -1 ? 99 : CATEGORY_ORDER.indexOf(b)),
    );
  }, [grouped]);

  if (isLoading || categories.length === 0) return null;

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative scroll-mt-20 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12 sm:mb-16">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0fa353] mb-2">
              Products
            </p>
            <h2
              id="products-heading"
              className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight"
            >
              Solar equipment you can trust
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] text-gray-500 leading-relaxed">
              Tier-1 inverters, lithium batteries, solar panels, and accessories from trusted brands — all under one roof.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold transition-colors self-start sm:self-auto"
          >
            Browse all products <FaArrowRight size={11} />
          </Link>
        </div>

        {/* ── Category rows ── */}
        <div className="space-y-12 sm:space-y-16">
          {categories.map((cat) => (
            <CategoryRow key={cat} category={cat} products={grouped[cat]} />
          ))}
        </div>
      </div>
    </section>
  );
}
