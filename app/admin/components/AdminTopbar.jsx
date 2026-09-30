"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminAuth } from "./AdminAuth";
import {
  FaRegUser,
  FaBars,
  FaXmark,
  FaArrowRightFromBracket,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

export default function AdminTopbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { adminUser, logout } = useAdminAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white text-gray-800 z-40 flex items-center justify-between px-3 sm:px-6 select-none border-b border-gray-200/80 shadow-xs">
      {/* Left: Hamburger (mobile) + Real A2Z Solar Logo */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <FaXmark size={18} /> : <FaBars size={18} />}
        </button>

        {/* Real Logo /logo/a2zlogo.webp */}
        <Link
          href="/admin/dashboard"
          className="flex items-center shrink-0 group py-1"
          title="A2Z Solar Dashboard"
        >
          <div className="relative w-32 sm:w-36 h-9 sm:h-10 flex items-center">
            <Image
              src="/logo/a2zlogo.webp"
              alt="A to Z Solar Solutions Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Right: View Website Link + User Profile Dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* View Website Link */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-xs font-semibold text-gray-700 hover:text-[#0fa353] transition-all whitespace-nowrap shrink-0"
        >
          <span className="whitespace-nowrap">View Website</span>
          <FaArrowUpRightFromSquare size={10} className="text-gray-400 group-hover:text-[#0fa353] shrink-0" />
        </Link>

        {/* User Profile Avatar with Outline */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-9 h-9 rounded-full border border-gray-200 hover:border-emerald-500 bg-gray-50 hover:bg-emerald-50 flex items-center justify-center text-gray-600 hover:text-[#0fa353] transition-all shrink-0 shadow-2xs"
            aria-label="Admin Profile"
          >
            <FaRegUser size={13} />
          </button>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {adminUser?.name || "A2Z Solar Solutions"}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {adminUser?.email || "a2zsolar@gmail.com"}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#0fa353] border border-emerald-200 whitespace-nowrap">
                  Admin Portal
                </span>
              </div>

              <Link
                href="/admin/dashboard"
                onClick={() => setProfileDropdownOpen(false)}
                className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#0fa353] transition-colors whitespace-nowrap"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                onClick={() => setProfileDropdownOpen(false)}
                className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#0fa353] transition-colors whitespace-nowrap"
              >
                Solar Projects
              </Link>
              <Link
                href="/admin/documents"
                onClick={() => setProfileDropdownOpen(false)}
                className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#0fa353] transition-colors whitespace-nowrap"
              >
                Documents &amp; PDFs
              </Link>
              <Link
                href="/admin/videos"
                onClick={() => setProfileDropdownOpen(false)}
                className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#0fa353] transition-colors whitespace-nowrap"
              >
                YouTube Videos
              </Link>
              <Link
                href="/"
                target="_blank"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center justify-between px-4 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#0fa353] transition-colors whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Live Website</span>
                <FaArrowUpRightFromSquare size={10} className="text-gray-400" />
              </Link>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap"
                >
                  <FaArrowRightFromBracket size={12} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
