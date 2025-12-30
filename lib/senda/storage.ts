// lib/senda/storage.ts

import type { BonusId, SendaUnitId } from "@/content/senda";

const KEY = "senda_progress_v1";

type ProgressState = {
  units: Record<SendaUnitId, { started?: boolean; completed?: boolean }>;
  bonuses: Record<BonusId, { started?: boolean; completed?: boolean }>;
  updatedAt: number;
};

const defaultState: ProgressState = {
  units: {
    "empieza-aqui": {},
    "cuaderno-1": {},
    "cuaderno-2": {},
    "cuaderno-3": {},
    bonos: {},
  },
  bonuses: {
    dopamina: {},
    "minimalismo-mental": {},
    planificador: {},
  },
  updatedAt: Date.now(),
};

function safeParse(raw: string | null): ProgressState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    return data as ProgressState;
  } catch {
    return null;
  }
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return defaultState;
  const parsed = safeParse(localStorage.getItem(KEY));
  if (!parsed) return defaultState;

  // Merge defensivo (por si cambian ids en el futuro)
  return {
    ...defaultState,
    ...parsed,
    units: { ...defaultState.units, ...(parsed.units ?? {}) },
    bonuses: { ...defaultState.bonuses, ...(parsed.bonuses ?? {}) },
  };
}

export function saveProgress(next: ProgressState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify({ ...next, updatedAt: Date.now() }));
}

export function markUnitStarted(unitId: SendaUnitId) {
  const st = loadProgress();
  st.units[unitId] = { ...(st.units[unitId] ?? {}), started: true };
  saveProgress(st);
}

export function markUnitCompleted(unitId: SendaUnitId) {
  const st = loadProgress();
  st.units[unitId] = { ...(st.units[unitId] ?? {}), started: true, completed: true };
  saveProgress(st);
}

export function markBonusStarted(bonusId: BonusId) {
  const st = loadProgress();
  st.bonuses[bonusId] = { ...(st.bonuses[bonusId] ?? {}), started: true };
  saveProgress(st);
}

export function markBonusCompleted(bonusId: BonusId) {
  const st = loadProgress();
  st.bonuses[bonusId] = { ...(st.bonuses[bonusId] ?? {}), started: true, completed: true };
  saveProgress(st);
}

export function getUnitStatus(unitId: SendaUnitId) {
  const st = loadProgress();
  return st.units[unitId] ?? {};
}

export function getBonusStatus(bonusId: BonusId) {
  const st = loadProgress();
  return st.bonuses[bonusId] ?? {};
}
