"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Compass,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Users,
  ShieldCheck,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useGame } from "@/context/GameContext";
import { NusantaraBackground } from "@/components/ui/NusantaraBackground";

export const CoverView: React.FC = () => {
  const { setView, openModal, bgmPlaying, toggleBgm, setBgmPlaying } = useGame();

  const handleOpenAdventure = () => {
    // Ensuring user gesture starts BGM smoothly if active
    if (bgmPlaying) {
      setBgmPlaying(true);
    }
    setView("landing");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-3 sm:p-5 lg:p-4 select-none overflow-hidden bg-surface-container-low">
      {/* Ambient Nusantara Background Canvas */}
      <NusantaraBackground variant="hero" />

      {/* Main Board Game Cover Box Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg lg:max-w-xl bg-surface-container-lowest/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,105,72,0.18)] border-2 border-primary/20 p-4 sm:p-6 lg:p-5 flex flex-col items-center text-center gap-3.5 sm:gap-4 overflow-hidden"
      >
        {/* Subtle decorative gold inner corner accent */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#f59e0b]/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-[#006948]/10 rounded-full blur-xl pointer-events-none" />

        {/* Top Official Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] sm:text-xs font-bold tracking-wide">
          <span role="img" aria-label="Bendera Indonesia">🇮🇩</span>
          <span>Profil Pelajar Pancasila • Kemendikbudristek</span>
        </div>

        {/* Grand Game Title */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-secondary font-display">
            Papan Permainan Edukatif Kebangsaan
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-none mt-1 font-display">
            GOTONG ROYONG
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tracking-tight font-display">
              ADVENTURE
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#fef08a] border border-[#ca8a04] text-[#854d0e] text-[10px] sm:text-xs font-extrabold uppercase shadow-xs">
              Edisi 38 Provinsi
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium max-w-md mt-1.5 leading-relaxed">
            Jelajahi kekayaan adat, filosofi gotong royong, dan hidupkan kembali semangat kebersamaan nusantara.
          </p>
        </div>

        {/* Center Artwork Box Showcase */}
        <div className="relative w-full h-36 sm:h-44 lg:h-40 rounded-2xl overflow-hidden border border-surface-container shadow-inner group">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCacjhXjfFwlC1_1bjlLzd-sjC1rP4R30cxrpCjwVgHUl6aO5V9lQwTWE3l3muO5ewei2ecbDkzF3meFWoBqr1L1yz6qWFTJa7VUdTPyc5ppCSp0tpBH1B9aZNfFXP54bxtZ4M8YISZ0csrrUCbDwf7NrLXXSMvsZ2KmNl-hHewpTnyT6_liM6JXoc_hInvawfcbFsiEuUupO3obxB_C7GUEjSOr3MGMB8NByE-KL-"
            alt="Sampul Gotong Royong Adventure - Kebersamaan Pelajar Nusantara"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 560px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

          {/* 4 Player Token Badges overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-bold">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-error border border-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary border border-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container border border-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary border border-white" />
              <span className="text-[10px] ml-0.5">2-4 Pemain</span>
            </div>
            <div className="bg-primary/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-primary-fixed/40 text-[10px] text-white flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-secondary" />
              <span>Sila ke-3 Persatuan</span>
            </div>
          </div>
        </div>

        {/* Feature Spectrum Pills */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full text-center">
          <div className="bg-surface-container-low p-1.5 rounded-xl border border-surface-container flex flex-col items-center">
            <span className="text-sm sm:text-base font-black text-primary font-display">38</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-on-surface-variant">Provinsi RI</span>
          </div>
          <div className="bg-surface-container-low p-1.5 rounded-xl border border-surface-container flex flex-col items-center">
            <span className="text-sm sm:text-base font-black text-tertiary font-display">42</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-on-surface-variant">Petak Papan</span>
          </div>
          <div className="bg-surface-container-low p-1.5 rounded-xl border border-surface-container flex flex-col items-center">
            <span className="text-sm sm:text-base font-black text-secondary font-display">Kuis</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-on-surface-variant">Gotong Royong</span>
          </div>
          <div className="bg-surface-container-low p-1.5 rounded-xl border border-surface-container flex flex-col items-center">
            <span className="text-sm sm:text-base font-black text-primary-container font-display">Dadu</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-on-surface-variant">3D Taktil</span>
          </div>
        </div>

        {/* Action Controls Section */}
        <div className="w-full flex flex-col items-center gap-2.5 pt-1">
          {/* Main Primary Button: BUKA PETUALANGAN */}
          <motion.button
            type="button"
            onClick={handleOpenAdventure}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-extrabold text-sm sm:text-base font-display tracking-wide shadow-tactile-primary flex items-center justify-center gap-2.5 cursor-pointer border-2 border-primary-fixed/30 hover:brightness-105 transition-all focus:outline-none focus:ring-4 focus:ring-primary/40 group"
          >
            <Sparkles className="w-5 h-5 text-secondary group-hover:rotate-12 transition-transform" />
            <span>BUKA PETUALANGAN</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Secondary Options Row: Audio Toggle & Quick Links */}
          <div className="w-full flex items-center justify-between gap-2 text-xs">
            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={toggleBgm}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold transition-all border ${
                bgmPlaying
                  ? "bg-secondary/10 border-secondary/30 text-secondary hover:bg-secondary/20"
                  : "bg-surface-container border-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
              title="Pengaturan Musik Latar Belakang (Cublak-Cublak Suweng)"
            >
              {bgmPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  <span className="text-[11px]">Musik: Aktif</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Musik: Senyap</span>
                </>
              )}
            </button>

            {/* Quick shortcuts */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => openModal("rules")}
                className="px-2.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-bold text-[11px] transition-colors flex items-center gap-1 border border-surface-container"
              >
                <BookOpen className="w-3 h-3 text-primary" />
                <span>Aturan</span>
              </button>

              <button
                type="button"
                onClick={() => setView("encyclopedia")}
                className="px-2.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-bold text-[11px] transition-colors flex items-center gap-1 border border-surface-container"
              >
                <Compass className="w-3 h-3 text-tertiary" />
                <span>Ensiklopedia</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="pt-0.5 border-t border-surface-container w-full flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-on-surface-variant">
          <span>Bhinneka Tunggal Ika</span>
          <span>•</span>
          <span>Berbeda-beda Namun Tetap Satu Jua</span>
        </div>
      </motion.div>
    </div>
  );
};

