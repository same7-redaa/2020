"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  ExternalLink, 
  X
} from "lucide-react";
import { GalleryProject } from "@/data/portfolioData";
import { usePortfolio, getYouTubeEmbedUrl } from "@/context/PortfolioContext";

interface CategoryCoverflowGalleryProps {
  projects: GalleryProject[];
  categoryTitle: string;
  categorySlug: string;
}

export default function CategoryCoverflowGallery({
  projects: initialProjects,
  categorySlug,
}: CategoryCoverflowGalleryProps) {
  const { getProjects } = usePortfolio();
  const liveProjects = categorySlug ? getProjects(categorySlug) : initialProjects;
  const projects = liveProjects !== undefined ? liveProjects : initialProjects;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const handleNext = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Touch Swipe
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
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Lock scroll on modal
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

  if (!projects || projects.length === 0) {
    return null;
  }

  const currentProject = projects[activeIndex] || projects[0];
  const embedUrl = selectedProject?.videoUrl ? getYouTubeEmbedUrl(selectedProject.videoUrl) : null;

  return (
    <div className="relative w-full py-6 select-none">
      {/* Ambient Crimson / Orange 3D Stage Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-r from-[#FF8B2C]/20 via-[#ff3b30]/15 to-[#FF8B2C]/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* 3D Coverflow Carousel Stage */}
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
            let offset = idx - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCenter = offset === 0;
            const isLeft = offset === -1 || (count === 2 && offset === 1 && activeIndex === 0);
            const isRight = offset === 1;

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
              transformStyle = "translateX(-60%) translateZ(-30px) scale(0.84) rotateY(28deg)";
              zIndex = 20;
              opacity = 0.88;
              pointerEvents = "auto";
            } else if (isRight) {
              transformStyle = "translateX(60%) translateZ(-30px) scale(0.84) rotateY(-28deg)";
              zIndex = 20;
              opacity = 0.88;
              pointerEvents = "auto";
            } else {
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
                  unoptimized={project.image.startsWith("data:")}
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px"
                  className={`object-cover object-center transition-transform duration-700 ease-out ${
                    isCenter ? "group-hover:scale-106" : "scale-100"
                  }`}
                  priority={isCenter && idx === 0}
                />

                {/* Subtle Ambient Vignette Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isCenter
                      ? "bg-gradient-to-t from-[#060608]/40 via-transparent to-transparent group-hover:opacity-60"
                      : "bg-[#060608]/40"
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
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

      {/* Metrics Row (if available) */}
      {(currentProject.salesGrowth || currentProject.conversionRate || currentProject.ordersCount) && (
        <div className="max-w-xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 px-4">
          {currentProject.salesGrowth && (
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-[#FF8B2C]/30 flex flex-col justify-center text-center">
              <span className="text-[10px] text-zinc-400 font-bold">نمو المبيعات</span>
              <span className="text-sm sm:text-base font-black text-[#FF8B2C]">
                {currentProject.salesGrowth}
              </span>
            </div>
          )}
          {currentProject.conversionRate && (
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-center text-center">
              <span className="text-[10px] text-zinc-400 font-bold">معدل التحويل</span>
              <span className="text-sm sm:text-base font-black text-white">
                {currentProject.conversionRate}
              </span>
            </div>
          )}
          {currentProject.ordersCount && (
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-center text-center">
              <span className="text-[10px] text-zinc-400 font-bold">إجمالي الطلبات</span>
              <span className="text-sm sm:text-base font-black text-white">
                {currentProject.ordersCount}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
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
