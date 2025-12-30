"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const CHALLENGE_START_KEY = "senda.challenge.startDate"; // YYYY-MM-DD
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

export default function Cuaderno3Page() {
  const router = useRouter();

  const [startDate, setStartDate] = useState<string | null>(null);
  const [todayISO, setTodayISO] = useState<string>(() =>
    formatISODate(new Date())
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const today = formatISODate(new Date());
    setTodayISO(today);

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
    } finally {
      setReady(true);
    }
  }, []);

  const allowedDay = useMemo(() => {
    if (!startDate) return 1;
    const diff = daysBetweenISO(startDate, todayISO);
    return clamp(diff + 1, 1, CHALLENGE_TOTAL_DAYS);
  }, [startDate, todayISO]);

  if (!ready) {
    return <div className="p-6 text-slate-200">Preparando tu desafío…</div>;
  }

  return (
    <div className="p-6 space-y-5 text-slate-200">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Cuaderno 3 — El Desafío de la Montaña
        </h1>

        <p className="text-slate-300">
          Inicio: <span className="text-slate-100">{startDate}</span> · Hoy:{" "}
          <span className="text-slate-100">{todayISO}</span>
        </p>

        <p className="text-slate-300">
          Día permitido por fecha:{" "}
          <span className="text-slate-100">{allowedDay}</span> de{" "}
          {CHALLENGE_TOTAL_DAYS}
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-slate-300 text-sm">
          Haz lo que toca hoy. Nada más. Sin atajos.
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          className="rounded-xl bg-slate-200 px-4 py-2 text-slate-900 font-semibold"
          onClick={() => router.push(`/e/c3-d${pad2(allowedDay)}`)}
        >
          Ir al Día {allowedDay}
        </button>

        <button
          className="rounded-xl border border-slate-800 px-4 py-2 text-slate-200"
          onClick={() => router.push("/senda/cuaderno-3/dia")}
        >
          Ver mapa 28 días (La Montaña)
        </button>

        <button
          className="rounded-xl border border-slate-800 px-4 py-2 text-slate-200"
          onClick={() => router.push("/senda")}
        >
          Volver a La Senda
        </button>
      </div>
    </div>
  );
}
