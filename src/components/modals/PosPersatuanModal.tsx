"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users2, Gift } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const PosPersatuanModal: React.FC = () => {
  const { activeModal, claimPosBonus, activePlayer } = useGame();

  if (activeModal !== "pos") return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col items-center text-center gap-4 border border-surface-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pos-modal-title"
        >
          <div className="w-16 h-16 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shadow-inner">
            <Users2 className="w-8 h-8 text-tertiary" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
              Pos Persatuan Pancasila
            </span>
            <h3 id="pos-modal-title" className="text-xl sm:text-2xl font-extrabold text-on-surface">
              Aksi Nyata Kebersamaan!
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-md">
              Selamat {activePlayer.name}! Kamu tiba di Pos Persatuan. Gotong royong menuntut tindakan nyata di sekolah dan masyarakat: menjaga kebersihan ruang kelas, menjenguk teman yang sakit, atau menghargai teman yang sedang beribadah.
            </p>
          </div>

          <div className="w-full p-3.5 bg-primary/10 text-primary rounded-xl text-xs sm:text-sm font-bold border border-primary/20 flex items-center justify-center gap-2">
            <Gift className="w-5 h-5 text-primary shrink-0" />
            <span>Bonus Solidaritas: +10 Poin Persatuan &amp; +Rp 10 Uang Gotong Royong!</span>
          </div>

          <button
            type="button"
            onClick={claimPosBonus}
            className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Klaim Bonus dan Lanjutkan
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

