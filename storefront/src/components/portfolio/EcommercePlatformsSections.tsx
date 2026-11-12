"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  ExternalLink,
  Maximize2,
  Play,
  X
} from "lucide-react";
import { GalleryProject } from "@/data/portfolioData";
import { usePortfolio, getYouTubeEmbedUrl } from "@/context/PortfolioContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function EcommercePlatformsSections({
  allProjects: initialProjects,
}: {
  allProjects: GalleryProject[];
}) {
  const { isAr, t } = useLanguage();
  const { getProjects } = usePortfolio();
  const liveProjects = getProjects("ecommerce-scaling");
  const allProjects = liveProjects !== undefined ? liveProjects : initialProjects;

  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const platforms = useMemo(() => [
    {
      key: "shopify" as const,
      id: "shopify-section",
      deptNumber: isAr ? "قسم 01" : "Dept 01",
      name: t.portfolioPage.platforms.shopify.name,
      enName: t.portfolioPage.platforms.shopify.enName,
      description: t.portfolioPage.platforms.shopify.description,
      logoSrc: "/hero-icons/shopify-social.png",
    },
    {
      key: "easy-orders" as const,
      id: "easy-orders-section",
      deptNumber: isAr ? "قسم 02" : "Dept 02",
      name: t.portfolioPage.platforms.easyOrders.name,
      enName: t.portfolioPage.platforms.easyOrders.enName,
      description: t.portfolioPage.platforms.easyOrders.description,
      logoSrc: "/hero-icons/easy-logo.png",
    },
    {
      key: "vondera" as const,
      id: "vondera-section",
      deptNumber: isAr ? "قسم 03" : "Dept 03",
      name: t.portfolioPage.platforms.vondera.name,
      enName: t.portfolioPage.platforms.vondera.enName,
      description: t.portfolioPage.platforms.vondera.description,
      logoSrc: "/hero-icons/salla-logo.svg",
    },
  ], [isAr, t]);

  // Memoized platform projects map
  const platformProjectsMap = useMemo(() => {
    const shopify: GalleryProject[] = [];
    const easyOrders: GalleryProject[] = [];
    const vondera: GalleryProject[] = [];

    for (const p of allProjects) {
      const pKey = (p.platform || "").toLowerCase();
      if (pKey.includes("shopify") || pKey.includes("شوبيفاي")) {
        shopify.push(p);
      } else if (pKey.includes("easy") || pKey.includes("إيزي") || pKey.includes("ايزي")) {
        easyOrders.push(p);
      } else if (pKey.includes("vondera") || pKey.includes("فونديرا") || pKey.includes("salla") || pKey.includes("سلة")) {
        vondera.push(p);
      }
    }

    return {
      "shopify": shopify,
      "easy-orders": easyOrders,
      "vondera": vondera,
    };
  }, [allProjects]);

  // Lock background scroll on lightbox open
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

  const embedUrl = selectedProject?.videoUrl ? getYouTubeEmbedUrl(selectedProject.videoUrl) : null;

  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* 1. Platform Quick Jump Navigation Bar */}
      <ScrollReveal direction="up" blurAmount={10}>
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-xs font-black text-[#FF8B2C] tracking-wide">
            {isAr ? "انتقال سريع لأقسام المتاجر" : "Quick Jump to Store Platforms"}
          </p>
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0c0c14] border border-[#FF8B2C]/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] gap-2 flex-wrap justify-center">
            {platforms.map((platform) => (
              <a
                key={platform.key}
                href={`#${platform.id}`}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all bg-[#141420] text-zinc-300 hover:text-white hover:bg-[#FF8B2C] hover:text-[#060608] hover:shadow-[0_0_20px_rgba(255,139,44,0.4)] cursor-pointer group"
              >
                <div className="w-5 h-5 rounded-md overflow-hidden bg-white/10 p-0.5 shrink-0 flex items-center justify-center">
                  <Image
                    src={platform.logoSrc}
                    alt={platform.name}
                    width={18}
                    height={18}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>{platform.name.replace(/ـ/g, "")}</span>
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Render 3 Separate Full Sections for Each Platform */}
      {platforms.map((platform) => {
        const platformProjects = platformProjectsMap[platform.key] || [];

        return (
          <section
            key={platform.key}
            id={platform.id}
            className="relative pt-6 pb-8 scroll-mt-28 border-b border-white/10 last:border-b-0"
          >
            {/* Ambient Background Glow for Each Section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#FF8B2C]/10 rounded-full blur-[180px] pointer-events-none -z-10" />

            {/* Platform Section Header */}
            <ScrollReveal direction="up" blurAmount={12}>
              <div className="text-center max-w-3xl mx-auto mb-10">
                {/* Logo & Section Title Centered */}
                <div className="flex items-center justify-center gap-3.5 mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] bg-white/[0.05] backdrop-blur-2xl border border-white/20 flex items-center justify-center p-2.5 shrink-0 shadow-lg group-hover:border-[#FF8B2C] transition-colors">
                    <Image
                      src={platform.logoSrc}
                      alt={platform.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    {platform.name}
                  </h2>
                </div>

                {/* Subtitle / English Name */}
                <p className="text-xs sm:text-sm font-bold text-[#FF8B2C] mb-2 tracking-wide">
                  {platform.enName}
                </p>

                {/* Platform Description */}
                <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto">
                  {platform.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Horizontal Projects */}
            <div className="w-full">
              {platformProjects.length === 0 ? (
                <div className="w-full py-12 px-4 text-center rounded-2xl bg-[#0e0e16] border border-white/10">
                  <p className="text-zinc-400 font-bold text-xs sm:text-sm">
                    {isAr
                      ? `لا توجد أعمال معروضة في ${platform.name.replace(/ـ/g, "")} حالياً.`
                      : `No projects displayed in ${platform.enName} currently.`}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-16 sm:space-y-24 lg:space-y-32">
                {platformProjects.map((project, pIdx) => (
                  <ScrollReveal key={project.id || pIdx} direction="up" blurAmount={8}>
                    <div className="pb-16 sm:pb-24 lg:pb-32 border-b border-white/[0.08] last:border-b-0 last:pb-0 group">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                        {/* Media Column */}
                        <div className="lg:col-span-6 w-full">
                          <div
                            onClick={() => {
                              if (project.videoUrl) {
                                setSelectedProject(project);
                              } else if (project.storeUrl) {
                                window.open(project.storeUrl, "_blank", "noopener,noreferrer");
                              } else {
                                setSelectedProject(project);
                              }
                            }}
                            className="relative w-full aspect-[16/8] sm:aspect-[16/7.5] md:aspect-[16/7] rounded-2xl overflow-hidden bg-[#12121e] border border-white/10 group-hover:border-[#FF8B2C]/60 transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.8)] cursor-pointer"
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              unoptimized={project.image.startsWith("data:")}
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />

                            {project.videoUrl && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/75 backdrop-blur-md border border-[#FF8B2C] flex items-center justify-center text-[#FF8B2C] shadow-[0_0_30px_rgba(255,139,44,0.4)] group-hover:scale-110 transition-transform">
                                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-[-1px]" />
                                </div>
                              </div>
                            )}

                            {/* Subtle Ambient Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                            {/* Floating Lightbox Zoom Trigger */}
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(project);
                                }}
                                aria-label={isAr ? "تكبير الصورة" : "Zoom Image"}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white hover:text-[#060608] hover:bg-[#FF8B2C] hover:border-[#FF8B2C] flex items-center justify-center transition-all shadow-lg cursor-pointer"
                              >
                                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Texts, Metrics, Actions */}
                        <div className={`lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5 ${isAr ? "text-right" : "text-left"}`}>
                          {/* Store Name & Title */}
                          <div>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#FF8B2C] transition-colors leading-tight">
                              {project.storeName || project.title}
                            </h3>
                            {project.storeName && project.title && project.storeName !== project.title && (
                              <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                                {project.title}
                              </p>
                            )}
                          </div>

                          {/* Metrics Row */}
                          {(project.salesGrowth || project.conversionRate || project.ordersCount) && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                              {project.salesGrowth && (
                                <div className={`p-2.5 sm:p-3 rounded-xl bg-[#FF8B2C]/10 border border-[#FF8B2C]/30 ${isAr ? "text-right" : "text-left"}`}>
                                  <p className="text-[10px] sm:text-xs text-zinc-400 font-medium">
                                    {isAr ? "نمو المبيعات" : "Sales Growth"}
                                  </p>
                                  <p className="text-sm sm:text-base font-black text-[#FF8B2C] mt-0.5 tracking-tight">
                                    {project.salesGrowth}
                                  </p>
                                </div>
                              )}
                              {project.conversionRate && (
                                <div className={`p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 ${isAr ? "text-right" : "text-left"}`}>
                                  <p className="text-[10px] sm:text-xs text-zinc-400 font-medium">
                                    {isAr ? "معدل التحويل" : "Conversion Rate"}
                                  </p>
                                  <p className="text-sm sm:text-base font-black text-white mt-0.5 tracking-tight">
                                    {project.conversionRate}
                                  </p>
                                </div>
                              )}
                              {project.ordersCount && (
                                <div className={`p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 ${isAr ? "text-right" : "text-left"}`}>
                                  <p className="text-[10px] sm:text-xs text-zinc-400 font-medium">
                                    {isAr ? "إجمالي الطلبات" : "Total Orders"}
                                  </p>
                                  <p className="text-sm sm:text-base font-black text-zinc-200 mt-0.5 tracking-tight">
                                    {project.ordersCount}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Description if present */}
                          {project.description && (
                            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                              {project.description}
                            </p>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 pt-2 flex-wrap">
                            {project.storeUrl ? (
                              <a
                                href={project.storeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF8B2C] text-[#060608] font-black text-xs sm:text-sm hover:bg-[#FFA857] transition-all shadow-[0_4px_20px_rgba(255,139,44,0.3)] group/btn cursor-pointer"
                              >
                                <span>{isAr ? "زيارة المتجر المباشر" : "Visit Live Store"}</span>
                                <ExternalLink className="w-4 h-4 stroke-[2.5] group-hover/btn:scale-110 transition-transform" />
                              </a>
                            ) : null}

                            <button
                              type="button"
                              onClick={() => setSelectedProject(project)}
                              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                            >
                              {project.videoUrl ? (
                                <>
                                  <Play className="w-4 h-4 fill-current text-[#FF8B2C]" />
                                  <span>{isAr ? "مشاهدة الفيديو" : "Watch Video"}</span>
                                </>
                              ) : (
                                <>
                                  <Maximize2 className="w-4 h-4 text-zinc-300" />
                                  <span>{isAr ? "معاينة تفاصيل المشروع" : "Preview Details"}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              )}
            </div>
          </section>
        );
      })}

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
                {selectedProject.storeName || selectedProject.title}
              </span>
              {selectedProject.storeUrl && (
                <a
                  href={selectedProject.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8B2C] text-[#060608] font-bold text-xs hover:bg-[#FFA857] transition-all shadow-md"
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

          {/* Media Player / Image Stage */}
          <div className="relative w-full flex-grow flex items-center justify-center my-auto py-4">
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
                className="max-h-[60vh] max-w-[90vw] sm:max-w-[700px] w-auto h-auto object-contain rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-white/15 select-none"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
