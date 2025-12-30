"use client";

import SendaShell from "@/components/senda/SendaShell";
import { Card } from "@/components/Card";
import { markBonusCompleted, markBonusStarted } from "@/lib/senda/storage";

export default function PlanificadorPage() {
  return (
    <SendaShell
      title="Planificador diario y semanal"
      subtitle="Estructura suave para sostener el avance."
      backHref="/senda/bonos"
      backLabel="Bonos"
    >
      <Card
        title="MVP"
        subtitle="En el siguiente paso lo convertimos en plantilla interactiva (diario/semanal) guardada en localStorage."
      />

      <div className="flex gap-3">
        <button
          className="rounded-xl border border-slate-800 px-4 py-2 text-slate-200"
          onClick={() => markBonusStarted("planificador")}
        >
          Marcar “en curso”
        </button>
        <button
          className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
          onClick={() => markBonusCompleted("planificador")}
        >
          Marcar “completado”
        </button>
      </div>
    </SendaShell>
  );
}
