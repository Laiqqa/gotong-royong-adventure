import { Player } from "@/types/game";

export const MAX_ROUNDS = 3;
export const START_MONEY = 200;
export const PASS_START_MONEY = 50;
export const PASS_START_POINTS = 10;
export const LAND_START_POINTS = 15;
export const TOTAL_TILES = 42;

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 1,
    name: "Siti Rahma",
    color: "error",
    colorHex: "#ba1a1a",
    borderClass: "border-error",
    badgeBg: "bg-error",
    pos: 0,
    points: 0,
    money: START_MONEY,
    inJail: false,
    unlockedProv: 0,
  },
  {
    id: 2,
    name: "Budi Santoso",
    color: "tertiary",
    colorHex: "#00628d",
    borderClass: "border-tertiary",
    badgeBg: "bg-tertiary",
    pos: 0,
    points: 0,
    money: START_MONEY,
    inJail: false,
    unlockedProv: 0,
  },
  {
    id: 3,
    name: "Wayan Gede",
    color: "secondary",
    colorHex: "#855300",
    borderClass: "border-secondary-container",
    badgeBg: "bg-secondary-container",
    pos: 0,
    points: 0,
    money: START_MONEY,
    inJail: false,
    unlockedProv: 0,
  },
  {
    id: 4,
    name: "Maria Kogoya",
    color: "primary",
    colorHex: "#006948",
    borderClass: "border-primary",
    badgeBg: "bg-primary",
    pos: 0,
    points: 0,
    money: START_MONEY,
    inJail: false,
    unlockedProv: 0,
  },
];

export interface TileDefinition {
  index: number;
  type: "start" | "jail" | "pos" | "challenge" | "province";
  title: string;
  subtitle?: string;
  icon: string;
  bgClass: string;
  borderClass: string;
  headerBg?: string;
  provinceId?: number;
}

