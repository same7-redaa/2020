"use client";

import React, { useState, useEffect } from "react";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check existing auth session
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/login");
        // The server decides: the session cookie is checked by /api/auth/login.
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("يرجى كتابة كلمة المرور");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) localStorage.setItem("ibrahim_admin_token", data.token);
        setIsAuthenticated(true);
      } else {
        setError(data.message || "كلمة المرور غير صحيحة");
      }
    } catch {
      setError("فشل الاتصال بالخادم، يرجى المحاولة لاحقاً");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#060608] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#FF8B2C] border-t-transparent animate-spin" />
          <p className="text-xs font-bold text-zinc-400">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-[#FF8B2C]/30 selection:text-white">
        {/* Background Ambience */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF8B2C]/10 rounded-full blur-[180px] pointer-events-none -z-10" />

        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c16] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
            
            {/* Header Icon & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#FF8B2C]/15 border border-[#FF8B2C]/40 flex items-center justify-center text-[#FF8B2C] mx-auto mb-4 shadow-[0_0_30px_rgba(255,139,44,0.3)]">
                <Lock className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight mb-2">
                لوحة تحكم معرض الأعمال
              </h1>
              <p className="text-xs text-zinc-400 font-normal">
                الوصول محمي. يرجى إدخال كلمة المرور للمتابعة.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2">
                  كلمة مرور لوحة التحكم:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3.5 pr-10 pl-11 rounded-2xl bg-[#141420] border border-white/15 text-white font-mono text-sm focus:border-[#FF8B2C] outline-none transition-all placeholder:text-zinc-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-[#FF8B2C] hover:bg-[#FFA857] text-[#060608] font-black text-sm shadow-[0_4px_25px_rgba(255,139,44,0.35)] transition-all cursor-pointer hover:scale-[1.02] active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-[#060608] border-t-transparent animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                    <span>تسجيل الدخول للأدمن</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#FF8B2C] transition-colors font-bold"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>العودة للموقع الرئيسي</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
