"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaPhone,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTag,
  FaStar,
  FaShieldHalved,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa6";

const formatPrice = (p) => {
  if (!p || p === 0) return "";
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(p);
};

export default function ProductDetailClient({ product, related }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.images || [];
  const currentImage = images[selectedImage]?.url;

  const prevImage = () => setSelectedImage((i) => (i > 0 ? i - 1 : images.length - 1));
  const nextImage = () => setSelectedImage((i) => (i < images.length - 1 ? i + 1 : 0));

  const whatsappMsg = encodeURIComponent(
    `Salam A2Z Solar Solutions,\nI'm interested in: *${product.title}*\nCategory: ${product.category}\nPlease share pricing and availability.`
  );

  return (
    <main className="min-h-screen bg-white text-[#1a1c29] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6"
        >
          <Link href="/" className="hover:text-[#0fa353] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="hover:text-[#0fa353] transition-colors">Products</Link>
          <span className="text-gray-300">/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#0fa353] transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#0fa353] truncate max-w-[180px]">{product.title}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <FaBoxOpen size={64} />
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-all"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-all"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isFeatured && (
                  <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-sm flex items-center gap-1">
                    <FaStar size={8} /> Featured
                  </span>
                )}
                {!product.inStock && (
                  <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-sm">
                    Out of Stock
                  </span>
                )}
                {product.discountPrice > 0 && product.price > 0 && (
                  <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-sm">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {images.map((img, i) => (
                  <button
                    key={img.publicId || i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-[#0fa353] shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.title} - Image ${i + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            {/* Category & Brand */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold bg-emerald-50 text-[#0fa353] border border-emerald-200 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {product.brand}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1a1c29] tracking-tight leading-tight">
              {product.title}
            </h1>

            {product.shortDescription && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 py-3 border-y border-gray-100">
              {product.discountPrice > 0 ? (
                <>
                  <span className="text-2xl sm:text-3xl font-black text-[#0fa353]">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="text-lg text-gray-400 line-through font-bold">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-sm">
                    Save {formatPrice(product.price - product.discountPrice)}
                  </span>
                </>
              ) : product.price > 0 ? (
                <span className="text-2xl sm:text-3xl font-black text-[#1a1c29]">
                  {formatPrice(product.price)}
                </span>
              ) : (
                <span className="text-lg font-bold text-gray-500">
                  Contact for Price
                </span>
              )}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              {product.warranty && (
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200/70">
                  <FaShieldHalved className="text-[#0fa353] shrink-0" size={14} />
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase">Warranty</p>
                    <p className="text-xs font-bold text-gray-900">{product.warranty}</p>
                  </div>
                </div>
              )}
              {product.model && (
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200/70">
                  <FaTag className="text-[#0fa353] shrink-0" size={14} />
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase">Model</p>
                    <p className="text-xs font-bold text-gray-900">{product.model}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200/70">
                <FaBoxOpen className="text-[#0fa353] shrink-0" size={14} />
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Availability</p>
                  <p className={`text-xs font-bold ${product.inStock ? "text-emerald-700" : "text-red-600"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/923214189298?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-[#25D366] hover:bg-[#3ee27c] text-[#122116] text-sm font-bold transition-colors shadow-lg flex-1"
              >
                <FaWhatsapp size={18} />
                Order on WhatsApp
              </a>
              <a
                href="tel:+923214189298"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm border-2 border-[#0fa353] text-[#0fa353] hover:bg-[#0fa353] hover:text-white text-sm font-bold transition-colors flex-1"
              >
                <FaPhone size={14} />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Description */}
          {product.description && (
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1c29] tracking-tight">
                Product Description
              </h2>
              <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>
          )}

          {/* Specifications & Features */}
          <div className="space-y-6">
            {product.specifications?.length > 0 && (
              <div>
                <h2 className="text-lg font-black text-[#1a1c29] tracking-tight mb-3">
                  Specifications
                </h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {product.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className={`flex justify-between px-3.5 py-2.5 text-xs sm:text-sm ${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="font-bold text-gray-700">{spec.label}</span>
                      <span className="text-gray-900 font-medium text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.features?.length > 0 && (
              <div>
                <h2 className="text-lg font-black text-[#1a1c29] tracking-tight mb-3">
                  Key Features
                </h2>
                <ul className="space-y-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                      <FaCheck className="text-[#0fa353] shrink-0 mt-0.5" size={11} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related?.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1c29] tracking-tight">
                Related Products
              </h2>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0fa353] hover:text-[#0c8a45]"
              >
                View All <FaArrowRight size={10} />
              </Link>
            </div>

            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {related.map((r) => {
                const img = r.images?.[0]?.url;
                return (
                  <Link
                    key={r._id}
                    href={`/products/${r.slug}`}
                    className="flex-shrink-0 w-[160px] sm:w-[200px] group"
                  >
                    <div className="bg-white border border-gray-200/80 rounded-lg overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                      <div className="relative aspect-square bg-gray-50 overflow-hidden">
                        {img ? (
                          <Image
                            src={img}
                            alt={r.title}
                            fill
                            sizes="200px"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-200">
                            <FaBoxOpen size={28} />
                          </div>
                        )}
                      </div>
                      <div className="p-2.5 flex-1 flex flex-col">
                        {r.brand && (
                          <p className="text-[9px] font-bold text-[#0fa353] uppercase mb-0.5">
                            {r.brand}
                          </p>
                        )}
                        <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug mb-auto">
                          {r.title}
                        </h3>
                        <div className="mt-1.5">
                          {r.discountPrice > 0 ? (
                            <span className="text-xs font-black text-[#0fa353]">
                              {formatPrice(r.discountPrice)}
                            </span>
                          ) : r.price > 0 ? (
                            <span className="text-xs font-bold text-gray-900">
                              {formatPrice(r.price)}
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold text-gray-400 uppercase">
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
          </div>
        )}
      </div>
    </main>
  );
}
