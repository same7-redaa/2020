"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  ExternalLink, 
  Maximize2, 
  X,
  TrendingUp,
  Film,
  Palette,
  Target,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { PORTFOLIO_DATA, GalleryProject } from "@/data/portfolioData";
import { usePortfolio, getYouTubeEmbedUrl } from "@/context/PortfolioContext";

interface CategoryMeta {
  slug: string;
  departmentNumber: string;
  name: string;
  title: string;
  icon: React.ElementType;
  description: string;
  accent: string;
}

const CATEGORIES: CategoryMeta[] = [
  {
    slug: "media-buying",
    departmentNumber: "قسم 01",
    name: "الميديا باينج",
    title: "إدارة وتوسيع الحملات الممولة",
    icon: TrendingUp,
    description: "إطلاق وإدارة حملات Meta و TikTok و Google Ads بميزانيات ضخمة وعائد ROAS استثنائي.",
    accent: "#FF8B2C",
  },
  {
    slug: "motion-video",
    departmentNumber: "قسم 02",
    name: "الموشن جرافيك",
    title: "الموشن ومونتاج الفيديوهات",
    icon: Film,
    description: "فيديوهات إعلانية وموشن جرافيك 3D للريلز وتيك توك تخطف الانتباه وتحفز الشراء الفوري.",
    accent: "#FF8B2C",
  },
  {
    slug: "social-designs",
    departmentNumber: "قسم 03",
    name: "تصاميم السوشيال",
    title: "تصاميم السوشيال ميديا",
    icon: Palette,
    description: "بوستات وبانرات إعلانية احترافية توقف التمرير وترفع معدلات التفاعل والنقر (CTR).",
    accent: "#FF8B2C",
  },
  {
    slug: "ecommerce-scaling",
    departmentNumber: "قسم 04",
    name: "توسيع المتاجر",
    title: "توسيع المتاجر وهندسة التحويل",
    icon: Target,
    description: "تحسين صفحات الهبوط ومسار الشراء لمضاعفة مبيعات المتاجر الإلكترونية ورفع هوامش الربح.",
    accent: "#FF8B2C",
  },
];

