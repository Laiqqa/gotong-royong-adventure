"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Volume2, VolumeX, Play, Pause, ChevronUp, ChevronDown, Radio } from "lucide-react";
import { useGame } from "@/context/GameContext";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
      };
    };
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  isMuted: () => boolean;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
}

export const BackgroundMusic: React.FC = () => {
  const { bgmPlaying, bgmVolume, toggleBgm, setBgmVolume, setBgmPlaying } = useGame();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [activeSource, setActiveSource] = useState<"youtube" | "local" | "synth">("youtube");

  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthLoopRef = useRef<NodeJS.Timeout | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);

  // YouTube video ID for "Cublak Cublak Suweng | Lagu Daerah Jawa Tengah | Budaya Indonesia | Dongeng Kita / Dongeng Kids"
  const YOUTUBE_VIDEO_ID = "Qmu4ygwS2SI";

  // Synthesize Cublak-Cublak Suweng traditional melody as reliable offline/adblock fallback
  const playSynthMelody = useCallback(() => {
    if (typeof window === "undefined" || !bgmPlaying) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Slendro Scale frequencies (Ji, Ro, Lu, Mo, Nem)
      const C4 = 261.63;
      const D4 = 293.66;
      const E4 = 329.63;
      const G4 = 392.0;
      const A4 = 440.0;
      const C5 = 523.25;

      // Note sequences for Cublak-Cublak Suweng
      const notes: { pitch: number; dur: number }[] = [
        // "Cublak cublak suweng"
        { pitch: C4, dur: 0.28 },
        { pitch: C4, dur: 0.28 },
        { pitch: C4, dur: 0.28 },
        { pitch: D4, dur: 0.28 },
        { pitch: E4, dur: 0.4 },
        { pitch: C4, dur: 0.45 },
        // "Suwenge ting gelenter"
        { pitch: E4, dur: 0.28 },
        { pitch: E4, dur: 0.28 },
        { pitch: G4, dur: 0.35 },
        { pitch: E4, dur: 0.28 },
        { pitch: D4, dur: 0.28 },
        { pitch: C4, dur: 0.28 },
        { pitch: D4, dur: 0.45 },
        // "Mambu ketundhung gudel"
        { pitch: E4, dur: 0.28 },
        { pitch: E4, dur: 0.28 },
        { pitch: G4, dur: 0.35 },
        { pitch: E4, dur: 0.28 },
        { pitch: D4, dur: 0.28 },
        { pitch: C4, dur: 0.28 },
        { pitch: D4, dur: 0.45 },
        // "Pak empong lera-lere"
        { pitch: C4, dur: 0.28 },
        { pitch: D4, dur: 0.28 },
        { pitch: E4, dur: 0.35 },
        { pitch: C4, dur: 0.28 },
        { pitch: D4, dur: 0.28 },
        { pitch: E4, dur: 0.45 },
        // "Sapa ngguyu ndhelikkake"
        { pitch: E4, dur: 0.28 },
        { pitch: D4, dur: 0.28 },
        { pitch: C4, dur: 0.28 },
        { pitch: D4, dur: 0.28 },
        { pitch: E4, dur: 0.35 },
        { pitch: D4, dur: 0.28 },
        { pitch: C4, dur: 0.45 },
        // "Sir-sir pong dhele kopong"
        { pitch: C4, dur: 0.22 },
        { pitch: C4, dur: 0.22 },
        { pitch: C4, dur: 0.22 },
        { pitch: D4, dur: 0.25 },
        { pitch: E4, dur: 0.3 },
        { pitch: D4, dur: 0.25 },
        { pitch: C4, dur: 0.5 },
        // "Sir-sir pong dhele kopong"
        { pitch: C4, dur: 0.22 },
        { pitch: C4, dur: 0.22 },
        { pitch: C4, dur: 0.22 },
        { pitch: D4, dur: 0.25 },
        { pitch: E4, dur: 0.3 },
        { pitch: D4, dur: 0.25 },
        { pitch: C4, dur: 0.6 },
      ];

      let startTime = ctx.currentTime + 0.1;
      const masterVol = (bgmVolume / 100) * 0.08;

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Gamelan chime timbre (sine + triangle harmonic richness)
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.pitch, startTime);

        gain.gain.setValueAtTime(masterVol, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + n.dur);

        startTime += n.dur;
      });

      // Schedule next loop
      const totalDurMs = (startTime - ctx.currentTime) * 1000 + 400;
      synthLoopRef.current = setTimeout(() => {
        if (bgmPlaying && activeSource === "synth") {
          playSynthMelody();
        }
      }, totalDurMs);
    } catch {
      // AudioContext unavailable
    }
  }, [bgmPlaying, bgmVolume, activeSource]);

  // Stop synthesizer playback
  const stopSynthMelody = () => {
    if (synthLoopRef.current) {
      clearTimeout(synthLoopRef.current);
      synthLoopRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state === "running") {
      synthCtxRef.current.suspend().catch(() => {});
    }
  };

  // Check if a local MP3 file exists in public/audio/cublak-cublak-suweng.mp3
  useEffect(() => {
    const checkLocal = async () => {
      try {
        const res = await fetch("/audio/cublak-cublak-suweng.mp3", { method: "HEAD" });
        if (res.ok) {
          const audio = new Audio("/audio/cublak-cublak-suweng.mp3");
          audio.loop = true;
          audio.volume = bgmVolume / 100;
          localAudioRef.current = audio;
          setActiveSource("local");
        }
      } catch {
        // Local file not present, YouTube remains default
      }
    };
    checkLocal();
  }, [bgmVolume]);

  // Initialize YouTube Iframe API
  useEffect(() => {
    if (activeSource === "local") return;

    // Load YouTube API script if not present
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        ytPlayerRef.current = new window.YT.Player("youtube-bgm-embed", {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(bgmVolume);
              if (bgmPlaying && hasInteracted) {
                event.target.playVideo();
              }
            },
            onStateChange: (event) => {
              // Auto-loop when video reaches the end
              if (event.data === window.YT?.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
            onError: () => {
              // Fallback to built-in gamelan melody if YouTube is blocked or fails
              setActiveSource("synth");
              if (bgmPlaying) playSynthMelody();
            },
          },
        });
      } catch {
        setActiveSource("synth");
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      try {
        ytPlayerRef.current?.destroy();
      } catch {}
    };
  }, [hasInteracted, bgmPlaying, bgmVolume, activeSource, playSynthMelody]);

  // Browser Autoplay compliance: Listen for first user click/touch anywhere on page
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      if (bgmPlaying) {
        if (activeSource === "youtube" && ytPlayerRef.current) {
          try {
            ytPlayerRef.current.playVideo();
          } catch {}
        } else if (activeSource === "local" && localAudioRef.current) {
          localAudioRef.current.play().catch(() => {});
        } else if (activeSource === "synth") {
          playSynthMelody();
        }
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [bgmPlaying, activeSource, playSynthMelody]);

  // Handle Play/Pause toggle
  useEffect(() => {
    if (bgmPlaying) {
      if (activeSource === "youtube" && ytPlayerRef.current) {
        try {
          ytPlayerRef.current.playVideo();
        } catch {}
      } else if (activeSource === "local" && localAudioRef.current) {
        localAudioRef.current.play().catch(() => {});
      } else if (activeSource === "synth") {
        playSynthMelody();
      }
    } else {
      if (activeSource === "youtube" && ytPlayerRef.current) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {}
      } else if (activeSource === "local" && localAudioRef.current) {
        localAudioRef.current.pause();
      } else if (activeSource === "synth") {
        stopSynthMelody();
      }
    }
  }, [bgmPlaying, activeSource, playSynthMelody]);

  // Handle Volume change
  useEffect(() => {
    if (activeSource === "youtube" && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(bgmVolume);
      } catch {}
    } else if (activeSource === "local" && localAudioRef.current) {
      localAudioRef.current.volume = bgmVolume / 100;
    }
  }, [bgmVolume, activeSource]);

  return (
    <>
      {/* Hidden YouTube Iframe Embed for Background Audio Streaming */}
      <div
        className="fixed -left-[9999px] -top-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <div id="youtube-bgm-embed" />
      </div>

      {/* Floating Interactive Music Player Widget */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 flex flex-col items-end">
        <AnimatePresence>
          {isExpanded ? (
            /* Expanded Card View */
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-surface-container-lowest border-2 border-primary/30 rounded-2xl p-3 sm:p-3.5 shadow-xl w-72 sm:w-80 flex flex-col gap-2.5 backdrop-blur-md"
            >
              {/* Header with thumbnail & title */}
              <div className="flex items-center justify-between gap-2 border-b border-surface-container pb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 overflow-hidden relative">
                    <Music2 className={`w-5 h-5 text-primary ${bgmPlaying ? "animate-bounce" : ""}`} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-on-surface truncate leading-tight">
                      Cublak-Cublak Suweng
                    </span>
                    <span className="text-[10px] font-bold text-secondary truncate flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 text-secondary shrink-0" />
                      <span>Dongeng Kids / Dongeng Kita</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                  title="Kecilkan Pemutar Musik"
                  aria-label="Kecilkan Pemutar Musik"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Status info */}
              <div className="flex items-center justify-between text-[10px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-lg">
                <span className="font-semibold">
                  Status: {bgmPlaying ? "Sedang Memutar 🎶" : "Jeda"}
                </span>
                <span className="font-black text-primary uppercase">
                  {activeSource === "youtube" ? "YouTube Audio" : activeSource === "local" ? "MP3 Lokal" : "Gamelan Sintesis"}
                </span>
              </div>

              {/* Player Controls (Play/Pause & Volume) */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <button
                  type="button"
                  onClick={toggleBgm}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-tactile active:translate-y-0.5 active:shadow-none focus:outline-none focus:ring-2 focus:ring-primary ${
                    bgmPlaying
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                  }`}
                  title={bgmPlaying ? "Jeda Musik" : "Putar Musik"}
                  aria-label={bgmPlaying ? "Jeda Musik" : "Putar Musik"}
                >
                  {bgmPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <div className="flex-1 flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1.5 rounded-xl border border-surface-container">
                  <button
                    type="button"
                    onClick={() => setBgmVolume(bgmVolume === 0 ? 45 : 0)}
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    title={bgmVolume === 0 ? "Bunyikan" : "Senyapkan"}
                  >
                    {bgmVolume === 0 ? (
                      <VolumeX className="w-4 h-4 text-error" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-primary" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bgmVolume}
                    onChange={(e) => setBgmVolume(Number(e.target.value))}
                    className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                    aria-label="Volume Musik Latar"
                  />
                  <span className="text-[10px] font-black text-on-surface w-6 text-right">
                    {bgmVolume}%
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Minimized Pill View */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-1 bg-surface-container-lowest/95 backdrop-blur-md border border-primary/30 rounded-full py-1 px-2.5 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Animated Equalizer Bars */}
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-1.5 cursor-pointer text-left focus:outline-none"
                title="Buka Pengaturan Musik Latar"
              >
                <div className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5 shrink-0">
                  <span
                    className={`w-0.5 bg-primary rounded-full transition-all ${
                      bgmPlaying ? "h-3 animate-pulse" : "h-1"
                    }`}
                  />
                  <span
                    className={`w-0.5 bg-secondary rounded-full transition-all ${
                      bgmPlaying ? "h-3.5 animate-bounce" : "h-1.5"
                    }`}
                  />
                  <span
                    className={`w-0.5 bg-primary rounded-full transition-all ${
                      bgmPlaying ? "h-2 animate-pulse" : "h-1"
                    }`}
                  />
                </div>

                <div className="flex flex-col pr-1">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-on-surface leading-tight">
                    Cublak-Cublak Suweng
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-secondary leading-none">
                    Dongeng Kids
                  </span>
                </div>
              </button>

              {/* Quick Play/Pause button */}
              <button
                type="button"
                onClick={toggleBgm}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  bgmPlaying
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                }`}
                title={bgmPlaying ? "Jeda Musik" : "Putar Musik"}
                aria-label={bgmPlaying ? "Jeda Musik" : "Putar Musik"}
              >
                {bgmPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.2" />}
              </button>

              {/* Expand Chevron */}
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
                title="Perluas Kontrol Musik"
                aria-label="Perluas Kontrol Musik"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

