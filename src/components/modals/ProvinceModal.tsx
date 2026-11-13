"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle, CheckCircle, XCircle, ArrowRight, X } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const ProvinceModal: React.FC = () => {
  const {
    activeModal,
    selectedProvince,
    answerProvince,
    finishProvinceTurn,
    closeModal,
    isLandingTurn,
    activePlayer,
  } = useGame();

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  // Reset quiz choice whenever a new province is selected or modal opens
  useEffect(() => {
    if (activeModal === "province") {
      setSelectedIdx(null);
      setAnswered(false);
    }
  }, [activeModal, selectedProvince?.id]);

  if (activeModal !== "province" || !selectedProvince) return null;

  // Fallback quiz if somehow missing from province data
  const quiz = selectedProvince.quiz || {
    question: `Tradisi gotong royong khas di Provinsi ${selectedProvince.name} yang terkenal adalah...?`,
    options: [
      { text: selectedProvince.trad1, correct: true },
      { text: "Kerja bakti modern tanpa nilai adat", correct: false },
      { text: "Upacara individual perseorangan", correct: false },
      { text: "Kegiatan swasta berbayar", correct: false },
    ],
    explain: `Tradisi gotong royong di ${selectedProvince.name} mengutamakan kebersamaan, kepedulian sosial, dan kerukunan warga.`,
  };

  const optionLetters = ["A", "B", "C", "D"];
  const isCorrect = selectedIdx !== null && quiz.options[selectedIdx]?.correct;

  const handleSelectOption = (idx: number, optCorrect: boolean) => {
    if (answered) return;
    setSelectedIdx(idx);
    setAnswered(true);
    answerProvince(optCorrect);
  };

  const handleFinish = () => {
    if (isLandingTurn) {
      finishProvinceTurn();
    } else {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-2xl flex flex-col gap-3.5 border border-surface-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="province-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2.5 border-surface-container">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl" role="img" aria-label="Ikon provinsi">
                {selectedProvince.icon}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-wider">
                  Wilayah: {selectedProvince.region.toUpperCase()}
                </span>
                <h3 id="province-modal-title" className="text-lg sm:text-xl font-extrabold text-on-surface leading-tight">
                  Provinsi {selectedProvince.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full text-[11px] font-black">
                +20 Poin / -5 Poin
              </div>
              {!isLandingTurn && (
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
                  aria-label="Tutup modal"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Cultural Context Brief */}
          <div className="bg-surface-container-low p-2.5 sm:p-3 rounded-xl flex flex-col gap-1 border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>{selectedProvince.filosofiTitle || "Kearifan Lokal"}</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant uppercase">
                Filosofi
              </span>
            </div>
            {selectedProvince.quote && (
              <p className="text-xs font-black text-on-surface italic pl-2 border-l-2 border-primary leading-tight">
                {selectedProvince.quote}
              </p>
            )}
          </div>

          {/* Interactive Multiple Choice Quiz */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 text-secondary">
              <HelpCircle className="w-4 h-4 text-secondary shrink-0" />
              <span className="text-xs font-extrabold uppercase tracking-wide">
                Kuis Tradisi Gotong Royong:
              </span>
            </div>

            <p className="text-xs sm:text-sm text-on-surface font-bold leading-snug">
              {quiz.question}
            </p>

            {/* 4 Multiple Choice Options */}
            <div className="flex flex-col gap-1.5">
              {quiz.options.map((opt, idx) => {
                const isSelected = selectedIdx === idx;
                let optionStyle =
                  "bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container hover:border-outline";

                if (answered) {
                  if (opt.correct) {
                    optionStyle = "bg-[#059669] text-white border-2 border-[#047857] shadow-sm font-bold";
                  } else if (isSelected && !opt.correct) {
                    optionStyle = "bg-[#dc2626] text-white border-2 border-[#b91c1c] shadow-sm font-bold";
                  } else {
                    optionStyle = "bg-surface-container-low text-on-surface opacity-50 border border-surface-container";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={answered}
                    onClick={() => handleSelectOption(idx, opt.correct)}
                    className={`w-full p-2.5 sm:p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2.5 focus:outline-none focus:ring-2 focus:ring-primary ${optionStyle} ${
                      !answered ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          answered && opt.correct
                            ? "bg-white text-[#059669]"
                            : answered && isSelected && !opt.correct
                            ? "bg-white text-[#dc2626]"
                            : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        {optionLetters[idx]}
                      </span>
                      <span className="leading-snug break-words">{opt.text}</span>
                    </div>

                    {answered && opt.correct && (
                      <CheckCircle className="w-4 h-4 text-white shrink-0" />
                    )}
                    {answered && isSelected && !opt.correct && (
                      <XCircle className="w-4 h-4 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Explanation Box after answering */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 pt-1"
            >
              {/* Score adjustment banner */}
              <div
                className={`p-2.5 rounded-xl flex items-center gap-2 border text-xs sm:text-sm font-bold ${
                  isCorrect
                    ? "bg-[#ecfdf5] border-[#10b981] text-[#065f46]"
                    : "bg-[#fef2f2] border-[#f87171] text-[#991b1b]"
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>
                      Jawaban Tepat! {activePlayer.name} memperoleh +20 Poin dan +Rp 25 Dana Kas!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-[#dc2626] shrink-0" />
                    <span>
                      Jawaban Belum Tepat (-5 Poin). Kunci jawaban yang benar ditandai warna hijau di atas.
                    </span>
                  </>
                )}
              </div>

              {/* Cultural knowledge explanation */}
              <div className="bg-surface-container-low p-2.5 sm:p-3 rounded-xl border border-surface-container text-xs text-on-surface-variant flex flex-col gap-1">
                <span className="font-extrabold text-on-surface text-[11px] uppercase tracking-wide">
                  Pengetahuan Tradisi:
                </span>
                <p className="leading-relaxed">{quiz.explain}</p>
                <div className="text-[11px] text-on-surface font-semibold pt-1 border-t border-surface-container flex flex-col gap-0.5">
                  <span>Tradisi 1: {selectedProvince.trad1}</span>
                  <span>Tradisi 2: {selectedProvince.trad2}</span>
                </div>
              </div>

              {/* Continue button */}
              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-2.5 sm:py-3 px-4 bg-primary text-on-primary rounded-xl font-black text-xs sm:text-sm shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer mt-1"
              >
                <span>
                  {isLandingTurn ? "Lanjutkan Petualangan (Giliran Berikutnya)" : "Tutup"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Close button if user opened modal manually to preview without landing */}
          {!answered && !isLandingTurn && (
            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="py-2 px-4 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Tutup
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
