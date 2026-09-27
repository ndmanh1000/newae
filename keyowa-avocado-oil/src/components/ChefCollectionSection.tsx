"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Flame, Droplets, Wind, Star, ArrowRight, Eye, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export default function ChefCollectionSection() {
  const { t, formatPrice } = useLanguage();
  const { addToCart, setQuickViewProduct } = useCart();
  const data = t.chefCollectionSection;

  // Icons for 3 cards
  const icons = [
    <Flame key="flame" className="w-5 h-5 text-amber-500" />,
    <Droplets key="droplets" className="w-5 h-5 text-emerald-500" />,
    <Wind key="wind" className="w-5 h-5 text-sky-400" />,
  ];

  // The 2 flagship Chef products
  const chefProducts = PRODUCTS.filter(
    (p) => p.id === "keyowa-extra-virgin-500ml" || p.id === "keyowa-giftset"
  );

  return (
    <section
      id="chef-collection"
      className="py-20 lg:py-28 bg-[#142A1E] text-white relative overflow-hidden"
    >
      {/* Decorative ambient backdrop glows with animated drifting */}
      <div className="absolute top-0 right-1/4 w-[520px] h-[520px] bg-emerald-600/20 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-10 w-[440px] h-[440px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

      {/* Floating subtle ambient light motes */}
      <div className="absolute top-24 right-[28%] w-3 h-3 rounded-full bg-amber-400/40 blur-[1px] animate-mote-1 pointer-events-none" />
      <div className="absolute bottom-28 left-[22%] w-2.5 h-2.5 rounded-full bg-emerald-400/40 blur-[1px] animate-mote-2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#204430] border border-[#2E5E43] text-[#A7F3D0] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{data.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {data.title}
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
            {data.subtitle}
          </p>
        </div>

        {/* 3 Core Culinary Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {data.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#1A3426]/80 hover:bg-[#1E3D2D] backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20 shadow-lg hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {icons[idx]}
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Product Showcase & Chef Endorsement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 2 Chef Signature Products */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {chefProducts.map((product) => {
              const trans = t.products.items.find((item) => item.id === product.id);
              const displayName = trans?.name || product.name;
              const displayVolume = trans?.volume || product.volume;
              const displaySmokePoint = trans?.smokePoint || product.smokePoint;
              const displayTagline = trans?.tagline || product.tagline;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-5 text-[#142A1E] shadow-xl border border-[#E9E2D5] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-square rounded-2xl bg-[#FAF8F5] p-4 mb-4 overflow-hidden flex items-center justify-center border border-[#F0EBE2]">
                      <Image
                        src={product.image}
                        alt={displayName}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#142A1E] text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        {trans?.badge || product.badge}
                      </div>

                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1B3B2B] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Xem chi tiết"
                        aria-label="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Specs */}
                    <div className="flex items-center justify-between text-xs text-[#718478] mb-1.5">
                      <span className="font-semibold">{displayVolume}</span>
                      <span className="bg-emerald-50 text-emerald-800 font-mono px-2 py-0.5 rounded font-bold">
                        {displaySmokePoint}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#142A1E] group-hover:text-emerald-800 transition-colors line-clamp-1">
                      {displayName}
                    </h4>

                    <p className="text-xs text-[#5E7166] mt-1 line-clamp-2 leading-relaxed">
                      {displayTagline}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 mt-4 border-t border-[#F2ECE2] flex items-center justify-between">
                    <span className="font-serif text-lg font-extrabold text-[#142A1E]">
                      {formatPrice(product.price)}
                    </span>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="btn-shimmer inline-flex items-center gap-1.5 bg-[#E55B38] hover:bg-[#cf4c2a] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.quickView.addBtn}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Master Chef Alain Vu Endorsement Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1C3A2A] to-[#162E21] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-emerald-200">
                  Michelin & 5-Star Endorsed
                </span>
              </div>

              {/* Chef Quote */}
              <blockquote className="font-serif text-base sm:text-lg italic text-emerald-50 leading-relaxed">
                &ldquo;{data.chefQuote}&rdquo;
              </blockquote>
            </div>

            {/* Chef Profile Footer */}
            <div className="flex items-center gap-4 pt-4 border-t border-emerald-500/20">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-md flex-shrink-0">
                <Image
                  src="/images/story-chef.webp"
                  alt={data.chefName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h5 className="font-serif font-bold text-white text-base">
                  {data.chefName}
                </h5>
                <p className="text-xs text-emerald-300/90 leading-tight">
                  {data.chefRole}
                </p>
              </div>

              <a
                href="#recipes"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white underline underline-offset-2 flex-shrink-0"
              >
                <span>{t.nav.recipes}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
