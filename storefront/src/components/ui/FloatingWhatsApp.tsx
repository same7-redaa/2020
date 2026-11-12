"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { useContactSettings } from "@/context/ContactSettingsContext";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const { getWhatsAppUrl } = useContactSettings();
  const { t } = useLanguage();
  const whatsappUrl = getWhatsAppUrl(t.whatsapp.defaultMessage);

  // Hide floating WhatsApp on Admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <aside
      aria-label={t.whatsapp.tooltip}
      className="fixed bottom-5 sm:bottom-7 left-5 sm:left-7 z-50 select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center p-1 text-[#25D366] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer drop-shadow-[0_4px_20px_rgba(37,211,102,0.6)]"
        aria-label={t.whatsapp.tooltip}
        title={t.whatsapp.tooltip}
      >
        <span className="sr-only">{t.whatsapp.tooltip}</span>
        <FaWhatsapp className="w-11 h-11 sm:w-13 sm:h-13 filter drop-shadow-[0_4px_16px_rgba(37,211,102,0.7)] transition-transform group-hover:rotate-6" />
      </a>
    </aside>
  );
}
