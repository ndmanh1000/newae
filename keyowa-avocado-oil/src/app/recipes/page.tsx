"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Clock,
  Users,
  Flame,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  Award,
  ChefHat,
  ShoppingBag,
  Download,
  X,
  Star,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import Toast from "@/components/Toast";
import RecipeDetailModal from "@/components/RecipeDetailModal";
import RecipeEbookModal from "@/components/RecipeEbookModal";
import { RECIPES, RECIPE_CATEGORIES, Recipe } from "@/data/recipes";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function RecipesPage() {
  const { addToCart, openCart } = useCart();
  const { formatPrice } = useLanguage();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Modal states
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [isEbookOpen, setIsEbookOpen] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("keyavo_favorite_recipes");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("keyavo_favorite_recipes", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesDesc = recipe.description.toLowerCase().includes(q);
        const matchesDiet = recipe.diet.toLowerCase().includes(q);
        const matchesIngredients = recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesDesc && !matchesDiet && !matchesIngredients) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== "all" && recipe.category !== selectedCategory) {
        return false;
      }

      // Diet
      if (selectedDiet !== "all" && !recipe.diet.toLowerCase().includes(selectedDiet.toLowerCase())) {
        return false;
      }

      // Time
      if (selectedTime === "quick") {
        // under 15 mins
        const minutes = parseInt(recipe.totalTime);
        if (isNaN(minutes) || minutes > 15) return false;
      } else if (selectedTime === "medium") {
        // 16 to 30 mins
        const minutes = parseInt(recipe.totalTime);
        if (isNaN(minutes) || minutes <= 15 || minutes > 30) return false;
      }

      // Favorites
      if (showFavoritesOnly && !favorites.includes(recipe.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDiet, selectedTime, showFavoritesOnly, favorites]);

  // Featured recipe for Hero card
  const featuredRecipe = RECIPES.find((r) => r.isFeatured) || RECIPES[0];

  const handleBuyProduct = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    addToCart(product, 1);
    openCart();
  };

  const dietOptions = [
    { id: "all", label: "Tất cả chế độ" },
    { id: "eat-clean", label: "Eat-Clean" },
    { id: "keto", label: "Keto / Low-Carb" },
    { id: "mẹ & bé", label: "Mẹ & Bé" },
    { id: "vegan", label: "Thuần Chay (Vegan)" },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-[#142A1E] text-white pt-12 pb-16 sm:pb-24 border-b border-[#244633]">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-emerald-300/80 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500/50" />
            <span className="text-emerald-100 font-semibold">Cẩm Nang 50+ Công Thức Ẩm Thực Bếp Sao</span>
          </nav>

          {/* Heading & Intro */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#204430] border border-[#2E5E43] text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ChefHat className="w-4 h-4 text-[#D4F666]" />
                <span>E-BOOK & CẨM NANG BẾP TRƯỞNG 5 SAO</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Tuyệt Phẩm 50+ Công Thức Món Ăn Cùng Dầu Bơ Ép Lạnh Keyavo
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/85 leading-relaxed font-normal">
                Khám phá bí quyết ẩm thực từ các Executive Chef: từ món áp chảo nhiệt độ cao 270°C giòn rụm bên ngoài mọng nước bên trong, sốt Vinaigrette nhũ hóa sánh mịn cho đến thực đơn ăn dặm giàu Omega-9 & DHA cho bé yêu.
              </p>

              {/* 4 Feature Highlights */}
              <div className="flex flex-wrap gap-2.5 pt-2 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-[#1B3A29] px-3 py-1.5 rounded-full border border-[#2C563D] text-emerald-200">
                  <Check className="w-3.5 h-3.5 text-[#86EFAC]" />
                  Điểm khói 270°C không khét cháy
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#1B3A29] px-3 py-1.5 rounded-full border border-[#2C563D] text-emerald-200">
                  <Check className="w-3.5 h-3.5 text-[#86EFAC]" />
                  100% Thuần khiết & Giàu Omega-9
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#1B3A29] px-3 py-1.5 rounded-full border border-[#2C563D] text-emerald-200">
                  <Check className="w-3.5 h-3.5 text-[#86EFAC]" />
                  Định lượng chi tiết từng khẩu phần
                </span>
              </div>
            </div>

            {/* E-Book Download Lead Magnet Card */}
            <div className="w-full lg:w-auto bg-[#1C3727] p-5 sm:p-6 rounded-3xl border border-[#2F583F] shadow-xl space-y-4 flex-shrink-0 lg:max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    QUÀ TẶNG THÀNH VIÊN
                  </div>
                  <div className="font-serif text-sm font-bold text-white leading-tight">
                    Tải E-Book PDF 68 Trang
                  </div>
                </div>
              </div>

              <p className="text-xs text-emerald-200/80 leading-relaxed">
                Tải trọn bộ 50 công thức kèm biểu đồ nhiệt độ và bảng dinh dưỡng in màu chất lượng cao.
              </p>

              <button
                onClick={() => setIsEbookOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E55B38] hover:bg-[#cf4c2a] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Tải E-Book Miễn Phí (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipe Hero Spotlight */}
      <section className="py-8 sm:py-12 border-b border-[#ECE4D8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
            {/* Left Photo */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto min-h-[320px] sm:min-h-[420px] overflow-hidden">
              <Image
                src={featuredRecipe.image}
                alt={featuredRecipe.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute top-4 left-4 bg-[#142A1E]/95 backdrop-blur-md text-[#D4F666] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>MÓN NỔI BẬT TRONG TUẦN</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-[#576B60] flex-wrap">
                  <span className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E9E1D4]">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    {featuredRecipe.totalTime}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E9E1D4]">
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                    {featuredRecipe.servings}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E9E1D4]">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    {featuredRecipe.nutrition.calories}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                    {featuredRecipe.diet}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#142A1E] leading-snug">
                  {featuredRecipe.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#4E6256] leading-relaxed">
                  {featuredRecipe.description}
                </p>

                {/* 3 Steps Preview */}
                <div className="space-y-2 pt-2">
                  {featuredRecipe.steps.slice(0, 3).map((st) => (
                    <div key={st.step} className="flex items-start gap-2.5 text-xs text-[#2A3F33]">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {st.step}
                      </span>
                      <span className="leading-relaxed">
                        <strong>{st.title}:</strong> {st.instruction.slice(0, 100)}...
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F0EBE0] flex items-center justify-between flex-wrap gap-4">
                <button
                  onClick={() => setActiveRecipe(featuredRecipe)}
                  className="group inline-flex items-center gap-2 bg-[#142A1E] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold hover:bg-emerald-950 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Xem Chi Tiết Toàn Bộ Công Thức</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(featuredRecipe.id)}
                    className="p-3 rounded-full bg-[#FAF7F2] border border-[#E5DECة] text-[#55695D] hover:bg-white transition-all cursor-pointer"
                    aria-label="Lưu vào yêu thích"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(featuredRecipe.id) ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => handleBuyProduct(e, featuredRecipe.recommendedProductId)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-3 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Mua Dầu Nấu Món Này</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Recipe Explorer Grid & Filters */}
      <section className="py-12 sm:py-16 flex-1">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Search & Filter Toolbar */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên món, nguyên liệu (cá hồi, ức gà, bơ, tôm...)"
                  className="w-full pl-11 pr-10 py-3 bg-white rounded-full border border-[#DFD8CC] text-base sm:text-sm text-[#142A1E] placeholder:text-gray-400 focus:outline-none focus:border-emerald-600 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                    aria-label="Xóa tìm kiếm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Diet & Quick filters */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Diet Dropdown */}
                <select
                  value={selectedDiet}
                  onChange={(e) => setSelectedDiet(e.target.value)}
                  className="bg-white border border-[#DFD8CC] text-base sm:text-xs font-medium text-[#2E4236] px-3.5 py-2.5 rounded-full focus:outline-none shadow-2xs cursor-pointer"
                >
                  {dietOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Time filter */}
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="bg-white border border-[#DFD8CC] text-base sm:text-xs font-medium text-[#2E4236] px-3.5 py-2.5 rounded-full focus:outline-none shadow-2xs cursor-pointer"
                >
                  <option value="all">Thời gian: Tất cả</option>
                  <option value="quick">Nhanh gọn (≤ 15 phút)</option>
                  <option value="medium">15 - 30 phút</option>
                </select>

                {/* Favorites Toggle Button */}
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    showFavoritesOnly
                      ? "bg-rose-50 border-rose-300 text-rose-700 shadow-2xs"
                      : "bg-white border-[#DFD8CC] text-[#4F6255] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span>Đã lưu ({favorites.length})</span>
                </button>
              </div>
            </div>

            {/* Category Pills Slider */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {RECIPE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#142A1E] text-[#D4F666] shadow-sm"
                        : "bg-white text-[#4A5D52] hover:bg-[#EFE9DD] border border-[#E2DAD0]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="ml-1.5 text-[10px] opacity-75">({cat.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count & Active Filters Summary */}
          <div className="flex items-center justify-between text-xs text-[#687B70]">
            <div>
              Hiển thị <strong className="text-[#142A1E] font-bold">{filteredRecipes.length}</strong> công thức phù hợp
            </div>
            {(searchQuery || selectedCategory !== "all" || selectedDiet !== "all" || selectedTime !== "all" || showFavoritesOnly) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedDiet("all");
                  setSelectedTime("all");
                  setShowFavoritesOnly(false);
                }}
                className="text-emerald-800 hover:text-emerald-950 font-semibold underline underline-offset-2 cursor-pointer"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            )}
          </div>

          {/* Recipe Cards Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredRecipes.map((recipe) => {
                const isFav = favorites.includes(recipe.id);
                return (
                  <div
                    key={recipe.id}
                    onClick={() => setActiveRecipe(recipe)}
                    className="bg-white rounded-3xl border border-[#E9E1D4] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
                  >
                    {/* Card Image Banner */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF8F5]">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Badge */}
                      <div
                        className={`absolute top-3.5 left-3.5 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${
                          recipe.badgeColor || "bg-[#142A1E] text-emerald-300"
                        }`}
                      >
                        {recipe.badge}
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe.id);
                        }}
                        className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                          isFav
                            ? "bg-white text-rose-500 shadow-md"
                            : "bg-[#142A1E]/60 text-white hover:bg-white hover:text-rose-500"
                        }`}
                        title={isFav ? "Bỏ lưu" : "Lưu vào yêu thích"}
                        aria-label="Lưu công thức"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500" : ""}`} />
                      </button>

                      {/* Time & Servings Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#86EFAC]" />
                          {recipe.totalTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          {recipe.nutrition.calories}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-emerald-300" />
                          {recipe.servings}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-[#718579] font-medium">
                          <span className="uppercase tracking-wider font-bold text-emerald-800">
                            {recipe.categoryLabel}
                          </span>
                          <span>{recipe.diet}</span>
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#142A1E] group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                          {recipe.title}
                        </h3>

                        <p className="text-xs text-[#55695D] line-clamp-2 leading-relaxed">
                          {recipe.description}
                        </p>
                      </div>

                      {/* Nutrition Micro Pill */}
                      <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EDE5D8] flex items-center justify-between text-[11px] text-[#475C50]">
                        <span>Đạm: <strong>{recipe.nutrition.protein}</strong></span>
                        <span>•</span>
                        <span>Omega-9: <strong className="text-emerald-800">{recipe.nutrition.goodFats.split(" ")[0]}</strong></span>
                        <span>•</span>
                        <span>Độ khó: <strong>{recipe.difficulty}</strong></span>
                      </div>

                      {/* Bottom Actions */}
                      <div className="pt-2 border-t border-[#F0EBE0] flex items-center justify-between gap-2">
                        <button
                          onClick={() => setActiveRecipe(recipe)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#142A1E] group-hover:text-emerald-800 transition-colors"
                        >
                          <span>Xem công thức</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>

                        <button
                          onClick={(e) => handleBuyProduct(e, recipe.recommendedProductId)}
                          className="p-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                          title="Mua chai dầu bơ cho công thức này"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Mua dầu bơ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E9E1D4] space-y-4 max-w-lg mx-auto">
              <Search className="w-10 h-10 text-gray-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#142A1E]">
                  Không tìm thấy công thức phù hợp
                </h3>
                <p className="text-xs text-[#687C70]">
                  Thử tìm kiếm với từ khóa khác như "cá hồi", "ức gà", "bơ", hoặc xóa các bộ lọc đang chọn.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedDiet("all");
                  setSelectedTime("all");
                  setShowFavoritesOnly(false);
                }}
                className="inline-flex items-center gap-2 bg-[#142A1E] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-emerald-950 transition-all cursor-pointer"
              >
                <span>Xem lại toàn bộ 50+ công thức</span>
              </button>
            </div>
          )}

          {/* Michelin Chef Endorsement Callout */}
          <div className="bg-[#142A1E] text-white rounded-3xl p-6 sm:p-10 border border-[#274D38] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#204430] border border-[#2E5E43] text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>GÓC NHÌN BẬC THẦY ẨM THỰC</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">
                  “Điểm khói 270°C của dầu bơ Keyavo là cuộc cách mạng cho các món áp chảo và sốt nhũ hóa.”
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-normal">
                  — Executive Chef Alain Vũ (Nhà hàng Fine Dining chuẩn Michelin). Dầu bơ không sinh khói độc Acrolein, bảo toàn tối đa vitamin và tôn vinh nguyên vẹn vị ngọt nguyên bản của nguyên liệu tươi sống.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
                <Link
                  href="/#products"
                  className="inline-flex items-center justify-center gap-2 bg-[#E55B38] hover:bg-[#cf4c2a] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 btn-shimmer whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Mua Dầu Bơ Keyavo Ngay</span>
                </Link>
                <button
                  onClick={() => setIsEbookOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full border border-white/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Nhận E-Book 50 Công Thức</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Detail Modal */}
      <RecipeDetailModal
        recipe={activeRecipe}
        onClose={() => setActiveRecipe(null)}
        isFavorite={activeRecipe ? favorites.includes(activeRecipe.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* E-Book Download Modal */}
      <RecipeEbookModal
        isOpen={isEbookOpen}
        onClose={() => setIsEbookOpen(false)}
      />

      {/* Global Modals */}
      <CartDrawer />
      <ProductQuickView />
      <Toast />
    </main>
  );
}
