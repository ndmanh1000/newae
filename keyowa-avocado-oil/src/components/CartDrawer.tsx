"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Tag,
  Check,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Copy,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  const { t, formatPrice } = useLanguage();
  const cartData = t.cart;
  const formText = cartData.checkoutForm;

  // View state: "cart" | "checkout" | "success"
  const [viewStep, setViewStep] = useState<"cart" | "checkout" | "success">("cart");

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");

  // Checkout form fields
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "cod",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [copiedOrder, setCopiedOrder] = useState(false);

  // Free shipping threshold: 500,000 VND
  const freeShippingThreshold = 500000;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "KEYOWA15") {
      setDiscountPercent(15);
      setCouponError("");
    } else {
      setCouponError(cartData.couponError);
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 30000;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleStartCheckout = () => {
    setViewStep("checkout");
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedCode = `KYW-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCode(generatedCode);

    setTimeout(() => {
      setIsSubmitting(false);
      setViewStep("success");
      clearCart();
    }, 1200);
  };

  const handleFinish = () => {
    setViewStep("cart");
    closeCart();
  };

  const copyOrderCode = () => {
    navigator.clipboard.writeText(orderCode);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => {
          if (viewStep === "success") handleFinish();
          else closeCart();
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:max-w-md sm:pl-6">
        <div className="w-full bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E5DDD0] h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#EAE2D5] flex items-center justify-between">
            {viewStep === "checkout" ? (
              <button
                onClick={() => setViewStep("cart")}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#142A1E] hover:text-emerald-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{formText.backBtn}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-emerald-800" />
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#142A1E]">
                  {viewStep === "success"
                    ? formText.successTitle
                    : `${cartData.title} (${totalItems})`}
                </h2>
              </div>
            )}

            <button
              onClick={() => {
                if (viewStep === "success") handleFinish();
                else closeCart();
              }}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ============================================================ */}
          {/* STEP 1: CART ITEMS VIEW */}
          {/* ============================================================ */}
          {viewStep === "cart" && (
            <>
              {/* Free Shipping Progress Bar */}
              <div className="bg-[#F3EFE7] px-4 sm:px-6 py-2.5 border-b border-[#EAE2D5]">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-[#3F5447] mb-1">
                  <span className="truncate pr-2">
                    {remainingForFreeShipping === 0
                      ? cartData.freeShippingSuccess
                      : `${cartData.freeShippingAdd}${formatPrice(remainingForFreeShipping)}${cartData.freeShippingSuffix}`}
                  </span>
                  <span className="flex-shrink-0 font-bold">{Math.round(shippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 sm:h-2 bg-[#DDD5C7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Item List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
                {cart.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#EDE5D8] rounded-full flex items-center justify-center mx-auto text-[#798C7F]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#142A1E]">
                      {cartData.emptyTitle}
                    </h3>
                    <p className="text-xs text-[#6B7E72] max-w-xs mx-auto">
                      {cartData.emptyDesc}
                    </p>
                    <button
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 bg-[#142A1E] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-emerald-900 transition-colors"
                    >
                      {cartData.exploreBtn}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    // Find active localized product data to match current language
                    const localized = t.products.items.find(
                      (p) => p.id === item.product.id
                    );
                    const displayName = localized?.name || item.product.name;
                    const displayVolume = localized?.volume || item.product.volume;
                    const displaySmokePoint =
                      localized?.smokePoint || item.product.smokePoint;

                    return (
                      <div
                        key={item.product.id}
                        className="bg-white rounded-2xl p-3 sm:p-4 border border-[#ECE4D8] shadow-sm hover:shadow-md transition-all flex gap-3 sm:gap-4 items-center"
                      >
                        {/* Product Image */}
                        <div className="relative w-18 h-18 sm:w-20 sm:h-20 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-xl overflow-hidden bg-[#FAF8F5] flex-shrink-0 p-1 border border-[#F0EBE2]">
                          <Image
                            src={item.product.image}
                            alt={displayName}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        {/* Product Content Column */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          {/* Row 1: Title and Delete Button */}
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-[#142A1E] leading-snug line-clamp-1">
                              {displayName}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 -mr-1 -mt-1 text-gray-400 hover:text-rose-600 transition-colors flex-shrink-0"
                              title="Xóa khỏi giỏ"
                              aria-label="Xóa sản phẩm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Row 2: Specs (Volume & Attribute) */}
                          <div className="text-[11px] sm:text-xs text-[#718478] my-1 flex items-center gap-1.5">
                            <span>{displayVolume}</span>
                            <span>•</span>
                            <span className="text-emerald-800 font-medium truncate">
                              {displaySmokePoint}
                            </span>
                          </div>

                          {/* Row 3: Price and Quantity Stepper */}
                          <div className="flex items-center justify-between mt-1 pt-0.5">
                            <span className="font-serif font-bold text-sm sm:text-base text-[#142A1E]">
                              {formatPrice(item.product.price)}
                            </span>

                            {/* Quantity Controls Pill (Matching screenshot) */}
                            <div className="flex items-center gap-2.5 border border-[#D5CDC0] rounded-full px-2.5 py-0.5 sm:py-1 bg-white shadow-2xs">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="p-0.5 text-[#55695D] hover:text-[#142A1E] transition-all duration-150 hover:scale-125 active:scale-90 cursor-pointer"
                                aria-label="Giảm số lượng"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-[#142A1E] w-4 text-center select-none font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="p-0.5 text-[#55695D] hover:text-[#142A1E] transition-all duration-150 hover:scale-125 active:scale-90 cursor-pointer"
                                aria-label="Tăng số lượng"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="bg-white p-4 sm:p-5 border-t border-[#EAE2D5] space-y-3 sm:space-y-4">
                  {/* Coupon Box */}
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder={cartData.couponPlaceholder}
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-[#D7CFC2] text-xs uppercase focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono"
                        />
                      </div>
                      <button
                        onClick={applyCoupon}
                        className="px-3.5 py-2 bg-[#F3EFE7] hover:bg-[#EAE2D5] text-[#142A1E] rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                      >
                        {cartData.applyBtn}
                      </button>
                    </div>
                    {discountPercent > 0 && (
                      <div className="text-[11px] text-emerald-700 font-semibold">
                        {cartData.couponApplied}
                      </div>
                    )}
                    {couponError && (
                      <div className="text-[11px] text-rose-600 font-medium">
                        {couponError}
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-1 text-xs text-[#526659] border-t border-[#F2EDE4] pt-2.5">
                    <div className="flex justify-between">
                      <span>{cartData.subtotal} ({totalItems})</span>
                      <span className="font-semibold text-[#142A1E]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-coral font-medium">
                        <span>{cartData.voucher}</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>{cartData.shipping}</span>
                      <span>
                        {shippingFee === 0 ? (
                          <span className="text-emerald-700 font-bold">{cartData.free}</span>
                        ) : (
                          formatPrice(shippingFee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base font-extrabold text-[#142A1E] border-t border-[#F2EDE4] pt-2">
                      <span>{cartData.total}</span>
                      <span className="font-serif text-lg text-emerald-800">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Proceed to Form Button */}
                  <button
                    onClick={handleStartCheckout}
                    className="group relative overflow-hidden w-full bg-gradient-to-r from-[#F26438] to-[#E34A1E] hover:from-[#e3562b] hover:to-[#ce3c12] text-white font-bold py-3.5 rounded-full shadow-lg shadow-[#F26438]/25 flex items-center justify-center gap-2 text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] btn-shimmer btn-glow-coral cursor-pointer"
                  >
                    <span className="relative z-10">{cartData.checkoutBtn}</span>
                    <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* ============================================================ */}
          {/* STEP 2: CHECKOUT & DELIVERY FORM */}
          {/* ============================================================ */}
          {viewStep === "checkout" && (
            <form
              onSubmit={handleSubmitOrder}
              className="flex-1 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                <div className="bg-emerald-50/80 rounded-2xl p-3 border border-emerald-200/80 text-xs text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>{formText.heading}</span>
                </div>

                {/* Recipient Name */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3D31] mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span>{formText.name} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={formText.namePlaceholder}
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3D31] mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      <span>{formText.phone} *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={formText.phonePlaceholder}
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3D31] mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <span>{formText.email}</span>
                    </label>
                    <input
                      type="email"
                      placeholder={formText.emailPlaceholder}
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3D31] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{formText.address} *</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder={formText.addressPlaceholder}
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, address: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white resize-none"
                  />
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3D31] mb-1.5">
                    {formText.paymentMethod} *
                  </label>

                  <div className="space-y-2">
                    {/* COD */}
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        customerInfo.paymentMethod === "cod"
                          ? "bg-emerald-50/80 border-emerald-600 shadow-sm"
                          : "bg-white border-[#E0D7C9] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={customerInfo.paymentMethod === "cod"}
                        onChange={() =>
                          setCustomerInfo({ ...customerInfo, paymentMethod: "cod" })
                        }
                        className="mt-1 text-emerald-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#142A1E]">
                          <Banknote className="w-4 h-4 text-emerald-700" />
                          <span>{formText.paymentCOD}</span>
                        </div>
                        <div className="text-[11px] text-[#697E72] mt-0.5">
                          {formText.paymentCODDesc}
                        </div>
                      </div>
                    </label>

                    {/* Bank Transfer QR */}
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        customerInfo.paymentMethod === "qr"
                          ? "bg-emerald-50/80 border-emerald-600 shadow-sm"
                          : "bg-white border-[#E0D7C9] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="qr"
                        checked={customerInfo.paymentMethod === "qr"}
                        onChange={() =>
                          setCustomerInfo({ ...customerInfo, paymentMethod: "qr" })
                        }
                        className="mt-1 text-emerald-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#142A1E]">
                          <QrCode className="w-4 h-4 text-emerald-700" />
                          <span>{formText.paymentQR}</span>
                        </div>
                        <div className="text-[11px] text-[#697E72] mt-0.5">
                          {formText.paymentQRDesc}
                        </div>
                      </div>
                    </label>

                    {/* Credit Card */}
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        customerInfo.paymentMethod === "card"
                          ? "bg-emerald-50/80 border-emerald-600 shadow-sm"
                          : "bg-white border-[#E0D7C9] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={customerInfo.paymentMethod === "card"}
                        onChange={() =>
                          setCustomerInfo({ ...customerInfo, paymentMethod: "card" })
                        }
                        className="mt-1 text-emerald-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#142A1E]">
                          <CreditCard className="w-4 h-4 text-emerald-700" />
                          <span>{formText.paymentCard}</span>
                        </div>
                        <div className="text-[11px] text-[#697E72] mt-0.5">
                          {formText.paymentCardDesc}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3D31] mb-1">
                    {formText.notes}
                  </label>
                  <input
                    type="text"
                    placeholder={formText.notesPlaceholder}
                    value={customerInfo.notes}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, notes: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>

              {/* Order Submission Footer */}
              <div className="bg-white p-4 sm:p-5 border-t border-[#EAE2D5] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#64776A]">{formText.orderSummary}:</span>
                  <span className="font-serif text-base font-extrabold text-emerald-900">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden w-full bg-gradient-to-r from-[#F26438] to-[#E34A1E] hover:from-[#e3562b] hover:to-[#ce3c12] disabled:opacity-50 text-white font-bold py-3.5 rounded-full shadow-lg shadow-[#F26438]/25 flex items-center justify-center gap-2 text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] btn-shimmer btn-glow-coral cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="relative z-10">{formText.submittingBtn}</span>
                  ) : (
                    <>
                      <span className="relative z-10">{formText.submitBtn}</span>
                      <Check className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-125" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
          {/* ============================================================ */}
          {viewStep === "success" && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-between space-y-6 animate-fade-in">
              <div className="space-y-6 pt-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8" />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#142A1E]">
                    {formText.successTitle}
                  </h3>
                  <p className="text-xs text-[#526659] max-w-xs mx-auto">
                    {formText.successDesc}
                  </p>
                </div>

                {/* Order Code Box */}
                <div className="bg-white rounded-2xl p-4 border border-[#E7DFD2] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#718478] font-medium">
                      {formText.orderCode}
                    </div>
                    <div className="font-mono text-base font-extrabold text-emerald-900 tracking-wider">
                      {orderCode}
                    </div>
                  </div>
                  <button
                    onClick={copyOrderCode}
                    className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F0EAE0] text-[#142A1E] transition-colors border border-[#DDD5C7]"
                    title="Copy Order Code"
                  >
                    {copiedOrder ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Summary Info */}
                <div className="bg-white rounded-2xl p-4 border border-[#E7DFD2] shadow-sm space-y-2.5 text-xs text-[#364A3D]">
                  <div className="font-bold border-b border-[#F0EBE2] pb-1.5 flex items-center gap-1.5 text-[#142A1E]">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{formText.deliveryTo}</span>
                  </div>
                  <div>
                    <strong>{customerInfo.name}</strong> • {customerInfo.phone}
                  </div>
                  <div className="text-[#5F7365] leading-relaxed">
                    {customerInfo.address}
                  </div>
                  <div className="pt-2 border-t border-[#F0EBE2] flex items-center justify-between text-[#142A1E]">
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <Truck className="w-3.5 h-3.5" />
                      <span>{formText.estimatedDelivery}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE2D5]">
                <button
                  onClick={handleFinish}
                  className="group relative overflow-hidden w-full bg-[#142A1E] hover:bg-emerald-950 text-white font-bold py-3.5 rounded-full shadow text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] btn-shimmer cursor-pointer"
                >
                  <span className="relative z-10">{formText.continueShopping}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
