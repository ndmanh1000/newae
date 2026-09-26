"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CalloutBanner() {
  const { t } = useLanguage();
  const data = t.callout;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#142A1E] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-[#274D38] shadow-2xl">
        {/* Decorative background glow & animated blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-blob" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />
        <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-emerald-300/40 pointer-events-none animate-mote-1" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-amber-300/40 pointer-events-none animate-mote-2" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#204430] border border-[#2E5E43] text-emerald-300 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:border-emerald-400/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse-slow" />
              <span>{data.badge}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug">
              {data.title}
            </h3>

            <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl font-normal leading-relaxed">
              {data.desc}
            </p>
          </div>

          {/* Right Stat & CTA */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-6 border-t lg:border-t-0 lg:border-l border-[#274D38] pt-6 lg:pt-0 lg:pl-8">
            <div className="text-left lg:text-right space-y-1 group">
              <div className="text-4xl sm:text-5xl font-serif font-extrabold text-emerald-400 transition-transform duration-500 group-hover:scale-105 inline-block">
                270°C
              </div>
              <div className="text-xs text-emerald-200/90 font-medium">
                {data.statLabel}
              </div>
            </div>

            <a
              href="#products"
              className="group relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-[#F26438] to-[#E34A1E] hover:from-[#e3562b] hover:to-[#ce3c12] text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer btn-glow-coral"
            >
              <span className="relative z-10">{data.btn}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
