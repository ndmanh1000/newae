"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { useCart, Product } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, Eye, Check, Sparkles } from "lucide-react";

export default function ProductCatalog() {
  const { addToCart, setQuickViewProduct } = useCart();
  const { t, formatPrice } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: t.products.categories.all },
    { id: "cooking", label: t.products.categories.cooking },
    { id: "skincare", label: t.products.categories.skincare },
    { id: "baby", label: t.products.categories.baby },
    { id: "gift", label: t.products.categories.gift },
  ];

  // Merge base products with active language translation
  const localizedProducts: Product[] = PRODUCTS.map((base) => {
    const trans = t.products.items.find((item) => item.id === base.id);
    if (!trans) return base;
    return {
      ...base,
      name: trans.name,
      tagline: trans.tagline,
      badge: trans.badge,
      description: trans.description,
      features: trans.features,
      volume: trans.volume || base.volume,
      smokePoint: trans.smokePoint || base.smokePoint,
    };
  });

  const filteredProducts =
    activeCategory === "all"
      ? localizedProducts
      : localizedProducts.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <section id="products" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#225739] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.products.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#142A1E] tracking-tight">
              {t.products.title}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap hover:scale-105 active:scale-95 transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-[#142A1E] text-white shadow-md ring-2 ring-emerald-600/30"
                    : "bg-[#F4EFE6] text-[#55695D] hover:bg-[#EBE3D5] hover:text-[#142A1E]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 border border-[#E9E2D5] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FBF9F5] mb-4 p-4 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 300px"
                />

                {/* Badge Top Left */}
                <div
                  className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ${product.badgeColor}`}
                >
                  {product.badge}
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1B3B2B] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-90 transition-all duration-200"
                  title="Quick View"
                  aria-label="Xem chi tiết sản phẩm"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Details */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7B8D83] font-medium mb-1">
                    <span>{product.volume}</span>
                    <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {product.smokePoint}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#142A1E] group-hover:text-emerald-800 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#5E7166] line-clamp-2 leading-relaxed font-normal">
                    {product.tagline}
                  </p>
                </div>

                {/* Price and Add to Cart */}
                <div className="pt-3 border-t border-[#F2ECE2] flex items-center justify-between">
                  <div>
                    <div className="font-serif text-lg font-extrabold text-[#142A1E]">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-[11px] text-[#8E9F94] line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`btn-shimmer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-all duration-200 ${
                      addedId === product.id
                        ? "bg-emerald-600 text-white"
                        : "bg-[#142A1E] hover:bg-emerald-800 text-white shadow-sm hover:shadow-lg"
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.products.added}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t.products.add}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
