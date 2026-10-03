"use client";

import React, { useState } from "react";
import { ArrowRight, UtensilsCrossed, Building2, Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function B2BBanner() {
  const { t } = useLanguage();
  const data = t.b2b;

  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    restaurant: "",
    phone: "",
    email: "",
    need: data.opt1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
    }, 2000);
  };

  return (
    <>
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#142A1E] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#274D38] shadow-lg">
          {/* Animated background blobs */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none animate-blob" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none animate-blob-reverse" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/60 border border-emerald-600/40 flex items-center justify-center text-emerald-400 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12">
              <UtensilsCrossed className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-emerald-300 font-bold mb-1">
                {data.tag}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {data.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/70 mt-0.5">
                {data.desc}
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="group/b2b relative overflow-hidden w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 bg-white text-[#142A1E] hover:bg-emerald-50 text-sm font-bold px-7 py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer cursor-pointer relative z-10"
          >
            <span className="relative z-10">{data.btn}</span>
            <ArrowRight className="w-4 h-4 text-emerald-800 relative z-10 transition-transform duration-300 group-hover/b2b:translate-x-1.5" />
          </button>
        </div>
      </section>

      {/* B2B Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E8E1D5] relative animate-scale-in">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                {data.modalBadge}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#142A1E]">
                {data.modalTitle}
              </h3>
              <p className="text-xs text-[#5C6E62]">
                {data.modalSub}
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#142A1E]">
                  {data.successTitle}
                </h4>
                <p className="text-xs text-[#5C6E62]">
                  {data.successSub}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2A3D31] mb-1">
                    {data.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyen Van A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5CDC0] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3D31] mb-1">
                      {data.restLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Le Gourmet Restaurant"
                      value={formData.restaurant}
                      onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CDC0] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A3D31] mb-1">
                      {data.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+84 912 xxx xxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CDC0] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3D31] mb-1">
                    {data.needLabel}
                  </label>
                  <select
                    value={formData.need}
                    onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5CDC0] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  >
                    <option>{data.opt1}</option>
                    <option>{data.opt2}</option>
                    <option>{data.opt3}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="group relative overflow-hidden w-full bg-[#142A1E] hover:bg-emerald-950 text-white font-bold py-3.5 rounded-xl shadow-lg text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] btn-shimmer cursor-pointer"
                >
                  <span className="relative z-10">{data.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
