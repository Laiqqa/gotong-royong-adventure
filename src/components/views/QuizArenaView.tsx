"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
} from "lucide-react";
import { useGame } from "@/context/GameContext";
import { PROVINCES } from "@/data/provinces";
import { Province, Region } from "@/types/game";
import { CardCornerMotif } from "@/components/ui/NusantaraBackground";

export const QuizArenaView: React.FC = () => {
  const { setView, openModal } = useGame();

  const [sessionState, setSessionState] = useState<"setup" | "playing" | "result">("setup");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [quizList, setQuizList] = useState<Province[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const regionOptions: { id: string; label: string; region?: Region }[] = [
    { id: "all", label: "Seluruh Nusantara (38 Provinsi)" },
    { id: "sumatera", label: "Pulau Sumatera" },
    { id: "jawa", label: "Pulau Jawa" },
    { id: "kalimantan", label: "Pulau Kalimantan" },
    { id: "sulawesi", label: "Pulau Sulawesi" },
    { id: "nusatenggara", label: "Bali & Nusa Tenggara" },
    { id: "papua", label: "Maluku & Papua" },
  ];

  const startQuizSession = () => {
    let pool = PROVINCES.filter((p) => p.quiz && p.quiz.options && p.quiz.options.length > 0);
    if (selectedRegion !== "all") {
      pool = pool.filter((p) => p.region === selectedRegion);
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setQuizList(selected);
    setCurrentIndex(0);
    setSelectedOptionIdx(null);
    setAnswered(false);
    setScore(0);
    setSessionState("playing");
  };

  const currentProv = quizList[currentIndex];
  const currentQ = currentProv?.quiz;

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    if (answered) return;
    setSelectedOptionIdx(idx);
    setAnswered(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Auto save to collected stamps in localStorage
      try {
        const saved = localStorage.getItem("gra_collected_provinces");
        const list: number[] = saved ? JSON.parse(saved) : [];
        if (!list.includes(currentProv.id)) {
          list.push(currentProv.id);
          localStorage.setItem("gra_collected_provinces", JSON.stringify(list));
        }
      } catch {}
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setAnswered(false);
    } else {
      setSessionState("result");
    }
  };

  const letterLabels = ["A", "B", "C", "D"];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full py-6 sm:py-10 px-4 md:px-8 lg:px-12 flex flex-col justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl">
        {/* Setup Screen */}
        {sessionState === "setup" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-5 sm:p-8 shadow-xl border border-surface-container flex flex-col gap-6"
          >
            <CardCornerMotif variant="gold" />
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 border-surface-container">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setView("landing")}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
                  aria-label="Kembali ke Beranda"
                >
                  <ArrowLeft className="w-4 h-4 text-on-surface" />
                </button>
                <div className="flex flex-col">
                  <h2 className="text-xl sm:text-2xl font-black text-on-surface font-display">
                    Arena Kuis Budaya Nusantara
                  </h2>
                  <span className="text-xs text-on-surface-variant font-medium">
                    Uji wawasan adat, tradisi gotong royong, dan kearifan lokal 38 provinsi
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 bg-secondary-container/20 text-secondary px-3 py-1 rounded-full text-xs font-black">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mode Latihan Cepat</span>
              </div>
            </div>

            {/* Region Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-extrabold text-on-surface">
                Pilih Wilayah / Kepulauan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {regionOptions.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRegion(r.id)}
                    className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                      selectedRegion === r.id
                        ? "bg-primary text-on-primary border-primary shadow-tactile-primary"
                        : "bg-surface-container-low text-on-surface border-surface-container hover:bg-surface-container-high"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-extrabold text-on-surface">
                Jumlah Soal:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all border ${
                      questionCount === count
                        ? "bg-secondary text-on-secondary border-secondary shadow-tactile-secondary"
                        : "bg-surface-container-low text-on-surface border-surface-container hover:bg-surface-container-high"
                    }`}
                  >
                    {count} Soal
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              type="button"
              onClick={startQuizSession}
              className="w-full py-3.5 bg-primary text-on-primary font-black rounded-2xl shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/40 text-sm sm:text-base font-display"
            >
              <span>MULAI LATIHAN KUIS SEKARANG</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Playing Screen */}
        {sessionState === "playing" && currentProv && currentQ && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-5 sm:p-8 shadow-xl border border-surface-container flex flex-col gap-5"
          >
            <CardCornerMotif variant="emerald" />
            {/* Question Progress Header */}
            <div className="flex items-center justify-between border-b pb-3 border-surface-container">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentProv.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-wider">
                    Provinsi {currentProv.name}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-on-surface">
                    Tradisi: {currentProv.trad1}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-primary">
                  Soal {currentIndex + 1} dari {quizList.length}
                </span>
                <span className="text-[10px] text-on-surface-variant font-medium">
                  Skor: {score} Benar
                </span>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-surface-container">
              <p className="text-sm sm:text-base font-extrabold text-on-surface leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                let btnStyle = "bg-surface-container-low hover:bg-surface-container-high border-surface-container text-on-surface";

                if (answered) {
                  if (opt.correct) {
                    btnStyle = "bg-primary/15 border-primary text-primary font-bold shadow-xs";
                  } else if (isSelected && !opt.correct) {
                    btnStyle = "bg-error/15 border-error text-error font-bold shadow-xs";
                  } else {
                    btnStyle = "bg-surface-container-low border-surface-container opacity-50 text-on-surface";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={answered}
                    onClick={() => handleSelectOption(idx, opt.correct)}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-3 transition-all ${btnStyle} ${
                      !answered ? "cursor-pointer active:scale-[0.99]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                          answered && opt.correct
                            ? "bg-primary text-white"
                            : isSelected && !opt.correct
                            ? "bg-error text-white"
                            : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        {letterLabels[idx]}
                      </span>
                      <span className="font-semibold leading-snug">{opt.text}</span>
                    </div>

                    {answered && opt.correct && (
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    )}
                    {answered && isSelected && !opt.correct && (
                      <AlertCircle className="w-5 h-5 text-error shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Explanation Box */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container-low p-4 rounded-xl border border-surface-container flex flex-col gap-1 text-xs"
              >
                <span className="font-extrabold text-on-surface flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Penjelasan Budaya &amp; Filosofi:</span>
                </span>
                <p className="text-on-surface-variant font-medium leading-relaxed">
                  {currentQ.explain}
                </p>
              </motion.div>
            )}

            {/* Next Button */}
            {answered && (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-full py-3 bg-primary text-on-primary font-black rounded-xl shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <span>{currentIndex + 1 < quizList.length ? "Soal Berikutnya" : "Lihat Hasil Akhir"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}

        {/* Result Screen */}
        {sessionState === "result" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container flex flex-col items-center text-center gap-5"
          >
            <CardCornerMotif variant="gold" />
            <div className="w-16 h-16 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center shadow-inner">
              <Award className="w-8 h-8 text-secondary" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-black uppercase tracking-wider text-primary">
                Sesi Latihan Kuis Selesai
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-on-surface font-display">
                Hasil Latihan Budaya Nusantara
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium max-w-md">
                Setiap tradisi gotong royong yang kamu pahami mempererat rasa persatuan bangsa kita!
              </p>
            </div>

            {/* Score Ring */}
            <div className="p-4 sm:p-6 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col items-center gap-1 w-full max-w-sm">
              <span className="text-4xl sm:text-5xl font-black text-primary font-display">
                {score} / {quizList.length}
              </span>
              <span className="text-xs font-bold text-on-surface-variant">
                Skor Akurasi: {Math.round((score / quizList.length) * 100)}%
              </span>
              <span className="text-[11px] font-bold text-secondary bg-secondary/10 px-3 py-0.5 rounded-full mt-1">
                {score >= quizList.length * 0.8
                  ? "Predikat: Pakar Tradisi Nusantara"
                  : score >= quizList.length * 0.5
                  ? "Predikat: Penjelajah Budaya Berbakat"
                  : "Predikat: Pemelajar Gotong Royong Semangat"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-1">
              <button
                type="button"
                onClick={startQuizSession}
                className="px-5 py-2.5 bg-primary text-on-primary rounded-full font-black text-xs sm:text-sm shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>LATIHAN LAGI</span>
              </button>

              <button
                type="button"
                onClick={() => openModal("passport")}
                className="px-4 py-2.5 bg-secondary-container/20 text-secondary border border-secondary/30 rounded-full font-bold text-xs sm:text-sm hover:bg-secondary-container/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Award className="w-4 h-4 text-secondary" />
                <span>Lihat Paspor Budaya</span>
              </button>

              <button
                type="button"
                onClick={() => setView("landing")}
                className="px-4 py-2.5 bg-surface-container text-on-surface rounded-full font-bold text-xs sm:text-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Kembali ke Beranda</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

