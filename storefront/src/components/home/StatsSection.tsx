"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  TrendingUp, 
  ShoppingBag, 
  Target 
} from "lucide-react";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  id: string;
  targetNum: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  progressPercent: number; // For SVG ring offset (0 to 100)
  spinDuration: number;
}

const STATS_DATA: StatItem[] = [
  {
    id: "experience",
    targetNum: 10,
    suffix: "+",
    label: "ســـنـــوات خـــبـــرة",
    subtitle: "في التسويق الرقمي وتوسيع المتاجر",
    icon: Calendar,
    progressPercent: 95,
    spinDuration: 7,
  },
  {
    id: "revenue",
    targetNum: 14.8,
    suffix: "M+",
    prefix: "EGP ",
    decimals: 1,
    label: "إيـــرادات مـــحـــقـــقـــة",
    subtitle: "مبيعات موثقة ومحققة للمتاجر",
    icon: TrendingUp,
    progressPercent: 98,
    spinDuration: 6,
  },
  {
    id: "orders",
    targetNum: 36.3,
    suffix: "K+",
    decimals: 1,
    label: "طـــلـــب مـــعـــالـــج",
    subtitle: "طلبات معالجة وناجحة (Fulfilled)",
    icon: ShoppingBag,
    progressPercent: 94,
    spinDuration: 8,
  },
  {
    id: "aov",
    targetNum: 407,
    suffix: "+",
    prefix: "EGP ",
    label: "مـــتـــوســـط قـــيـــمـــة الـــطـــلـــب",
    subtitle: "Average Order Value (AOV)",
    icon: Target,
    progressPercent: 90,
    spinDuration: 9,
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = usePauseOffscreen<HTMLDivElement>();
  const [hasAnimated, setHasAnimated] = useState(false);
  const hasAnimatedRef = useRef(false);
  const [counts, setCounts] = useState<number[]>(() => STATS_DATA.map(() => 0));

  useEffect(() => {
    let rafId: number | null = null;
    let lastUpdate = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setHasAnimated(true);

          const startTime = performance.now();
          const duration = 2000; // 2 seconds count up

          const updateCounts = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            if (currentTime - lastUpdate >= 32 || progress >= 1) {
              lastUpdate = currentTime;
              const newCounts = STATS_DATA.map((stat) => {
                return progress >= 1 ? stat.targetNum : stat.targetNum * easeOutProgress;
              });
              setCounts(newCounts);
            }

            if (progress < 1) {
              rafId = requestAnimationFrame(updateCounts);
            } else {
              setCounts(STATS_DATA.map((s) => s.targetNum));
            }
          };

          rafId = requestAnimationFrame(updateCounts);
        }
      },
      { threshold: 0.1 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (currentElem) observer.unobserve(currentElem);
      observer.disconnect();
    };
  }, []);

  const { t } = useLanguage();

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative overflow-hidden pt-8 sm:pt-14 pb-16 sm:pb-24 text-white"
      style={{ background: "#060608" }}
    >
      {/* Background Dot Matrix Pattern like Ahmed Ali's site */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none -z-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,139,44,0.4) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Ambient Mesh Glows */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[450px] h-[450px] bg-[#FF8B2C]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF8B2C]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Decorative Background Artworks */}
      <div
        className="absolute top-8 right-6 w-52 h-52 sm:w-72 sm:h-72 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none rotate-[15deg] -z-10"
        style={{ backgroundImage: `url('/bg-art/logo.png')` }}
      />
      <div
        className="absolute bottom-8 left-6 w-52 h-52 sm:w-68 sm:h-68 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none -rotate-[18deg] -z-10"
        style={{ backgroundImage: `url('/bg-art/social-media.png')` }}
      />

      {/* Seamless Black Gradient Transitions at Top & Bottom */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#060608] via-[#060608]/90 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#060608] via-[#060608]/90 to-transparent pointer-events-none z-10" />

      <div ref={containerRef} className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-12 max-w-[1440px]">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-14 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-wide text-white leading-tight font-serif">
              {t.stats.titlePrefix} <span className="text-[#FF8B2C] drop-shadow-[0_0_24px_rgba(255,139,44,0.45)]">{t.stats.titleHighlight}</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 font-semibold max-w-2xl mx-auto">
              {t.stats.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {STATS_DATA.map((stat, idx) => {
            const IconComponent = stat.icon;
            const currentVal = counts[idx] || 0;
            const formattedVal = stat.decimals 
              ? currentVal.toFixed(stat.decimals) 
              : Math.floor(currentVal).toString();

            // SVG circle math (r = 40, circumference = 2 * PI * 40 = 251.32)
            const circumference = 251.32;
            const strokeDashoffset = hasAnimated
              ? circumference - (stat.progressPercent / 100) * circumference
              : circumference;

            return (
              <ScrollReveal
                key={stat.id}
                direction="up"
                delay={idx * 70}
                className="h-full"
              >
                <div
                  className="relative group rounded-[26px] p-[1.5px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,139,44,0.22)] h-full"
                >
                  {/* Rotating Conic Border Gradient like Ahmed Ali's site */}
                  <div className="absolute inset-0 rounded-[26px] overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute inset-[-50%] w-[200%] h-[200%]"
                      style={{
                        background: "conic-gradient(from 0deg, #FF8B2C, #060608, #FF8B2C, #060608, #FF8B2C)",
                        animation: `spinStatBorder ${stat.spinDuration}s linear infinite`,
                        transformOrigin: "center center",
                      }}
                    />
                  </div>

                  {/* Inner Card Solid Background */}
                  <div className="relative rounded-[25px] p-7 sm:p-9 flex flex-col items-center text-center h-full overflow-hidden bg-[#0e0e14] border border-[#FF8B2C]/20 shadow-2xl">
                    
                    {/* Subtle Top Radial Glow */}
                    <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#FF8B2C]/10 to-transparent pointer-events-none" />

                    {/* Circular SVG Progress Ring with Center Icon */}
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 mb-6 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 88 88">
                        {/* Background Track Ring */}
                        <circle
                          cx="44"
                          cy="44"
                          r="40"
                          fill="none"
                          stroke="#1f1f26"
                          strokeWidth="3.5"
                        />
                        {/* Animated Gold Fill Ring */}
                        <circle
                          cx="44"
                          cy="44"
                          r="40"
                          fill="none"
                          stroke="#FF8B2C"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray="251.32"
                          strokeDashoffset={strokeDashoffset}
                          style={{
                            transition: "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        />
                      </svg>

                      {/* Center Icon */}
                      <div className="relative z-10 w-10 h-10 rounded-full bg-[#060608] border border-[#FF8B2C]/30 flex items-center justify-center text-[#FF8B2C] shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-5 h-5 text-[#FF8B2C]" />
                      </div>
                    </div>

                    {/* Animated Number with Gold Gradient */}
                    <div
                      className="font-black mb-2 tracking-tight"
                      dir="ltr"
                      style={{
                        fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
                        backgroundImage: "linear-gradient(135deg, #ffffff 10%, #FFA857 60%, #FF8B2C 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        lineHeight: "1.2",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {stat.prefix && <span className="text-lg sm:text-xl font-bold">{stat.prefix}</span>}
                      {formattedVal}
                      {stat.suffix && <span className="text-xl sm:text-2xl font-black text-[#FF8B2C]">{stat.suffix}</span>}
                    </div>

                    {/* Main Label */}
                    <h3 className="text-base sm:text-lg font-black text-white mb-1.5 group-hover:text-[#FFA857] transition-colors">
                      {t.stats.items.find((item) => item.id === stat.id)?.label || stat.label}
                    </h3>

                    {/* Subtitle Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
                      {t.stats.items.find((item) => item.id === stat.id)?.subtitle || stat.subtitle}
                    </p>

                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Global Spin Animation Style */}
      <style jsx global>{`
        @keyframes spinStatBorder {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

    </section>
  );
}
