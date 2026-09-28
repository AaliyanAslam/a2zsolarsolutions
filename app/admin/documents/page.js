"use client";

import { FaFilePdf, FaUpload } from "react-icons/fa6";

export default function DocumentsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-2 sm:px-4 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents & PDFs</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage company brochures, warranties, and inverter datasheets.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs">
          <FaUpload size={12} />
          Upload Document
        </button>
      </div>

      <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <FaFilePdf size={24} />
        </div>
        <h3 className="text-sm font-bold text-gray-900">No documents uploaded yet</h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          When you connect your backend, all customer PDF reports and solar datasheets will appear here.
        </p>
      </div>
    </div>
  );
}
