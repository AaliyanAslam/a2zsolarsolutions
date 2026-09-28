"use client";

import { FaGear, FaFloppyDisk } from "react-icons/fa6";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-2 sm:px-4 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500 mt-1">
            General portal preferences and business contact configurations.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs">
          <FaFloppyDisk size={12} />
          Save Changes
        </button>
      </div>

      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-4 max-w-xl">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Company Name
          </label>
          <input
            type="text"
            defaultValue="A2Z Solar Solutions"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-green-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            WhatsApp Business Number
          </label>
          <input
            type="text"
            defaultValue="+92 321 4189298"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-green-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Official Email
          </label>
          <input
            type="email"
            defaultValue="a2zsolar@gmail.com"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-green-500 focus:bg-white transition-all"
          />
        </div>
      </div>
    </div>
  );
}
