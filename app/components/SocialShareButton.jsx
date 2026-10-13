"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Share2,
  X,
  Link2,
  Check,
} from "lucide-react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa6";
import Image from "next/image";

/**
 * SocialShareButton
 *
 * Props:
 *   title   {string}  – text for native share sheet & WhatsApp message
 *   url     {string}  – URL to share. Defaults to window.location.href (client-side only).
 *   image   {string}  – product thumbnail URL shown in the preview card
 *   className {string} – extra Tailwind classes on the trigger button
 *   size    {"sm"|"md"|"lg"}
 *   fullWidth {boolean} – render full-width button with label instead of icon-only
 *   label   {string}  – button text when fullWidth is true
 */
export default function SocialShareButton({
  title = "",
  url,
  image,
  className = "",
  size = "md",
  fullWidth = false,
  label = "Share this Product",
}) {
  // ── client-side URL resolution (SSR-safe) ─────────────────────────────────
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(url || window.location.href);
  }, [url]);

  // ── dropdown / modal state ─────────────────────────────────────────────────
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // ── share handler ──────────────────────────────────────────────────────────
  const handleShare = useCallback(async () => {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      shareUrl
    ) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
      }
    }
    setOpen((prev) => !prev);
  }, [title, shareUrl]);

  // ── copy link ─────────────────────────────────────────────────────────────
  const copyLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 2000);
  }, [shareUrl]);

  // ── WhatsApp & Facebook URLs ───────────────────────────────────────────────
  const waText = encodeURIComponent(
    title ? `${title}\n${shareUrl}` : shareUrl
  );
  const waUrl = `https://wa.me/?text=${waText}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  // ── display domain ─────────────────────────────────────────────────────────
  const displayDomain = shareUrl
    ? shareUrl.replace(/^https?:\/\//, "").split("/")[0]
    : "a2zsolarsolutions.com";

  // ── size variants ──────────────────────────────────────────────────────────
  const sizeMap = {
    sm: { btn: "h-8 w-8", icon: 14, text: "text-xs", item: "py-2 px-3" },
    md: { btn: "h-9 w-9", icon: 16, text: "text-sm", item: "py-2.5 px-3.5" },
    lg: { btn: "h-10 w-10", icon: 18, text: "text-sm", item: "py-3 px-4" },
  };
  const s = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`relative ${fullWidth ? "w-full block" : "inline-block"}`}
      ref={dropdownRef}
    >
      {/* ── Trigger button ── */}
      {fullWidth ? (
        <button
          type="button"
          aria-label={label}
          aria-expanded={open}
          onClick={handleShare}
          className={`
            w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm
            border-2 border-gray-200 hover:border-[#0fa353] bg-white hover:bg-emerald-50/40
            text-gray-700 hover:text-[#0fa353] text-sm font-bold transition-all shadow-sm
            active:scale-[0.99] cursor-pointer
            ${className}
          `}
        >
          <Share2 size={17} strokeWidth={2.2} className="text-[#0fa353]" />
          <span>{label}</span>
        </button>
      ) : (
        <button
          type="button"
          aria-label="Share this product"
          aria-expanded={open}
          onClick={handleShare}
          className={`
            inline-flex items-center justify-center rounded-full
            border border-gray-200 bg-white text-gray-500
            shadow-sm hover:border-[#0fa353] hover:text-[#0fa353] hover:shadow-md
            active:scale-95 transition-all duration-200 cursor-pointer
            ${s.btn} ${className}
          `}
        >
          <Share2 size={s.icon} strokeWidth={2.2} />
        </button>
      )}

      {/* ── Fallback dropdown ── */}
      {open && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 sm:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown panel */}
          <div
            role="dialog"
            aria-label="Share options"
            className={`
              absolute z-50 mt-2
              ${
                fullWidth
                  ? "left-0 right-0 sm:left-0 sm:right-auto sm:w-80"
                  : "right-0 w-72"
              }
              rounded-xl border border-gray-100 bg-white shadow-2xl
              ring-1 ring-black/5 overflow-hidden
              ${fullWidth ? "sm:origin-top-left" : "sm:origin-top-right"}
              max-sm:fixed max-sm:bottom-4 max-sm:left-1/2 max-sm:-translate-x-1/2
              max-sm:right-auto max-sm:w-[calc(100vw-2rem)] max-sm:max-w-sm
            `}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Share Product
              </span>
              <button
                type="button"
                aria-label="Close share menu"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* ── Link Preview Card ── */}
            <div className="mx-3 mt-3 mb-2 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2.5 overflow-hidden">
              {/* Product thumbnail or A2Z logo fallback */}
              <div className="relative h-14 w-14 shrink-0 rounded-md overflow-hidden bg-white border border-gray-200">
                {image ? (
                  <Image
                    src={image}
                    alt={title || "Product"}
                    fill
                    sizes="56px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0fa353] to-[#0c8a45]">
                    <span className="text-white text-[10px] font-black leading-none">
                      A2Z
                    </span>
                  </div>
                )}
              </div>

              {/* Text + site logo */}
              <div className="flex-1 min-w-0">
                {title && (
                  <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug mb-1">
                    {title}
                  </p>
                )}
                <div className="flex items-center gap-1.5">
                  <div className="relative h-4 w-4 shrink-0 rounded-sm overflow-hidden">
                    <Image
                      src="/logo/favicon-32x32.png"
                      alt="A2Z Solar"
                      width={16}
                      height={16}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium truncate">
                    {displayDomain}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Share options ── */}
            <div className="p-1.5 space-y-0.5">
              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`
                  flex w-full items-center gap-3 rounded-lg font-semibold no-underline
                  text-gray-700 hover:bg-[#25D366]/10 hover:text-[#128C7E]
                  transition-colors ${s.item} ${s.text}
                `}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                  <FaWhatsapp size={16} />
                </span>
                Share on WhatsApp
              </a>

              {/* Facebook */}
              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`
                  flex w-full items-center gap-3 rounded-lg font-semibold no-underline
                  text-gray-700 hover:bg-[#1877F2]/10 hover:text-[#1877F2]
                  transition-colors ${s.item} ${s.text}
                `}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/15 text-[#1877F2]">
                  <FaFacebook size={15} />
                </span>
                Share on Facebook
              </a>

              {/* Copy Link */}
              <button
                type="button"
                onClick={copyLink}
                className={`
                  flex w-full items-center gap-3 rounded-lg font-semibold
                  transition-colors ${s.item} ${s.text}
                  ${
                    copied
                      ? "bg-emerald-50 text-[#0fa353]"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <span
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors
                    ${
                      copied
                        ? "bg-emerald-100 text-[#0fa353]"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  {copied ? (
                    <Check size={15} strokeWidth={2.5} />
                  ) : (
                    <Link2 size={15} strokeWidth={2} />
                  )}
                </span>
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
