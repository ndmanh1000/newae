"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Check, Plus, Minus, Flame } from "lucide-react";

export default function ProductQuickView() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const { t, formatPrice } = useLanguage();
  const data = t.quickView;

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  // Find translated product details
  const trans = t.products.items.find((item) => item.id === quickViewProduct.id);
  const localizedProduct = trans
    ? {
        ...quickViewProduct,
        name: trans.name,
        tagline: trans.tagline,
        badge: trans.badge,
        description: trans.description,
        features: trans.features,
        volume: trans.volume || quickViewProduct.volume,
        smokePoint: trans.smokePoint || quickViewProduct.smokePoint,
      }
    : quickViewProduct;

  const handleAdd = () => {
    addToCart(localizedProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E7DFD2] shadow-2xl overflow-hidden relative animate-scale-in max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-[#FAF8F5] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#EFE8DD]">
            <Image
              src={localizedProduct.image}
              alt={localizedProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-contain p-6"
            />
            <div
              className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${localizedProduct.badgeColor}`}
            >
              {localizedProduct.badge}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{localizedProduct.smokePoint}</span>
                <span>•</span>
                <span>{data.volumeLabel} {localizedProduct.volume}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#142A1E]">
                {localizedProduct.name}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-extrabold text-emerald-900">
                  {formatPrice(localizedProduct.price)}
                </span>
                {localizedProduct.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(localizedProduct.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#526659] leading-relaxed">
                {localizedProduct.description}
              </p>

              {/* Features List */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#73877A]">
                  {data.specsTitle}
                </div>
                {localizedProduct.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#2A3F33]">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="pt-4 border-t border-[#F0EBE2] space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D7CFC2] rounded-full px-3 py-1.5 bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-gray-600 hover:text-black transition-all duration-150 hover:scale-125 active:scale-90 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#142A1E] font-mono select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-gray-600 hover:text-black transition-all duration-150 hover:scale-125 active:scale-90 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`group relative overflow-hidden flex-1 py-3.5 px-6 rounded-full font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] btn-shimmer cursor-pointer flex items-center justify-center gap-2 ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-[#142A1E] hover:bg-emerald-950 text-white"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-125" />
                      <span className="relative z-10">{data.addedBtn}</span>
                    </>
                  ) : (
                    <span className="relative z-10">{data.addBtn}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
