"use client";

import React from "react";
import Image from "next/image";
import styles from "./SocialConnect.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useContactSettings } from "@/context/ContactSettingsContext";
import { useLanguage } from "@/context/LanguageContext";

interface SocialConnectProps {
  id?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  descriptionLines?: string[];
  className?: string;
}

export default function SocialConnect({
  id = "contact",
  titlePrefix,
  titleHighlight,
  description,
  descriptionLines,
  className = "",
}: SocialConnectProps) {
  const { settings, getWhatsAppUrl } = useContactSettings();
  const { t } = useLanguage();

  const finalTitlePrefix = titlePrefix || t.social.titlePrefix;
  const finalTitleHighlight = titleHighlight || t.social.titleHighlight;
  const finalLines = descriptionLines || (description ? description.split("\n") : t.social.descriptionLines);

  return (
    <section 
      id={id} 
      className={`relative w-full py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 text-white overflow-hidden scroll-mt-24 ${className}`}
    >
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#FF8B2C]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#FF8B2C]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Decorative Background Artworks */}
      <div
        className="absolute top-8 -left-8 w-52 h-52 sm:w-80 sm:h-80 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none -rotate-[15deg] -z-10"
        style={{ backgroundImage: `url('/bg-art/facebook-page.png')` }}
      />
      <div
        className="absolute top-4 -right-6 w-40 h-40 sm:w-64 sm:h-64 bg-contain bg-no-repeat opacity-12 mix-blend-screen pointer-events-none rotate-[30deg] -z-10"
        style={{ backgroundImage: `url('/bg-art/logo.png')` }}
      />

      {/* Seamless Smooth Black Gradient Transitions (Top & Bottom Fades) */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#060608] via-[#060608]/70 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#060608] via-[#060608]/70 to-transparent pointer-events-none z-10" />

      <ScrollReveal direction="up" delay={0}>
        <div className="w-full max-w-[1200px] mx-auto text-center relative z-20">
        
        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4 sm:mb-5 tracking-tight font-serif flex flex-col items-center gap-1.5 sm:gap-2.5">
          <span className="block text-white">{finalTitlePrefix}</span>
          <span className="block text-[#FF8B2C] drop-shadow-[0_0_25px_rgba(255,139,44,0.45)]">{finalTitleHighlight}</span>
        </h2>

        {/* Description: Formatted into distinct balanced lines across all devices */}
        <div className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-12 font-medium px-2 flex flex-col items-center gap-1 sm:gap-1.5">
          {finalLines.map((line, idx) => (
            <p key={idx} className="block leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        {/* Buttons: 2x2 on Mobile, Inline Row on Tablet/Desktop */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 max-w-[320px] xs:max-w-[360px] sm:max-w-none mx-auto">
          
          {/* Facebook */}
          <a
            href={settings.facebook || "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialButton} ${styles.btnFacebook}`}
            aria-label={t.social.buttons.facebook}
          >
            <svg viewBox="0 0 26 26" fill="currentColor" height={22} width={22} xmlns="http://www.w3.org/2000/svg">
              <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z" />
            </svg>
            <span>{t.social.buttons.facebook}</span>
          </a>

          {/* Instagram */}
          <a
            href={settings.instagram || "https://instagram.com"}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialButton} ${styles.btnInstagram}`}
            aria-label={t.social.buttons.instagram}
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>{t.social.buttons.instagram}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl(t.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialButton} ${styles.btnWhatsApp}`}
            aria-label={t.social.buttons.whatsapp}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" height={22} width={22}>
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.54 2.083.825 3.228.825 3.183 0 5.768-2.587 5.769-5.767.001-3.18-2.585-5.767-5.768-5.767zm3.391 8.211c-.147.414-.732.76-1.025.807-.291.045-.662.062-2.122-.524-1.606-.644-2.617-2.316-2.696-2.422-.078-.106-.647-.862-.647-1.644 0-.781.41-1.164.556-1.321.147-.156.324-.196.432-.196.108 0 .216.001.309.006.098.005.23-.037.36.275.137.33.468 1.142.509 1.226.041.084.068.181.014.288-.054.108-.081.176-.162.271-.081.095-.171.212-.245.284-.082.082-.168.172-.072.338.096.166.427.705.916 1.141.63.561 1.161.734 1.327.816.166.083.264.069.362-.042.098-.111.42-.489.532-.656.113-.166.226-.139.38-.083.156.056.985.464 1.155.549.17.085.284.127.325.197.042.07.042.408-.105.822z" />
            </svg>
            <span>{t.social.buttons.whatsapp}</span>
          </a>

          {/* TikTok */}
          <a
            href={settings.tiktok || "https://tiktok.com"}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialButton} ${styles.btnTikTok}`}
            aria-label={t.social.buttons.tiktok}
          >
            <Image
              src="/hero-icons/tiktok.png"
              alt="تيك توك"
              width={22}
              height={22}
              unoptimized
              className="w-5 h-5 object-contain"
            />
            <span>{t.social.buttons.tiktok}</span>
          </a>

          {/* LinkedIn */}
          <a
            href={settings.linkedin || "https://linkedin.com"}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialButton} ${styles.btnLinkedIn} col-span-2 w-full max-w-[150px] xs:max-w-[170px] mx-auto sm:mx-0 sm:max-w-none sm:w-auto sm:col-auto`}
            aria-label={t.social.buttons.linkedin}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" height={20} width={20}>
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>{t.social.buttons.linkedin}</span>
          </a>

        </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
