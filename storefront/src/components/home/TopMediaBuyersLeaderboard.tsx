"use client";

import React from "react";
import Image from "next/image";
import styles from "./TopMediaBuyersLeaderboard.module.css";
import { useLanguage } from "@/context/LanguageContext";

// 24 background card tiles for a dense luxury wallpaper across the entire section
const BG_CARD_INDEXES = Array.from({ length: 24 }, (_, i) => i);

export default function TopMediaBuyersLeaderboard() {
  const { isAr, t } = useLanguage();

  return (
    <section id="leaderboard" className="w-full py-14 sm:py-20 relative overflow-hidden bg-[#060608] select-none flex flex-col justify-center items-center">
      
      {/* Seamless Top & Bottom Fade Transitions */}
      <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-[#060608] via-[#060608]/90 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#060608] via-[#060608]/90 to-transparent pointer-events-none z-20" />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-[#654a9e]/15 via-[#2563EB]/12 to-[#FF8B2C]/15 rounded-full blur-[160px] pointer-events-none z-10" />

      {/* Full Dense Section Background Cards Grid */}
      <div className={styles.backgroundCardsGrid}>
        {BG_CARD_INDEXES.map((idx) => (
          <div key={`bg-card-${idx}`} className={styles.gridCardItem}>
            <Image
              src="/portfolio/top-ranked-card.png"
              alt="Top Ranked Contributor Card"
              width={280}
              height={180}
              className="w-full h-auto object-cover opacity-90"
              priority={idx < 6}
            />
          </div>
        ))}
      </div>

      {/* Simple Luxury Section Header */}
      <div className="text-center mb-8 sm:mb-10 relative z-20 px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-serif">
          {t.leaderboard.titlePrefix} <span className="text-[#FF8B2C] drop-shadow-[0_0_24px_rgba(255,139,44,0.4)]">{t.leaderboard.titleHighlight}</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-medium">
          {t.leaderboard.subtitle}
        </p>
      </div>

      {/* Figma Selection Wrapper */}
      <div className={styles.wrapper}>
        
        <div className={styles.selectionFrame}>
          
          {/* Content inside the Figma selection */}
          <div className="flex flex-col items-center text-center px-6 py-6 sm:px-10 sm:py-8 gap-2.5 relative z-10">
            
            {/* Vondera Platform Logo */}
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(101,74,158,0.45)] flex-shrink-0 mb-1">
              <Image
                src="/hero-icons/salla-logo.svg"
                alt="Vondera Logo"
                width={52}
                height={52}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Title: TOP #1 MEDIA BUYER */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider leading-tight">
              TOP #1 MEDIA BUYER
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-base font-extrabold text-[#3B82F6] flex items-center justify-center gap-2">
              <span>{isAr ? "الـــتـــوب #1 فـــي فـــونـــديـــرا" : "TOP #1 ON VONDERA"}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-white/90">{isAr ? "إبـــراهـــيـــم ســـلـــيـــم" : "Ibrahim Slim"}</span>
            </p>
          </div>

          {/* 8 Figma Anchor Resize Handles */}
          <div className={styles.handlesContainer}>
            {/* 4 Corners */}
            <span className={`${styles.handle} ${styles.tl}`} />
            <span className={`${styles.handle} ${styles.tr}`} />
            <span className={`${styles.handle} ${styles.bl}`} />
            <span className={`${styles.handle} ${styles.br}`} />
            {/* 4 Midpoints */}
            <span className={`${styles.handle} ${styles.tc}`} />
            <span className={`${styles.handle} ${styles.bc}`} />
            <span className={`${styles.handle} ${styles.ml}`} />
            <span className={`${styles.handle} ${styles.mr}`} />
          </div>

          {/* Animated Fast Figma Cursor */}
          <div className={styles.figmaCursor}>
            {/* Cursor Vector Arrow */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              <path
                d="M5 3L19 12L12 14L9 21L5 3Z"
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* User Name Pill Tag */}
            <div className={styles.cursorTag}>
              <span>Ibrahim Slim</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
