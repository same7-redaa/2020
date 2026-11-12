"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { 
  Maximize2, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  ExternalLink 
} from "lucide-react";
import { GalleryProject } from "@/data/portfolioData";
import { usePortfolio, getYouTubeEmbedUrl } from "@/context/PortfolioContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

interface PortfolioGalleryGridProps {
  projects: GalleryProject[];
  categoryTitle: string;
  categorySlug?: string;
}

export default function PortfolioGalleryGrid({
  projects: initialProjects,
  categorySlug,
}: PortfolioGalleryGridProps) {
  const { isAr, t } = useLanguage();
  const { getProjects } = usePortfolio();
  const projects = categorySlug ? getProjects(categorySlug) : initialProjects;

  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const thumbsTrackRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject || projects.length === 0) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  }, [projects, selectedProject]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject || projects.length === 0) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  }, [projects, selectedProject]);

  // Auto-scroll the active thumbnail into the center of the thumbnail strip
  useEffect(() => {
    if (selectedProject) {
      const activeEl = document.getElementById(`thumb-${selectedProject.id}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedProject]);

  // Lock background scroll and Lenis smooth scroll while modal is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (lenis) {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (lenis) {
        lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      if (lenis) {
        lenis.start();
      }
    };
  }, [selectedProject]);

  // Keyboard Navigation: Esc to close, Arrow keys to navigate
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (e.key === "ArrowRight") {
        if (isAr) handlePrev();
        else handleNext();
      } else if (e.key === "ArrowLeft") {
        if (isAr) handleNext();
        else handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNext, handlePrev, isAr]);

  const embedUrl = selectedProject?.videoUrl ? getYouTubeEmbedUrl(selectedProject.videoUrl) : null;

  return (
    <section className="relative w-full py-6 select-none">
      
      {projects.length === 0 ? (
        <div className="w-full py-16 px-4 text-center rounded-3xl bg-[#0c0c14] border border-white/10">
          <p className="text-zinc-400 font-bold text-sm sm:text-base">
            {t.portfolioPage.noProjects}
          </p>
        </div>
      ) : (
        /* Standard Clean Grid Style */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {projects.map((project, idx) => {
          const isStore = Boolean(project.storeUrl);

          const handleCardClick = () => {
            if (project.storeUrl) {
              window.open(project.storeUrl, "_blank", "noopener,noreferrer");
            } else {
              setSelectedProject(project);
            }
          };

          return (
            <ScrollReveal key={project.id} direction="up" delay={idx * 70} blurAmount={10}>
              <div
                onClick={handleCardClick}
                className="group relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d0d14] border-2 border-[#FF8B2C]/30 hover:border-[#FF8B2C] shadow-[0_10px_30px_rgba(0,0,0,0.75)] hover:shadow-[0_20px_50px_rgba(255,139,44,0.3)] transition-all duration-400 hover:-translate-y-2 cursor-pointer"
              >
                {/* Full Image Preview */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized={project.image.startsWith("data:")}
                  priority={idx < 4}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-600 ease-out"
                />

                {/* Video Play Badge Indicator if item has YouTube Video */}
                {project.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#060608]/80 backdrop-blur-md border border-[#FF8B2C] flex items-center justify-center text-[#FF8B2C] shadow-[0_0_25px_rgba(255,139,44,0.5)] group-hover:scale-115 group-hover:bg-[#FF8B2C] group-hover:text-[#060608] transition-all duration-300">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-[-1px]" />
                    </div>
                  </div>
                )}

                {/* Ambient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/95 via-[#060608]/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Action Icon */}
                <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-[#FF8B2C] text-[#060608] flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                  {isStore ? (
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </div>

                {/* Bottom Project Title & Store Visit Action Bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center justify-between gap-3 z-20">
                  <p className="text-xs sm:text-sm font-black text-white group-hover:text-[#FF8B2C] transition-colors leading-snug drop-shadow-md flex-1">
                    {project.title}
                  </p>

                  {project.storeUrl && (
                    <a
                      href={project.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF8B2C] text-[#060608] font-black text-xs hover:bg-[#FFA857] transition-all shadow-[0_4px_16px_rgba(255,139,44,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>{t.portfolioPage.visitStore}</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
      )}

      {/* Screen-Adaptive Interactive Lightbox Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[99999] bg-[#060608]/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-6 select-none animate-in fade-in duration-200"
        >
          {/* Top Bar with Title, Store Link Button & Close Button */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl flex items-center justify-between z-50 pt-2 px-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-black text-white truncate max-w-[200px] sm:max-w-md">
                {selectedProject.title}
              </span>

              {selectedProject.storeUrl && (
                <a
                  href={selectedProject.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF8B2C] text-[#060608] font-bold text-xs hover:bg-[#FFA857] transition-all shadow-md"
                >
                  <span>{t.portfolioPage.visitStore}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              aria-label={t.portfolioPage.close}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF8B2C] text-white hover:text-[#060608] flex items-center justify-center transition-all cursor-pointer shadow-2xl border border-white/15"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Media Box */}
          <div className="relative w-full flex-grow flex items-center justify-center my-auto py-2">
            
            {/* Prev Navigation Arrow */}
            <button
              onClick={isAr ? handlePrev : handleNext}
              aria-label={isAr ? t.portfolioPage.prev : t.portfolioPage.next}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#FF8B2C] text-white hover:text-[#060608] flex items-center justify-center transition-all z-50 cursor-pointer border border-white/15 shadow-2xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Next Navigation Arrow */}
            <button
              onClick={isAr ? handleNext : handlePrev}
              aria-label={isAr ? t.portfolioPage.next : t.portfolioPage.prev}
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
                className="max-h-[62vh] max-w-[92vw] sm:max-w-[700px] w-auto h-auto object-contain rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-white/15 select-none"
              />
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          <div 
            onClick={(e) => e.stopPropagation()}
            ref={thumbsTrackRef}
            className="w-full max-w-4xl py-2 flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar px-4"
          >
            {projects.map((p) => {
              const isSelected = p.id === selectedProject.id;
              return (
                <button
                  key={p.id}
                  id={`thumb-${p.id}`}
                  onClick={() => setSelectedProject(p)}
                  className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-2 border-[#FF8B2C] scale-110 opacity-100 shadow-[0_0_16px_rgba(255,139,44,0.6)] z-10"
                      : "border border-white/15 opacity-50 hover:opacity-90 scale-95"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
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
    </section>
  );
}
