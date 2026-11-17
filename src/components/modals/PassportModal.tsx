"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle,
  Lock,
  X,
  Compass,
  Sparkles,
  BookMarked,
  ShieldCheck,
} from "lucide-react";
import { useGame } from "@/context/GameContext";
import { PROVINCES } from "@/data/provinces";
import { Region } from "@/types/game";

interface BadgeDef {
  id: string;
  title: string;
  desc: string;
  icon: string;
  requiredCount: number;
  check: (collectedIds: number[]) => boolean;
}

export const PassportModal: React.FC = () => {
  const { activeModal, closeModal, collectedProvinces } = useGame();
  const [activeTab, setActiveTab] = useState<"stamps" | "badges">("stamps");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  if (activeModal !== "passport") return null;

  const totalProvinces = PROVINCES.length; // 38
  const collectedCount = collectedProvinces.length;
  const progressPercent = Math.round((collectedCount / totalProvinces) * 100);

  // Region filter definition
  const regionFilters: { id: string; label: string; region?: Region }[] = [
    { id: "all", label: "Semua Pulau" },
    { id: "sumatera", label: "Sumatera (10)", region: "sumatera" },
    { id: "jawa", label: "Jawa (6)", region: "jawa" },
    { id: "kalimantan", label: "Kalimantan (5)", region: "kalimantan" },
    { id: "sulawesi", label: "Sulawesi (6)", region: "sulawesi" },
    { id: "nusatenggara", label: "Bali & Nusra (3)", region: "nusatenggara" },
    { id: "papua", label: "Maluku & Papua (8)", region: "papua" },
  ];

  const filteredProvinces = PROVINCES.filter((p) => {
    if (selectedRegion === "all") return true;
    return p.region === selectedRegion;
  });

  // Achievement Badges
  const badges: BadgeDef[] = [
    {
      id: "first_stamp",
      title: "Langkah Pertama",
      desc: "Berhasil mengoleksi stempel provinsi pertama.",
      icon: "🌱",
      requiredCount: 1,
      check: (ids) => ids.length >= 1,
    },
    {
      id: "sumatera_badge",
      title: "Penjelajah Sumatera",
      desc: "Mengoleksi seluruh 10 stempel tradisi pulau Sumatera.",
      icon: "🛶",
      requiredCount: 10,
      check: (ids) =>
        PROVINCES.filter((p) => p.region === "sumatera").every((p) => ids.includes(p.id)),
    },
    {
      id: "jawa_badge",
      title: "Sahabat Jawa",
      desc: "Mengoleksi seluruh 6 stempel tradisi pulau Jawa.",
      icon: "🌾",
      requiredCount: 6,
      check: (ids) =>
        PROVINCES.filter((p) => p.region === "jawa").every((p) => ids.includes(p.id)),
    },
    {
      id: "kalimantan_badge",
      title: "Ksatria Borneo",
      desc: "Mengoleksi seluruh 5 stempel tradisi pulau Kalimantan.",
      icon: "🛶",
      requiredCount: 5,
      check: (ids) =>
        PROVINCES.filter((p) => p.region === "kalimantan").every((p) => ids.includes(p.id)),
    },
    {
      id: "sulawesi_badge",
      title: "Petualang Celebes",
      desc: "Mengoleksi seluruh 6 stempel tradisi pulau Sulawesi.",
      icon: "⛵",
      requiredCount: 6,
      check: (ids) =>
        PROVINCES.filter((p) => p.region === "sulawesi").every((p) => ids.includes(p.id)),
    },
    {
      id: "nusra_badge",
      title: "Pengelana Sunda Kecil",
      desc: "Mengoleksi seluruh 3 stempel tradisi Bali dan Nusa Tenggara.",
      icon: "🌺",
      requiredCount: 3,
      check: (ids) =>
        PROVINCES.filter((p) => p.region === "nusatenggara").every((p) => ids.includes(p.id)),
    },
    {
      id: "papua_badge",
      title: "Mutiara Indonesia Timur",
      desc: "Mengoleksi seluruh 8 stempel Maluku dan Papua.",
      icon: "🏝️",
      requiredCount: 8,
      check: (ids) =>
        PROVINCES.filter((p) => p.region === "papua").every((p) => ids.includes(p.id)),
    },
    {
      id: "nusantara_master",
      title: "Duta Utama 38 Nusantara",
      desc: "Menyelesaikan seluruh 38 stempel provinsi di Indonesia!",
      icon: "👑",
      requiredCount: 38,
      check: (ids) => ids.length >= 38,
    },
  ];

  const unlockedBadgesCount = badges.filter((b) => b.check(collectedProvinces)).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.22 }}
          className="bg-surface-container-lowest rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-primary/25 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="passport-modal-title"
        >
          {/* Header Paspor: Thematic Deep Emerald & Gold Foil Accent */}
          <div className="bg-gradient-to-r from-[#004c33] via-[#006948] to-[#004c33] text-white p-4 sm:p-5 flex flex-col gap-2 relative">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Tutup Paspor"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#fef08a] text-[#713f12] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <BookMarked className="w-3 h-3 text-[#ca8a04]" />
                <span>Dokumen Kebudayaan Resmi</span>
              </span>
              <span className="text-xs text-white/80 font-semibold">• Edisi Pelajar Pancasila</span>
            </div>

            <h2 id="passport-modal-title" className="text-xl sm:text-2xl font-black tracking-tight font-display text-white">
              PASPOR BUDAYA NUSANTARA
            </h2>

            {/* Progress bar */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center justify-between text-xs font-bold text-white/90">
                <span>Stempel Terkumpul: <strong>{collectedCount}</strong> dari {totalProvinces} Provinsi</span>
                <span>{progressPercent}% Terjelajahi</span>
              </div>
              <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-[#fea619] to-[#85f8c4] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-surface-container bg-surface-container-low px-4 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab("stamps")}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === "stamps"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>38 Stempel Provinsi ({collectedCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("badges")}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === "badges"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Lencana Prestasi ({unlockedBadgesCount}/8)</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
            {activeTab === "stamps" ? (
              <>
                {/* Region Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {regionFilters.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRegion(r.id)}
                      className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all border ${
                        selectedRegion === r.id
                          ? "bg-primary text-on-primary border-primary shadow-xs"
                          : "bg-surface-container-low text-on-surface-variant border-surface-container hover:bg-surface-container-high"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                {/* Stamp Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                  {filteredProvinces.map((prov) => {
                    const isCollected = collectedProvinces.includes(prov.id);

                    return (
                      <div
                        key={prov.id}
                        className={`p-3 rounded-2xl flex flex-col items-center text-center gap-1.5 border transition-all ${
                          isCollected
                            ? "bg-[#fffdf5] border-[#ca8a04]/40 shadow-sm"
                            : "bg-surface-container-low/70 border-dashed border-outline/30 opacity-60"
                        }`}
                      >
                        {/* Stamp Emblem Seal */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl relative ${
                            isCollected
                              ? "bg-gradient-to-br from-[#fef08a] to-[#fed7aa] border-2 border-[#ca8a04] shadow-xs"
                              : "bg-surface-container border border-outline/20 text-on-surface-variant"
                          }`}
                        >
                          <span>{prov.icon}</span>
                          {isCollected ? (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                              <CheckCircle className="w-3 h-3" />
                            </span>
                          ) : (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-outline/40 text-on-surface flex items-center justify-center">
                              <Lock className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-black text-on-surface leading-tight font-display">
                          {prov.name}
                        </span>

                        <span className="text-[10px] text-on-surface-variant line-clamp-1 font-medium">
                          {isCollected ? prov.trad1 : "Belum Terbuka"}
                        </span>

                        {isCollected && (
                          <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.2 rounded-full">
                            Stempel Terkoleksi
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Badges View */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {badges.map((b) => {
                  const isUnlocked = b.check(collectedProvinces);

                  return (
                    <div
                      key={b.id}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                        isUnlocked
                          ? "bg-[#fefce8] border-[#ca8a04]/40 shadow-xs"
                          : "bg-surface-container-low border-surface-container opacity-60"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                          isUnlocked
                            ? "bg-[#fef08a] border-2 border-[#ca8a04] shadow-xs"
                            : "bg-surface-container border border-outline/20"
                        }`}
                      >
                        <span>{b.icon}</span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-black text-on-surface font-display">
                            {b.title}
                          </h4>
                          {isUnlocked ? (
                            <span className="text-[9px] font-black bg-primary text-on-primary px-1.5 py-0.2 rounded-full">
                              Tercapai
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold text-on-surface-variant bg-surface-container px-1.5 py-0.2 rounded-full">
                              Terkunci
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-3 sm:p-4 border-t border-surface-container bg-surface-container-low flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium hidden sm:inline">
              Data paspor tersimpan otomatis di perangkat browser ini.
            </span>
            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto px-5 py-2 bg-primary text-on-primary font-bold rounded-full shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all ml-auto focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Tutup Paspor
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

