// app/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const CHALLENGE_START_KEY = "senda.challenge.startDate"; // YYYY-MM-DD
const CHALLENGE_TOTAL_DAYS = 28;

function formatISODate(d: Date) {
  // yyyy-mm-dd, en hora local
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function daysBetweenISO(startISO: string, endISO: string) {
  // ambos YYYY-MM-DD, tratamos como medianoche local para evitar diferencias por hora
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

function ClickCard({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition p-4"
    >
      <div className="text-lg font-semibold text-slate-100">{title}</div>
      <div className="text-sm text-slate-300 mt-1">{subtitle}</div>
    </button>
  );
}

export default function Home() {
  const router = useRouter();

  const [startDate, setStartDate] = useState<string | null>(null);
  const [todayISO, setTodayISO] = useState<string>(() => formatISODate(new Date()));

  useEffect(() => {
    // refresca "hoy" al montar (por si el server/client difieren)
    const now = new Date();
    setTodayISO(formatISODate(now));

    // lee inicio si existe
    try {
      const stored = localStorage.getItem(CHALLENGE_START_KEY);
      if (stored) setStartDate(stored);
    } catch {
      // noop
    }
  }, []);

  const allowedDay = useMemo(() => {
    if (!startDate) return 1;
    const diff = daysBetweenISO(startDate, todayISO);
    // Día 1 el día de inicio, por eso +1
    return clamp(diff + 1, 1, CHALLENGE_TOTAL_DAYS);
  }, [startDate, todayISO]);

  const startOrContinue = () => {
    try {
      let sd = startDate;

      // si nunca ha iniciado, se fija hoy como inicio
      if (!sd) {
        sd = formatISODate(new Date());
        localStorage.setItem(CHALLENGE_START_KEY, sd);
        setStartDate(sd);
      }

      // Por ahora lo mandamos a la pantalla del cuaderno 3.
      // En el siguiente paso, esa pantalla te llevará al "día permitido"
      // y además bloquearemos acceso por URL a días futuros.
      router.push("/senda/cuaderno-3");
    } catch {
      router.push("/senda/cuaderno-3");
    }
  };

  const goLibrary = () => router.push("/biblioteca");

  return (
    <main className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm text-slate-300">La Senda</div>
        <h1 className="text-3xl font-semibold">Hola. Respira un momento.</h1>
        <p className="text-slate-300">No tienes que cambiar nada ahora.</p>
      </div>

      <div className="space-y-3">
        <ClickCard
          title={`Ir al Desafío (Día ${allowedDay} de ${CHALLENGE_TOTAL_DAYS})`}
          subtitle={
            startDate
              ? `Inicio: ${startDate} · Hoy: ${todayISO} · Día permitido: ${allowedDay}`
              : "Primera vez: al entrar, se fija tu fecha de inicio automáticamente."
          }
          onClick={startOrContinue}
        />

        <ClickCard
          title="Ir a Biblioteca"
          subtitle="Cuadernos, bonos y tu progreso."
          onClick={goLibrary}
        />
      </div>
    </main>
  );
}
