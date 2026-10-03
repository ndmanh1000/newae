"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, LanguageOption, LANGUAGES, TRANSLATIONS } from "@/data/translations";

export { LANGUAGES };
export type { Language, LanguageOption };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentOption: LanguageOption;
  t: (typeof TRANSLATIONS)["vi"];
  formatPrice: (amountVND: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    try {
      const saved = (localStorage.getItem("keyavo_language") || localStorage.getItem("keyowa_language")) as Language;
      if (saved && (saved === "vi" || saved === "en" || saved === "ja" || saved === "zh")) {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("keyavo_language", lang);
    } catch {
      // ignore
    }
  };

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  const formatPrice = (amountVND: number): string => {
    switch (language) {
      case "en":
        // 1 USD ~ 25,000 VND
        const usd = (amountVND / 25000).toFixed(2);
        return `$${usd}`;
      case "ja":
        // 1 JPY ~ 160 VND
        const jpy = Math.round(amountVND / 160);
        return `¥${jpy.toLocaleString("ja-JP")}`;
      case "zh":
        // 1 CNY ~ 3500 VND
        const cny = Math.round(amountVND / 3500);
        return `¥${cny.toLocaleString("zh-CN")}`;
      case "vi":
      default:
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amountVND);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentOption, t, formatPrice }}>
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
