import { Card } from "../../components/Card";
import { program } from "../../lib/program";

export default function Biblioteca() {
  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Biblioteca</h1>
        <p className="text-slate-300 mt-1">Elige un módulo. Avanza a tu ritmo.</p>
      </div>

      <div className="grid gap-3">
        {program.modules.map((m) => (
          <Card
            key={m.id}
            title={m.title}
            subtitle={m.subtitle}
            href={`/m/${m.id}`}
          />
        ))}
      </div>
    </main>
  );
}
