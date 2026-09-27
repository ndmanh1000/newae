"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Heart } from "lucide-react";

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const data = t.testimonials;

  const images = [
    "/images/story-eatclean.webp",
    "/images/story-skincare.webp",
    "/images/story-chef.webp",
    "/images/story-mom.webp",
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background ambient blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-coral/5 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3ED] text-[#225739] text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-coral fill-coral animate-pulse-slow" />
            <span>{data.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#142A1E] tracking-tight leading-[1.2]">
            {data.title}
          </h2>

          <p className="text-base text-[#4F6357] leading-relaxed font-normal">
            {data.desc}
          </p>
        </div>

        {/* 4 Portrait Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border border-[#E7DFD2] bg-[#142A1E]"
            >
              {/* Background Photo */}
              <Image
                src={images[idx]}
                alt={item.name}
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 300px"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#142A1E] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105">
                {item.tag}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs text-white/95 leading-relaxed italic line-clamp-3">
                  &quot;{item.quote}&quot;
                </p>

                {/* Author Info */}
                <div className="pt-2 border-t border-white/20">
                  <div className="text-sm font-bold text-white font-serif">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-emerald-200/90 font-medium">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
