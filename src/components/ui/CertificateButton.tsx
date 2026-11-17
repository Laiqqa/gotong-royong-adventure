"use client";

import React, { useState } from "react";
import { Award, Download } from "lucide-react";
import { Player } from "@/types/game";

interface CertificateButtonProps {
  winner: Player;
}

export const CertificateButton: React.FC<CertificateButtonProps> = ({ winner }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCertificate = () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 850;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Parchment Background
      ctx.fillStyle = "#fffdf5";
      ctx.fillRect(0, 0, 1200, 850);

      // Subtle background radial warmth
      const grad = ctx.createRadialGradient(600, 425, 100, 600, 425, 650);
      grad.addColorStop(0, "rgba(254, 240, 138, 0.16)");
      grad.addColorStop(1, "rgba(0, 105, 72, 0.04)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 850);

      // 2. Outer Emerald Frame
      ctx.strokeStyle = "#006948";
      ctx.lineWidth = 24;
      ctx.strokeRect(24, 24, 1152, 802);

      // 3. Inner Gold Frame
      ctx.strokeStyle = "#ca8a04";
      ctx.lineWidth = 4;
      ctx.strokeRect(48, 48, 1104, 754);

      // Corner Gold Accents
      const corners = [
        [48, 48],
        [1152, 48],
        [48, 802],
        [1152, 802],
      ];
      ctx.fillStyle = "#fea619";
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Indonesian Flag Ribbon at Top Center
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(540, 82, 120, 16);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(540, 98, 120, 16);
      ctx.strokeStyle = "#ca8a04";
      ctx.lineWidth = 2;
      ctx.strokeRect(540, 82, 120, 32);

      // 5. Header Text
      ctx.textAlign = "center";
      ctx.fillStyle = "#855300";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("GOTONG ROYONG ADVENTURE • PROFIL PELAJAR PANCASILA", 600, 152);

      // 6. Main Certificate Title
      ctx.fillStyle = "#006948";
      ctx.font = "900 58px sans-serif";
      ctx.fillText("PIAGAM PENGHARGAAN", 600, 224);

      // Gold Divider
      ctx.fillStyle = "#fea619";
      ctx.fillRect(420, 244, 360, 4);

      // 7. Subtitle
      ctx.fillStyle = "#4b5563";
      ctx.font = "600 22px sans-serif";
      ctx.fillText("Diberikan dengan penuh kebanggaan kepada:", 600, 296);

      // 8. Winner Name
      ctx.fillStyle = "#0d1c2e";
      ctx.font = "900 54px sans-serif";
      ctx.fillText(winner.name.toUpperCase(), 600, 372);

      // Name Underline
      ctx.strokeStyle = "#006948";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(320, 392);
      ctx.lineTo(880, 392);
      ctx.stroke();

      // 9. Predikat Badge
      ctx.fillStyle = "#006948";
      ctx.beginPath();
      ctx.roundRect(380, 420, 440, 48, 24);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "800 22px sans-serif";
      ctx.fillText("DUTA GOTONG ROYONG NUSANTARA", 600, 452);

      // 10. Achievement Description
      ctx.fillStyle = "#374151";
      ctx.font = "500 21px sans-serif";
      ctx.fillText(
        "Atas keberhasilan menjelajahi keragaman budaya Nusantara serta meraih prestasi terbaik",
        600,
        516
      );
      ctx.fillText(
        "dalam permainan edukatif Gotong Royong Adventure dengan capaian:",
        600,
        548
      );

      // Stats Box
      ctx.fillStyle = "#eff4ff";
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(230, 576, 740, 80, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#006948";
      ctx.font = "900 26px sans-serif";
      ctx.fillText(`${winner.points} Poin Persatuan`, 360, 625);
      ctx.fillText(`${winner.unlockedProv} Provinsi Terbuka`, 600, 625);
      ctx.fillText(`Kas Rp ${winner.money}`, 840, 625);

      // 11. Date & Seal Footer
      const dateStr = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      ctx.textAlign = "left";
      ctx.fillStyle = "#4b5563";
      ctx.font = "600 18px sans-serif";
      ctx.fillText(`Diterbitkan pada: ${dateStr}`, 110, 730);
      ctx.fillStyle = "#006948";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("Bhinneka Tunggal Ika • Sila ke-3 Pancasila", 110, 760);

      // Gold Seal Medal on Bottom Right
      ctx.save();
      ctx.translate(1010, 725);
      ctx.fillStyle = "#fea619";
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#855300";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#fffdf5";
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.textAlign = "center";
      ctx.fillStyle = "#855300";
      ctx.font = "900 14px sans-serif";
      ctx.fillText("TERVERIFIKASI", 0, -4);
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("NUSANTARA", 0, 14);
      ctx.restore();

      // Trigger PNG Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = winner.name.replace(/[^a-zA-Z0-9_-]/g, "_");
      link.download = `Piagam-Gotong-Royong-${safeName}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownloadCertificate}
      disabled={downloading}
      className="px-5 py-2.5 bg-secondary text-on-secondary rounded-full font-extrabold text-xs sm:text-sm shadow-tactile-secondary hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-70"
    >
      {downloading ? (
        <Award className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      <span>{downloading ? "Menyiapkan Piagam..." : "Unduh Piagam Pemenang (PNG)"}</span>
    </button>
  );
};

