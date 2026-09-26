"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ShoppingBag, Menu, X, ArrowRight, Search, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { PRODUCTS } from "@/data/products";

export default function Header() {
  const { totalItems, openCart, addToCart, setQuickViewProduct } = useCart();
  const { t, formatPrice } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("about");

  // Quick search modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll listener for sticky styling and ScrollSpy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Top of page
      if (window.scrollY < 200) {
        setActiveNav("about");
        return;
      }

      const sections = [
        { id: "about", offset: 0 },
        { id: "products", el: document.getElementById("products") },
        { id: "chef-collection", el: document.getElementById("chef-collection") },
        { id: "process", el: document.getElementById("process") },
        { id: "smokepoint", el: document.getElementById("smokepoint") },
        { id: "recipes", el: document.getElementById("recipes") },
      ];

      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        if (item.el && scrollPosition >= item.el.offsetTop) {
          setActiveNav(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Scroll to top when clicking logo (or return to home if on a policy subpage)
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.href = "/";
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveNav("about");
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // Smooth scroll to section (or navigate to home anchor if on a policy subpage)
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    setActiveNav(id);
    if (mobileMenuOpen) setMobileMenuOpen(false);

    if (id === "about" || href === "#about" || href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const navHeight =
        typeof window !== "undefined" && window.innerWidth < 640 ? 64 : 78;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      });
    }
  };

  // Nav Items configured according to user screenshot
  const navItems = [
    { id: "about", label: t.nav.about, href: "#about" },
    { id: "products", label: t.nav.products, href: "#products" },
    { id: "chef-collection", label: t.nav.chefCollection, href: "#chef-collection" },
    { id: "process", label: t.nav.process, href: "#process" },
    { id: "smokepoint", label: t.nav.smokePoint, href: "#smokepoint" },
    { id: "recipes", label: t.nav.recipes, href: "#recipes" },
  ];

  // Search results
  const filteredProducts = searchQuery.trim()
    ? t.products.items.filter((p) => {
        const query = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.volume.toLowerCase().includes(query) ||
          p.smokePoint.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      })
    : [];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#142A1E] text-[#DCE7E1] text-xs font-medium py-2 px-4 text-center tracking-wide border-b border-[#224432] relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#204732] text-[#86EFAC] text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse"></span>
            {t.announcementOffer}
          </span>
          <span>{t.announcement}</span>
          <span className="hidden md:inline text-[#5E836F]">•</span>
          <span className="hidden md:inline">{t.announcementEbook}</span>
          <a
            href="#newsletter"
            onClick={(e) => handleNavClick(e, "#newsletter", "newsletter")}
            className="underline underline-offset-2 hover:text-white transition-colors text-amber-300 font-semibold ml-1 inline-flex items-center gap-0.5"
          >
            {t.getVoucher} <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#EBE4D8]"
            : "bg-[#FAF8F5] border-b border-[#EFE8DD]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            {/* Logo with Smooth Scroll to Top */}
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
              <a
                href="#"
                onClick={handleLogoClick}
                className="flex flex-col group cursor-pointer"
                title="KEYOWA - Về đầu trang"
                aria-label="Về đầu trang"
              >
                <span className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1B3B2B] group-hover:text-emerald-900 transition-colors flex items-center gap-1 sm:gap-1.5">
                  KEYOWA
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600"></span>
                </span>
                <span className="text-[7.5px] sm:text-[10px] uppercase tracking-[0.06em] sm:tracking-[0.2em] text-[#697E72] font-semibold -mt-0.5 sm:-mt-1 whitespace-nowrap">
                  Cold-Pressed Avocado Oil
                </span>
              </a>
            </div>

            {/* Desktop Navigation with Active Lime Pill Marking (as in screenshot) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[13px] font-medium text-[#384C40] bg-[#F4EFE6]/60 p-1.5 rounded-full border border-[#E8E0D2]">
              {navItems.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={`transition-all duration-200 rounded-full whitespace-nowrap ${
                      isActive
                        ? "bg-[#D4F666] text-[#142A1E] font-bold px-3.5 sm:px-4 py-1.5 shadow-xs"
                        : "text-[#4A5D52] hover:text-[#142A1E] hover:bg-[#EAE4D7]/70 px-3 py-1.5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              {/* Quick Search Button Pill (Matching Screenshot: 🔍 Tìm kiếm... ⌘K) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 bg-white/80 hover:bg-white text-[#63776B] hover:text-[#142A1E] px-3.5 py-1.5 rounded-full text-xs transition-all border border-[#DFD8CC] ml-1 shadow-2xs"
                title={`${t.nav.searchAction} (⌘K / Ctrl+K)`}
              >
                <Search className="w-3.5 h-3.5 text-gray-500" />
                <span className="hidden xl:inline text-[12px]">{t.nav.searchPlaceholder}</span>
                <kbd className="hidden sm:inline-block font-sans text-[10px] bg-[#FAF8F5] text-gray-500 px-1.5 py-0.5 rounded shadow-2xs border border-gray-200 font-mono">
                  ⌘K
                </kbd>
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
              {/* Language Switcher Dropdown (Visible on all devices, compact on mobile) */}
              <LanguageSwitcher />

              {/* Mobile Quick Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 rounded-full text-[#1B3B2B] hover:bg-[#EFE8DC] transition-colors flex-shrink-0"
                aria-label="Tìm kiếm"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Cart Trigger Button with micro-bounce */}
              <button
                onClick={openCart}
                id="cart-button"
                className="group relative p-1.5 sm:p-2.5 rounded-full text-[#1B3B2B] hover:bg-[#EFE8DC] hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0"
                aria-label="Giỏ hàng"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-rotate-12 transition-transform duration-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md animate-bounce ring-1.5 sm:ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* CTA Button with Shimmer & Glow */}
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "#products", "products")}
                className="btn-shimmer btn-glow-coral group hidden md:inline-flex items-center gap-2 bg-[#E55B38] hover:bg-[#cf4c2a] text-white text-xs sm:text-sm font-bold px-4 lg:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0"
              >
                <span>{t.nav.buyNow}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              {/* Mobile menu button (Hamburger 3-bar) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-[#1B3B2B] hover:bg-[#EFE8DC] rounded-xl flex-shrink-0 active:scale-95 transition-all"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EBE4D8] px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-lg">
            {/* Mobile Nav Items */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={`block py-2.5 px-3.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#D4F666] text-[#142A1E] font-bold"
                        : "text-[#1B3B2B] hover:bg-[#EFE8DC]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-2">
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "#products", "products")}
                className="w-full inline-flex justify-center items-center gap-2 bg-[#E55B38] text-white font-semibold py-3 rounded-xl shadow active:scale-[0.98] transition-all"
              >
                {t.hero.ctaPrimary}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/* QUICK SEARCH MODAL (Triggered by ⌘K or search pill) */}
      {/* ============================================================ */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center animate-fade-in">
          {/* Backdrop */}
          <div
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Dialog Container */}
          <div className="relative bg-[#FAF8F5] rounded-3xl max-w-xl w-full border border-[#E2DDD3] shadow-2xl overflow-hidden z-10">
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 bg-white border-b border-[#EAE2D5] flex items-center gap-3">
              <Search className="w-5 h-5 text-emerald-800 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-[#142A1E] placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                  aria-label="Xóa từ khóa"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block text-[11px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                ESC
              </kbd>
            </div>

            {/* Results or Suggested Products */}
            <div className="max-h-96 overflow-y-auto p-3 sm:p-4 divide-y divide-[#F0EAE0]">
              {searchQuery.trim() ? (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => {
                    const baseProduct = PRODUCTS.find((p) => p.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="py-2.5 px-3 rounded-2xl hover:bg-white transition-all flex items-center justify-between gap-3 group cursor-pointer"
                        onClick={() => {
                          if (baseProduct) {
                            setQuickViewProduct(baseProduct);
                          }
                          setSearchOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {baseProduct && (
                            <div className="relative w-12 h-12 rounded-xl bg-[#FAF8F5] flex-shrink-0 p-1 border border-[#EAE2D5] overflow-hidden">
                              <Image
                                src={baseProduct.image}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-[#142A1E] group-hover:text-emerald-800 transition-colors line-clamp-1">
                              {item.name}
                            </h4>
                            <div className="text-[11px] text-[#718478] flex items-center gap-1.5">
                              <span>{item.volume}</span>
                              <span>•</span>
                              <span className="text-emerald-700 font-medium">
                                {item.smokePoint}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {baseProduct && (
                            <span className="font-serif font-bold text-xs sm:text-sm text-[#142A1E]">
                              {formatPrice(baseProduct.price)}
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (baseProduct) addToCart(baseProduct, 1);
                              setSearchOpen(false);
                            }}
                            className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold"
                            title="Thêm vào giỏ"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-10 text-center text-xs text-[#718478]">
                    <Search className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                    <span>{t.nav.searchNotFound}</span>
                  </div>
                )
              ) : (
                /* Default suggestions when query is empty */
                <div className="space-y-2 py-2">
                  <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-[#798C7F] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Gợi ý nổi bật</span>
                  </div>
                  {t.products.items.slice(0, 4).map((item) => {
                    const baseProduct = PRODUCTS.find((p) => p.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="py-2 px-3 rounded-2xl hover:bg-white transition-all flex items-center justify-between gap-3 group cursor-pointer"
                        onClick={() => {
                          if (baseProduct) {
                            setQuickViewProduct(baseProduct);
                          }
                          setSearchOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {baseProduct && (
                            <div className="relative w-10 h-10 rounded-xl bg-[#FAF8F5] flex-shrink-0 p-1 border border-[#EAE2D5] overflow-hidden">
                              <Image
                                src={baseProduct.image}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-[#142A1E] group-hover:text-emerald-800 transition-colors line-clamp-1">
                              {item.name}
                            </h4>
                            <span className="text-[11px] text-[#718478]">
                              {item.volume} • {item.smokePoint}
                            </span>
                          </div>
                        </div>

                        {baseProduct && (
                          <span className="font-serif font-bold text-xs sm:text-sm text-[#142A1E]">
                            {formatPrice(baseProduct.price)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
