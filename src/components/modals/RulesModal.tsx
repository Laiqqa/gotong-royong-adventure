"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, Check } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const RulesModal: React.FC = () => {
  const { activeModal, closeModal } = useGame();

  if (activeModal !== "rules") return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto border border-surface-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3 border-surface-container">
            <h3 id="rules-modal-title" className="text-lg sm:text-xl font-extrabold text-on-surface flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Panduan Aturan Bermain 42 Petak Nusantara</span>
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Tutup panduan aturan"
            >
              <X className="w-4 h-4 text-on-surface" />
            </button>
          </div>

          {/* Rules list */}
          <div className="flex flex-col gap-3.5 text-xs sm:text-sm text-on-surface-variant font-medium">
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div>
                <strong className="text-on-surface block font-bold mb-0.5">Giliran Berputar:</strong>
                Pemain secara bergantian menekan tombol "PLAY / ROLL" atau klik dadu interaktif. Pion akan bergerak melangkah searah jarum jam sesuai angka dadu yang keluar.
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div>
                <strong className="text-on-surface block font-bold mb-0.5">Petak Provinsi (Sabang sampai Merauke):</strong>
                Mendarat di provinsi akan membuka tantangan tradisi gotong royong lokal. Jawab dengan benar untuk meraih <strong>+20 Poin</strong> persatuan dan <strong>+Rp 25</strong> uang gotong royong.
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <div>
                <strong className="text-on-surface block font-bold mb-0.5">Petak Sudut Khusus:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-xs text-on-surface-variant">
                  <li><strong>START:</strong> Mendapatkan bonus +Rp 50 dan +10 Poin setiap melewati atau mendarat di petak ini.</li>
                  <li><strong>POS PERSATUAN:</strong> Mendapatkan apresiasi moral berupa +10 Poin dan +Rp 10.</li>
                  <li><strong>KARTU TANTANGAN:</strong> Menjawab kuis studi kasus etika toleransi dan kerjasama.</li>
                  <li><strong>PENJARA (RUANG EVALUASI):</strong> Terjebak atau dapat bebas langsung dengan membayar denda Rp 50 atau menyebutkan 5 nama provinsi berbeda.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center shrink-0 text-xs">
                4
              </span>
              <div>
                <strong className="text-on-surface block font-bold mb-0.5">Penentuan Juara:</strong>
                Permainan berlangsung selama 3 putaran mengelilingi Nusantara. Pemain dengan akumulasi <strong>Poin Gotong Royong</strong> tertinggi dinobatkan sebagai Pahlawan Persatuan Indonesia!
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Check className="w-4 h-4" />
            <span>Saya Mengerti, Ayo Main!</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

