"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import styles from "./ClientsTickerSection.module.css";
import { useClientLogos } from "@/context/ClientLogosContext";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { useLanguage } from "@/context/LanguageContext";

export default function ClientsTickerSection() {
  const { t } = useLanguage();
  const { logos } = useClientLogos();
  const sectionRef = usePauseOffscreen<HTMLElement>();

  // If no logos, do not render ticker track or render minimal
  const safeLogos = logos && logos.length > 0 ? logos : [];

  // Split into Row 1 and Row 2 & repeat with memoization
  const { repeatedRow1, repeatedRow2 } = useMemo(() => {
    const row1Items = safeLogos.filter((_, idx) => idx % 2 === 0);
    const row2Items = safeLogos.filter((_, idx) => idx % 2 !== 0);

    const finalRow1 = row1Items.length > 0 ? row1Items : safeLogos;
    const finalRow2 = row2Items.length > 0 ? row2Items : safeLogos;

    return {
      repeatedRow1: [...finalRow1, ...finalRow1, ...finalRow1, ...finalRow1],
      repeatedRow2: [...finalRow2, ...finalRow2, ...finalRow2, ...finalRow2],
    };
  }, [safeLogos]);

  return (
    <section ref={sectionRef} id="clients" className="w-full py-10 sm:py-16 relative overflow-hidden bg-[#060608] select-none">
      
      {/* Seamless Black Gradient Transitions at Top & Bottom */}
      <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#060608] via-[#060608]/90 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#060608] via-[#060608]/90 to-transparent pointer-events-none z-20" />

      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-48 bg-[#FF8B2C]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Concise Header */}
      <div className="text-center mb-8 sm:mb-12 relative z-10 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-serif">
          {t.clients.titlePrefix} <span className="text-[#FF8B2C] drop-shadow-[0_0_25px_rgba(255,139,44,0.4)]">{t.clients.titleHighlight}</span>
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-400/90 font-medium">
          {t.clients.subtitle}
        </p>
      </div>

      {/* Infinite Scrolling Ticker Area */}
      {safeLogos.length > 0 ? (
        <div className="w-full flex flex-col gap-4 sm:gap-6 relative z-10" dir="ltr">
          
          {/* Row 1: Left to Right */}
          <div className={styles.tickerWrapper}>
            {/* Edge Blur Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-48 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-48 bg-gradient-to-l from-[#060608] via-[#060608]/90 to-transparent z-10 pointer-events-none" />

            <div className={styles.tickerTrack}>
              {repeatedRow1.map((item, idx) => (
                <div key={`logo1-${item.id}-${idx}`} className={styles.logoTile} title={item.name || "شريك النجاح"}>
                  <div className={styles.tileGlow} />
                  <Image
                    src={item.image}
                    alt={item.name || "لوجو شريك النجاح"}
                    width={84}
                    height={50}
                    unoptimized={item.image.startsWith("data:")}
                    className={styles.logoImg}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className={styles.tickerWrapper}>
            {/* Edge Blur Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-48 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-48 bg-gradient-to-l from-[#060608] via-[#060608]/90 to-transparent z-10 pointer-events-none" />

            <div className={styles.tickerTrackReverse}>
              {repeatedRow2.map((item, idx) => (
                <div key={`logo2-${item.id}-${idx}`} className={styles.logoTile} title={item.name || "شريك النجاح"}>
                  <div className={styles.tileGlow} />
                  <Image
                    src={item.image}
                    alt={item.name || "لوجو شريك النجاح"}
                    width={84}
                    height={50}
                    unoptimized={item.image.startsWith("data:")}
                    className={styles.logoImg}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-6 text-zinc-500 text-xs">
          لا توجد لوجوهات معروضة حالياً
        </div>
      )}

    </section>
  );
}
