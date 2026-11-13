"use client";

import React from "react";
import { Volume2, VolumeX, RotateCcw, HelpCircle, Compass, Gamepad2, BookOpen, Music2 } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const Header: React.FC = () => {
  const { view, setView, openModal, soundEnabled, toggleSound, restartGame, bgmPlaying, toggleBgm } = useGame();

  const handleNav = (target: "landing" | "board" | "encyclopedia") => {
    setView(target);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_6px_rgba(0,0,0,0.04)] border-b border-surface-container">
      <div className="h-14 sm:h-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <button
          type="button"
          onClick={() => handleNav("landing")}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1"
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-tactile overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-lg sm:text-xl font-black tracking-tighter select-none">GR</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base lg:text-lg text-primary tracking-tight leading-tight font-display">
              Gotong Royong Adventure
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-wider hidden sm:inline-block">
              Board Game Pendidikan Pancasila
            </span>
          </div>
        </button>

        {/* Navigation pills */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low px-1.5 py-1 rounded-full shadow-[0_2px_0_0_rgba(15,23,42,0.04)]" aria-label="Navigasi Utama">
          <button
            type="button"
            onClick={() => handleNav("landing")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              view === "landing"
                ? "bg-primary text-on-primary shadow-tactile-primary"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNav("board")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              view === "board" || view === "setup"
                ? "bg-primary text-on-primary shadow-tactile-primary"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Main Game</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNav("encyclopedia")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              view === "encyclopedia"
                ? "bg-primary text-on-primary shadow-tactile-primary"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ensiklopedia Budaya</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => openModal("rules")}
            className="px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Cara Bermain</span>
            </span>
          </button>
        </nav>

        {/* Action utility controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={restartGame}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-lowest hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all shadow-[0_2px_0_0_rgba(15,23,42,0.08)] active:translate-y-0.5 active:shadow-none focus:outline-none focus:ring-2 focus:ring-primary"
            title="Mulai Ulang Permainan"
            aria-label="Mulai Ulang Permainan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleBgm}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-[0_2px_0_0_rgba(15,23,42,0.08)] active:translate-y-0.5 active:shadow-none focus:outline-none focus:ring-2 focus:ring-primary ${
              bgmPlaying
                ? "bg-surface-container-lowest text-primary hover:bg-surface-container-high"
                : "bg-surface-container-high text-on-surface-variant opacity-75"
            }`}
            title={bgmPlaying ? "Jeda Lagu Cublak-Cublak Suweng" : "Putar Lagu Cublak-Cublak Suweng"}
            aria-label={bgmPlaying ? "Jeda Lagu Cublak-Cublak Suweng" : "Putar Lagu Cublak-Cublak Suweng"}
          >
            <Music2 className={`w-4 h-4 ${bgmPlaying ? "text-primary animate-pulse" : "text-on-surface-variant"}`} />
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-[0_2px_0_0_rgba(15,23,42,0.08)] active:translate-y-0.5 active:shadow-none focus:outline-none focus:ring-2 focus:ring-primary ${
              soundEnabled
                ? "bg-surface-container-lowest text-primary hover:bg-surface-container-high"
                : "bg-surface-container-high text-on-surface-variant opacity-75"
            }`}
            title={soundEnabled ? "Nonaktifkan Suara" : "Aktifkan Suara"}
            aria-label={soundEnabled ? "Nonaktifkan Suara" : "Aktifkan Suara"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => openModal("rules")}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-tactile-primary active:translate-y-0.5 active:shadow-none lg:hidden focus:outline-none focus:ring-2 focus:ring-primary"
            title="Cara Bermain"
            aria-label="Buka Panduan Aturan"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
