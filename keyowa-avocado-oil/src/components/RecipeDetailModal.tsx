"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Clock,
  Users,
  Flame,
  Check,
  Heart,
  Share2,
  Printer,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ChefHat,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Recipe } from "@/data/recipes";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { PRODUCTS } from "@/data/products";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function RecipeDetailModal({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
}: RecipeDetailModalProps) {
  const { addToCart, openCart } = useCart();
  const { formatPrice } = useLanguage();
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [copiedShare, setCopiedShare] = useState(false);
  const [addedProduct, setAddedProduct] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    // Reset checked ingredients when modal opens with new recipe
    setCheckedIngredients({});
    setCopiedShare(false);
    setAddedProduct(false);
  }, [recipe?.id]);

  if (!recipe) return null;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const matchedProduct = PRODUCTS.find((p) => p.id === recipe.recommendedProductId) || PRODUCTS[0];

  const handleBuyOil = () => {
    if (matchedProduct) {
      addToCart(matchedProduct, 1);
      setAddedProduct(true);
      setTimeout(() => {
        setAddedProduct(false);
        openCart();
      }, 800);
    }
  };

  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;
  const totalIngredients = recipe.ingredients.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 md:p-8 flex items-start justify-center animate-fade-in print:p-0 print:overflow-visible">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F2117]/70 backdrop-blur-md transition-opacity print:hidden"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-4xl w-full border border-[#E4DDD0] shadow-2xl overflow-hidden z-10 my-4 sm:my-8 print:shadow-none print:border-none print:my-0 print:max-w-full">
        {/* Top Header Controls */}
        <div className="sticky top-0 bg-[#FAF8F5]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-[#EAE2D5] flex items-center justify-between z-20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#204F34] text-xs font-bold uppercase tracking-wider">
              <ChefHat className="w-3.5 h-3.5 text-emerald-700" />
              <span>{recipe.categoryLabel}</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-medium text-[#65796E]">
              • {recipe.diet}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Bookmark Favorite */}
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isFavorite
                  ? "bg-rose-50 border-rose-200 text-rose-600 shadow-2xs"
                  : "bg-white border-[#E2DAD0] text-[#5A6E62] hover:bg-[#F2ECE1]"
              }`}
              title={isFavorite ? "Đã lưu vào danh sách yêu thích" : "Lưu vào yêu thích"}
              aria-label="Lưu vào yêu thích"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
            </button>

            {/* Print Recipe */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-white border border-[#E2DAD0] text-[#5A6E62] hover:bg-[#F2ECE1] transition-all cursor-pointer"
              title="In công thức / Xuất PDF"
              aria-label="In công thức"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Share link */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white border border-[#E2DAD0] text-[#5A6E62] hover:bg-[#F2ECE1] transition-all relative cursor-pointer"
              title="Sao chép liên kết"
              aria-label="Chia sẻ"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-8 right-0 bg-[#142A1E] text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-md animate-fade-in">
                  Đã chép link!
                </span>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#EDE6D8] hover:bg-[#E0D7C5] text-[#142A1E] transition-all ml-1 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 space-y-8">
          {/* Hero Banner Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Photo */}
            <div className="md:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#E4DCCE]">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div
                className={`absolute top-3.5 left-3.5 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${
                  recipe.badgeColor || "bg-[#142A1E] text-emerald-300"
                }`}
              >
                {recipe.badge}
              </div>
            </div>

            {/* Right Meta Info */}
            <div className="md:col-span-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Độ khó: {recipe.difficulty}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#142A1E] leading-tight">
                  {recipe.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#4E6256] leading-relaxed">
                  {recipe.description}
                </p>
              </div>

              {/* 3 Pill Stats */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="bg-white p-2.5 rounded-xl border border-[#E9E1D4] shadow-2xs">
                  <Clock className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <div className="text-[10px] uppercase font-bold text-[#718579]">Thời gian</div>
                  <div className="text-xs font-bold text-[#142A1E] mt-0.5">{recipe.totalTime}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#E9E1D4] shadow-2xs">
                  <Users className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <div className="text-[10px] uppercase font-bold text-[#718579]">Khẩu phần</div>
                  <div className="text-xs font-bold text-[#142A1E] mt-0.5">{recipe.servings}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#E9E1D4] shadow-2xs">
                  <Flame className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <div className="text-[10px] uppercase font-bold text-[#718579]">Năng lượng</div>
                  <div className="text-xs font-bold text-[#142A1E] mt-0.5">{recipe.nutrition.calories}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Highlights Bar */}
          <div className="bg-[#142A1E] text-white p-4 sm:p-5 rounded-2xl border border-[#234533] space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Hàm lượng dinh dưỡng trên mỗi phần ăn
              </span>
              <span className="text-[11px] font-normal text-emerald-200/80">Tối ưu cho Eat-Clean</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-[#1D3B2B] p-2.5 rounded-xl border border-[#2B543E]">
                <div className="text-[11px] text-emerald-300">Đạm (Protein)</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">{recipe.nutrition.protein}</div>
              </div>
              <div className="bg-[#1D3B2B] p-2.5 rounded-xl border border-[#2B543E]">
                <div className="text-[11px] text-emerald-300">Chất béo tốt (Omega-9)</div>
                <div className="text-sm sm:text-base font-bold text-[#86EFAC] mt-0.5">{recipe.nutrition.goodFats}</div>
              </div>
              <div className="bg-[#1D3B2B] p-2.5 rounded-xl border border-[#2B543E]">
                <div className="text-[11px] text-emerald-300">Tinh bột (Carbs)</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">{recipe.nutrition.carbs}</div>
              </div>
              <div className="bg-[#1D3B2B] p-2.5 rounded-xl border border-[#2B543E]">
                <div className="text-[11px] text-emerald-300">Vitamin E tự nhiên</div>
                <div className="text-sm sm:text-base font-bold text-amber-300 mt-0.5">{recipe.nutrition.vitaminE}</div>
              </div>
            </div>
          </div>

          {/* 2-Column: Ingredients Checklist & Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Ingredients Checklist (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-[#E8E1D5] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-3">
                <h3 className="font-serif text-lg font-bold text-[#142A1E]">
                  Nguyên Liệu Chuẩn Bị
                </h3>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {checkedCount}/{totalIngredients} đã sẵn sàng
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 opacity-70"
                          : "bg-[#FAF8F5] border-[#EDE6DA] text-[#22362B] hover:border-emerald-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                          isChecked
                            ? "bg-emerald-700 border-emerald-700 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${isChecked ? "line-through text-gray-500" : ""}`}>
                          {ing.name}
                        </div>
                        <div className="text-[11px] text-[#697B70] flex items-center justify-between mt-0.5">
                          <span className="font-medium text-emerald-800">{ing.amount}</span>
                          {ing.note && <span className="italic">{ing.note}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-[11px] text-[#718579] italic text-center">
                * Click vào từng dòng để tích chọn nguyên liệu đã có sẵn trong bếp của bạn.
              </div>
            </div>

            {/* Right: Step-by-Step Instructions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#142A1E] flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-emerald-700" />
                  <span>Quy Trình Nấu Từng Bước</span>
                </h3>
                <p className="text-xs text-[#5C6E62]">
                  Hướng dẫn chi tiết từ Bếp Trưởng với nhiệt độ và kỹ thuật căn chỉnh chính xác.
                </p>
              </div>

              <div className="space-y-4">
                {recipe.steps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs space-y-2 hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-[#142A1E] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {step.step}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#142A1E]">
                        {step.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-[#384C40] leading-relaxed pl-10">
                      {step.instruction}
                    </p>

                    {step.chefTip && (
                      <div className="ml-10 p-3 rounded-xl bg-[#F4F9F5] border border-[#D5E8DC] text-xs text-[#1B4B30] flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Bí quyết bếp sao: </span>
                          <span>{step.chefTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Keyavo Avocado Oil Tip Box */}
              <div className="bg-gradient-to-r from-emerald-950 to-[#142A1E] text-white p-5 rounded-2xl border border-emerald-800/80 shadow-md space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Vì sao nên dùng Dầu Bơ Keyavo cho món này?</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                  {recipe.keyavoTip}
                </p>
              </div>
            </div>
          </div>

          {/* Paired Product Card (Call to Action to buy oil for this recipe) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E9E1D4] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FAF8F5] p-2 border border-[#E7DFD1] flex-shrink-0 overflow-hidden">
                <Image
                  src={recipe.recommendedProductImage}
                  alt={recipe.recommendedProductName}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                  Dầu bơ khuyên dùng cho công thức này
                </div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-[#142A1E] line-clamp-1">
                  {recipe.recommendedProductName}
                </h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-serif font-bold text-[#E55B38] text-sm sm:text-base">
                    {formatPrice(recipe.recommendedProductPrice)}
                  </span>
                  <span className="text-[#6D8074]">• Chai {recipe.recommendedProductVolume}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleBuyOil}
                className="w-full sm:w-auto group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[#142A1E] hover:bg-emerald-950 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 btn-shimmer whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>{addedProduct ? "Đã thêm vào giỏ!" : "Đặt Dầu Bơ Nấu Món Này"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
