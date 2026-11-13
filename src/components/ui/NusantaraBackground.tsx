"use client";

import React from "react";

interface NusantaraBackgroundProps {
  className?: string;
  variant?: "hero" | "section" | "subtle";
}

/**
 * NusantaraBackground: Atmospheric ambient background with dual warm/emerald lighting
 * and an ultra-subtle authentic Indonesian Kawung geometric weave pattern.
 * Designed to eliminate flatness while strictly adhering to the "Anti-Alay" rule
 * (low contrast, no chaotic particles, zero distraction from game content).
 */
export const NusantaraBackground: React.FC<NusantaraBackgroundProps> = ({
  className = "",
  variant = "hero",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* 1. Ambient Lighting Layer: Deep emerald and warm sun aura blurs */}
      <div className="absolute inset-0">
        {/* Top-Left Emerald Aura (Lambang Hutan & Kesuburan Nusantara) */}
        <div
          className="absolute -top-24 -left-24 sm:-top-32 sm:-left-32 w-[340px] sm:w-[500px] lg:w-[620px] h-[340px] sm:h-[500px] lg:h-[620px] rounded-full bg-[#006948]/8 sm:bg-[#006948]/10 blur-[90px] sm:blur-[130px] lg:blur-[150px]"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Right-Center Golden Solar Aura (Lambang Kemakmuran & Semangat Surya) */}
        <div
          className="absolute top-10 sm:top-16 -right-24 sm:-right-36 w-[320px] sm:w-[480px] lg:w-[580px] h-[320px] sm:h-[480px] lg:h-[580px] rounded-full bg-[#ca8a04]/7 sm:bg-[#f59e0b]/8 blur-[90px] sm:blur-[140px] lg:blur-[160px]"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Bottom-Center Deep Ocean Teal Glow (Lambang Bahari Kepulauan) */}
        {variant === "hero" && (
          <div
            className="absolute -bottom-36 left-1/4 w-[360px] sm:w-[550px] h-[280px] sm:h-[420px] rounded-full bg-[#00628d]/6 blur-[100px] sm:blur-[140px]"
            style={{ transform: "translate3d(0, 0, 0)" }}
          />
        )}
      </div>

      {/* 2. Geometric Cultural Weave: Authentic Indonesian Kawung Motif */}
      {/* Seamless 48x48 SVG pattern with radial mask to fade out smoothly at edges */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="nusantara-kawung-pattern"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            {/* Center Kawung Four-Petal Blossom */}
            <path
              d="M 24,6 C 20,15 20,21 24,24 C 28,21 28,15 24,6 Z
                 M 24,42 C 20,33 20,27 24,24 C 28,27 28,33 24,42 Z
                 M 6,24 C 15,20 21,20 24,24 C 21,28 15,28 6,24 Z
                 M 42,24 C 33,20 27,20 24,24 C 27,28 33,28 42,24 Z"
              fill="none"
              stroke="#006948"
              strokeWidth="0.8"
              opacity="0.055"
            />

            {/* Corner Quad-Petal Connectors (ensuring seamless repeat tiling) */}
            <path
              d="M 0,6 C 2,12 2,16 0,24 C -2,16 -2,12 0,6 Z
                 M 48,6 C 50,12 50,16 48,24 C 46,16 46,12 48,6 Z
                 M 6,0 C 12,2 16,2 24,0 C 16,-2 12,-2 6,0 Z
                 M 6,48 C 12,50 16,50 24,48 C 16,46 12,46 6,48 Z"
              fill="none"
              stroke="#ca8a04"
              strokeWidth="0.8"
              opacity="0.04"
            />

            {/* Micro Center Node Points */}
            <circle cx="24" cy="24" r="1.2" fill="#006948" opacity="0.07" />
            <circle cx="0" cy="0" r="1.2" fill="#ca8a04" opacity="0.06" />
            <circle cx="48" cy="0" r="1.2" fill="#ca8a04" opacity="0.06" />
            <circle cx="0" cy="48" r="1.2" fill="#ca8a04" opacity="0.06" />
            <circle cx="48" cy="48" r="1.2" fill="#ca8a04" opacity="0.06" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#nusantara-kawung-pattern)" />
      </svg>
    </div>
  );
};
