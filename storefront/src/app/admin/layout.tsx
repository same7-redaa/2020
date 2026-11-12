import React from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة التحكم | إبراهيم علي سليم",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
