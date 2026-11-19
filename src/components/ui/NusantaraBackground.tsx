"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";

interface NusantaraBackgroundProps {
  className?: string;
  variant?: "global" | "hero" | "section" | "subtle";
}

interface CardCornerMotifProps {
  variant?: "emerald" | "gold" | "teal";
}

/**
 * CardCornerMotif: Decorative Nusantara geometric corner watermarks and top accent line
 * to enrich large white cards and modals so they feel like bespoke board-game collector cards.
 */
export const CardCornerMotif: React.FC<CardCornerMotifProps> = ({
  variant = "emerald",
}) => {
  const strokeColor =
    variant === "gold"
      ? "#ca8a04"
      : variant === "teal"
      ? "#00628d"
      : "#006948";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden rounded-[inherit] z-0"
    >
      {/* Top thin dual heritage border strip */}
      <div
        className="absolute top-0 inset-x-0 h-1 opacity-75"
        style={{
          background:
            variant === "gold"
              ? "linear-gradient(90deg, transparent 5%, #fea619 30%, #006948 50%, #fea619 70%, transparent 95%)"
              : "linear-gradient(90deg, transparent 5%, #006948 30%, #fea619 50%, #006948 70%, transparent 95%)",
        }}
      />

      {/* Top-Right Geometric Ukiran Corner Watermark */}
      <svg
        className="absolute -top-3 -right-3 w-28 h-28 sm:w-36 sm:h-36 opacity-[0.07]"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="120" cy="0" r="90" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="120" cy="0" r="70" stroke={strokeColor} strokeWidth="1.2" />
        <circle cx="120" cy="0" r="50" stroke="#ca8a04" strokeWidth="1.5" />
        <path
          d="M 120,25 C 95,25 85,15 70,0 M 95,0 C 95,25 105,35 120,50 M 120,0 L 45,75"
          stroke={strokeColor}
          strokeWidth="1.2"
        />
        {/* Kawung Petal Accent */}
        <path
          d="M 75,25 C 65,35 65,45 75,45 C 75,35 85,35 75,25 Z"
          stroke="#ca8a04"
          strokeWidth="1.5"
        />
      </svg>

      {/* Bottom-Left Geometric Ukiran Corner Watermark */}
      <svg
        className="absolute -bottom-3 -left-3 w-28 h-28 sm:w-36 sm:h-36 opacity-[0.06] rotate-180"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="120" cy="0" r="90" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="120" cy="0" r="70" stroke={strokeColor} strokeWidth="1.2" />
        <circle cx="120" cy="0" r="50" stroke="#ca8a04" strokeWidth="1.5" />
        <path
          d="M 120,25 C 95,25 85,15 70,0 M 95,0 C 95,25 105,35 120,50"
          stroke={strokeColor}
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
};

/**
 * NusantaraBackground: 4-Layer Rich Cultural Canvas
 * 1. Multi-point soft ambient lighting (Emerald Forest, Golden Sun, Bahari Teal, Terracotta)
 * 2. Full-viewport Kawung & Songket diamond weave pattern (no edge cutoffs, 9-12% calibrated contrast)
 * 3. Cartography archipelago contour lines & 4-corner geometric Nusantara framing
 * 4. Slow-floating cultural silhouettes (Compass Rose, Gunungan, Bintang-Padi, Dice) in side margins
 */
