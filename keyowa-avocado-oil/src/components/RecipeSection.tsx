"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Clock, Users, Flame, ArrowRight, BookOpen } from "lucide-react";

export default function RecipeSection() {
  const { t } = useLanguage();
  const data = t.recipes;
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="recipes" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle ambient background blobs */}
      <div className="absolute top-1/3 -left-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-10 -right-24 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#225739] text-xs font-bold uppercase tracking-wider mb-3">
              <span>{data.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#142A1E] tracking-tight">
              {data.title}
            </h2>
          </div>

          <Link
            href="/recipes"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>{data.viewAll}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Big Recipe Feature Card */}
        <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
          {/* Left Side: Recipe Food Photo */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto min-h-[340px] sm:min-h-[420px] overflow-hidden">
            <Image
              src="/images/recipe-salad.webp"
              alt={data.recipeTitle}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            {/* Tag Badge */}
            <div className="absolute top-4 left-4 bg-[#142A1E]/90 backdrop-blur-md text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md animate-float-slow">
              {data.newTag}
            </div>
          </div>

          {/* Right Side: Cooking Guide & Steps */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-semibold text-[#576B60] flex-wrap">
                <span className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E9E1D4]">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  {data.time}
                </span>
                <span className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E9E1D4]">
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  {data.servings}
                </span>
                <span className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E9E1D4]">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  {data.calories}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#142A1E] leading-snug">
                {data.recipeTitle}
              </h3>

              <p className="text-sm text-[#4E6256] leading-relaxed">
                {data.recipeDesc}
              </p>
            </div>

            {/* Steps Checklist */}
            <div className="space-y-3.5 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#697B70]">
                {data.secretTitle}
              </div>

              <div className="flex items-start gap-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EDE5D8] transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/40 hover:translate-x-1">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-xs sm:text-sm text-[#273B30] leading-relaxed">
                  {data.step1}
                </p>
              </div>

              <div className="flex items-start gap-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EDE5D8] transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/40 hover:translate-x-1">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-xs sm:text-sm text-[#273B30] leading-relaxed">
                  {data.step2}
                </p>
              </div>

              <div className="flex items-start gap-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EDE5D8] transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/40 hover:translate-x-1">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-xs sm:text-sm text-[#273B30] leading-relaxed">
                  {data.step3}
                </p>
              </div>
            </div>

            {/* Bottom action */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-[#F0EBE0]">
              <button
                onClick={handleDownload}
                className="group inline-flex items-center gap-2 text-xs font-bold text-[#142A1E] hover:text-emerald-700 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-600 transition-transform duration-300 group-hover:rotate-12" />
                <span>
                  {downloaded ? data.downloadedMsg : data.downloadBtn}
                </span>
              </button>

              <a
                href="#products"
                className="group relative overflow-hidden inline-flex items-center gap-1.5 text-xs font-bold bg-[#142A1E] text-white px-5 py-2.5 rounded-full hover:bg-emerald-950 transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer shadow-md hover:shadow-lg"
              >
                <span className="relative z-10">{data.btnBuyForRecipe}</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
