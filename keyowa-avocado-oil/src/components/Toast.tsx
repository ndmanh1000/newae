"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { CheckCircle2, ArrowRight, X } from "lucide-react";

export default function Toast() {
  const { toastProductId, setToastProductId, openCart } = useCart();
  const { t } = useLanguage();

  if (!toastProductId) return null;

  const item = t.products.items.find((p) => p.id === toastProductId);
  const baseProduct = PRODUCTS.find((p) => p.id === toastProductId);
  const productName = item?.name || baseProduct?.name || "Sản phẩm";
  const productImage = baseProduct?.image;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 animate-bounce-in">
      <div className="bg-[#142A1E]/95 backdrop-blur-md text-white p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {productImage ? (
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 border border-white/10 p-1 flex items-center justify-center">
              <Image
                src={productImage}
                alt={productName}
                fill
                className="object-contain p-0.5"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.cart.title}</span>
            </div>
            <p className="text-xs font-medium text-stone-200 truncate mt-0.5">
              <span>{t.toast.addedPrefix}</span>
              <strong className="text-white font-bold">{productName}</strong>
              <span>{t.toast.addedSuffix}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => {
              setToastProductId(null);
              openCart();
            }}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
          >
            <span>{t.toast.viewBag}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setToastProductId(null)}
            className="p-1 text-white/50 hover:text-white rounded-lg transition-colors"
            aria-label="Đóng thông báo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
