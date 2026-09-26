"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Flame, ShieldCheck, Check, Award } from "lucide-react";

export default function SmokePointSection() {
  const { t } = useLanguage();
  const data = t.smokePoint;

  const barWidths = ["100%", "84%", "74%", "68%", "55%"];

  return (
    <section id="smokepoint" className="py-20 lg:py-28 bg-[#F4EFE6]/60 border-y border-[#EAE3D6] relative overflow-hidden">
      {/* Subtle background ambient blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Information & Doctor Quote */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700 animate-pulse-slow" />
              <span>{data.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#142A1E] leading-[1.2] tracking-tight">
              {data.title}
            </h2>

            <p className="text-base text-[#475C50] leading-relaxed">
              {data.desc}
            </p>

            {/* Expert Quote Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DDD0] shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 opacity-50 pointer-events-none transition-transform duration-500 group-hover:scale-125" />

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center font-serif font-bold text-lg flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  HN
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-sm font-bold text-[#142A1E]">
                      {data.expertTitle}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Award className="w-3 h-3 text-emerald-600" />
                      {data.expertBadge}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7E72] font-medium">
                    {data.expertRole}
                  </div>
                  <blockquote className="text-xs sm:text-[13px] text-[#36493F] italic leading-relaxed pt-1">
                    &quot;{data.expertQuote}&quot;
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Benchmark Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-xl hover:shadow-2xl transition-all duration-500 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE0] flex-wrap gap-2">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#142A1E] flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500 animate-flame" />
                    {data.chartTitle}
                  </h3>
                  <p className="text-xs text-[#6E8075] mt-0.5">
                    {data.chartSub}
                  </p>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                  ASTM D92
                </div>
              </div>

              {/* Comparison Bars */}
              <div className="space-y-4">
                {data.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl transition-all duration-200 ${
                      idx === 0
                        ? "bg-[#F3F8F4] border-2 border-emerald-500/60 shadow-sm"
                        : "hover:bg-[#FAF8F5] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="flex items-center gap-2 text-[#182B20]">
                        {item.name}
                        {idx === 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-wide">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <span className="font-mono font-bold text-sm sm:text-base text-[#142A1E]">
                        {item.pointText}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-3 w-full bg-[#EAE3D6] rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          idx === 0
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                            : idx === 1
                            ? "bg-amber-500"
                            : "bg-orange-400"
                        }`}
                        style={{ width: barWidths[idx] }}
                      />
                    </div>

                    <div className="flex justify-between items-center mt-1.5 text-[11px]">
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        idx === 0 
                          ? "bg-emerald-100 text-emerald-800"
                          : idx === 1
                          ? "bg-amber-100 text-amber-800"
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {item.badge}
                      </span>
                      <span className="text-[#73857B]">
                        {item.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Callout Notice */}
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
                <Check className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {data.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