export const BOARD_TILES: TileDefinition[] = [
  { index: 0, type: "start", title: "GO!", subtitle: "+Rp 50", icon: "🚩", bgClass: "bg-[#22c55e]", borderClass: "border-[#14532d]", headerBg: "bg-[#15803d]" },
  { index: 1, type: "province", title: "ACEH", icon: "🕌", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 1 },
  { index: 2, type: "province", title: "SUMUT", icon: "🛶", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 2 },
  { index: 3, type: "province", title: "SUMBAR", icon: "🏠", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 3 },
  { index: 4, type: "province", title: "RIAU", icon: "⛵", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 4 },
  { index: 5, type: "province", title: "KEPRI", icon: "🏝️", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 5 },
  { index: 6, type: "province", title: "JAMBI", icon: "🐅", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 6 },
  { index: 7, type: "province", title: "SUMSEL", icon: "🌉", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 7 },
  { index: 8, type: "province", title: "BENGKULU", icon: "🌺", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 8 },
  { index: 9, type: "province", title: "BABEL", icon: "🏖️", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 9 },
  { index: 10, type: "province", title: "BANTEN", icon: "🦏", bgClass: "bg-[#e0e7ff]", borderClass: "border-[#4f46e5]", headerBg: "bg-[#4f46e5]", provinceId: 10 },
  { index: 11, type: "jail", title: "PENJARA", subtitle: "EVALUASI", icon: "🔒", bgClass: "bg-[#fca5a5]", borderClass: "border-[#b91c1c]", headerBg: "bg-[#b91c1c]" },
  { index: 12, type: "province", title: "JABAR", icon: "🍵", bgClass: "bg-[#e0e7ff]", borderClass: "border-[#4f46e5]", headerBg: "bg-[#4f46e5]", provinceId: 12 },
  { index: 13, type: "province", title: "JATENG", icon: "🏛️", bgClass: "bg-[#e0e7ff]", borderClass: "border-[#4f46e5]", headerBg: "bg-[#4f46e5]", provinceId: 13 },
  { index: 14, type: "province", title: "DIY", icon: "👑", bgClass: "bg-[#fef08a]", borderClass: "border-[#ca8a04]", headerBg: "bg-[#ca8a04]", provinceId: 14 },
  { index: 15, type: "province", title: "JATIM", icon: "🌋", bgClass: "bg-[#e0e7ff]", borderClass: "border-[#4f46e5]", headerBg: "bg-[#4f46e5]", provinceId: 15 },
  { index: 16, type: "province", title: "KALBAR", icon: "🌿", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 16 },
  { index: 17, type: "province", title: "KALTENG", icon: "🛶", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 17 },
  { index: 18, type: "province", title: "KALSEL", icon: "🛶", bgClass: "bg-[#bbf7d0]", borderClass: "border-[#16a34a]", headerBg: "bg-[#16a34a]", provinceId: 18 },
  { index: 19, type: "province", title: "KALTIM", icon: "🦌", bgClass: "bg-[#bbf7d0]", borderClass: "border-[#16a34a]", headerBg: "bg-[#16a34a]", provinceId: 19 },
  { index: 20, type: "province", title: "KALTARA", icon: "🏞️", bgClass: "bg-[#bbf7d0]", borderClass: "border-[#16a34a]", headerBg: "bg-[#16a34a]", provinceId: 20 },
  { index: 21, type: "pos", title: "POS PERSATUAN", subtitle: "BONUS", icon: "🌴", bgClass: "bg-[#4ade80]", borderClass: "border-[#166534]", headerBg: "bg-[#15803d]" },
  { index: 22, type: "province", title: "SULUT", icon: "🥥", bgClass: "bg-[#fef08a]", borderClass: "border-[#ca8a04]", headerBg: "bg-[#ca8a04]", provinceId: 22 },
  { index: 23, type: "province", title: "GORONTALO", icon: "🏮", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 23 },
  { index: 24, type: "province", title: "SULTENG", icon: "🍲", bgClass: "bg-[#bbf7d0]", borderClass: "border-[#16a34a]", headerBg: "bg-[#16a34a]", provinceId: 24 },
  { index: 25, type: "province", title: "SULBAR", icon: "⛵", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 25 },
  { index: 26, type: "province", title: "SULSEL", icon: "🛖", bgClass: "bg-[#fee2e2]", borderClass: "border-[#dc2626]", headerBg: "bg-[#dc2626]", provinceId: 26 },
  { index: 27, type: "province", title: "SULTRA", icon: "🪁", bgClass: "bg-[#fef08a]", borderClass: "border-[#ca8a04]", headerBg: "bg-[#ca8a04]", provinceId: 27 },
  { index: 28, type: "province", title: "BALI", icon: "🛕", bgClass: "bg-[#f3e8ff]", borderClass: "border-[#9333ea]", headerBg: "bg-[#9333ea]", provinceId: 28 },
  { index: 29, type: "province", title: "NTB", icon: "🌾", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 29 },
  { index: 30, type: "province", title: "NTT", icon: "🐎", bgClass: "bg-[#bbf7d0]", borderClass: "border-[#16a34a]", headerBg: "bg-[#16a34a]", provinceId: 30 },
  { index: 31, type: "province", title: "MALUKU", icon: "🐚", bgClass: "bg-[#fce7f3]", borderClass: "border-[#db2777]", headerBg: "bg-[#db2777]", provinceId: 31 },
  { index: 32, type: "challenge", title: "TANTANGAN", subtitle: "KUIS", icon: "🎲", bgClass: "bg-[#facc15]", borderClass: "border-[#a16207]", headerBg: "bg-[#a16207]" },
  { index: 33, type: "province", title: "MALUT", icon: "🌋", bgClass: "bg-[#fce7f3]", borderClass: "border-[#db2777]", headerBg: "bg-[#db2777]", provinceId: 33 },
  { index: 34, type: "province", title: "PAPBAR", icon: "🕊️", bgClass: "bg-[#fce7f3]", borderClass: "border-[#db2777]", headerBg: "bg-[#db2777]", provinceId: 34 },
  { index: 35, type: "province", title: "P.BARAT", icon: "🐠", bgClass: "bg-[#fce7f3]", borderClass: "border-[#db2777]", headerBg: "bg-[#db2777]", provinceId: 35 },
  { index: 36, type: "province", title: "PAPUA", icon: "🔥", bgClass: "bg-[#fce7f3]", borderClass: "border-[#db2777]", headerBg: "bg-[#db2777]", provinceId: 36 },
  { index: 37, type: "province", title: "P.TGH", icon: "🎒", bgClass: "bg-[#fce7f3]", borderClass: "border-[#db2777]", headerBg: "bg-[#db2777]", provinceId: 37 },
  { index: 38, type: "province", title: "P.PGN", icon: "🏔️", bgClass: "bg-[#fce7f3]", borderClass: "border-[#db2777]", headerBg: "bg-[#db2777]", provinceId: 38 },
  { index: 39, type: "province", title: "P.SEL", icon: "🛶", bgClass: "bg-[#fce7f3]", borderClass: "border-[#db2777]", headerBg: "bg-[#db2777]", provinceId: 39 },
  { index: 40, type: "province", title: "LAMPUNG", icon: "🐘", bgClass: "bg-[#fed7aa]", borderClass: "border-[#ea580c]", headerBg: "bg-[#ea580c]", provinceId: 40 },
  { index: 41, type: "province", title: "DKI", icon: "🏛️", bgClass: "bg-[#e0e7ff]", borderClass: "border-[#4f46e5]", headerBg: "bg-[#4f46e5]", provinceId: 41 },
];

