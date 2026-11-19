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
  ShieldCheck,
  ChevronRight,
  BookMarked,
} from "lucide-react";
import { useGame } from "@/context/GameContext";

// Continuous floating fireflies / cultural luminous sparks
const PARTICLES = [
  { id: 1, left: "8%", size: 5, dur: 7.5, delay: 0, color: "#85f8c4" },
  { id: 2, left: "20%", size: 7, dur: 9.0, delay: 1.5, color: "#fea619" },
  { id: 3, left: "32%", size: 4, dur: 8.0, delay: 3.2, color: "#fef08a" },
  { id: 4, left: "45%", size: 6, dur: 10.2, delay: 0.8, color: "#85f8c4" },
  { id: 5, left: "58%", size: 5, dur: 7.8, delay: 2.4, color: "#fea619" },
  { id: 6, left: "72%", size: 8, dur: 9.6, delay: 4.1, color: "#fef08a" },
  { id: 7, left: "85%", size: 4, dur: 8.6, delay: 1.2, color: "#85f8c4" },
  { id: 8, left: "14%", size: 6, dur: 11.0, delay: 5.0, color: "#fea619" },
  { id: 9, left: "26%", size: 5, dur: 8.4, delay: 2.7, color: "#85f8c4" },
  { id: 10, left: "40%", size: 7, dur: 9.8, delay: 4.6, color: "#fef08a" },
  { id: 11, left: "52%", size: 4, dur: 7.2, delay: 1.9, color: "#fea619" },
  { id: 12, left: "65%", size: 6, dur: 10.5, delay: 3.6, color: "#85f8c4" },
  { id: 13, left: "78%", size: 5, dur: 8.9, delay: 0.6, color: "#fef08a" },
  { id: 14, left: "92%", size: 7, dur: 9.3, delay: 2.2, color: "#fea619" },
];

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
    <div className="relative w-full h-screen max-h-screen flex flex-col justify-between p-4 sm:p-6 lg:px-10 lg:py-6 select-none overflow-hidden bg-black text-white">
      {/* ========================================================= */}
      {/* 1. DOMINANT ARTWORK LAYER: Animated Cinematic Hero Art     */}
      {/* ========================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Continuous Smooth Camera Drift (Ken Burns Pan and Zoom) */}
        <motion.div
          initial={{ scale: 1.04, x: 0, y: 0 }}
          animate={{
            scale: [1.04, 1.08, 1.04],
            x: [0, 8, -8, 0],
            y: [0, -6, 6, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCacjhXjfFwlC1_1bjlLzd-sjC1rP4R30cxrpCjwVgHUl6aO5V9lQwTWE3l3muO5ewei2ecbDkzF3meFWoBqr1L1yz6qWFTJa7VUdTPyc5ppCSp0tpBH1B9aZNfFXP54bxtZ4M8YISZ0csrrUCbDwf7NrLXXSMvsZ2KmNl-hHewpTnyT6_liM6JXoc_hInvawfcbFsiEuUupO3obxB_C7GUEjSOr3MGMB8NByE-KL-"
            alt="Sampul Gotong Royong Adventure - Ilustrasi Kebersamaan Pelajar Nusantara"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Cinematic Vignette & Ambient Light Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_90%)]" />

        {/* Continuous Floating Fireflies / Luminous Cultural Sparks */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "105vh", opacity: 0, x: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.75, 0.95, 0.6, 0],
              x: [0, 14, -14, 8, 0],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2.5}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}`,
            }}
            className="absolute rounded-full pointer-events-none z-10"
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* 2. TOP BAR: Floating Glassmorphism Bar                     */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 w-full flex items-center justify-between gap-3"
      >
        {/* Ministry Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide shadow-lg">
            <span role="img" aria-label="Bendera Indonesia">🇮🇩</span>
            <span className="font-display">Profil Pelajar Pancasila • Kemendikbudristek</span>
          </div>
          <span className="hidden md:inline-block text-xs font-semibold text-white/80 drop-shadow-sm">
            • Edisi Merdeka Belajar 38 Provinsi
          </span>
        </div>

        {/* Right Utility: Audio & Passport Button */}
        <div className="flex items-center gap-2">
          {/* Audio Preference Toggle with Animated Soundwave */}
          <button
            type="button"
            onClick={toggleBgm}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 font-black text-xs transition-all backdrop-blur-md border shadow-lg cursor-pointer ${
              bgmPlaying
                ? "bg-[#fea619]/20 border-[#fea619]/60 text-[#fef08a] hover:bg-[#fea619]/30"
                : "bg-black/50 border-white/20 text-white/70 hover:bg-black/70"
            }`}
            title="Pengaturan Musik Latar Belakang (Cublak-Cublak Suweng)"
          >
            {bgmPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#fea619] animate-pulse" />
                {/* Continuous Animated Soundwave Bars */}
                <span className="flex items-center gap-0.5 h-3">
                  <motion.span
                    animate={{ height: ["4px", "12px", "4px"] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                    className="w-0.5 bg-[#fea619] rounded-full inline-block"
                  />
                  <motion.span
                    animate={{ height: ["8px", "14px", "6px"] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                    className="w-0.5 bg-[#fea619] rounded-full inline-block"
                  />
                  <motion.span
                    animate={{ height: ["5px", "13px", "4px"] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="w-0.5 bg-[#fea619] rounded-full inline-block"
                  />
                </span>
                <span className="text-[11px] hidden sm:inline">Musik: Aktif</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/60" />
                <span className="text-[11px] hidden sm:inline">Musik: Senyap</span>
              </>
            )}
          </button>

          {/* Quick Passport Link */}
          <button
            type="button"
            onClick={() => openModal("passport")}
            className="px-3 py-1.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-white border border-white/20 font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
            title="Buka Paspor Budaya &amp; Koleksi 38 Stempel"
          >
            <BookMarked className="w-3.5 h-3.5 text-[#fea619]" />
            <span className="hidden sm:inline">Paspor Budaya</span>
          </button>
        </div>
      </motion.div>

      {/* ========================================================= */}
      {/* 3. CENTER HERO: Grand Title Screen & Interactive CTA      */}
      {/* ========================================================= */}
      <div className="relative z-20 my-auto w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-4 sm:gap-5 py-4">
        {/* Floating Game Spectrum Tag with Gentle Breathing Pulse */}
        <motion.div
          animate={{
            y: [0, -3, 0],
            boxShadow: [
              "0 4px 15px rgba(202, 138, 4, 0.3)",
              "0 8px 25px rgba(254, 166, 25, 0.5)",
              "0 4px 15px rgba(202, 138, 4, 0.3)",
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-2 bg-[#fef08a] text-[#713f12] px-4 py-1 rounded-full shadow-xl border border-[#ca8a04] text-xs font-black uppercase tracking-wider font-display"
        >
          <motion.div
            animate={{ rotate: [0, 18, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ca8a04]" />
          </motion.div>
          <span>Papan Permainan Edukatif Kebangsaan</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ca8a04]" />
          <span>38 Provinsi</span>
        </motion.div>

        {/* Main Grand Title with High Legibility, Glowing Motion & Shadow */}
        <div className="flex flex-col items-center">
          <motion.h1
            animate={{
              textShadow: [
                "0 6px 30px rgba(0, 0, 0, 0.85), 0 2px 4px rgba(0, 0, 0, 0.9)",
                "0 6px 35px rgba(0, 105, 72, 0.5), 0 2px 4px rgba(0, 0, 0, 0.9)",
                "0 6px 30px rgba(0, 0, 0, 0.85), 0 2px 4px rgba(0, 0, 0, 0.9)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none text-white font-display drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          >
            GOTONG ROYONG
          </motion.h1>

          <div className="flex items-center gap-3 sm:gap-4 mt-1">
            {/* Continuous Golden Emerald Glow on ADVENTURE */}
            <motion.span
              animate={{
                textShadow: [
                  "0 4px 25px rgba(0, 105, 72, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)",
                  "0 4px 35px rgba(133, 248, 196, 0.9), 0 0 20px rgba(254, 166, 25, 0.6)",
                  "0 4px 25px rgba(0, 105, 72, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#85f8c4] tracking-tight font-display leading-none"
            >
              ADVENTURE
            </motion.span>

            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="px-2.5 py-1 rounded-lg bg-[#006948]/85 backdrop-blur-md border border-[#85f8c4]/40 text-[#85f8c4] text-xs sm:text-sm font-black uppercase tracking-wider font-display shadow-md"
            >
              Edisi 38 Provinsi
            </motion.span>
          </div>
        </div>

        {/* Inspiring Narrative Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Jelajahi kekayaan adat, filosofi gotong royong 38 provinsi di Indonesia, dan hidupkan kembali semangat kebersamaan Pancasila melalui permainan papan interaktif!
        </p>

        {/* Feature Badges Grid (Staggered Floating Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-xl pt-1">
          {/* Badge 1 */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-black/50 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center text-center"
          >
            <span className="text-lg sm:text-xl font-black text-[#85f8c4] font-display">38</span>
            <span className="text-[11px] font-bold text-white">Provinsi RI</span>
            <span className="text-[9.5px] text-white/70 font-medium">Tradisi Adat</span>
          </motion.div>

          {/* Badge 2 */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
            className="bg-black/50 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center text-center"
          >
            <span className="text-lg sm:text-xl font-black text-[#fea619] font-display">42</span>
            <span className="text-[11px] font-bold text-white">Petak Papan</span>
            <span className="text-[9.5px] text-white/70 font-medium">Sabang-Merauke</span>
          </motion.div>

          {/* Badge 3 */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="bg-black/50 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center text-center"
          >
            <span className="text-lg sm:text-xl font-black text-[#fef08a] font-display">Kuis</span>
            <span className="text-[11px] font-bold text-white">Gotong Royong</span>
            <span className="text-[9.5px] text-white/70 font-medium">Filosofi Luhur</span>
          </motion.div>

          {/* Badge 4 */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
            className="bg-black/50 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center text-center"
          >
            <span className="text-lg sm:text-xl font-black text-[#85f8c4] font-display">2-4</span>
            <span className="text-[11px] font-bold text-white">Pemain</span>
            <span className="text-[9.5px] text-white/70 font-medium">Lokal &amp; AI Bot</span>
          </motion.div>
        </div>

        {/* Primary Call To Action Button (Continuous Breathing Aura Pulse + Shimmer Light Ray) */}
        <div className="flex flex-col items-center gap-3 w-full pt-1">
          <motion.button
            type="button"
            onClick={handleOpenAdventure}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              scale: [1, 1.025, 1],
              boxShadow: [
                "0 10px 35px rgba(0, 105, 72, 0.5)",
                "0 15px 45px rgba(0, 133, 93, 0.8), 0 0 25px rgba(133, 248, 196, 0.45)",
                "0 10px 35px rgba(0, 105, 72, 0.5)",
              ],
            }}
            transition={{
              scale: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#006948] via-[#00855d] to-[#006948] text-white font-black text-sm sm:text-base lg:text-lg font-display tracking-wide flex items-center justify-center gap-3 cursor-pointer border-2 border-[#85f8c4]/70 hover:brightness-110 transition-all focus:outline-none focus:ring-4 focus:ring-[#85f8c4]/50 group relative overflow-hidden"
          >
            {/* Continuous Shimmer Light Ray sweeping across button */}
            <motion.div
              animate={{ x: ["-150%", "250%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
            />

            <motion.div
              animate={{ rotate: [0, 15, -12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-[#fea619]" />
            </motion.div>

            <span className="relative z-10">BUKA PETUALANGAN</span>

            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.div>
          </motion.button>

          {/* Quick Nav Shortcut Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => openModal("rules")}
              className="px-3.5 py-1.5 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-md text-white/90 border border-white/20 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#85f8c4]" />
              <span>Cara Bermain</span>
            </button>

            <button
              type="button"
              onClick={() => setView("quiz")}
              className="px-3.5 py-1.5 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-md text-white/90 border border-white/20 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fea619]" />
              <span>Arena Kuis</span>
            </button>

            <button
              type="button"
              onClick={() => setView("encyclopedia")}
              className="px-3.5 py-1.5 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-md text-white/90 border border-white/20 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#85f8c4]" />
              <span>Ensiklopedia 38 Provinsi</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. BOTTOM BAR: National Motto & Educational Creed         */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/15 pt-2.5 text-xs text-white/80 font-medium"
      >
        <div className="flex items-center gap-2 font-bold text-white">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-[#85f8c4] shadow-[0_0_8px_#85f8c4]"
          />
          <span>Bhinneka Tunggal Ika</span>
          <span>•</span>
          <span>Berbeda-beda Namun Tetap Satu Jua</span>
        </div>

        <div className="flex items-center gap-2 font-semibold text-white/70">
          <ShieldCheck className="w-3.5 h-3.5 text-[#fea619]" />
          <span>Sila ke-3: Persatuan Indonesia</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Generasi Emas Pelajar Pancasila</span>
        </div>
      </motion.div>
    </div>
  );
};
