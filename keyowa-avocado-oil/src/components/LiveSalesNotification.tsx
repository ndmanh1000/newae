"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, X, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export interface FakeOrderNotification {
  id: string;
  customerName: string;
  gender: "male" | "female";
  location: string;
  quantity: number;
  productName: string;
  productId: string;
  productImage: string;
  timeAgo: string;
  initials: string;
  avatarBg: string;
}

const FAKE_ORDERS: FakeOrderNotification[] = [
  {
    id: "ord-1",
    customerName: "Chị Lan Anh",
    gender: "female",
    location: "Cầu Giấy, Hà Nội",
    quantity: 5,
    productName: "Dầu Bơ KEYAVO Extra Virgin 500ml",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "Vừa xong",
    initials: "LA",
    avatarBg: "bg-emerald-600",
  },
  {
    id: "ord-2",
    customerName: "Chị Bích Phương",
    gender: "female",
    location: "Quận 1, TP. Hồ Chí Minh",
    quantity: 20,
    productName: "Dầu Bơ KEYAVO 500ml (Đơn sỉ F&B)",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "1 phút trước",
    initials: "BP",
    avatarBg: "bg-rose-600",
  },
  {
    id: "ord-3",
    customerName: "Chị Thu Trang",
    gender: "female",
    location: "Hải Châu, Đà Nẵng",
    quantity: 3,
    productName: "Dầu Bơ KEYAVO Kids & Baby 250ml",
    productId: "keyavo-baby-250ml",
    productImage: "/images/product-250ml.webp",
    timeAgo: "2 phút trước",
    initials: "TT",
    avatarBg: "bg-amber-600",
  },
  {
    id: "ord-4",
    customerName: "Anh Minh Tuấn",
    gender: "male",
    location: "Bình Thạnh, TP. Hồ Chí Minh",
    quantity: 2,
    productName: "Bộ Hộp Quà Gourmet Chef Gift Set",
    productId: "keyavo-giftset",
    productImage: "/images/product-giftset.webp",
    timeAgo: "2 phút trước",
    initials: "MT",
    avatarBg: "bg-blue-600",
  },
  {
    id: "ord-5",
    customerName: "Anh Đức Huy",
    gender: "male",
    location: "Ninh Kiều, Cần Thơ",
    quantity: 4,
    productName: "Dầu Bơ KEYAVO Extra Virgin 500ml",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "3 phút trước",
    initials: "ĐH",
    avatarBg: "bg-teal-600",
  },
  {
    id: "ord-6",
    customerName: "Chị Mai Hương",
    gender: "female",
    location: "Thủ Dầu Một, Bình Dương",
    quantity: 1,
    productName: "Chai Mini Dropper 100ml (Ăn dặm & Skincare)",
    productId: "keyavo-dropper-100ml",
    productImage: "/images/product-100ml.webp",
    timeAgo: "3 phút trước",
    initials: "MH",
    avatarBg: "bg-violet-600",
  },
  {
    id: "ord-7",
    customerName: "Đầu bếp Quốc Kiệt",
    gender: "male",
    location: "Nha Trang, Khánh Hòa",
    quantity: 10,
    productName: "Dầu Bơ KEYAVO Điểm Khói 270°C Bếp Sao",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "4 phút trước",
    initials: "QK",
    avatarBg: "bg-orange-600",
  },
  {
    id: "ord-8",
    customerName: "Chị Ngọc Hân",
    gender: "female",
    location: "Buôn Ma Thuột, Đắk Lắk",
    quantity: 3,
    productName: "Dầu Bơ KEYAVO Kids & Baby 250ml",
    productId: "keyavo-baby-250ml",
    productImage: "/images/product-250ml.webp",
    timeAgo: "4 phút trước",
    initials: "NH",
    avatarBg: "bg-emerald-700",
  },
  {
    id: "ord-9",
    customerName: "Bác Sĩ Hoàng Nam",
    gender: "male",
    location: "Hạ Long, Quảng Ninh",
    quantity: 5,
    productName: "Dầu Bơ KEYAVO Extra Virgin 500ml",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "5 phút trước",
    initials: "HN",
    avatarBg: "bg-cyan-700",
  },
  {
    id: "ord-10",
    customerName: "Chị Kim Ngân",
    gender: "female",
    location: "TP. Thủ Đức, TP. Hồ Chí Minh",
    quantity: 2,
    productName: "Dầu Bơ KEYAVO 500ml + Tặng Ebook 50 Công Thức",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "5 phút trước",
    initials: "KN",
    avatarBg: "bg-pink-600",
  },
  {
    id: "ord-11",
    customerName: "Anh Trọng Nghĩa",
    gender: "male",
    location: "Biên Hòa, Đồng Nai",
    quantity: 6,
    productName: "Dầu Bơ KEYAVO Extra Virgin 500ml",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "6 phút trước",
    initials: "TN",
    avatarBg: "bg-indigo-600",
  },
  {
    id: "ord-12",
    customerName: "Chị Thanh Trúc",
    gender: "female",
    location: "TP. Huế",
    quantity: 2,
    productName: "Bộ Hộp Quà Gourmet Chef Gift Set",
    productId: "keyavo-giftset",
    productImage: "/images/product-giftset.webp",
    timeAgo: "7 phút trước",
    initials: "TT",
    avatarBg: "bg-purple-600",
  },
  {
    id: "ord-13",
    customerName: "Anh Việt Dũng",
    gender: "male",
    location: "TP. Nam Định",
    quantity: 3,
    productName: "Dầu Bơ KEYAVO Extra Virgin 500ml",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "8 phút trước",
    initials: "VD",
    avatarBg: "bg-emerald-600",
  },
  {
    id: "ord-14",
    customerName: "Chị Phương Thảo",
    gender: "female",
    location: "Hà Đông, Hà Nội",
    quantity: 4,
    productName: "Dầu Bơ KEYAVO Kids & Baby 250ml",
    productId: "keyavo-baby-250ml",
    productImage: "/images/product-250ml.webp",
    timeAgo: "9 phút trước",
    initials: "PT",
    avatarBg: "bg-rose-500",
  },
  {
    id: "ord-15",
    customerName: "Anh Quang Khải",
    gender: "male",
    location: "TP. Thái Nguyên",
    quantity: 12,
    productName: "Dầu Bơ KEYAVO 500ml (Chuỗi Nhà Hàng Steak)",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "10 phút trước",
    initials: "QK",
    avatarBg: "bg-amber-700",
  },
  {
    id: "ord-16",
    customerName: "Chị Thùy Dung",
    gender: "female",
    location: "TP. Bắc Ninh",
    quantity: 2,
    productName: "Chai Mini Dropper 100ml Skincare",
    productId: "keyavo-dropper-100ml",
    productImage: "/images/product-100ml.webp",
    timeAgo: "11 phút trước",
    initials: "TD",
    avatarBg: "bg-teal-700",
  },
  {
    id: "ord-17",
    customerName: "Anh Bảo Long",
    gender: "male",
    location: "TP. Vũng Tàu",
    quantity: 5,
    productName: "Dầu Bơ KEYAVO Extra Virgin 500ml",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "12 phút trước",
    initials: "BL",
    avatarBg: "bg-sky-700",
  },
  {
    id: "ord-18",
    customerName: "Chị Diệu Linh",
    gender: "female",
    location: "Tây Hồ, Hà Nội",
    quantity: 3,
    productName: "Bộ Hộp Quà Gourmet Chef Gift Set",
    productId: "keyavo-giftset",
    productImage: "/images/product-giftset.webp",
    timeAgo: "13 phút trước",
    initials: "DL",
    avatarBg: "bg-fuchsia-600",
  },
  {
    id: "ord-19",
    customerName: "Bác Sĩ Thanh Bình",
    gender: "male",
    location: "Quận 3, TP. Hồ Chí Minh",
    quantity: 4,
    productName: "Dầu Bơ KEYAVO Ép Lạnh Nguyên Chất 500ml",
    productId: "keyavo-500ml",
    productImage: "/images/product-500ml.webp",
    timeAgo: "14 phút trước",
    initials: "TB",
    avatarBg: "bg-blue-700",
  },
  {
    id: "ord-20",
    customerName: "Chị Ánh Tuyết",
    gender: "female",
    location: "TP. Vinh, Nghệ An",
    quantity: 2,
    productName: "Dầu Bơ KEYAVO Kids & Baby 250ml",
    productId: "keyavo-baby-250ml",
    productImage: "/images/product-250ml.webp",
    timeAgo: "15 phút trước",
    initials: "AT",
    avatarBg: "bg-emerald-600",
  },
];

