import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { ProvinceModal } from "@/components/modals/ProvinceModal";
import { ChallengeModal } from "@/components/modals/ChallengeModal";
import { JailModal } from "@/components/modals/JailModal";
import { PosPersatuanModal } from "@/components/modals/PosPersatuanModal";
import { RulesModal } from "@/components/modals/RulesModal";
import { UnityModal } from "@/components/modals/UnityModal";
import { BackgroundMusic } from "@/components/audio/BackgroundMusic";

export const metadata: Metadata = {
  title: "Gotong Royong Adventure - Board Game Pendidikan Pancasila",
  description:
    "Permainan papan edukasi multipemain mengenalkan tradisi dan filosofi gotong royong 38 provinsi di Indonesia berlandaskan nilai-nilai luhur Pancasila.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#006948",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-background font-sans text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        <GameProvider>
          <Header />
          <main className="flex-1 w-full pt-14 sm:pt-16 flex flex-col">{children}</main>
          <Footer />

          {/* Modals & Notifications */}
          <ProvinceModal />
          <ChallengeModal />
          <JailModal />
          <PosPersatuanModal />
          <RulesModal />
          <UnityModal />
          <ToastContainer />
          <BackgroundMusic />
        </GameProvider>
      </body>
    </html>
  );
}

