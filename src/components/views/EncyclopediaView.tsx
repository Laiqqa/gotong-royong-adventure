"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, ArrowLeft, Sparkles, SearchX } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { PROVINCES } from "@/data/provinces";
import { Region } from "@/types/game";
import { NusantaraBackground } from "@/components/ui/NusantaraBackground";

export const EncyclopediaView: React.FC = () => {
  const { setView, players } = useGame();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const filterTabs: { id: string; label: string; regionValue?: Region }[] = [
    { id: "all", label: "Semua Pulau" },
    { id: "sumatera", label: "Sumatera", regionValue: "sumatera" },
    { id: "jawa", label: "Jawa", regionValue: "jawa" },
    { id: "kalimantan", label: "Kalimantan", regionValue: "kalimantan" },
    { id: "sulawesi", label: "Sulawesi", regionValue: "sulawesi" },
    { id: "nusatenggara", label: "Bali & Nusra", regionValue: "nusatenggara" },
    { id: "papua", label: "Maluku & Papua", regionValue: "papua" },
  ];

  const filteredProvinces = PROVINCES.filter((prov) => {
    const matchesRegion =
      selectedRegion === "all" || prov.region.toLowerCase() === selectedRegion.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      prov.name.toLowerCase().includes(q) ||
      prov.trad1.toLowerCase().includes(q) ||
      prov.trad2.toLowerCase().includes(q) ||
      (prov.filosofiTitle && prov.filosofiTitle.toLowerCase().includes(q)) ||
      (prov.quote && prov.quote.toLowerCase().includes(q));

    return matchesRegion && matchesSearch;
  });

  return (
    <div className="relative overflow-hidden w-full py-10 px-4 md:px-8 lg:px-12">
      <NusantaraBackground variant="subtle" />
      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        {/* Encyclopedia Header */}
        <div className="bg-surface-container-low p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm border border-surface-container">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold bg-primary/10 px-3 py-1 rounded-full self-start">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ensiklopedia Digital Pancasila</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface">
              Tradisi Gotong Royong 38 Provinsi
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl font-medium">
              Bukti autentik bahwa sejak berabad-abad lampau, bangsa Indonesia hidup dalam nafas persatuan, tolong menolong, dan kerukunan bersama.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (players.length > 0) setView("board");
              else setView("landing");
            }}
            className="px-5 py-2.5 bg-primary text-on-primary rounded-full text-xs sm:text-sm font-bold shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Papan</span>
          </button>
        </div>

        {/* Search & Island Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari provinsi, tradisi, atau kata mutiara..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest rounded-full text-sm font-medium text-on-surface shadow-xs border border-surface-container outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Island Filter Tabs */}
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter Wilayah">
            {filterTabs.map((tab) => {
              const isActive = selectedRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                    isActive
                      ? "bg-primary text-on-primary shadow-tactile-primary"
                      : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Provinces Grid */}
        {filteredProvinces.length === 0 ? (
          <div className="py-16 flex flex-col items-center text-center gap-3 bg-surface-container-lowest rounded-2xl border border-surface-container">
            <SearchX className="w-12 h-12 text-on-surface-variant/40" />
            <span className="text-lg font-bold text-on-surface">
              Tidak ditemukan data tradisi
            </span>
            <p className="text-xs text-on-surface-variant max-w-sm">
              Coba gunakan kata kunci pencarian yang berbeda atau pilih pulau lain pada filter di atas.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredProvinces.map((prov) => (
              <motion.div
                key={prov.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3 border border-surface-container"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-2.5 border-surface-container">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl" role="img" aria-label="Ikon daerah">
                      {prov.icon}
                    </span>
                    <div className="flex flex-col">
                      <h4 className="font-extrabold text-base text-on-surface font-display">
                        {prov.name}
                      </h4>
                      <span className="text-[11px] font-bold text-primary uppercase">
                        {prov.region}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight Nilai Filosofis Luhur */}
                <div className="p-3 rounded-xl bg-primary/10 border-l-4 border-primary text-xs flex flex-col gap-1">
                  <span className="font-black text-primary flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>{prov.filosofiTitle || "Filosofi Tradisi"}</span>
                  </span>
                  {prov.quote && (
                    <p className="italic text-on-surface font-extrabold text-[11px]">
                      {prov.quote}
                    </p>
                  )}
                  {prov.desc && (
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      {prov.desc}
                    </p>
                  )}
                </div>

                {/* Traditions */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="p-2.5 rounded-lg bg-surface-container-low text-xs border border-surface-container">
                    <strong className="text-primary block font-bold mb-0.5">Tradisi 1:</strong>
                    <span className="text-on-surface font-medium">{prov.trad1}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container-low text-xs border border-surface-container">
                    <strong className="text-secondary block font-bold mb-0.5">Tradisi 2:</strong>
                    <span className="text-on-surface font-medium">{prov.trad2}</span>
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-2 text-[11px] text-on-surface-variant flex items-center gap-1.5 border-t border-surface-container font-semibold">
                  <span>🇮🇩</span>
                  <span>Nilai: Persatuan, Keikhlasan, dan Kearifan Lokal</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

