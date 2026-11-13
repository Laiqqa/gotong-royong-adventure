"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X, Compass, Gamepad2, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const UnityModal: React.FC = () => {
  const { activeModal, closeModal, setView } = useGame();

  if (activeModal !== "unity") return null;

  const handleStartGame = () => {
    closeModal();
    setView("setup");
  };

  const handleExploreEncyclopedia = () => {
    closeModal();
    setView("encyclopedia");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl flex flex-col gap-4 border border-surface-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="unity-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3 border-surface-container">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl" role="img" aria-label="Bendera Indonesia">
                🇮🇩
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                  <span>Sila ke-3: Persatuan Indonesia</span>
                </span>
                <h3 id="unity-modal-title" className="text-lg sm:text-xl font-extrabold text-on-surface leading-tight">
                  Satu Nusa, Satu Bangsa
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Tutup jendela persatuan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Inspirational Philosophy Quote */}
          <div className="bg-gradient-to-r from-secondary/10 via-surface-container-low to-primary/10 border border-secondary/20 p-3 sm:p-3.5 rounded-xl flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-secondary uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bhinneka Tunggal Ika</span>
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                Nilai Luhur Bangsa
              </span>
            </div>
            <p className="text-xs sm:text-sm font-black text-on-surface italic pl-2.5 border-l-2 border-secondary leading-snug">
              "Bhinneka Tunggal Ika: Berbeda-beda suku, adat, dan bahasa, namun tetap satu jiwa Indonesia."
            </p>
          </div>

          {/* 3 Pillars Content */}
          <div className="flex flex-col gap-2.5">
            {/* Pillar 1: Satu Nusa */}
            <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-base">🏝️</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-on-surface">1. Satu Nusa (Tanah Air Indonesia)</span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                  Dari Sabang hingga Merauke, kepulauan Nusantara terbentang mencakup 38 provinsi yang kaya tradisi dan kearifan lokal.
                </p>
              </div>
            </div>

            {/* Pillar 2: Satu Bangsa */}
            <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4 text-tertiary" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-on-surface">2. Satu Bangsa (Persaudaraan Nusantara)</span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                  Perbedaan latar belakang etnis, budaya, dan agama bukanlah pemisah, melainkan anugerah yang saling melengkapi keharmonisan hidup bersama.
                </p>
              </div>
            </div>

            {/* Pillar 3: Gotong Royong */}
            <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-4 h-4 text-secondary" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-on-surface">3. Intisari Gotong Royong</span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                  Tradisi Sambatan, Ngayah, Marsiadapari, Batobo, hingga Bakar Batu membuktikan bahwa persatuan bangsa hidup melalui tindakan nyata tolong-menolong.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1 border-t border-surface-container">
            <button
              type="button"
              onClick={handleStartGame}
              className="flex-1 py-2.5 px-3.5 bg-primary text-on-primary rounded-xl font-bold text-xs sm:text-sm shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Ayo Main Bersama!</span>
            </button>

            <button
              type="button"
              onClick={handleExploreEncyclopedia}
              className="flex-1 py-2.5 px-3.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-outline cursor-pointer"
            >
              <Compass className="w-4 h-4 text-tertiary" />
              <span>Buka Ensiklopedia</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

