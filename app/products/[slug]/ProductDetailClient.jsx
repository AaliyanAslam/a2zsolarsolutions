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
  FaShieldHalved,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa6";
import SocialShareButton from "@/app/components/SocialShareButton";

const formatPrice = (p) => {
  if (!p || Number(p) === 0) return "";
  const num = Math.round(Number(p));
  return `PKR ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export default function ProductDetailClient({ product, related }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.images || [];
  const currentImage = images[selectedImage]?.url;

  const prevImage = () =>
    setSelectedImage((i) => (i > 0 ? i - 1 : images.length - 1));
  const nextImage = () =>
    setSelectedImage((i) => (i < images.length - 1 ? i + 1 : 0));

  const hasDiscount =
    Number(product.discountPrice) > 0 &&
    Number(product.price) > 0 &&
    Number(product.discountPrice) < Number(product.price);

  const unitPrice = hasDiscount
    ? Number(product.discountPrice)
    : Number(product.price) > 0
    ? Number(product.price)
    : 0;

  const discountPct = hasDiscount
    ? Math.round(
        ((Number(product.price) - Number(product.discountPrice)) /
          Number(product.price)) *
          100
      )
    : 0;

  const estimatedTotal = unitPrice > 0 ? unitPrice * quantity : 0;

  const whatsappLines = [
    "Salam A2Z Solar Solutions,",
    `I'm interested in: *${product.title}*`,
    `Category: ${product.category}`,
    `Quantity: *${quantity}*`,
  ];
  if (unitPrice > 0) {
    whatsappLines.push(
      quantity > 1
        ? `Listed Price: ${formatPrice(unitPrice)} each (Est. Total: ${formatPrice(
            estimatedTotal
          )})`
        : `Listed Price: ${formatPrice(unitPrice)}`
    );
  }
  whatsappLines.push("Please share pricing and availability.");
  const whatsappMsg = encodeURIComponent(whatsappLines.join("\n"));

  const hasDetailsSection =
    Boolean(product.description) ||
    (product.specifications?.length ?? 0) > 0 ||
    (product.features?.length ?? 0) > 0;

  const decQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const incQty = () => setQuantity((q) => (q < 99 ? q + 1 : 99));

  return (
    <main className="min-h-screen bg-white text-[#1a1c29] pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-500 mb-6 sm:mb-8 overflow-hidden"
        >
          <Link
            href="/"
            className="hover:text-[#0fa353] transition-colors shrink-0"
          >
            Home
          </Link>
          <span className="text-gray-300 shrink-0" aria-hidden="true">
            /
          </span>
          <Link
            href="/products"
            className="hover:text-[#0fa353] transition-colors shrink-0"
          >
            Products
          </Link>
          <span className="text-gray-300 shrink-0" aria-hidden="true">
            /
          </span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#0fa353] transition-colors shrink-0 hidden sm:inline"
          >
            {product.category}
          </Link>
          <span
            className="text-gray-300 shrink-0 hidden sm:inline"
            aria-hidden="true"
          >
            /
          </span>
          <span className="text-[#1a1c29] font-medium truncate min-w-0">
            {product.title}
          </span>
        </nav>

        {/* Above-the-Fold Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 mb-14 sm:mb-20 items-start">
          {/* Left: Clean Image Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-3.5">
            <div className="relative aspect-[4/3] sm:aspect-square bg-[#f7f7f5] rounded-2xl overflow-hidden border border-gray-200/70">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-5 sm:p-8"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <FaBoxOpen size={64} />
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 border border-gray-200/90 shadow-xs flex items-center justify-center text-gray-700 hover:text-[#1a1c29] hover:bg-white transition-colors cursor-pointer"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 border border-gray-200/90 shadow-xs flex items-center justify-center text-gray-700 hover:text-[#1a1c29] hover:bg-white transition-colors cursor-pointer"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </>
              )}

              {/* Subtle Image Badges */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5">
                {hasDiscount && (
                  <span className="text-[11px] font-semibold bg-[#1a1c29] text-white px-2.5 py-1 rounded-full">
                    {discountPct}% OFF
                  </span>
                )}
                {!product.inStock && (
                  <span className="text-[11px] font-semibold bg-red-600 text-white px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
                {product.isFeatured && (
                  <span className="text-[11px] font-semibold bg-white/95 text-[#1a1c29] border border-gray-200 px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div
                className="flex gap-2.5 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
              >
                {images.map((img, i) => (
                  <button
                    key={img.publicId || i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`shrink-0 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl bg-[#f7f7f5] overflow-hidden border-2 transition-colors cursor-pointer ${
                      selectedImage === i
                        ? "border-[#0fa353]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.title} - Thumbnail ${i + 1}`}
                      width={72}
                      height={72}
                      className="object-contain p-1.5 w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Calm E-Commerce Buy Box */}
          <div className="lg:col-span-6 space-y-5">
            {/* Category Pill */}
            <div>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-[#f4f4f1] hover:bg-[#ebebea] text-xs font-medium text-gray-700 transition-colors"
              >
                {product.category}
              </Link>
            </div>

            {/* Title & Meta Subline */}
            <div className="space-y-2.5">
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#1a1c29] tracking-tight leading-[1.22]">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] text-gray-500">
                {product.brand && <span>{product.brand}</span>}
                {product.brand && product.model && (
                  <span className="text-gray-300" aria-hidden="true">
                    •
                  </span>
                )}
                {product.model && <span>Model: {product.model}</span>}
                {(product.brand || product.model) && (
                  <span className="text-gray-300" aria-hidden="true">
                    •
                  </span>
                )}
                <span
                  className={`font-semibold ${
                    product.inStock ? "text-[#0fa353]" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2.5 pt-1">
              {hasDiscount ? (
                <>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0fa353] tabular-nums">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="text-base sm:text-lg text-gray-400 line-through font-semibold tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-semibold bg-emerald-50 text-[#0fa353] px-2.5 py-0.5 rounded-full">
                    Save {formatPrice(product.price - product.discountPrice)}
                  </span>
                </>
              ) : unitPrice > 0 ? (
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1a1c29] tabular-nums">
                  {formatPrice(unitPrice)}
                </span>
              ) : (
                <span className="text-lg font-bold text-gray-600">
                  Contact for Pricing
                </span>
              )}
            </div>

            {/* Quantity Stepper + Primary WhatsApp Order Pill */}
            <div className="space-y-2.5 pt-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div
                  className="inline-flex items-center justify-between rounded-full border border-gray-300 bg-white h-12 px-2 shrink-0 sm:w-32"
                  aria-label="Quantity selector"
                >
                  <button
                    type="button"
                    onClick={decQty}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    &minus;
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#1a1c29] tabular-nums select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incQty}
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <a
                  href={`https://wa.me/923214189298?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-full bg-[#0fa353] hover:bg-[#0c8a45] text-white text-sm font-semibold transition-colors"
                >
                  <FaWhatsapp size={18} />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {quantity > 1 && unitPrice > 0 && (
                <p className="text-xs text-gray-500 px-1">
                  Estimated total for {quantity} units:{" "}
                  <span className="font-semibold text-[#1a1c29] tabular-nums">
                    {formatPrice(estimatedTotal)}
                  </span>
                </p>
              )}

              {/* Secondary Actions Row */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 pt-0.5">
                <a
                  href="tel:+923214189298"
                  className="h-11 rounded-xl border border-gray-300 hover:border-[#0fa353] bg-white hover:bg-gray-50 text-gray-700 hover:text-[#0fa353] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <FaPhone size={13} className="text-[#0fa353]" />
                  <span>Call Now</span>
                </a>

                <SocialShareButton
                  title={product.title}
                  image={images[0]?.url}
                  fullWidth
                  variant="outline"
                  label="Share this Product"
                />
              </div>
            </div>

            {/* 3 Soft Stone Key-Fact Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="bg-[#f7f7f5] rounded-xl px-3.5 py-3 border border-gray-200/60">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Brand
                </p>
                <p className="text-xs sm:text-[13px] font-bold text-[#1a1c29] mt-0.5 leading-snug">
                  {product.brand || "Tier-1 Verified"}
                </p>
              </div>

              <div className="bg-[#f7f7f5] rounded-xl px-3.5 py-3 border border-gray-200/60">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  {product.model ? "Model" : "Category"}
                </p>
                <p className="text-xs sm:text-[13px] font-bold text-[#1a1c29] mt-0.5 leading-snug">
                  {product.model || product.category}
                </p>
              </div>

              <div className="bg-[#f7f7f5] rounded-xl px-3.5 py-3 border border-gray-200/60 xs:col-span-2 sm:col-span-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Availability
                </p>
                <p
                  className={`text-xs sm:text-[13px] font-bold mt-0.5 leading-snug ${
                    product.inStock ? "text-[#0fa353]" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Dedicated Full-Width Warranty Strip (Prevents cramping long warranty notes) */}
            {product.warranty && (
              <div className="bg-[#f7f7f5] rounded-xl px-4 py-3 border border-gray-200/60 flex items-start gap-3">
                <FaShieldHalved
                  className="text-[#0fa353] shrink-0 mt-0.5"
                  size={15}
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Warranty
                  </p>
                  <p className="text-xs sm:text-[13px] font-medium text-[#1a1c29] leading-relaxed mt-0.5">
                    {product.warranty}
                  </p>
                </div>
              </div>
            )}

            {/* Overview Box */}
            {product.shortDescription && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Description
                </p>
                <div className="bg-[#f7f7f5] rounded-xl border border-gray-200/60 p-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </div>
              </div>
            )}

            {/* More Details Anchor Link */}
            {hasDetailsSection && (
              <div className="pt-1">
                <a
                  href="#product-details"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-[#0fa353] transition-colors"
                >
                  <span>More Details</span>
                  <span aria-hidden="true">&darr;</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Full Product Description, Key Features & Technical Specifications */}
        {hasDetailsSection && (
          <section
            id="product-details"
            className="scroll-mt-28 border-t border-gray-200 pt-10 sm:pt-14 mb-14 sm:mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left: Editorial Description & Key Features */}
              <div className="lg:col-span-7 space-y-10">
                {product.description && (
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#1a1c29] tracking-tight mb-3.5">
                      Product Description
                    </h2>
                    <div className="text-sm sm:text-[15px] text-gray-600 leading-7 whitespace-pre-line">
                      {product.description}
                    </div>
                  </div>
                )}

                {product.features?.length > 0 && (
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#1a1c29] tracking-tight mb-4">
                      Key Features
                    </h2>
                    <ul className="bg-[#f7f7f5] rounded-xl border border-gray-200/60 p-4 sm:p-5 space-y-3">
                      {product.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed"
                        >
                          <FaCheck
                            className="text-[#0fa353] shrink-0 mt-1"
                            size={12}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right: Clean Technical Specifications Table */}
              {product.specifications?.length > 0 && (
                <div className="lg:col-span-5 lg:sticky lg:top-28">
                  <div className="rounded-xl border border-gray-200/80 overflow-hidden bg-white">
                    <h2 className="bg-[#f7f7f5] px-4 sm:px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-200/80">
                      Specifications
                    </h2>
                    <dl className="divide-y divide-gray-100">
                      {product.specifications.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-4 px-4 sm:px-5 py-3 text-xs sm:text-sm"
                        >
                          <dt className="text-gray-500 font-medium shrink-0 max-w-[45%]">
                            {spec.label}
                          </dt>
                          <dd className="text-[#1a1c29] font-semibold text-right leading-snug">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Related Products */}
        {related?.length > 0 && (
          <section className="border-t border-gray-200 pt-10 sm:pt-14">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl font-bold text-[#1a1c29] tracking-tight">
                Related Products
              </h2>
              <Link
                href={`/products?category=${encodeURIComponent(
                  product.category
                )}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#0fa353] transition-colors"
              >
                <span>View all</span>
                <FaArrowRight size={11} />
              </Link>
            </div>

            <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {related.map((r) => {
                const img = r.images?.[0]?.url;
                const rHasDiscount =
                  Number(r.discountPrice) > 0 &&
                  Number(r.price) > 0 &&
                  Number(r.discountPrice) < Number(r.price);
                const rPrice = rHasDiscount
                  ? Number(r.discountPrice)
                  : Number(r.price) > 0
                  ? Number(r.price)
                  : 0;

                return (
                  <Link
                    key={r._id}
                    href={`/products/${r.slug}`}
                    className="shrink-0 w-[170px] sm:w-[220px] group flex flex-col"
                  >
                    <div className="relative aspect-square rounded-xl bg-[#f7f7f5] border border-gray-200/60 overflow-hidden mb-3 group-hover:border-gray-300 transition-colors flex items-center justify-center">
                      {img ? (
                        <Image
                          src={img}
                          alt={r.title}
                          fill
                          sizes="220px"
                          className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <FaBoxOpen size={28} />
                        </div>
                      )}
                      {rHasDiscount && (
                        <span className="absolute top-2.5 left-2.5 bg-[#1a1c29] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {Math.round(
                            ((Number(r.price) - Number(r.discountPrice)) /
                              Number(r.price)) *
                              100
                          )}
                          % OFF
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      {r.brand && (
                        <p className="text-[11px] font-medium text-gray-400 mb-0.5 truncate">
                          {r.brand}
                        </p>
                      )}
                      <h3 className="text-xs sm:text-[13px] font-semibold text-[#1a1c29] line-clamp-2 leading-snug group-hover:text-[#0fa353] transition-colors mb-auto">
                        {r.title}
                      </h3>
                      <div className="mt-2">
                        {rHasDiscount ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-bold text-[#0fa353] tabular-nums">
                              {formatPrice(rPrice)}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through tabular-nums">
                              {formatPrice(r.price)}
                            </span>
                          </div>
                        ) : rPrice > 0 ? (
                          <span className="text-sm font-bold text-[#1a1c29] tabular-nums">
                            {formatPrice(rPrice)}
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-gray-400">
                            Contact for price
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
