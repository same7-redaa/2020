"use client";

import React, { useState } from "react";
import FloatingInput from "@/components/ui/FloatingInput";
import FancyCornerButton from "@/components/ui/FancyCornerButton";
import { Mail, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function Newsletter() {
  const { t } = useLanguage();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact-newsletter" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF8B2C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Background Artworks */}
      <div
        className="absolute -top-10 -right-8 w-44 h-44 sm:w-64 sm:h-64 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none -rotate-[25deg]"
        style={{ backgroundImage: `url('/bg-art/instagram.png')` }}
      />
      <div
        className="absolute -bottom-10 -left-8 w-40 h-40 sm:w-56 sm:h-56 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none rotate-[18deg]"
        style={{ backgroundImage: `url('/bg-art/google.png')` }}
      />

      {/* Seamless Black Gradient Transitions (Top & Bottom Fades) */}
      <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-[#060608] via-[#060608]/80 to-transparent pointer-events-none z-[2]" />
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-transparent pointer-events-none z-[2]" />

      <ScrollReveal direction="up" delay={0}>
        <div className="w-full max-w-4xl mx-auto relative z-10 glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 text-center overflow-hidden border border-[#FF8B2C]/30 bg-[#0e0e14]/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight relative z-10 font-serif">
          {t.newsletter.titlePrefix} <span className="text-[#FF8B2C] drop-shadow-[0_0_25px_rgba(255,139,44,0.4)]">{t.newsletter.titleHighlight}</span>
        </h2>

        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto mb-8 leading-relaxed font-medium">
          {t.newsletter.subtitle}
        </p>

        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#FF8B2C]/15 border border-[#FF8B2C]/40 text-[#FF8B2C] text-sm font-bold animate-fade-in shadow-[0_0_20px_rgba(255,139,44,0.2)]">
            <CheckCircle2 className="w-5 h-5" />
            <span>{t.newsletter.successMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <FloatingInput
              label={t.newsletter.placeholder}
              type="text"
              required
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              icon={<Mail className="w-4 h-4 text-zinc-400" />}
              containerClassName="flex-grow"
            />

            <FancyCornerButton variant="neon" size="md" className="w-full sm:w-auto shrink-0">
              {t.newsletter.submitBtn}
            </FancyCornerButton>
          </form>
        )}

        </div>
      </ScrollReveal>
    </section>
  );
}
