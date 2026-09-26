"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const data = t.footer;

  return (
    <footer className="bg-[#102218] text-[#D3E0D8] pt-16 pb-12 border-t border-[#1F3D2C] relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1D3B2A]">
          {/* Column 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-1.5">
                KEYOWA
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/80 font-semibold -mt-1">
                Cold-Pressed Avocado Oil
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#9BB1A4] leading-relaxed pr-4">
              {data.mission}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-[#1B3626] hover:bg-emerald-600 text-white flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-emerald-900/50 cursor-pointer"
                title="Facebook"
              >
                fb
              </a>
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-[#1B3626] hover:bg-emerald-600 text-white flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-emerald-900/50 cursor-pointer"
                title="Instagram"
              >
                ig
              </a>
              <a
                href="#tiktok"
                className="w-9 h-9 rounded-full bg-[#1B3626] hover:bg-emerald-600 text-white flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-emerald-900/50 cursor-pointer"
                title="TikTok"
              >
                tt
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-[#1B3626] hover:bg-emerald-600 text-white flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-emerald-900/50 cursor-pointer"
                title="YouTube"
              >
                yt
              </a>
            </div>
          </div>

          {/* Column 2: Về Keyowa (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              {data.colAboutTitle}
            </h4>
            <ul className="space-y-2 text-xs text-[#A8BEB2]">
              {data.aboutLinks.map((link, idx) => (
                <li key={idx}>
                  <a href="#about" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sản phẩm (2 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              {data.colProductTitle}
            </h4>
            <ul className="space-y-2 text-xs text-[#A8BEB2]">
              {data.productLinks.map((link, idx) => (
                <li key={idx}>
                  <a href="#products" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Liên hệ & Hotline (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              {data.colContactTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-[#A8BEB2]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-white font-bold">{data.hotline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{data.factory}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{data.office}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B9587]">
          <div>
            {data.copyright}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-emerald-300 transition-colors">
              {data.privacy}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-emerald-300 transition-colors">
              {data.terms}
            </Link>
            <span>•</span>
            <Link href="/guarantee" className="hover:text-emerald-300 transition-colors">
              {data.guarantee}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
