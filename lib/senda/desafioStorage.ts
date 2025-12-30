// lib/senda/desafioStorage.ts

const KEY = "senda_desafio_28_v1";

export type DayEntry = {
  date: string; // YYYY-MM-DD
  gratitude: string;
  manifestations: string;
  selfImage: string;
  insights: string;
  reflection: string;
  checklist: Record<string, boolean>;
};

export type DesafioState = {
  startedAt: string; // YYYY-MM-DD
  days: Record<string, DayEntry>;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function emptyDay(date: string): DayEntry {
  return {
    date,
    gratitude: "",
    manifestations: "",
    selfImage: "",
    insights: "",
    reflection: "",
    checklist: {},
  };
}

export function loadDesafio(): DesafioState {
  if (typeof window === "undefined") {
    return { startedAt: todayISO(), days: {} };
  }

  const raw = localStorage.getItem(KEY);
  if (!raw) {
    return { startedAt: todayISO(), days: {} };
  }

  try {
    return JSON.parse(raw) as DesafioState;
  } catch {
    return { startedAt: todayISO(), days: {} };
  }
}

export function saveDesafio(state: DesafioState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getDay(date = todayISO()): DayEntry {
  const state = loadDesafio();
  return state.days[date] ?? emptyDay(date);
}

export function saveDay(entry: DayEntry) {
  const state = loadDesafio();
  state.days[entry.date] = entry;
  saveDesafio(state);
}

export function getDayIndex(date: string): number {
  const state = loadDesafio();
  const start = new Date(state.startedAt);
  const current = new Date(date);
  const diff = Math.floor(
    (current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff + 1; // día 1–28
}