export default function LiveSalesNotification() {
  const { isOpen: isCartOpen, setQuickViewProduct } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Timer ref to manage 4s display and 400ms transition
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial delay of 2.5s after page load before first notification
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(initialDelay);
  }, []);

  // 4s Cycle loop
  useEffect(() => {
    if (isDismissed || !isVisible || isPaused || isCartOpen) return;

    // Display for 4 seconds, then transition to next notification
    timerRef.current = setTimeout(() => {
      // Step 1: Fade out
      setIsVisible(false);

      // Step 2: Switch data and fade back in after 400ms transition
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % FAKE_ORDERS.length);
        setIsVisible(true);
      }, 400);
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isVisible, isPaused, isDismissed, isCartOpen]);

  const currentOrder = FAKE_ORDERS[currentIndex];

  const handleCardClick = () => {
    const matchedProduct = PRODUCTS.find((p) => p.id === currentOrder.productId);
    if (matchedProduct) {
      setQuickViewProduct(matchedProduct);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    // Pause for 30s before resuming or dismiss
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FAKE_ORDERS.length);
      setIsVisible(true);
    }, 30000);
  };

  if (isDismissed || isCartOpen) return null;

  return (
    <div
      className={`fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-86px)] sm:max-w-[380px] w-auto transition-all duration-500 ease-out select-none print:hidden ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        onClick={handleCardClick}
        className="group relative bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E6DDD0] hover:border-emerald-600/50 rounded-2xl shadow-xl hover:shadow-2xl p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      >
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Product Thumbnail with Verified Checkmark */}
        <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white border border-[#E9E1D4] overflow-hidden flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
          <Image
            src={currentOrder.productImage}
            alt={currentOrder.productName}
            fill
            sizes="(max-width: 640px) 44px, 56px"
            className="object-contain p-0.5 sm:p-1"
          />
          {/* Verified purchase micro badge */}
          <span
            className="absolute -bottom-0.5 -right-0.5 bg-emerald-600 text-white rounded-full p-0.5 border-1.5 sm:border-2 border-white shadow-xs"
            title="Đơn hàng đã được xác thực"
          >
            <CheckCircle2 className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
          </span>
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 pr-3 sm:pr-4">
          {/* Customer Name & Location */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full text-[8.5px] sm:text-[9px] font-bold text-white flex-shrink-0 ${currentOrder.avatarBg}`}
            >
              {currentOrder.initials}
            </span>
            <span className="font-bold text-[11.5px] sm:text-[13px] text-[#142A1E] truncate max-w-[105px] sm:max-w-[150px]">
              {currentOrder.customerName}
            </span>
            <span className="text-[9.5px] sm:text-[11px] text-[#697E72] truncate max-w-[85px] sm:max-w-[120px]">
              • {currentOrder.location}
            </span>
          </div>

          {/* Order Action & Quantity Highlight */}
          <div className="text-[11px] sm:text-[12.5px] text-[#243A2D] leading-snug mt-0.5 font-medium truncate">
            Đã đặt thành công{" "}
            <span className="font-extrabold text-emerald-800 bg-[#E2F79E]/90 px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded text-[10.5px] sm:text-xs inline-block">
              {currentOrder.quantity} chai
            </span>
          </div>

          {/* Product Name & Timestamp */}
          <div className="text-[10px] sm:text-[10.5px] text-[#718579] truncate mt-0.5 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-semibold truncate max-w-[130px] sm:max-w-[210px]">
              {currentOrder.productName}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 whitespace-nowrap text-[9.5px] sm:text-[10px]">{currentOrder.timeAgo}</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleClose}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          title="Đóng thông báo"
          aria-label="Đóng thông báo"
        >
          <X className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
        </button>

        {/* 4-Second Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E8E1D5]/60 overflow-hidden">
          <div
            key={currentIndex}
            className={`h-full bg-gradient-to-r from-emerald-500 via-[#84CC16] to-amber-400 ${
              isVisible && !isPaused ? "animate-live-progress" : ""
            }`}
            style={{
              animationDuration: "4000ms",
              animationTimingFunction: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
