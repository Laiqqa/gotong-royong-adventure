"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Gamepad2,
  BookOpen,
  Compass,
  CheckCircle,
  Users,
  HeartHandshake,
  Globe2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useGame } from "@/context/GameContext";
import { IsometricMockup } from "@/components/landing/IsometricMockup";

const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.85,
    rotate: -4,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 220,
    },
  },
};

export const LandingView: React.FC = () => {
  const { setView, openModal } = useGame();

  const scrollToPillars = () => {
    const el = document.getElementById("pillars-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Banner Section (Optimized to fit 100% on laptop screens) */}
      <section className="relative overflow-hidden bg-surface-container-low py-6 sm:py-8 lg:py-4 lg:min-h-[calc(100vh-3.5rem)] lg:flex lg:flex-col lg:justify-center px-4 md:px-8 lg:px-12 border-b border-surface-container">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          {/* Left Column: Heading, Badges, CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 flex flex-col gap-3 sm:gap-4"
          >
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full self-start shadow-xs text-xs font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">Pendidikan Pancasila Interaktif</span>
            </div>

            <motion.h1
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-5xl font-extrabold text-on-surface tracking-tight leading-tight flex flex-wrap gap-x-2.5 sm:gap-x-3.5 select-none"
              aria-label="GOTONG ROYONG ADVENTURE"
            >
              <span className="inline-flex">
                {"GOTONG".split("").map((char, index) => (
                  <motion.span
                    key={`g-${index}`}
                    variants={letterVariants}
                    whileHover={{ y: -4, scale: 1.15, color: "#166534", transition: { duration: 0.15 } }}
                    className="inline-block cursor-default transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="inline-flex">
                {"ROYONG".split("").map((char, index) => (
                  <motion.span
                    key={`r-${index}`}
                    variants={letterVariants}
                    whileHover={{ y: -4, scale: 1.15, color: "#166534", transition: { duration: 0.15 } }}
                    className="inline-block cursor-default transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="inline-flex text-primary">
                {"ADVENTURE".split("").map((char, index) => (
                  <motion.span
                    key={`a-${index}`}
                    variants={letterVariants}
                    whileHover={{ y: -4, scale: 1.15, color: "#ca8a04", transition: { duration: 0.15 } }}
                    className="inline-block cursor-default transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <p className="text-xs sm:text-sm lg:text-sm xl:text-base text-on-surface-variant max-w-xl font-medium leading-relaxed">
              Jelajahi Nusantara, kenali kekayaan tradisi gotong royong 38 provinsi, dan hidupkan kembali semangat kebersamaan Pancasila melalui permainan papan multipemain yang seru dan mendidik!
            </p>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-0.5">
              <div className="bg-surface-container-lowest p-2 sm:p-2.5 rounded-xl shadow-xs border border-surface-container flex flex-col items-center text-center">
                <span className="text-xl sm:text-2xl font-black text-primary font-display">38</span>
                <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant">Provinsi RI</span>
              </div>
              <div className="bg-surface-container-lowest p-2 sm:p-2.5 rounded-xl shadow-xs border border-surface-container flex flex-col items-center text-center">
                <span className="text-xl sm:text-2xl font-black text-tertiary font-display">42</span>
                <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant">Petak Papan</span>
              </div>
              <div className="bg-surface-container-lowest p-2 sm:p-2.5 rounded-xl shadow-xs border border-surface-container flex flex-col items-center text-center">
                <span className="text-xl sm:text-2xl font-black text-secondary font-display">Sila 3</span>
                <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant">Persatuan RI</span>
              </div>
              <div className="bg-surface-container-lowest p-2 sm:p-2.5 rounded-xl shadow-xs border border-surface-container flex flex-col items-center text-center">
                <span className="text-xl sm:text-2xl font-black text-primary-container font-display">2-4</span>
                <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant">Pemain Lokal</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
              <button
                type="button"
                onClick={() => setView("setup")}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-primary text-on-primary rounded-full font-extrabold text-xs sm:text-sm font-display tracking-wide shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>MULAI PETUALANGAN</span>
              </button>

              <button
                type="button"
                onClick={() => openModal("rules")}
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-surface-container-lowest text-primary rounded-full font-bold text-xs sm:text-sm shadow-tactile hover:bg-surface-container-high transition-all flex items-center gap-1.5 cursor-pointer border border-surface-container focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>CARA BERMAIN</span>
              </button>

              <button
                type="button"
                onClick={() => setView("encyclopedia")}
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-surface-container text-on-surface rounded-full font-bold text-xs sm:text-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-4 focus:ring-outline/30"
              >
                <Compass className="w-4 h-4 text-tertiary" />
                <span>ENSIKLOPEDIA</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Visual Hero Element (Isometric 3D Perspective Card Mockup) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <IsometricMockup />
          </motion.div>
        </div>

        {/* Scroll down hint for laptop screens */}
        <div className="hidden lg:flex justify-center mt-3">
          <button
            type="button"
            onClick={scrollToPillars}
            className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 opacity-70 hover:opacity-100"
            aria-label="Lihat Pilar Pendidikan di bawah"
          >
            <span>Pelajari Lebih Lanjut</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Educational Pillars Section */}
      <section id="pillars-section" className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-1.5 mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-extrabold text-secondary uppercase tracking-widest">
            Pilar Profil Pelajar Pancasila
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            Mengapa Bermain Gotong Royong Adventure?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-on-surface-variant max-w-2xl font-medium">
            Melalui dinamika permainan papan yang interaktif, para pemain belajar menghargai keragaman kultural, melatih musyawarah, dan mempraktikkan aksi gotong royong nyata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Pillar 1: Karakter Gotong Royong -> Pelajari Filosofi Tradisi */}
          <button
            type="button"
            onClick={() => setView("encyclopedia")}
            className="text-left bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-primary/40 hover:-translate-y-1 transition-all flex flex-col gap-2.5 border border-surface-container cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary"
            title="Klik untuk mempelajari filosofi dan tradisi 38 provinsi di Ensiklopedia"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
              Karakter Gotong Royong
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
              Menginternalisasi nilai kolaborasi, empati, dan kepedulian bersama teman sebaya demi mencapai tujuan pembangunan pos persatuan nusantara.
            </p>
            <div className="mt-auto pt-2 text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
              <span>Pelajari Filosofi Tradisi</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Pillar 2: Eksplorasi 38 Provinsi -> Jelajahi Peta Wilayah */}
          <button
            type="button"
            onClick={() => setView("setup")}
            className="text-left bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-tertiary/40 hover:-translate-y-1 transition-all flex flex-col gap-2.5 border border-surface-container cursor-pointer group focus:outline-none focus:ring-2 focus:ring-tertiary"
            title="Klik untuk menjelajahi peta wilayah 42 petak papan permainan Nusantara"
          >
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors">
              Eksplorasi 38 Provinsi
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
              Mengenal adat istiadat dari Sabang hingga Merauke seperti Sambatan di Jawa, Batobo di Riau, hingga Marsiadapari di Sumatera Utara.
            </p>
            <div className="mt-auto pt-2 text-xs font-bold text-tertiary flex items-center gap-1 group-hover:underline">
              <span>Jelajahi Peta Wilayah</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Pillar 3: Toleransi dan Kebhinekaan -> Satu Nusa Satu Bangsa */}
          <button
            type="button"
            onClick={() => openModal("unity")}
            className="text-left bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-secondary/40 hover:-translate-y-1 transition-all flex flex-col gap-2.5 border border-surface-container cursor-pointer group focus:outline-none focus:ring-2 focus:ring-secondary"
            title="Klik untuk membuka ikrar persatuan dan kebhinekaan Sila ke-3"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-secondary transition-colors">
              Toleransi dan Kebhinekaan
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
              Menumbuhkan kesadaran bahwa perbedaan suku, agama, dan budaya adalah anugerah terbesar pemersatu bangsa Indonesia.
            </p>
            <div className="mt-auto pt-2 text-xs font-bold text-secondary flex items-center gap-1 group-hover:underline">
              <span>Satu Nusa Satu Bangsa</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
