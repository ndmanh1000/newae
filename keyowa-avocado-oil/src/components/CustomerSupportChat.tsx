"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  Minimize2,
  CheckCheck,
  Bot,
  Flame,
  Baby,
  Tag,
  Headphones,
  RotateCcw,
  ArrowUp,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { PRODUCTS } from "@/data/products";

import { generateSmartReply, AiResponseResult } from "@/lib/chatAiEngine";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  actionType?: "voucher" | "product" | "contact";
  productId?: string;
  source?: "gemini-llm" | "knowledge-engine";
}

const QUICK_QUESTIONS = [
  {
    icon: <Flame className="w-3.5 h-3.5 text-amber-500" />,
    text: "Dầu bơ chiên xào có bị khét không?",
    key: "smoke-point",
  },
  {
    icon: <Baby className="w-3.5 h-3.5 text-pink-500" />,
    text: "Bé mấy tháng thì dùng được dầu bơ?",
    key: "baby",
  },
  {
    icon: <Tag className="w-3.5 h-3.5 text-emerald-500" />,
    text: "Lấy mã giảm giá 15% & Freeship",
    key: "voucher",
  },
  {
    icon: <ShoppingBag className="w-3.5 h-3.5 text-blue-500" />,
    text: "Nên chọn chai 250ml hay 500ml?",
    key: "recommend",
  },
];

