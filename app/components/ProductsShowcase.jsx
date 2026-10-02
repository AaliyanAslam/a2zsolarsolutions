"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
  FaBolt,
  FaBatteryFull,
  FaSolarPanel,
  FaPlug,
  FaChargingStation,
  FaGears,
  FaBoxOpen,
  FaCarBattery,
} from "react-icons/fa6";

const CATEGORY_ICONS = {
  "Inverters": FaBolt,
  "Tubular Batteries": FaBatteryFull,
  "Lithium Batteries": FaCarBattery,
  "Energy Storage": FaBoxOpen,
  "Solar Panels": FaSolarPanel,
  "MPPT Charge Controllers": FaGears,
  "EV Charging Solutions": FaChargingStation,
  "Electrical DB Accessories": FaPlug,
  "DB Accessories": FaPlug,
};

const formatPrice = (p) => {
  if (!p || p === 0) return "";
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(p);
};

function CategoryRow({ category, products }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const Icon = CATEGORY_ICONS[category] || FaTag;

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
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0fa353] flex items-center justify-center border border-emerald-200">
            <Icon size={14} />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#1a1c29] tracking-tight">
            {category}
          </h3>
        </div>
        <Link
          href={`/products?category=${encodeURIComponent(category)}`}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] transition-colors"
        >
          View All <FaArrowRight size={10} />
        </Link>
      </div>

      {/* Scrollable row */}
      <div className="relative group">
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-lg items-center justify-center text-gray-700 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
          >
            <FaChevronLeft size={12} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((prod) => {
            const mainImage = prod.images?.[0]?.url;
            return (
              <Link
                key={prod._id}
                href={`/products/${prod.slug}`}
                className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] snap-start group/card"
              >
                <div className="bg-white border border-gray-200/80 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {mainImage ? (
                      <Image
                        src={mainImage}
                        alt={prod.title}
                        fill
                        sizes="220px"
                        className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <FaBoxOpen size={32} />
                      </div>
                    )}
                    {prod.discountPrice > 0 && prod.price > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm">
                        {Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-3 flex-1 flex flex-col">
                    {prod.brand && (
                      <p className="text-[9px] sm:text-[10px] font-bold text-[#0fa353] uppercase tracking-wider mb-0.5">
                        {prod.brand}
                      </p>
                    )}
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-auto">
                      {prod.title}
                    </h4>
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
                </div>
              </Link>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-lg items-center justify-center text-gray-700 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
          >
            <FaChevronRight size={12} />
          </button>
        )}
      </div>

      {/* Mobile View All */}
      <Link
        href={`/products?category=${encodeURIComponent(category)}`}
        className="sm:hidden flex items-center justify-center gap-1.5 text-xs font-bold text-[#0fa353] hover:text-[#0c8a45] transition-colors py-2"
      >
        View All {category} <FaArrowRight size={10} />
      </Link>
    </div>
  );
}

export default function ProductsShowcase() {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/products?limit=50");
        const data = await res.json();
        if (data.success && data.products?.length > 0) {
          const groups = {};
          data.products.forEach((p) => {
            if (!groups[p.category]) groups[p.category] = [];
            if (groups[p.category].length < 8) groups[p.category].push(p);
          });
          setGrouped(groups);
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = Object.keys(grouped);
  if (loading || categories.length === 0) return null;

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative scroll-mt-20 bg-white py-14 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0fa353] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-sm">
              Our Products
            </span>
            <h2
              id="products-heading"
              className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1a1c29] sm:text-4xl md:text-5xl"
            >
              Solar equipment you can{" "}
              <span className="text-[#0fa353]">trust</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base max-w-xl">
              Tier-1 inverters, lithium batteries, solar panels, and accessories from trusted brands — all under one roof.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-600/20 transition-all self-start sm:self-auto"
          >
            Browse All Products <FaArrowRight size={11} />
          </Link>
        </div>

        <div className="space-y-10 sm:space-y-14">
          {categories.map((cat) => (
            <CategoryRow key={cat} category={cat} products={grouped[cat]} />
          ))}
        </div>
      </div>
    </section>
  );
}
