const KEY = "senda_app_v1";

type Store = {
  answers: Record<string, any>; // exerciseId -> { fieldId: value }
  completedScreens: Record<string, boolean>; // `${exerciseId}:${screenId}` -> true
};

function loadStore(): Store {
  if (typeof window === "undefined") return { answers: {}, completedScreens: {} };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { answers: {}, completedScreens: {} };
  try {
    return JSON.parse(raw) as Store;
  } catch {
    return { answers: {}, completedScreens: {} };
  }
}

function saveStore(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}

export function getExerciseAnswers(exerciseId: string) {
  const store = loadStore();
  return store.answers[exerciseId] ?? {};
}

export function setExerciseField(exerciseId: string, fieldId: string, value: any) {
  const store = loadStore();
  store.answers[exerciseId] = { ...(store.answers[exerciseId] ?? {}), [fieldId]: value };
  saveStore(store);
}

export function markScreenDone(exerciseId: string, screenId: string) {
  const store = loadStore();
  store.completedScreens[`${exerciseId}:${screenId}`] = true;
  saveStore(store);
}

export function isScreenDone(exerciseId: string, screenId: string) {
  const store = loadStore();
  return !!store.completedScreens[`${exerciseId}:${screenId}`];
}
export function getCompletedScreensForExercise(exerciseId: string): string[] {
  if (typeof window === "undefined") return [];
  const store = loadStore();
  const prefix = `${exerciseId}:`;
  return Object.keys(store.completedScreens)
    .filter((k) => store.completedScreens[k] && k.startsWith(prefix))
    .map((k) => k.slice(prefix.length));
}