export default function CustomerSupportChat() {
  const { addToCart, openCart } = useCart();
  const { formatPrice } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showTeaser, setShowTeaser] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position to show "Back to Top" arrow when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome-1",
      sender: "bot",
      text: "Dạ em chào anh/chị! Em là Thu Hà - Chuyên viên Dinh dưỡng & CSKH của KEYAVO. 🥑✨",
      time: getCurrentTime(),
    },
    {
      id: "msg-welcome-2",
      sender: "bot",
      text: "Anh/chị đang cần tư vấn về dòng dầu bơ chiên xào điểm khói 270°C, thực đơn ăn dặm cho bé hay cần nhận mã ưu đãi 15% ạ?",
      time: getCurrentTime(),
      actionType: "voucher",
    },
  ]);

  // Show teaser bubble after 3.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setHasUnread(false);
      setShowTeaser(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
    setShowTeaser(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "msg-welcome-1",
        sender: "bot",
        text: "Dạ em chào anh/chị! Em là Thu Hà - Chuyên viên Dinh dưỡng & CSKH của KEYAVO. 🥑✨",
        time: getCurrentTime(),
      },
      {
        id: "msg-welcome-2",
        sender: "bot",
        text: "Anh/chị cứ đặt bất kỳ câu hỏi nào về dầu bơ, cách nấu nướng, liều lượng ăn dặm hay công dụng sức khỏe, em sẵn sàng giải đáp ngay ạ!",
        time: getCurrentTime(),
        actionType: "voucher",
      },
    ]);
  };

  const botReply = async (queryKeyOrText: string) => {
    setIsTyping(true);

    try {
      // Call /api/chat with abort controller timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: queryKeyOrText }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: "bot",
            text: data.reply,
            time: getCurrentTime(),
            actionType: data.actionType,
            productId: data.productId,
            source: data.source,
          },
        ]);
        setIsTyping(false);
        return;
      }
    } catch {
      // ignore & fallback to local smart AI knowledge engine
    }

    // Fallback directly to client-side Knowledge Engine
    setTimeout(() => {
      const smartResult: AiResponseResult = generateSmartReply(queryKeyOrText);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: "bot",
          text: smartResult.reply,
          time: getCurrentTime(),
          actionType: smartResult.actionType,
          productId: smartResult.productId,
          source: "knowledge-engine",
        },
      ]);
      setIsTyping(false);
    }, 550);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    // Trigger bot reply
    botReply(text);
  };

  const handleQuickQuestionClick = (q: (typeof QUICK_QUESTIONS)[0]) => {
    handleSendMessage(q.text);
  };

  const handleApplyVoucher = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("KEYAVO15");
      alert("Đã sao chép mã KEYAVO15 (giảm 15% toàn đơn hàng)!");
    }
  };

  const handleAddToCart = (pId: string) => {
    const prod = PRODUCTS.find((p) => p.id === pId) || PRODUCTS[0];
    addToCart(prod, 1);
    openCart();
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none print:hidden flex flex-col items-center">
      {/* ============================================================ */}
      {/* 0. SCROLL TO TOP BUTTON (Directly above chat button) */}
      {/* ============================================================ */}
      {showScrollTop && !isOpen && (
        <div className="mb-2.5 transition-all duration-300 self-center">
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#142A1E] text-[#142A1E] hover:text-[#D4F666] border border-[#E3DBD0] hover:border-[#142A1E] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer ring-4 ring-white/90"
            title="Lên đầu trang"
            aria-label="Cuộn lên đầu trang"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />

            {/* Tooltip on hover */}
            <span className="absolute right-14 sm:right-16 bg-[#142A1E] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-emerald-900/60">
              Lên đầu trang
            </span>
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. FLOATING CHAT LAUNCHER BUTTON & TEASER TOOLTIP */}
      {/* ============================================================ */}
      {!isOpen && (
        <div className="relative flex items-center">
          {/* Teaser Bubble (Appears after 3.5s) */}
          {showTeaser && (
            <div className="absolute right-16 sm:right-20 bg-white text-[#142A1E] text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-[#E4DDD0] whitespace-nowrap animate-fade-in flex items-center gap-2 group cursor-pointer hover:bg-[#FAF8F5]">
              <div onClick={handleOpen} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>👋 Cần tư vấn dầu bơ? <strong>Chat với Thu Hà ngay!</strong></span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className="text-gray-400 hover:text-gray-700 ml-1 p-0.5"
                aria-label="Đóng thông báo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {/* Arrow pointer */}
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-[#E4DDD0] rotate-45" />
            </div>
          )}

          {/* Main Floating Trigger Button */}
          <button
            onClick={handleOpen}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#142A1E] via-[#1B3B2B] to-[#24523B] text-white shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-white/80"
            aria-label="Mở cửa sổ chat hỗ trợ khách hàng"
            title="Chat hỗ trợ khách hàng KEYAVO"
          >
            {/* Glowing ring animation */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

            {/* Icon */}
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-12" />

            {/* Online Green Indicator Dot */}
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </span>

            {/* Unread notification counter */}
            {hasUnread && (
              <span className="absolute -top-1 -left-1 bg-[#E55B38] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce ring-2 ring-white">
                1
              </span>
            )}
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. CUSTOMER CARE CHAT WINDOW */}
      {/* ============================================================ */}
      {isOpen && (
        <div
          className={`bg-[#FAF8F5] rounded-3xl border border-[#DFD8CC] shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
            isMinimized
              ? "w-72 sm:w-80 h-16"
              : "w-[92vw] sm:w-[390px] h-[580px] max-h-[85vh]"
          }`}
        >
          {/* Top Header Bar */}
          <div className="bg-[#142A1E] text-white px-4 py-3 sm:py-3.5 flex items-center justify-between shadow-md relative z-10">
            {/* Supporter Avatar & Status */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400/80 flex-shrink-0 bg-emerald-900">
                <Image
                  src="/images/story-skincare.webp"
                  alt="Thu Hà - Chuyên viên Dinh dưỡng KEYAVO"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#142A1E]" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-sm text-white line-clamp-1">
                    Thu Hà
                  </span>
                  <span className="text-[10px] bg-emerald-800/80 text-[#86EFAC] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    AI Dược Sĩ
                  </span>
                </div>
                <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Trực tuyến • Trả lời mọi câu hỏi 24/7</span>
                </div>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1 text-gray-300">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Bắt đầu lại cuộc trò chuyện"
                aria-label="Bắt đầu lại"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? "Mở rộng" : "Thu nhỏ"}
                aria-label="Thu nhỏ cửa sổ"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Đóng chat"
                aria-label="Đóng chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* When Not Minimized: Full Chat Body */}
          {!isMinimized && (
            <>
              {/* Direct Channel Switcher Bar (Zalo & Hotline) */}
              <div className="bg-[#1C3727] text-white px-3 py-1.5 flex items-center justify-between text-[11px] border-b border-[#2C543B]">
                <div className="flex items-center gap-1 text-emerald-200">
                  <Headphones className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tổng đài CSKH:</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:19008888"
                    className="font-bold text-amber-300 hover:text-white flex items-center gap-0.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>1900 8888</span>
                  </a>
                  <span className="text-emerald-700">•</span>
                  <a
                    href="https://zalo.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sky-300 hover:text-white flex items-center gap-0.5"
                  >
                    <span>Zalo OA</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF8F5]">
                {/* Security & Authenticity Trust Badge */}
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE4D8]/80 text-[#596D61] text-[10px] font-semibold border border-[#DFD7C9]">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Tư vấn dinh dưỡng 100% bảo mật & miễn phí
                  </span>
                </div>

                {/* Render Messages */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#142A1E] text-white rounded-br-xs"
                          : "bg-white text-[#1C3024] border border-[#E6DFD3] rounded-bl-xs"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Interactive Voucher Card Attachment */}
                      {msg.actionType === "voucher" && (
                        <div className="mt-2.5 pt-2.5 border-t border-[#EFE8DD] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E6DED2] space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
                            <span>MÃ GIẢM GIÁ 15%:</span>
                            <span className="bg-[#D4F666] text-[#142A1E] px-2 py-0.5 rounded font-mono font-extrabold">
                              KEYAVO15
                            </span>
                          </div>
                          <button
                            onClick={handleApplyVoucher}
                            className="w-full text-center text-[11px] font-bold text-white bg-[#E55B38] hover:bg-[#cf4c2a] py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Sao Chép Mã Ưu Đãi
                          </button>
                        </div>
                      )}

                      {/* Interactive Paired Product Card Attachment */}
                      {msg.actionType === "product" && msg.productId && (
                        <div className="mt-2.5 pt-2.5 border-t border-[#EFE8DD] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E6DED2] flex items-center justify-between gap-3">
                          {(() => {
                            const p =
                              PRODUCTS.find((item) => item.id === msg.productId) ||
                              PRODUCTS[0];
                            return (
                              <>
                                <div className="min-w-0">
                                  <div className="font-serif font-bold text-xs text-[#142A1E] truncate">
                                    {p.name}
                                  </div>
                                  <div className="text-[11px] font-bold text-[#E55B38]">
                                    {formatPrice(p.price)}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleAddToCart(p.id)}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#142A1E] text-white px-2.5 py-1.5 rounded-lg hover:bg-emerald-950 transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <ShoppingBag className="w-3 h-3 text-[#D4F666]" />
                                  <span>Mua ngay</span>
                                </button>
                              </>
                            );
                          })()}
                        </div>
                      )}

                      {/* Interactive Hotline Contact Card */}
                      {msg.actionType === "contact" && (
                        <div className="mt-2.5 pt-2 border-t border-[#EFE8DD] flex items-center gap-2">
                          <a
                            href="tel:19008888"
                            className="flex-1 text-center py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-[11px] font-bold"
                          >
                            Gọi Hotline
                          </a>
                          <a
                            href="https://zalo.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-1.5 bg-[#0068FF] hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold"
                          >
                            Chat Zalo
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Timestamp & Status */}
                    <div className="flex items-center gap-1 text-[10px] text-[#788C80] mt-1 px-1">
                      <span>{msg.time}</span>
                      {msg.sender === "user" && (
                        <CheckCheck className="w-3 h-3 text-emerald-600" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-[#63776C] bg-white border border-[#E9E1D4] px-3 py-2 rounded-2xl w-fit shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                    <span className="text-[11px] italic ml-1">Thu Hà đang soạn tin...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Question Pills */}
              <div className="px-3 pt-2 pb-1 bg-[#FAF8F5] border-t border-[#EFE8DC]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#798C7F] mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Câu hỏi thường gặp</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {QUICK_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestionClick(q)}
                      className="whitespace-nowrap flex items-center gap-1 bg-white hover:bg-[#F2ECE1] text-[#2C4134] text-[11px] font-semibold px-2.5 py-1.5 rounded-full border border-[#DED6C8] shadow-2xs transition-all cursor-pointer hover:border-emerald-500"
                    >
                      {q.icon}
                      <span>{q.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-[#EAE2D5] flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhập tin nhắn cần tư vấn..."
                  className="flex-1 bg-[#FAF8F5] border border-[#DED7CB] rounded-full px-4 py-2 text-base sm:text-sm text-[#142A1E] placeholder:text-gray-400 focus:outline-none focus:border-emerald-600"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-full bg-[#142A1E] text-white hover:bg-emerald-950 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0 shadow-sm active:scale-95"
                  aria-label="Gửi tin nhắn"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
