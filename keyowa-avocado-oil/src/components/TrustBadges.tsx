"use client";

import React from "react";
import { Leaf, Snowflake, Truck, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustBadges() {
  const { t } = useLanguage();
  const data = t.trust;

  const BADGES = [
    {
      icon: Leaf,
      title: data.t1,
      description: data.d1,
    },
    {
      icon: Snowflake,
      title: data.t2,
      description: data.d2,
    },
    {
      icon: Truck,
      title: data.t3,
      description: data.d3,
    },
    {
      icon: ShieldCheck,
      title: data.t4,
      description: data.d4,
    },
  ];

  return (
    <section className="py-12 border-t border-[#EAE2D5] bg-[#F7F3EA]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E0D8CA] text-emerald-800 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-emerald-50 transition-all flex-shrink-0">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#142A1E]">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-[#5D7063] mt-0.5">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
