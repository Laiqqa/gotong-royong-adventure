"use client";

import React from "react";
import { Star, Banknote, MapPin, Lock, Award } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const SidebarPlayers: React.FC = () => {
  const { players, currentTurnIndex } = useGame();

  return (
    <div className="bg-surface-container-lowest rounded-xl p-3 sm:p-3.5 shadow-sm border border-surface-container flex flex-col gap-2 shrink-0">
      <div className="flex items-center justify-between border-b pb-1.5 border-surface-container">
        <span className="font-extrabold text-xs sm:text-sm text-on-surface flex items-center gap-1.5">
          <Award className="w-4 h-4 text-primary" />
          <span>Status Pemain</span>
        </span>
        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          Gotong Royong
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {players.map((p, idx) => {
          const isActive = idx === currentTurnIndex;

          return (
            <div
              key={p.id}
              className={`p-2 rounded-lg border transition-all ${
                isActive
                  ? `bg-surface-container-high ${p.borderClass} shadow-xs`
                  : "bg-surface-container-low border-transparent opacity-80"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${p.badgeBg} shadow-xs`} />
                  <span
                    className={`text-xs ${
                      isActive ? "text-on-surface font-extrabold" : "text-on-surface-variant font-bold"
                    }`}
                  >
                    {p.name}
                  </span>
                </div>
                {isActive && (
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-primary text-on-primary">
                    Aktif
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-secondary fill-secondary" />
                  <strong>{p.points}</strong> Poin
                </span>
                <span className="flex items-center gap-1">
                  <Banknote className="w-3 h-3 text-primary" />
                  <strong>Rp {p.money}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-tertiary" />
                  <span>Petak <strong>{p.pos}</strong></span>
                </span>
              </div>

              {p.inJail && (
                <div className="mt-1 text-[10px] text-error font-extrabold flex items-center gap-1 bg-error-container/40 p-1 rounded-md">
                  <Lock className="w-3 h-3" />
                  <span>Tertahan di Ruang Evaluasi</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
