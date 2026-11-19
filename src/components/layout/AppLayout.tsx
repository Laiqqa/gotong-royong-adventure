"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NusantaraBackground } from "@/components/ui/NusantaraBackground";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { view } = useGame();
  const isCover = view === "cover";

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {!isCover && <NusantaraBackground variant="global" className="fixed inset-0" />}
      <Header />
      <main className={`relative z-10 flex-1 w-full flex flex-col ${isCover ? "" : "pt-16 sm:pt-20"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