export const NusantaraBackground: React.FC<NusantaraBackgroundProps> = ({
  className = "absolute inset-0",
  variant = "hero",
}) => {
  const uid = useId().replace(/:/g, "");
  const patternId = `nusantara-kawung-songket-${uid}`;
  const showRichFraming = variant === "global" || variant === "hero";

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* LAYER 1: 4-Point Ambient Lighting Layer */}
      <div className="absolute inset-0">
        {/* Top-Left Emerald Forest Aura */}
        <div
          className="absolute -top-24 -left-24 sm:-top-32 sm:-left-32 w-[360px] sm:w-[520px] lg:w-[660px] h-[360px] sm:h-[520px] lg:h-[660px] rounded-full bg-[#006948]/10 sm:bg-[#006948]/12 blur-[90px] sm:blur-[135px] lg:blur-[155px]"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Top-Right Golden Solar Aura */}
        <div
          className="absolute top-6 sm:top-12 -right-24 sm:-right-32 w-[340px] sm:w-[500px] lg:w-[620px] h-[340px] sm:h-[500px] lg:h-[620px] rounded-full bg-[#ca8a04]/9 sm:bg-[#f59e0b]/10 blur-[90px] sm:blur-[140px] lg:blur-[160px]"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Bottom-Left Deep Ocean Teal Glow */}
        <div
          className="absolute -bottom-28 -left-16 w-[340px] sm:w-[520px] h-[280px] sm:h-[440px] rounded-full bg-[#00628d]/8 blur-[100px] sm:blur-[145px]"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Bottom-Right Warm Terracotta / Amber Glow */}
        {showRichFraming && (
          <div
            className="absolute -bottom-24 -right-16 w-[320px] sm:w-[480px] h-[260px] sm:h-[400px] rounded-full bg-[#d97706]/8 blur-[100px] sm:blur-[140px]"
            style={{ transform: "translate3d(0, 0, 0)" }}
          />
        )}
      </div>

      {/* LAYER 2: Full-Viewport Kawung & Songket Geometric Weave (No destructive edge mask) */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            {/* Outer Songket Diamond Lattice */}
            <path
              d="M 28,0 L 56,28 L 28,56 L 0,28 Z"
              fill="none"
              stroke="#ca8a04"
              strokeWidth="0.8"
              strokeDasharray="2.5,2.5"
              opacity={variant === "subtle" ? "0.065" : "0.095"}
            />

            {/* Inner Cross-Stitch Guide */}
            <path
              d="M 0,28 L 56,28 M 28,0 L 28,56"
              fill="none"
              stroke="#006948"
              strokeWidth="0.5"
              strokeDasharray="1.5,4"
              opacity="0.05"
            />

            {/* Center Kawung Four-Petal Blossom */}
            <path
              d="M 28,7 C 22.5,17 22.5,24 28,28 C 33.5,24 33.5,17 28,7 Z
                 M 28,49 C 22.5,39 22.5,32 28,28 C 33.5,32 33.5,39 28,49 Z
                 M 7,28 C 17,22.5 24,22.5 28,28 C 24,33.5 17,33.5 7,28 Z
                 M 49,28 C 39,22.5 32,22.5 28,28 C 32,33.5 39,33.5 49,28 Z"
              fill="none"
              stroke="#006948"
              strokeWidth="1"
              opacity={variant === "subtle" ? "0.08" : "0.115"}
            />

            {/* Corner Quad-Petal Connectors for Seamless Tiling */}
            <path
              d="M 0,7 C 2.5,14 2.5,19 0,28 C -2.5,19 -2.5,14 0,7 Z
                 M 56,7 C 58.5,14 58.5,19 56,28 C 53.5,19 53.5,14 56,7 Z
                 M 7,0 C 14,2.5 19,2.5 28,0 C 19,-2.5 14,-2.5 7,0 Z
                 M 7,56 C 14,58.5 19,58.5 28,56 C 19,53.5 14,53.5 7,56 Z"
              fill="none"
              stroke="#ca8a04"
              strokeWidth="0.85"
              opacity={variant === "subtle" ? "0.06" : "0.085"}
            />

            {/* Micro Center & Corner Rosette Nodes */}
            <circle cx="28" cy="28" r="1.6" fill="#006948" opacity="0.14" />
            <circle cx="0" cy="0" r="1.5" fill="#ca8a04" opacity="0.12" />
            <circle cx="56" cy="0" r="1.5" fill="#ca8a04" opacity="0.12" />
            <circle cx="0" cy="56" r="1.5" fill="#ca8a04" opacity="0.12" />
            <circle cx="56" cy="56" r="1.5" fill="#ca8a04" opacity="0.12" />
            <circle cx="28" cy="0" r="1" fill="#006948" opacity="0.1" />
            <circle cx="0" cy="28" r="1" fill="#006948" opacity="0.1" />
            <circle cx="56" cy="28" r="1" fill="#006948" opacity="0.1" />
            <circle cx="28" cy="56" r="1" fill="#006948" opacity="0.1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* LAYER 3: Cartography Topographic Contour Lines & 4-Corner Nusantara Framing */}
      {showRichFraming && (
        <>
          {/* Archipelago Topographic Map Contours */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.075]"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top-Left to Bottom-Right Sweeping Explorer Map Contours */}
            <path
              d="M -100,180 C 180,120 340,280 620,220 C 900,160 1120,40 1540,140"
              stroke="#006948"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
            <path
              d="M -100,230 C 200,170 360,330 640,270 C 920,210 1140,90 1540,190"
              stroke="#ca8a04"
              strokeWidth="1"
            />
            <path
              d="M -100,720 C 240,640 480,820 780,710 C 1080,600 1240,750 1540,660"
              stroke="#006948"
              strokeWidth="1.5"
            />
            <path
              d="M -100,765 C 260,685 500,865 800,755 C 1100,645 1260,795 1540,705"
              stroke="#00628d"
              strokeWidth="1.2"
              strokeDasharray="6 6"
            />
            {/* Topographic Island Elevation Rings (Left & Right Side Gutters) */}
            <ellipse
              cx="110"
              cy="460"
              rx="150"
              ry="95"
              transform="rotate(-18 110 460)"
              stroke="#006948"
              strokeWidth="1.2"
            />
            <ellipse
              cx="110"
              cy="460"
              rx="105"
              ry="62"
              transform="rotate(-18 110 460)"
              stroke="#ca8a04"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <ellipse
              cx="1330"
              cy="440"
              rx="165"
              ry="100"
              transform="rotate(15 1330 440)"
              stroke="#00628d"
              strokeWidth="1.2"
            />
            <ellipse
              cx="1330"
              cy="440"
              rx="115"
              ry="68"
              transform="rotate(15 1330 440)"
              stroke="#ca8a04"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
          </svg>

          {/* 4-Corner Architectural Nusantara Ornaments */}
          {/* Top-Left Corner Frame */}
          <svg
            className="hidden sm:block absolute top-14 left-2 w-28 h-28 lg:w-36 lg:h-36 opacity-[0.11]"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path d="M 8,45 L 8,8 L 45,8" stroke="#006948" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 16,35 L 16,16 L 35,16" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="8" r="3" fill="#ca8a04" />
            <path
              d="M 24,24 C 36,20 44,28 38,38 C 28,44 20,36 24,24 Z"
              stroke="#006948"
              strokeWidth="1.3"
            />
          </svg>

          {/* Top-Right Corner Frame */}
          <svg
            className="hidden sm:block absolute top-14 right-2 w-28 h-28 lg:w-36 lg:h-36 opacity-[0.11]"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path d="M 112,45 L 112,8 L 75,8" stroke="#006948" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 104,35 L 104,16 L 85,16" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="112" cy="8" r="3" fill="#ca8a04" />
            <path
              d="M 96,24 C 84,20 76,28 82,38 C 92,44 100,36 96,24 Z"
              stroke="#006948"
              strokeWidth="1.3"
            />
          </svg>

          {/* Bottom-Left Corner Frame */}
          <svg
            className="hidden sm:block absolute bottom-4 left-2 w-28 h-28 lg:w-36 lg:h-36 opacity-[0.11]"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path d="M 8,75 L 8,112 L 45,112" stroke="#006948" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 16,85 L 16,104 L 35,104" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="112" r="3" fill="#ca8a04" />
          </svg>

          {/* Bottom-Right Corner Frame */}
          <svg
            className="hidden sm:block absolute bottom-4 right-2 w-28 h-28 lg:w-36 lg:h-36 opacity-[0.11]"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path d="M 112,75 L 112,112 L 75,112" stroke="#006948" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 104,85 L 104,104 L 85,104" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="112" cy="112" r="3" fill="#ca8a04" />
          </svg>
        </>
      )}

      {/* LAYER 4: Ambient Floating Cultural Watermarks in Left & Right Side Gutters */}
      {showRichFraming && (
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {/* 1. Top-Left Gutter: Kompas Penjelajah Nusantara (Compass Rose) */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[20%] left-[3%] xl:left-[4.5%] w-24 h-24 xl:w-28 xl:h-28 opacity-[0.095]"
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="44" stroke="#006948" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="34" stroke="#ca8a04" strokeWidth="1.2" />
              {/* 4-Point Compass Star */}
              <path
                d="M 50,8 L 58,42 L 92,50 L 58,58 L 50,92 L 42,58 L 8,50 L 42,42 Z"
                stroke="#006948"
                strokeWidth="1.5"
                fill="#006948"
                fillOpacity="0.08"
              />
              {/* Diagonal Points */}
              <path
                d="M 50,24 L 54,46 L 76,50 L 54,54 L 50,76 L 46,54 L 24,50 L 46,46 Z"
                transform="rotate(45 50 50)"
                stroke="#ca8a04"
                strokeWidth="1.2"
              />
              <circle cx="50" cy="50" r="5" fill="#ca8a04" />
            </svg>
          </motion.div>

          {/* 2. Top-Right Gutter: Gunungan Wayang / Pohon Hayat Geometris */}
          <motion.div
            animate={{
              y: [0, 12, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-[22%] right-[3%] xl:right-[4.5%] w-24 h-28 xl:w-28 xl:h-32 opacity-[0.09]"
          >
            <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Gunungan Silhouette Outline */}
              <path
                d="M 50,8 C 68,36 90,56 86,84 C 83,102 68,112 50,112 C 32,112 17,102 14,84 C 10,56 32,36 50,8 Z"
                stroke="#006948"
                strokeWidth="1.6"
                fill="#ca8a04"
                fillOpacity="0.06"
              />
              <path
                d="M 50,20 C 62,42 78,58 75,82 C 72,96 62,104 50,104 C 38,104 28,96 25,82 C 22,58 38,42 50,20 Z"
                stroke="#ca8a04"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              {/* Central Tree of Life Axis */}
              <line x1="50" y1="24" x2="50" y2="104" stroke="#006948" strokeWidth="1.5" />
              <path
                d="M 50,50 C 38,44 32,52 38,60 M 50,50 C 62,44 68,52 62,60 M 50,72 C 36,66 30,74 36,82 M 50,72 C 64,66 70,74 64,82"
                stroke="#006948"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* 3. Bottom-Left Gutter: Lambang Bintang & Lingkar Persatuan Pancasila */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -6, 6, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute bottom-[16%] left-[3.5%] xl:left-[5%] w-24 h-24 opacity-[0.09]"
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="32" stroke="#006948" strokeWidth="1.2" strokeDasharray="4 3" />
              {/* 5-Point Pancasila Unity Star */}
              <polygon
                points="50,22 57,40 76,40 61,52 66,70 50,59 34,70 39,52 24,40 43,40"
                stroke="#ca8a04"
                strokeWidth="1.5"
                fill="#ca8a04"
                fillOpacity="0.1"
              />
            </svg>
          </motion.div>

          {/* 4. Bottom-Right Gutter: Dadu & Pion Papan Permainan */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[18%] right-[3.5%] xl:right-[5%] w-24 h-24 opacity-[0.09]"
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Isometric 3D Dice Outline */}
              <polygon
                points="50,15 82,32 82,68 50,85 18,68 18,32"
                stroke="#00628d"
                strokeWidth="1.6"
                fill="#00628d"
                fillOpacity="0.06"
              />
              <polyline points="18,32 50,49 82,32" stroke="#00628d" strokeWidth="1.4" />
              <line x1="50" y1="49" x2="50" y2="85" stroke="#00628d" strokeWidth="1.4" />
              {/* Dice Pips */}
              <circle cx="50" cy="32" r="3" fill="#ca8a04" />
              <circle cx="34" cy="54" r="2.5" fill="#006948" />
              <circle cx="34" cy="66" r="2.5" fill="#006948" />
              <circle cx="62" cy="52" r="2.5" fill="#ca8a04" />
              <circle cx="70" cy="60" r="2.5" fill="#ca8a04" />
              <circle cx="62" cy="68" r="2.5" fill="#ca8a04" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
};
