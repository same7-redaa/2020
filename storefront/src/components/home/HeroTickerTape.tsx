"use client";

import React, { useMemo } from "react";
import { Sparkles, TrendingUp, Zap, Target, Award, Rocket, BarChart2, ShieldCheck, Flame, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ROW_1_ICONS = [TrendingUp, Award, Target, Sparkles, Flame, ShieldCheck, Compass];
const ROW_2_ICONS = [Rocket, TrendingUp, Zap, Target, Award, Sparkles, BarChart2, TrendingUp];

export default function HeroTickerTape() {
  const { t } = useLanguage();

  const repeatedRow1 = useMemo(() => {
    const items = t.hero.tickerRow1.map((item, idx) => ({
      text: item.text,
      icon: ROW_1_ICONS[idx % ROW_1_ICONS.length],
    }));
    return [...items, ...items, ...items];
  }, [t.hero.tickerRow1]);

  const repeatedRow2 = useMemo(() => {
    const items = t.hero.tickerRow2.map((item, idx) => ({
      text: item.text,
      icon: ROW_2_ICONS[idx % ROW_2_ICONS.length],
    }));
    return [...items, ...items, ...items];
  }, [t.hero.tickerRow2]);

  return (
    <div className="relative w-full overflow-hidden py-2 sm:py-3 select-none flex flex-col gap-2.5 sm:gap-3" dir="ltr">
      {/* Side Fade Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#060608] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#060608] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Moving Right */}
      <div className="flex w-max animate-ticker-right hover:[animation-play-state:paused]">
        {repeatedRow1.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`r1-${idx}`}
              className="flex items-center gap-3 sm:gap-4 mx-2 sm:mx-2.5 flex-shrink-0"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/10 border border-white/20 text-white shadow-[0_2px_15px_rgba(0,0,0,0.3)] backdrop-blur-md hover:border-[#FF8B2C] hover:bg-[#FF8B2C]/20 transition-all cursor-default">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFA959] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-display">
                  {item.text}
                </span>
              </div>
              <Sparkles className="w-3 h-3 text-white/40 flex-shrink-0" />
            </div>
          );
        })}
      </div>

      {/* Row 2: Moving Left */}
      <div className="flex w-max animate-ticker-left hover:[animation-play-state:paused]">
        {repeatedRow2.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`r2-${idx}`}
              className="flex items-center gap-3 sm:gap-4 mx-2 sm:mx-2.5 flex-shrink-0"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#FF8B2C]/15 border border-[#FF8B2C]/40 text-white shadow-[0_2px_15px_rgba(255,139,44,0.15)] backdrop-blur-md hover:border-[#FF8B2C] hover:bg-[#FF8B2C]/25 transition-all cursor-default">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF8B2C] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-display">
                  {item.text}
                </span>
              </div>
              <Sparkles className="w-3 h-3 text-[#FF8B2C]/60 flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}


