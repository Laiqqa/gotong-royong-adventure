"use client";

import React from "react";
import { History, Sparkles } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const ActivityFeed: React.FC = () => {
  const { activityLogs } = useGame();

  return (
    <div className="bg-surface-container-lowest rounded-xl p-3 sm:p-3.5 shadow-sm border border-surface-container flex flex-col flex-1 gap-2 min-h-[120px] overflow-hidden">
      <div className="flex items-center justify-between border-b pb-1.5 border-surface-container shrink-0">
        <span className="font-extrabold text-xs sm:text-sm text-on-surface flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-tertiary" />
          <span>Riwayat Perjalanan</span>
        </span>
        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
          Live
        </span>
      </div>

      <div
        className="flex flex-col gap-1.5 overflow-y-auto max-h-[130px] sm:max-h-[160px] lg:max-h-[150px] xl:max-h-[190px] pr-1"
        tabIndex={0}
        aria-label="Daftar Aktivitas Terkini"
      >
        {activityLogs.map((log) => (
          <div
            key={log.id}
            className="p-1.5 sm:p-2 rounded-lg bg-surface-container-low text-on-surface flex items-start gap-2 text-[11px] shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
            <div className="flex flex-col flex-1">
              <span className="leading-snug font-medium">{log.text}</span>
              <span className="text-[9px] text-on-surface-variant/75 mt-0.5">
                {log.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
