"use client";

import React from "react";
import { motion } from "framer-motion";
import { BOARD_TILES, TileDefinition } from "@/data/constants";
import { PROVINCES } from "@/data/provinces";
import { useGame } from "@/context/GameContext";
import { Dice3D } from "./Dice3D";
import { Sparkles, Megaphone } from "lucide-react";

export const MonopolyBoard: React.FC = () => {
  const { players, rollDice, isRolling, openModal, activityLogs } = useGame();

  const getTile = (index: number): TileDefinition => {
    return BOARD_TILES.find((t) => t.index === index) || BOARD_TILES[0];
  };

  const topRow = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32].map(getTile);
  const leftCol = [20, 19, 18, 17, 16, 15, 14, 13, 12].map(getTile);
  const rightCol = [33, 34, 35, 36, 37, 38, 39, 40, 41].map(getTile);
  const bottomRow = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(getTile);

  const handleTileClick = (tile: TileDefinition) => {
    if (tile.type === "province" && tile.provinceId) {
      const prov = PROVINCES.find((p) => p.id === tile.provinceId);
      if (prov) openModal("province", prov);
    } else if (tile.type === "jail") {
      openModal("jail");
    } else if (tile.type === "pos") {
      openModal("pos");
    } else if (tile.type === "challenge") {
      openModal("challenge");
    } else if (tile.type === "start") {
      openModal("rules");
    }
  };

  // Dynamic font sizing based on string length to guarantee NO province name is ever cut off
  const getProvinceFontClass = (title: string) => {
    if (title.length >= 8) {
      // GORONTALO (9), BENGKULU (8)
      return "text-[4.5px] sm:text-[5.5px] md:text-[6px] tracking-tighter";
    }
    if (title.length >= 7) {
      // LAMPUNG (7), SULTENG (7), KALTARA (7), KALTENG (7), P.BARAT (7)
      return "text-[5px] sm:text-[6px] md:text-[6.5px] tracking-tighter";
    }
    if (title.length >= 6) {
      // SULBAR, SULSEL, SULTRA, KALSEL, KALTIM, KALBAR, BANTEN, MALUKU, PAPBAR, SUMBAR, SUMSEL
      return "text-[5.5px] sm:text-[6.5px] md:text-[7px] tracking-tight";
    }
    // ACEH, SUMUT, RIAU, KEPRI, JAMBI, BABEL, JABAR, JATENG, DIY, JATIM, SULUT, BALI, NTB, NTT, MALUT, PAPUA, DKI
    return "text-[6px] sm:text-[7px] md:text-[7.5px] tracking-tight";
  };

  const renderToken = (tileIndex: number) => {
    const playersOnTile = players.filter((p) => p.pos === tileIndex);
    if (playersOnTile.length === 0) return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center gap-0.5 pointer-events-none z-20">
        {playersOnTile.map((p) => (
          <motion.div
            key={p.id}
            layoutId={`player-token-${p.id}`}
            initial={{ scale: 0.5, y: -4 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full ${p.badgeBg} border border-white shadow-sm flex items-center justify-center text-[7px] sm:text-[8px] font-black text-on-primary`}
            title={`${p.name} (Pemain ${p.id})`}
          >
            {p.id}
          </motion.div>
        ))}
      </div>
    );
  };

  // Render Horizontal/Vertical tiles with zero clipping of province names
  const renderTile = (tile: TileDefinition, position: "top" | "bottom" | "left" | "right", cornerClass = "") => {
    const isCorner = tile.type !== "province";

    if (isCorner) {
      // 4 Corner Tiles (START, PENJARA, POS PERSATUAN, TANTANGAN)
      return (
        <button
          key={tile.index}
          type="button"
          onClick={() => handleTileClick(tile)}
          className={`board-tile ${tile.bgClass} border sm:border-2 ${tile.borderClass} relative flex flex-col items-center justify-between p-0.5 text-center overflow-hidden transition-transform hover:z-20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-primary ${cornerClass}`}
          title={`Petak ${tile.index}: ${tile.title}`}
        >
          {/* Top header badge */}
          <div className={`w-full ${tile.headerBg} text-[5px] sm:text-[6.5px] text-white font-black uppercase py-0.5 px-0.5 text-center leading-none tracking-tight`}>
            {tile.type === "start"
              ? "PETUALANGAN"
              : tile.type === "jail"
              ? "PENJARA"
              : tile.type === "pos"
              ? "ISLAND"
              : "DICE ZONE"}
          </div>

          {/* Center emoji icon */}
          <span className="text-[12px] sm:text-[15px] my-auto leading-none">
            {tile.icon}
          </span>

          {/* Bottom title */}
          {tile.type === "start" ? (
            <div className="flex flex-col items-center leading-none mb-0.5">
              <span className="bg-white/95 border border-[#14532d] px-1.5 py-0.2 rounded-full text-[9px] sm:text-[11px] font-black text-[#15803d]">
                GO!
              </span>
              <span className="text-[5px] sm:text-[6.5px] font-black text-[#052e16] mt-0.5">
                +Rp 50
              </span>
            </div>
          ) : (
            <span className="text-[5.5px] sm:text-[7px] font-black text-on-surface leading-tight px-0.5 mb-0.5 whitespace-nowrap">
              {tile.title}
            </span>
          )}

          {renderToken(tile.index)}
        </button>
      );
    }

    // Top and Bottom row province tiles (Vertical rectangles)
    if (position === "top" || position === "bottom") {
      return (
        <button
          key={tile.index}
          type="button"
          onClick={() => handleTileClick(tile)}
          className={`board-tile ${tile.bgClass} border sm:border-2 ${tile.borderClass} relative flex flex-col items-center justify-between p-0 text-center overflow-hidden transition-transform hover:z-20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-primary rounded-xs`}
          title={`Petak ${tile.index}: Provinsi ${tile.title}`}
        >
          {/* Top colored property ribbon with complete province name */}
          <div
            className={`w-full ${tile.headerBg} text-white font-black uppercase py-0.5 px-0.5 text-center leading-none whitespace-nowrap overflow-visible ${getProvinceFontClass(
              tile.title
            )}`}
          >
            {tile.title}
          </div>

          {/* Region emoji centered */}
          <span className="text-[11px] sm:text-[14px] my-auto leading-none">
            {tile.icon}
          </span>

          {/* Bottom empty buffer to center the emoji */}
          <div className="h-1 sm:h-1.5 w-full pointer-events-none" />

          {renderToken(tile.index)}
        </button>
      );
    }

    // Left and Right column province tiles (Horizontal rectangles)
    return (
      <button
        key={tile.index}
        type="button"
        onClick={() => handleTileClick(tile)}
        className={`board-tile ${tile.bgClass} border sm:border-2 ${tile.borderClass} relative flex flex-col items-center justify-center p-0.5 text-center overflow-hidden transition-transform hover:z-20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-primary rounded-xs`}
        title={`Petak ${tile.index}: Provinsi ${tile.title}`}
      >
        {/* Province Name at top */}
        <span
          className={`font-black text-on-surface leading-none text-center whitespace-nowrap overflow-visible ${getProvinceFontClass(
            tile.title
          )}`}
        >
          {tile.title}
        </span>

        {/* Region emoji */}
        <span className="text-[10px] sm:text-[12px] mt-0.5 leading-none">
          {tile.icon}
        </span>

        {renderToken(tile.index)}
      </button>
    );
  };

  return (
    <div
      className="relative aspect-square w-[min(94vw,calc(100vh-130px),580px)] h-[min(94vw,calc(100vh-130px),580px)] bg-[#d28242] border-3 sm:border-4 border-[#8c491e] rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 shadow-xl select-none flex flex-col justify-between overflow-hidden shrink-0 mx-auto"
      style={{
        boxShadow: "0 6px 0 0 rgb(120, 53, 15), 0 12px 18px -4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* TOP ROW: Tiles 21 to 32 (12 tiles) */}
      <div className="w-full grid grid-cols-12 gap-0.5 h-[14%]">
        {topRow.map((t, idx) =>
          renderTile(
            t,
            "top",
            idx === 0
              ? "rounded-tl-xl sm:rounded-tl-2xl"
              : idx === 11
              ? "rounded-tr-xl sm:rounded-tr-2xl"
              : ""
          )
        )}
      </div>

      {/* MIDDLE SECTION: Left Column (9 tiles) + Center Area + Right Column (9 tiles) */}
      <div className="w-full flex-1 grid grid-cols-12 gap-0.5 my-0.5 min-h-0">
        {/* Left Column (Tiles 20 down to 12) */}
        <div className="col-span-1 grid grid-rows-9 gap-0.5">
          {leftCol.map((t) => renderTile(t, "left"))}
        </div>

        {/* BOARD CENTER INTERIOR: Cheerful Green Checked Picnic Mat */}
        <div
          className="col-span-10 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col items-center justify-between relative overflow-hidden border-2 border-[#22834b]"
          style={{
            backgroundColor: "#279e5a",
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 14px)",
          }}
        >
          {/* Festive Garland SVG across top */}
          <div className="absolute top-0 left-0 right-0 h-4 flex justify-around items-start pointer-events-none z-10 opacity-90">
            <svg
              className="w-full h-5"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 400 30"
              aria-hidden="true"
            >
              <path
                d="M0,5 Q100,18 200,5 Q300,18 400,5"
                stroke="#eab308"
                strokeDasharray="3,2"
                strokeWidth="1.5"
              />
              <polygon fill="#ec4899" points="20,6 32,22 44,6" />
              <polygon fill="#eab308" points="60,8 72,24 84,8" />
              <polygon fill="#06b6d4" points="100,11 112,27 124,11" />
              <polygon fill="#a855f7" points="140,11 152,27 164,11" />
              <polygon fill="#ef4444" points="180,8 192,24 204,8" />
              <polygon fill="#84cc16" points="220,7 232,23 244,7" />
              <polygon fill="#ec4899" points="260,11 272,27 284,11" />
              <polygon fill="#eab308" points="300,10 312,26 324,10" />
              <polygon fill="#06b6d4" points="340,7 352,23 364,7" />
              <polygon fill="#a855f7" points="375,5 385,20 395,5" />
            </svg>
          </div>

          {/* Hot Air Balloon + Puffy Clouds (Top-Left) */}
          <div className="absolute top-1 left-1.5 pointer-events-none flex flex-col items-center opacity-90 scale-60 sm:scale-75">
            <div
              className="w-7 h-9 rounded-t-full rounded-b-xl border border-amber-800 shadow-sm flex overflow-hidden"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #f97316 0, #f97316 5px, #facc15 5px, #facc15 10px, #ef4444 10px, #ef4444 15px)",
              }}
            />
            <div className="w-2.5 h-1.5 bg-[#78350f] rounded-xs -mt-0.5 border border-black/30" />
            <div className="flex -space-x-1 -mt-0.5 text-[9px]">
              <span>☁️</span>
              <span>☁️</span>
            </div>
          </div>

          {/* Floating Pair of Illustrated 3D Dice (Top-Right) */}
          <div className="absolute top-1.5 right-2 pointer-events-none flex items-center -space-x-1.5 rotate-12 drop-shadow-md scale-65 sm:scale-80">
            <div className="w-5 h-5 bg-white border border-[#1e293b] rounded-md shadow-sm flex items-center justify-center font-black text-[9px] text-[#0f172a]">
              ⚄
            </div>
            <div className="w-4.5 h-4.5 bg-[#fef08a] border border-[#854d0e] rounded-md shadow-sm flex items-center justify-center font-black text-[8px] text-[#854d0e] -rotate-12">
              ⚂
            </div>
          </div>

          {/* Center Title Badge: Monopindo Gotong Royong */}
          <div className="flex flex-col items-center text-center z-10 mt-1.5 sm:mt-2">
            <div className="relative px-3 py-0.5 sm:px-4 sm:py-1 rounded-full bg-[#fde047] border-2 sm:border-3 border-[#ca8a04] shadow-[0_3px_0_0_#854d0e] transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
              <h2 className="text-[11px] sm:text-[14px] md:text-[16px] font-black tracking-wider text-[#9a3412] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                Monopindo
              </h2>
              <div className="text-[6.5px] sm:text-[8px] font-black text-[#15803d] tracking-widest -mt-0.5 italic flex items-center justify-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#ca8a04]" />
                <span>Gotong Royong Khas Daerah</span>
              </div>
            </div>
          </div>

          {/* Illustrated Diagonal White Ladder spanning across center */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
            <div
              className="w-[110%] h-6 sm:h-7 border-y-2 border-white/90 bg-white/20 flex justify-between items-center px-4 transform -rotate-12 shadow-sm"
              style={{ backdropFilter: "blur(0.5px)" }}
            >
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-full bg-white/90 shadow-xs" />
              ))}
            </div>
            {/* Directional Ladder Arrow */}
            <div className="absolute right-6 sm:right-10 top-[46%] transform -rotate-12 bg-[#facc15] border border-[#854d0e] px-1 py-0.2 rounded text-[7px] font-black text-[#854d0e] shadow-sm flex items-center gap-0.5">
              <span>⬅️</span>
              <span className="text-[6.5px]">NAIK</span>
            </div>
          </div>

          {/* Interactive Arcade Dice Roll Center */}
          <Dice3D onRoll={rollDice} disabled={isRolling} />

          {/* Lower Center Visuals: Traditional Food Cards + Live Announcement Banner */}
          <div className="w-full flex items-end justify-between px-1 pb-0.5 z-10">
            {/* Traditional village house (Left) */}
            <div className="hidden sm:flex items-center gap-0.5 opacity-90 text-sm">
              <span>🌲</span>
              <span>🏡</span>
            </div>

            {/* Center Illustrated Twin Cards (Serabi & Kolak) */}
            <div className="flex items-center justify-center -space-x-1.5 drop-shadow-md">
              {/* Card 1: Serabi Khas */}
              <div
                className="w-11 sm:w-14 bg-[#fdf2f8] border border-[#f43f5e] rounded-lg p-0.5 flex flex-col items-center text-center shadow-xs transform -rotate-6 hover:rotate-0 transition-transform"
                style={{
                  backgroundImage: "radial-gradient(#fbcfe8 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              >
                <span className="text-[5px] sm:text-[6px] font-black text-[#9d174d] bg-[#fbcfe8] px-1 rounded-full uppercase">
                  serabi
                </span>
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#fde047] border border-[#b45309] flex items-center justify-center my-0.5 text-xs shadow-inner">
                  🥞
                </div>
                <span className="text-[5px] sm:text-[6px] font-bold text-[#831843] leading-tight">
                  Khas Tradisi
                </span>
              </div>

              {/* Card 2: Modifikasi Kolak Pisang */}
              <div
                className="w-11 sm:w-14 bg-[#fffbeb] border border-[#ea580c] rounded-lg p-0.5 flex flex-col items-center text-center shadow-xs transform rotate-6 hover:rotate-0 transition-transform"
                style={{
                  backgroundImage: "radial-gradient(#fed7aa 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              >
                <span className="text-[5px] sm:text-[6px] font-black text-[#9a3412] bg-[#fde68a] px-1 rounded-full uppercase">
                  modifikasi
                </span>
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#fed7aa] border border-[#ea580c] flex items-center justify-center my-0.5 text-xs shadow-inner">
                  🍌
                </div>
                <span className="text-[5px] sm:text-[6px] font-bold text-[#9a3412] leading-tight">
                  Nusantara
                </span>
              </div>
            </div>

            {/* Live Feed Banner (Right) */}
            <div className="hidden sm:flex items-center gap-1 bg-[#fef08a] border border-[#ca8a04] px-1.5 py-0.5 rounded-md shadow text-[#713f12] text-[8.5px] font-bold max-w-[120px] sm:max-w-[150px] truncate">
              <Megaphone className="w-3 h-3 text-[#ca8a04] shrink-0" />
              <span className="truncate">
                {activityLogs[0]?.text || "Lempar dadu!"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Tiles 33 down to 41) */}
        <div className="col-span-1 grid grid-rows-9 gap-0.5">
          {rightCol.map((t) => renderTile(t, "right"))}
        </div>
      </div>

      {/* BOTTOM ROW: Tiles 11 down to 0 (12 tiles) */}
      <div className="w-full grid grid-cols-12 gap-0.5 h-[14%]">
        {bottomRow.map((t, idx) =>
          renderTile(
            t,
            "bottom",
            idx === 0
              ? "rounded-bl-xl sm:rounded-bl-2xl"
              : idx === 11
              ? "rounded-br-xl sm:rounded-br-2xl"
              : ""
          )
        )}
      </div>
    </div>
  );
};
