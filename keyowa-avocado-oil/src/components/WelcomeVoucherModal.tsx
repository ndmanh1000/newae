"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Mail,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Gift,
  Check,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WelcomeVoucherModal() {
  const { t } = useLanguage();
  const data = t.welcomeModal;

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(100); // 100% -> 0%
  const [isPaused, setIsPaused] = useState(false);

  const duration = 5000; // 5 seconds
  const intervalStep = 50; // update every 50ms
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger modal on page entrance
  useEffect(() => {
    // Show after slight delay for smooth entrance
    const showTimer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(showTimer);
  }, []);

  // 5-second auto-close countdown timer
  useEffect(() => {
    if (!isOpen || isPaused || submitted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev - (intervalStep / duration) * 100;
        if (next <= 0) {
          clearInterval(timerRef.current!);
          setIsOpen(false);
          return 0;
        }
        return next;
      });
    }, intervalStep);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused, submitted]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitted(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText("KEYOWA15");
    }

    setTimeout(() => {
      setIsOpen(false);
    }, 2400);
  };

  if (!isOpen) return null;

  const secondsRemaining = Math.max(0, Math.ceil((progress / 100) * 5));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
      {/* Dark backdrop with blur */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!submitted && !email) setIsPaused(false);
        }}
        className="relative w-full max-w-lg md:max-w-4xl max-h-[92vh] md:max-h-none overflow-y-auto md:overflow-hidden bg-[#FAF8F5] rounded-3xl md:rounded-[32px] shadow-2xl border border-[#E8E0D2] z-10 flex flex-col md:grid md:grid-cols-12 animate-scale-in"
      >
        {/* Top 5s Auto-Dismiss Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#EAE2D5] z-30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-[#F06A47] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top-Right Close 'X' Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 md:bg-gray-100 hover:bg-white text-gray-600 hover:text-black shadow-md flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 group cursor-pointer"
          aria-label="Đóng cửa sổ"
          title="Đóng (Esc)"
        >
          <X className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </button>

        {/* ============================================================ */}
        {/* LEFT COLUMN: Visual Culinary & Brand Prestige */}
        {/* ============================================================ */}
        <div className="relative md:col-span-6 h-56 sm:h-72 md:h-auto min-h-[220px] md:min-h-[520px] overflow-hidden flex flex-col justify-between p-5 sm:p-6 text-white bg-[#102017]">
          {/* Background Steak Drizzle Image */}
          <Image
            src="/images/modal-steak.webp"
            alt="Món Áp Chảo Thượng Hạng Dầu Bơ Keyavo"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 500px"
          />

          {/* Luxury dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A160F] via-[#0A160F]/50 to-black/35 pointer-events-none" />

          {/* Top Row: Luxury Gold Stamp & Cold-Press Pill */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            {/* Stamp Badge */}
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400/80 bg-black/40 backdrop-blur-md p-1.5 flex flex-col items-center justify-center text-center shadow-lg animate-float-slow">
              <span className="text-[7.5px] sm:text-[8.5px] font-extrabold uppercase tracking-widest text-amber-300 leading-tight">
                KEYAVO
              </span>
              <span className="text-[6.5px] sm:text-[7.5px] font-bold tracking-[0.2em] text-white">
                PRIVILEGE
              </span>
              <span className="text-[5.5px] text-amber-300/80 tracking-widest mt-0.5">
                VIETNAM
              </span>
            </div>

            {/* Pill: ÉP LẠNH NGUYÊN BẢN */}
            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white/95">
              {data.leftPill}
            </div>
          </div>

          {/* Bottom Area: Highlight Tags & Michelin Quote */}
          <div className="relative z-10 space-y-3 pt-6">
            {/* Two Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-[10px] tracking-wide uppercase">
                {data.leftTag1}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold text-[10px] tracking-wide uppercase">
                {data.leftTag2}
              </span>
            </div>

            {/* Quote */}
            <p className="font-serif italic text-xs sm:text-sm text-stone-100 leading-snug drop-shadow">
              {data.leftQuote}
            </p>

            {/* Subtext */}
            <p className="text-[10px] sm:text-[11px] text-stone-300/85 leading-tight">
              {data.leftSub}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Offer, Benefits & Email Form */}
        {/* ============================================================ */}
        <div className="md:col-span-6 p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-5 bg-[#FAF8F5]">
          {/* Header & Title */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              {/* Special Privilege Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5E6] border border-[#FED7AA] text-[#C2410C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>{data.badge}</span>
              </div>

              {/* 5s Auto-Close Indicator */}
              <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mr-8 md:mr-0">
                {data.autoCloseTimer} {secondsRemaining}{data.seconds}
              </span>
            </div>

            {/* Main Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#142A1E] leading-tight">
              <span>{data.titleLine1} </span>
              <span className="text-[#E55B38] font-black underline decoration-amber-400 decoration-wavy decoration-2">
                {data.voucherHighlight}
              </span>
              <br />
              <span className="italic font-serif font-bold text-[#1F3A29] text-xl sm:text-2xl">
                {data.titleLine2}
              </span>
            </h3>
          </div>

          {/* 2 Benefit Cards matching screenshot */}
          <div className="space-y-2.5">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#E8DFD0] shadow-2xs flex items-center gap-3 transition-all duration-300 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-[13px] font-bold text-[#142A1E] leading-snug">
                  {data.benefit1Title}
                </div>
                <div className="text-[11px] text-[#697E72] mt-0.5">
                  {data.benefit1Sub}
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#E8DFD0] shadow-2xs flex items-center gap-3 transition-all duration-300 hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 font-bold" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-[13px] font-bold text-[#142A1E] leading-snug">
                  {data.benefit2Title}
                </div>
                <div className="text-[11px] text-[#697E72] mt-0.5">
                  {data.benefit2Sub}
                </div>
              </div>
            </div>
          </div>

          {/* Form or Success State */}
          {submitted ? (
            <div className="bg-emerald-50 rounded-2xl p-4 sm:p-5 border border-emerald-300 text-center space-y-2 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-emerald-950">
                {data.successMsg}
              </h4>
              <p className="text-xs text-emerald-700 font-medium">
                {data.successCopy}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Input */}
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-coral-500" />
                <input
                  type="email"
                  required
                  placeholder={data.emailPlaceholder}
                  value={email}
                  onFocus={() => setIsPaused(true)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsPaused(true);
                  }}
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E55B38] text-[#142A1E] transition-all duration-200"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="group relative overflow-hidden w-full bg-gradient-to-r from-[#F26438] to-[#E34A1E] hover:from-[#e3562b] hover:to-[#ce3c12] text-white font-extrabold py-3.5 sm:py-4 rounded-xl shadow-lg shadow-[#F26438]/30 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] btn-shimmer btn-glow-coral cursor-pointer"
              >
                <span className="relative z-10">{data.submitBtn}</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              {/* Privacy Trust & Skip Link */}
              <div className="text-center space-y-1.5 pt-1">
                <div className="text-[11px] text-[#718478] flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{data.privacy}</span>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-[11px] text-[#86988E] hover:text-[#142A1E] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  {data.skip}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
