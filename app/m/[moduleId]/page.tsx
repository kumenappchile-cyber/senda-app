"use client";

import React from "react";
import { Card } from "../../../components/Card";
import { ProgressPills } from "../../../components/ProgressPills";
import { getBlocks, getModule, getExercisesByBlock } from "../../../lib/program";

export default function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = React.use(params);

  const module = getModule(moduleId);
  if (!module) return <div>Módulo no encontrado</div>;

  const blocks = getBlocks(module.id);

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">{module.title}</h1>
        {module.subtitle ? (
          <p className="text-slate-300 mt-1">{module.subtitle}</p>
        ) : null}
      </div>

      <div className="space-y-3">
        {blocks.map((b) => {
          const exercises = getExercisesByBlock(b.id);
          return (
            <Card key={b.id} title={b.title} subtitle={b.subtitle}>
              <ProgressPills total={exercises.length} done={0} />
              <div className="mt-4 grid gap-2">
                {exercises.map((e) => (
                  <a
                    key={e.id}
                    href={`/e/${e.id}`}
                    className="rounded-xl bg-slate-950/40 border border-slate-800 px-3 py-2 hover:bg-slate-950/60 transition"
                  >
                    <div className="font-semibold">{e.title}</div>
                    {e.subtitle ? (
                      <div className="text-sm text-slate-300 mt-1">
                        {e.subtitle}
                      </div>
                    ) : null}
                  </a>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
