"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Users, ShieldCheck, HeartHandshake, Dices, Coins, Flame } from "lucide-react";

export const IsometricMockup: React.FC = () => {
  return (
    <div
      className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[420px] xl:max-w-[460px] flex items-center justify-center py-6 sm:py-8 lg:py-3 select-none"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic 3D Scene Container with continuous subtle float & hover tilt */}
      <motion.div
        initial={{ rotateX: 14, rotateY: -16, rotateZ: 3 }}
        animate={{
          y: [-5, 7, -5],
          rotateX: [14, 11, 14],
          rotateY: [-16, -12, -16],
          rotateZ: [3, 2, 3],
        }}
        transition={{
          y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
          rotateX: { repeat: Infinity, duration: 6.5, ease: "easeInOut" },
          rotateY: { repeat: Infinity, duration: 6.5, ease: "easeInOut" },
          rotateZ: { repeat: Infinity, duration: 6.5, ease: "easeInOut" },
        }}
        whileHover={{
          rotateX: 8,
          rotateY: -6,
          rotateZ: 1,
          scale: 1.03,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full cursor-pointer flex items-center justify-center"
      >
        {/* Soft Ambient Depth Shadow projected onto ground plane */}
        <div
          className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-16 bg-black/25 blur-2xl rounded-full pointer-events-none"
          style={{ transform: "rotateX(75deg) translateZ(-60px)" }}
        />

        {/* ============================================================== */}
        {/* LAYER 1 (BACK CARD): Kartu Tantangan Kebangsaan (Angled Behind) */}
        {/* ============================================================== */}
        <div
          className="absolute -top-5 sm:-top-7 -right-3 sm:-right-5 w-[85%] rounded-2xl bg-[#fef08a] border-2 sm:border-3 border-[#ca8a04] p-3 sm:p-4 shadow-xl flex flex-col justify-between pointer-events-none"
          style={{
            transform: "translateZ(-35px) rotateZ(9deg)",
            boxShadow: "0 15px 30px -5px rgba(133, 83, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between border-b border-[#eab308] pb-1.5">
            <span className="text-[10px] font-black text-[#854d0e] uppercase tracking-wider flex items-center gap-1 font-display">
              <Dices className="w-3 h-3 text-[#ca8a04]" />
              <span>Kartu Tantangan Pancasila</span>
            </span>
            <span className="text-[9px] font-black px-1.5 py-0.2 bg-[#fde047] text-[#713f12] rounded-full border border-[#ca8a04]">
              Sila 3
            </span>
          </div>
          <p className="text-[11px] font-extrabold text-[#713f12] py-2 leading-tight">
            "Bagaimana tradisi Ngayah di Bali mempererat ikatan persatuan lintas warga?"
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-[#eab308]/60 text-[9px] font-bold text-[#854d0e]">
            <span>Nilai: Toleransi & Gotong Royong</span>
            <span className="text-[#15803d] font-black font-display">+15 Poin</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 2 (MAIN HERO CARD): Papan Monopindo 42 Petak Nusantara    */}
        {/* ============================================================== */}
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl bg-surface-container-lowest border-2 sm:border-3 border-surface-container p-3 sm:p-4 shadow-2xl flex flex-col gap-2.5 overflow-hidden backdrop-blur-md"
          style={{
            transform: "translateZ(0px)",
            boxShadow: "0 25px 45px -10px rgba(0, 0, 0, 0.18), 0 10px 20px -5px rgba(0, 105, 72, 0.12)",
          }}
        >
          {/* Top Board Mockup Header Ribbon */}
          <div className="flex items-center justify-between border-b border-surface-container pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center font-black text-xs font-display shadow-xs">
                GR
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm font-black text-on-surface font-display tracking-tight">
                    Monopindo Nusantara
                  </span>
                  <Sparkles className="w-3 h-3 text-[#ca8a04]" />
                </div>
                <span className="text-[9px] font-bold text-secondary uppercase tracking-wider">
                  42 Petak Budaya RI
                </span>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full text-[10px] font-black font-display flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              <span>Sesi Aktif</span>
            </div>
          </div>

          {/* Central High-Resolution Visual Showcase Illustration */}
          <div className="w-full h-[155px] sm:h-[185px] lg:h-[170px] xl:h-[200px] rounded-xl sm:rounded-2xl overflow-hidden relative shadow-inner border border-black/5">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCacjhXjfFwlC1_1bjlLzd-sjC1rP4R30cxrpCjwVgHUl6aO5V9lQwTWE3l3muO5ewei2ecbDkzF3meFWoBqr1L1yz6qWFTJa7VUdTPyc5ppCSp0tpBH1B9aZNfFXP54bxtZ4M8YISZ0csrrUCbDwf7NrLXXSMvsZ2KmNl-hHewpTnyT6_liM6JXoc_hInvawfcbFsiEuUupO3obxB_C7GUEjSOr3MGMB8NByE-KL-"
              alt="Ilustrasi siswa nusantara bergotong royong membangun jembatan persatuan"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
            />
            {/* Gradient Overlay for Cinematic Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* In-image Live Badge */}
            <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black text-primary shadow-sm flex items-center gap-1.5 font-display">
              <HeartHandshake className="w-3 h-3 text-primary" />
              <span>Gotong Royong 38 Provinsi</span>
            </div>

            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-extrabold text-white flex items-center gap-1">
              <span>Sila ke-3</span>
            </div>
          </div>

          {/* Miniature 6-Region Color Strip (Representing Board Spectrum) */}
          <div className="grid grid-cols-6 gap-1 py-0.5">
            <div className="h-1.5 rounded-full bg-[#ea580c]" title="Sumatera" />
            <div className="h-1.5 rounded-full bg-[#4f46e5]" title="Jawa" />
            <div className="h-1.5 rounded-full bg-[#16a34a]" title="Kalimantan" />
            <div className="h-1.5 rounded-full bg-[#ca8a04]" title="Sulawesi" />
            <div className="h-1.5 rounded-full bg-[#9333ea]" title="Bali & Nusra" />
            <div className="h-1.5 rounded-full bg-[#db2777]" title="Maluku & Papua" />
          </div>

          {/* Active Players & Score Strip */}
          <div className="bg-surface-container-low p-2 rounded-xl border border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-[#ba1a1a] border border-white text-white text-[9px] font-black flex items-center justify-center font-display">
                  1
                </span>
                <span className="w-5 h-5 rounded-full bg-[#00628d] border border-white text-white text-[9px] font-black flex items-center justify-center font-display">
                  2
                </span>
                <span className="w-5 h-5 rounded-full bg-[#855300] border border-white text-white text-[9px] font-black flex items-center justify-center font-display">
                  3
                </span>
                <span className="w-5 h-5 rounded-full bg-[#006948] border border-white text-white text-[9px] font-black flex items-center justify-center font-display">
                  4
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-on-surface">
                4 Pion Bersatu
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-black">
              <span className="text-primary font-display flex items-center gap-0.5">
                <Coins className="w-3 h-3" />
                <span>Rp 200</span>
              </span>
              <span className="text-secondary font-display">
                +100 Poin
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 3 (FLOATING ELEMENTS): Front Popping 3D Accents           */}
        {/* ============================================================== */}

        {/* Floating Accent 1 (Top-Left): 38 Provinsi Nusantara Badge */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 bg-white border-2 border-primary/40 rounded-full py-1 px-3 shadow-lg flex items-center gap-1.5 z-20 pointer-events-none"
          style={{
            transform: "translateZ(45px)",
            boxShadow: "0 10px 20px -3px rgba(0, 105, 72, 0.25)",
          }}
        >
          <span className="text-sm">🇮🇩</span>
          <span className="text-[10px] sm:text-[11px] font-black text-primary font-display">
            38 Provinsi RI
          </span>
        </motion.div>

        {/* Floating Accent 2 (Bottom-Left): Bakar Batu Papua Mini Card */}
        <motion.div
          animate={{ y: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -bottom-4 sm:-bottom-5 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md border border-surface-container rounded-xl p-2 shadow-xl flex items-center gap-2 z-20 pointer-events-none"
          style={{
            transform: "translateZ(40px) rotateZ(-4deg)",
            boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-sm shadow-xs">
            <Flame className="w-4 h-4 text-orange-600" />
          </div>
          <div className="flex flex-col pr-1">
            <span className="text-[10px] font-extrabold text-on-surface leading-none font-display">
              Bakar Batu Papua
            </span>
            <span className="text-[8.5px] font-bold text-secondary">
              Damai &amp; Syukur
            </span>
          </div>
        </motion.div>

        {/* Floating Accent 3 (Bottom-Right): 3D Tactile Dice + Bonus Coin */}
        <motion.div
          animate={{ y: [-4, 4, -4], rotate: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
          className="absolute -bottom-5 sm:-bottom-6 -right-2 sm:-right-4 flex items-center gap-1.5 z-30 pointer-events-none"
          style={{
            transform: "translateZ(55px)",
          }}
        >
          {/* Isometric White 3D Dice Cube */}
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-xl border-3 border-[#166534] shadow-tactile-dice flex items-center justify-center relative transform -rotate-12"
            style={{
              boxShadow: "0 6px 0 0 #15803d, 0 12px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* 6 pips face */}
            <div className="w-full h-full p-1.5 grid grid-cols-3 grid-rows-3 items-center justify-items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div />
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div />
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div />
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
          </div>

          {/* Reward Notification Pill */}
          <div
            className="bg-[#22c55e] border-2 border-[#14532d] text-white px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black font-display shadow-md flex items-center gap-0.5"
            style={{
              boxShadow: "0 4px 0 0 #14532d",
            }}
          >
            <span>+Rp 50</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

