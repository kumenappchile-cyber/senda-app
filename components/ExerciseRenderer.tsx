"use client";

import { Exercise } from "../lib/types";
import { FieldRenderer } from "./FieldRenderer";
import { markScreenDone, getCompletedScreensForExercise } from "../lib/storage";
import { getNextExerciseId } from "../lib/program";
import { useEffect, useMemo, useState } from "react";

const CHALLENGE_START_KEY = "senda.challenge.startDate"; // YYYY-MM-DD (lo usamos para disciplina general)
const C3_COMPLETED_DAYS_KEY = "senda.c3.completedDays"; // JSON number[]
const C3_DAY_COMPLETED_AT_PREFIX = "senda.c3.day."; // + "07.completedAt" = YYYY-MM-DD

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatISODate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function parseC3Day(exerciseId: string): number | null {
  const m = /^c3-d(\d{2})$/i.exec(exerciseId);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n)) return null;
  return n;
}

function safeReadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // noop
  }
}

function ensureChallengeStartDateExists() {
  // Si alguien llega directo a un día, igual fijamos inicio hoy (disciplina coherente)
  try {
    const stored = localStorage.getItem(CHALLENGE_START_KEY);
    if (!stored) {
      localStorage.setItem(CHALLENGE_START_KEY, formatISODate(new Date()));
    }
  } catch {
    // noop
  }
}

function markC3DayCompleted(day: number) {
  ensureChallengeStartDateExists();

  const today = formatISODate(new Date());

  // 1) lista de días completados
  const arr = safeReadJSON<number[]>(C3_COMPLETED_DAYS_KEY, []);
  const set = new Set(arr.filter((x) => Number.isFinite(x)));
  set.add(day);
  const nextArr = Array.from(set).sort((a, b) => a - b);
  safeWriteJSON(C3_COMPLETED_DAYS_KEY, nextArr);

  // 2) sello por día
  try {
    localStorage.setItem(`${C3_DAY_COMPLETED_AT_PREFIX}${pad2(day)}.completedAt`, today);
  } catch {
    // noop
  }
}

export function ExerciseRenderer({ exercise }: { exercise: Exercise }) {
  const [idx, setIdx] = useState(0);
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const done = getCompletedScreensForExercise(exercise.id);
    setDoneSet(new Set(done));
    setIdx(0);
  }, [exercise.id]);

  const screen = exercise.screens[idx];
  const total = exercise.screens.length;
  const doneCount = doneSet.size;
  const isLast = idx === total - 1;

  const c3Day = useMemo(() => parseC3Day(exercise.id), [exercise.id]);

  const markCurrentScreenDone = () => {
    markScreenDone(exercise.id, screen.id);
    setDoneSet((prev) => {
      const next = new Set(prev);
      next.add(screen.id);
      return next;
    });
  };

  const finishExercise = (goToHref: string) => {
    // 1) marcar última pantalla como done (antes faltaba)
    markCurrentScreenDone();

    // 2) si es un día del cuaderno 3, marcar día completado
    if (c3Day !== null) {
      markC3DayCompleted(c3Day);
    }

    // 3) navegar
    window.location.href = goToHref;
  };

  const nextExerciseId = getNextExerciseId(exercise.id);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-2xl font-semibold">{exercise.title}</div>
        {exercise.subtitle ? (
          <div className="mt-1 text-slate-300">{exercise.subtitle}</div>
        ) : null}

        <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
          <span>
            Pantalla {idx + 1} de {total}
          </span>
          <span>
            {doneCount}/{total} completas
          </span>
        </div>

        <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-slate-200/70"
            style={{ width: `${Math.round(((idx + 1) / total) * 100)}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-4 space-y-4">
        <div className="text-lg font-semibold">{screen.title}</div>
        {screen.intro ? (
          <div className="text-sm text-slate-300">{screen.intro}</div>
        ) : null}

        <div className="space-y-5">
          {screen.fields.map((f) => (
            <FieldRenderer key={f.id} exerciseId={exercise.id} field={f} />
          ))}
        </div>
      </div>

      {/* CONTROLES */}
      <div className="flex items-center justify-between gap-3">
        <button
          className="rounded-xl border border-slate-800 px-4 py-2 text-slate-200 disabled:opacity-40"
          disabled={idx === 0}
          onClick={() => setIdx((x) => Math.max(0, x - 1))}
        >
          Volver
        </button>

        {!isLast ? (
          <button
            className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
            onClick={() => {
              markCurrentScreenDone();
              setIdx((x) => Math.min(total - 1, x + 1));
            }}
          >
            Guardar y seguir
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-slate-800 px-4 py-2 text-slate-200"
              onClick={() => finishExercise(`/m/${exercise.moduleId}`)}
            >
              Volver al bloque
            </button>

            {nextExerciseId ? (
              <button
                className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
                onClick={() => finishExercise(`/e/${nextExerciseId}`)}
              >
                Guardar y seguir
              </button>
            ) : (
              <button
                className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
                onClick={() => finishExercise(`/m/${exercise.moduleId}`)}
              >
                Terminar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
