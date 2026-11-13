"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { CHALLENGE_QUIZZES } from "@/data/quizzes";
import { Quiz } from "@/types/game";

export const ChallengeModal: React.FC = () => {
  const { activeModal, closeModal, answerQuiz, activePlayer } = useGame();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>(CHALLENGE_QUIZZES[0]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  useEffect(() => {
    if (activeModal === "challenge") {
      const randomQ = CHALLENGE_QUIZZES[Math.floor(Math.random() * CHALLENGE_QUIZZES.length)];
      setCurrentQuiz(randomQ);
      setSelectedIdx(null);
      setAnswered(false);
    }
  }, [activeModal]);

  if (activeModal !== "challenge") return null;

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    if (answered) return;
    setSelectedIdx(idx);
    setAnswered(true);
    answerQuiz(isCorrect);
  };

  const handleFinish = () => {
    closeModal();
  };

  const optionLetters = ["A", "B", "C", "D"];
  const isCorrectChoice = selectedIdx !== null && currentQuiz.options[selectedIdx]?.correct;

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
          aria-labelledby="challenge-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3 border-surface-container">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-secondary" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Kuis Karakter &amp; Kerjasama
                </span>
                <h3 id="challenge-modal-title" className="text-lg sm:text-xl font-extrabold text-on-surface">
                  Kartu Tantangan Pancasila
                </h3>
              </div>
            </div>
            <span className="text-xs font-black text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
              {currentQuiz.sila || "Sila ke-3"}
            </span>
          </div>

          {/* Question text */}
          <p className="text-sm sm:text-base text-on-surface font-bold leading-snug">
            {currentQuiz.q}
          </p>

          {/* Option list */}
          <div className="flex flex-col gap-2">
            {currentQuiz.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              let btnClass = "bg-surface-container-low hover:bg-surface-container text-on-surface";

              if (answered) {
                if (opt.correct) {
                  btnClass = "bg-primary-fixed text-on-primary-fixed border-2 border-primary font-bold";
                } else if (isSelected && !opt.correct) {
                  btnClass = "bg-error-container text-on-error-container border-2 border-error font-bold";
                } else {
                  btnClass = "bg-surface-container-low text-on-surface opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={answered}
                  onClick={() => handleSelectOption(idx, opt.correct)}
                  className={`w-full p-3 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${btnClass}`}
                >
                  <span className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-xs font-black shrink-0">
                    {optionLetters[idx]}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback section when answered */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-2.5 ${
                isCorrectChoice
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-error/10 text-error border border-error/20"
              }`}
            >
              {isCorrectChoice ? (
                <CheckCircle className="w-5 h-5 shrink-0 text-primary mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-error mt-0.5" />
              )}
              <div className="flex flex-col">
                <span className="font-extrabold">
                  {isCorrectChoice
                    ? `Luar Biasa! Jawaban ${activePlayer.name} Tepat (+15 Poin, +Rp 15)`
                    : `Kurang Tepat untuk ${activePlayer.name} (-3 Poin)`}
                </span>
                <span className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  {currentQuiz.explain}
                </span>
              </div>
            </motion.div>
          )}

          {/* Close / Next Button */}
          {answered && (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span>Lanjutkan Petualangan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

