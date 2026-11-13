"use client";

import React from "react";
import { motion } from "framer-motion";
import { TopHUD } from "@/components/hud/TopHUD";
import { MonopolyBoard } from "@/components/board/MonopolyBoard";
import { SidebarPlayers } from "@/components/hud/SidebarPlayers";
import { ActivityFeed } from "@/components/hud/ActivityFeed";

export const BoardView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-3 flex flex-col gap-2.5 sm:gap-3"
    >
      {/* Top HUD */}
      <TopHUD />

      {/* Main Game Layout (Board + Sidebar) */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-3 sm:gap-4 w-full">
        {/* 42-Tile Board Column */}
        <div className="flex items-center justify-center shrink-0">
          <MonopolyBoard />
        </div>

        {/* Sidebar Info Column */}
        <div className="flex flex-col gap-2.5 w-full lg:w-[300px] xl:w-[350px] shrink-0">
          <SidebarPlayers />
          <ActivityFeed />
        </div>
      </div>
    </motion.div>
  );
};
