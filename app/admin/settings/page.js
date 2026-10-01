"use client";

import { FaFloppyDisk, FaLock, FaKey, FaCircleCheck } from "react-icons/fa6";
import { useAdminAuth } from "../components/AdminAuth";

export default function SettingsPage() {
  const { adminUser } = useAdminAuth();

  return (
    <div className="max-w-5xl mx-auto py-8 px-2 sm:px-4 space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500 mt-1">
            General portal preferences, business contact, and admin security configurations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert("Settings saved successfully!")}
          className="flex items-center gap-2 bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs active:scale-95"
        >
          <FaFloppyDisk size={12} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Card 1: Business Details */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            Business Information
          </h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="A2Z Solar Solutions"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              WhatsApp Business Number
            </label>
            <input
              type="text"
              defaultValue="+92 321 4189298"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Official Email
            </label>
            <input
              type="email"
              defaultValue="a2zsolar@gmail.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

      
       
      </div>
    </div>
  );
}
