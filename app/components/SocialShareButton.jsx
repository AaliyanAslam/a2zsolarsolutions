"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Share2,
  X,
  Link2,
  Check,
} from "lucide-react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa6";

/**
 * SocialShareButton
 *
 * Props:
 *   title   {string}  – text shown in the native share sheet & WhatsApp message
 *   url     {string}  – URL to share. Defaults to window.location.href (client-side only).
 *   className {string} – extra Tailwind classes on the trigger button
 *   size    {"sm"|"md"|"lg"}
 */
export default function SocialShareButton({
  title = "",
  url,
  className = "",
  size = "md",
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
    // 1. Native Web Share API — preferred on mobile
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      shareUrl
    ) {
      try {
        await navigator.share({ title, url: shareUrl });
        return; // success — no dropdown needed
      } catch (err) {
        // User cancelled — do nothing. Other errors fall through to dropdown.
        if (err?.name === "AbortError") return;
      }
    }
    // 2. Fallback dropdown
    setOpen((prev) => !prev);
  }, [title, shareUrl]);

  // ── copy link ─────────────────────────────────────────────────────────────
  const copyLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback for browsers without clipboard API
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

  // ── size variants ──────────────────────────────────────────────────────────
  const sizeMap = {
    sm: { btn: "h-8 w-8", icon: 14, text: "text-xs", item: "py-2 px-3" },
    md: { btn: "h-9 w-9", icon: 16, text: "text-sm", item: "py-2.5 px-3.5" },
    lg: { btn: "h-10 w-10", icon: 18, text: "text-sm", item: "py-3 px-4" },
  };
  const s = sizeMap[size] || sizeMap.md;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* ── Trigger button ── */}
      <button
        type="button"
        aria-label="Share this product"
        aria-expanded={open}
        onClick={handleShare}
        className={`
          inline-flex items-center justify-center rounded-full
          border border-gray-200 bg-white text-gray-500
          shadow-sm hover:border-[#0fa353] hover:text-[#0fa353] hover:shadow-md
          active:scale-95 transition-all duration-200
          ${s.btn} ${className}
        `}
      >
        <Share2 size={s.icon} strokeWidth={2.2} />
      </button>

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
            className="
              absolute right-0 z-50 mt-2 w-56
              rounded-xl border border-gray-100 bg-white shadow-xl
              ring-1 ring-black/5
              sm:origin-top-right
              max-sm:fixed max-sm:bottom-4 max-sm:left-1/2 max-sm:-translate-x-1/2
              max-sm:right-auto max-sm:w-[calc(100vw-2rem)] max-sm:max-w-xs
            "
          >
            {/* Header */}
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

            {/* Share options */}
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
