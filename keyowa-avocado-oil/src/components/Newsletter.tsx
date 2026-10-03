"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Sparkles, Copy, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Newsletter() {
  const { t } = useLanguage();
  const data = t.newsletter;

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText("KEYAVO15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="newsletter" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9E1D4] shadow-md hover:shadow-xl transition-all duration-500 relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl pointer-events-none animate-blob" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-blob-reverse" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-coral bg-coral-light px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse-slow" />
              <span>{data.badge}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#142A1E]">
              {data.title}
            </h3>

            <p className="text-sm sm:text-base text-[#526659] font-normal leading-relaxed">
              {data.desc}
            </p>
          </div>

          {/* Right Form / Success Display */}
          <div className="lg:col-span-5">
            {isSubmitted ? (
              <div className="bg-[#FAF8F5] border border-emerald-300 rounded-2xl p-6 text-center space-y-3 animate-fade-in">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-[#142A1E]">
                  {data.congrats}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-xl font-extrabold text-coral bg-white px-4 py-2 rounded-xl border border-coral/30 tracking-wider">
                    KEYAVO15
                  </span>
                  <button
                    onClick={copyCode}
                    className="p-2.5 rounded-xl bg-[#142A1E] text-white hover:bg-emerald-900 transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-[#697B70]">
                  {data.terms}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8E81]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={data.placeholder}
                      className="w-full pl-11 pr-4 py-3.5 rounded-full border border-[#D5CDC0] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-[#FAF8F5] text-[#142A1E] transition-all duration-200"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative overflow-hidden bg-gradient-to-r from-[#F26438] to-[#E34A1E] hover:from-[#e3562b] hover:to-[#ce3c12] text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#F26438]/25 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer btn-glow-coral whitespace-nowrap cursor-pointer"
                  >
                    <span className="relative z-10">{data.btn}</span>
                  </button>
                </div>
                <div className="text-[11px] text-[#788B7F] px-3">
                  {data.privacy}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
