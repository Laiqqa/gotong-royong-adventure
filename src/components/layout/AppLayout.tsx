"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { view } = useGame();
  const isCover = view === "cover";

  return (
    <>
      <Header />
      <main className={`flex-1 w-full flex flex-col ${isCover ? "" : "pt-14 sm:pt-16"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

