"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, LANGUAGES, Language } from "@/context/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export default function LanguageSwitcher({
  className = "",
  isMobile = false,
}: LanguageSwitcherProps) {
  const { language, setLanguage, currentOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-2 pt-2">
        {LANGUAGES.map((item) => (
          <button
            key={item.code}
            onClick={() => handleSelect(item.code)}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
              language === item.code
                ? "bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm"
                : "bg-white border-[#E0D7C9] text-[#425549] hover:bg-[#FAF8F5]"
            }`}
          >
            <span className="text-base">{item.flag}</span>
            <span className="truncate">{item.nativeName}</span>
            {language === item.code && (
              <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#3B4E42] border border-[#DDD5C7] rounded-full px-2 sm:px-3 py-1 sm:py-1.5 bg-[#F4EFE6]/80 hover:bg-[#EBE3D5] hover:text-[#142A1E] transition-all duration-200 shadow-2xs"
        aria-label="Chọn ngôn ngữ / Select Language"
      >
        <span className="text-xs sm:text-sm">{currentOption.flag}</span>
        <span className="uppercase tracking-wider">{currentOption.code}</span>
        <ChevronDown
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6E8075] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E7DFD2] py-2 z-50 animate-fade-in overflow-hidden">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8A9C91] border-b border-[#F2ECE2]">
            Ngôn ngữ / Language
          </div>
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              onClick={() => handleSelect(item.code)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors ${
                language === item.code
                  ? "bg-emerald-50/80 text-emerald-900 font-bold"
                  : "text-[#283C30] hover:bg-[#F9F7F3]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{item.flag}</span>
                <div>
                  <div className="leading-tight">{item.nativeName}</div>
                  <div className="text-[10px] text-[#7A8C81]">{item.label}</div>
                </div>
              </div>
              {language === item.code && (
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
