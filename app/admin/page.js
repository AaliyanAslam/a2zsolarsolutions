"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSolarPanel, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

const ADMIN_EMAIL = "a2zsolar@gmail.com";
const ADMIN_PASS = "12345";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      const user = { email, name: "A2Z Solar Solutions", role: "Admin", loginAt: new Date().toISOString() };
      localStorage.setItem("a2z_admin_auth", JSON.stringify(user));
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-green-400 to-green-600 shadow-xl shadow-green-500/20 mb-4">
            <FaSolarPanel className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">A2Z Solar Solutions</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Panel • Secure Access</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to your admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400 font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FaArrowRight size={12} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-400">
              Protected area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
