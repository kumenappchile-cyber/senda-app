"use client";

import SendaShell from "@/components/senda/SendaShell";
import { Card } from "@/components/Card";
import { markUnitStarted, markUnitCompleted } from "@/lib/senda/storage";

export default function Cuaderno1Page() {
  return (
    <SendaShell
      title="Cuaderno 1"
      subtitle="Fundamentos y dirección del viaje."
      backHref="/senda"
    >
      <Card
        title="Abrir estructura (MVP)"
        subtitle="Por ahora esta pantalla es un hub. Luego vamos a cargar los ejercicios reales del Cuaderno 1."
      />

      <div className="flex gap-3">
        <button
          className="rounded-xl border border-slate-800 px-4 py-2 text-slate-200"
          onClick={() => markUnitStarted("cuaderno-1")}
        >
          Marcar como “en curso”
        </button>
        <button
          className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
          onClick={() => markUnitCompleted("cuaderno-1")}
        >
          Marcar como “completado”
        </button>
      </div>
    </SendaShell>
  );
}
