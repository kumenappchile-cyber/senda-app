"use client";

import SendaShell from "@/components/senda/SendaShell";
import { Card } from "@/components/Card";
import { markBonusCompleted, markBonusStarted } from "@/lib/senda/storage";

export default function DopaminaPage() {
  return (
    <SendaShell
      title="Desintoxicación digital y dopamina"
      subtitle="Menos ruido. Más claridad. Sin pelea contigo."
      backHref="/senda/bonos"
      backLabel="Bonos"
    >
      <Card
        title="MVP"
        subtitle="En el siguiente paso volcamos aquí la estructura exacta del PDF (sin inventar contenido)."
      />

      <div className="flex gap-3">
        <button
          className="rounded-xl border border-slate-800 px-4 py-2 text-slate-200"
          onClick={() => markBonusStarted("dopamina")}
        >
          Marcar “en curso”
        </button>
        <button
          className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
          onClick={() => markBonusCompleted("dopamina")}
        >
          Marcar “completado”
        </button>
      </div>
    </SendaShell>
  );
}
