"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, Translations, translations } from "@/data/translations";

interface LanguageContextType {
  lang: Language;
  dir: "rtl" | "ltr";
  isAr: boolean;
  t: Translations;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "ibra_portfolio_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang === "ar" || savedLang === "en") {
        setLangState(savedLang);
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore storage errors
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    }
  };

  const toggleLang = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
  };

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";
  const isAr = lang === "ar";
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, dir, isAr, t, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
