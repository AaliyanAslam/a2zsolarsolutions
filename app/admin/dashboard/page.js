"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "../components/AdminAuth";
import {
  FaMagnifyingGlass,
  FaArrowUp,
  FaPlus,
  FaMobileScreen,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaYoutube,
  FaFilePdf,
  FaEnvelopeOpenText,
  FaSolarPanel,
} from "react-icons/fa6";

export default function AdminDashboardPage() {
  const { adminUser } = useAdminAuth();
  const [promptText, setPromptText] = useState("");

  const displayName = adminUser?.name || "A2Z Solar Solutions";

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-2 sm:px-4 space-y-10">
      {/* 1. Hero Greeting & Search / Action Bar */}
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight">
          Hi, {displayName}! Where do you want to get started?
        </h1>

        {/* Action / Search Input Bar */}
        <div className="relative flex items-center bg-white border border-gray-200 rounded-full sm:rounded-2xl px-4 py-3 shadow-xs hover:border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
          <div className="text-gray-500 mr-3 shrink-0">
            <FaMagnifyingGlass className="text-sm" />
          </div>

          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Search inquiries, solar calculator leads, or videos..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none pr-2"
          />

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors shrink-0"
              title="Add filter or attachment"
            >
              <FaPlus size={13} />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
              title="Submit"
            >
              <FaArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Your To-Dos Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap">Your to-dos</h2>
          <span className="w-4 h-4 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            1
          </span>
        </div>

        {/* To-Do Item Card */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Dot indicator */}
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 sm:mt-0 shrink-0" />

            {/* Icon Box */}
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shrink-0">
              <FaMobileScreen size={18} />
            </div>

            {/* Content */}
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-gray-900">WhatsApp Inquiries Integration</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect your business WhatsApp number (+92 321 4189298) to receive instant customer solar audit inquiries directly into your admin panel.
              </p>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              Configure WhatsApp
            </button>
            <span className="text-gray-400 p-1 shrink-0">
              <FaCheck size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Recommended For You Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap">Recommended for you</h2>
            <span className="w-4 h-4 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              3
            </span>
          </div>

          {/* Arrow navigation buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 flex items-center justify-center transition-colors shadow-2xs shrink-0"
              aria-label="Previous recommendation"
            >
              <FaChevronLeft size={10} />
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 flex items-center justify-center transition-colors shadow-2xs shrink-0"
              aria-label="Next recommendation"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        </div>

        {/* 3 Recommended Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: YouTube Video Showcase */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col justify-between h-72 shadow-xs relative overflow-hidden group hover:border-gray-300 transition-all">
            <div className="space-y-3 z-10">
              <p className="text-[13px] font-medium text-gray-800 leading-snug">
                Publish and manage your latest rooftop solar system videos on the website homepage.
              </p>
              <Link
                href="/admin/videos"
                className="bg-gray-950 hover:bg-black text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center justify-center whitespace-nowrap shrink-0"
              >
                Manage Videos
              </Link>
            </div>

            {/* Bottom Graphic Mockup */}
            <div className="mt-4 pt-2 -mx-5 -mb-5 bg-gradient-to-t from-red-50/80 to-transparent p-4 flex items-end justify-center relative h-32 overflow-hidden">
              <div className="w-full h-24 bg-gradient-to-r from-red-500 to-rose-600 rounded-t-xl shadow-md p-3 text-white flex flex-col justify-between transform group-hover:scale-102 transition-transform">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80 flex items-center gap-1.5 whitespace-nowrap">
                  <FaYoutube size={14} /> Showcase Library
                </span>
                <div className="text-xs font-bold truncate whitespace-nowrap">YouTube Video Management</div>
              </div>
            </div>
          </div>

          {/* Card 2: Documents & PDFs */}
          <div className="bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7] border border-green-100 rounded-2xl p-5 flex flex-col justify-between h-72 shadow-xs relative overflow-hidden group hover:border-green-200 transition-all">
            <div className="space-y-3 z-10">
              <p className="text-[13px] font-medium text-gray-800 leading-snug">
                Upload solar panel brochures, inverter manuals, and net-metering sanction letters.
              </p>
              <Link
                href="/admin/documents"
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200/80 text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-2xs inline-flex items-center justify-center whitespace-nowrap shrink-0"
              >
                Upload PDFs
              </Link>
            </div>

            {/* Graphic Illustration */}
            <div className="mt-4 -mx-5 -mb-5 flex items-center justify-center relative h-32">
              <div className="w-16 h-16 rounded-2xl bg-white/95 border border-green-200 shadow-lg flex items-center justify-center text-green-600 relative group-hover:scale-105 transition-transform">
                <FaFilePdf size={28} />
              </div>
            </div>
          </div>

          {/* Card 3: Leads & Inquiries */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col justify-between h-72 shadow-xs relative overflow-hidden group hover:border-gray-300 transition-all">
            <div className="space-y-3 z-10">
              <p className="text-[13px] font-medium text-gray-800 leading-snug">
                Review solar calculator estimations and customer consultation inquiries.
              </p>
              <Link
                href="/admin/inquiries"
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200/80 text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-2xs inline-flex items-center justify-center whitespace-nowrap shrink-0"
              >
                View Leads
              </Link>
            </div>

            {/* Illustration */}
            <div className="mt-4 pt-2 -mx-5 -mb-5 bg-gradient-to-t from-gray-50 to-transparent p-4 flex items-end justify-center relative h-32 overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-20 h-24 bg-gray-100 rounded-lg border border-gray-200/70 p-2 flex flex-col items-center justify-center shadow-xs">
                  <FaSolarPanel className="text-xl text-green-600" />
                  <span className="text-[9px] font-bold text-gray-600 mt-1 whitespace-nowrap">Solar Calc</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-md">
                  <FaEnvelopeOpenText size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
