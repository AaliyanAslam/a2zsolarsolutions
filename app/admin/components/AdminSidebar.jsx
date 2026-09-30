"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "./AdminAuth";
import {
  FaHouse,
  FaYoutube,
  FaFilePdf,
  FaStar,
  FaGear,
  FaArrowRightFromBracket,
  FaSolarPanel,
} from "react-icons/fa6";

export default function AdminSidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const pathname = usePathname();
  const { adminUser, logout } = useAdminAuth();

  const isActive = (href) => {
    if (href === "/admin/dashboard" && (pathname === "/admin/dashboard" || pathname === "/admin")) {
      return true;
    }
    return pathname === href;
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: FaHouse },
    { label: "Recent Projects", href: "/admin/projects", icon: FaSolarPanel, color: "text-emerald-500" },
    { label: "Documents & PDFs", href: "/admin/documents", icon: FaFilePdf, color: "text-amber-500" },
    { label: "YouTube Videos", href: "/admin/videos", icon: FaYoutube, color: "text-red-500" },
    { label: "Testimonials", href: "/admin/testimonials", icon: FaStar, color: "text-yellow-500" },
    { label: "Settings", href: "/admin/settings", icon: FaGear, color: "text-gray-500" },
  ];

  const renderContent = () => (
    <div className="flex flex-col h-full justify-between py-4 px-3 select-none">
      {/* Navigation List */}
      <div className="space-y-1">
        <p className="px-3 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
          Main Menu
        </p>

        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                active
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200/90 font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
              }`}
            >
              <Icon
                className={`text-base shrink-0 ${
                  active
                    ? item.color || "text-green-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              <span className="truncate whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User Info & Sign Out Footer */}
      <div className="pt-4 border-t border-gray-200/70 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 font-bold text-xs flex items-center justify-center border border-green-200 shrink-0">
            {adminUser?.name ? adminUser.name.charAt(0) : "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-gray-900 truncate">
              {adminUser?.name || "A2Z Solar Solutions"}
            </p>
            <p className="text-[10px] text-gray-500 truncate">
              {adminUser?.email || "a2zsolar@gmail.com"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors border border-gray-200/60 hover:border-red-200 whitespace-nowrap"
        >
          <FaArrowRightFromBracket size={12} className="shrink-0" />
          <span className="whitespace-nowrap">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-16 left-0 bottom-0 w-60 bg-[#fbfcfd] border-r border-[#eef0f3] overflow-y-auto select-none z-30">
        {renderContent()}
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 z-50 bg-black/40 backdrop-blur-xs flex"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-64 bg-[#fbfcfd] h-full border-r border-[#eef0f3] overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
}
