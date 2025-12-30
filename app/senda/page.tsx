"use client";

import SendaShell from "@/components/senda/SendaShell";
import { Card } from "@/components/Card";
import { SENDA_UNITS } from "@/content/senda";
import { getUnitStatus, markUnitStarted } from "@/lib/senda/storage";

export default function SendaHomePage() {
  return (
    <SendaShell
      title="Hola. Respira un momento."
      subtitle="No tienes que cambiar nada ahora. Solo avanzar con claridad."
      backHref="/"
      backLabel="Inicio"
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-slate-200">
        <div className="text-sm text-slate-300">Una nota suave</div>
        <div className="mt-2">
          Esto no es una carrera. Si hoy no haces nada, también está bien.
        </div>
      </div>

      <div className="grid gap-3">
        {SENDA_UNITS
          .filter((u) => u.id !== "empieza-aqui")
          .sort((a, b) => a.order - b.order)
          .map((u) => {
            const st = getUnitStatus(u.id);
            const badge = st.completed ? "Completado" : st.started ? "En curso" : "Nuevo";

            return (
              <Card
                key={u.id}
                title={u.title}
                subtitle={u.subtitle}
                href={u.href}
              >
                <div className="mt-3 inline-flex items-center rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
                  {badge}
                </div>
                <div className="mt-4">
                  <button
                    className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
                    onClick={() => {
                      markUnitStarted(u.id);
                      window.location.href = u.href;
                    }}
                  >
                    Abrir
                  </button>
                </div>
              </Card>
            );
          })}
      </div>
    </SendaShell>
  );
}
