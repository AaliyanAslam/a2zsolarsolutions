"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Share2,
  X,
  Link2,
  Check,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaLocationDot } from "react-icons/fa6";
import Image from "next/image";

/**
 * SocialShareButton
 *
 * Props:
 *   title   {string}  – text for native share sheet & WhatsApp message
 *   url     {string}  – URL to share. Defaults to window.location.href (client-side only).
 *   image   {string}  – thumbnail / photo URL (passed to Web Share API & preview card)
 *   location {string} – place name / city (e.g. "DHA Lahore")
 *   capacity {string} – system capacity (e.g. "10kW")
 *   className {string} – extra Tailwind classes on the trigger button
 *   size    {"sm"|"md"|"lg"}
 *   fullWidth {boolean} – render full-width button with label instead of icon-only
 *   label   {string}  – button text when fullWidth is true or variant is outline
 *   headerTitle {string} – title inside the share menu dialog
 *   variant {"default"|"outline"} – button style variant
 *   dropUp  {boolean} – open dropdown in fixed overlay (ideal inside modals)
 */
export default function SocialShareButton({
  title = "",
  url,
  image,
  location = "",
  capacity = "",
  className = "",
  size = "md",
  fullWidth = false,
  label = "Share",
  headerTitle = "Share",
  variant = "default",
  dropUp = false,
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── client-side URL resolution (SSR-safe) ─────────────────────────────────
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(url || window.location.href);
  }, [url]);

  // ── dropdown / modal state ─────────────────────────────────────────────────
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
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

  // Close on Escape (stop propagation so parent modals aren't also closed)
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler, true); // capture phase
    return () => document.removeEventListener("keydown", handler, true);
  }, [open]);

  // ── share handler ──────────────────────────────────────────────────────────
  const handleShare = useCallback(async () => {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      shareUrl
    ) {
      try {
        let filesToShare = null;
        // On mobile devices, attempt to attach the real image file
        if (image && typeof navigator.canShare === "function") {
          try {
            const res = await fetch(image, { mode: "cors" });
            if (res.ok) {
              const blob = await res.blob();
              const mime = blob.type || "image/jpeg";
              const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";
              const file = new File([blob], `solar-project.${ext}`, { type: mime });
              if (navigator.canShare({ files: [file] })) {
                filesToShare = [file];
              }
            }
          } catch {
            // Silently fall back to text/url
          }
        }

        const shareData = {
          title: title || "A2Z Solar Solutions",
          text: location ? `${title} (📍 ${location})` : title,
          url: shareUrl,
        };

        if (filesToShare && filesToShare.length > 0) {
          shareData.files = filesToShare;
        }

        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
      }
    }
    setOpen((prev) => !prev);
  }, [title, shareUrl, image, location]);

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
  const waText = (() => {
    const lines = [];
    if (title) lines.push(`☀️ *${title}*`);
    if (location) lines.push(`📍 *Location:* ${location}`);
    if (capacity) lines.push(`⚡ *System:* ${capacity}`);
    if (image && !shareUrl.includes(image)) {
      lines.push(`📸 *Project Photo:* ${image}`);
    }
    if (shareUrl) lines.push(`🔗 *View Details:* ${shareUrl}`);
    return encodeURIComponent(lines.length > 0 ? lines.join("\n\n") : title ? `${title}\n${shareUrl}` : shareUrl);
  })();

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
      ref={triggerRef}
    >
      {/* ── Trigger button ── */}
      {fullWidth ? (
        <button
          type="button"
          aria-label={label}
          aria-expanded={open}
          onClick={handleShare}
          className={
            variant === "outline"
              ? `w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer shadow-xs ${className}`
              : `w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm border-2 border-gray-200 hover:border-[#0fa353] bg-white hover:bg-emerald-50/40 text-gray-700 hover:text-[#0fa353] text-sm font-bold transition-all shadow-sm active:scale-[0.99] cursor-pointer ${className}`
          }
        >
          <Share2
            size={variant === "outline" ? 16 : 17}
            strokeWidth={variant === "outline" ? 2 : 2.2}
            className={variant === "outline" ? "text-gray-600" : "text-[#0fa353]"}
          />
          <span>{label}</span>
        </button>
      ) : (
        <button
          type="button"
          aria-label={label}
          aria-expanded={open}
          onClick={handleShare}
          className={`
            inline-flex items-center justify-center gap-1.5 rounded-full
            border border-gray-200 bg-white text-gray-700
            shadow-xs hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50
            active:scale-95 transition-all duration-150 cursor-pointer
            ${variant === "outline" ? "px-3 py-1 text-xs font-semibold" : `${s.btn}`}
            ${className}
          `}
        >
          <Share2
            size={variant === "outline" ? 13 : s.icon}
            strokeWidth={2}
            className={variant === "outline" ? "text-[#0fa353] shrink-0" : ""}
          />
          {variant === "outline" && <span>{label}</span>}
        </button>
      )}

      {/* ── Dropdown panel rendered into body (prevents clipping by overflow-hidden) ── */}
      {open && mounted && typeof document !== "undefined"
        ? createPortal(
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-xs animate-[fadeIn_150ms_ease-out]"
                aria-hidden="true"
                onClick={() => setOpen(false)}
              />

              {/* Dropdown panel */}
              <div
                ref={panelRef}
                role="dialog"
                aria-label="Share options"
                className="fixed z-[75] bottom-4 sm:bottom-auto sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/2 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-gray-100 bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden animate-[modalSlide_180ms_ease-out]"
              >
                {/* ── Header ── */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    {headerTitle}
                  </span>
                  <button
                    type="button"
                    aria-label="Close share menu"
                    onClick={() => setOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    <X size={15} strokeWidth={2.2} />
                  </button>
                </div>

                {/* ── Link Preview Card ── */}
                <div className="mx-3.5 my-3 flex items-center gap-3 rounded-xl border border-gray-200/80 bg-gray-50/80 p-2.5 overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200">
                    {image ? (
                      <Image
                        src={image}
                        alt={title || "Preview"}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <Share2 size={18} />
                      </div>
                    )}
                  </div>

                  {/* Text + site logo */}
                  <div className="flex-1 min-w-0">
                    {title && (
                      <p className="text-xs font-medium text-gray-900 line-clamp-2 leading-snug mb-0.5">
                        {title}
                      </p>
                    )}
                    {location && (
                      <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mb-1">
                        <FaLocationDot size={10} className="shrink-0 text-[#0fa353]" />
                        <span className="truncate">{location}</span>
                      </p>
                    )}
                    <div className="flex items-center gap-1.5">
                      <div className="relative h-3.5 w-3.5 shrink-0 rounded-xs overflow-hidden">
                        <Image
                          src="/logo/favicon-32x32.png"
                          alt="A2Z Solar"
                          width={14}
                          height={14}
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <span className="text-[11px] text-gray-400 font-normal truncate">
                        {displayDomain}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Share options ── */}
                <div className="p-2 pt-0 space-y-1">
                  {/* WhatsApp */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50/70 hover:text-emerald-800 transition-colors no-underline"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <FaWhatsapp size={16} />
                    </span>
                    <span>Share on WhatsApp</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50/70 hover:text-blue-700 transition-colors no-underline"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <FaFacebook size={15} />
                    </span>
                    <span>Share on Facebook</span>
                  </a>

                  {/* Copy Link */}
                  <button
                    type="button"
                    onClick={copyLink}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      copied
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100/80"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        copied
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {copied ? (
                        <Check size={15} strokeWidth={2.5} />
                      ) : (
                        <Link2 size={15} strokeWidth={2} />
                      )}
                    </span>
                    <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                  </button>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
