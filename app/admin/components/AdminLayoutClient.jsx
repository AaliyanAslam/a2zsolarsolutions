"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminAuthProvider, ProtectedRoute } from "./AdminAuth";
import AdminTopbar from "./AdminTopbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutClient({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page (/admin), don't show the dashboard sidebar and topbar
  const isLoginPage = pathname === "/admin";

  if (isLoginPage) {
    return <AdminAuthProvider>{children}</AdminAuthProvider>;
  }

  return (
    <AdminAuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans text-gray-800 antialiased">
          {/* Top Bar matching Hostinger */}
          <AdminTopbar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          <div className="flex flex-1 relative">
            {/* Sidebar matching Hostinger */}
            <AdminSidebar
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Main Content Area */}
            <main className="flex-1 lg:pl-60 pt-16 min-h-screen bg-[#fcfcfd] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </AdminAuthProvider>
  );
}
