"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const Footer: React.FC = () => {
  const { view } = useGame();

  // On board game view, hide the global marketing footer to fit the whole game on laptop screen
  if (view === "board") return null;

  return (
    <footer className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex flex-col gap-0.5">
          <span className="font-extrabold text-sm sm:text-base text-primary flex items-center justify-center md:justify-start gap-1.5">
            <span>🇮🇩</span>
            <span>Gotong Royong Adventure</span>
          </span>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
            Media Edukasi Interaktif Nilai-Nilai Luhur Pancasila dan Kebudayaan Nusantara 38 Provinsi.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <span>Bhinneka Tunggal Ika</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Dibuat untuk generasi penerus bangsa
            <Heart className="w-3.5 h-3.5 text-error fill-error inline-block" />
          </span>
        </div>
      </div>
    </footer>
  );
};
