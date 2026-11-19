"use client";

import React, { useState } from "react";
import {
  Compass,
  Gamepad2,
  BookOpen,
  Sparkles,
  BookMarked,
  Music2,
  Volume2,
  VolumeX,
  RotateCcw,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";

export const Header: React.FC = () => {
  const {
    view,
    setView,
    openModal,
    soundEnabled,
    toggleSound,
    restartGame,
    bgmPlaying,
    toggleBgm,
    collectedProvinces,
  } = useGame();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (view === "cover") return null;

  const handleNav = (target: "landing" | "board" | "encyclopedia" | "quiz") => {
    setView(target);
    setMobileMenuOpen(false);
  };

  const handleRestartConfirm = () => {
    if (typeof window !== "undefined") {
      const confirmRestart = window.confirm(
        "Apakah kamu yakin ingin memulai ulang sesi permainan dari awal?"
      );
      if (confirmRestart) {
        restartGame();
      }
    }
  };

  const navItems = [
    { id: "landing" as const, label: "Beranda", icon: Compass, isActive: view === "landing" },
    {
      id: "board" as const,
      label: "Main Game",
      icon: Gamepad2,
      isActive: view === "board" || view === "setup",
    },
    {
      id: "encyclopedia" as const,
      label: "Ensiklopedia",
      icon: BookOpen,
      isActive: view === "encyclopedia",
    },
    { id: "quiz" as const, label: "Arena Kuis", icon: Sparkles, isActive: view === "quiz" },
  ];

  return (
    <header className="fixed top-2.5 sm:top-3.5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        {/* Floating Island Navbar Dock */}
        <div className="h-12 sm:h-14 px-3 sm:px-4 rounded-full bg-surface/85 backdrop-blur-xl border border-surface-container/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-2 sm:gap-4 transition-all">
          {/* Left: Brand Identity */}
          <button
            type="button"
            onClick={() => handleNav("landing")}
            className="flex items-center gap-2 text-left group focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-0.5"
            aria-label="Kembali ke Beranda Gotong Royong Adventure"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-on-primary shadow-tactile-primary shrink-0 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4 text-on-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm text-on-surface tracking-tight leading-tight font-display">
                Gotong Royong <span className="text-primary font-black">Adventure</span>
              </span>
              <span className="text-[9px] font-bold text-secondary uppercase tracking-wider hidden md:inline-block leading-none mt-0.5">
                Edisi 38 Provinsi
              </span>
            </div>
          </button>

          {/* Center: Essential 4 Navigation Links (Clean Pills) */}
          <nav
            className="hidden lg:flex items-center gap-1 bg-surface-container-low/90 p-1 rounded-full border border-surface-container/60 shadow-xs"
            aria-label="Navigasi Utama"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    item.isActive
                      ? "bg-primary text-on-primary shadow-tactile-primary"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Curated Action Utility Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Cultural Passport Access with Live Stamp Indicator */}
            <button
              type="button"
              onClick={() => openModal("passport")}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-secondary-container/20 text-secondary hover:bg-secondary-container/35 font-extrabold text-xs border border-secondary/30 transition-all shadow-xs"
              title="Buka Paspor Budaya & Koleksi 38 Stempel"
              aria-label="Buka Paspor Budaya"
            >
              <BookMarked className="w-3.5 h-3.5 text-secondary" />
              <span className="hidden sm:inline">Paspor</span>
              <span className="bg-secondary text-on-secondary px-1.5 py-0.2 rounded-full text-[10px] font-black">
                {collectedProvinces.length}/38
              </span>
            </button>

            {/* Compact Dual Audio Capsule */}
            <div className="hidden sm:flex items-center rounded-full bg-surface-container-low/90 p-0.5 border border-surface-container/80 shadow-xs">
              <button
                type="button"
                onClick={toggleBgm}
                className={`p-1.5 rounded-full transition-all ${
                  bgmPlaying
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                }`}
                title={bgmPlaying ? "Jeda Musik Nusantara" : "Putar Musik Nusantara (Cublak-Cublak Suweng)"}
                aria-label={bgmPlaying ? "Jeda Musik Nusantara" : "Putar Musik Nusantara"}
              >
                <Music2 className={`w-3.5 h-3.5 ${bgmPlaying ? "animate-pulse" : ""}`} />
              </button>
              <button
                type="button"
                onClick={toggleSound}
                className={`p-1.5 rounded-full transition-all ${
                  soundEnabled
                    ? "bg-surface-container-high text-primary hover:bg-surface-container-highest"
                    : "text-on-surface-variant opacity-60 hover:opacity-100"
                }`}
                title={soundEnabled ? "Nonaktifkan Efek Suara" : "Aktifkan Efek Suara"}
                aria-label={soundEnabled ? "Nonaktifkan Efek Suara" : "Aktifkan Efek Suara"}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Contextual Restart Button (Only shown during active board game) */}
            {view === "board" && (
              <button
                type="button"
                onClick={handleRestartConfirm}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all border border-surface-container/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary"
                title="Mulai Ulang Permainan"
                aria-label="Mulai Ulang Permainan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Rules / Help Guide Button */}
            <button
              type="button"
              onClick={() => openModal("rules")}
              className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all border border-surface-container/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary"
              title="Panduan Cara Bermain"
              aria-label="Panduan Cara Bermain"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle (Visible on lg:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-tactile-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={mobileMenuOpen ? "Tutup Menu Navigasi" : "Buka Menu Navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 p-3 rounded-3xl bg-surface/95 backdrop-blur-xl border border-surface-container shadow-xl flex flex-col gap-2"
            >
              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNav(item.id)}
                      className={`p-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                        item.isActive
                          ? "bg-primary text-on-primary shadow-tactile-primary"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Quick Action Buttons & Audio */}
              <div className="pt-2 border-t border-surface-container flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    openModal("passport");
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-secondary-container/20 text-secondary font-bold text-xs flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Paspor Budaya</span>
                  </span>
                  <span className="bg-secondary text-on-secondary px-1.5 py-0.2 rounded-full text-[10px]">
                    {collectedProvinces.length}/38
                  </span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleBgm}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border border-surface-container ${
                      bgmPlaying ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant"
                    }`}
                    title="Musik BGM"
                  >
                    <Music2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={toggleSound}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border border-surface-container ${
                      soundEnabled ? "bg-surface-container-high text-primary" : "bg-surface-container-low text-on-surface-variant"
                    }`}
                    title="Efek Suara"
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
