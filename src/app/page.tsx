"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { LandingView } from "@/components/views/LandingView";
import { SetupView } from "@/components/views/SetupView";
import { BoardView } from "@/components/views/BoardView";
import { EncyclopediaView } from "@/components/views/EncyclopediaView";
import { GameOverView } from "@/components/views/GameOverView";

export default function Home() {
  const { view } = useGame();

  return (
    <div className="w-full flex-1 flex flex-col">
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1 flex flex-col"
          >
            <LandingView />
          </motion.div>
        )}

        {view === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1 flex flex-col"
          >
            <SetupView />
          </motion.div>
        )}

        {view === "board" && (
          <motion.div
            key="board"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1 flex flex-col"
          >
            <BoardView />
          </motion.div>
        )}

        {view === "encyclopedia" && (
          <motion.div
            key="encyclopedia"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1 flex flex-col"
          >
            <EncyclopediaView />
          </motion.div>
        )}

        {view === "gameover" && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1 flex flex-col"
          >
            <GameOverView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

