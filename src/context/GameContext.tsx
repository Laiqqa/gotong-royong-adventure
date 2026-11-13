"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import confetti from "canvas-confetti";
import { GameView, Player, Province, ActivityLog, ToastMessage } from "@/types/game";
import { INITIAL_PLAYERS, MAX_ROUNDS, TOTAL_TILES, PASS_START_MONEY, PASS_START_POINTS, LAND_START_POINTS, BOARD_TILES } from "@/data/constants";
import { PROVINCES } from "@/data/provinces";

interface GameContextType {
  view: GameView;
  setView: (view: GameView) => void;
  activePlayerCount: number;
  setActivePlayerCount: (count: number) => void;
  players: Player[];
  updatePlayerName: (id: number, name: string) => void;
  currentTurnIndex: number;
  currentRound: number;
  isRolling: boolean;
  diceValue: number;
  dicePhase: "idle" | "rolling" | "result" | "moving";
  isLandingTurn: boolean;
  endTurn: () => void;
  activePlayer: Player;
  activityLogs: ActivityLog[];
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  logActivity: (text: string, icon?: string) => void;
  activeModal: "rules" | "province" | "challenge" | "jail" | "pos" | "unity" | null;
  selectedProvince: Province | null;
  openModal: (modal: "rules" | "province" | "challenge" | "jail" | "pos" | "unity", prov?: Province, isLanding?: boolean) => void;
  closeModal: () => void;
  startGame: () => void;
  rollDice: () => void;
  answerProvince: (correct: boolean) => void;
  finishProvinceTurn: () => void;
  answerQuiz: (correct: boolean) => void;
  jailPayFine: () => boolean;
  jailVerify: (inputString: string) => boolean;
  claimPosBonus: () => void;
  restartGame: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  bgmPlaying: boolean;
  bgmVolume: number;
  toggleBgm: () => void;
  setBgmVolume: (volume: number) => void;
  setBgmPlaying: (playing: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<GameView>("landing");
  const [activePlayerCount, setActivePlayerCount] = useState<number>(2);
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS.slice(0, 2));
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [dicePhase, setDicePhase] = useState<"idle" | "rolling" | "result" | "moving">("idle");
  const [isLandingTurn, setIsLandingTurn] = useState<boolean>(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "init",
      text: "Selamat datang di Gotong Royong Adventure! Silakan mulai petualangan.",
      icon: "flag",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeModal, setActiveModal] = useState<"rules" | "province" | "challenge" | "jail" | "pos" | "unity" | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bgmPlaying, setBgmPlaying] = useState<boolean>(true);
  const [bgmVolume, setBgmVolume] = useState<number>(45);

  const toggleBgm = () => {
    setBgmPlaying((prev) => !prev);
  };

  // Play audio tone (synthesized Web Audio API so no external assets fail)
  const playTone = useCallback((freq = 440, type: OscillatorType = "sine", duration = 0.15) => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext muted or blocked by browser policy
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const showToast = useCallback((message: string, type: ToastMessage["type"] = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    if (type === "success") playTone(587.33, "triangle", 0.2);
    else if (type === "warning") playTone(329.63, "square", 0.15);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, [playTone]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logActivity = useCallback((text: string, icon = "info") => {
    const entry: ActivityLog = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      icon,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setActivityLogs((prev) => [entry, ...prev.slice(0, 30)]);
  }, []);

  const openModal = (
    modal: "rules" | "province" | "challenge" | "jail" | "pos" | "unity",
    prov?: Province,
    isLanding = false
  ) => {
    if (prov) setSelectedProvince(prov);
    setIsLandingTurn(isLanding);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsLandingTurn(false);
  };

  const updatePlayerName = (id: number, name: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  // Adjust active players on count change
  useEffect(() => {
    setPlayers((prev) => {
      const updated: Player[] = [];
      for (let i = 0; i < activePlayerCount; i++) {
        const existing = prev.find((p) => p.id === i + 1);
        if (existing) {
          updated.push(existing);
        } else {
          updated.push({ ...INITIAL_PLAYERS[i] });
        }
      }
      return updated;
    });
  }, [activePlayerCount]);

  const startGame = () => {
    const freshPlayers = players.map((p) => ({
      ...p,
      pos: 0,
      points: 0,
      money: 200,
      inJail: false,
      unlockedProv: 0,
    }));
    setPlayers(freshPlayers);
    setCurrentTurnIndex(0);
    setCurrentRound(1);
    setBgmPlaying(true);
    setView("board");
    showToast(`Petualangan resmi dimulai! Giliran pertama: ${freshPlayers[0].name}`, "success");
    logActivity(`Permainan resmi dimulai dengan ${freshPlayers.length} pemain!`, "flag");
  };

  const activePlayer = players[currentTurnIndex] || players[0];

  const endTurn = useCallback(() => {
    let nextIndex = currentTurnIndex + 1;
    let nextRound = currentRound;

    if (nextIndex >= players.length) {
      nextIndex = 0;
      nextRound += 1;
      if (nextRound > MAX_ROUNDS) {
        showToast("3 Putaran penuh Nusantara telah selesai! Membuka Papan Klasemen Pahlawan...", "success");
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {}
        setTimeout(() => setView("gameover"), 1400);
        return;
      }
      setCurrentRound(nextRound);
    }
    setCurrentTurnIndex(nextIndex);
  }, [currentTurnIndex, currentRound, players.length, showToast]);

  const handleTileAction = useCallback((player: Player) => {
    const pos = player.pos;

    // Corner 0: START
    if (pos === 0) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === player.id
            ? { ...p, money: p.money + PASS_START_MONEY, points: p.points + LAND_START_POINTS }
            : p
        )
      );
      showToast(`${player.name} mendarat tepat di START! Menikmati bonus ganda (+Rp 50, +15 Poin).`, "success");
      logActivity(`${player.name} mendarat tepat di petak START (+15 Poin).`, "flag");
      endTurn();
      return;
    }

    // Corner 11: PENJARA (Ruang Evaluasi)
    if (pos === 11) {
      setPlayers((prev) =>
        prev.map((p) => (p.id === player.id ? { ...p, inJail: true } : p))
      );
      showToast(`${player.name} masuk ke Ruang Evaluasi Kebangsaan!`, "warning");
      logActivity(`${player.name} terjebak di Ruang Evaluasi (Penjara).`, "lock");
      openModal("jail", undefined, true);
      return;
    }

    // Corner 21: POS PERSATUAN
    if (pos === 21) {
      openModal("pos", undefined, true);
      return;
    }

    // Corner 32: KARTU TANTANGAN
    if (pos === 32) {
      openModal("challenge", undefined, true);
      return;
    }

    // Province Tile
    const tileDef = BOARD_TILES.find((t) => t.index === pos);
    if (tileDef && tileDef.provinceId) {
      const prov = PROVINCES.find((pr) => pr.id === tileDef.provinceId);
      if (prov) {
        openModal("province", prov, true);
        return;
      }
    }

    endTurn();
  }, [endTurn, logActivity, showToast]);

  const rollDice = () => {
    if (isRolling || dicePhase !== "idle") return;

    if (activePlayer.inJail) {
      openModal("jail", undefined, true);
      return;
    }

    setIsRolling(true);
    setDicePhase("rolling");
    let counter = 0;
    playTone(300, "triangle", 0.05);

    const interval = setInterval(() => {
      const r = Math.floor(Math.random() * 6) + 1;
      setDiceValue(r);
      playTone(320 + r * 25, "triangle", 0.03);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalVal);
        setDicePhase("result");
        playTone(587.33, "triangle", 0.25);
        showToast(`${activePlayer.name} melempar dadu dan mendapatkan angka ${finalVal}!`, "info");
        logActivity(`${activePlayer.name} melempar dadu dan mendapatkan angka ${finalVal}.`, "casino");

        // Tampilkan angka dadu selama 1100ms sebelum pion mulai berjalan
        setTimeout(() => {
          setDicePhase("moving");
          let stepsLeft = finalVal;
          const stepInterval = setInterval(() => {
            playTone(480, "sine", 0.05);
            setPlayers((prev) => {
              const curP = prev[currentTurnIndex];
              const nextPos = (curP.pos + 1) % TOTAL_TILES;
              let addedMoney = 0;
              let addedPoints = 0;

              if (nextPos === 0 && curP.pos !== 0) {
                addedMoney = PASS_START_MONEY;
                addedPoints = PASS_START_POINTS;
                showToast(`${curP.name} melewati START! Bonus +Rp 50 & 10 Poin.`, "success");
                logActivity(`${curP.name} melewati START (+Rp 50, +10 Poin).`, "celebration");
              }

              return prev.map((p, idx) =>
                idx === currentTurnIndex
                  ? {
                      ...p,
                      pos: nextPos,
                      money: p.money + addedMoney,
                      points: p.points + addedPoints,
                    }
                  : p
              );
            });

            stepsLeft--;
            if (stepsLeft <= 0) {
              clearInterval(stepInterval);
              setDicePhase("idle");
              setIsRolling(false);
              setPlayers((currentPlayers) => {
                const landedPlayer = currentPlayers[currentTurnIndex];
                handleTileAction(landedPlayer);
                return currentPlayers;
              });
            }
          }, 280);
        }, 1100);
      }
    }, 75);
  };

  const answerProvince = (correct: boolean) => {
    setPlayers((prev) =>
      prev.map((p, idx) => {
        if (idx !== currentTurnIndex) return p;
        if (correct) {
          return {
            ...p,
            points: p.points + 20,
            money: p.money + 25,
            unlockedProv: p.unlockedProv + 1,
          };
        } else {
          return {
            ...p,
            points: Math.max(0, p.points - 5),
          };
        }
      })
    );

    if (correct) {
      playTone(587.33, "triangle", 0.2);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {}
      showToast(`Hebat! ${activePlayer.name} menguasai kuis adat ${selectedProvince?.name} (+20 Poin, +Rp 25)!`, "success");
      logActivity(`${activePlayer.name} menjawab tepat kuis tradisi ${selectedProvince?.name} (+20 Poin).`, "verified");
    } else {
      playTone(220, "sawtooth", 0.2);
      showToast(`${activePlayer.name} belum tepat menjawab (-5 Poin). Semangat belajar lagi!`, "warning");
      logActivity(`${activePlayer.name} belum tepat menjawab kuis ${selectedProvince?.name} (-5 Poin).`, "cancel");
    }
  };

  const finishProvinceTurn = () => {
    const wasLanding = isLandingTurn;
    closeModal();
    if (wasLanding) {
      endTurn();
    }
  };

  const answerQuiz = (correct: boolean) => {
    setPlayers((prev) =>
      prev.map((p, idx) => {
        if (idx !== currentTurnIndex) return p;
        if (correct) {
          return {
            ...p,
            points: p.points + 15,
            money: p.money + 15,
          };
        } else {
          return {
            ...p,
            points: Math.max(0, p.points - 3),
          };
        }
      })
    );
  };

  const jailPayFine = (): boolean => {
    if (activePlayer.money >= 50) {
      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === currentTurnIndex
            ? { ...p, money: p.money - 50, inJail: false }
            : p
        )
      );
      closeModal();
      showToast(`${activePlayer.name} membayar sumbangan kas Rp 50 dan bebas dari ruang evaluasi!`, "success");
      logActivity(`${activePlayer.name} bebas dari Penjara dengan denda Rp 50.`, "vpn_key");
      endTurn();
      return true;
    }
    showToast("Uang gotong royongmu tidak mencukupi! Selesaikan kuis 5 provinsi.", "warning");
    return false;
  };

  const jailVerify = (inputString: string): boolean => {
    const list = inputString
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    // Filter unique
    const unique = Array.from(new Set(list));

    if (unique.length >= 5) {
      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === currentTurnIndex
            ? { ...p, inJail: false, points: p.points + 10 }
            : p
        )
      );
      closeModal();
      showToast(`Luar biasa! Pengetahuan 5 provinsimu terverifikasi (+10 Poin). Bebas!`, "success");
      logActivity(`${activePlayer.name} menyebutkan 5 provinsi dan bebas (+10 Poin).`, "verified");
      endTurn();
      return true;
    }

    showToast("Harap sebutkan minimal 5 nama provinsi berbeda (pisahkan dengan koma)!", "warning");
    return false;
  };

  const claimPosBonus = () => {
    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === currentTurnIndex
          ? { ...p, points: p.points + 10, money: p.money + 10 }
          : p
      )
    );
    closeModal();
    showToast(`${activePlayer.name} mengklaim apresiasi Pos Persatuan (+10 Poin, +Rp 10)!`, "success");
    logActivity(`${activePlayer.name} mengunjungi Pos Persatuan (+10 Poin, +Rp 10).`, "diversity_3");
    endTurn();
  };

  const restartGame = () => {
    setView("setup");
  };

  return (
    <GameContext.Provider
      value={{
        view,
        setView,
        activePlayerCount,
        setActivePlayerCount,
        players,
        updatePlayerName,
        currentTurnIndex,
        currentRound,
        isRolling,
        diceValue,
        dicePhase,
        isLandingTurn,
        endTurn,
        activePlayer,
        activityLogs,
        toasts,
        removeToast,
        showToast,
        logActivity,
        activeModal,
        selectedProvince,
        openModal,
        closeModal,
        startGame,
        rollDice,
        answerProvince,
        finishProvinceTurn,
        answerQuiz,
        jailPayFine,
        jailVerify,
        claimPosBonus,
        restartGame,
        soundEnabled,
        toggleSound,
        bgmPlaying,
        bgmVolume,
        toggleBgm,
        setBgmVolume,
        setBgmPlaying,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

