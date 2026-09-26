"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Marquee() {
  const { t } = useLanguage();
  const items = t.marquee;

  return (
    <div className="bg-[#142A1E] py-4 overflow-hidden border-y border-[#264D37] select-none">
      <div className="flex w-max animate-marquee space-x-12 items-center">
        {/* First set */}
        {items.map((item, idx) => (
          <div key={`item-1-${idx}`} className="flex items-center space-x-12">
            <span className="text-[#C6DFD0] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        ))}

        {/* Second set for infinite scroll */}
        {items.map((item, idx) => (
          <div key={`item-2-${idx}`} className="flex items-center space-x-12">
            <span className="text-[#C6DFD0] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
