"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function ProcessSection() {
  const { t } = useLanguage();

  const stepImages = [
    "/images/process-harvest.jpg",
    "/images/process-press.jpg",
    "/images/process-amber.jpg",
  ];

  return (
    <section id="process" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#225739] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse-slow" />
              <span>{t.process.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#142A1E] leading-[1.2] tracking-tight">
              {t.process.title}
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-base text-[#4F6357] leading-relaxed">
              {t.process.desc}
            </p>
          </div>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.process.steps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E9E2D5] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group"
            >
              {/* Image with Tag & Badges */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#F4EFE6]">
                <Image
                  src={stepImages[idx]}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                {/* Step badge top left */}
                <div className="absolute top-3 left-3 bg-[#142A1E]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md transition-transform duration-300 group-hover:scale-105">
                  <span className="text-emerald-400 font-mono">{step.stepNumber}</span>
                  <span className="text-[11px] tracking-wider text-emerald-100 uppercase">
                    {step.tag}
                  </span>
                </div>

                {/* Subtitle badge bottom center */}
                <div className="absolute bottom-3 inset-x-3 bg-black/60 backdrop-blur-md rounded-xl p-2 text-center text-[11px] font-medium text-white/95">
                  {step.subtitle}
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142A1E] group-hover:text-emerald-800 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#506458] leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE0] flex items-center gap-2 text-xs font-medium text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{step.specs}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
