"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Coins, Check, AlertCircle } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const JailModal: React.FC = () => {
  const { activeModal, activePlayer, jailPayFine, jailVerify } = useGame();
  const [provinceInput, setProvinceInput] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (activeModal !== "jail") return null;

  const handleVerify = () => {
    if (!provinceInput.trim()) {
      setErrorMsg("Mohon ketikkan minimal 5 nama provinsi (pisahkan dengan tanda koma).");
      return;
    }
    const success = jailVerify(provinceInput);
    if (!success) {
      setErrorMsg("Nama provinsi masih kurang dari 5 atau belum valid. Pisahkan dengan tanda koma.");
    } else {
      setProvinceInput("");
      setErrorMsg("");
    }
  };

  const handlePay = () => {
    jailPayFine();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl flex flex-col gap-4 border border-surface-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="jail-modal-title"
        >
          {/* Header */}
          <div className="flex items-center gap-3 text-error border-b pb-3 border-surface-container">
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-error" />
            </div>
            <div className="flex flex-col">
              <h3 id="jail-modal-title" className="text-xl font-extrabold text-on-surface">
                Petak Ruang Evaluasi!
              </h3>
              <span className="text-xs font-semibold text-error">
                {activePlayer.name} perlu membuktikan wawasan kebangsaan untuk bebas melanjutkan perjalanan.
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3">
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Pilih Cara Bebas:
            </span>

            {/* Option 1: Bayar denda */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-xs">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-on-surface">
                  Opsi 1: Bayar Denda Solidaritas Kas Kelas
                </span>
                <span className="text-xs text-on-surface-variant">
                  Sisa kas kamu saat ini: <strong>Rp {activePlayer.money}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handlePay}
                disabled={activePlayer.money < 50}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-secondary ${
                  activePlayer.money >= 50
                    ? "bg-secondary text-on-secondary hover:bg-secondary-hover cursor-pointer"
                    : "bg-surface-container text-on-surface-variant opacity-60 cursor-not-allowed"
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>Bayar Rp 50</span>
              </button>
            </div>

            {/* Option 2: Verifikasi 5 provinsi */}
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-xs">
              <label htmlFor="jail-prov-input" className="text-xs sm:text-sm font-bold text-on-surface">
                Opsi 2: Tantangan Wawasan: Sebutkan 5 Provinsi di Indonesia (pisahkan koma):
              </label>
              <input
                id="jail-prov-input"
                type="text"
                value={provinceInput}
                onChange={(e) => {
                  setProvinceInput(e.target.value);
                  setErrorMsg("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleVerify();
                }}
                placeholder="Contoh: Aceh, Bali, Jatim, Papua, Riau"
                className="w-full p-2.5 bg-surface-container-low rounded-lg text-xs sm:text-sm text-on-surface border border-outline/20 outline-none focus:ring-2 focus:ring-primary"
              />

              {errorMsg && (
                <div className="text-xs text-error font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleVerify}
                className="w-full py-2 bg-primary text-on-primary rounded-lg text-xs font-bold cursor-pointer shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <Check className="w-4 h-4" />
                <span>Verifikasi dan Bebas (+10 Poin)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

