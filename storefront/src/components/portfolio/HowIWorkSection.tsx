"use client";

import React, { useMemo } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export interface HowIWorkStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  chips: {
    label: string;
    tilt: string; // e.g. "-3deg", "2.2deg", "-1.4deg"
    isFilled: boolean;
  }[];
}

interface HowIWorkSectionProps {
  categorySlug?: string;
  customSteps?: HowIWorkStep[];
}

export default function HowIWorkSection({
  categorySlug = "media-buying",
  customSteps,
}: HowIWorkSectionProps) {
  const { isAr, t } = useLanguage();

  const steps = useMemo(() => {
    if (customSteps && customSteps.length > 0) return customSteps;

    const slug = (categorySlug || "media-buying") as keyof typeof t.portfolioPage.workflowSteps;
    const transSteps = t.portfolioPage.workflowSteps[slug] || t.portfolioPage.workflowSteps["media-buying"] || [];

    const defaultTilts = ["-3deg", "2.2deg", "-1.4deg", "2.5deg"];

    return transSteps.map((s) => ({
      number: s.number,
      title: s.title,
      subtitle: s.subtitle,
      description: s.description,
      chips: (s.chips || []).map((label, cIdx) => ({
        label,
        tilt: defaultTilts[cIdx % defaultTilts.length],
        isFilled: cIdx % 2 === 0,
      })),
    }));
  }, [customSteps, categorySlug, t]);

  return (
    <section 
      id="how-i-work" 
      className="relative overflow-hidden py-16 sm:py-24 text-white select-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        
        {/* Section Header */}
        <ScrollReveal direction="up" blurAmount={12}>
          <div className="text-center mb-14 sm:mb-18">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t.portfolioPage.howIWorkTitlePrefix}{" "}
              <span className="text-[#FF8B2C] drop-shadow-[0_0_24px_rgba(255,139,44,0.45)]">
                {t.portfolioPage.howIWorkTitleHighlight}
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Horizontal Timeline Connector Bar (Desktop) */}
        <div className="relative">
          <div 
            className="hidden lg:block absolute top-[48px] right-[10%] left-[10%] h-[2px] pointer-events-none z-0"
            style={{ 
              background: "linear-gradient(90deg, rgba(255,139,44,0.15), #FF8B2C, rgba(255,139,44,0.15))" 
            }} 
          />

          {/* Horizontal 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <ScrollReveal 
                key={step.number} 
                direction="up" 
                delay={idx * 70} 
                blurAmount={10}
                className="h-full"
              >
                <div className={`group relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-6 bg-[#0d0d14] border-2 border-[#FF8B2C]/30 hover:border-[#FF8B2C] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(255,139,44,0.22)] hover:-translate-y-2 flex flex-col justify-between ${isAr ? "text-right" : "text-left"}`}>
                  
                  {/* Subtle Background Glow on Hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                    style={{ background: "radial-gradient(circle at top right, rgba(255,139,44,0.08), transparent 70%)" }} 
                  />

                  <div className="relative z-10">
                    {/* Top Row: Giant Number + Connected Glowing Dot */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="font-black text-5xl sm:text-6xl text-[#FF8B2C] drop-shadow-[0_0_18px_rgba(255,139,44,0.4)] leading-none transition-transform duration-300 group-hover:scale-105">
                        {step.number}
                      </span>
                      
                      {/* Timeline Node Dot */}
                      <div className="w-4 h-4 rounded-full bg-[#0d0d14] border-2 border-[#FF8B2C] shadow-[0_0_10px_#FF8B2C] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8B2C] transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF8B2C] group-hover:bg-[#060608]" />
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1.5 transition-colors duration-300 group-hover:text-[#FF8B2C] leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 text-[#FF8B2C] drop-shadow-[0_0_8px_rgba(255,139,44,0.3)]">
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-normal mb-5">
                      {step.description}
                    </p>
                  </div>

                  {/* Tilted Chips / Pills Row at Bottom of Card */}
                  <div className="relative z-10 flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {step.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all duration-300 ${
                          chip.isFilled
                            ? "bg-[#FF8B2C] text-[#060608] border border-[#FF8B2C] shadow-[0_2px_10px_rgba(255,139,44,0.25)] hover:brightness-110"
                            : "bg-[#FF8B2C]/10 text-[#FF8B2C] border border-[#FF8B2C]/50 hover:border-[#FF8B2C] hover:bg-[#FF8B2C]/20"
                        }`}
                        style={{
                          transform: `rotate(${chip.tilt})`,
                        }}
                      >
                        {chip.label}
                      </span>
                    ))}
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
