"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useContactSettings } from "@/context/ContactSettingsContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { getWhatsAppUrl } = useContactSettings();
  const { isAr, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="w-full bg-transparent text-white pt-10 sm:pt-12 pb-6 mt-auto relative z-10 overflow-hidden">
      {/* Seamless Black Gradient Transition at Top */}
      <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-[#060608] via-[#060608]/80 to-transparent pointer-events-none z-[2]" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Main 4-Column Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pb-7 border-b border-white/5 ${isAr ? "text-right" : "text-left"}`}>
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-2.5">
            <Link
              href="/"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <span className="text-base sm:text-lg font-black text-white tracking-wide">
                {isAr ? (
                  <>ابـــراهـــيــــم عـــــلــــي <span className="text-[#FF8B2C] drop-shadow-[0_0_12px_rgba(255,139,44,0.55)]">ســـلـــيـــم</span></>
                ) : (
                  <>Ibrahim Ali <span className="text-[#FF8B2C] drop-shadow-[0_0_12px_rgba(255,139,44,0.55)]">Slim</span></>
                )}
              </span>
            </Link>
            <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed max-w-xs font-medium">
              {t.footer.bio}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#FF8B2C] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{t.footer.provenResults}</span>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-white tracking-wide">{t.footer.servicesTitle}</h3>
            <ul className="space-y-1.5 text-[11px] font-bold text-zinc-400">
              {t.footer.servicesLinks.map((serviceName, idx) => (
                <li key={idx}>
                  <Link href="/#services" className="hover:text-[#FF8B2C] transition-colors flex items-center gap-1">
                    <span>{serviceName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-white tracking-wide">{t.footer.quickLinksTitle}</h3>
            <ul className="space-y-1.5 text-[11px] font-bold text-zinc-400">
              <li>
                <Link href="/" className="hover:text-[#FF8B2C] transition-colors flex items-center gap-1">
                  <span>{t.nav.home}</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#FF8B2C] transition-colors flex items-center gap-1">
                  <span>{t.nav.services}</span>
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-[#FF8B2C] transition-colors flex items-center gap-1">
                  <span>{t.nav.portfolio}</span>
                </Link>
              </li>
              <li>
                <Link href="/#certificates" className="hover:text-[#FF8B2C] transition-colors flex items-center gap-1">
                  <span>{t.nav.certificates}</span>
                </Link>
              </li>
              <li>
                <Link href="/#impact" className="hover:text-[#FF8B2C] transition-colors flex items-center gap-1">
                  <span>{t.nav.stats}</span>
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FF8B2C] transition-colors flex items-center gap-1">
                  <span>{t.nav.contact}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Direct Consultation */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-white tracking-wide">{t.footer.contactTitle}</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
              {t.footer.availableForConsultations}
            </p>
            
            <a
              href={getWhatsAppUrl(t.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/40 text-[#25d366] text-[11px] font-black transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isAr ? "محادثة فورية عبر واتساب" : "Chat on WhatsApp"}</span>
            </a>

            <div className="flex items-center gap-2 pt-0.5">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF8B2C] hover:text-[#FFA857] transition-colors"
              >
                <span>{isAr ? "حجز جلسة استراتيجية" : "Book Strategy Session"}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Rights Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-zinc-400 font-medium">
          <p>
            {isAr
              ? `جميع الحقوق محفوظة © ${currentYear} إبراهيم علي سليم | خبير التسويق الرقمي وتوسيع المتاجر.`
              : `All rights reserved © ${currentYear} Ibrahim Ali Slim | Performance Marketer & Creative Strategist.`}
          </p>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="text-[#FF8B2C] font-bold">●</span>
            <span>{isAr ? "جاهز لاستقبال المشروعات والشراكات الجديدة" : "Available for new projects & partnerships"}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}


