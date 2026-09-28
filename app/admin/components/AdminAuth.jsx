"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

const ADMIN_EMAIL = "a2zsolar@gmail.com";
const ADMIN_PASS = "12345";

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("a2z_admin_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.email === ADMIN_EMAIL) {
          setIsAuthenticated(true);
          setAdminUser(parsed);
        }
      } catch {
        localStorage.removeItem("a2z_admin_auth");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      const user = { email, name: "A2Z Solar Solutions", role: "Admin", loginAt: new Date().toISOString() };
      localStorage.setItem("a2z_admin_auth", JSON.stringify(user));
      setAdminUser(user);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("a2z_admin_auth");
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return children;
}
