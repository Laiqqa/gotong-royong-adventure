"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dices, Footprints } from "lucide-react";
import { useGame } from "@/context/GameContext";

interface Dice3DProps {
  onRoll: () => void;
  disabled?: boolean;
}

export const Dice3D: React.FC<Dice3DProps> = ({ onRoll, disabled = false }) => {
  const { diceValue, isRolling, dicePhase, activePlayer } = useGame();

  // Grid layout for 9 dice cells (3x3)
  const renderPips = (val: number) => {
    const dot = (isCenterRed = false) => (
      <div
        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shadow-inner ${
          isCenterRed ? "bg-[#dc2626]" : "bg-primary"
        }`}
      />
    );
    const empty = () => <div className="w-2 h-2 sm:w-2.5 sm:h-2.5" />;

    switch (val) {
      case 1:
        return [empty(), empty(), empty(), empty(), dot(true), empty(), empty(), empty(), empty()];
      case 2:
        return [dot(), empty(), empty(), empty(), empty(), empty(), empty(), empty(), dot()];
      case 3:
        return [dot(), empty(), empty(), empty(), dot(), empty(), empty(), empty(), dot()];
      case 4:
        return [dot(), empty(), dot(), empty(), empty(), empty(), dot(), empty(), dot()];
      case 5:
        return [dot(), empty(), dot(), empty(), dot(), empty(), dot(), empty(), dot()];
      case 6:
        return [dot(), empty(), dot(), dot(), empty(), dot(), dot(), empty(), dot()];
      default:
        return [empty(), empty(), empty(), empty(), dot(true), empty(), empty(), empty(), empty()];
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 z-10 my-auto">
      {/* Prominent result announcement badge shown right when dice stops */}
      <AnimatePresence>
        {dicePhase === "result" && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 6 }}
            animate={{ scale: [0.85, 1.12, 1], opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#fef08a] border-2 sm:border-3 border-[#ca8a04] px-3 py-0.5 rounded-full text-[#713f12] font-black font-display text-[11px] sm:text-xs shadow-lg flex items-center gap-1.5 z-30 pointer-events-none"
          >
            <span className="text-sm animate-bounce">🎲</span>
            <span>DAPAT ANGKA {diceValue}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Interactive Dice Cube */}
        <motion.button
          type="button"
          onClick={onRoll}
          disabled={disabled || isRolling}
          whileHover={{ scale: disabled || isRolling ? 1 : 1.08 }}
          whileTap={{ scale: disabled || isRolling ? 1 : 0.95, y: 2 }}
          animate={
            dicePhase === "rolling"
              ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.15, 1] }
              : dicePhase === "result"
              ? { scale: [1, 1.2, 1.05], rotate: [0, -5, 5, 0] }
              : { rotate: 0, scale: 1 }
          }
          transition={
            dicePhase === "rolling"
              ? { repeat: Infinity, duration: 0.28, ease: "linear" }
              : { duration: 0.3 }
          }
          className={`w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-white rounded-xl sm:rounded-2xl shadow-tactile-dice border-3 sm:border-4 ${
            dicePhase === "result"
              ? "border-[#eab308] ring-4 ring-[#fde047]"
              : "border-[#166534]"
          } flex items-center justify-center relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/40 transition-all ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          title="Klik untuk melempar dadu!"
          aria-label="Lempar Dadu Petualangan"
        >
          <div className="w-full h-full p-1.5 grid grid-cols-3 grid-rows-3 items-center justify-items-center">
            {renderPips(diceValue).map((pip, idx) => (
              <React.Fragment key={idx}>{pip}</React.Fragment>
            ))}
          </div>
        </motion.button>

        {/* Arcade Action Button */}
        <motion.button
          type="button"
          onClick={onRoll}
          disabled={disabled || isRolling}
          whileHover={{ scale: disabled || isRolling ? 1 : 1.04 }}
          whileTap={{ scale: disabled || isRolling ? 1 : 0.97, y: 2 }}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-[#a855f7] hover:bg-[#9333ea] border-3 sm:border-4 border-[#581c87] rounded-xl sm:rounded-2xl text-[#fef08a] font-black font-display text-xs sm:text-sm tracking-wider uppercase shadow-tactile-purple active:translate-y-1 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#a855f7]/40 ${
            disabled || isRolling ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-base sm:text-lg drop-shadow select-none">
            {dicePhase === "moving" ? "👟" : "👉"}
          </span>
          <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] font-black font-display">
            {dicePhase === "rolling"
              ? "MEMUTAR..."
              : dicePhase === "result"
              ? `ANGKA ${diceValue}!`
              : dicePhase === "moving"
              ? "MELANGKAH..."
              : "PLAY / ROLL"}
          </span>
          {dicePhase === "moving" ? (
            <Footprints className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#fef08a] animate-pulse" />
          ) : (
            <Dices
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#fef08a] ${
                dicePhase === "rolling" ? "animate-spin" : "animate-bounce"
              }`}
            />
          )}
        </motion.button>
      </div>

      {/* Turn indicator text */}
      <span className="font-extrabold text-[10px] sm:text-xs text-white bg-black/50 px-3 py-0.5 rounded-full shadow-inner tracking-wide text-center">
        {dicePhase === "rolling"
          ? "Dadu sedang bergulir..."
          : dicePhase === "result"
          ? `Mendapat angka ${diceValue}! Bersiap jalan...`
          : dicePhase === "moving"
          ? `Pion ${activePlayer.name} sedang melangkah...`
          : `Giliran ${activePlayer.name}`}
      </span>
    </div>
  );
};
