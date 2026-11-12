"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("top");
  const pathname = usePathname();
  const router = useRouter();
  const { lang, isAr, toggleLang, t } = useLanguage();

  const navLinks = useMemo(() => [
    { href: "/", id: "top", label: t.nav.home },
    { href: "/#services", id: "services", label: t.nav.services },
    { href: "/#clients", id: "clients", label: t.nav.clients },
    { href: "/#portfolio", id: "portfolio", label: t.nav.portfolio },
    { href: "/#certificates", id: "certificates", label: t.nav.certificates },
    { href: "/#impact", id: "impact", label: t.nav.stats },
    { href: "/#contact", id: "contact", label: t.nav.contact },
  ], [t.nav]);

  // Active section scroll spy with requestAnimationFrame throttle
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 140;

          if (scrollPos < 400) {
            setActiveSection("top");
            ticking = false;
            return;
          }

          const sections = ["services", "clients", "portfolio", "certificates", "impact", "contact"];
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      const lenisInstance = typeof window !== "undefined" ? (window as unknown as { lenis?: { scrollTo: (target: number | HTMLElement, options?: { duration?: number; offset?: number; immediate?: boolean }) => void } }).lenis : null;

      if (id === "top") {
        if (lenisInstance) {
          lenisInstance.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        setActiveSection("top");
        window.history.pushState(null, "", "/");
      } else {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 85;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          if (lenisInstance) {
            lenisInstance.scrollTo(offsetPosition, { duration: 1.2 });
          } else {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
          setActiveSection(id);
          window.history.pushState(null, "", `#${id}`);
        }
      }
    } else {
      if (id && id !== "top") {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("scroll_to_section", id);
        }
      }
      setIsMobileMenuOpen(false);
      router.push(href);
    }
  };

  // Hide header on Admin routes (after all hooks have executed)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed top-2 sm:top-3 inset-x-0 z-50 w-full px-2.5 sm:px-5 max-w-[1400px] mx-auto">
      {/* Main Header Capsule */}
      <header className="relative w-full rounded-2xl sm:rounded-full border border-[#FF8B2C]/25 bg-[#0b0b10]/92 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all">
        <div className="px-3.5 sm:px-5 lg:px-6">
          <div className="flex h-12 sm:h-13 lg:h-14 items-center justify-between gap-2.5 sm:gap-4 relative">
            
            {/* Logo Text: "ابراهيم علي سليم" / "Ibrahim Ali Slim" */}
            <div className="flex-shrink-0 z-10 flex items-center">
              <Link 
                href="/" 
                onClick={(e) => handleNavClick(e, "/", "top")}
                className="flex items-center hover:opacity-90 transition-opacity py-0.5 group"
              >
                <span className="text-xs xs:text-sm sm:text-base lg:text-[17px] font-black text-white tracking-normal sm:tracking-wide group-hover:text-[#FF8B2C] transition-colors whitespace-nowrap">
                  {isAr ? (
                    <>ابـــراهـــيــــم عـــــلــــي <span className="text-[#FF8B2C] drop-shadow-[0_0_12px_rgba(255,139,44,0.55)]">ســـلـــيـــم</span></>
                  ) : (
                    <>Ibrahim Ali <span className="text-[#FF8B2C] drop-shadow-[0_0_12px_rgba(255,139,44,0.55)]">Slim</span></>
                  )}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links (Distinguished Purely by Color, No Lines) */}
            <nav className="hidden lg:flex items-center justify-center flex-grow gap-2 xl:gap-4.5 2xl:gap-6 py-0.5 px-1 sm:px-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`relative py-1 text-[11px] xl:text-[12.5px] 2xl:text-[13.5px] font-bold transition-all duration-300 whitespace-nowrap group ${
                      isActive
                        ? "text-[#FF8B2C] font-black drop-shadow-[0_0_14px_rgba(255,139,44,0.65)] scale-105"
                        : "text-zinc-300 hover:text-[#FF8B2C]"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher & Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2.5 z-10 shrink-0">
              <button
                type="button"
                onClick={toggleLang}
                aria-label={isAr ? "تبديل إلى الإنجليزية" : "Switch to Arabic"}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/10 bg-white/5 hover:border-[#FF8B2C]/50 hover:bg-[#FF8B2C]/10 text-zinc-300 hover:text-[#FF8B2C] transition-all cursor-pointer select-none"
              >
                <Globe className="w-3 h-3 text-[#FF8B2C]" />
                <span className="font-mono">{isAr ? "EN" : "عربي"}</span>
              </button>

              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, "/#contact", "contact")}
                className="px-3.5 py-1 rounded-full text-[11px] font-black bg-[#FF8B2C] text-[#060608] hover:bg-[#FFA857] transition-all shadow-[0_2px_12px_rgba(255,139,44,0.35)] hover:scale-105"
              >
                {t.common.contactNow}
              </Link>
            </div>

            {/* Mobile Actions: Language + Hamburger */}
            <div className="flex items-center gap-1.5 lg:hidden z-30">
              {/* Mobile Language Switcher */}
              <button
                type="button"
                onClick={toggleLang}
                aria-label={isAr ? "تبديل إلى الإنجليزية" : "Switch to Arabic"}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border border-white/10 bg-white/5 text-zinc-300 active:text-[#FF8B2C]"
              >
                <Globe className="w-3 h-3 text-[#FF8B2C]" />
                <span className="font-mono">{isAr ? "EN" : "عربي"}</span>
              </button>

              {/* Hamburger Button with Smooth Icon Animation */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen((prev) => !prev);
                }}
                aria-label="القائمة الرئيسية"
                className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all duration-300 cursor-pointer select-none overflow-hidden ${
                  isMobileMenuOpen 
                    ? "border-[#FF8B2C] bg-[#FF8B2C]/15 text-[#FF8B2C] shadow-[0_0_12px_rgba(255,139,44,0.3)]" 
                    : "border-white/10 bg-white/5 text-zinc-200 active:text-[#FF8B2C]"
                }`}
              >
                <div className={`transition-all duration-300 transform ${isMobileMenuOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"}`}>
                  {isMobileMenuOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu with Rich Smooth Animation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen 
              ? "max-h-[420px] opacity-100 border-t border-white/10" 
              : "max-h-0 opacity-0 border-t-0 pointer-events-none"
          } bg-[#0c0c12]/98 backdrop-blur-3xl rounded-b-2xl shadow-2xl`}
        >
          <div className="p-4 space-y-1.5">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${idx * 40}ms` : "0ms",
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${isAr ? "text-right" : "text-left"} ${
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  } ${
                    isActive
                      ? "bg-[#FF8B2C]/15 text-[#FF8B2C] border-r-4 border-[#FF8B2C] font-black shadow-inner"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#FF8B2C] shadow-[0_0_8px_#FF8B2C]" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Menu Bottom Direct CTA Button */}
            <div className="pt-3 border-t border-white/10">
              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, "/#contact", "contact")}
                className="flex items-center justify-center w-full py-2.5 rounded-xl bg-[#FF8B2C] text-[#060608] text-xs font-black hover:bg-[#FFA857] transition-all shadow-[0_4px_20px_rgba(255,139,44,0.35)]"
              >
                {t.common.connectWithIbrahim}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

