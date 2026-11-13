export type GameView = 'landing' | 'setup' | 'board' | 'encyclopedia' | 'gameover';

export type Region = 'sumatera' | 'jawa' | 'kalimantan' | 'sulawesi' | 'nusatenggara' | 'papua';

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface ProvinceQuiz {
  question: string;
  options: QuizOption[];
  explain: string;
}

export interface Province {
  id: number;
  name: string;
  region: Region;
  trad1: string;
  trad2: string;
  icon: string;
  filosofiTitle?: string;
  quote?: string;
  desc?: string;
  quiz?: ProvinceQuiz;
}

export interface Quiz {
  id: number;
  q: string;
  options: QuizOption[];
  explain: string;
  sila?: string;
}

export interface Player {
  id: number;
  name: string;
  color: 'error' | 'tertiary' | 'secondary' | 'primary';
  colorHex: string;
  borderClass: string;
  badgeBg: string;
  pos: number;
  points: number;
  money: number;
  inJail: boolean;
  unlockedProv: number;
}

export interface ActivityLog {
  id: string;
  text: string;
  icon: string;
  timestamp: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

