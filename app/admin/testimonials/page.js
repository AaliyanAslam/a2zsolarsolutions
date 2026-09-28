"use client";

import { FaStar, FaPlus } from "react-icons/fa6";

export default function TestimonialsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-2 sm:px-4 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Testimonials</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage customer feedback and solar project reviews displayed on the website.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs">
          <FaPlus size={12} />
          Add Testimonial
        </button>
      </div>

      <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center mx-auto border border-yellow-200">
          <FaStar size={24} />
        </div>
        <h3 className="text-sm font-bold text-gray-900">Testimonials Ready</h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Customer reviews and ratings will be managed here once the backend is linked.
        </p>
      </div>
    </div>
  );
}
