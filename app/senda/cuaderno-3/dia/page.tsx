"use client";

import SendaShell from "../../../../components/senda/SendaShell";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

function safeReadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function MapaDesafioPage() {
  const router = useRouter();

  const [booted, setBooted] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [todayISO, setTodayISO] = useState<string>(() => formatISODate(new Date()));
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const today = formatISODate(new Date());
    setTodayISO(today);

    // 1) Asegurar fecha de inicio (si no existe, se fija hoy)
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

    // 2) Cargar completados
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

  // Releer completados cuando vuelves a esta pantalla
  useEffect(() => {
    if (!booted) return;

    const onFocus = () => {
      const arr = safeReadJSON<number[]>(C3_COMPLETED_DAYS_KEY, []);
      const cleaned = Array.from(
        new Set(arr.filter((n) => Number.isFinite(n) && n >= 1 && n <= CHALLENGE_TOTAL_DAYS))
      ).sort((a, b) => a - b);
      setCompletedDays(cleaned);
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [booted]);

  const allowedByDate = useMemo(() => {
    if (!startDate) return 1;
    const diff = daysBetweenISO(startDate, todayISO);
    return clamp(diff + 1, 1, CHALLENGE_TOTAL_DAYS);
  }, [startDate, todayISO]);

  const completedSet = useMemo(() => new Set(completedDays), [completedDays]);

  const requiredDay = useMemo(() => {
    for (let d = 1; d <= CHALLENGE_TOTAL_DAYS; d++) {
      if (!completedSet.has(d)) return d;
    }
    return CHALLENGE_TOTAL_DAYS;
  }, [completedSet]);

  const canOpenDay = (day: number) => {
    if (day > allowedByDate) return false;
    if (completedSet.has(day)) return true;
    if (day === requiredDay) return true;
    if (day > requiredDay) return false;
    return true;
  };

  const statusForDay = (day: number) => {
    if (completedSet.has(day)) return "done";
    if (day === requiredDay && day <= allowedByDate) return "today";
    if (day <= allowedByDate && day < requiredDay) return "open";
    return "locked";
  };

  const onDayClick = (day: number) => {
    setMsg("");

    if (!canOpenDay(day)) {
      if (day > allowedByDate) {
        setMsg(`Aún no. Ese es el Día ${day}. Hoy tu día permitido es el ${allowedByDate}.`);
        return;
      }
      setMsg(`Disciplina: primero completa el Día ${requiredDay}.`);
      return;
    }

    router.push(`/e/c3-d${pad2(day)}`);
  };

  const completedCount = completedDays.length;

  return (
    <SendaShell
      title="El Desafío de la Montaña"
      subtitle="28 días. Un paso. Sin atajos."
      backHref="/senda/cuaderno-3"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-slate-100 font-semibold">Tu progreso</div>
          <div className="mt-2 text-sm text-slate-300 space-y-1">
            <div>
              Inicio: <span className="text-slate-100">{startDate ?? "—"}</span>
            </div>
            <div>
              Hoy: <span className="text-slate-100">{todayISO}</span>
            </div>
            <div>
              Día permitido por fecha:{" "}
              <span className="text-slate-100">{allowedByDate}</span> / {CHALLENGE_TOTAL_DAYS}
            </div>
            <div>
              Completados: <span className="text-slate-100">{completedCount}</span> /{" "}
              {CHALLENGE_TOTAL_DAYS}
            </div>
            <div>
              Día que toca (sin saltos): <span className="text-slate-100">{requiredDay}</span>
            </div>
          </div>
        </div>

        {msg ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-slate-200 text-sm">
            {msg}
          </div>
        ) : null}

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {Array.from({ length: CHALLENGE_TOTAL_DAYS }, (_, i) => i + 1).map((day) => {
            const st = statusForDay(day);

            const base = "rounded-2xl border p-3 text-left transition active:scale-[0.99]";
            const styles =
              st === "done"
                ? "border-slate-700 bg-slate-900/60 hover:bg-slate-900/70"
                : st === "today"
                ? "border-slate-200 bg-slate-200 text-slate-950 hover:bg-slate-100"
                : st === "open"
                ? "border-slate-700 bg-slate-900/40 hover:bg-slate-900/60"
                : "border-slate-800 bg-slate-950/20 opacity-60 cursor-not-allowed";

            const label = st === "done" ? "✅" : st === "today" ? "▶️" : st === "open" ? "•" : "🔒";

            return (
              <button
                key={day}
                className={`${base} ${styles}`}
                onClick={() => onDayClick(day)}
                disabled={st === "locked"}
                title={
                  st === "done"
                    ? `Día ${day} (completado)`
                    : st === "today"
                    ? `Día ${day} (hoy)`
                    : st === "open"
                    ? `Día ${day}`
                    : `Día ${day} (bloqueado)`
                }
              >
                <div className="flex items-center justify-between">
                  <div className={st === "today" ? "font-semibold" : "text-slate-100 font-semibold"}>
                    Día {day}
                  </div>
                  <div className={st === "today" ? "" : "text-slate-300"}>{label}</div>
                </div>
                <div className={st === "today" ? "text-xs mt-2 opacity-80" : "text-xs text-slate-400 mt-2"}>
                  {st === "done" ? "Completado" : st === "today" ? "Toca hoy" : st === "open" ? "Disponible" : "Bloqueado"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-slate-300 text-sm">
          Si hoy no completas todo, no pasa nada. La montaña no se sube de un salto.
        </div>
      </div>
    </SendaShell>
  );
}
