"use client";

import { FaEnvelopeOpenText, FaWhatsapp } from "react-icons/fa6";

export default function InquiriesPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-2 sm:px-4 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads & Inquiries</h1>
          <p className="text-xs text-gray-500 mt-1">
            Customer inquiries received from WhatsApp and website Solar Calculator.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <FaEnvelopeOpenText size={24} />
        </div>
        <h3 className="text-sm font-bold text-gray-900">Inquiries Database Ready</h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Customer leads and WhatsApp consultation requests will sync here once the backend API is connected.
        </p>
      </div>
    </div>
  );
}
