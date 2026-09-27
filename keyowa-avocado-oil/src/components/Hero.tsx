"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Flame, Droplets } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const data = t.hero;

  return (
    <section
      id="about"
      className="relative pt-6 pb-16 lg:pt-8 lg:pb-24 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 65% 55% at 5% 5%, rgba(212, 246, 102, 0.45) 0%, rgba(225, 248, 140, 0.18) 45%, transparent 70%),
          radial-gradient(ellipse 55% 45% at 95% 85%, rgba(254, 233, 218, 0.55) 0%, rgba(255, 245, 238, 0.2) 45%, transparent 75%),
          radial-gradient(circle at 50% 50%, rgba(250, 248, 244, 0.95) 0%, #FAF8F4 100%)
        `,
      }}
    >
      {/* Ambient Animated Floating Background Orbs */}
      <div className="absolute -top-12 -left-12 w-[420px] h-[420px] bg-[#D4F666]/35 rounded-full blur-3xl pointer-events-none animate-blob -z-10" />
      <div className="absolute top-1/2 -right-12 w-[450px] h-[450px] bg-amber-200/45 rounded-full blur-3xl pointer-events-none animate-blob-reverse -z-10" />
      <div className="absolute -bottom-10 left-1/3 w-[360px] h-[360px] bg-orange-100/60 rounded-full blur-3xl pointer-events-none animate-pulse-slow -z-10" />

      {/* Floating subtle ambient light motes */}
      <div className="absolute top-1/4 left-[12%] w-2.5 h-2.5 rounded-full bg-emerald-400/40 blur-[1px] animate-mote-1 pointer-events-none" />
      <div className="absolute top-1/3 right-[18%] w-3 h-3 rounded-full bg-amber-400/40 blur-[1px] animate-mote-2 pointer-events-none" />
      <div className="absolute bottom-1/4 left-[45%] w-2 h-2 rounded-full bg-[#E55B38]/30 blur-[1px] animate-mote-3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Meta Bar matching screenshot */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Lime Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D7F573]/90 border border-[#C3EB54] text-[#1D3C28] text-[11px] sm:text-xs font-bold tracking-wide shadow-2xs hover:scale-105 transition-transform cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#204430] animate-pulse"></span>
            <span>{data.badge}</span>
          </div>

          {/* Monospace Batch Metadata */}
          <div className="hidden sm:block text-[10.5px] font-mono text-[#6A7E71] tracking-[0.2em] uppercase font-semibold">
            {data.batchMeta}
          </div>
        </div>

        {/* Main Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Category Tag */}
            <div>
              <div className="text-[#966336] text-[11px] sm:text-xs font-extrabold tracking-[0.24em] uppercase mb-2">
                {data.categoryTag}
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] leading-[1.12] font-extrabold text-[#142A1E] tracking-tight">
                {data.titleLine1} <br className="hidden sm:inline" />
                {data.titleLine2} <br className="hidden sm:inline" />
                {data.titleLine3}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#465A4E] leading-relaxed max-w-xl font-normal">
              {data.desc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href="#products"
                className="btn-shimmer btn-glow-coral group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#F06A47] to-[#E2532E] hover:from-[#e35a37] hover:to-[#d04521] text-white text-sm sm:text-base font-bold px-7 py-3.5 sm:py-4 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                <span>{data.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              <a
                href="#smokepoint"
                className="group inline-flex items-center justify-center gap-2 bg-white/85 hover:bg-white border border-[#DDD5C7] text-[#1B3B2B] text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3.5 sm:py-4 rounded-full shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Flame className="w-4 h-4 text-amber-600 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                <span>{data.ctaSecondary}</span>
              </a>
            </div>

            {/* Key Metrics Box matching screenshot */}
            <div className="bg-white/70 backdrop-blur-xs rounded-2xl border border-[#EDE5D8] p-4 sm:p-5 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg shadow-2xs hover:shadow-md transition-shadow duration-300">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#142A1E] font-serif">
                  {data.metric1Val}
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#6B7D71] uppercase tracking-wider leading-snug">
                  {data.metric1Label}
                </div>
              </div>

              <div className="space-y-1 border-l border-[#E5DDD0] pl-3 sm:pl-5">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#142A1E] font-serif">
                  {data.metric2Val}
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#6B7D71] uppercase tracking-wider leading-snug">
                  {data.metric2Label}
                </div>
              </div>

              <div className="space-y-1 border-l border-[#E5DDD0] pl-3 sm:pl-5">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E55B38] font-serif">
                  {data.metric3Val}
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold text-[#6B7D71] uppercase tracking-wider leading-snug">
                  {data.metric3Label}
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card matching screenshot with floating badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Main Product Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl shadow-[#1B3B2B]/10 border border-[#EBE4D8] transition-transform duration-500 group-hover:-translate-y-1">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#F6F3EC]">
                  <Image
                    src="/images/hero-bottle.webp"
                    alt="Chai Dầu Bơ Ép Lạnh Nguyên Chất KEYOWA"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge Top Left: Hương Vị Thượng Hạng */}
                <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md border border-[#E7DFD2] rounded-2xl p-2.5 sm:p-3 shadow-lg flex items-center gap-2.5 max-w-[220px] animate-float-slow">
                  <div className="w-8 h-8 rounded-full bg-[#D4F666] flex items-center justify-center text-[#142A1E] flex-shrink-0 shadow-2xs">
                    <Droplets className="w-4 h-4 text-[#142A1E]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#142A1E] leading-tight">
                      {data.badgeFlavorTitle}
                    </div>
                    <div className="text-[10px] text-[#62776A] mt-0.5">
                      {data.badgeFlavorSub}
                    </div>
                  </div>
                </div>

                {/* Floating Badge Bottom Right: Điểm khói 270°C */}
                <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md border border-[#E7DFD2] rounded-2xl p-2.5 sm:p-3 shadow-xl flex items-center gap-2.5 animate-float-reverse">
                  <div className="w-8 h-8 rounded-full bg-[#142A1E] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Flame className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#142A1E] leading-tight">
                      {data.badgeSmokeTitle}
                    </div>
                    <div className="text-[10px] text-[#62776A] mt-0.5">
                      {data.badgeSmokeSub}
                    </div>
                  </div>
                </div>

                {/* Vertical Badge on right edge */}
                <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-3.5 bg-white/95 backdrop-blur-md border border-[#E2DAD0] rounded-full py-3.5 px-1.5 shadow-md items-center justify-center [writing-mode:vertical-rl] text-[9.5px] font-bold text-[#55695D] tracking-[0.25em] uppercase select-none group-hover:scale-105 transition-transform">
                  {data.badgePureVertical}
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full rounded-3xl bg-[#EBE4D8]/60 border border-[#DDD5C7] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
