"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const GameOverView: React.FC = () => {
  const { players, setView, restartGame } = useGame();

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  }, []);

  const sortedPlayers = [...players].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.money - a.money;
  });

  const winner = sortedPlayers[0];
  const second = sortedPlayers[1];
  const third = sortedPlayers[2];

  // For visual podium: 2nd on left, 1st in center, 3rd on right
  const podiumList = [];
  if (second) podiumList.push({ player: second, rank: 2, icon: "🥈", isCenter: false });
  if (winner) podiumList.push({ player: winner, rank: 1, icon: "👑", isCenter: true });
  if (third) podiumList.push({ player: third, rank: 3, icon: "🥉", isCenter: false });

  return (
    <div className="w-full py-4 sm:py-6 px-3 sm:px-6 md:px-8 flex-1 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto w-full bg-surface-container-lowest rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center gap-4 border border-surface-container"
      >
        {/* Trophy icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center animate-bounce shadow-inner">
          <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-primary uppercase tracking-widest">
            Permainan Selesai
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-on-surface">
            Pahlawan Gotong Royong Terpilih!
          </h2>
          <p className="text-xs text-on-surface-variant max-w-md font-medium leading-relaxed">
            Terima kasih telah menjelajahi dan merawat persatuan Nusantara. Setiap aksi kebaikanmu adalah wujud nyata Bhinneka Tunggal Ika!
          </p>
        </div>

        {/* Podium View */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 items-end pt-1">
          {podiumList.map((item) => (
            <div
              key={item.player.id}
              className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                item.isCenter
                  ? "bg-secondary-container/20 border-secondary shadow-md order-1 sm:order-2 pb-4"
                  : "bg-surface-container-low border-surface-container order-2 sm:order-1"
              }`}
            >
              <div className="text-2xl mb-0.5">{item.icon}</div>
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${item.player.badgeBg} text-on-primary text-sm font-black flex items-center justify-center shadow-md mb-1`}
              >
                {item.player.id}
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-on-surface">
                {item.player.name}
              </h3>
              <span className="text-[11px] font-black text-primary mt-0.5">
                {item.player.points} Poin
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">
                Sisa Kas: Rp {item.player.money}
              </span>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <div className="w-full bg-surface-container-low rounded-xl p-3 sm:p-4 overflow-x-auto text-left border border-surface-container max-h-[160px] overflow-y-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-surface-container-high text-on-surface-variant font-bold">
                <th className="py-2 px-1.5">Peringkat</th>
                <th className="py-2 px-1.5">Nama</th>
                <th className="py-2 px-1.5">Pion</th>
                <th className="py-2 px-1.5 text-right">Poin</th>
                <th className="py-2 px-1.5 text-right">Kas</th>
                <th className="py-2 px-1.5 text-right">Provinsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {sortedPlayers.map((p, idx) => (
                <tr key={p.id} className="font-medium text-on-surface">
                  <td className="py-2 px-1.5 font-black text-primary">#{idx + 1}</td>
                  <td className="py-2 px-1.5 font-bold">{p.name}</td>
                  <td className="py-2 px-1.5">
                    <span className={`w-3 h-3 rounded-full ${p.badgeBg} inline-block shadow-xs`} />
                  </td>
                  <td className="py-2 px-1.5 text-right font-black text-primary">
                    {p.points} Poin
                  </td>
                  <td className="py-2 px-1.5 text-right">Rp {p.money}</td>
                  <td className="py-2 px-1.5 text-right">{p.unlockedProv} Wilayah</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={restartGame}
            className="px-5 py-2.5 bg-primary text-on-primary rounded-full font-black text-xs sm:text-sm shadow-tactile-primary active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-4 focus:ring-primary/40"
          >
            <RotateCcw className="w-4 h-4" />
            <span>MAIN LAGI</span>
          </button>

          <button
            type="button"
            onClick={() => setView("landing")}
            className="px-4 py-2.5 bg-surface-container text-on-surface rounded-full font-bold text-xs sm:text-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-outline"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
