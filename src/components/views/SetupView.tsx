"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Gamepad2, Info, Flag } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { NusantaraBackground } from "@/components/ui/NusantaraBackground";

export const SetupView: React.FC = () => {
  const {
    setView,
    activePlayerCount,
    setActivePlayerCount,
    players,
    updatePlayerName,
    startGame,
  } = useGame();

  const playerColorNames = [
    { label: "Pion Merah (Pemain 1)", dot: "bg-error", turn: "Giliran Pertama" },
    { label: "Pion Biru (Pemain 2)", dot: "bg-tertiary", turn: "Giliran Kedua" },
    { label: "Pion Kuning (Pemain 3)", dot: "bg-secondary-container", turn: "Giliran Ketiga" },
    { label: "Pion Hijau (Pemain 4)", dot: "bg-primary", turn: "Giliran Keempat" },
  ];

  return (
    <div className="relative overflow-hidden w-full py-4 sm:py-6 lg:py-3 px-3 sm:px-6 md:px-8 flex-1 flex flex-col justify-center">
      <NusantaraBackground variant="subtle" />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto w-full bg-surface-container-lowest rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-7 flex flex-col gap-4 sm:gap-5 border border-surface-container"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b pb-3 border-surface-container">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setView("landing")}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4 text-on-surface" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl font-extrabold text-on-surface">
                Pengaturan Petualang
              </h2>
              <span className="text-[11px] sm:text-xs text-on-surface-variant font-medium">
                Tentukan jumlah pemain dan nama sebelum melempar dadu pertama
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Board 42 Petak</span>
          </div>
        </div>

        {/* Player Count Buttons */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-extrabold text-on-surface">
            Pilih Jumlah Pemain:
          </label>
          <div className="grid grid-cols-3 gap-2.5 max-w-sm">
            {[2, 3, 4].map((count) => {
              const isSelected = activePlayerCount === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setActivePlayerCount(count)}
                  className={`py-2 px-3 rounded-xl font-extrabold text-xs sm:text-sm cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                    isSelected
                      ? "bg-primary text-on-primary shadow-tactile-primary"
                      : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {count} Pemain
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Name Input Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {players.map((p, idx) => {
            const info = playerColorNames[idx];

            return (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-surface-container"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-on-surface">
                    <span className={`w-3 h-3 rounded-full ${info.dot} shadow-xs inline-block`} />
                    {info.label}
                  </span>
                  <span className="text-[10px] font-semibold text-on-surface-variant">
                    {info.turn}
                  </span>
                </div>

                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updatePlayerName(p.id, e.target.value)}
                  placeholder={`Nama Pemain ${p.id}`}
                  className="w-full bg-surface-container-lowest px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-on-surface border border-outline/20 outline-none focus:ring-2 focus:ring-primary shadow-xs"
                />

                <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-0.5 font-medium">
                  <span>Modal Awal: <strong>Rp 200</strong></span>
                  <span>0 Poin • Petak START</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Rules Summary Notice */}
        <div className="bg-surface-container p-3 rounded-xl flex items-start sm:items-center gap-2.5 border border-surface-container-high">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex flex-col">
            <span className="text-xs font-extrabold text-on-surface">
              Target Permainan:
            </span>
            <span className="text-[11px] text-on-surface-variant leading-relaxed">
              Permainan berlangsung selama 3 putaran penuh mengelilingi Nusantara. Raih poin persatuan tertinggi melalui kuis tradisi dan aksi gotong royong!
            </span>
          </div>
        </div>

        {/* Start Game Action Button */}
        <button
          type="button"
          onClick={startGame}
          className="w-full py-3 bg-primary text-on-primary font-black text-sm sm:text-base rounded-full shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/40"
        >
          <Flag className="w-4 h-4" />
          <span>MULAI PERMAINAN SEKARANG</span>
        </button>
      </motion.div>
    </div>
  );
};
