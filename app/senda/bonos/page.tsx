"use client";

import SendaShell from "@/components/senda/SendaShell";
import { Card } from "@/components/Card";
import { SENDA_BONUSES } from "@/content/senda";
import { getBonusStatus, markBonusStarted } from "@/lib/senda/storage";

export default function BonosPage() {
  return (
    <SendaShell
      title="Bonos"
      subtitle="Herramientas de apoyo para claridad, foco y presencia."
      backHref="/senda"
    >
      <div className="grid gap-3">
        {SENDA_BONUSES.map((b) => {
          const st = getBonusStatus(b.id);
          const badge = st.completed ? "Completado" : st.started ? "En curso" : "Nuevo";

          return (
            <Card key={b.id} title={b.title} subtitle={b.subtitle} href={b.href}>
              <div className="mt-3 inline-flex items-center rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
                {badge}
              </div>
              <div className="mt-4">
                <button
                  className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
                  onClick={() => {
                    markBonusStarted(b.id);
                    window.location.href = b.href;
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