export default function CoverflowGallerySlider({
  initialCategory = "media-buying",
}: {
  initialCategory?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const { getProjects } = usePortfolio();
  const currentCategoryData = PORTFOLIO_DATA[activeCategory];
  const liveProjects = getProjects(activeCategory);
  const projects: GalleryProject[] =
    liveProjects && liveProjects.length > 0
      ? liveProjects
      : currentCategoryData?.galleryProjects || [];

  const currentCatMeta = CATEGORIES.find((c) => c.slug === activeCategory) || CATEGORIES[0];

  // Reset active index when category changes
  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setActiveIndex(0);
  };

  const handleNext = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Touch / Drag handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left in RTL -> next item
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right in RTL -> prev item
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [selectedProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (e.key === "ArrowLeft") {
        handleNext();
      } else if (e.key === "ArrowRight") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const embedUrl = selectedProject?.videoUrl ? getYouTubeEmbedUrl(selectedProject.videoUrl) : null;

  return (
    <div className="relative w-full overflow-hidden select-none py-4">
      {/* Dynamic Crimson / Orange 3D Stage Atmospheric Glow (matching reference image) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-r from-[#FF8B2C]/20 via-[#ff3b30]/15 to-[#FF8B2C]/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* 1. Category Switcher Tabs (4 Departments) */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-14 px-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.slug === activeCategory;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleCategoryChange(cat.slug)}
              className={`group/tab relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-full font-black text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                isActive
                  ? "bg-[#FF8B2C] text-[#060608] shadow-[0_4px_24px_rgba(255,139,44,0.45)] scale-105"
                  : "bg-[#0f0f18] text-zinc-300 hover:text-white border border-white/10 hover:border-[#FF8B2C]/50 hover:bg-[#161624]"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                  isActive ? "bg-black/20 text-[#060608]" : "bg-white/5 text-[#FF8B2C] group-hover/tab:scale-110"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-black/15 text-black" : "bg-white/5 text-zinc-400"
                }`}
              >
                {cat.departmentNumber}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Active Department Header Info & Fast Link */}
      <div className="text-center max-w-2xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8B2C]/10 border border-[#FF8B2C]/30 text-[#FF8B2C] text-xs font-black mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{currentCatMeta.title}</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
          {currentCatMeta.description}
        </p>
      </div>

      {/* 3. Main 3D Coverflow Carousel Stage */}
      <div
        className="relative w-full max-w-5xl mx-auto h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: "1400px" }}
      >
        {/* Previous Navigation Button (Right in RTL) */}
        <button
          onClick={handlePrev}
          aria-label="السابق"
          className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#060608]/85 border-2 border-[#FF8B2C]/50 hover:border-[#FF8B2C] text-[#FF8B2C] hover:text-[#060608] hover:bg-[#FF8B2C] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:scale-110 active:scale-95 cursor-pointer group"
        >
          <ChevronRight className="w-6 h-6 transition-transform group-hover:scale-110" />
        </button>

        {/* Next Navigation Button (Left in RTL) */}
        <button
          onClick={handleNext}
          aria-label="التالي"
          className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#060608]/85 border-2 border-[#FF8B2C]/50 hover:border-[#FF8B2C] text-[#FF8B2C] hover:text-[#060608] hover:bg-[#FF8B2C] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:scale-110 active:scale-95 cursor-pointer group"
        >
          <ChevronLeft className="w-6 h-6 transition-transform group-hover:scale-110" />
        </button>

        {/* 3D Cards Deck */}
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {projects.map((project, idx) => {
            const count = projects.length;
            // Calculate circular offset distance (-2, -1, 0, 1, 2)
            let offset = idx - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCenter = offset === 0;
            const isLeft = offset === -1 || (count === 2 && offset === 1 && activeIndex === 0);
            const isRight = offset === 1;

            // Transform parameters matching the reference 3D Coverflow image
            let transformStyle = "";
            let zIndex = 10;
            let opacity = 0;
            let pointerEvents: "auto" | "none" = "none";

            if (isCenter) {
              transformStyle = "translateX(0%) translateZ(80px) scale(1) rotateY(0deg)";
              zIndex = 35;
              opacity = 1;
              pointerEvents = "auto";
            } else if (isLeft) {
              // Left Card angled into the center
              transformStyle = "translateX(-60%) translateZ(-30px) scale(0.84) rotateY(28deg)";
              zIndex = 20;
              opacity = 0.88;
              pointerEvents = "auto";
            } else if (isRight) {
              // Right Card angled into the center
              transformStyle = "translateX(60%) translateZ(-30px) scale(0.84) rotateY(-28deg)";
              zIndex = 20;
              opacity = 0.88;
              pointerEvents = "auto";
            } else {
              // Farther cards (hidden in 3D depth)
              const dir = offset > 0 ? 1 : -1;
              transformStyle = `translateX(${dir * 110}%) translateZ(-120px) scale(0.65) rotateY(${
                dir * -40
              }deg)`;
              zIndex = 5;
              opacity = 0;
              pointerEvents = "none";
            }

            const handleCardClick = () => {
              if (isCenter) {
                if (project.storeUrl) {
                  window.open(project.storeUrl, "_blank", "noopener,noreferrer");
                } else {
                  setSelectedProject(project);
                }
              } else {
                setActiveIndex(idx);
              }
            };

            return (
              <div
                key={project.id}
                onClick={handleCardClick}
                style={{
                  transform: transformStyle,
                  zIndex,
                  opacity,
                  pointerEvents,
                }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] sm:w-[340px] md:w-[380px] aspect-[4/5] rounded-[26px] sm:rounded-[32px] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group shadow-[0_20px_60px_rgba(0,0,0,0.9)] select-none ${
                  isCenter
                    ? "border-2 border-[#FF8B2C] ring-4 ring-[#FF8B2C]/25 shadow-[0_25px_70px_rgba(255,139,44,0.35)]"
                    : "border-2 border-white/20 hover:border-[#FF8B2C]/60 hover:opacity-100"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px"
                  className={`object-cover object-center transition-transform duration-700 ease-out ${
                    isCenter ? "group-hover:scale-106" : "scale-100"
                  }`}
                  priority={isCenter}
                />

                {/* Dark Vignette Gradient */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isCenter
                      ? "bg-gradient-to-t from-[#060608]/95 via-[#060608]/25 to-black/20 group-hover:from-[#060608]/90"
                      : "bg-gradient-to-t from-[#060608]/95 via-[#060608]/60 to-black/50"
                  }`}
                />

                {/* Video Play Badge if item has YouTube Video */}
                {project.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(255,139,44,0.6)] ${
                        isCenter
                          ? "bg-[#FF8B2C] text-[#060608] scale-100 group-hover:scale-115"
                          : "bg-black/70 text-[#FF8B2C] border border-[#FF8B2C]/50 scale-90"
                      }`}
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-[-1px]" />
                    </div>
                  </div>
                )}

                {/* Top Center Pill Tag */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-[#060608]/80 backdrop-blur-md border border-white/15 text-[11px] font-black text-white">
                    {project.category}
                  </span>

                  {isCenter && (
                    <div className="w-8 h-8 rounded-full bg-[#FF8B2C] text-[#060608] flex items-center justify-center shadow-md">
                      {project.storeUrl ? (
                        <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Title & Action Bar */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20">
                  <h4
                    className={`font-black leading-snug drop-shadow-md transition-colors ${
                      isCenter
                        ? "text-sm sm:text-base text-white group-hover:text-[#FFA857]"
                        : "text-xs sm:text-sm text-zinc-300"
                    }`}
                  >
                    {project.title}
                  </h4>

                  {isCenter && (
                    <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                      <span className="text-[11px] font-bold text-[#FF8B2C]">
                        {project.storeUrl ? "اضغط لزيارة المتجر" : "اضغط للمعاينة والتكبير"}
                      </span>
                      <ArrowLeft className="w-3.5 h-3.5 text-[#FF8B2C] -translate-x-0 group-hover:-translate-x-1.5 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Pagination Dots & Department Full Gallery Link */}
      <div className="mt-8 flex flex-col items-center justify-center gap-5">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`شريحة ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-8 bg-[#FF8B2C] shadow-[0_0_12px_#FF8B2C]"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* CTA to Full Category Page */}
        <Link
          href={`/portfolio/${activeCategory}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#12121e] hover:bg-[#FF8B2C] text-white hover:text-[#060608] border border-[#FF8B2C]/40 hover:border-[#FF8B2C] font-black text-xs sm:text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 group/explore"
        >
          <span>عرض دراسات الحالة والمعرض الكامل لـ {currentCatMeta.name}</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover/explore:-translate-x-1" />
        </Link>
      </div>

      {/* 5. Lightbox Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[99999] bg-[#060608]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 select-none animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl flex items-center justify-between z-50 pt-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-black text-white truncate max-w-[240px] sm:max-w-md">
                {selectedProject.title}
              </span>
              {selectedProject.storeUrl && (
                <a
                  href={selectedProject.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8B2C] text-[#060608] font-bold text-xs hover:bg-[#FFA857] transition-all shadow-md"
                >
                  <span>زيارة المتجر</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              aria-label="إغلاق"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF8B2C] text-white hover:text-[#060608] flex items-center justify-center transition-all cursor-pointer shadow-2xl border border-white/15"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Player / Image Stage */}
          <div className="relative w-full flex-grow flex items-center justify-center my-auto py-4">
            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
                const prevProj = projects[(activeIndex - 1 + projects.length) % projects.length];
                setSelectedProject(prevProj);
              }}
              aria-label="السابق"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#FF8B2C] text-white hover:text-[#060608] flex items-center justify-center transition-all z-50 cursor-pointer border border-white/15 shadow-2xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
                const nextProj = projects[(activeIndex + 1) % projects.length];
                setSelectedProject(nextProj);
              }}
              aria-label="التالي"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#FF8B2C] text-white hover:text-[#060608] flex items-center justify-center transition-all z-50 cursor-pointer border border-white/15 shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {embedUrl ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[850px] aspect-video rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.95)] border border-[#FF8B2C]/40 bg-black"
              >
                <iframe
                  src={embedUrl}
                  title={selectedProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[60vh] max-w-[90vw] sm:max-w-[650px] w-auto h-auto object-contain rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-white/15 select-none"
              />
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl py-2 flex items-center justify-center gap-3 overflow-x-auto no-scrollbar"
          >
            {projects.map((p, idx) => {
              const isSelected = p.id === selectedProject.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProject(p);
                    setActiveIndex(idx);
                  }}
                  className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-2 border-[#FF8B2C] scale-110 opacity-100 shadow-[0_0_16px_rgba(255,139,44,0.6)] z-10"
                      : "border border-white/15 opacity-50 hover:opacity-90 scale-95"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  {p.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Play className="w-3.5 h-3.5 text-[#FF8B2C] fill-current" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
