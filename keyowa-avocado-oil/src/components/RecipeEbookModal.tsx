"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, BookOpen, Download, Check, Sparkles, ShieldCheck, Mail, ArrowRight } from "lucide-react";

interface RecipeEbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeEbookModal({ isOpen, onClose }: RecipeEbookModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setSubmitted(true);
      // Simulate download trigger
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", "Keyavo-50-Cong-Thuc-Am-Thuc-5-Sao.pdf");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full border border-[#E2DDD3] shadow-2xl overflow-hidden z-10 p-6 sm:p-10 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
                <BookOpen className="w-6 h-6 text-emerald-700" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  DIGITAL E-BOOK MIỄN PHÍ
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142A1E] mt-1">
                  Tuyệt Phẩm 50+ Công Thức Ẩm Thực Bếp Sao
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4E6256] leading-relaxed">
              Cẩm nang độc quyền 68 trang định dạng PDF chất lượng cao, tổng hợp các công thức món ăn Eat-Clean, Steak chuẩn nhiệt 270°C, mì Ý sốt bơ tỏi và thực đơn ăn dặm giàu Omega-9 biên soạn cùng các Executive Chef.
            </p>

            <div className="bg-white p-4 rounded-2xl border border-[#E9E1D4] space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-[#20402E]">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Chi tiết định lượng gram & calo cho từng khẩu phần ăn</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#20402E]">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Bí quyết kiểm soát nhiệt độ chảo và điểm khói 270°C</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#20402E]">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tặng kèm voucher giảm giá 15% cho đơn hàng đầu tiên</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn để nhận E-Book..."
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#DED5C7] text-base sm:text-sm text-[#142A1E] placeholder:text-gray-400 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isDownloading}
                  className="inline-flex items-center justify-center gap-2 bg-[#E55B38] hover:bg-[#cf4c2a] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95 disabled:opacity-70"
                >
                  {isDownloading ? (
                    <span>Đang tạo file PDF...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Tải Về Ngay (PDF 68 Trang)</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-[11px] text-[#718579] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cam kết bảo mật 100% • Không spam thư rác</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#142A1E]">
                Đã gửi E-Book tới email của bạn!
              </h3>
              <p className="text-xs sm:text-sm text-[#506357] max-w-md mx-auto leading-relaxed">
                Vui lòng kiểm tra hòm thư <strong className="text-emerald-800">{email}</strong> để tải về trọn bộ PDF 50+ công thức ẩm thực chuẩn sao Michelin cùng mã ưu đãi <strong>KEYAVO15</strong>.
              </p>
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#142A1E] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full hover:bg-emerald-950 transition-all cursor-pointer"
            >
              <span>Tiếp tục khám phá công thức</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
