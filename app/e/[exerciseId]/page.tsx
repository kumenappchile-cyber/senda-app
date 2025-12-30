"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ExerciseRenderer } from "../../../components/ExerciseRenderer";
import { getExercise } from "../../../lib/program";

const CHALLENGE_START_KEY = "senda.challenge.startDate"; // YYYY-MM-DD
const C3_COMPLETED_DAYS_KEY = "senda.c3.completedDays"; // JSON number[]
const CHALLENGE_TOTAL_DAYS = 28;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatISODate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function daysBetweenISO(startISO: string, endISO: string) {
  const [sy, sm, sd] = startISO.split("-").map(Number);
  const [ey, em, ed] = endISO.split("-").map(Number);

  const start = new Date(sy, (sm ?? 1) - 1, sd ?? 1, 0, 0, 0, 0);
  const end = new Date(ey, (em ?? 1) - 1, ed ?? 1, 0, 0, 0, 0);

  const ms = end.getTime() - start.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function parseC3Day(exerciseId: string): number | null {
  // Espera formato: c3-d01 ... c3-d28
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

export default function ExercisePage({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const router = useRouter();
  const { exerciseId } = React.use(params);

  const [booted, setBooted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [todayISO, setTodayISO] = useState<string>(() => formatISODate(new Date()));
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const today = formatISODate(new Date());
    setTodayISO(today);

    // 1) cargar / asegurar fecha de inicio
    try {
      const stored = localStorage.getItem(CHALLENGE_START_KEY);
      if (!stored) {
        localStorage.setItem(CHALLENGE_START_KEY, today);
        setStartDate(today);
      } else {
        setStartDate(stored);
      }
    } catch {
      setStartDate(today);
    }

    // 2) cargar completados
    try {
      const arr = safeReadJSON<number[]>(C3_COMPLETED_DAYS_KEY, []);
      const cleaned = Array.from(
        new Set(arr.filter((n) => Number.isFinite(n) && n >= 1 && n <= CHALLENGE_TOTAL_DAYS))
      ).sort((a, b) => a - b);
      setCompletedDays(cleaned);
    } catch {
      setCompletedDays([]);
    }

    setBooted(true);
  }, []);

  // Releer completados cuando cambias de ejercicio (por si vienes de completar uno)
  useEffect(() => {
    if (!booted) return;
    const arr = safeReadJSON<number[]>(C3_COMPLETED_DAYS_KEY, []);
    const cleaned = Array.from(
      new Set(arr.filter((n) => Number.isFinite(n) && n >= 1 && n <= CHALLENGE_TOTAL_DAYS))
    ).sort((a, b) => a - b);
    setCompletedDays(cleaned);
  }, [booted, exerciseId]);

  const allowedByDate = useMemo(() => {
    if (!startDate) return 1;
    const diff = daysBetweenISO(startDate, todayISO);
    return clamp(diff + 1, 1, CHALLENGE_TOTAL_DAYS);
  }, [startDate, todayISO]);

  const completedSet = useMemo(() => new Set(completedDays), [completedDays]);

  const requiredDay = useMemo(() => {
    // primer día pendiente
    for (let d = 1; d <= CHALLENGE_TOTAL_DAYS; d++) {
      if (!completedSet.has(d)) return d;
    }
    return CHALLENGE_TOTAL_DAYS;
  }, [completedSet]);

  const targetDay = useMemo(() => {
    // El día “correcto” al que deberíamos mandar:
    // - no puede ser mayor que allowedByDate
    // - y debe ser el requerido (primer pendiente) si está dentro de lo permitido
    return clamp(Math.min(requiredDay, allowedByDate), 1, CHALLENGE_TOTAL_DAYS);
  }, [requiredDay, allowedByDate]);

  useEffect(() => {
    if (!booted) return;

    const day = parseC3Day(exerciseId);
    if (day === null) return; // no es cuaderno 3, no bloqueamos

    // Día inválido
    if (day < 1 || day > CHALLENGE_TOTAL_DAYS) {
      setRedirecting(true);
      router.replace(`/e/c3-d${pad2(targetDay)}`);
      return;
    }

    // Regla 1: no futuro por fecha
    if (day > allowedByDate) {
      setRedirecting(true);
      router.replace(`/e/c3-d${pad2(targetDay)}`);
      return;
    }

    // Regla 2: no saltarse pendientes
    // Permitimos entrar a días ya completados (revisión)
    if (completedSet.has(day)) return;

    // Permitimos entrar al “día que toca” (targetDay)
    if (day === targetDay) return;

    // Si intentan entrar a un día distinto al que toca, los devolvemos
    setRedirecting(true);
    router.replace(`/e/c3-d${pad2(targetDay)}`);
  }, [booted, exerciseId, allowedByDate, targetDay, completedSet, router]);

  if (!booted || redirecting) {
    return <div className="p-6 text-slate-200">Preparando tu día permitido…</div>;
  }

  const exercise = getExercise(exerciseId);
  if (!exercise) return <div className="p-6 text-slate-200">Ejercicio no encontrado</div>;

  return <ExerciseRenderer exercise={exercise} />;
}
