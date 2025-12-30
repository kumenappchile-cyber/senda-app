"use client";

import SendaShell from "@/components/senda/SendaShell";
import { Card } from "@/components/Card";
import { markUnitStarted } from "@/lib/senda/storage";

export default function Cuaderno2Page() {
  return (
    <SendaShell
      title="Cuaderno 2"
      subtitle="La Caverna y el Reflejo."
      backHref="/senda"
    >
      <Card
        title="Continuar Cuaderno 2"
        subtitle="Te lleva al listado de bloques y ejercicios (renderer actual)."
        href="/m/cuaderno-2"
      />

      <button
        className="rounded-xl bg-slate-200 text-slate-950 px-4 py-2 font-semibold"
        onClick={() => {
          markUnitStarted("cuaderno-2");
          window.location.href = "/m/cuaderno-2";
        }}
      >
        Abrir ahora
      </button>
    </SendaShell>
  );
}
