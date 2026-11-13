"use client";

import React from "react";
import { Clock, Trophy, HelpCircle, BookOpen, Flag } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { MAX_ROUNDS } from "@/data/constants";

export const TopHUD: React.FC = () => {
  const { currentRound, activePlayer, openModal, setView } = useGame();

  const handleEndEarly = () => {
    if (typeof window !== "undefined") {
      const confirmEnd = window.confirm(
        "Apakah kamu yakin ingin menyelesaikan sesi permainan sekarang dan melihat papan klasemen pemenang?"
      );
      if (confirmEnd) {
        setView("gameover");
      }
    }
  };

  const getTurnBadgeStyle = () => {
    switch (activePlayer.id) {
      case 1:
        return "bg-error/10 text-error border-error/30";
      case 2:
        return "bg-tertiary/10 text-tertiary border-tertiary/30";
      case 3:
        return "bg-secondary-container/20 text-secondary border-secondary-container/40";
      case 4:
        return "bg-primary/10 text-primary border-primary/30";
      default:
        return "bg-primary/10 text-primary border-primary/30";
    }
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl py-1.5 px-2.5 sm:py-2 sm:px-4 shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-2 shrink-0">
      {/* Left: Round & Board info */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <div className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-bold font-display flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Putaran {currentRound} / {MAX_ROUNDS}</span>
        </div>
        <div className="bg-secondary/10 text-secondary px-2.5 py-1 rounded-full text-xs font-bold font-display flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5" />
          <span>42 Petak</span>
        </div>
      </div>

      {/* Center: Active Player Pill */}
      <div
        className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold font-display border shadow-xs transition-colors ${getTurnBadgeStyle()}`}
      >
        <span className={`w-2.5 h-2.5 rounded-full ${activePlayer.badgeBg}`} />
        <span>
          Giliran: <strong>{activePlayer.name}</strong>
        </span>
      </div>

      {/* Right: Quick actions */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => openModal("rules")}
          className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          title="Buka Aturan Bermain"
          aria-label="Buka Aturan Bermain"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setView("encyclopedia")}
          className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          title="Buka Ensiklopedia Budaya"
          aria-label="Buka Ensiklopedia Budaya"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleEndEarly}
          className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-error hover:text-on-error text-xs font-bold text-on-surface transition-all active:scale-95 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-error"
          title="Akhiri dan Lihat Klasemen"
        >
          <Flag className="w-3 h-3" />
          <span>Selesai</span>
        </button>
      </div>
    </div>
  );
};
