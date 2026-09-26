"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight, Lock, Eye, FileText, CheckCircle2, Phone, Mail, MapPin, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import Toast from "@/components/Toast";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();
  const data = t.privacyPage;

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-[#142A1E] text-white py-16 sm:py-20 border-b border-[#244633]">
        {/* Subtle background animated blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-emerald-300/80 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{data.breadcrumbHome}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500/50" />
            <span className="text-emerald-100 font-semibold">{data.breadcrumbCurrent}</span>
          </nav>

          {/* Badge & Title */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#204430] border border-[#2E5E43] text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse-slow" />
              <span>{data.badge}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {data.title}
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/85 leading-relaxed font-normal">
              {data.subtitle}
            </p>

            <div className="inline-block text-[11px] font-mono text-emerald-400/90 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
              {data.lastUpdated}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-12 sm:py-16 flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Introduction Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E1D4] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full pointer-events-none -z-0 opacity-60" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="space-y-2 flex-1">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142A1E]">
                  {data.title}
                </h2>
                <p className="text-sm text-[#4E6256] leading-relaxed">
                  {data.intro}
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections Grid/List */}
          <div className="space-y-6">
            {data.sections.map((sec, idx) => (
              <div
                key={sec.id || idx}
                id={sec.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E1D4] shadow-xs hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#142A1E] mb-3 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#E2D8C9] text-xs font-bold font-mono text-emerald-800 flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <span>{sec.title}</span>
                </h3>

                <p className="text-xs sm:text-sm text-[#55695D] leading-relaxed mb-4">
                  {sec.content}
                </p>

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="space-y-2.5 bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#EDE5D8]">
                    {sec.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#273B30] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Trust Banner & Quick Navigation */}
          <div className="bg-[#142A1E] text-white rounded-3xl p-6 sm:p-8 border border-[#274D38] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>KEYOWA Quality & Privacy Assurance</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200/80">
                Hotline 24/7: <strong className="text-white">1900 888 666</strong> • Email: <strong className="text-white">lienhe@keyowa.vn</strong>
              </p>
            </div>

            <Link
              href="/"
              className="group relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-[#F26438] to-[#E34A1E] hover:from-[#e3562b] hover:to-[#ce3c12] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer whitespace-nowrap"
            >
              <span className="relative z-10">{data.breadcrumbHome}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Global Modals */}
      <CartDrawer />
      <ProductQuickView />
      <Toast />
    </main>
  );
}
